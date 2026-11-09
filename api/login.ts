import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'gets_access';
const MAX_AGE = 60 * 60 * 24 * 7;
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  const expected = process.env.GETS_ACCESS_PASSWORD;
  if (!expected) return res.status(503).json({ error: 'Acceso no configurado' });
  const supplied = typeof req.body?.password === 'string' ? req.body.password : '';
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return res.status(401).json({ error: 'Clave incorrecta' });
  const timestamp = String(Date.now());
  const sig = createHmac('sha256', expected).update(timestamp).digest('hex');
  const secure = process.env.VERCEL_ENV !== 'development' ? '; Secure' : '';
  res.setHeader('Set-Cookie', COOKIE + '=' + timestamp + '.' + sig + '; HttpOnly; SameSite=Lax; Path=/; Max-Age=' + MAX_AGE + secure);
  return res.status(200).json({ ok: true });
}
