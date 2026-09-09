import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { StaffCard } from '@/components/StaffCard'
import { Confirm } from '@/components/Confirm'
import { photo } from '@/lib/photos'
import { ORG } from '@/lib/site'

const BOARD = [
  { name: 'Matt Blair', role: 'Chairman' },
  { name: 'Nick Klenovich', role: 'Secretary and Treasurer' },
  { name: 'Wayne Davidson', role: 'Member at large' },
  { name: 'Joe DeBerry', role: 'Member at large' },
]

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
          <StaffCard photo={photo('matt-blair')} name="Matt Blair" role="Chairman of the Board and Chief Executive Officer" />
          <StaffCard photo={photo('abel-lau')} name="Abel Lau, MD" role="Medical Director, SquareOne Medical Center" />
          <StaffCard photo={photo('stephanie-rowe')} name="Stephanie Rowe" role="Director, SquareOne Early Learning Center" />
          <StaffCard photo={photo('christina-barrington')} name="Christina Barrington" role="Director of Community Engagement and Growth" />
          <StaffCard name="[CONFIRM: Director of Interactive Center name]" role="Director, SquareOne Interactive" /> {/* CONFIRM */}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="text-xl">Board of Directors</h2>
            <ul className="mt-3 space-y-2">
              {BOARD.map((m) => (
                <li key={m.name}>
                  <span className="font-semibold text-ink">{m.name}</span>
                  <br />
                  <span className="text-muted">{m.role}</span>
                </li>
              ))}
            </ul>
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
              Our Form 990 filings are public.{' '}
              <a href={ORG.financialsUrl} className="link" rel="noopener">
                See every year on ProPublica&apos;s Nonprofit Explorer
              </a>
              , or search the{' '}
              <a href={ORG.irsSearchUrl} className="link" rel="noopener">
                IRS Tax Exempt Organization Search
              </a>{' '}
              by our EIN, {ORG.ein}.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
