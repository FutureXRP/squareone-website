import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { ORG } from '@/lib/site'

export const metadata: Metadata = { title: 'Privacy policy', description: 'How SquareOne Compassion handles information you share on this website.' }

const PRIVACY_EMAIL = 'matt@squareonecompassion.com'
const UPDATED = 'October 19, 2026'

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy policy">
        <p className="text-ink">
          SquareOne Compassion respects your privacy. This policy explains what information this website collects, how we use it, and the choices you have. It applies to squareonecompassion.com and the SquareOne Early Learning Center, SquareOne Medical Center, and SquareOne Interactive pages on it.
        </p>
        <p className="mt-3 text-base text-muted">Last updated {UPDATED}.</p>
      </PageIntro>

      <Section>
        <div className="prose-block space-y-10 text-lg">
          <div>
            <h2 className="text-2xl">Information you give us</h2>
            <p className="mt-4">
              The only personal information this site collects is what you type into one of our forms. The contact form asks for your name, email address, phone number, and message. The Early Learning Center tour request asks for a parent or guardian name, email, phone, your child&apos;s age, and preferred visit times. The enrollment interest form asks for a parent or guardian name, email, phone, your child&apos;s birth date, a desired start date, and how tuition will be paid.
            </p>
            <p className="mt-4">
              We use this information for one purpose: to respond to you. Submissions are delivered by email to the staff who handle them, the main office for contact messages and the Early Learning Center for tour and enrollment requests, and are kept only as long as needed to follow up. We do not sell, rent, or share this information with anyone outside SquareOne Compassion, and we do not use it for marketing lists.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Information collected automatically</h2>
            <p className="mt-4">
              This site does not use advertising trackers, third-party analytics cookies, or social media tracking pixels. Our hosting provider, Vercel, keeps standard server logs (such as IP address, browser type, and the pages requested) for security and to keep the site running. Those logs are not used to identify you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Donations</h2>
            <p className="mt-4">
              Online gifts are processed by PayPal on PayPal&apos;s own secure pages. We never see or store your card or bank details. PayPal&apos;s handling of your payment information is governed by its own privacy policy. We receive your name, email address, and gift amount so we can thank you and send a receipt for your records.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Memberships, bookings, and the store</h2>
            <p className="mt-4">
              Fitness memberships, room rentals, party packages, and merchandise are handled in the SquareOne Interactive store at store.squareoneinteractive.com, which has its own account system and privacy terms. Payments there are processed by Stripe on secure pages, and we do not store card numbers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Patients of SquareOne Medical Center</h2>
            <p className="mt-4">
              Health information is protected under HIPAA and handled through the patient portal, never through this website&apos;s forms. Our{' '}
              <a href="/docs/privacy-practices.pdf" className="link">
                Notice of Privacy Practices
              </a>{' '}
              (PDF) explains how SquareOne Medical Center uses and protects medical information and the rights you have regarding it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Children</h2>
            <p className="mt-4">
              This website is intended for adults. We do not knowingly collect information from children under 13. Information about children that parents share in the Early Learning Center forms is used only to respond to that family about enrollment or a tour.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Links to other sites</h2>
            <p className="mt-4">
              This site links to our social media pages, our patient portal, our store, PayPal, and public records such as our Form 990 filings. Those sites have their own privacy policies, and we are not responsible for their practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Security</h2>
            <p className="mt-4">
              Every page on this site is served over an encrypted HTTPS connection. Form submissions travel over that connection and are delivered to staff email. No method of transmission is perfectly secure, so please do not send sensitive medical or financial details through the contact form; call us instead.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Your choices</h2>
            <p className="mt-4">
              You can ask us to correct or delete information you submitted through this site at any time. Email{' '}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="link">
                {PRIVACY_EMAIL}
              </a>{' '}
              or write to us at {ORG.addressLine}. If we change this policy, we will update the date at the top of this page.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Contact</h2>
            <p className="mt-4">
              SquareOne Compassion, a 501(c)(3) nonprofit, EIN {ORG.ein}
              <br />
              {ORG.addressLine}
              <br />
              <a href={`mailto:${PRIVACY_EMAIL}`} className="link">
                {PRIVACY_EMAIL}
              </a>{' '}
              · {ORG.phone}
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
