import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { Confirm } from '@/components/Confirm'
import { EnrollmentForm } from '@/components/Form/EnrollmentForm'
import { PageBanner } from '@/components/PageBanner'
import faq from '@/content/faq/elc.json'

export const metadata: Metadata = { title: 'Early Learning Center', description: 'SquareOne ELC serves children six weeks through four years old with an emergent, play-based curriculum and low ratios. Open Monday through Friday, 7:15 am to 5:45 pm.' }

export default function EarlyLearningPage() {
  return (
    <>
      <PageBanner
        src="/photos/elc/banner.webp"
        alt="Children at SquareOne Early Learning Center playing in a mud kitchen outdoors and sorting pinecones and stones with a teacher indoors. Confident, capable, lifelong learners."
        priority
        full
        width={1600}
        height={900}
      />
      <PageIntro title="Play is the highest form of research.">
        <p className="text-base text-muted">Albert Einstein</p>
        <p className="mt-6 text-ink">SquareOne ELC serves children six weeks through four years old. Open Monday through Friday, 7:15 am to 5:45 pm.</p>
      </PageIntro>

      <Section>
        <h2 className="text-2xl">Our approach</h2>
        <div className="prose-block mt-5 space-y-5 text-lg">
          <p>Our goal is a community of confident, capable, lifelong learners.</p>
          <p>
            We use an emergent curriculum. Teachers watch what children are curious about and build lessons around it, so children are participants in their learning rather than an audience for it. We keep ratios low so relationships can form, and we treat those relationships as the foundation for strong social and emotional skills.
          </p>
          <p>We respect the voice and opinion of every child. The educator&apos;s job is to make exploration possible. The child&apos;s job is to investigate everything.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#enroll" className="btn-primary">
            Ask about enrollment
          </a>
          <span className="text-base">
            <Confirm>is a summer program still offered? The old link went to a page called &quot;virtual-learning-after-school&quot;. If not, drop the button.</Confirm>
          </span>
        </div>
      </Section>

      <Section tint>
        <FAQ items={faq} />
      </Section>

      <Section id="enroll">
        <h2 className="text-2xl">Ask about enrollment</h2>
        <div className="mt-8">
          <EnrollmentForm />
        </div>
      </Section>

      <Section tint>
        <p className="prose-block text-lg">
          Square One Early Learning is a nurturing community. Our commitment to a respectful, holistic environment is the foundation for everything we do, from inquiry-based exploration to hands-on projects to authentic play.
        </p>
      </Section>
    </>
  )
}
