import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { StaffCard } from '@/components/StaffCard'
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
            We are a 501(c)(3) nonprofit founded in 2019 and governed by a volunteer board.
          </p>
        </div>
      </Section>

      <Section tint id="story">
        <h2 className="text-2xl">Our story</h2>
        <div className="prose-block mt-5 space-y-5 text-lg">
          <p>
            Our campus is the former Jane Addams Elementary School, just north of Oakhurst and south of Berryhill. The school closed in 2011 and sat empty for years. It was named for Jane Addams, the founder of social work in the United States and the first American woman to win the Nobel Peace Prize, which turned out to be a fitting name for what came next.
          </p>
          <p>
            Matt and Jennifer Blair grew up in Berryhill, spent 7 years in Oklahoma City, and came home to start a church that became known as a place of refuge for people in need. In November 2018, after walking through his own personal failure, Matt wrote down a phrase that would not leave him alone: The Gene Case Center For Care and Compassion. Immediately, he began gathering a team who could make this idea come to life.
          </p>
          <p>
            The building carries the name of the Case family. Gene and Donna Case are known across Sand Springs and West Tulsa County for their generosity and their service to people who had little. They ran bus routes for kids and cared for children with disabilities at Hissom Memorial Center. Gene passed away in 2018, the same year the idea for this center was first written down. The Gene Case Family Center for Care and Compassion is meant to carry that spirit forward in his memory.
          </p>
        </div>
      </Section>

      <Section id="why">
        <h2 className="text-2xl">Why we do this</h2>
        <div className="prose-block mt-5 space-y-5 text-lg">
          <p>
            When we started planning, the neighboring community of Oakhurst was home to about 2,700 people. The median household income was $34,000, and nearly half of all households earned less than $35,000 a year. A community study had found the area lacking the basic services that make a decent quality of life possible. Abandoned buildings lined the streets, and most residents had to leave the area to see a doctor, find child care, or give their kids a safe place to play.
          </p>
          <p>
            Rather than start a single program, we chose to build a single campus. When a child can learn, a family can see a doctor, and neighbors can get active all in one place, people cross paths and relationships form. That is where lasting change begins. The campus is built to serve everyone, from families who cannot afford to pay to families with full insurance and plenty of resources, and every one of them receives the same quality of care.
          </p>
          <p>
            How we operate matters as much as why. Services and memberships are priced to cover the cost of running the campus, so gifts can go directly to families in need instead of keeping the lights on. As the campus grows, our goal is to use surplus revenue to begin revitalizing homes, families, and neighborhoods across Western Tulsa and Eastern Creek County.
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
