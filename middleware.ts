import { next } from '@vercel/functions';

// Acceso privado a todo el sitio. La clave solo existe en Vercel.
export default function middleware(request: Request): Response {
  const secret = process.env.GETS_ACCESS_PASSWORD;
  if (!secret) {
    return new Response('La protección de GETS no está configurada. Contacta al administrador.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const authorization = request.headers.get('authorization') || '';
  let valid = false;
  if (authorization.startsWith('Basic ')) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(':');
      const supplied = separator >= 0 ? decoded.slice(separator + 1) : '';
      // Comparación sin salida anticipada para claves de longitud equivalente.
      let diff = supplied.length ^ secret.length;
      const length = Math.max(supplied.length, secret.length);
      for (let i = 0; i < length; i++) diff |= (supplied.charCodeAt(i) || 0) ^ (secret.charCodeAt(i) || 0);
      valid = diff === 0;
    } catch {
      valid = false;
    }
  }

  if (!valid) {
    return new Response('GETS: se requiere la clave de acceso.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="GETS - Acceso privado", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
  const response = next();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = { matcher: '/(.*)', runtime: 'nodejs' };
