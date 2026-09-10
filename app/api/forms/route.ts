import { NextResponse } from 'next/server'
import { formSchema, FORM_ROUTING, FORM_TITLES, renderSubmissionText, renderSubmissionHtml } from '@/lib/forms'
import { supabaseAdmin } from '@/lib/supabase'
import { sendEmail, emailConfigured } from '@/lib/email'

export const runtime = 'nodejs'

/**
 * Form submissions go to whichever backends are configured:
 * - Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY): stored in form_submissions
 * - Resend (RESEND_API_KEY): emailed to the routing address for the form kind
 * Either one is enough. With neither, the form reports itself unavailable.
 */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: bots fill the hidden "website" field. Return 200 so they learn nothing.
  if (body && typeof body === 'object' && 'website' in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true })
  }

  const parsed = formSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', issues: parsed.error.issues }, { status: 400 })
  }
  const { website: _honeypot, kind, ...payload } = parsed.data
  void _honeypot
  const who = parsed.data.kind === 'contact' ? parsed.data.name : parsed.data.parentName
  const subject = `New submission from ${FORM_TITLES[kind]}: ${who}`

  const db = supabaseAdmin()
  const canEmail = emailConfigured()
  if (!db && !canEmail) {
    console.error('[forms] neither Supabase nor Resend is configured')
    return NextResponse.json({ ok: false, error: 'This form is not available right now. Please call us instead.' }, { status: 503 })
  }

  let stored = false
  if (db) {
    const { error } = await db.from('form_submissions').insert({ kind, payload })
    if (error) console.error('[forms] insert failed', error)
    else stored = true
  }

  let emailed = false
  if (canEmail) {
    emailed = await sendEmail({
      to: FORM_ROUTING[kind],
      subject,
      text: renderSubmissionText(kind, payload as Record<string, unknown>),
      html: renderSubmissionHtml(kind, payload as Record<string, unknown>),
      replyTo: payload.email,
    })
  }

  if (!stored && !emailed) {
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please call us instead.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
