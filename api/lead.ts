import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

/**
 * POST /api/lead — envia o lead do formulário por e-mail via Gmail SMTP.
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *   GMAIL_USER          conta remetente (ex.: processlabcompany@gmail.com)
 *   GMAIL_APP_PASSWORD  senha de app do Google (não a senha normal da conta)
 *   LEAD_TO             destinatário (ex.: yuri@iafit.site)
 */

const FIELDS: Array<[key: string, label: string, required: boolean, max: number]> = [
  ['nome', 'Nome', true, 120],
  ['loja', 'Loja', true, 120],
  ['whatsapp', 'WhatsApp', true, 30],
  ['email', 'E-mail', true, 160],
  ['segmento', 'Segmento', true, 60],
  ['lojas', 'Número de lojas', true, 40],
  ['mensagem', 'Mensagem', false, 2000],
];

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, LEAD_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !LEAD_TO) {
    console.error('[lead] variáveis de ambiente ausentes');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}) as Record<string, unknown>;

  // honeypot anti-spam: campo invisível que humanos não preenchem
  if (typeof body.empresa_site === 'string' && body.empresa_site.trim()) {
    return res.status(200).json({ ok: true });
  }

  const data: Record<string, string> = {};
  for (const [key, , required, max] of FIELDS) {
    const v = typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, max) : '';
    if (required && !v) return res.status(400).json({ ok: false, error: `missing_${key}` });
    data[key] = v;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (body.consentimento !== 'sim') {
    return res.status(400).json({ ok: false, error: 'missing_consent' });
  }

  const rows = FIELDS
    .filter(([k]) => data[k])
    .map(([k, label]) => `<tr><td style="padding:8px 16px 8px 0;color:#64748B;vertical-align:top">${label}</td><td style="padding:8px 0;color:#111827">${esc(data[k]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  const wa = data.whatsapp.replace(/\D/g, '');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Visto · Site" <${GMAIL_USER}>`,
      to: LEAD_TO,
      replyTo: `"${data.nome.replace(/"/g, '')}" <${data.email}>`,
      subject: `Novo lead: ${data.loja} (${data.nome})`,
      text: FIELDS.filter(([k]) => data[k]).map(([k, label]) => `${label}: ${data[k]}`).join('\n')
        + `\n\nWhatsApp: https://wa.me/55${wa}`,
      html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px">
        <h2 style="color:#111827;margin:0 0 4px">Novo lead pelo site</h2>
        <p style="color:#64748B;margin:0 0 20px">Formulário "Conhecer o Visto"</p>
        <table style="border-collapse:collapse;font-size:15px">${rows}</table>
        <p style="margin-top:24px"><a href="https://wa.me/55${wa}" style="background:#135CFF;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none">Responder no WhatsApp</a></p>
      </div>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[lead] falha ao enviar e-mail', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
