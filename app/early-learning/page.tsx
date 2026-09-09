import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { EnrollmentForm } from '@/components/Form/EnrollmentForm'
import { TourForm } from '@/components/Form/TourForm'
import Image from 'next/image'
import { DIVISIONS, telHref } from '@/lib/site'
import { photo } from '@/lib/photos'
import { ELC_PILLARS, ELC_CREDENTIALS } from '@/content/elc'
import { PageBanner } from '@/components/PageBanner'
import faq from '@/content/faq/elc.json'

export const metadata: Metadata = { title: 'Early Learning Center', description: 'Nature-based, Reggio-inspired early learning in west Tulsa for children six weeks through age five. Monday through Friday, 7:15 am to 5:45 pm.' }

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
        <p className="mt-6 text-ink">Nature-based, Reggio-inspired early learning where relationships come first and children are encouraged to explore, create, question, and belong.</p>
        <p className="mt-4 text-base font-semibold text-ink">Serving children six weeks through age five · Monday through Friday · 7:15 am to 5:45 pm</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#tour" className="btn-primary">
            Schedule a tour
          </a>
          <a href="#enroll" className="btn-secondary">
            Ask about enrollment
          </a>
        </div>
      </PageIntro>

      <div className="mt-section-sm border-y border-line bg-tint md:mt-section">
        <div className="container">
          <ul aria-label="Accreditations and approach" className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5 font-semibold text-ink">
            {ELC_CREDENTIALS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <Section>
        <h2 className="text-2xl">Our approach</h2>
        <div className="prose-block mt-5 space-y-5 text-lg">
          <p>Our goal is a community of confident, capable, lifelong learners.</p>
          <p>
            We use an emergent curriculum. Teachers watch what children are curious about and build lessons around it, so children are participants in their learning rather than an audience for it. We keep ratios low so relationships can form, and we treat those relationships as the foundation for strong social and emotional skills.
          </p>
          <p>We respect the voice and opinion of every child. The educator&apos;s job is to make exploration possible. The child&apos;s job is to investigate everything.</p>
        </div>
      </Section>

      <Section tint id="exceptional">
        <h2 className="text-2xl">What makes SquareOne exceptional</h2>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ELC_PILLARS.map((p) => {
            const src = photo(`elc/${p.photo}`)
            return (
              <li key={p.title} className="border-t-4 border-accent pt-5">
                {src ? <Image src={src} alt={p.alt} width={800} height={533} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="mb-5 aspect-[3/2] w-full object-cover" /> : null}
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-3 text-muted">{p.body}</p>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section>
        <FAQ items={faq} />
      </Section>

      <Section tint id="tour">
        <h2 className="text-2xl">Schedule a tour</h2>
        <p className="prose-block mt-3 text-muted">
          Tell us when works for you and we will get back to you to set a time. You can also call <a href={telHref(DIVISIONS.elc.phone2!)} className="link">{DIVISIONS.elc.phone2}</a>.
        </p>
        <div className="mt-8">
          <TourForm />
        </div>
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
