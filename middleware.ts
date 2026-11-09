import { next } from '@vercel/functions';

const COOKIE = 'gets_session';
const encoder = new TextEncoder();

async function sign(timestamp: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode('GETS:' + timestamp));
  return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('');
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (pathname === '/acceso.html' || pathname === '/api/gets-login') {
    const response = next();
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }

  const secret = process.env.GETS_ACCESS_PASSWORD;
  if (!secret) return new Response('La protección de GETS no está configurada. Contacta al administrador.', {
    status: 503, headers: { 'Cache-Control': 'no-store' }
  });

  const cookie = (request.headers.get('cookie') || '').split(';').map(v => v.trim()).find(v => v.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  if (cookie) {
    const [timestamp, received] = cookie.split('.');
    const issued = Number(timestamp);
    if (/^\d{13}$/.test(timestamp || '') && /^[0-9a-f]{64}$/.test(received || '') &&
        issued <= Date.now() && Date.now() - issued < 7 * 24 * 60 * 60 * 1000) {
      const expected = await sign(timestamp, secret);
      let difference = 0;
      for (let i = 0; i < 64; i++) difference |= expected.charCodeAt(i) ^ received.charCodeAt(i);
      if (difference === 0) {
        const response = next();
        response.headers.set('Cache-Control', 'private, no-store');
        return response;
      }
    }
  }

  const response = Response.redirect(new URL('/acceso.html', url), 307);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = { matcher: '/(.*)', runtime: 'nodejs' };
