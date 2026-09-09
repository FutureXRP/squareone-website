import { NextResponse } from 'next/server'
import { formSchema, FORM_ROUTING, describeSubmission } from '@/lib/forms'
import { supabaseAdmin } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'

export const runtime = 'nodejs'

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
  const who = parsed.data.kind === 'contact' ? parsed.data.name : `${parsed.data.parentFirst} ${parsed.data.parentLast}`
  const subject = kind === 'contact' ? `Website contact from ${who}` : `ELC enrollment interest from ${who}`

  const db = supabaseAdmin()
  if (!db) {
    console.error('[forms] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set')
    return NextResponse.json({ ok: false, error: 'This form is not available right now. Please call us instead.' }, { status: 503 })
  }
  const { error } = await db.from('form_submissions').insert({ kind, payload })
  if (error) {
    console.error('[forms] insert failed', error)
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please call us instead.' }, { status: 500 })
  }

  await sendEmail({
    to: FORM_ROUTING[kind],
    subject,
    text: `New ${kind} submission from squareonecompassion.com\n\n${describeSubmission(payload as Record<string, unknown>)}`,
    replyTo: payload.email,
  })

  return NextResponse.json({ ok: true })
}
