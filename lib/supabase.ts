import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/** Server-only client for this site's own project (form submissions, donations). Never import from a client component. */
export function supabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  if (!client) client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return client
}
