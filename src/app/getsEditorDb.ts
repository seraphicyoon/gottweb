import { createClient } from '@supabase/supabase-js';

export const getsEditorDb = createClient(
  'https://tfvlqypfxihectoypgqw.supabase.co',
  'sb_publishable_iWVPYuhwR0LNtBKRctVEGA_9JvrNyAQ',
  { auth: { storageKey: 'gets-editor-auth' } }
);

export const EDITABLE_CONTENT = [
  { key: 'about.map.title', label: 'Nosotros · Título Mapa', defaultText: 'Mapa' },
  { key: 'about.map.description', label: 'Nosotros · Descripción Mapa', defaultText: 'Ser fuente de servicio desde un lugar en comunión, respeto, crecimiento y formación.' },
  { key: 'about.life.title', label: 'Nosotros · Título Nuestra vida', defaultText: 'NUESTRA VIDA' },
  { key: 'about.life.subtitle', label: 'Nosotros · Nuestro viaje', defaultText: 'Nuestro viaje: una historia que recordar, una historia que vivir y una historia que crear' },
  { key: 'about.life.point1', label: 'Nosotros · Viñeta 1', defaultText: 'Bajo el Espíritu: un sendero formativo y sinodal.' },
  { key: 'about.life.point2', label: 'Nosotros · Viñeta 2', defaultText: 'Se dialoga para comprender, se escucha para acoger.' },
  { key: 'about.life.point3', label: 'Nosotros · Viñeta 3', defaultText: 'Caminamos juntos. «Es tiempo de caminar». «Juntos andemos», de Teresa de Jesús.' },
  { key: 'about.life.point4', label: 'Nosotros · Viñeta 4', defaultText: 'Tarea: descalzarte para seguir a Jesucristo; hacer vida el humanismo evangélico teresiano-sanjuanista.' },
] as const;
