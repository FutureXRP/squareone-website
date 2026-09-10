import type { Metadata } from 'next'
import Image from 'next/image'
import { PageIntro, Section } from '@/components/Section'
import { ZoneCard } from '@/components/ZoneCard'
import { PageBanner } from '@/components/PageBanner'
import { appUrl, telHref, EVENTS_CONTACT } from '@/lib/site'
import { getActiveFacilities } from '@/lib/interactive'
import { EVENT_SPACES, PARTY_PACKAGES, CORPORATE_PACKAGES, CORPORATE_CONTACT, type Package } from '@/content/interactive'

export const metadata: Metadata = { title: 'Events', description: 'Our gym, party rooms, and event spaces host birthday parties, showers, indoor practices, meetings, weddings, and fundraisers. Book online with live availability.' }

function PackageList({ packages }: { packages: Package[] }) {
  return (
    <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((p) => (
        <li key={p.name} className="border-t-4 border-accent pt-5">
          <Image src={p.photo} alt={p.photoAlt} width={800} height={533} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="mb-4 aspect-[3/2] w-full object-cover" />
          <h3 className="text-xl">{p.name}</h3>
          <p className="mt-1 text-lg font-semibold text-accent-ink">{p.price}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {p.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default async function EventsPage() {
  const live = await getActiveFacilities()
  const livePrice = (id: string) => {
    const row = live.find((f) => f.id === id)
    return row?.price ? `${row.price} per hour, live pricing in the app` : undefined
  }

  return (
    <>
      <PageBanner src="/photos/events/banner.webp" alt="SquareOne Events: a graduation party in the Gym and Multipurpose Room with guests at decorated tables. Parties, showers, celebrations." priority full width={1600} height={800} />
      <PageIntro title="Host it at SquareOne.">
        <p className="text-ink">
          Our gym, party rooms, and event spaces host birthday parties, showers, indoor practices, meetings, weddings, and fundraisers. Book online with live availability, or start with a party package that includes a host and setup.
        </p>
      </PageIntro>

      <Section>
        <div className="flex flex-wrap gap-4">
          <a href={appUrl('/facilities')} className="btn-primary">
            Rent a room
          </a>
          <a href={appUrl('/packages')} className="btn-secondary">
            See party packages
          </a>
        </div>
      </Section>

      <Section tint id="spaces">
        <h2 className="text-2xl">Event rental spaces</h2>
        <div className="mt-10 space-y-16 md:space-y-20">
          {EVENT_SPACES.map((s, i) => (
            <ZoneCard
              key={s.id}
              name={s.name}
              photo={s.photo}
              photoAlt={s.photoAlt}
              body={s.body}
              pricing={s.pricing}
              livePrice={livePrice(s.id)}
              reserveHref={appUrl(`/facilities/${s.id}`)}
              reserveLabel={`Reserve the ${s.name}`}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <Section id="party-packages">
        <h2 className="text-2xl">Party packages</h2>
        <p className="prose-block mt-3 text-muted">Every package books online in the Interactive app.</p>
        <PackageList packages={PARTY_PACKAGES} />
        <p className="mt-10">
          <a href={appUrl('/packages')} className="btn-primary">
            Book a party package
          </a>
        </p>
      </Section>

      <Section tint id="corporate">
        <h2 className="text-2xl">Corporate events</h2>
        <div className="prose-block mt-5 space-y-4 text-lg">
          <p>Looking for a unique space for your next company gathering? SquareOne Interactive offers a private, flexible facility designed for corporate events, employee appreciation, team building, trainings, meetings, and celebrations.</p>
          <p>Enjoy interactive gaming experiences, team challenges and activities, a private event space, and a unique environment designed for connection.</p>
          <p>
            When you host your event at SquareOne Interactive, you are helping fuel the mission of SquareOne Compassion. Revenue generated through our facility helps us invest back into our surrounding communities through programs that provide support, resources, and opportunities for those in need.
          </p>
        </div>
        <PackageList packages={CORPORATE_PACKAGES} />
        <p className="mt-6 text-sm text-muted">Prices are subject to change based on number of guests.</p>
        <p className="prose-block mt-8 text-lg">
          Questions about corporate events? Contact {CORPORATE_CONTACT.name} at <a href={telHref(CORPORATE_CONTACT.phone)} className="link">{CORPORATE_CONTACT.phone}</a>.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl">Planning something bigger or unusual?</h2>
        <p className="prose-block mt-4 text-lg">
          Contact {EVENTS_CONTACT.name} at <a href={telHref(EVENTS_CONTACT.phone)} className="link">{EVENTS_CONTACT.phone}</a>.
        </p>
      </Section>
    </>
  )
}
