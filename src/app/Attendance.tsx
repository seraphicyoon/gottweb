import { useEffect, useState } from 'react';
import { supabase } from './supabase';
const input = 'w-full rounded-xl border border-[#E7D9C8] bg-white px-3 py-2 text-[#5C4033]';
const button = 'rounded-xl bg-[#8B4513] px-4 py-2 text-white disabled:opacity-50';
const labels = { present: 'Asistencia', absent: 'Falta', excused: 'Falta justificada' };
type Status = keyof typeof labels;
type Profile = { cycle: number; is_student: boolean; present_total: number; absent_total: number; active_absences: number; history: { session_date: string; status: Status; cycle: number }[]; recoveries: { id: string; note: string; created_at: string }[] };
const displayDate = (value: string) => new Date(value + 'T12:00:00').toLocaleDateString('es-MX');
function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function Attendance({ userId, admin = false, onChanged }: { userId: string; admin?: boolean; onChanged?: () => void }) {
 const [profile, setProfile] = useState<Profile | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [message, setMessage] = useState('');
 const [busy, setBusy] = useState(false);
 const [revision, setRevision] = useState(0);
 const [day, setDay] = useState(today);
 const [status, setStatus] = useState<Status>('present');
 const [note, setNote] = useState('');
 const [expanded, setExpanded] = useState(false);
 useEffect(() => {
  if (admin) return;
  const refresh = () => setRevision(n => n + 1);
  const timer = window.setInterval(refresh, 60000);
  window.addEventListener('focus', refresh);
  return () => { window.clearInterval(timer); window.removeEventListener('focus', refresh); };
 }, [admin]);
 useEffect(() => {
  let active = true;
  setLoading(true); setError(''); setProfile(null);
  if (!supabase) { setLoading(false); setError('El registro de asistencias todavía no está disponible.'); return; }
  supabase.rpc('gets_attendance_profile', { target_user_id: userId }).then(({ data, error }) => {
   if (!active) return;
   setLoading(false);
   if (error) setError(admin ? 'Falta activar asistencias: ejecuta supabase/attendance.sql en Supabase.' : 'El registro de asistencias todavía no está disponible.');
   else setProfile(data as Profile);
  });
  return () => { active = false; };
 }, [userId, revision, admin]);
 async function save(recover = false) {
  if (!supabase || busy) return;
  if (recover && !window.confirm('¿Reactivar como alumna por recuperación? Las faltas vigentes volverán a cero y se conservará el historial.')) return;
  setBusy(true); setMessage('');
  try {
   const { error } = recover
    ? await supabase.rpc('gets_reactivate_student', { target_user_id: userId, recovery_note: note.trim() })
    : await supabase.rpc('gets_record_attendance', { target_user_id: userId, attendance_date: day, attendance_status: status });
   if (error) throw error;
   setMessage(recover ? 'Alumna reactivada. Nuevo conteo de faltas en cero.' : 'Registro guardado. A las tres faltas vigentes se retira automáticamente el acceso de alumna.');
   if (recover) setNote('');
   setRevision(n => n+1); onChanged?.();
  } catch (e) { setMessage(e instanceof Error ? e.message : (e as { message?: string }).message || 'No se pudo guardar.'); }
  finally { setBusy(false); }
 }
 return <section className="w-full rounded-xl border border-[#E7D9C8] bg-[#F9F5EE] p-4 text-left text-[#5C4033]">
  <h3 className="font-semibold">{admin ? 'Asistencias y recuperación' : 'Mis asistencias'}</h3>
  {loading ? <p className="mt-2 text-sm">Cargando registro…</p> : error ? <p className="mt-2 text-sm" role="status">{error}</p> : profile && <>
   <dl className="my-3 grid grid-cols-2 gap-3 text-sm"><div><dt>Asistencias totales</dt><dd className="text-xl font-bold">{profile.present_total}</dd></div><div><dt>Faltas vigentes</dt><dd className="text-xl font-bold">{profile.active_absences} de 3</dd></div></dl>
   <p className="text-sm">{profile.is_student ? 'Alumna activa.' : 'Sin alta de alumna.'} Al llegar a 3 faltas vigentes se retira el acceso a los materiales exclusivos. Las faltas justificadas no cuentan para la baja.</p>
   {profile.active_absences >= 3 && !profile.is_student && <p className="mt-2 text-sm font-semibold">Acceso de alumna retirado por faltas. Una administradora puede reactivarlo tras la recuperación.</p>}
   {admin && <form onSubmit={e => { e.preventDefault(); void save(); }} className="mt-4 space-y-3">
    <p className="text-sm">Una fecha por clase. Guardar la misma fecha corrige el registro anterior.</p>
    <label className="block text-sm">Fecha de clase<input required type="date" max={today()} value={day} onChange={e => setDay(e.target.value)} className={input} /></label>
    <label className="block text-sm">Registro<select value={status} onChange={e => setStatus(e.target.value as Status)} className={input}>{Object.entries(labels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
    <button disabled={busy || (!profile.is_student && !profile.history.some(row => row.session_date === day))} className={button}>Guardar registro</button>
    {!profile.is_student && <p className="text-xs">Para una cuenta sin alta solo se pueden corregir fechas ya registradas.</p>}
   </form>}
   {admin && !profile.is_student && profile.history.length > 0 && <form onSubmit={e => { e.preventDefault(); void save(true); }} className="mt-5 space-y-2 border-t border-[#E7D9C8] pt-4">
    <label className="block text-sm">Trabajo o motivo de recuperación<textarea required maxLength={1000} value={note} onChange={e => setNote(e.target.value)} className={input} /></label>
    <button disabled={busy || !note.trim()} className={button}>Reactivar por recuperación</button>
    <p className="text-xs">Restaura el alta y empieza un nuevo conteo en cero. El historial anterior se conserva.</p>
   </form>}
   <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className="mt-4 text-sm text-[#8B4513] underline">{expanded ? 'Ocultar historial' : 'Ver historial'}</button>
   {expanded && <div className="mt-3 max-h-80 space-y-2 overflow-y-auto text-sm">
    <p>Faltas históricas: {profile.absent_total}. Conteo actual: ciclo {profile.cycle}.</p>
    {!profile.history.length && <p>Aún no hay clases registradas.</p>}
    {profile.history.map(row => <div key={row.session_date} className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E7D9C8] py-2"><span>{displayDate(row.session_date)} · {labels[row.status]}{row.cycle !== profile.cycle && ' · ciclo anterior'}</span>{admin && <button className="text-[#8B4513] underline" onClick={() => { setDay(row.session_date); setStatus(row.status); }}>Corregir</button>}</div>)}
    {profile.recoveries.map(r => <p key={r.id} className="border-t border-[#E7D9C8] pt-2">Reactivación {new Date(r.created_at).toLocaleDateString('es-MX')}: {r.note}</p>)}
   </div>}
  </>}
  {message && <p role="status" className="mt-3 text-sm text-[#8B4513]">{message}</p>}
 </section>;
}
