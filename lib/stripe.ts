import 'server-only'
import Stripe from 'stripe'
import { env } from '@/lib/env'

export function stripeConfigured(): boolean {
  return Boolean(env('STRIPE_SECRET_KEY'))
}

let client: Stripe | null = null
export function stripe(): Stripe | null {
  const key = env('STRIPE_SECRET_KEY')
  if (!key) return null
  if (!client) client = new Stripe(key)
  return client
}
