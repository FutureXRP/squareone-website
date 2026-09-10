# CONFIRM.md

Everything unresolved, in one place, so it can be cleared in a single pass. Each item renders on the site as bracketed placeholder text and is marked with a `// CONFIRM` comment in the component (`grep -rn CONFIRM app components lib content`).

## Blocking for launch

### Assets that could not be pulled from the current site
The build environment could not reach squareonecompassion.com (network policy), so nothing was copied from it. The site ships with placeholders:

- [ ] **Logos.** Matt supplied the four logos as images in chat. `public/logos/sq1.svg`, `elc.svg`, `medical.svg`, `interactive.svg` are faithful SVG recreations (same mark geometry, gradient, and stacked wordmark; the wordmark uses a geometric sans stack rather than the original outlines). Commit the original files as `public/logos/sq1.png`, `elc.png`, `medical.png`, `interactive.png` and switch the `logo` paths in `lib/site.ts` to `.png` if the originals are preferred. The supplied Interactive file appears to have a white wordmark on a white background, so only its mark is used.
- [ ] **Palette.** Colors were read from the supplied images, not extracted from files: umbrella `#05528F` / navy `#0E2140`, ELC wordmark `#1A6AB6`, Medical mark `#1163AE`. All four logos share one blue family, so the three division accents are deliberately close. Run `npm run palette` on the PNGs once committed and adjust `tailwind.config.ts` and the `--accent` variables in `app/globals.css` if the sampled values differ. `brand.int` stays fixed to the Interactive app's navy `#182740`.
- [ ] **Photos.** Drop files into `public/photos/` with these names (`.jpg`, `.jpeg`, `.png`, or `.webp`) and redeploy; each page picks them up automatically and shows nothing if the file is missing:
  - Done: `campus.webp` (hero), `abel-lau.webp`, `jennifer-blair.webp` (Medical providers, and Dr. Lau on About).
  - Still wanted: `matt-blair`, `stephanie-rowe`, `christina-barrington` for About leadership.
  - ELC "What makes SquareOne exceptional" cards take a photo each, in `public/photos/elc/`: `nature-based-learning`, `reggio-inspired-curriculum`, `conscious-discipline`, `outdoor-classrooms`, `family-partnerships`, `educators-who-inspire`. Cards render without a photo until the file exists.
  - ELC "Our classrooms" cards take a photo each, in `public/photos/elc/classrooms/`: `snapping-turtles`, `scissortails`, `river-otters`, `turtle-doves`, `prairie-dogs`, `wood-ducks`. Cards render without a photo until the file exists.
- [x] **Medical intake PDFs.** Per medical staff, only `privacy-practices.pdf` stays online; the other four were outdated and are removed, with their old URLs redirecting to /medical. The `vercel.json` redirect from the old `/wp-content/uploads/2021/10/<name>.pdf` paths maps by filename; if the old filenames differed, add five explicit redirects.
- [ ] **Event photos.** games.jpg, bounce.jpg, event-rental-space.jpg, event-rental-1.jpg, event-rental-2.jpg: reuse on `/events` if they still reflect the rooms. The page currently has no photos.

### Environment variables (Vercel > Settings > Environment Variables)
See `.env.example`. Without these:
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`: contact and enrollment forms return a "not available" error. Run `supabase/migrations/0001_forms.sql`, `0002_donations.sql`, and `0003_elc_tour.sql` in that project first.
- `RESEND_API_KEY` + `RESEND_FROM`: submissions are stored but no notification email is sent.
- `INTERACTIVE_SUPABASE_URL` + `INTERACTIVE_SUPABASE_ANON_KEY`: "What's on the floor" and the Events room list are hidden and only the four static tiles show. RLS in the app already allows anon reads of active facilities and packages, so no policy change is needed.
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`: without them, `/give` shows the PayPal button (live) instead of the Stripe form. PayPal gifts are not recorded in this site's database and get PayPal's receipt rather than ours. Webhook endpoint: `/api/stripe/webhook`, event `checkout.session.completed`.
- `NEXT_PUBLIC_INTERACTIVE_APP_URL`: defaults to `https://square-one-interactive.vercel.app`.

