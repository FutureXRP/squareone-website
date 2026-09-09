# CLAUDE.md — squareone-website

Public website for SquareOne Compassion, a Tulsa 501(c)(3) campus with three operating divisions: SquareOne Early Learning Center (ELC), SquareOne Medical Center, and SquareOne Interactive (fitness center + family entertainment center). This repo replaces the WordPress site at squareonecompassion.com.

Owner: Matt Blair (Chairman/CEO). Solo builder. Ship first, iterate.

Sibling app: the SquareOne Interactive store (`square-one-interactive.vercel.app`, separate repo) already handles memberships, room booking, event packages, door access, and merch on Next.js/Supabase/Stripe. This site does not duplicate any of that. Interactive and Events pages are front doors that hand off to it. Its URL is the `NEXT_PUBLIC_INTERACTIVE_APP_URL` env var, referenced in copy as `{APP}`.

## Read this first

- All page copy lives in `content/COPY.md`. Use it verbatim. Never invent programs, services, hours, prices, staff, or statistics. Anything marked `[CONFIRM]` in COPY.md renders with the placeholder text and gets a `// CONFIRM` comment in the component so it's grep-able.
- Logos and palette are fixed. Do not redesign them, recolor them, or add gradients over them.
- Complete file replacements over surgical patches. One batch commit per session.
- No em dashes in copy. Banned words in generated copy: "unlock", "elevate", "seamless", "empower", "journey", "leverage", "cutting-edge", "state-of-the-art".

## Stack

- Next.js 15, App Router, TypeScript, Tailwind
- Supabase (Postgres) for form submissions
- Resend for transactional email (form notifications, donation receipts)
- Stripe Checkout for donations
- Vercel hosting, `vercel.json` holds redirects
- No CMS in phase 1. Copy is in markdown/TSX. A CMS can come later if staff need to edit.

## Repo layout

```
app/
  layout.tsx            root layout, fonts, analytics
  page.tsx              Home
  about/page.tsx
  early-learning/page.tsx
  medical/page.tsx
  interactive/page.tsx
  events/page.tsx       handoff to the Interactive app's booking flow, no form
  give/page.tsx         donation page
  give/thank-you/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  api/forms/route.ts    POST handler for contact + event forms
  api/donate/route.ts   creates Stripe Checkout session
  api/stripe/webhook/route.ts
components/
  Header.tsx            division-aware (see Header behavior)
  Footer.tsx
  Hero.tsx
  DivisionCard.tsx
  FAQ.tsx               accessible accordion, native <details>
  Form/*.tsx
  StaffCard.tsx
content/
  COPY.md               source of truth for all copy
  faq/*.json            per-division FAQ arrays
public/
  logos/                sq1, elc, interactive, medical (currently placeholder SVGs, see CONFIRM.md; replace with the PNGs pulled from the current site)
  photos/               reused campus photos, WebP, max 1600px wide
  docs/                 medical intake PDFs (5 files, see COPY.md)
lib/
  supabase.ts, stripe.ts, email.ts, redirects.ts
supabase/
  migrations/0001_forms.sql
```

## Design system

### Palette
The current site's brand colors must be extracted from the four logo PNGs, not guessed. First task in phase 1:

```
node scripts/extract-palette.mjs public/logos/*.png
```

Write the script (sharp + a simple quantizer) to print the 5 dominant non-white, non-black colors per logo. Put the results in `tailwind.config.ts` as named tokens:

- `brand.sq1` — umbrella / SquareOne Compassion primary
- `brand.elc` — Early Learning accent
- `brand.med` — Medical accent
- `brand.int` — Interactive accent. Do not extract this one from the logo; use the Interactive app's navy `#182740` (its `theme-color`) so the handoff between the two sites is visually seamless. If the app repo has a tokens file, copy the full set from there.
- `ink` — body text, a near-black warm gray, not pure #000
- `paper` — page background, white or a very light tint pulled from the logo family, not cream

Each division page uses its own accent for links, buttons, and the header stripe. The umbrella pages (Home, About, Give, Contact, Events) use `brand.sq1`. Never mix two division accents on one page.

### Type
Two families, clearly distinct: a humanist sans for body and UI, and a rounded or geometric display face for headlines that reads warm without reading childish (the ELC page pulls this direction, Medical needs to still look credible in it). Load from Google Fonts via `next/font`. Pick once, document the choice in this file, do not change per page.

**Chosen (phase 1):** body and UI are **Source Sans 3** (400/600/700), headlines are **Plus Jakarta Sans** (500/600/700). Both load in `app/layout.tsx` through `next/font/google` and are exposed as `--font-body` and `--font-display`, mapped to `font-sans` and `font-display` in `tailwind.config.ts`.

Type scale: 16px base, 1.25 ratio. Body line length under 75 characters. Sentence case everywhere. No all-caps labels, no eyebrow labels above headings, no single-word color accents inside headlines.

### Layout
Max content width 1120px. Generous vertical rhythm (section padding 96px desktop / 56px mobile). Left-aligned text; only the hero headline may center. Photos are full-bleed or edge-to-edge within the container, not in rounded cards.

The one memorable element: the homepage hero is a single large campus photo with the three division logos sitting on it as tappable tiles. Everything else on the site is quiet.

