import type { VercelRequest, VercelResponse } from '@vercel/node';
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  res.setHeader('Set-Cookie', 'gets_access=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
  return res.status(200).json({ ok: true });
}
