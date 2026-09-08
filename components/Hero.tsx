import Image from 'next/image'
import Link from 'next/link'
import { DIVISIONS } from '@/lib/site'
import { photo } from '@/lib/photos'

const TILES = [
  { key: 'elc', label: 'Early Learning Center', href: '/early-learning' },
  { key: 'med', label: 'Medical Center', href: '/medical' },
  { key: 'int', label: 'Interactive', href: '/interactive' },
] as const

/** The one memorable element: a single large campus photo with the three division logos as tappable tiles. */
export function Hero({ headline, subhead }: { headline: string; subhead: string }) {
  const campus = photo('campus')
  return (
    <section className="relative isolate bg-brand-navy text-white">
      <Image
        src={campus || "/photos/campus.webp"}
        alt="The SquareOne Compassion campus at 5323 S 65th West Ave in west Tulsa"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-brand-navy/60" aria-hidden="true" />
      <div className="container flex min-h-[70vh] flex-col justify-end py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl text-white md:text-4xl">{headline}</h1>
          <p className="mx-auto mt-5 max-w-prose text-lg text-white/90">{subhead}</p>
        </div>
        <ul className="mx-auto mt-10 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {TILES.map((t) => {
            const d = DIVISIONS[t.key]
            return (
              <li key={t.key}>
                <Link
                  href={t.href}
                  className="flex h-full min-h-40 flex-col items-center justify-center gap-3 rounded-md bg-paper p-5 no-underline ring-offset-brand-navy hover:bg-tint focus-visible:ring-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.mark} alt="" width={567} height={567} className="h-16 w-16" />
                  <span className="text-center font-display text-lg font-semibold leading-tight text-ink">
                    SquareOne
                    <br />
                    <span className="text-base font-medium text-accent-ink">{t.label}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