### Motion
None on load. Accordion open/close and form state changes only. Respect `prefers-reduced-motion`.

### Accessibility floor
Visible focus rings, 4.5:1 contrast on all text, alt text on every image (campus photos get descriptive alt, logos get the division name), forms fully labeled, FAQ uses native `<details>`.

## Header behavior

The current site swaps logo, email, and phone per division. Keep that.

| Route | Logo | Email | Phone |
|---|---|---|---|
| /, /about, /give, /events, /contact | sq1 | connect@squareonecompassion.com | 918-340-5024 |
| /early-learning | elc | connect@squareoneelc.com | 918-340-5511 |
| /medical | medical | connect@squareonemedicalcenter.com | 918-340-5400 |
| /interactive | interactive | info@squareoneinteractive.com | 918-706-2682 |

Nav (same on every page): Early Learning · Medical · Interactive · Events · Give · About · Contact. "Give" is the visually primary button.

## Forms

Two forms: contact and ELC enrollment interest. Event requests are not a form here; the Interactive app's booking flow handles them. Both POST to `/api/forms` with a `kind` field.

- Honeypot field named `website`, hidden via CSS; reject if filled
- Server validates with zod, inserts into `form_submissions`, sends Resend email to the routing address below, returns 200
- Never expose Supabase service key client-side
- Success state replaces the form in place with the confirmation copy from COPY.md

Routing:
- contact → connect@squareonecompassion.com
- elc-enrollment → connect@squareoneelc.com

```sql
-- supabase/migrations/0001_forms.sql
create table form_submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','elc-enrollment')),
  payload jsonb not null,
  created_at timestamptz not null default now(),
  handled boolean not null default false
);
```

## Interactive catalog (live from the app's database)

The Interactive page's "What's on the floor" block and the Events page's room list read from the Interactive app's Supabase project, not from copy in this repo.

- Env: `INTERACTIVE_SUPABASE_URL`, `INTERACTIVE_SUPABASE_ANON_KEY` (the app's public anon key, read-only under its RLS)
- Before writing the query, open the Interactive repo (sibling directory or `FutureXRP/square-one-interactive`) and read its schema. Do not guess table or column names. The facilities and packages tables exist; find their actual names, the "active/published" flag, the display order column, the description column, and the price column (integer cents).
- Fetch in a server component with `next: { revalidate: 300 }` so the page is static-cached and refreshes every 5 minutes.
- Render only rows flagged active. Show name, one-line description, and for packages a "from $X" price formatted from integer cents. Each card links to the matching detail page in the app (`{APP}/facilities/{slug}` or `{APP}/packages/{slug}`, confirm the app's route shape from its `app/` directory).
- If the query fails or returns zero rows, render the four static tiles from COPY.md and nothing else. Never show an empty section or an error to visitors.
- If RLS blocks anon reads on those tables, do not widen the policy from this repo. Add a note to `CONFIRM.md` and fall back to static tiles; Matt will add a read policy from the app side.

## Donations

- `/give` shows preset amounts (25, 50, 100, 250, 500, other) and a one-time / monthly toggle
- Optional "purpose" select: General, Early Learning, Medical, Interactive, Event or field reservation
- POST `/api/donate` creates a Stripe Checkout session (mode `payment` or `subscription`), passes purpose in metadata, redirects
- Webhook on `checkout.session.completed` writes to `donations` table and sends a receipt via Resend containing the 501(c)(3) language and EIN from COPY.md
- All amounts in integer cents. Never float.
- Also show "Mail a gift" with the mailing address.

## Redirects (vercel.json)

Every current URL must 301 to its replacement.

```
/elc/ → /early-learning
/elc-enrollment/ → /early-learning#enroll
/virtual-learning-after-school/ → /early-learning
/interactive/ → /interactive
/medical/ → /medical
/donate/ → /give
/event-request/ → /events  (which itself links into {APP}/facilities)
/contact-us/ → /contact
/wp-content/uploads/2021/10/*.pdf → /docs/* (see COPY.md for the five filenames)
```

Anything else under `/wp-content/` or `/wp-*` → `/`.

## Phases

**Phase 1 (this session):** palette extraction, design tokens, all pages with COPY.md content, three forms working against Supabase, deploy to Vercel preview. No Stripe yet; the Give page shows the mailing address and a "Online giving coming soon" note only if Stripe keys are absent.

**Phase 2:** Stripe donations + receipts, real Privacy and Terms pages (Matt supplies text), redirects, DNS cutover, remove WordPress hosting.

**Phase 3:** put the Interactive app on a subdomain of squareonecompassion.com, share the Header/Footer as a small package so both properties render identical chrome, and point the app's footer links at the new pages here instead of the old WordPress URLs. Retire Amilia. Consider moving the donation flow into the app's Stripe account so there is one Stripe account for the whole campus.

## Definition of done for phase 1

- `npm run build` passes with zero TypeScript errors
- Lighthouse on Home, mobile: performance 90+, accessibility 100
- All `[CONFIRM]` placeholders listed in `CONFIRM.md` at repo root so Matt can resolve them in one pass
- Screenshot every page at 390px and 1280px into `screenshots/` and review them before the batch commit
