-- Execute once in the existing GETS Supabase project. Safe to rerun.
-- Does not delete users or comments.
begin;
alter table public.gets_gallery_comments
  add column if not exists content_type text not null default 'photo'
    check (content_type in ('photo', 'article'));
alter table public.gets_gallery_comments
  add column if not exists content_id text not null default 'convivio-15-septiembre-2026'
    check (char_length(content_id) between 1 and 120);
create index if not exists gets_gallery_comments_content_idx
  on public.gets_gallery_comments(content_type, content_id, status, created_at desc);

create table if not exists public.gets_banned_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  reason text not null default 'Incumplimiento de las normas' check (char_length(reason) between 1 and 200),
  banned_at timestamptz not null default now(),
  banned_by uuid references auth.users(id) on delete set null
);
alter table public.gets_banned_users enable row level security;

create or replace function public.gets_is_banned(target_user_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.gets_banned_users where user_id = target_user_id);
$$;
revoke all on function public.gets_is_banned(uuid) from public;
grant execute on function public.gets_is_banned(uuid) to anon, authenticated;

drop policy if exists "Read bans" on public.gets_banned_users;
create policy "Read bans" on public.gets_banned_users
  for select to authenticated using (user_id = (select auth.uid()) or (select public.gets_is_admin()));
drop policy if exists "Admins ban users" on public.gets_banned_users;
create policy "Admins ban users" on public.gets_banned_users
  for insert to authenticated with check (
    (select public.gets_is_admin()) and banned_by = (select auth.uid())
  );
drop policy if exists "Admins unban users" on public.gets_banned_users;
create policy "Admins unban users" on public.gets_banned_users
  for delete to authenticated using ((select public.gets_is_admin()));

drop policy if exists "Public reads approved comments" on public.gets_gallery_comments;
create policy "Public reads approved comments" on public.gets_gallery_comments
  for select to anon, authenticated using (
    (status = 'approved' and not public.gets_is_banned(author_id))
    or (select public.gets_is_admin())
  );
drop policy if exists "Students submit pending comments" on public.gets_gallery_comments;
create policy "Students submit pending comments" on public.gets_gallery_comments
  for insert to authenticated with check (
    author_id = (select auth.uid()) and status = 'pending'
    and not public.gets_is_banned((select auth.uid()))
  );
commit;
