import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { Confirm } from '@/components/Confirm'
import { appUrl } from '@/lib/site'
import { getActiveFacilities, getActivePackages } from '@/lib/interactive'
import faq from '@/content/faq/interactive.json'

export const metadata: Metadata = { title: 'Interactive', description: 'SquareOne Interactive is the fitness and family entertainment center on the SquareOne campus. Join the gym, rent a room, or book a party, all online.' }

// The static tiles from COPY.md. Rendered always; the live catalog below them only when the query returns rows.
const TILES = [
  { title: 'Join the gym', body: 'Month-to-month fitness memberships, no joining fee, cancel anytime. Your phone unlocks the door. Family plans let everyone in the household check in under their own name.', href: '/memberships' },
  { title: 'Rent a room', body: 'Gym, party rooms, and more. Pick a space and a time, book 1 to 6 hours at least 48 hours ahead, and a hold keeps your slot while you pay the deposit. Members get member pricing automatically.', href: '/facilities' },
  { title: 'Book a party', body: 'Arcade party packages with a host and setup included. Birthdays, team parties, and family nights.', href: '/packages' },
  { title: 'Shop SquareOne gear', body: 'Tees, hoodies, and more. Every purchase supports SquareOne Compassion.', href: '/shop' },
]

export default async function InteractivePage() {
  const [facilities, packages] = await Promise.all([getActiveFacilities(), getActivePackages()])
  const hasLive = facilities.length > 0 || packages.length > 0

  return (
    <>
      <PageIntro title="One place for your family to move, play, and celebrate.">
        <p className="text-ink">SquareOne Interactive is the fitness and family entertainment center on the SquareOne campus. Join the gym, rent a room, or book a party, all online.</p>
        <p className="mt-4 text-base">
          Hours: Monday through Saturday 5:30 am to 10 pm. Sunday 1 pm to 10 pm. <Confirm>still current</Confirm>
        </p>
      </PageIntro>

      <Section>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {TILES.map((t) => (
            <li key={t.href} className="border-t-4 border-accent pt-5">
              <h2 className="text-xl">
                <a href={appUrl(t.href)} className="text-ink no-underline hover:underline">
                  {t.title}
                </a>
              </h2>
              <p className="mt-3 text-muted">{t.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={appUrl('/memberships')} className="btn-primary">
            Become a member
          </a>
          <a href={appUrl('/facilities')} className="btn-secondary">
            Rent a room
          </a>
        </div>
      </Section>

      {hasLive ? (
        <Section tint>
          <h2 className="text-2xl">What&apos;s on the floor</h2>
          {facilities.length > 0 ? (
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((f) => (
                <li key={f.id}>
                  <h3 className="text-lg">
                    <a href={f.href} className="text-ink no-underline hover:underline">
                      {f.name}
                    </a>
                  </h3>
                  {f.blurb ? <p className="mt-1 text-muted">{f.blurb}</p> : null}
                </li>
              ))}
            </ul>
          ) : null}
          {packages.length > 0 ? (
            <>
              <h3 className="mt-12 text-xl">Party packages</h3>
              <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((p) => (
                  <li key={p.id}>
                    <h4 className="text-lg">
                      <a href={p.href} className="text-ink no-underline hover:underline">
                        {p.name}
                      </a>
                    </h4>
                    {p.blurb ? <p className="mt-1 text-muted">{p.blurb}</p> : null}
                    {p.price ? <p className="mt-1 font-semibold text-accent-ink">{p.price}</p> : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Section>
      ) : null}

      <Section tint={!hasLive}>
        <FAQ items={faq} />
      </Section>
    </>
  )
}
