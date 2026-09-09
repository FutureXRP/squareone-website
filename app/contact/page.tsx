import type { Metadata } from 'next'
import { PageIntro, Section } from '@/components/Section'
import { ContactForm } from '@/components/Form/ContactForm'
import { ORG, DIVISIONS, EVENTS_CONTACT, telHref } from '@/lib/site'

export const metadata: Metadata = { title: 'Contact', description: 'Call, email, or stop by SquareOne Compassion at 5323 S 65th West Ave, Tulsa, OK 74107. We reply within one business day.' }

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ORG.addressLine)}&output=embed`

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Call, email, or stop by.">
        <p className="text-ink">One of our team members is ready to help. Fill out the form or give us a call. We reply within one business day.</p>
      </PageIntro>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div>
            <h2 className="text-2xl">Find us</h2>
            <address className="mt-6 text-lg not-italic">
              {ORG.addressLine}
              <br />
              <a href={telHref(ORG.phone)}>{ORG.phone}</a>
              <br />
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
            </address>
            <div className="mt-6 aspect-[4/3] w-full overflow-hidden bg-tint">
              <iframe
                title="Map to SquareOne Compassion, 5323 S 65th West Ave, Tulsa"
                src={MAP_SRC}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tint>
        <h2 className="text-2xl">Direct lines</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Early Learning Center</dt>
            <dd className="text-muted">
              <a href={`mailto:${DIVISIONS.elc.email}`}>{DIVISIONS.elc.email}</a> · <a href={telHref(DIVISIONS.elc.phone)}>{DIVISIONS.elc.phone}</a> or <a href={telHref(DIVISIONS.elc.phone2!)}>{DIVISIONS.elc.phone2}</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Medical Center</dt>
            <dd className="text-muted">
              <a href="mailto:connect@squareonemedicalcenter.com">connect@squareonemedicalcenter.com</a> · <a href={telHref('918-340-5400')}>918-340-5400</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Interactive</dt>
            <dd className="text-muted">
              <a href={`mailto:${DIVISIONS.int.email}`}>{DIVISIONS.int.email}</a> · <a href={telHref(DIVISIONS.int.phone)}>{DIVISIONS.int.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Event rentals</dt>
            <dd className="text-muted">
              {EVENTS_CONTACT.name} · <a href={telHref(EVENTS_CONTACT.phone)}>{EVENTS_CONTACT.phone}</a>
            </dd>
          </div>
        </dl>
      </Section>
    </>
  )
}
