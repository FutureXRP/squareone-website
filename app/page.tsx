import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { DivisionCard } from '@/components/DivisionCard'
import { Confirm } from '@/components/Confirm'
import { appUrl } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      <Hero
        headline="One campus. Three ways to care for a family."
        subhead="SquareOne Compassion is a nonprofit campus in west Tulsa where a child can learn, a family can see a doctor, and a neighborhood can get active, all in one place."
      />

      <Section>
        <h2 className="text-2xl">What we do</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          <DivisionCard
            title="Early Learning Center"
            body="Full-day care and education for children six weeks through four years old. Emergent, play-based curriculum with low ratios."
            linkLabel="Learn about the ELC"
            href="/early-learning"
          />
          <DivisionCard
            title="Medical Center"
            body="Primary care and pediatrics for every age. Medicare, SoonerCare, most private insurance, and a sliding scale for uninsured patients."
            linkLabel="See the Medical Center"
            href="/medical"
          />
          <DivisionCard
            title="Interactive"
            body="Fitness memberships, room rentals, and arcade party packages, all bookable online. Your phone unlocks the door."
            linkLabel="Explore Interactive"
            href="/interactive"
          />
        </div>
      </Section>

      <Section tint>
        <h2 className="text-2xl">Why it matters</h2>
        <div className="prose-block mt-5 space-y-4 text-lg">
          <p>
            Our clinic sits inside a federally designated Health Professional Shortage Area for primary care, mental health, and dental care. More than half of our patients are covered by Medicare or Medicaid. Keeping the doors open for them is the work, and it is why we run everything else on this campus.
          </p>
          <p className="text-base">
            <Confirm>any impact numbers you want public. Suggested: ~3,000 patient visits a year, number of children enrolled in the ELC, number of active Interactive members.</Confirm>
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Rent the space</h2>
            <p className="prose-block mt-4 text-muted">
              Gym, party rooms, and event spaces are available for birthdays, showers, practices, meetings, and fundraisers. Live availability, book online.
            </p>
            <p className="mt-5">
              <a href={appUrl('/facilities')} className="btn-secondary">
                Reserve a room
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-2xl">Give</h2>
            <p className="prose-block mt-4 text-muted">Every gift goes to keeping care affordable for families in west Tulsa.</p>
            <p className="mt-5">
              <Link href="/give" className="btn-primary">
                Give now
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