## From the Interactive brief (docs-source/interactive-brief.pdf)
- [ ] **Prices now live in two places.** The zone, room, and package prices from the brief are typed into this site (`content/interactive.ts`). The Interactive app's database holds its own prices for the same rooms and packages, and the app is where people actually pay. Keep them in sync, or set `INTERACTIVE_SUPABASE_URL` and `INTERACTIVE_SUPABASE_ANON_KEY` so the app's live per-hour price shows above the static lines on each zone.
- [x] Events contact is Christina Barrington, 918-706-2682, everywhere (Alexis Henson removed).
- [x] Billiards Zone and MultiSport Zone photos supplied by Matt and in place.
- [ ] **Low-resolution photos.** The Adventure (435x326) and Dining Hall (615x461) images came out of the PDF small and will look soft on large screens. Higher-resolution originals would help.
- [ ] **Adventure Zone** is marked "Coming soon" per the brief and has no reserve button. Remove the flag in `content/interactive.ts` when it opens.
- [ ] **Copy edits for house style:** "cutting-edge" and "journey" (banned words) removed, "unforgettable" softened to "memorable", em dashes replaced, "lazer" spelled "laser". Say if any of those should revert.
- [ ] The Fitness Zone's "$25 per month individual membership" matches the old site's price that COPY.md flagged as possibly outdated. Confirm it is current.

## Copy placeholders (from COPY.md)

### Global
- [ ] EIN is set to 83-4697894, derived from the IRS e-Postcard URL Matt supplied (the filename begins with the EIN). It appears in the footer, the Give page, the About Financials block, and the donation receipt email. Confirm it against the 990 before launch.

### Header and contact details
- [x] ELC direct lines: 918-340-5511 and 918-623-4377
- [x] Interactive email: info@squareoneinteractive.com
- [x] Interactive direct line: 918-706-2682

### Home
- [x] No statistics on the landing page; "Why it matters" rewritten around the whole-campus mission

### About
- [ ] **Our story figures are dated.** The Oakhurst numbers (about 2,700 people, $34,000 median household income, nearly half of households under $35,000) come from the 2018 proposal, which cited a 2013 study. The page says "when we began planning" so they are honest, but fresher census figures would be stronger.
- [ ] **Building name.** The story uses "The Gene Case Family Center for Care and Compassion" to match the sign on the building; the proposal said "The Gene and Donna Case Family Center." Confirm which is official.
- [ ] **"Gifts go to families in need" model line.** The proposal said 100% of contributions go to families because services cover operating costs. The page states it as the design intent, not a guarantee. Confirm the wording is one you can stand behind, or soften further.
- [x] Year founded: 2019
- [x] Director of Interactive Center: Christina Barrington (also Director of Growth and Community Engagement)
- [x] Board of Directors listed (Matt Blair, Nick Klenovich, Wayne Davidson, Joe DeBerry)
- [x] Campus partners block removed; replaced with Philanthropic Partners (grant funders)
- [x] Financials block links to ProPublica's Nonprofit Explorer by EIN (lists every year automatically) and the IRS Tax Exempt Organization Search.

### Early Learning Center
- [x] No summer program; button dropped.
- [ ] Tuition rates: publish, or keep "Contact us for current rates"
- [x] Enrollment fee is $150 per family
- [ ] Scholarships: the director says the scholarship information needs updating. The site currently says only "we offer a tuition assistance program" in the FAQ. Send the current scholarship details (who qualifies, how to apply) and they will replace that line.
- [x] Tour and enrollment forms shortened per the director; tour form adds preferred date and time; "Schedule a tour" is now "Request a tour"
- [x] FAQ "How do I get started?" uses 918-623-4377

### Medical Center
- [x] CommunityCare line removed
- [x] Jennifer Blair, APRN: bio written from Matt's notes
- [x] No other providers

### Interactive
- [ ] Final domain for the app (e.g. interactive.squareonecompassion.com)
- [x] Hours confirmed (Mon to Sat 5:30 am to 10 pm, Sun 1 pm to 10 pm)
- [ ] Whether to list fitness membership prices here (old site: $25 individual / $75 family)

### Privacy and Terms
- [ ] Both pages are placeholders until Matt supplies text.

## Not done in this pass
- Lighthouse was not run (no Chrome DevTools in the build environment). Run it on the Vercel preview: Home, mobile, target performance 90+ and accessibility 100.
- Vercel preview deploy was not created from here. Push the branch and let the Vercel Git integration build it.
