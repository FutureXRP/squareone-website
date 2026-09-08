import type { Metadata, Viewport } from 'next'
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
  themeColor: '#0B5591',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
