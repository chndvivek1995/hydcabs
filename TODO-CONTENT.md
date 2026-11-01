# TODO-CONTENT — fill before launch

The build **warns** while any `{{PLACEHOLDER}}` remains. Once site.ts is filled, set `STRICT_PLACEHOLDERS=1` on Vercel so the build fails if one slips back in. While the site runs on a vercel.app host or the domain is unfilled, every page is `noindex` and robots.txt disallows crawling.
Everything below lives in one file unless noted: `src/config/site.ts`.

## 1. Business identity (`src/config/site.ts`)
| Key | Placeholder | Notes |
|---|---|---|
| `brand` | `{{BRAND_NAME}}` | Appears in titles, header, footer, schema. Keep short (≤ 20 chars) so page titles stay ≤ 60. |
| `legalName` | `{{LEGAL_ENTITY_NAME}}` | Footer copyright, privacy/terms, Organization schema. |
| `domain` | `https://{{DOMAIN}}` | Also set `SITE_URL` env on Vercel (used for canonical, sitemap, OG). |
| `email` | `{{EMAIL}}` | Footer, contact page, schema. |
| `address.street / locality / pin` | `{{STREET_ADDRESS}}`, `{{LOCALITY}}`, `{{PIN}}` | Footer, contact page, LocalBusiness schema, Google Map embed query. |
| `geo.lat / lng` | `0 / 0` | Office coordinates for LocalBusiness schema. |
| `gstin` | `{{GSTIN}}` | Footer + About credentials. Optional but builds trust. |
| `founded` | `{{YEAR}}` | About page story; also `{{FOUNDING_STORY}}` sentence on About renders until this is set. |
| `social.linkedin / googleBusiness` | URLs | Feed `sameAs` in schema. Leave as placeholder to omit. |
| `riskReducers` | `['Free route study', 'Trial week before you commit', 'No setup fee']` | **Confirm the business actually offers each.** Shown in every final CTA band. |

Phone `+91-9121389004` and WhatsApp `919121389004` are already set from the brief — confirm.

## 2. Stats (`SITE.stats`) — all `{{N}}+`
Vehicles on the platform · Corporate clients · Trips every month · Employees moved daily. Shown in the StatsBar under the hero with a count-up animation. **Only real numbers.** If a figure cannot be substantiated, remove that item from `src/components/StatsBar.astro`.

## 3. Pricing (`src/data/pricing.ts`)
All ₹ cells are `undefined` → render "On request". Fill from the owner's rate card:
- Per-employee monthly slabs (10 / 15 / 20 km × day / night)
- Dedicated vehicle monthly package price, extra km, extra hour (Sedan, SUV, MUV, TT, Bus)
- Local 4/40, 8/80, 12/120 packages per class
- Airport one-way by zone per class
- `estimatorRates` (per-employee day rates per slab, night uplift, escort per route) → enables the rupee range in the estimator. Leave `null` to keep "On request".

## 4. Social proof (render nothing until filled)
- `src/data/testimonials.json` — `[{ name, role, company, quote, consent: true }]`. **Only real, consenting clients.**
- `src/data/clients.json` — `[{ name, logo: "/images/clients/x.svg", alt }]`. **Only with written permission to use the logo.**

## 5. Environment variables (`.env` locally, Vercel project settings in production)
- `PUBLIC_LEAD_WEBHOOK` — Pabbly / Google Apps Script / CRM endpoint that accepts JSON POST. Until set, the form shows the WhatsApp fallback on submit.
- `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID` — tags load only after consent. Thank-you page fires `generate_lead` + `Lead` with a shared `event_id` for CAPI dedup.
- `SITE_URL` — production origin.

## 6. Claims to verify with the owner before launch
- **Safety practices** on `/safety/`, `SafetyGrid`, and every service `safetyNote`: driver police verification, GPS on every vehicle, SOS, number masking, escorts for women on night routes, 24×7 command desk. Remove any the business does not actually run.
- **Technology** on `/technology/` and `TechFeatures`: employee app / OTP boarding / live ETA / roster portal. If there is no app, keep the page framed as "GPS-tracked fleet + reporting" (already written that way in FAQs) and delete the "For employees" app bullets.
- **Fleet** (`src/data/fleet.json`): confirm every class is actually available (especially EV sedans, 26-seat mini bus, 40-seat bus).
- **Coverage**: 30 location pages claim service in those areas — confirm.
- **Hours**: Contact page states "Office hours Mon–Sat 9:30 AM – 6:30 PM · Command desk 24×7".
- **About page story**: generic founding narrative — replace with the real one.

## 7. Blog posts flagged `needsVerification: true`
- `gst-on-employee-transportation-cab-rental` — GST structure (forward charge vs RCM, ITC). Check against current CBIC notifications before publishing; a visible verification banner renders on the page until the flag is set to `false`.
- `/safety/` and `/solutions/women-safety-employee-transport-hyderabad/` reference Telangana night-work / women-safety obligations in general terms — confirm wording with a compliance adviser.

## 8. Not built (deliberate)
- Service × location combination pages (thin-content risk; revisit after Search Console data).
- Blog posts 13–40 from the brief — cadence 2–3/week after launch. Topics are listed in `CLAUDE.md` §8.
- Separate VIP page — merged into `/services/executive-chauffeur-hyderabad/`.

## 9. Launch checklist
1. Fill §1–§3, set env vars, `npm run build` (must print "No {{PLACEHOLDER}} text") and `npm run seo` (0 errors).
2. Replace `public/og-default.jpg` with a branded version if desired (1200×630, ≤ 120 KB).
3. Submit `sitemap-index.xml` in Search Console; create Google Business Profile with the same NAP as `site.ts`.
4. Add 301s to `vercel.json` → `redirects` if any URL changes later.

## 10. Photography
The six photos in `public/images/` (hero, night drop, metro shuttle, command desk, fleet depot, plant shift) were AI-generated on 1 Nov 2026
as placeholders in the right style. Replace them with real photographs of the business's own vehicles, drivers and desk before launch —
keep the same filenames and run `node scripts/optimise-images.mjs` (source files go in `src/assets/photos/`). The registry and alt text live in `src/data/images.ts`.
