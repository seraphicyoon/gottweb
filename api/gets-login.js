import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'gets_session';
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  const secret = process.env.GETS_ACCESS_PASSWORD;
  if (!secret) return res.status(503).json({ error: 'Acceso no configurado' });
  const input = typeof req.body?.password === 'string' ? req.body.password : '';
  const supplied = Buffer.from(input, 'utf8');
  const expected = Buffer.from(secret, 'utf8');
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return res.status(401).json({ error: 'La clave no es correcta. Inténtalo de nuevo.' });
  }
  const timestamp = String(Date.now());
  const signature = createHmac('sha256', secret).update('GETS:' + timestamp).digest('hex');
  res.setHeader('Set-Cookie', COOKIE + '=' + timestamp + '.' + signature + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800');
  return res.status(200).json({ ok: true });
}
