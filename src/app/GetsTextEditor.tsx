import { useEffect, useState } from 'react';
import { getsEditorDb, EDITABLE_CONTENT } from './getsEditorDb';

export function EditableText({ contentKey, fallback }: { contentKey: string; fallback: string }) {
  const [value, setValue] = useState(fallback);
  const [draft, setDraft] = useState(fallback);
  const [editing, setEditing] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getsEditorDb.from('gets_content').select('body').eq('key', contentKey).maybeSingle()
      .then(({ data }) => { if (active && data?.body != null) { setValue(data.body); setDraft(data.body); } });
    return () => { active = false; };
  }, [contentKey]);
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
  async function save() {
    setSaving(true); setError('');
    const { data: { user } } = await getsEditorDb.auth.getUser();
    if (!user) { setError('Vuelve a iniciar sesión.'); setSaving(false); return; }
    const { error: saveError } = await getsEditorDb.from('gets_content').upsert({
      key: contentKey, body: draft, updated_at: new Date().toISOString(), updated_by: user.id,
    }, { onConflict: 'key' });
    setSaving(false);
    if (saveError) { setError('No se pudo guardar.'); return; }
    setValue(draft); setEditing(false);
  }
  if (!authorized) return <>{value}</>;
  return <span className="relative inline-block max-w-full group/edit align-baseline">
    {!editing ? <>
      <span>{value}</span>{' '}
      <button type="button" aria-label="Editar este texto" title="Editar este texto"
        onClick={() => { setDraft(value); setEditing(true); }}
        className="inline-flex align-middle rounded-md border border-[#8B4513]/30 bg-[#FFF8ED] px-1.5 py-0.5 text-xs font-sans not-italic font-semibold text-[#8B4513] opacity-70 hover:opacity-100 focus:opacity-100">✎ Editar</button>
    </> : <span className="block my-2 rounded-xl border border-[#C5A37E] bg-white p-3 text-left shadow-lg not-italic font-sans text-base font-normal text-[#5C4033] min-w-[min(80vw,320px)]">
      <textarea aria-label="Editar texto" value={draft} onChange={e => setDraft(e.target.value)} rows={Math.max(3, Math.min(10, draft.split('\n').length + Math.ceil(draft.length / 65)))} className="block w-full min-w-[min(70vw,300px)] rounded-md border border-[#E7D9C8] p-2 text-base text-[#5C4033]" />
      <span className="flex flex-wrap gap-2 mt-2">
        <button type="button" disabled={saving} onClick={() => void save()} className="rounded-md bg-[#8B4513] px-3 py-2 text-sm text-white disabled:opacity-50">{saving ? 'Guardando…' : 'Guardar'}</button>
        <button type="button" onClick={() => { setEditing(false); setError(''); }} className="rounded-md border border-[#E7D9C8] px-3 py-2 text-sm text-[#5C4033]">Cancelar</button>
      </span>
      {error && <span role="alert" className="block mt-2 text-sm text-red-700">{error}</span>}
    </span>}
  </span>;
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
    if (mode === 'signup') setMessage('Revisa tu correo para confirmar la cuenta. Después podrás iniciar sesión.');
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
      <p className="text-[#755E51] mb-8">Edita los escritos sin cambiar el diseño de la página.</p>
      {!session ? <form onSubmit={authenticate} className="bg-white border border-[#E7D9C8] rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-[#5C4033]">{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta de administración'}</h2>
        <input className="w-full border rounded-lg p-3" type="email" autoComplete="email" required placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-lg p-3" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="rounded-lg bg-[#8B4513] px-5 py-3 text-white disabled:opacity-50" disabled={busy} type="submit">{mode === 'login' ? 'Entrar' : 'Registrarme'}</button>
        <button type="button" className="block text-[#8B4513] underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Crear mi cuenta' : 'Ya tengo una cuenta'}</button>
      </form> : !allowed ? <div className="bg-white rounded-xl p-6"><p>Esta cuenta no tiene permisos de administración.</p><button className="underline text-[#8B4513] mt-4" onClick={() => getsEditorDb.auth.signOut()}>Cerrar sesión</button></div> : <>
        <div className="flex justify-between items-center mb-6 text-sm text-[#755E51]"><span>{session.user.email}</span><button className="underline text-[#8B4513]" onClick={() => getsEditorDb.auth.signOut()}>Cerrar sesión</button></div>
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
