import { createClient } from '@supabase/supabase-js';

const url =  'https://tfvlqypfxihectoypgqw.supabase.co';
const anonKey =  'sb_publishable_iWVPYuhwR0LNtBKRctVEGA_9JvrNyAQ';
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type GalleryComment = {
  id: string;
  author_id: string;
  author_name: string;
  content_type: 'photo' | 'article';
  content_id: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};
