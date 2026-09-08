'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { divisionForPath } from '@/lib/site'

/** Sets the per-division accent and renders the division-aware chrome. */
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const division = divisionForPath(pathname)
  return (
    <div data-division={division} className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header division={division} pathname={pathname} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer division={division} />
    </div>
  )
}
