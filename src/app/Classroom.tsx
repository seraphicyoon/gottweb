import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

const field = 'w-full rounded-xl border border-[#E7D9C8] bg-white px-3 py-2 text-[#5C4033]';
const button = 'rounded-xl bg-[#8B4513] px-4 py-2 text-white disabled:opacity-50';
const secondary = 'rounded-xl border border-[#E7D9C8] bg-white px-4 py-2 text-[#8B4513] disabled:opacity-50';
const setupMessage = 'Falta activar el espacio de alumnas en Supabase. Ejecuta el archivo supabase/classroom.sql del repositorio.';
const date = (value: string) => new Date(value).toLocaleDateString('es-MX');

type Account = { user_id: string; full_name: string; email: string; joined_at: string; is_student: boolean; is_admin: boolean; is_banned: boolean; total_count: number };
type Post = { id: string; author_id: string; author_name: string; kind: 'material' | 'discussion'; title: string; body: string; status: 'pending' | 'approved' | 'rejected'; attachment_path: string | null; attachment_name: string | null; created_at: string };
type Reply = { id: string; post_id: string; author_id: string; author_name: string; body: string; status: 'pending' | 'approved' | 'rejected'; created_at: string };

export function StudentManager({ session }: { session: Session }) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [onlyStudents, setOnlyStudents] = useState(false);
  const [offset, setOffset] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    if (!supabase) { setMessage(setupMessage); setLoading(false); return; }
    supabase.rpc('gets_list_accounts', { search_term: query, students_only: onlyStudents, page_offset: offset })
      .then(({ data, error }) => {
        if (!active) return;
        setLoading(false);
        if (error) { setAccounts([]); setTotal(0); setMessage(setupMessage); return; }
        setAccounts(data || []); setTotal(Number(data?.[0]?.total_count || 0));
      });
    return () => { active = false; };
  }, [query, onlyStudents, offset, revision]);
  async function changeMembership(account: Account) {
    if (!supabase || busy) return;
    const action = account.is_student ? 'Quitar de alumnas' : 'Dar de alta como alumna';
    if (!window.confirm(`${action} a ${account.full_name} (${account.email})?${account.is_student ? ' Perderá el acceso a materiales y al foro privado. Su cuenta se conserva.' : ''}`)) return;
    setBusy(true); setMessage('');
    try {
      const result = account.is_student
        ? await supabase.from('gets_students').delete().eq('user_id', account.user_id).select('user_id')
        : await supabase.from('gets_students').insert({ user_id: account.user_id, enrolled_by: session.user.id }).select('user_id');
      if (result.error || !result.data?.length) throw new Error('No se pudo guardar el cambio. Actualiza e inténtalo de nuevo.');
      setMessage(account.is_student ? 'Alta de alumna retirada. Su cuenta sigue activa.' : 'Alumna dada de alta. Ya puede entrar al espacio privado.');
      if (offset && accounts.length === 1 && onlyStudents && account.is_student) setOffset(Math.max(0, offset - 25));
      setRevision(n => n + 1);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo guardar el cambio.'); }
    finally { setBusy(false); }
  }
  return <section className="mb-10 rounded-2xl border border-[#E7D9C8] bg-white p-5 sm:p-7">
    <h2 className="text-2xl font-bold text-[#5C4033]">Usuarios y alumnas</h2>
    <p className="mt-2 mb-5 text-sm text-[#755E51]">Las cuentas nuevas son usuarias comunes. Da de alta a las alumnas que identifiques para que puedan ver materiales y participar en el foro privado. Las administradoras también tienen acceso.</p>
    <form onSubmit={e => { e.preventDefault(); setQuery(search.trim()); setOffset(0); setMessage(''); setRevision(n => n + 1); }} className="flex flex-wrap gap-2">
      <label htmlFor="student-search" className="sr-only">Buscar por nombre o correo</label>
      <input id="student-search" type="search" maxLength={120} value={search} onChange={e => setSearch(e.target.value)} placeholder="Nombre o correo" className={`${field} flex-1 min-w-0`} />
      <button className={button}>Buscar</button>
    </form>
    <div className="mt-4 flex flex-wrap gap-2">
      <button className={onlyStudents ? secondary : button} aria-pressed={!onlyStudents} onClick={() => { setOnlyStudents(false); setOffset(0); setMessage(''); }}>Todas las cuentas</button>
      <button className={onlyStudents ? button : secondary} aria-pressed={onlyStudents} onClick={() => { setOnlyStudents(true); setOffset(0); setMessage(''); }}>Solo alumnas</button>
      <button className={secondary} onClick={() => { setMessage(''); setRevision(n => n + 1); }}>Actualizar</button>
    </div>
    {message && <p role="status" className="mt-4 text-sm text-[#8B4513]">{message}</p>}
    {loading ? <p className="mt-5 text-[#755E51]">Cargando cuentas…</p> : accounts.length ? <ul className="mt-5 space-y-3">{accounts.map(account => <li key={account.user_id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E7D9C8] p-4">
      <div className="min-w-0"><p className="font-semibold text-[#5C4033]">{account.full_name}</p><p className="break-all text-sm text-[#755E51]">{account.email}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-[#F5EFE8] px-2 py-1 text-[#8B4513]">{account.is_student ? 'Alumna' : 'Usuaria'}</span>{account.is_admin && <span className="px-2 py-1 text-[#8B4513]">Administradora · acceso privado</span>}{account.is_banned && <span className="px-2 py-1 text-red-700">Cuenta restringida</span>}</div>
      </div>
      <button disabled={busy || loading} onClick={() => void changeMembership(account)} className={account.is_student ? secondary : button}>{account.is_student ? 'Quitar de alumnas' : 'Dar de alta como alumna'}</button>
    </li>)}</ul> : <p className="mt-5 text-[#755E51]">No hay cuentas que coincidan con esta búsqueda.</p>}
    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#755E51]">
      <button disabled={loading || busy || !offset} className={secondary} onClick={() => setOffset(Math.max(0, offset - 25))}>Anterior</button>
      <span>{total ? `${offset + 1}–${offset + accounts.length} de ${total}` : '0 resultados'}</span>
      <button disabled={loading || busy || offset + accounts.length >= total} className={secondary} onClick={() => setOffset(offset + 25)}>Siguiente</button>
    </div>
  </section>;
}

export function Classroom({ session, isAdmin, onLogin, onAdmin }: { session: Session | null; isAdmin: boolean; onLogin: () => void; onAdmin: () => void }) {
  const [access, setAccess] = useState<'loading' | 'allowed' | 'denied' | 'setup'>('loading');
  const [tab, setTab] = useState<'material' | 'discussion' | 'moderation'>('material');
  const [posts, setPosts] = useState<Post[]>([]);
  const [pendingReplies, setPendingReplies] = useState<Reply[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyBody, setReplyBody] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [replyLimit, setReplyLimit] = useState(50);
  const request = useRef(0);
  const replyRequest = useRef(0);
  function clearPrivateData() { setPosts([]); setPendingReplies([]); setSelected(null); setReplies([]); setTitle(''); setBody(''); setReplyBody(''); setFile(null); }
  async function checkAccess() {
    if (!session || !supabase) { setAccess('denied'); clearPrivateData(); return false; }
    const { data, error } = await supabase.rpc('gets_can_access_classroom');
    if (error || !data) { setAccess(error ? 'setup' : 'denied'); clearPrivateData(); return false; }
    setAccess('allowed'); return true;
  }
  async function refresh() {
    const version = ++request.current;
    setLoading(true);
    try {
      if (!await checkAccess() || !supabase || version !== request.current) return;
      let query = supabase.from('gets_classroom_posts').select('*').order('created_at', { ascending: false });
      query = tab === 'moderation' ? query.eq('status', 'pending') : query.eq('kind', tab).in('status', ['approved', 'pending']);
      const result = await query.range(offset, offset + 19);
      if (version !== request.current) return;
      if (result.error) throw new Error('No se pudieron cargar las publicaciones.');
      setPosts(result.data || []); setHasNext((result.data?.length || 0) === 20);
      if (tab === 'moderation' && isAdmin) {
        const pending = await supabase.from('gets_classroom_replies').select('*').eq('status', 'pending').order('created_at').range(offset, offset + 19);
        if (version !== request.current) return;
        if (pending.error) throw new Error('No se pudieron cargar las respuestas pendientes.');
        setPendingReplies(pending.data || []); setHasNext((result.data?.length || 0) === 20 || (pending.data?.length || 0) === 20);
      } else setPendingReplies([]);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo cargar el espacio privado.'); }
    finally { if (version === request.current) setLoading(false); }
  }
  useEffect(() => {
    clearPrivateData(); setMessage(''); setAccess('loading');
    void refresh();
    const recheck = () => { void checkAccess().catch(() => { setAccess('denied'); clearPrivateData(); }); };
    const timer = window.setInterval(recheck, 60000);
    window.addEventListener('focus', recheck);
    return () => { request.current++; replyRequest.current++; window.clearInterval(timer); window.removeEventListener('focus', recheck); };
  }, [session?.user.id, tab, offset, isAdmin]);
  useEffect(() => {
    const version = ++replyRequest.current;
    setReplies([]);
    if (!selected || !supabase) return;
    const postId = selected.id;
    supabase.from('gets_classroom_replies').select('*').eq('post_id', postId).in('status', ['approved', 'pending']).order('created_at').limit(replyLimit)
      .then(({ data, error }) => {
        if (version !== replyRequest.current) return;
        if (error) setMessage('No se pudieron cargar las respuestas.'); else setReplies(data || []);
      });
    return () => { replyRequest.current++; };
  }, [selected?.id, replyLimit]);
  async function publish(event: FormEvent) {
    event.preventDefault();
    if (!session || !supabase || busy || tab === 'moderation') return;
    setBusy(true); setMessage('');
    let attachmentPath: string | null = null;
    let saved = false;
    try {
      if (!await checkAccess()) return;
      const id = crypto.randomUUID();
      if (isAdmin && tab === 'material' && file) {
        if (file.size > 20 * 1024 * 1024) throw new Error('El archivo debe pesar como máximo 20 MB.');
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !['pdf', 'jpg', 'jpeg', 'png', 'webp', 'doc', 'docx', 'ppt', 'pptx', 'mp3', 'mp4'].includes(extension)) throw new Error('Elige un PDF, documento, imagen, MP3 o MP4.');
        attachmentPath = `${id}/${crypto.randomUUID()}.${extension}`;
        const upload = await supabase.storage.from('gets-classroom').upload(attachmentPath, file, { upsert: false });
        if (upload.error) throw new Error('No se pudo subir el archivo privado. Comprueba el tipo y el tamaño.');
      }
      const result = await supabase.from('gets_classroom_posts').insert({ id, author_id: session.user.id, kind: tab, title: title.trim(), body: body.trim(), status: isAdmin ? 'approved' : 'pending', attachment_path: attachmentPath, attachment_name: attachmentPath ? file!.name : null }).select('id');
      if (result.error || !result.data?.length) throw new Error('No se pudo guardar la publicación.');
      saved = true; setTitle(''); setBody(''); setFile(null); setFileKey(n => n + 1);
      await refresh(); setMessage(isAdmin ? 'Publicación creada en el espacio privado.' : 'Conversación enviada. Esperará la aprobación de una administradora.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo publicar.'); }
    finally {
      if (attachmentPath && !saved) await supabase.storage.from('gets-classroom').remove([attachmentPath]);
      setBusy(false);
    }
  }
  async function reply(event: FormEvent) {
    event.preventDefault();
    if (!session || !supabase || !selected || busy) return;
    setBusy(true); setMessage('');
    try {
      if (!await checkAccess()) return;
      const result = await supabase.from('gets_classroom_replies').insert({ post_id: selected.id, author_id: session.user.id, body: replyBody.trim(), status: isAdmin ? 'approved' : 'pending' }).select('*');
      if (result.error || !result.data?.length) throw new Error('No se pudo enviar la respuesta.');
      setReplyBody(''); setReplies(previous => [...previous, ...result.data]);
      setMessage(isAdmin ? 'Respuesta publicada.' : 'Respuesta enviada. Esperará aprobación.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo responder.'); }
    finally { setBusy(false); }
  }
  async function download(post: Post) {
    if (!supabase || !post.attachment_path || busy) return;
    setBusy(true); setMessage('');
    try {
      if (!await checkAccess()) return;
      const { data, error } = await supabase.storage.from('gets-classroom').download(post.attachment_path);
      if (error || !data) throw new Error('No se pudo descargar el material. Comprueba que sigues teniendo acceso.');
      const url = URL.createObjectURL(data);
      const link = document.createElement('a'); link.href = url; link.download = post.attachment_name || 'material'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo descargar.'); }
    finally { setBusy(false); }
  }
  async function moderate(table: 'gets_classroom_posts' | 'gets_classroom_replies', item: Post | Reply, action: 'approved' | 'rejected' | 'delete') {
    if (!supabase || !isAdmin || busy) return;
    if (action === 'delete' && !window.confirm('¿Eliminar definitivamente esta publicación o respuesta? No se puede deshacer.')) return;
    setBusy(true); setMessage('');
    try {
      const result = action === 'delete' ? await supabase.from(table).delete().eq('id', item.id).select('id') : await supabase.from(table).update({ status: action }).eq('id', item.id).select('id');
      if (result.error || !result.data?.length) throw new Error('No se pudo guardar la decisión.');
      if (action === 'delete' && 'attachment_path' in item && item.attachment_path) {
        const cleanup = await supabase.storage.from('gets-classroom').remove([item.attachment_path]);
        if (cleanup.error) setMessage('Publicación eliminada. No se pudo limpiar el archivo adjunto; contacta con la administradora de Supabase.');
      }
      if (table === 'gets_classroom_posts') { setSelected(null); setReplies([]); }
      else setReplies(previous => action === 'delete' ? previous.filter(r => r.id !== item.id) : previous.map(r => r.id === item.id ? { ...r, status: action } : r).filter(r => r.status !== 'rejected'));
      await refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo moderar.'); }
    finally { setBusy(false); }
  }
  const controls = (table: 'gets_classroom_posts' | 'gets_classroom_replies', item: Post | Reply) => isAdmin && <div className="mt-4 flex flex-wrap gap-2 text-sm">
    {item.status !== 'approved' && <button disabled={busy} className={button} onClick={() => void moderate(table, item, 'approved')}>Aprobar</button>}
    {item.status !== 'rejected' && <button disabled={busy} className={secondary} onClick={() => void moderate(table, item, 'rejected')}>{item.status === 'approved' ? 'Ocultar' : 'Rechazar'}</button>}
    <button disabled={busy} className="rounded-xl border border-red-300 px-4 py-2 text-red-700 disabled:opacity-50" onClick={() => void moderate(table, item, 'delete')}>Eliminar</button>
  </div>;
  const status = (item: Post | Reply) => item.status !== 'approved' && <span className="ml-2 text-xs font-semibold text-[#8B4513]">{item.status === 'pending' ? 'Pendiente de aprobación' : 'Rechazada'}</span>;
  if (!session) return <main className="min-h-[65vh] bg-[#F9F5EE] px-4 py-16 text-center"><h1 className="text-3xl font-bold text-[#5C4033]">Espacio de alumnas</h1><p className="my-6 text-[#755E51]">Inicia sesión para consultar si tienes acceso a los materiales y al foro privado.</p><button className={button} onClick={onLogin}>Ingresar</button></main>;
  if (access !== 'allowed') return <main className="min-h-[65vh] bg-[#F9F5EE] px-4 py-16 text-center"><h1 className="text-3xl font-bold text-[#5C4033]">Espacio de alumnas</h1><p className="mx-auto my-6 max-w-xl text-[#755E51]">{access === 'loading' ? 'Comprobando acceso…' : access === 'setup' ? (isAdmin ? setupMessage : 'El espacio de alumnas todavía no está disponible. Inténtalo más tarde.') : 'Este espacio es exclusivo para alumnas dadas de alta por una administradora. Si eres alumna, pide que identifiquen tu cuenta. Una cuenta restringida no puede entrar.'}</p>{access !== 'loading' && <button className={button} onClick={() => void refresh()}>Comprobar de nuevo</button>}{isAdmin && <button className={`${secondary} ml-2`} onClick={onAdmin}>Ir al panel</button>}</main>;
  return <main className="min-h-[75vh] bg-[#F9F5EE] px-4 py-10 sm:py-14"><div className="mx-auto max-w-4xl">
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-[#8B4513]">Comunidad privada GETS</p><h1 className="mt-2 text-3xl font-bold text-[#5C4033]">Espacio de alumnas</h1><p className="mt-3 text-[#755E51]">Materiales y conversaciones para nuestras alumnas. Las participaciones se revisan antes de publicarse.</p></div>{isAdmin && <button className={secondary} onClick={onAdmin}>Administrar alumnas</button>}</div>
    <div className="mb-6 flex flex-wrap gap-2">{([['material', 'Materiales'], ['discussion', 'Conversaciones'], ...(isAdmin ? [['moderation', 'Pendientes de aprobación']] : [])] as [typeof tab, string][]).map(([key, label]) => <button key={key} disabled={busy} className={tab === key ? button : secondary} aria-pressed={tab === key} onClick={() => { setOffset(0); setTab(key); }}>{label}</button>)}<button disabled={busy || loading} className={secondary} onClick={() => { setMessage(''); setSelected(null); void refresh(); }}>Actualizar</button></div>
    {message && <p role="status" className="mb-5 rounded-xl border border-[#E7D9C8] bg-white p-4 text-sm text-[#8B4513]">{message}</p>}
    {tab !== 'moderation' && (tab === 'discussion' || isAdmin) && <form onSubmit={publish} className="mb-8 space-y-4 rounded-2xl border border-[#E7D9C8] bg-white p-5 sm:p-7">
      <h2 className="text-xl font-bold text-[#5C4033]">{tab === 'material' ? 'Publicar material exclusivo' : 'Iniciar una conversación'}</h2>
      <label className="block text-sm font-semibold text-[#5C4033]">Título<input value={title} onChange={e => setTitle(e.target.value)} required maxLength={150} className={`${field} mt-2`} /></label>
      <label className="block text-sm font-semibold text-[#5C4033]">{tab === 'material' ? 'Descripción o contenido' : 'Tu mensaje'}<textarea value={body} onChange={e => setBody(e.target.value)} required rows={4} maxLength={10000} className={`${field} mt-2`} /></label>
      {tab === 'material' && isAdmin && <label className="block text-sm font-semibold text-[#5C4033]">Archivo privado (opcional)<input key={fileKey} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.ppt,.pptx,.mp3,.mp4" onChange={e => setFile(e.target.files?.[0] || null)} className="mt-2 block w-full text-sm" /><span className="mt-2 block font-normal text-[#755E51]">PDF, documentos, imágenes, MP3 o MP4. Máximo 20 MB.</span></label>}
      <button disabled={busy || !title.trim() || !body.trim()} className={button}>{busy ? 'Guardando…' : isAdmin ? 'Publicar' : 'Enviar para aprobación'}</button>
    </form>}
    {selected ? <section className="rounded-2xl border border-[#E7D9C8] bg-white p-5 sm:p-7">
      <button className="mb-5 text-[#8B4513] underline" onClick={() => { setSelected(null); setReplyBody(''); }}>Volver a la lista</button>
      <h2 className="text-2xl font-bold text-[#5C4033]">{selected.title}</h2><p className="mt-2 text-sm text-[#755E51]">{selected.author_name} · {date(selected.created_at)}{status(selected)}</p><p className="my-6 whitespace-pre-wrap break-words text-[#5C4033]">{selected.body}</p>
      {selected.attachment_path && <button disabled={busy} className={button} onClick={() => void download(selected)}>Descargar {selected.attachment_name}</button>}
      {controls('gets_classroom_posts', selected)}
      <h3 className="mt-8 mb-4 text-xl font-semibold text-[#5C4033]">Respuestas</h3>
      {replies.length ? <ul className="space-y-4">{replies.map(item => <li key={item.id} className="rounded-xl border border-[#E7D9C8] p-4"><p className="text-sm font-semibold text-[#8B4513]">{item.author_name} · {date(item.created_at)}{status(item)}</p><p className="mt-3 whitespace-pre-wrap break-words text-[#5C4033]">{item.body}</p>{controls('gets_classroom_replies', item)}</li>)}</ul> : <p className="text-[#755E51]">Aún no hay respuestas publicadas.</p>}
      {replies.length >= replyLimit && <button className={`${secondary} mt-4`} onClick={() => setReplyLimit(n => n + 50)}>Ver más respuestas</button>}
      {selected.status === 'approved' && <form onSubmit={reply} className="mt-6 space-y-3"><label className="block font-semibold text-[#5C4033]">Tu respuesta<textarea required maxLength={2000} rows={3} className={`${field} mt-2`} value={replyBody} onChange={e => setReplyBody(e.target.value)} /></label><button disabled={busy || !replyBody.trim()} className={button}>{busy ? 'Enviando…' : 'Enviar respuesta'}</button></form>}
    </section> : <>
      {loading ? <p className="text-[#755E51]">Cargando publicaciones…</p> : <div className="space-y-4">{posts.map(post => <article key={post.id} className="rounded-2xl border border-[#E7D9C8] bg-white p-5"><p className="text-xs font-semibold text-[#8B4513]">{post.kind === 'material' ? 'Material' : 'Conversación'} · {date(post.created_at)}{status(post)}</p><button className="mt-3 text-left text-xl font-bold text-[#5C4033] hover:underline" onClick={() => { setSelected(post); setReplyLimit(50); setReplyBody(''); }}>{post.title}</button><p className="mt-2 text-sm text-[#755E51]">{post.author_name}</p><p className="mt-3 line-clamp-3 whitespace-pre-wrap break-words text-[#5C4033]">{post.body}</p><button className={`${secondary} mt-4`} onClick={() => { setSelected(post); setReplyLimit(50); setReplyBody(''); }}>Ver publicación</button>{controls('gets_classroom_posts', post)}</article>)}{!posts.length && <p className="rounded-xl bg-white p-5 text-[#755E51]">{tab === 'material' ? 'Todavía no hay materiales. Las administradoras podrán publicarlos aquí.' : tab === 'moderation' ? 'No hay publicaciones pendientes.' : 'Todavía no hay conversaciones. Puedes iniciar la primera.'}</p>}</div>}
      {tab === 'moderation' && <section className="mt-8"><h2 className="mb-4 text-xl font-bold text-[#5C4033]">Respuestas pendientes</h2>{pendingReplies.length ? <ul className="space-y-3">{pendingReplies.map(item => <li key={item.id} className="rounded-xl border border-[#E7D9C8] bg-white p-5"><p className="text-sm text-[#8B4513]">{item.author_name} · {date(item.created_at)}</p><p className="my-3 whitespace-pre-wrap break-words text-[#5C4033]">{item.body}</p><button className={secondary} onClick={async () => { const result = await supabase!.from('gets_classroom_posts').select('*').eq('id', item.post_id).maybeSingle(); if (result.data) { setSelected(result.data); setReplyLimit(50); } else setMessage('No se pudo abrir la publicación.'); }}>Ver contexto</button>{controls('gets_classroom_replies', item)}</li>)}</ul> : <p className="text-[#755E51]">No hay respuestas pendientes.</p>}</section>}
      <div className="mt-6 flex items-center gap-3"><button disabled={busy || loading || !offset} className={secondary} onClick={() => setOffset(Math.max(0, offset - 20))}>Anterior</button><span className="text-sm text-[#755E51]">Página {Math.floor(offset / 20) + 1}</span><button disabled={busy || loading || !hasNext} className={secondary} onClick={() => setOffset(offset + 20)}>Siguiente</button></div>
    </>}
  </div></main>;
}
