import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { Confirm } from '@/components/Confirm'
import { appUrl, telHref } from '@/lib/site'
import { getActiveFacilities } from '@/lib/interactive'

export const metadata: Metadata = { title: 'Events', description: 'Our gym, party rooms, and event spaces host birthday parties, showers, indoor practices, meetings, weddings, and fundraisers. Book online with live availability.' }

export default async function EventsPage() {
  const rooms = await getActiveFacilities()
  return (
    <>
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
        <p className="prose-block mt-8 text-lg">
          Book 1 to 6 hours, at least 48 hours ahead. A hold keeps your slot for 24 hours while you pay the deposit. Members get member pricing.
        </p>
        <p className="prose-block mt-3 text-base">
          <Confirm>are inflatables and A/V still offered, and are large events like weddings and fundraisers still handled through the app or by a person?</Confirm>
        </p>
      </Section>

      {rooms.length > 0 ? (
        <Section tint>
          <h2 className="text-2xl">Rooms you can book</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <li key={r.id}>
                <h3 className="text-lg">
                  <a href={r.href} className="text-ink no-underline hover:underline">
                    {r.name}
                  </a>
                </h3>
                {r.blurb ? <p className="mt-1 text-muted">{r.blurb}</p> : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tint={rooms.length === 0}>
        <h2 className="text-2xl">Planning something bigger or unusual?</h2>
        <p className="prose-block mt-4 text-lg">
          Contact Alexis Henson at <a href={telHref('918-720-3032')} className="link">918-720-3032</a> <Confirm>still the events contact</Confirm>.
        </p>
        {/* CONFIRM: photos. Reuse games.jpg, bounce.jpg, event-rental-space.jpg, event-rental-1.jpg, event-rental-2.jpg from the old site if they still reflect the rooms. */}
      </Section>
    </>
  )
}
