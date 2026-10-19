import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { ORG } from '@/lib/site'

export const metadata: Metadata = { title: 'Terms of use', description: 'The terms that apply when you use the SquareOne Compassion website.' }

const CONTACT_EMAIL = 'matt@squareonecompassion.com'
const UPDATED = 'October 19, 2026'

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms of use">
        <p className="text-ink">
          By using squareonecompassion.com you agree to these terms. They are short and written in plain language. If you do not agree with them, please do not use the site.
        </p>
        <p className="mt-3 text-base text-muted">Last updated {UPDATED}.</p>
      </PageIntro>

      <Section>
        <div className="prose-block space-y-10 text-lg">
          <div>
            <h2 className="text-2xl">Who we are</h2>
            <p className="mt-4">
              This website is operated by SquareOne Compassion, a 501(c)(3) nonprofit organization in Tulsa, Oklahoma (EIN {ORG.ein}). It describes our campus and its three divisions: SquareOne Early Learning Center, SquareOne Medical Center, and SquareOne Interactive.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Information on this site</h2>
            <p className="mt-4">
              We work to keep hours, prices, programs, and contact details accurate, but they can change. Tuition rates, membership prices, rental rates, and package prices are confirmed when you enroll, join, or book, not by this website. Nothing on this site is medical advice. For care, contact SquareOne Medical Center or, in an emergency, call 911.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Forms and requests</h2>
            <p className="mt-4">
              Submitting a contact message, tour request, or enrollment interest form does not create a reservation, an enrollment, or any obligation on either side. A staff member will follow up with you. Enrollment at the Early Learning Center is subject to availability and its enrollment agreement. Room rentals, party packages, and memberships are governed by the terms shown in the SquareOne Interactive store when you book or join.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Donations</h2>
            <p className="mt-4">
              Gifts made through this site are processed by PayPal and are tax-deductible to the extent allowed by law. Recurring gifts can be canceled at any time from your PayPal account. We do not issue refunds for donations except in cases of error; if something went wrong with your gift, email us and we will make it right.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Content and trademarks</h2>
            <p className="mt-4">
              The text, photographs, and logos on this site belong to SquareOne Compassion or are used with permission. Photographs of children at the Early Learning Center are shared with family consent. You may link to this site and share its pages, but please do not copy photographs or logos for other uses without asking us first.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Acceptable use</h2>
            <p className="mt-4">
              Please do not use our forms to send spam, abusive messages, or anything unlawful, and do not attempt to interfere with the site or gain access to systems behind it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Other websites</h2>
            <p className="mt-4">
              This site links to our store, our patient portal, PayPal, social media, and public records. Those sites have their own terms, and we are not responsible for their content or practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Limitation of liability</h2>
            <p className="mt-4">
              This site is provided as is. To the fullest extent permitted by law, SquareOne Compassion is not liable for any loss arising from your use of the site or reliance on its contents. These terms are governed by the laws of the State of Oklahoma.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Changes and contact</h2>
            <p className="mt-4">
              We may update these terms from time to time and will change the date at the top when we do. Questions go to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="link">
                {CONTACT_EMAIL}
              </a>{' '}
              or {ORG.addressLine}.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
