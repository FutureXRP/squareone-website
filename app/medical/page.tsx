import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { StaffCard } from '@/components/StaffCard'
import { Confirm } from '@/components/Confirm'
import { telHref } from '@/lib/site'
import { photo } from '@/lib/photos'
import faq from '@/content/faq/medical.json'

export const metadata: Metadata = { title: 'Medical Center', description: 'SquareOne Medical Center offers primary care and pediatrics for the whole family in west Tulsa. Medicare, SoonerCare, most private insurance, and a sliding scale.' }

// CONFIRM: the five PDFs below must be placed in public/docs/ (pulled from the old site's /wp-content/uploads/2021/10/).
const INTAKE_FORMS = [
  { label: 'Notice of Privacy Practices', href: '/docs/privacy-practices.pdf' },
  { label: 'Patient Contact Information', href: '/docs/patient-contact-information.pdf' },
  { label: 'Assignment of Benefits', href: '/docs/assignment-of-benefits.pdf' },
  { label: 'Consent for Access to Medical Records', href: '/docs/medical-records-request.pdf' },
  { label: 'Patient Information and Office Policies', href: '/docs/patient-information-and-office-policies.pdf' },
]

export default function MedicalPage() {
  return (
    <>
      <PageIntro title="Primary care for every age, from all walks of life.">
        <p className="text-ink">SquareOne Medical Center offers primary care and pediatrics for the whole family: physicals, well visits, sick visits, chronic care, and diagnostic exams.</p>
      </PageIntro>

      <Section>
        <h2 className="text-2xl">Our approach</h2>
        <p className="prose-block mt-5 text-lg">
          Family medicine is the science of treating the physical person and the art of understanding what that person needs. We take time to listen, because your physical health is usually tied to everything else going on in your life.
        </p>
      </Section>

      <Section tint>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">New patients</h2>
            <p className="mt-4">
              Call <a href={telHref('918-340-5400')} className="link">918-340-5400</a> to schedule. We book same-day appointments and do not take walk-ins.
            </p>
            <p className="mt-3">Hours: Monday through Thursday 8 am to 5 pm, Friday 8 am to noon.</p>
            <p className="mt-3">Bring a photo ID and your insurance card. You can save time by completing these forms first:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {INTAKE_FORMS.map((f) => (
                <li key={f.href}>
                  <a href={f.href} className="link">
                    {f.label}
                  </a>{' '}
                  <span className="text-sm text-muted">(PDF)</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Current patients</h2>
            <p className="mt-4">Use the patient portal to book appointments, view results, pay a bill, or message your provider.</p>
            <p className="mt-5">
              <a href="https://21321.portal.athenahealth.com/" className="btn-primary" rel="noopener">
                Open the patient portal
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section id="insurance">
        <h2 className="text-2xl">Insurance</h2>
        <p className="prose-block mt-5 text-lg">
          We accept Medicare, Medicaid/SoonerCare, and most major private insurance. We do not accept CommunityCare <Confirm>still true</Confirm>. Cash pay is welcome, and we offer a sliding scale for patients without insurance who cannot pay in full.
        </p>
      </Section>

      <Section tint>
        <FAQ items={faq} />
      </Section>

      <Section>
        <h2 className="text-2xl">Providers</h2>
        <div className="mt-8 space-y-10">
          <StaffCard
            photo={photo('abel-lau')}
            name="Abel Lau, MD"
            role="Medical Director"
            bio="Dr. Lau was born in Tennessee and raised in Malaysia. He graduated from Regents University Medical College in Georgia and trained in Oklahoma. With more than 25 years in practice, he focuses on finding the root causes of his patients' health challenges and treating them with compassion, kindness, patience, and competence. Outside the clinic he fixes cars and broken things, works with wood, and skis. He and his wife Emily live in the Sand Springs area."
          />
          <StaffCard photo={photo('jennifer-blair')} name="Jennifer Blair" role="[CONFIRM: credentials and role]" bio="[CONFIRM: bio. The current site shows her photo with no text.]" /> {/* CONFIRM */}
          <p className="text-muted">
            <Confirm>any other providers to list, including Matt</Confirm>
          </p>
        </div>
      </Section>
    </>
  )
}
