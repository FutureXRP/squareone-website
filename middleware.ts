import { NextResponse, type NextRequest } from 'next/server'

/**
 * Host-based redirects. The division domains and www all live on this Vercel
 * project so they get certificates, and every request to them is sent to the
 * right page on squareonecompassion.com. Done here rather than in vercel.json
 * because the JSON rule did not catch the bare root path in production.
 */
const CANONICAL = 'https://squareonecompassion.com'

const DIVISION_HOSTS: Record<string, string> = {
  'squareoneelc.com': '/early-learning',
  'squareonemedicalcenter.com': '/medical',
  'squareoneinteractive.com': '/interactive',
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') || '').toLowerCase().replace(/:\d+$/, '')
  const bare = host.replace(/^www\./, '')

  const divisionPath = DIVISION_HOSTS[bare]
  if (divisionPath) {
    return NextResponse.redirect(`${CANONICAL}${divisionPath}`, 308)
  }

  if (host === 'www.squareonecompassion.com') {
    return NextResponse.redirect(`${CANONICAL}${req.nextUrl.pathname}${req.nextUrl.search}`, 308)
  }

  return NextResponse.next()
}

export const config = {
  // Pages and API routes only. Skip Next.js internals and static files.
  matcher: ['/((?!_next/|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-zA-Z0-9]+$).*)'],
}
