import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { DonateForm } from '@/components/Form/DonateForm'
import { ORG } from '@/lib/site'
import { stripeConfigured } from '@/lib/stripe'

export const metadata: Metadata = { title: 'Give', description: 'Your gift keeps a doctor available to families on Medicare and Medicaid in west Tulsa and keeps tuition assistance available at the Early Learning Center.' }

export default function GivePage() {
  const online = stripeConfigured()
  return (
    <>
      <PageIntro title="Keep care affordable in west Tulsa.">
        <p className="text-ink">
          More than half of the patients at our clinic rely on Medicare or Medicaid. Your gift closes the gap between what those programs pay and what it costs to keep a doctor available to them, and it keeps tuition assistance available at the Early Learning Center.
        </p>
      </PageIntro>

      <Section>
        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-2xl">Give online</h2>
            <div className="mt-6">
              {online ? (
                <>
                  <DonateForm />
                  <p className="mt-8 text-muted">
                    Prefer PayPal?{' '}
                    <a href={ORG.paypalUrl} className="link" rel="noopener">
                      Give with PayPal
                    </a>
                  </p>
                </>
              ) : (
                <div className="max-w-prose">
                  <p className="text-lg">Give securely through PayPal. You can use a PayPal account or a card, and PayPal emails your receipt.</p>
                  <p className="mt-6">
                    <a href={ORG.paypalUrl} className="btn-primary" rel="noopener">
                      Give with PayPal
                    </a>
                  </p>
                  <p className="mt-6 text-muted">Gifts by mail are also welcome.</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl">Mail a gift</h2>
            <address className="mt-6 text-lg not-italic">
              {ORG.name}
              <br />
              {ORG.address.street}
              <br />
              {ORG.address.city}, {ORG.address.state} {ORG.address.zip}
            </address>
            <p className="mt-6 text-sm text-muted">
              SquareOne Compassion is a 501(c)(3) nonprofit. EIN {ORG.ein}.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
