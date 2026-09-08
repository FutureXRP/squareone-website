import { NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { DONATION_PURPOSES, MIN_DONATION_CENTS, MAX_DONATION_CENTS } from '@/lib/donations'
import { SITE_URL } from '@/lib/site'

export const runtime = 'nodejs'

const schema = z.object({
  amountCents: z.number().int().min(MIN_DONATION_CENTS).max(MAX_DONATION_CENTS),
  frequency: z.enum(['once', 'monthly']),
  purpose: z.enum(DONATION_PURPOSES).optional(),
})

export async function POST(req: Request) {
  const client = stripe()
  if (!client) {
    return NextResponse.json({ ok: false, error: 'Online giving is coming soon.' }, { status: 503 })
  }
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Enter an amount of at least $1.' }, { status: 400 })
  }
  const { amountCents, frequency, purpose } = parsed.data
  const metadata = { purpose: purpose || 'General', frequency }
  const productName = purpose && purpose !== 'General' ? `Gift to SquareOne Compassion (${purpose})` : 'Gift to SquareOne Compassion'

  try {
    const session = await client.checkout.sessions.create({
      mode: frequency === 'monthly' ? 'subscription' : 'payment',
      success_url: `${SITE_URL}/give/thank-you`,
      cancel_url: `${SITE_URL}/give`,
      submit_type: frequency === 'monthly' ? undefined : 'donate',
      metadata,
      ...(frequency === 'monthly' ? { subscription_data: { metadata } } : { payment_intent_data: { metadata } }),
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            product_data: { name: productName },
            ...(frequency === 'monthly' ? { recurring: { interval: 'month' } } : {}),
          },
        },
      ],
    })
    if (!session.url) throw new Error('No checkout URL')
    return NextResponse.json({ ok: true, url: session.url })
  } catch (err) {
    console.error('[donate]', err)
    return NextResponse.json({ ok: false, error: 'We could not start checkout. Please try again.' }, { status: 500 })
  }
}
