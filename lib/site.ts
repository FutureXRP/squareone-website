export type DivisionKey = 'sq1' | 'elc' | 'med' | 'int'

export interface Division {
  key: DivisionKey
  name: string
  shortName: string
  /** Full supplied logo (mark plus wordmark where the artwork has one). */
  logo: string
  /** Square mark only, used in the header and hero tiles next to an HTML wordmark so the division name stays legible at small sizes. */
  mark: string
  /** Wordmark second line shown under "SquareOne" in the chrome. */
  wordmark: string
  /** Shown in the header. Medical has none on purpose: patient communication goes through the portal. */
  email?: string
  /** Shown in the header in place of an email. */
  portal?: { label: string; href: string }
  phone: string
  /** Additional direct line, shown on the Contact page. */
  phone2?: string
  home: string
  social: { instagram?: string; facebook?: string }
}

export const ORG = {
  name: 'SquareOne Compassion',
  tagline: 'Rebuilding lives. Revitalizing communities.',
  address: { street: '5323 S 65th West Ave', city: 'Tulsa', state: 'OK', zip: '74107' },
  addressLine: '5323 S 65th West Ave, Tulsa, OK 74107',
  phone: '918-340-5024',
  email: 'connect@squareonecompassion.com',
  ein: '83-4697894', // CONFIRM: derived from the IRS e-Postcard URL Matt supplied (834697894_202512_990...). Confirm before launch.
  // Form 990 filings by EIN. ProPublica's Nonprofit Explorer lists every year and updates itself as the IRS releases new filings.
  financialsUrl: 'https://projects.propublica.org/nonprofits/organizations/834697894',
  irsSearchUrl: 'https://apps.irs.gov/app/eos/',
  // PayPal Donate button (public; only lets people send money to SquareOne). Donors choose one-time or monthly on PayPal's page.
  paypalUrl: 'https://www.paypal.com/donate/?hosted_button_id=9S8TBZ2Q3A8VU',
  instagram: 'https://instagram.com/squareonecompassion',
  facebook: 'https://www.facebook.com/squareonecompassion',
}

export const DIVISIONS: Record<DivisionKey, Division> = {
  sq1: {
    key: 'sq1',
    name: 'SquareOne Compassion',
    shortName: 'SquareOne',
    logo: '/logos/sq1.svg',
    mark: '/logos/sq1.svg',
    wordmark: 'Compassion',
    email: 'connect@squareonecompassion.com',
    phone: '918-340-5024',
    home: '/',
    social: { instagram: ORG.instagram, facebook: ORG.facebook },
  },
  elc: {
    key: 'elc',
    name: 'SquareOne Early Learning Center',
    shortName: 'Early Learning Center',
    logo: '/logos/elc.svg',
    mark: '/logos/elc-mark.svg',
    wordmark: 'Early Learning Center',
    email: 'connect@squareoneelc.com',
    phone: '918-340-5511',
    phone2: '918-623-4377',
    home: '/early-learning',
    social: {
      instagram: 'https://instagram.com/squareoneelc5323',
      facebook: 'https://www.facebook.com/profile.php?id=100063321524167',
    },
  },
  med: {
    key: 'med',
    name: 'SquareOne Medical Center',
    shortName: 'Medical Center',
    logo: '/logos/medical.svg',
    mark: '/logos/medical-mark.svg',
    wordmark: 'Medical Center',
    portal: { label: 'Patient portal', href: 'https://21321.portal.athenahealth.com/' },
    phone: '918-340-5400',
    home: '/medical',
    social: { facebook: 'https://www.facebook.com/squareonemedicalcenter' },
  },
  int: {
    key: 'int',
    name: 'SquareOne Interactive',
    shortName: 'Interactive',
    logo: '/logos/interactive.svg',
    mark: '/logos/interactive.svg',
    wordmark: 'Interactive',
    email: 'info@squareoneinteractive.com',
    phone: '918-706-2682',
    home: '/interactive',
    social: {
      instagram: 'https://instagram.com/squareonecompassion',
      facebook: 'https://www.facebook.com/profile.php?id=61552806026897',
    },
  },
}

/** Map a pathname to the division whose chrome the header should show. */
export function divisionForPath(pathname: string): DivisionKey {
  if (pathname.startsWith('/early-learning')) return 'elc'
  if (pathname.startsWith('/medical')) return 'med'
  if (pathname.startsWith('/interactive')) return 'int'
  return 'sq1'
}

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/early-learning', label: 'Early Learning' },
  { href: '/medical', label: 'Medical' },
  { href: '/interactive', label: 'Interactive' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

/** The Interactive app's base URL, referenced in copy as {APP}. */
export const APP = (process.env.NEXT_PUBLIC_INTERACTIVE_APP_URL || 'https://store.squareoneinteractive.com').replace(/\/$/, '')

export const EVENTS_CONTACT = { name: 'Christina Barrington', phone: '918-706-2682' }

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://squareonecompassion.com').replace(/\/$/, '')

export function appUrl(path: string): string {
  return `${APP}${path.startsWith('/') ? path : `/${path}`}`
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`
}
