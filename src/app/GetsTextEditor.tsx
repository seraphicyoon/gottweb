import { useEffect, useRef, useState } from 'react';
import { getsEditorDb, EDITABLE_CONTENT } from './getsEditorDb';

const SIZE_OPTIONS = [14, 16, 18, 20, 24, 28, 32, 36, 42];
function renderFormatted(value: string) {
  const parts = value.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => part.startsWith('**') && part.endsWith('**')
    ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>);
}
function useGetsAdmin() {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: { user } } = await getsEditorDb.auth.getUser();
      if (!user) { if (active) setAuthorized(false); return; }
      const { data } = await getsEditorDb.from('gets_admins').select('user_id').eq('user_id', user.id).maybeSingle();
      if (active) setAuthorized(!!data);
    };
    void check();
    const { data } = getsEditorDb.auth.onAuthStateChange(() => { void check(); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  return authorized;
}
export function EditableText({ contentKey, fallback }: { contentKey: string; fallback: string }) {
  const authorized = useGetsAdmin();
  const [value, setValue] = useState(fallback);
  const [draft, setDraft] = useState(fallback);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [draftSize, setDraftSize] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getsEditorDb.from('gets_content').select('body').eq('key', contentKey).maybeSingle()
      .then(({ data }) => {
        if (!active || data?.body == null) return;
        try {
          const parsed = JSON.parse(data.body);
          if (parsed && typeof parsed.text === 'string') {
            setValue(parsed.text); setDraft(parsed.text);
            if (SIZE_OPTIONS.includes(parsed.size)) setFontSize(parsed.size);
            return;
          }
        } catch { /* legacy plain text */ }
        setValue(data.body); setDraft(data.body);
      });
    return () => { active = false; };
  }, [contentKey]);
  async function save() {
    setSaving(true); setError('');
    const { data: { user } } = await getsEditorDb.auth.getUser();
    if (!user) { setError('Inicia sesión de nuevo.'); setSaving(false); return; }
    const body = JSON.stringify({ text: draft, size: draftSize });
    const { error: saveError } = await getsEditorDb.from('gets_content').upsert({
      key: contentKey, body, updated_at: new Date().toISOString(), updated_by: user.id,
    }, { onConflict: 'key' });
    setSaving(false);
    if (saveError) { setError('No se pudo guardar.'); return; }
    setValue(draft); setFontSize(draftSize); setEditing(false);
  }
  return <span className="relative inline max-w-full align-baseline">
    {!editing ? <>
      <span style={fontSize ? { fontSize: fontSize + 'px', whiteSpace: 'pre-line' } : { whiteSpace: 'pre-line' }}>{renderFormatted(value)}</span>
      {authorized && <button type="button" aria-label="Editar texto" onClick={() => { setDraft(value); setDraftSize(fontSize); setEditing(true); }}
        className="ml-2 inline-flex align-middle rounded-md border border-[#8B4513]/30 bg-[#FFF8ED] px-1.5 py-0.5 text-xs font-sans not-italic font-semibold text-[#8B4513] hover:bg-[#F5E9DA]">✎ Editar</button>}
    </> : <span className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 text-left not-italic font-sans text-base font-normal text-[#5C4033]" role="dialog" aria-modal="true" aria-label="Editar texto"><span className="block w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 md:p-8 shadow-2xl">
      <div className="flex flex-wrap gap-2 mb-2">
        <button type="button" title="Poner selección en negritas" onClick={() => {
          const el = textAreaRef.current;
          if (!el) return;
          const a = el.selectionStart, b = el.selectionEnd;
          setDraft(draft.slice(0, a) + '**' + draft.slice(a, b) + '**' + draft.slice(b));
        }} className="rounded border px-3 py-1 font-bold">B Negrita</button>
        <label className="text-sm">Tamaño <select aria-label="Tamaño de letra" className="rounded border px-2 py-1" value={draftSize ?? ""} onChange={e => setDraftSize(e.target.value ? Number(e.target.value) : null)}><option value="">Original</option>
          {SIZE_OPTIONS.map(size => <option key={size} value={size}>{size} px</option>)}
        </select></label>
      </div>
      <textarea ref={textAreaRef} aria-label="Editar texto" value={draft} onChange={e => setDraft(e.target.value)} rows={Math.max(3, Math.min(10, draft.split('\n').length + Math.ceil(draft.length / 65)))} className="block w-full min-h-40 rounded-xl border border-[#E7D9C8] p-4 text-lg leading-relaxed text-[#5C4033]" />
      <p className="text-xs text-[#755E51] my-2">Selecciona palabras y pulsa Negrita. El tamaño se aplica a este bloque.</p>
      <span className="flex flex-wrap gap-2 mt-2">
        <button type="button" disabled={saving} onClick={() => void save()} className="rounded-md bg-[#8B4513] px-3 py-2 text-sm text-white disabled:opacity-50">{saving ? 'Guardando…' : 'Guardar'}</button>
        <button type="button" onClick={() => { setEditing(false); setError(''); }} className="rounded-md border border-[#E7D9C8] px-3 py-2 text-sm text-[#5C4033]">Cancelar</button>
      </span>
      {error && <span role="alert" className="block mt-2 text-sm text-red-700">{error}</span>}
    </span></span>}
  </span>;
}

