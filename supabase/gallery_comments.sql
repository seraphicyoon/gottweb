-- Run once in the Supabase SQL Editor for the project connected to GETS.
create table if not exists public.gets_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.gets_admins enable row level security;

create policy "Read own admin membership" on public.gets_admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.gets_is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.gets_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.gets_is_admin() from public;
grant execute on function public.gets_is_admin() to anon, authenticated;

create table if not exists public.gets_gallery_comments (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
create index if not exists gets_gallery_comments_status_created_idx on public.gets_gallery_comments(status, created_at desc);
alter table public.gets_gallery_comments enable row level security;

create policy "Public reads approved comments" on public.gets_gallery_comments
  for select to anon, authenticated using (status = 'approved' or (select public.gets_is_admin()));
create policy "Students submit pending comments" on public.gets_gallery_comments
  for insert to authenticated with check (
    author_id = (select auth.uid()) and status = 'pending'
  );
create policy "Admins moderate comments" on public.gets_gallery_comments
  for update to authenticated using ((select public.gets_is_admin()))
  with check ((select public.gets_is_admin()));
create policy "Admins delete comments" on public.gets_gallery_comments
  for delete to authenticated using ((select public.gets_is_admin()));

-- Invite your boss as a user in Authentication > Users, then run this with her email:
-- insert into public.gets_admins(user_id)
-- select id from auth.users where email = 'ADMIN_EMAIL_HERE';
-- Keep the service_role key out of frontend code.
