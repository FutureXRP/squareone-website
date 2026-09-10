/**
 * Read a server env var, treating the placeholder values from .env.example as unset.
 * Guards against a copy of the example file being pasted into Vercel as-is, which
 * would otherwise switch on Stripe, Supabase, or Resend with values that cannot work.
 */
const PLACEHOLDER = /\.\.\.|YOUR-|your-|PROJECT-REF|interactive-anon-key/

export function env(name: string): string | undefined {
  const v = process.env[name]?.trim()
  if (!v || PLACEHOLDER.test(v)) return undefined
  return v
}
