import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { formatCents } from '@/lib/donations'
import { supabaseAdmin } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { ORG } from '@/lib/site'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const client = stripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!client || !secret) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  const raw = await req.text()

  let event: Stripe.Event
  try {
    event = client.webhooks.constructEvent(raw, sig, secret)
  } catch (err) {
    console.error('[webhook] bad signature', err)
    return NextResponse.json({ error: 'Bad signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const amountCents = session.amount_total ?? 0
    const email = session.customer_details?.email || session.customer_email || null
    const purpose = session.metadata?.purpose || 'General'
    const frequency = session.metadata?.frequency || 'once'

    const db = supabaseAdmin()
    if (db) {
      const { error } = await db.from('donations').upsert(
        {
          stripe_session_id: session.id,
          amount_cents: amountCents,
          currency: session.currency || 'usd',
          frequency,
          purpose,
          donor_email: email,
          donor_name: session.customer_details?.name || null,
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
          stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
        },
        { onConflict: 'stripe_session_id' },
      )
      if (error) console.error('[webhook] donations insert failed', error)
    } else {
      console.error('[webhook] Supabase not configured; donation not recorded', session.id)
    }

    if (email && amountCents > 0) {
      // Receipt copy from COPY.md. EIN is a CONFIRM placeholder until Matt supplies it.
      await sendEmail({
        to: email,
        subject: 'Your gift to SquareOne Compassion',
        text: `Thank you for your gift of ${formatCents(amountCents)} to SquareOne Compassion, a 501(c)(3) nonprofit, EIN ${ORG.ein}. No goods or services were provided in exchange for this contribution. Keep this email for your records.\n\n${ORG.name}\n${ORG.addressLine}`,
      })
    }
  }

  return NextResponse.json({ received: true })
}
