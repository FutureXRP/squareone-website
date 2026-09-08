// Shared between server and client. No secrets, no server-only imports.
export const DONATION_PRESETS_CENTS = [2500, 5000, 10000, 25000, 50000] as const
export const DONATION_PURPOSES = ['General', 'Early Learning', 'Medical', 'Interactive', 'Event or field reservation'] as const
export const MIN_DONATION_CENTS = 100
export const MAX_DONATION_CENTS = 5_000_000

/** Format integer cents as dollars. Never floats in storage; only here for display. */
export function formatCents(cents: number): string {
  const dollars = Math.floor(cents / 100)
  const rem = cents % 100
  return rem === 0 ? `$${dollars.toLocaleString('en-US')}` : `$${dollars.toLocaleString('en-US')}.${String(rem).padStart(2, '0')}`
}
