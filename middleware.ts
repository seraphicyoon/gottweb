import { next, rewrite, redirect } from '@vercel/functions';

const encoder = new TextEncoder();
const COOKIE = 'gets_access';
const MAX_AGE = 60 * 60 * 24 * 7;

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}

async function signature(value: string, password: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/acceso' || path === '/acceso.html') {
    const response = path === '/acceso' ? rewrite(new URL('/acceso.html', url)) : next();
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
  if (path === '/api/login' || path === '/api/logout') return next();
  const password = process.env.GETS_ACCESS_PASSWORD;
  if (!password) return new Response('Acceso no configurado. Contacta al administrador.', { status: 503, headers: { 'Cache-Control': 'no-store' } });

  const cookie = request.headers.get('cookie')?.split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  if (cookie) {
    const [time, provided] = cookie.split('.');
    const issued = Number(time);
    if (/^\d{10,13}$/.test(time || '') && /^[a-f0-9]{64}$/.test(provided || '') && Number.isFinite(issued) && issued <= Date.now() && Date.now() - issued < MAX_AGE * 1000) {
      const expected = await signature(time, password);
      if (expected === provided) {
        const response = next();
        response.headers.set('Cache-Control', 'private, no-store');
        return response;
      }
    }
  }
  const target = new URL('/acceso', url);
  const response = redirect(target, 307);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = { matcher: '/(.*)' };
