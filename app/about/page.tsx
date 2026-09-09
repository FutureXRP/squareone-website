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

const PARTNERS = ['Case and Associates', 'George Kaiser Family Foundation', 'Cherokee Nation', 'Creek Nation', 'Tulsa County ARPA']

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

      <Section tint id="story">
        <h2 className="text-2xl">Our story</h2>
        <div className="prose-block mt-5 space-y-5 text-lg">
          <p>
            Our campus is the former Jane Addams Elementary School in Oakhurst, an unincorporated community in west Tulsa County and eastern Creek County. The school closed in 2011 and sat empty for years. It was named for Jane Addams, the founder of social work in the United States and the first American woman to win the Nobel Peace Prize, which turned out to be a fitting name for what came next.
          </p>
          <p>
            Matt and Jennifer Blair grew up in Berryhill, went away to Oklahoma City for their degrees, and came home to start a church that became known as a place of refuge for people in need. In November 2018, Matt wrote down a phrase that would not leave him alone: a center for care and compassion. He began gathering a team who could make it real.
          </p>
          <p>
            The building carries the name of Gene and Donna Case, known across Sand Springs and west Tulsa County for their generosity and their service to people who had little. They ran bus routes for kids and cared for children with disabilities at Hissom Memorial Center. The Gene Case Family Center for Care and Compassion is meant to carry that spirit forward.
          </p>
        </div>
      </Section>

      <Section id="why">
        <h2 className="text-2xl">Why we do this</h2>
        <div className="prose-block mt-5 space-y-5 text-lg">
          <p>
            When we began planning, Oakhurst was home to about 2,700 people with a median household income of $34,000, and nearly half of households earned less than $35,000 a year. A community study had found the area short on the basic services that make a decent quality of life possible. Abandoned buildings lined the streets, and most people had to leave the area for a doctor, child care, or a safe place to play.
          </p>
          <p>
            We chose to answer that with one campus rather than one program. A hub where a child can learn, a family can see a doctor, and neighbors can get active brings people together and lets relationships form, and that is where lasting change starts. The campus is built to serve everyone, from families who cannot afford to pay to families with full insurance and resources, with the same quality of care for each.
          </p>
          <p>
            The model matters as much as the mission. Services and memberships are designed to cover the cost of running the campus, so that gifts can go to families in need rather than to keeping the lights on. As the campus grows, our goal is to use surplus revenue to begin revitalizing homes, families, and neighborhoods in the Western Tulsa and Eastern Creek County areas.
          </p>
        </div>
      </Section>

      <Section tint>
        <h2 className="text-2xl">Leadership</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <StaffCard photo={photo('matt-blair')} name="Matt Blair" role="Chairman of the Board and Chief Executive Officer" />
          <StaffCard photo={photo('abel-lau')} name="Abel Lau, MD" role="Medical Director, SquareOne Medical Center" />
          <StaffCard photo={photo('stephanie-rowe')} name="Stephanie Rowe" role="Director, SquareOne Early Learning Center" />
          <StaffCard photo={photo('christina-barrington')} name="Christina Barrington" role="Director of SquareOne Interactive and Director of Growth and Community Engagement" />
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
            <h2 className="text-xl">Philanthropic Partners</h2>
            <p className="mt-3 text-muted">We are grateful for the grant support of these partners.</p>
            <ul className="mt-3 space-y-2">
              {PARTNERS.map((p) => (
                <li key={p} className="font-semibold text-ink">
                  {p}
                </li>
              ))}
            </ul>
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
