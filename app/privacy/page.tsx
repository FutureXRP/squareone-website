import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { Confirm } from '@/components/Confirm'

export const metadata: Metadata = { title: 'Privacy' }

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy" />
      <Section>
        <div className="prose-block space-y-4 text-lg">
          <p>
            <Confirm>Matt supplies text.</Confirm>
          </p>
          <p>
            Medical patients: the HIPAA{' '}
            <a href="/docs/privacy-practices.pdf" className="link">
              Notice of Privacy Practices
            </a>{' '}
            (PDF) applies to SquareOne Medical Center.
          </p>
        </div>
      </Section>
    </>
  )
}
