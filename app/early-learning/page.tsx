import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { EnrollmentForm } from '@/components/Form/EnrollmentForm'
import { TourForm } from '@/components/Form/TourForm'
import { FormUnavailable } from '@/components/Form/FormUnavailable'
import { formsEnabled } from '@/lib/forms-server'
import Image from 'next/image'
import { DIVISIONS, telHref } from '@/lib/site'
import { photo } from '@/lib/photos'
import Link from 'next/link'
import { ELC_PILLARS, ELC_CREDENTIALS, ELC_CLASSROOMS, ELC_GALLERY, ELC_STORIES, ELC_STORIES_INTRO } from '@/content/elc'
import { galleryPhotos } from '@/lib/photos'
import { PageBanner } from '@/components/PageBanner'
import faq from '@/content/faq/elc.json'

export const metadata: Metadata = { title: 'Early Learning Center', description: 'Nature-based, Reggio-inspired early learning in west Tulsa for children six weeks through age five. Monday through Friday, 7:15 am to 5:45 pm.' }

export default async function EarlyLearningPage() {
  const forms = formsEnabled()
  const gallery = (await galleryPhotos('elc/gallery')).slice(0, 3)
  const hasStories = ELC_STORIES.length > 0
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
      <PageIntro title="“Play is the highest form of research.”">
        <p className="text-base text-muted">
          <cite className="not-italic">Albert Einstein</cite>
        </p>
        <p className="mt-10 border-t border-line pt-8 text-ink">SquareOne Early Learning Center is a nurturing, nature-based, Reggio-inspired community where relationships come first. Our commitment to a respectful, holistic environment guides everything we do, from inquiry-based exploration and hands-on projects to authentic play that encourages children to create, question, discover, and belong.</p>
        <p className="mt-4 text-base font-semibold text-ink">Serving children six weeks through age five · Monday through Friday · 7:15 am to 5:45 pm</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#tour" className="btn-primary">
            Request a tour
          </a>
          <a href="#enroll" className="btn-secondary">
            Ask about enrollment
          </a>
        </div>
      </PageIntro>

      {/* Quality bar. Blue so it stands out, per the ELC director. */}
      <div className="mt-section-sm bg-accent text-white md:mt-section">
        <div className="container">
          <ul aria-label="Accreditations and approach" className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5 font-semibold">
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

      <Section id="classrooms">
        <h2 className="text-2xl">Our classrooms</h2>
        <p className="prose-block mt-3 text-muted">A glimpse into each age group, from our youngest infants through preschool. Our classrooms are thoughtfully designed as multi-age communities, allowing children to learn alongside one another while growing at their own pace. When determining classroom placement, we consider each child’s age, development, readiness, individual needs, and relationships to ensure they are in the environment where they can feel secure, confident, and successful.</p>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ELC_CLASSROOMS.map((c) => {
            const src = photo(`elc/classrooms/${c.photo}`)
            return (
              <li key={c.name} className="border-t-4 border-accent pt-5">
                {src ? <Image src={src} alt={`The ${c.name} classroom for ${c.ages.toLowerCase()} at SquareOne Early Learning Center`} width={800} height={533} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="mb-5 aspect-[3/2] w-full object-cover" /> : null}
                <h3 className="text-xl">{c.name}</h3>
                <p className="mt-1 font-semibold text-accent-ink">{c.ages}</p>
                <p className="mt-3 text-muted">{c.body}</p>
              </li>
            )
          })}
        </ul>
      </Section>

      {gallery.length ? (
        <Section tint id="gallery">
          <h2 className="text-2xl">{ELC_GALLERY.title}</h2>
          <p className="prose-block mt-3 text-muted">{ELC_GALLERY.body}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {gallery.map((p) => (
              <li key={p.src}>
                <Image src={p.src} alt={p.alt} width={800} height={533} sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 100vw" className="aspect-[3/2] w-full object-cover" />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/early-learning/gallery" className="btn-primary">
              {ELC_GALLERY.cta}
            </Link>
          </div>
        </Section>
      ) : null}

      <Section id="tuition">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl">Tuition rates</h2>
            <p className="prose-block mt-3 text-lg">Rates for the 2026 to 2027 school year, by classroom.</p>
            <p className="prose-block mt-4 text-muted">
              Scholarships are available, and we accept DHS and tribal childcare reimbursement. A $150 per-family enrollment fee holds your child&apos;s place. Email{' '}
              <a href={`mailto:${DIVISIONS.elc.email}`} className="link">
                {DIVISIONS.elc.email}
              </a>{' '}
              with questions about tuition or assistance.
            </p>
            <div className="mt-8">
              <a href="#enroll" className="btn-primary">
                Ask about enrollment
              </a>
            </div>
          </div>
          <Image
            src="/photos/elc/tuition-rates.webp"
            alt="SquareOne Early Learning Center tuition rates for 2026 to 2027. Infants (Snapping Turtles), 6 weeks to 12 months: $1,125. Young toddlers (Scissortails), 9 to 15 months: $1,025. Toddlers (River Otters), 14 to 20 months: $1,000. Toddlers (Turtle Doves), 18 to 30 months: $965. Young preschool (Prairie Dogs), 2 to 3 years: $915. Preschool (Wood Ducks), 3 to 5 years: $810. Scholarships available. 5323 S 65th W Ave, Tulsa, OK 74107."
            width={1102}
            height={1427}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="h-auto w-full max-w-xl"
          />
        </div>
      </Section>

      {hasStories ? (
        <Section tint id="stories">
          <h2 className="text-2xl">{ELC_STORIES_INTRO.title}</h2>
          <p className="prose-block mt-3 text-muted">{ELC_STORIES_INTRO.body}</p>
          <ul className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {ELC_STORIES.map((story) => (
              <li key={story.name + story.quote.slice(0, 20)} className="border-l-4 border-accent pl-5">
                <blockquote className="text-lg text-ink">“{story.quote}”</blockquote>
                <p className="mt-3 font-semibold text-accent-ink">
                  {story.name}
                  {story.detail ? <span className="font-normal text-muted"> · {story.detail}</span> : null}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tint={!hasStories}>
        <FAQ items={faq} />
      </Section>

      <Section tint id="tour">
        <h2 className="text-2xl">Request a tour</h2>
        <p className="prose-block mt-3 text-muted">
          Tell us a little about your family and when you would like to visit, and we will be in touch to set a time. You can also call <a href={telHref(DIVISIONS.elc.phone2!)} className="link">{DIVISIONS.elc.phone2}</a>.
        </p>
        <div className="mt-8">
          {forms ? <TourForm /> : <FormUnavailable email={DIVISIONS.elc.email!} phone={DIVISIONS.elc.phone2!} what="Our tour request form" />}
        </div>
      </Section>

      <Section id="enroll">
        <h2 className="text-2xl">Ask about enrollment</h2>
        <div className="mt-8">
          {forms ? <EnrollmentForm /> : <FormUnavailable email={DIVISIONS.elc.email!} phone={DIVISIONS.elc.phone2!} what="Our enrollment form" />}
        </div>
      </Section>
    </>
  )
}
