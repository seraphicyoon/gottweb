-- GETS: run this entire file once in the Supabase SQL Editor.
-- Requires the existing gallery_comments.sql / moderation setup.
-- Safe to run again. New accounts are ordinary users, never students by default.
begin;

create table if not exists public.gets_students (
  user_id uuid primary key references auth.users(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  enrolled_by uuid references auth.users(id) on delete set null default auth.uid()
);
alter table public.gets_students enable row level security;
revoke all on public.gets_students from anon, authenticated;
grant select, insert, delete on public.gets_students to authenticated;
drop policy if exists "GETS student membership read" on public.gets_students;
create policy "GETS student membership read" on public.gets_students for select to authenticated
using (user_id = (select auth.uid()) or (select public.gets_is_admin()));
drop policy if exists "GETS admins enroll students" on public.gets_students;
create policy "GETS admins enroll students" on public.gets_students for insert to authenticated
with check ((select public.gets_is_admin()) and enrolled_by = (select auth.uid()));
drop policy if exists "GETS admins remove students" on public.gets_students;
create policy "GETS admins remove students" on public.gets_students for delete to authenticated
using ((select public.gets_is_admin()));

create or replace function public.gets_can_access_classroom()
returns boolean language sql stable security definer set search_path = '' as $$
  select auth.uid() is not null and (
    public.gets_is_admin() or (
      exists (select 1 from public.gets_students where user_id = auth.uid())
      and not public.gets_is_banned(auth.uid())
    )
  );
$$;
revoke all on function public.gets_can_access_classroom() from public, anon;
grant execute on function public.gets_can_access_classroom() to authenticated;

-- The full account directory is available only through this admin-checked RPC.
-- Students and ordinary users cannot enumerate emails or assign themselves roles.
create or replace function public.gets_list_accounts(
  search_term text default '', students_only boolean default false, page_offset integer default 0
)
returns table (user_id uuid, full_name text, email text, joined_at timestamptz,
  is_student boolean, student_since timestamptz, is_admin boolean, is_banned boolean, total_count bigint)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.gets_is_admin() then
    raise exception 'Administradora requerida' using errcode = '42501';
  end if;
  return query
  select u.id, coalesce(nullif(left(btrim(u.raw_user_meta_data->>'full_name'), 80), ''), 'Sin nombre'),
    u.email::text, u.created_at, s.user_id is not null, s.enrolled_at,
    a.user_id is not null, b.user_id is not null, count(*) over ()
  from auth.users u
  left join public.gets_students s on s.user_id = u.id
  left join public.gets_admins a on a.user_id = u.id
  left join public.gets_banned_users b on b.user_id = u.id
  where (not students_only or s.user_id is not null)
    and (coalesce(u.email, '') ilike '%' || left(btrim(coalesce(search_term, '')), 120) || '%'
      or coalesce(u.raw_user_meta_data->>'full_name', '') ilike '%' || left(btrim(coalesce(search_term, '')), 120) || '%')
  order by u.created_at desc, u.id
  limit 25 offset greatest(coalesce(page_offset, 0), 0);
end;
$$;
revoke all on function public.gets_list_accounts(text, boolean, integer) from public, anon;
grant execute on function public.gets_list_accounts(text, boolean, integer) to authenticated;

create table if not exists public.gets_classroom_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null default 'GETS',
  kind text not null check (kind in ('material', 'discussion')),
  title text not null check (char_length(btrim(title)) between 1 and 150),
  body text not null check (char_length(btrim(body)) between 1 and 10000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  attachment_path text unique,
  attachment_name text,
  created_at timestamptz not null default now(),
  check ((attachment_path is null and attachment_name is null) or
    (kind = 'material' and attachment_path is not null and attachment_name is not null))
);
create table if not exists public.gets_classroom_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.gets_classroom_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null default 'GETS',
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
create index if not exists gets_classroom_posts_list_idx on public.gets_classroom_posts(kind, status, created_at desc);
create index if not exists gets_classroom_replies_post_idx on public.gets_classroom_replies(post_id, status, created_at);
alter table public.gets_classroom_posts enable row level security;
alter table public.gets_classroom_replies enable row level security;
revoke all on public.gets_classroom_posts, public.gets_classroom_replies from anon, authenticated;
grant select, delete on public.gets_classroom_posts, public.gets_classroom_replies to authenticated;
grant insert (id, author_id, kind, title, body, status, attachment_path, attachment_name)
  on public.gets_classroom_posts to authenticated;
grant insert (post_id, author_id, body, status) on public.gets_classroom_replies to authenticated;
grant update (status) on public.gets_classroom_posts, public.gets_classroom_replies to authenticated;

-- Derive displayed authors server-side, rather than trusting a supplied name.
create or replace function public.gets_classroom_set_author()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  select coalesce(nullif(left(btrim(u.raw_user_meta_data->>'full_name'), 80), ''), 'Integrante GETS')
    into new.author_name from auth.users u where u.id = new.author_id;
  return new;
end;
$$;
revoke all on function public.gets_classroom_set_author() from public, anon, authenticated;
drop trigger if exists gets_classroom_post_author on public.gets_classroom_posts;
create trigger gets_classroom_post_author before insert on public.gets_classroom_posts
for each row execute function public.gets_classroom_set_author();
drop trigger if exists gets_classroom_reply_author on public.gets_classroom_replies;
create trigger gets_classroom_reply_author before insert on public.gets_classroom_replies
for each row execute function public.gets_classroom_set_author();

drop policy if exists "GETS private posts read" on public.gets_classroom_posts;
create policy "GETS private posts read" on public.gets_classroom_posts for select to authenticated
using ((select public.gets_can_access_classroom()) and
  (status = 'approved' or author_id = (select auth.uid()) or (select public.gets_is_admin())));
drop policy if exists "GETS private posts create" on public.gets_classroom_posts;
create policy "GETS private posts create" on public.gets_classroom_posts for insert to authenticated
with check ((select public.gets_can_access_classroom()) and author_id = (select auth.uid()) and (
  ((select public.gets_is_admin()) and status in ('pending', 'approved'))
  or (kind = 'discussion' and status = 'pending' and attachment_path is null and attachment_name is null)
));
drop policy if exists "GETS private posts moderate" on public.gets_classroom_posts;
create policy "GETS private posts moderate" on public.gets_classroom_posts for update to authenticated
using ((select public.gets_is_admin())) with check ((select public.gets_is_admin()));
drop policy if exists "GETS private posts delete" on public.gets_classroom_posts;
create policy "GETS private posts delete" on public.gets_classroom_posts for delete to authenticated
using ((select public.gets_is_admin()));

drop policy if exists "GETS private replies read" on public.gets_classroom_replies;
create policy "GETS private replies read" on public.gets_classroom_replies for select to authenticated
using ((select public.gets_can_access_classroom()) and
  exists (select 1 from public.gets_classroom_posts p where p.id = post_id) and
  (status = 'approved' or author_id = (select auth.uid()) or (select public.gets_is_admin())));
drop policy if exists "GETS private replies create" on public.gets_classroom_replies;
create policy "GETS private replies create" on public.gets_classroom_replies for insert to authenticated
with check ((select public.gets_can_access_classroom()) and author_id = (select auth.uid()) and
  exists (select 1 from public.gets_classroom_posts p where p.id = post_id and p.status = 'approved') and
  (status = 'pending' or ((select public.gets_is_admin()) and status = 'approved')));
drop policy if exists "GETS private replies moderate" on public.gets_classroom_replies;
create policy "GETS private replies moderate" on public.gets_classroom_replies for update to authenticated
using ((select public.gets_is_admin())) with check ((select public.gets_is_admin()));
drop policy if exists "GETS private replies delete" on public.gets_classroom_replies;
create policy "GETS private replies delete" on public.gets_classroom_replies for delete to authenticated
using ((select public.gets_is_admin()));

-- Material files stay in a private Supabase bucket, never GitHub or public URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gets-classroom', 'gets-classroom', false, 20971520,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'audio/mpeg', 'video/mp4'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "GETS material files read" on storage.objects;
create policy "GETS material files read" on storage.objects for select to authenticated
using (bucket_id = 'gets-classroom' and (select public.gets_can_access_classroom()) and
  ((select public.gets_is_admin()) or exists (
    select 1 from public.gets_classroom_posts p where p.attachment_path = name and p.status = 'approved'
  )));
drop policy if exists "GETS admins upload materials" on storage.objects;
create policy "GETS admins upload materials" on storage.objects for insert to authenticated
with check (bucket_id = 'gets-classroom' and (select public.gets_is_admin()));
drop policy if exists "GETS admins delete material files" on storage.objects;
create policy "GETS admins delete material files" on storage.objects for delete to authenticated
using (bucket_id = 'gets-classroom' and (select public.gets_is_admin()));

-- Boundaries also protect this new bucket if the project has older broad policies.
drop policy if exists "GETS classroom storage anonymous boundary" on storage.objects;
create policy "GETS classroom storage anonymous boundary" on storage.objects as restrictive
for all to anon using (bucket_id <> 'gets-classroom') with check (bucket_id <> 'gets-classroom');
drop policy if exists "GETS classroom storage read boundary" on storage.objects;
create policy "GETS classroom storage read boundary" on storage.objects as restrictive
for select to authenticated using (bucket_id <> 'gets-classroom' or (
  (select public.gets_can_access_classroom()) and ((select public.gets_is_admin()) or exists (
    select 1 from public.gets_classroom_posts p where p.attachment_path = name and p.status = 'approved'
  ))
));
drop policy if exists "GETS classroom storage insert boundary" on storage.objects;
create policy "GETS classroom storage insert boundary" on storage.objects as restrictive
for insert to authenticated with check (bucket_id <> 'gets-classroom' or (select public.gets_is_admin()));
drop policy if exists "GETS classroom storage update boundary" on storage.objects;
create policy "GETS classroom storage update boundary" on storage.objects as restrictive
for update to authenticated using (bucket_id <> 'gets-classroom' or (select public.gets_is_admin()))
with check (bucket_id <> 'gets-classroom' or (select public.gets_is_admin()));
drop policy if exists "GETS classroom storage delete boundary" on storage.objects;
create policy "GETS classroom storage delete boundary" on storage.objects as restrictive
for delete to authenticated using (bucket_id <> 'gets-classroom' or (select public.gets_is_admin()));

notify pgrst, 'reload schema';
commit;
