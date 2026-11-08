import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X, Check, ArrowRight, Loader2 } from 'lucide-react';

/**
 * Lead capture form opened by every CTA.
 * Submissions are POSTed as JSON to /api/lead (Vercel function that emails the lead),
 * or to VITE_LEAD_ENDPOINT when set. In `vite dev` there is no /api, so leads are only logged.
 */
const ENDPOINT = (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined)
  || (import.meta.env.DEV ? undefined : '/api/lead');

type Status = 'idle' | 'sending' | 'done' | 'error';

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function LeadForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setStatus('idle'); setError(''); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Informe um WhatsApp válido com DDD.');
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending'); setError('');
    try {
      if (!ENDPOINT) {
        if (import.meta.env.DEV) {
          console.warn('[LeadForm] VITE_LEAD_ENDPOINT não definido — lead não enviado:', data);
          setStatus('done');
          return;
        }
        throw new Error('endpoint');
      }
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, origem: 'landing-page', enviadoEm: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
      form.reset(); setPhone('');
    } catch {
      setStatus('error');
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
    }
  }

  return (
    <dialog
      ref={ref}
      className="lead-dialog"
      aria-labelledby="lead-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      <div className="lead-panel">
        <button type="button" className="lead-close" aria-label="Fechar" onClick={onClose}><X size={18} /></button>

        {status === 'done' ? (
          <div className="lead-done">
            <div className="lead-done-icon"><Check size={26} /></div>
            <h2 id="lead-title">Recebemos seu contato!</h2>
            <p>Nossa equipe vai falar com você pelo WhatsApp em breve para mostrar o Visto na prática.</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Conhecer o Visto</span>
            <h2 id="lead-title">Vamos conversar sobre a sua loja.</h2>
            <p className="lead-sub">Preencha em menos de um minuto. Retornamos pelo WhatsApp.</p>

            <form className="lead-form" onSubmit={submit} noValidate={false}>
              <label className="field">
                <span>Seu nome</span>
                <input name="nome" required autoComplete="name" placeholder="Maria Silva" />
              </label>
              <label className="field">
                <span>Nome da loja</span>
                <input name="loja" required autoComplete="organization" placeholder="Ateliê Aurora" />
              </label>
              <label className="field">
                <span>WhatsApp</span>
                <input
                  name="whatsapp" required inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999"
                  value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))}
                />
              </label>
              <label className="field">
                <span>E-mail</span>
                <input name="email" type="email" required autoComplete="email" placeholder="voce@loja.com.br" />
              </label>
              <label className="field">
                <span>Segmento</span>
                <select name="segmento" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Moda feminina</option>
                  <option>Moda masculina</option>
                  <option>Moda infantil</option>
                  <option>Multimarcas</option>
                  <option>Calçados e acessórios</option>
                  <option>Outro</option>
                </select>
              </label>
              <label className="field">
                <span>Número de lojas</span>
                <select name="lojas" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>1 loja</option>
                  <option>2 a 5 lojas</option>
                  <option>6 a 20 lojas</option>
                  <option>Mais de 20</option>
                  <option>Só vendo online</option>
                </select>
              </label>
              <label className="field field-full">
                <span>Mensagem <em>(opcional)</em></span>
                <textarea name="mensagem" rows={3} placeholder="Conte um pouco sobre a sua operação" />
              </label>
              <input type="text" name="empresa_site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <label className="consent field-full">
                <input type="checkbox" name="consentimento" value="sim" required />
                <span>Aceito ser contatado(a) pelo Visto sobre o produto, conforme a LGPD.</span>
              </label>

              {error && <p className="lead-error field-full" role="alert">{error}</p>}

              <button type="submit" className="btn btn-primary btn-lg field-full" disabled={status === 'sending'}>
                {status === 'sending'
                  ? <><Loader2 size={18} className="spin" /> Enviando…</>
                  : <>Quero conhecer o Visto <ArrowRight size={18} /></>}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
