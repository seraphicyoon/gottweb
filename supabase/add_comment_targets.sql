-- Run once in the existing GETS Supabase project after gallery_comments.sql.
-- Preserves existing comments and gives them to the current gallery photo.
alter table public.gets_gallery_comments
  add column if not exists content_type text not null default 'photo'
    check (content_type in ('photo', 'article'));
alter table public.gets_gallery_comments
  add column if not exists content_id text not null default 'convivio-15-septiembre-2026'
    check (char_length(content_id) between 1 and 120);
create index if not exists gets_gallery_comments_content_idx
  on public.gets_gallery_comments(content_type, content_id, status, created_at desc);
