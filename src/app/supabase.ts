import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || 'https://xpuesntdngwyarpyzhoo.supabase.co';
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_piZzUVNa5yG8_Y_fQE4kLA_gJh-UJSL';
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type GalleryComment = {
  id: string;
  author_id: string;
  author_name: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};
