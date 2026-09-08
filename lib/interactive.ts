import 'server-only'
import { appUrl } from '@/lib/site'
import { formatCents } from '@/lib/donations'

// Reads the Interactive app's catalog through its Supabase REST endpoint with
// the app's public anon key. Table and column names come from the app's
// supabase/migrations/0001_init.sql (facilities, event_packages): both have
// `active`, `sort`, `name`, `blurb`; packages carry `price_cents`. RLS there
// already allows public reads of active rows ("public read active facilities",
// "public read active packages"). Detail routes in the app: /facilities/[id]
// (id is the slug); packages have a single list page at /packages.

export interface CatalogItem {
  id: string
  name: string
  blurb: string
  href: string
  price?: string
}

interface FacilityRow {
  id: string
  name: string
  blurb: string
  first_hour_cents: number | null
  per_hour_cents: number
}
interface PackageRow {
  id: string
  name: string
  blurb: string
  price_cents: number
}

async function rest<T>(path: string): Promise<T[] | null> {
  const url = process.env.INTERACTIVE_SUPABASE_URL
  const key = process.env.INTERACTIVE_SUPABASE_ANON_KEY
  if (!url || !key) return null
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: 'application/json' },
      next: { revalidate: 300 },
    })
    if (!res.ok) {
      console.warn('[interactive] query failed', res.status, path)
      return null
    }
    const rows = (await res.json()) as T[]
    return Array.isArray(rows) ? rows : null
  } catch (err) {
    console.warn('[interactive] fetch error', err)
    return null
  }
}

export async function getActiveFacilities(): Promise<CatalogItem[]> {
  const rows = await rest<FacilityRow>('facilities?select=id,name,blurb,first_hour_cents,per_hour_cents&active=eq.true&order=sort.asc')
  if (!rows) return []
  return rows.map((r) => {
    const from = r.first_hour_cents ?? r.per_hour_cents
    return {
      id: r.id,
      name: r.name,
      blurb: r.blurb,
      href: appUrl(`/facilities/${encodeURIComponent(r.id)}`),
      price: from > 0 ? `from ${formatCents(from)}` : undefined,
    }
  })
}

export async function getActivePackages(): Promise<CatalogItem[]> {
  const rows = await rest<PackageRow>('event_packages?select=id,name,blurb,price_cents&active=eq.true&order=sort.asc')
  if (!rows) return []
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    blurb: r.blurb,
    href: appUrl('/packages'),
    price: `from ${formatCents(r.price_cents)}`,
  }))
}
