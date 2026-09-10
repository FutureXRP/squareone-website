import 'server-only'

/**
 * Whether /api/forms has somewhere to deliver a submission: Supabase storage,
 * Resend email, or both. Pages use this to show a call-or-email note instead of
 * a form that would fail on submit.
 */
export function formsEnabled(): boolean {
  const hasDb = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  const hasEmail = Boolean(process.env.RESEND_API_KEY)
  return hasDb || hasEmail
}
