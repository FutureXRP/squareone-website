# CONFIRM.md

Everything unresolved, in one place, so it can be cleared in a single pass. Each item renders on the site as bracketed placeholder text and is marked with a `// CONFIRM` comment in the component (`grep -rn CONFIRM app components lib content`).

## Blocking for launch

### Assets that could not be pulled from the current site
The build environment could not reach squareonecompassion.com (network policy), so nothing was copied from it. The site ships with placeholders:

- [ ] **Logos.** Matt supplied the four logos as images in chat. `public/logos/sq1.svg`, `elc.svg`, `medical.svg`, `interactive.svg` are faithful SVG recreations (same mark geometry, gradient, and stacked wordmark; the wordmark uses a geometric sans stack rather than the original outlines). Commit the original files as `public/logos/sq1.png`, `elc.png`, `medical.png`, `interactive.png` and switch the `logo` paths in `lib/site.ts` to `.png` if the originals are preferred. The supplied Interactive file appears to have a white wordmark on a white background, so only its mark is used.
- [ ] **Palette.** Colors were read from the supplied images, not extracted from files: umbrella `#05528F` / navy `#0E2140`, ELC wordmark `#1A6AB6`, Medical mark `#1163AE`. All four logos share one blue family, so the three division accents are deliberately close. Run `npm run palette` on the PNGs once committed and adjust `tailwind.config.ts` and the `--accent` variables in `app/globals.css` if the sampled values differ. `brand.int` stays fixed to the Interactive app's navy `#182740`.
- [ ] **Photos.** Drop files into `public/photos/` with these names (`.jpg`, `.jpeg`, `.png`, or `.webp`) and redeploy; each page picks them up automatically and shows nothing if the file is missing:
  - Done: `campus.webp` (hero), `abel-lau.webp`, `jennifer-blair.webp` (Medical providers, and Dr. Lau on About).
  - Still wanted: `matt-blair`, `stephanie-rowe`, `christina-barrington` for About leadership; ELC, Medical, Interactive, and event-space photos for those pages.
- [x] **Medical intake PDFs** are in `public/docs/` under the five linked filenames. The `vercel.json` redirect from the old `/wp-content/uploads/2021/10/<name>.pdf` paths maps by filename; if the old filenames differed, add five explicit redirects.
- [ ] **Event photos.** games.jpg, bounce.jpg, event-rental-space.jpg, event-rental-1.jpg, event-rental-2.jpg: reuse on `/events` if they still reflect the rooms. The page currently has no photos.

### Environment variables (Vercel > Settings > Environment Variables)
See `.env.example`. Without these:
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`: contact and enrollment forms return a "not available" error. Run `supabase/migrations/0001_forms.sql` and `0002_donations.sql` in that project first.
- `RESEND_API_KEY` + `RESEND_FROM`: submissions are stored but no notification email is sent.
- `INTERACTIVE_SUPABASE_URL` + `INTERACTIVE_SUPABASE_ANON_KEY`: "What's on the floor" and the Events room list are hidden and only the four static tiles show. RLS in the app already allows anon reads of active facilities and packages, so no policy change is needed.
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`: `/give` shows the "Online giving is coming soon" fallback. Webhook endpoint: `/api/stripe/webhook`, event `checkout.session.completed`.
- `NEXT_PUBLIC_INTERACTIVE_APP_URL`: defaults to `https://square-one-interactive.vercel.app`.

## From the Interactive brief (docs-source/interactive-brief.pdf)
- [ ] **Prices now live in two places.** The zone, room, and package prices from the brief are typed into this site (`content/interactive.ts`). The Interactive app's database holds its own prices for the same rooms and packages, and the app is where people actually pay. Keep them in sync, or set `INTERACTIVE_SUPABASE_URL` and `INTERACTIVE_SUPABASE_ANON_KEY` so the app's live per-hour price shows above the static lines on each zone.
- [ ] **Two event contacts.** The corporate flyer names Christina Barrington, 918-706-2682. COPY.md names Alexis Henson, 918-720-3032, for larger events. Both are shown on /events. Confirm which applies to what, or whether one should go.
- [x] Billiards Zone and MultiSport Zone photos supplied by Matt and in place.
- [ ] **Low-resolution photos.** The Gaming (767x354), Adventure (435x326), and Dining Hall (615x461) images came out of the PDF small and will look soft on large screens. Higher-resolution originals would help.
- [ ] **Adventure Zone** is marked "Coming soon" per the brief and has no reserve button. Remove the flag in `content/interactive.ts` when it opens.
- [ ] **Copy edits for house style:** "cutting-edge" and "journey" (banned words) removed, "unforgettable" softened to "memorable", em dashes replaced, "lazer" spelled "laser". Say if any of those should revert.
- [ ] The Fitness Zone's "$25 per month individual membership" matches the old site's price that COPY.md flagged as possibly outdated. Confirm it is current.

## Copy placeholders (from COPY.md)

### Global
- [ ] EIN is set to 83-4697894, derived from the IRS e-Postcard URL Matt supplied (the filename begins with the EIN). It appears in the footer, the Give page, the About Financials block, and the donation receipt email. Confirm it against the 990 before launch.

### Header and contact details
- [ ] ELC phone: is 918-340-5024 correct for the ELC?
- [ ] Interactive email address
- [ ] Interactive phone: is 918-340-5400 correct?

### Home
- [ ] Impact numbers to publish (suggested: ~3,000 patient visits a year, children enrolled in the ELC, active Interactive members)

### About
- [ ] Year founded
- [ ] Director of Interactive Center name
- [ ] Three additional board members' names and one-line affiliations
- [ ] Whether to name campus partners (physical therapy practice, fencing organization, American Legion Post 1776)
- [x] Financials block links to ProPublica's Nonprofit Explorer by EIN (lists every year automatically) and the IRS Tax Exempt Organization Search.

### Early Learning Center
- [ ] Is a summer program still offered? If not, drop the second button.
- [ ] Tuition rates: publish, or keep "Contact us for current rates"
- [ ] Phone number in the "How do I get started?" FAQ answer

### Medical Center
- [ ] "We do not accept CommunityCare": still true?
- [ ] Jennifer Blair: credentials, role, and bio
- [ ] Any other providers to list, including Matt

### Interactive
- [ ] Final domain for the app (e.g. interactive.squareonecompassion.com)
- [ ] Hours still current? (Mon to Sat 5:30 am to 10 pm, Sun 1 pm to 10 pm)
- [ ] Whether to list fitness membership prices here (old site: $25 individual / $75 family)

### Events
- [ ] Are inflatables and A/V still offered? Are weddings and fundraisers booked through the app or by a person?
- [ ] Alexis Henson, 918-720-3032: still the events contact?

### Privacy and Terms
- [ ] Both pages are placeholders until Matt supplies text.

## Not done in this pass
- Lighthouse was not run (no Chrome DevTools in the build environment). Run it on the Vercel preview: Home, mobile, target performance 90+ and accessibility 100.
- Vercel preview deploy was not created from here. Push the branch and let the Vercel Git integration build it.
