'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DIVISIONS, NAV, telHref, type DivisionKey } from '@/lib/site'

export function Header({ division, pathname }: { division: DivisionKey; pathname: string }) {
  const d = DIVISIONS[division]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="border-b border-line bg-paper">
      <div className="h-1.5 bg-accent" aria-hidden="true" />
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link href={d.home} className="shrink-0" aria-label={`${d.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.logo} alt={d.name} width={640} height={160} className="h-12 w-auto md:h-14" />
          </Link>

          <div className="hidden items-center gap-6 text-base lg:flex">
            {d.emailConfirm ? (
              <span className="text-muted">{d.email}</span> // CONFIRM
            ) : (
              <a href={`mailto:${d.email}`} className="text-ink hover:underline">
                {d.email}
              </a>
            )}
            <a href={telHref(d.phone)} className="font-semibold text-ink hover:underline">
              {d.phone}
              {d.phoneConfirm ? <span className="ml-1 font-normal text-muted">[CONFIRM]</span> : null /* CONFIRM */}
            </a>
          </div>

          <button
            type="button"
            className="btn-secondary px-4 py-2 lg:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <nav id="site-nav" aria-label="Main" className={`${open ? 'block' : 'hidden'} pb-4 lg:block lg:pb-0`}>
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1 lg:pb-3">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-md px-3 py-2 text-base no-underline hover:bg-accent-soft ${active ? 'font-semibold text-accent-ink' : 'text-ink'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li className="mt-2 lg:ml-auto lg:mt-0">
              <Link href="/give" className="btn-primary w-full lg:w-auto" aria-current={pathname === '/give' ? 'page' : undefined}>
                Give
              </Link>
            </li>
            <li className="mt-3 border-t border-line pt-3 text-base lg:hidden">
              <div>
                {d.emailConfirm ? <span className="text-muted">{d.email}</span> : <a href={`mailto:${d.email}`}>{d.email}</a>}
              </div>
              <div>
                <a href={telHref(d.phone)} className="font-semibold">
                  {d.phone}
                </a>
                {d.phoneConfirm ? <span className="ml-1 text-muted">[CONFIRM]</span> : null}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
