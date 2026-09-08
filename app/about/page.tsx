import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { StaffCard } from '@/components/StaffCard'
import { Confirm } from '@/components/Confirm'

export const metadata: Metadata = { title: 'About', description: 'SquareOne Compassion is a 501(c)(3) nonprofit campus in west Tulsa, home to an early learning center, a primary care clinic, and a fitness and family entertainment center.' }

export default function AboutPage() {
  return (
    <>
      <PageIntro title="We believe the whole person matters." />
      <Section>
        <div className="prose-block space-y-5 text-lg">
          <p>
            SquareOne Compassion started with a simple conviction: people are physical, emotional, relational, and spiritual, and help that only touches one of those falls short. So we built a campus that serves several at once.
          </p>
          <p>
            Today that campus is home to an early learning center, a primary care clinic, and a fitness and family entertainment center. Each one is run by its own director, and all three share one mission and one address at 5323 S 65th West Ave.
          </p>
          <p>
            We are a 501(c)(3) nonprofit governed by a volunteer board. <Confirm>year founded</Confirm>
          </p>
        </div>
      </Section>

      <Section tint>
        <h2 className="text-2xl">Leadership</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <StaffCard name="Matt Blair, MD" role="Chairman of the Board and Chief Executive Officer" />
          <StaffCard name="Abel Lau, MD" role="Medical Director, SquareOne Medical Center" />
          <StaffCard name="Stephanie Rowe" role="Director, SquareOne Early Learning Center" />
          <StaffCard name="Christina Barrington" role="Director of Community Engagement and Growth" />
          <StaffCard name="[CONFIRM: Director of Interactive Center name]" role="Director, SquareOne Interactive" /> {/* CONFIRM */}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="text-xl">Board of Directors</h2>
            <p className="mt-3">
              <Confirm>three additional board members&apos; names and one-line affiliations</Confirm>
            </p>
          </div>
          <div>
            <h2 className="text-xl">Campus partners</h2>
            <p className="mt-3">
              <Confirm>whether to name the physical therapy practice, the fencing organization, and American Legion Post 1776</Confirm>
            </p>
          </div>
          <div>
            <h2 className="text-xl">Financials</h2>
            <p className="mt-3">
              <Confirm>link to most recent Form 990 or annual report, or omit this block</Confirm>
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