export function EditableList({ listKey, items, compact = false }: { listKey: string; items: string[]; compact?: boolean }) {
  const authorized = useGetsAdmin();
  const [entries, setEntries] = useState(items);
  const [draft, setDraft] = useState(items);
  const listTextareas = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getsEditorDb.from('gets_content').select('body').eq('key', listKey).maybeSingle().then(({ data }) => {
      if (!active || !data?.body) return;
      try { const parsed = JSON.parse(data.body); if (Array.isArray(parsed) && parsed.every(x => typeof x === 'string')) { setEntries(parsed); setDraft(parsed); } } catch { /* keep defaults */ }
    });
    return () => { active = false; };
  }, [listKey]);
  async function save() {
    setSaving(true); setError('');
    const { data: { user } } = await getsEditorDb.auth.getUser();
    if (!user) { setSaving(false); setError('Inicia sesión de nuevo.'); return; }
    const clean = draft.filter(x => x.trim());
    const { error: saveError } = await getsEditorDb.from('gets_content').upsert({ key: listKey, body: JSON.stringify(clean), updated_by: user.id, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setSaving(false);
    if (saveError) { setError('No se pudieron guardar las viñetas.'); return; }
    setEntries(clean); setDraft(clean); setEditing(false);
  }
  return <div>
    <ul className={compact ? "space-y-2 list-disc pl-5 text-gray-600" : "space-y-5 list-disc pl-7 md:pl-9 text-[#5C4033]"}>
      {entries.map((entry, index) => <li key={index} className={compact ? "pl-0 text-xs md:text-sm leading-relaxed" : "pl-2 text-lg md:text-xl leading-relaxed"}><span>{renderFormatted(entry)}</span></li>)}
    </ul>
    {authorized && <div className="mt-5">
      {!editing ? <button type="button" onClick={() => { setDraft([...entries]); setEditing(true); }} className="rounded-lg border border-[#C5A37E] bg-white px-4 py-2 text-sm text-[#8B4513]">✎ Editar esquema y añadir viñetas</button> : <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Editar lista"><div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 md:p-8 shadow-2xl space-y-5">
        <h2 className="text-2xl font-semibold text-[#5C4033]">Editar lista</h2>
        <p className="text-sm text-[#755E51]">Modifica cada punto como si fuera un documento. También puedes agregar más.</p>
        {draft.map((item, index) => <div key={index} className="rounded-xl border border-[#E7D9C8] p-4 space-y-3">
          <div className="flex items-center justify-between gap-3"><strong className="text-[#5C4033]">Punto {index + 1}</strong><button type="button" className="text-sm text-red-700 underline" onClick={() => setDraft(v => v.filter((_, i) => i !== index))}>Eliminar punto</button></div>
          <textarea ref={el => { listTextareas.current[index] = el; }} aria-label={'Texto del punto ' + (index + 1)} rows={3} className="block w-full min-h-24 rounded-lg border border-[#E7D9C8] p-3 text-base leading-relaxed" value={item} onChange={e => setDraft(v => v.map((x, i) => i === index ? e.target.value : x))} />
          <button type="button" className="rounded-lg border border-[#C5A37E] px-3 py-2 font-bold text-[#5C4033]" onClick={() => {
            const el = listTextareas.current[index]; if (!el) return;
            const a = el.selectionStart, b = el.selectionEnd; if (a === b) { el.focus(); return; }
            setDraft(v => v.map((x, i) => i === index ? x.slice(0,a) + '**' + x.slice(a,b) + '**' + x.slice(b) : x));
          }}>B Negrita al texto seleccionado</button>
        </div>)}
        <button type="button" onClick={() => setDraft(v => [...v, ''])} className="w-full rounded-xl border-2 border-dashed border-[#C5A37E] p-4 text-[#8B4513] font-semibold">+ Añadir otro punto</button>
        <div className="flex flex-wrap gap-3 border-t pt-4">
          <button type="button" disabled={saving} onClick={() => void save()} className="rounded-xl bg-[#8B4513] px-6 py-3 text-white font-semibold">{saving ? 'Guardando…' : 'Guardar cambios'}</button>
          <button type="button" onClick={() => { setEditing(false); setError(''); }} className="rounded-xl border px-6 py-3 text-[#5C4033]">Cancelar</button>
        </div>
        {error && <p role="alert" className="text-red-700">{error}</p>}
      </div></div>}
    </div>}
  </div>;
}

export function GetsTextEditor() {
  const [session, setSession] = useState<Awaited<ReturnType<typeof getsEditorDb.auth.getSession>>['data']['session']>(null);
  const [allowed, setAllowed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getsEditorDb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = getsEditorDb.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    let active = true;
    setAllowed(false);
    if (!session) return;
    getsEditorDb.from('gets_admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      .then(({ data }) => { if (active) setAllowed(!!data); });
    return () => { active = false; };
  }, [session?.user.id]);
  useEffect(() => {
    if (!allowed) return;
    getsEditorDb.from('gets_content').select('key,body').then(({ data, error }) => {
      if (error) { setMessage('No se pudieron cargar los textos.'); return; }
      const saved = Object.fromEntries((data || []).map(row => [row.key, row.body]));
      setValues(Object.fromEntries(EDITABLE_CONTENT.map(item => [item.key, saved[item.key] ?? item.defaultText])));
    });
  }, [allowed]);

  async function authenticate(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setMessage('');
    const result = mode === 'signup'
      ? await getsEditorDb.auth.signUp({ email: email.trim(), password })
      : await getsEditorDb.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (mode === 'signup') {
      if (result.data.session) window.location.assign('/nosotros');
      else setMessage('Cuenta creada. Si ya está activa, inicia sesión; de lo contrario, revisa su estado en Supabase.');
    } else window.location.assign('/nosotros');
  }

  async function save(key: string) {
    setBusy(true); setMessage('');
    const { error } = await getsEditorDb.from('gets_content').upsert({
      key, body: values[key] ?? '', updated_at: new Date().toISOString(), updated_by: session?.user.id,
    }, { onConflict: 'key' });
    setBusy(false);
    setMessage(error ? 'No se pudo guardar: ' + error.message : 'Cambios guardados. Actualiza la página para verlos.');
  }

  return <main className="min-h-[75vh] bg-[#F9F5EE] px-4 py-12">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#5C4033] mb-3">Editor de textos GETS</h1>
      <p className="text-[#755E51] mb-8">Inicia sesión aquí para activar la edición directamente sobre la página.</p>
      {!session ? <form onSubmit={authenticate} className="bg-white border border-[#E7D9C8] rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-[#5C4033]">{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta de administración'}</h2>
        <input className="w-full border rounded-lg p-3" type="email" autoComplete="email" required placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-lg p-3" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="rounded-lg bg-[#8B4513] px-5 py-3 text-white disabled:opacity-50" disabled={busy} type="submit">{mode === 'login' ? 'Entrar' : 'Registrarme'}</button>
        <button type="button" className="block text-[#8B4513] underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Crear mi cuenta' : 'Ya tengo una cuenta'}</button>
      </form> : !allowed ? <div className="bg-white rounded-xl p-6"><p>Esta cuenta no tiene permisos de administración.</p><button className="underline text-[#8B4513] mt-4" onClick={() => getsEditorDb.auth.signOut()}>Cerrar sesión</button></div> : <>
        <a href="/nosotros" className="inline-block mb-5 rounded-lg bg-[#8B4513] px-4 py-2 text-white">Ir a la página y editar directamente</a><div className="flex justify-between items-center mb-6 text-sm text-[#755E51]"><span>{session.user.email}</span><button className="underline text-[#8B4513]" onClick={() => getsEditorDb.auth.signOut()}>Cerrar sesión</button></div>
        <div className="space-y-5">{EDITABLE_CONTENT.map(item => <section key={item.key} className="bg-white border border-[#E7D9C8] rounded-xl p-5">
          <label className="block font-semibold text-[#5C4033] mb-3" htmlFor={item.key}>{item.label}</label>
          <textarea id={item.key} rows={3} className="w-full border border-[#E7D9C8] rounded-lg p-3 text-[#5C4033]" value={values[item.key] ?? item.defaultText} onChange={e => setValues(v => ({ ...v, [item.key]: e.target.value }))} />
          <button type="button" disabled={busy} onClick={() => save(item.key)} className="mt-3 rounded-lg bg-[#8B4513] px-4 py-2 text-white disabled:opacity-50">Guardar cambios</button>
        </section>)}</div>
      </>}
      {message && <p role="status" className="mt-5 rounded-xl bg-white border border-[#E7D9C8] p-4 text-[#5C4033]">{message}</p>}
    </div>
  </main>;
}
