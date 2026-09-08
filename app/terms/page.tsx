import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { Confirm } from '@/components/Confirm'

export const metadata: Metadata = { title: 'Terms' }

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms" />
      <Section>
        <p className="prose-block text-lg">
          <Confirm>Matt supplies text.</Confirm>
        </p>
      </Section>
    </>
  )
}
