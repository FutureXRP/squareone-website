import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, Source_Sans_3 } from 'next/font/google'
import { Shell } from '@/components/Shell'
import { ORG, SITE_URL } from '@/lib/site'
import './globals.css'

// Type: Source Sans 3 (humanist sans) for body and UI, Plus Jakarta Sans
// (geometric, warm) for headlines. Documented in CLAUDE.md. Do not change per page.
const body = Source_Sans_3({ subsets: ['latin'], variable: '--font-body', display: 'swap', weight: ['400', '600', '700'] })
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: ORG.name, template: `%s | ${ORG.name}` },
  description:
    'SquareOne Compassion is a nonprofit campus in west Tulsa where a child can learn, a family can see a doctor, and a neighborhood can get active, all in one place.',
  openGraph: { siteName: ORG.name, type: 'website', locale: 'en_US' },
}

export const viewport: Viewport = {
  themeColor: '#05528F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <Shell>{children}</Shell>
        {/* Old-site cleanup: unregister any service worker the WordPress site left behind and clear its caches. */}
        <Script id="old-site-cleanup" strategy="afterInteractive">{`
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (rs) {
    var had = rs.length > 0;
    Promise.all(rs.map(function (r) { return r.unregister(); })).then(function () {
      if ('caches' in window) caches.keys().then(function (ks) { ks.forEach(function (k) { caches.delete(k); }); });
      if (had && navigator.serviceWorker.controller) location.reload();
    });
  });
}
`}</Script>
      </body>
    </html>
  )
}
