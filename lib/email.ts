import 'server-only'
import { Resend } from 'resend'

const FROM = process.env.RESEND_FROM || 'SquareOne Compassion <onboarding@resend.dev>'

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

export async function sendEmail(opts: { to: string; subject: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set; skipping', opts.subject)
    return false
  }
  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(opts.text)}</pre>`,
    replyTo: opts.replyTo,
  })
  if (error) {
    console.error('[email]', error)
    return false
  }
  return true
}
