import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type GalleryComment = {
  id: string;
  author_id: string;
  author_name: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};
