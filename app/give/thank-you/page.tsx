import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro, Section } from '@/components/Section'

export const metadata: Metadata = { title: 'Thank you', robots: { index: false } }

export default function ThankYouPage() {
  return (
    <>
      <PageIntro title="Thank you.">
        <p className="text-ink">Your gift is already at work on our campus. A receipt is on its way to your inbox.</p>
      </PageIntro>
      <Section>
        <Link href="/" className="btn-secondary">
          Back to the campus
        </Link>
      </Section>
    </>
  )
}
