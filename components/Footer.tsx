import Link from 'next/link'
import { DIVISIONS, ORG, telHref, type DivisionKey } from '@/lib/site'

export function Footer({ division }: { division: DivisionKey }) {
  const d = DIVISIONS[division]
  const social = { instagram: d.social.instagram || ORG.instagram, facebook: d.social.facebook || ORG.facebook }
  return (
    <footer className="border-t border-line bg-tint">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="max-w-prose">
            <p className="font-display text-lg font-semibold">{ORG.name}</p>
            <p className="mt-1 text-muted">{ORG.tagline}</p>
            <address className="mt-4 not-italic">
              {ORG.address.street}
              <br />
              {ORG.address.city}, {ORG.address.state} {ORG.address.zip}
            </address>
            <p className="mt-2">
              <a href={telHref(ORG.phone)}>{ORG.phone}</a>
              <br />
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-display text-lg font-semibold">On this campus</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/early-learning">Early Learning Center</Link>
              </li>
              <li>
                <Link href="/medical">Medical Center</Link>
              </li>
              <li>
                <Link href="/interactive">Interactive</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/give">Give</Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-display text-lg font-semibold">Follow along</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={social.instagram} rel="noopener">
                  Instagram
                </a>
              </li>
              <li>
                <a href={social.facebook} rel="noopener">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 SquareOne Compassion. SquareOne Compassion is a 501(c)(3) nonprofit. EIN {ORG.ein}. {/* CONFIRM */}
          </p>
          <p>
            <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
