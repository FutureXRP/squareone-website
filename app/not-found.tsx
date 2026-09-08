import Link from 'next/link'
import { PageIntro, Section } from '@/components/Section'

export default function NotFound() {
  return (
    <>
      <PageIntro title="We could not find that page.">
        <p className="text-ink">The address may have changed when we rebuilt the site.</p>
      </PageIntro>
      <Section>
        <Link href="/" className="btn-primary">
          Go to the home page
        </Link>
      </Section>
    </>
  )
}
