import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { ZoneCard } from '@/components/ZoneCard'
import { PageBanner } from '@/components/PageBanner'
import { appUrl } from '@/lib/site'
import { getActiveFacilities } from '@/lib/interactive'
import { ZONES } from '@/content/interactive'
import faq from '@/content/faq/interactive.json'

export const metadata: Metadata = { title: 'Interactive', description: 'SquareOne Interactive is the fitness and family entertainment center on the SquareOne campus. Join the gym, rent a room, or book a party, all online.' }

// The static tiles from COPY.md.
const TILES = [
  { title: 'Join the gym', body: 'Month-to-month fitness memberships, no joining fee, cancel anytime. Your phone unlocks the door. Family plans let everyone in the household check in under their own name.', href: '/memberships' },
  { title: 'Rent a room', body: 'Gym, party rooms, and more. Pick a space and a time, book 1 to 6 hours at least 48 hours ahead, and a hold keeps your slot while you pay the deposit. Members get member pricing automatically.', href: '/facilities' },
  { title: 'Book a party', body: 'Arcade party packages with a host and setup included. Birthdays, team parties, and family nights.', href: '/packages' },
  { title: 'Shop SquareOne gear', body: 'Tees, hoodies, and more. Every purchase supports SquareOne Compassion.', href: '/shop' },
]

export default async function InteractivePage() {
  // Live prices from the app override the static lines when the catalog is reachable.
  const live = await getActiveFacilities()
  const livePrice = (id: string) => {
    const row = live.find((f) => f.id === id)
    return row?.price ? `${row.price} per hour, live pricing in the app` : undefined
  }

  return (
    <>
      <PageBanner src="/photos/interactive/banner.webp" alt="The SquareOne Interactive floor: a glowing pool table, air hockey, arcade cabinets, gaming stations, a golf simulator screen, and a lounge" priority />
      <PageIntro title="One place for your family to move, play, and celebrate.">
        <p className="text-ink">SquareOne Interactive is the fitness and family entertainment center on the SquareOne campus. Join the gym, rent a room, or book a party, all online.</p>
        <p className="mt-4 text-base">
          Hours: Monday through Saturday 5:30 am to 10 pm. Sunday 1 pm to 10 pm.
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

      <Section tint id="zones">
        <h2 className="text-2xl">Explore the Interactive Zones</h2>
        <div className="prose-block mt-5 space-y-4 text-lg">
          <p>
            At SquareOne Interactive, every zone is designed to bring people together through fun, connection, and memorable experiences. Whether you are planning a family outing, birthday party, corporate team-building event, youth group, or just a night out with friends, our Interactive Zones offer something for every age and interest.
          </p>
          <p>From competitive gaming and classic arcade experiences to immersive attractions and hands-on activities, each zone delivers a unique adventure. Explore one zone or experience them all. There is always something new to discover at SquareOne Interactive.</p>
        </div>
        <div className="mt-14 space-y-16 md:space-y-20">
          {ZONES.map((z, i) => (
            <ZoneCard
              key={z.id}
              name={z.name}
              photo={z.photo}
              photoAlt={z.photoAlt}
              body={z.body}
              pricing={z.pricing}
              livePrice={z.id === 'gym' ? undefined : livePrice(z.id)}
              comingSoon={z.comingSoon}
              reserveHref={appUrl(z.reserve)}
              reserveLabel={z.reserveLabel}
              flip={i % 2 === 1}
            />
          ))}
        </div>
        <p className="mt-12">
          <a href={appUrl('/facilities')} className="btn-primary">
            Reserve event rooms and zones
          </a>
        </p>
      </Section>

      <Section>
        <FAQ items={faq} />
      </Section>
    </>
  )
}
