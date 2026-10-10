# CLAUDE.md — Hyderabad Corporate Cab & Employee Transportation Website

> Build brief for Claude Code. Read this whole file before writing any code.
> Goal: a fast, SEO-first lead-generation website for a **corporate cab / employee transportation** business in **Hyderabad**, that out-ranks `corporatetaxiservices.com` on every keyword it targets and covers the topics it misses, with a modern, tech-forward look inspired by `whistledrive.com` (inspired by — never copied).

---

## 0. Placeholders (fill before launch — keep them in ONE config file)

All business details live in `src/config/site.ts`. Never hard-code them in pages.

```ts
export const SITE = {
  brand: "{{BRAND_NAME}}",            // e.g. "HydCorporate Cabs"
  domain: "https://{{DOMAIN}}",
  phone: "+91-9121389004",
  whatsapp: "919121389004",
  email: "{{EMAIL}}",
  address: "{{FULL_ADDRESS}}, Hyderabad, Telangana {{PIN}}",
  geo: { lat: 0, lng: 0 },           // office location for schema
  gstin: "{{GSTIN}}",                // optional, shown in footer = trust
  founded: "{{YEAR}}",
  stats: { vehicles: "{{N}}+", clients: "{{N}}+", tripsPerMonth: "{{N}}+", employeesDaily: "{{N}}+" },
  leadWebhook: import.meta.env.PUBLIC_LEAD_WEBHOOK, // Pabbly / Google Sheets / CRM
  ga4: import.meta.env.PUBLIC_GA4_ID,
  metaPixel: import.meta.env.PUBLIC_META_PIXEL_ID,
};
```

Rule: **do not invent** client names, logos, testimonials, stats, ratings or prices. Use clearly marked placeholder components (`<PlaceholderTestimonial/>`) that render nothing in production until real data is added to `src/data/*.json`.

---

## 1. Tech stack

- **Astro 4+** (static output), **Tailwind CSS**, TypeScript, MDX for blog posts.
- Deploy: **Vercel** (static). `astro.config.mjs` with `site` set from config, `@astrojs/sitemap`, `@astrojs/mdx`.
- Images: `astro:assets`, WebP/AVIF, explicit width/height, lazy below the fold.
- Icons: `lucide` (inline SVG). Fonts: self-hosted via `@fontsource` (no render-blocking Google Fonts).
- Zero client JS by default. Small islands only for: mobile nav, FAQ accordion, quote form, stats counter, route/fare estimator.
- Targets: Lighthouse ≥ 95 on all four, LCP < 2.0s on 4G, CLS < 0.05.

### Folder structure
```
src/
  config/site.ts
  data/
    services.json        # one object per service page (see §5)
    locations.json       # one object per Hyderabad area (see §6)
    industries.json
    fleet.json
    faqs.json            # global + per-page FAQs keyed by slug
    testimonials.json    # empty until real
    clients.json         # empty until real
  layouts/BaseLayout.astro, PageLayout.astro, BlogLayout.astro
  components/ (Header, Footer, Hero, StatsBar, LogoStrip, ServiceCard, FleetCard,
               HowItWorks, SafetyGrid, TechFeatures, QuoteForm, StickyCTA,
               FAQ, Breadcrumbs, RelatedLinks, AreaGrid, PricingTable, CTASection, Schema)
  pages/
    index.astro
    about.astro
    services/index.astro
    services/[slug].astro
    locations/index.astro
    locations/[slug].astro          # "corporate cab services in {area}"
    industries/[slug].astro
    fleet.astro
    pricing.astro
    safety.astro
    technology.astro
    attach-your-cab.astro           # vendor / driver partner page
    contact.astro
    faq.astro
    blog/index.astro
    blog/[...slug].astro
    privacy-policy.astro, terms.astro, thank-you.astro (noindex), 404.astro
  content/blog/*.mdx
public/robots.txt, llms.txt, favicon, og-default.jpg
```

---

## 2. Design direction (inspired by WhistleDrive — original execution)

WhistleDrive positions itself as a tech-led "urban mobility platform" for corporates: technology + fleet + on-ground ops. Borrow the **feel** (tech-forward, enterprise, confident, clean), not their logo, copy, illustrations or layout pixel-for-pixel.

**Palette (CSS variables in `global.css`)**
- `--ink` #0B0F19 (near-black, primary text & dark sections)
- `--paper` #FFFFFF, `--mist` #F4F6FA (section alternation)
- `--brand` #FFC400 (taxi-yellow accent for CTAs/highlights) — swap if brand differs
- `--accent` #1E5BFF (links, tech/feature icons)
- `--success` #12B76A (safety/compliance ticks)
- Dark mode not required; dark *sections* are (hero + tech + footer).

**Typography**: `Plus Jakarta Sans` (headings, 700/800, tight tracking), `Inter` (body 16–18px, 1.6 line height). H1 clamp(2.2rem, 5vw, 3.8rem).

**Visual language**
- Dark hero with a large headline, sub-headline, two CTAs (Get Quote = yellow solid, WhatsApp = outline), and a right-side visual: abstract Hyderabad route map SVG (dots + animated dashed route lines between HITEC City → Gachibowli → Financial District). No stock taxi clip-art.
- Stats bar directly under hero (vehicles, clients, trips/month, cities/areas) with count-up on scroll.
- Client logo strip (greyscale, renders only when `clients.json` has entries).
- Service cards: rounded-2xl, subtle border, icon top-left, hover lift + accent underline.
- "How it works" 4-step horizontal timeline.
- Safety & tech section on dark background with feature grid (GPS tracking, SOS, number masking, female-escort for night shifts, driver KYC, live ETA, MIS reports, automated routing).
- Generous whitespace, 1200px max container, 8px spacing grid, rounded-2xl, soft shadows.
- Motion: CSS-only fade/slide-up on scroll (IntersectionObserver), respect `prefers-reduced-motion`.
- Mobile: sticky bottom bar with **Call | WhatsApp | Get Quote** (this is the #1 conversion driver for this niche).

---

## 3. Competitor analysis — what corporatetaxiservices.com does (and its gaps)

**What it targets** (from titles, meta keywords and ~20 footer "Quick Links" landing pages):
corporate cab services Hyderabad · corporate taxi services Hyderabad · office pickup and drop service Hyderabad · monthly pick and drop service Hyderabad · cab on monthly basis for pick and drop to office · cab transport services Hyderabad · cab transport services near me · cabs for employees Hyderabad · transport facility for employees · pickup and drop service Hyderabad · employee transportation services Hyderabad · corporate employee transportation · office transportation services · corporate cab vendor Hyderabad · corporate car rental service Hyderabad · best corporate taxi services · airport transfer cab Hyderabad · monthly office transport Hyderabad.

Areas mentioned: HITEC City, Gachibowli, Madhapur, Kondapur, Financial District. Pricing page: per-person monthly pick-drop slabs (10/15/20 km, 22 days) and vehicle monthly packages (Sedan/SUV/MUV, 22 days, 2000 km).

**Gaps we exploit**
1. URLs contain spaces and typos ("Servces", "Transporation") → we use clean, lowercase, hyphenated slugs.
2. Thin, near-duplicate pages; duplicate links in footer → we write unique, 1,200–2,000-word pages with real local detail.
3. No location pages beyond a bullet list → we build ~25 Hyderabad area pages.
4. No safety/compliance, fleet, technology, industry, night-shift, women-safety, EV, airport, outstation or shuttle pages.
5. No blog, no FAQ schema, no breadcrumbs, broken OG image, no LocalBusiness schema.
6. Generic "all India" claims dilute local relevance → we stay Hyderabad-first (Secunderabad + Cyberabad + ORR belt).

### 3b. Primary content reference — amazelogistics.com (structure benchmark)

This is the strongest Hyderabad competitor and our **content-depth benchmark**. Match and exceed its topic coverage; never copy its wording.

**Its IA (mirror the breadth, improve the URLs):**
- Services: Employee Transportation, Monthly Transport, Corporate Cab, Corporate Car Rental, Airport Transfers, Outstation Cabs, Corporate Shuttle / Leasing, Event (MICE) Transport, Fleet.
- "Industries" menu that mixes industries and use-cases: IT/ITeS, BPO, Factory/Shift, Night Shift, Women Safety, VIP Transport, Cost Optimization.
- Locations: Begumpet, HITEC City, Gachibowli, Madhapur, Kondapur, LB Nagar, Miyapur, Secunderabad, Shamshabad, Financial District, Kukatpally (+ other-city pages we skip — stay Hyderabad-only).
- Home sections in order: hero + inline quote form → stats → 4 service cards → "built for Hyderabad" 4-up (reliability, routing, safety, companies) → areas/industries link rows → 6 service cards → who we are → **5-step process** (requirement & SLA → roster & shift mapping → route planning → live trips & exception handling → monthly billing & SLA reports) → **safety grid** (driver verification, GPS, 24×7 command desk, SOS, women-safety process, vehicle hygiene) → **shift-pattern section** (day commute, rotating shifts, night/midnight drops, field & plant workers) → use-case grid → why choose us (6) → fleet (sedan/SUV/mini bus/bus) → **tech platform + dashboard mockup** → trust strip → area cards → testimonials → FAQ → final CTA with risk reducers (free setup, no hidden charges, trial).

**Adopt in our build:**
1. Use their home section order as the baseline for our Home page (§7), restyled in the WhistleDrive-inspired design.
2. Add a "Use cases" menu alongside Industries with these pages (new rows for §4):
   - `/solutions/women-safety-employee-transport-hyderabad` — women employee safe transport Hyderabad
   - `/solutions/employee-transport-cost-optimization` — reduce employee transportation cost
   - `/solutions/vip-executive-transport-hyderabad` — VIP / executive transport Hyderabad (merge with chauffeur service; one page only, pick one slug)
   - `/solutions/factory-shift-employee-transport-hyderabad` — factory / plant employee transport Hyderabad
   - Night shift stays as the service page `/services/night-shift-cab-hyderabad`.
3. Add `/services/corporate-vehicle-leasing-hyderabad` (vehicle leasing with driver for companies).
4. Add Begumpet, Secunderabad, LB Nagar, Uppal, Miyapur, Kukatpally, Financial District to Priority 1 locations (they all rank there).
5. Build a **`ShiftPatterns`** component and a **`DashboardMockup`** component (illustrative UI with clearly fake demo data, captioned "Sample dashboard") for home + technology page.
6. Final CTA band shows risk reducers — only ones the business actually offers (confirm: free route study, trial week, no setup fee).

**Do NOT replicate:** big-brand client logos (TCS/Infosys/etc.) or "#1 rated", "4.9 Google rating", "200+ companies" style claims unless the owner provides proof and written permission. Testimonials only from real, consenting clients.

**Where we beat them:** clean slugs (no `.php`), far more location pages with real local detail, a pricing page with estimator, a full blog cluster (§8), richer schema, faster pages, mobile sticky CTA.

---

## 4. Keyword map (one primary keyword per URL — no cannibalisation)

| URL | Primary keyword | Secondary / supporting |
|---|---|---|
| `/` | corporate cab services in Hyderabad | corporate taxi services Hyderabad, employee transport Hyderabad, office cab service |
| `/services/employee-transportation-hyderabad` | employee transportation services in Hyderabad | corporate employee transportation, transport facility for employees, staff transportation |
| `/services/office-pickup-and-drop-hyderabad` | office pickup and drop service in Hyderabad | pickup and drop service Hyderabad, home to office cab |
| `/services/monthly-cab-for-office-hyderabad` | monthly cab service for office in Hyderabad | cab on monthly basis for pick and drop to office, monthly pick and drop service, monthly office transport |
| `/services/corporate-car-rental-hyderabad` | corporate car rental in Hyderabad | car rental for companies, monthly car rental with driver, long-term car lease |
| `/services/corporate-taxi-hyderabad` | corporate taxi service Hyderabad | best corporate taxi services, business taxi |
| `/services/corporate-cab-vendor-hyderabad` | corporate cab vendor in Hyderabad | cab vendor for IT companies, transport vendor empanelment |
| `/services/night-shift-cab-hyderabad` | night shift cab service for employees Hyderabad | women employee cab safety, escort cab, 24x7 shift cabs |
| `/services/airport-transfers-hyderabad` | corporate airport cab Hyderabad (RGIA) | airport transfer cab Hyderabad, Shamshabad airport pickup for employees, guest airport transfer |
| `/services/employee-shuttle-bus-hyderabad` | employee shuttle service Hyderabad | staff bus rental, tempo traveller for office, fixed-route shuttle |
| `/services/corporate-event-transport-hyderabad` | corporate event transportation Hyderabad | conference cab hire, offsite transport, HICC / Novotel event cabs |
| `/services/executive-chauffeur-hyderabad` | executive car with chauffeur Hyderabad | luxury car rental for CXOs, VIP/client visit cars |
| `/services/outstation-corporate-travel-hyderabad` | outstation corporate cab from Hyderabad | Hyderabad to Vijayawada/Bengaluru/Warangal business trips |
| `/services/hourly-cab-rental-hyderabad` | hourly cab rental Hyderabad for business | 8hr/80km, 4hr/40km local packages, full-day car hire |
| `/services/electric-cab-employee-transport-hyderabad` | electric cabs for employee transport Hyderabad | EV fleet, ESG commute, green corporate transport |
| `/services/transport-management-solution` | employee transport management system | routing software, NOC/command centre, MIS & billing |
| `/locations/{area}` | corporate cab services in {Area} | employee cab {Area}, office pickup drop {Area}, monthly cab {Area} |
| `/industries/{industry}` | employee transport for {industry} in Hyderabad | — |
| `/pricing` | corporate cab rates in Hyderabad / monthly cab charges | per-km rate, monthly package cost, sedan vs SUV vs tempo traveller price |
| `/fleet` | corporate cab fleet Hyderabad | sedan, SUV, Innova Crysta, tempo traveller, mini bus, EV |
| `/safety` | safe employee transportation | POSH, women safety, driver verification, SOS |
| `/technology` | employee commute app / GPS cab tracking | live tracking, auto-routing, shift roster upload |
| `/attach-your-cab` | attach car with corporate company Hyderabad | car attachment, driver jobs, vendor partnership |
| `/blog/...` | informational long-tail (see §8) | — |

"near me" queries are captured by LocalBusiness schema + Google Business Profile + location pages, not by a page titled "near me".

---

## 5. Service page template (`services/[slug].astro` driven by `services.json`)

Each service object:
```json
{
  "slug": "employee-transportation-hyderabad",
  "title": "Employee Transportation Services in Hyderabad",
  "metaTitle": "Employee Transportation Services in Hyderabad | {{BRAND}}",
  "metaDescription": "≤155 chars, primary keyword + benefit + CTA",
  "h1": "Employee Transportation Services in Hyderabad",
  "intro": "...",
  "whoItsFor": [], "features": [], "process": [], "vehicles": [],
  "pricingNote": "...", "areas": ["hitec-city", "gachibowli", "..."],
  "faqs": [{ "q": "", "a": "" }], "related": ["office-pickup-and-drop-hyderabad"]
}
```

Section order (every service page):
1. Breadcrumbs → H1 → 2-line intro with primary keyword in first 100 words → CTA buttons.
2. Inline quote form (company, contact name, phone, email, no. of employees, shift timings, pickup area, office location, service type).
3. "What's included" feature grid (6–8 items).
4. "Who it's for" — IT/ITES, BPO, pharma, hospitals, manufacturing, startups.
5. How it works (4 steps: share roster → we route → trial week → go live with MIS).
6. Vehicles used (pull from `fleet.json`).
7. Safety & compliance block (link `/safety`).
8. Areas served grid → links to location pages (internal linking hub).
9. Pricing guidance (ranges or "starting from", link `/pricing`) — real numbers only from config.
10. 6–10 FAQs (FAQPage schema).
11. Related services + 2–3 related blog posts.
12. Final CTA band.

Word count: 1,200–2,000 unique words. Write in plain, specific English: mention real Hyderabad roads, landmarks and traffic realities (ORR, Biodiversity Junction, Mindspace, Raidurg Metro, Gachibowli flyover, PVNR Expressway to RGIA, IKEA junction, Cyber Towers). No keyword stuffing — primary keyword in title, H1, first paragraph, one H2, meta description, image alt, URL.

---

## 6. Location pages (~25) — `locations.json`

Priority 1 (IT/office corridor — build first):
HITEC City, Gachibowli, Madhapur, Kondapur, Financial District (Nanakramguda), Raidurg, Kokapet, Manikonda, Narsingi, Kukatpally, Begumpet, Banjara Hills, Jubilee Hills, Pocharam (Infosys campus), Uppal, Shamshabad / RGIA.

Priority 2 (residential pickup belts + industrial):
Miyapur, Chandanagar, Tellapur, Kollur, Nallagandla, Ameerpet, Secunderabad, Kompally, Balanagar, Jeedimetla, Genome Valley (Shamirpet), Patancheru, LB Nagar, Dilsukhnagar.

Each location object:
```json
{
  "slug": "gachibowli",
  "name": "Gachibowli",
  "h1": "Corporate Cab Services in Gachibowli",
  "landmarks": ["DLF Cyber City", "ISB Road", "Gachibowli Stadium", "Wipro Circle"],
  "techParks": ["..."],          // only real, verifiable parks
  "commonRoutes": ["Gachibowli ↔ Kukatpally", "Gachibowli ↔ Miyapur", "Gachibowli ↔ RGIA"],
  "travelNotes": "peak-hour patterns, flyovers, ORR access",
  "nearby": ["financial-district", "kondapur", "hitec-city"],
  "faqs": []
}
```

Page sections: H1 → local intro (why companies in {Area} need managed transport) → services available in {Area} (cards linking to service pages) → tech parks/offices served (generic if unverified) → popular employee pickup routes → typical commute times → fleet → FAQs → nearby areas → CTA.

**Uniqueness rule:** at least 60% of each location page must be area-specific. If research for an area is too thin, build it as Priority 2 later rather than shipping a templated clone. Do NOT generate service × location combination pages (e.g. "night shift cab in Kokapet") at launch — that's thin-content risk. Revisit after Search Console shows demand.

---

## 7. Other core pages

- **Home**: hero → stats → logo strip → 6 core services → why us (5 USPs) → how it works → safety & tech (dark) → fleet carousel → areas served grid (top 16) → industries → testimonials (when real) → pricing teaser → FAQ (8) → blog teaser → CTA.
- **About**: story, mission, ops team, Hyderabad-first coverage, compliance credentials (GST, permits, insurance).
- **Fleet**: Sedan (Dzire/Etios class), SUV (Ertiga), MUV (Innova Crysta), Tempo Traveller 12/17-seater, Mini bus 26-seater, Bus 40-seater, EV sedan. Seats, luggage, best use, AC — data from `fleet.json`.
- **Pricing**: two tables — (a) per-employee monthly pick-drop by distance slab, (b) dedicated vehicle monthly package by vehicle type (working days, km cap, extra km/hr). Plus local hourly packages and airport transfers. Show "Starting from ₹X" only from config; show an interactive estimator (distance slab × employees × shifts → range) with disclaimer. Explain what affects price: distance, shift timing (night allowance), escort, toll/parking, dead km, contract length.
- **Safety**: driver KYC & police verification, training, GPS + geofencing, SOS, number masking, female-first-pickup/last-drop rules & escort for night shifts, vehicle fitness/permits/insurance, POSH alignment, incident response. (Describe practices the business actually follows — confirm with owner.)
- **Technology**: employee app (live ETA, OTP boarding), admin dashboard (roster upload, auto-routing, no-show tracking), MIS & billing, command centre. If no in-house app, frame as "GPS-tracked fleet + reporting" — never claim features that don't exist.
- **Industries** (6 pages): IT & ITES, BPO/KPO & contact centres, Pharma & Life Sciences (Genome Valley), Hospitals & Healthcare, Manufacturing & Warehousing, Startups & Co-working.
- **Attach your cab**: vendor/driver recruitment — form with vehicle type, model year, permit, area. Separate webhook tag `lead_type=vendor`.
- **Contact**: form, phone, WhatsApp, email, address, embedded Google Map (lazy iframe), hours.
- **FAQ**: 25–30 Qs grouped (Pricing, Safety, Operations, Billing, Contracts).

---

## 8. Blog — 40 topics (clusters → link to money pages)

**Cost & pricing**
1. Monthly cab cost for office commute in Hyderabad: complete breakdown
2. Per-employee vs dedicated-vehicle pricing: which model saves more?
3. Company bus vs cabs vs shuttle: total cost comparison for Hyderabad offices
4. How dead kilometres inflate your transport bill (and how to cut them)
5. GST on employee transportation and cab rental services explained
6. Hidden charges in corporate cab contracts and how to avoid them

**Buying guides / vendor selection**
7. How to choose a corporate cab vendor in Hyderabad: 15-point checklist
8. RFP template for employee transportation services
9. Questions to ask before signing a monthly cab contract
10. In-house fleet vs outsourced employee transport
11. SLA metrics that matter: on-time %, no-show, trip adherence
12. Switching transport vendors without disrupting shifts

**Safety & compliance**
13. Night shift transport rules for women employees in Telangana — what employers must know (cite official sources; flag to verify current rules)
14. POSH and employee commute: employer responsibilities
15. Driver background verification: what a proper process looks like
16. SOS, geofencing and number masking: safety tech explained
17. Escort guards in employee cabs: when they are required

**Hyderabad commute guides**
18. Best routes to HITEC City from Kukatpally, Miyapur and Kompally
19. Getting to the Financial District during peak hours: route guide
20. Hyderabad Metro + last-mile cab: a hybrid commute model for offices
21. ORR commute guide for Kokapet, Narsingi and Tellapur offices
22. RGIA airport transfer planning for corporate guests
23. Monsoon commute planning for Hyderabad offices
24. Hyderabad's IT corridor explained: HITEC City, Gachibowli, Financial District

**Operations & tech**
25. How automated routing reduces cab count by grouping employees
26. Shift roster management for transport: a practical guide for HR/admin
27. What an employee transport command centre does
28. Measuring commute satisfaction: survey template for HR
29. Reducing no-shows in employee transport

**Use cases / industries**
30. Employee transport for BPO 24x7 shifts
31. Transport planning for pharma units in Genome Valley
32. Shuttle vs cab for hospitals with rotating shifts
33. Planning cabs for a corporate offsite or conference in Hyderabad
34. Executive car service for client visits: etiquette and planning
35. Transport for startups: when does a monthly cab plan make sense?

**EV & sustainability**
36. Electric cabs for employee commute: cost and range realities in Hyderabad
37. Reporting commute emissions for ESG: a simple method
38. Telangana EV policy and what it means for corporate fleets (verify current policy before publishing)

**Return-to-office / HR**
39. Commute benefits that improve return-to-office attendance
40. Transport allowance vs company-provided cab: pros and cons

Each post: 1,200–1,800 words, one primary informational keyword, table or checklist, 3+ internal links to money/location pages, author box, updated date, FAQ (3–5). Any legal/regulatory claim must cite an official source and be flagged `needsVerification: true` in frontmatter until checked by a human.

Publish cadence: build posts 1–12 at launch, then 2–3/week.

---

## 9. Technical SEO checklist

- Slugs: lowercase, hyphenated, no stop-word bloat, trailing slash consistent.
- Unique `<title>` (≤60 chars) and meta description (≤155) per page, generated from data with fallback.
- Canonical on every page; `og:` + `twitter:` tags with a real 1200×630 image per template.
- Schema (JSON-LD via `Schema.astro`):
  - Sitewide: `Organization` + `LocalBusiness` (subtype `TaxiService`) with address, geo, phone, openingHours, areaServed (list of Hyderabad localities), sameAs.
  - Service pages: `Service` with provider + areaServed.
  - Location pages: `Service` with `areaServed` = that locality.
  - FAQ blocks: `FAQPage`. All pages: `BreadcrumbList`. Blog: `BlogPosting`.
  - No fake `AggregateRating`.
- `sitemap-index.xml` (exclude thank-you/404), `robots.txt`, `llms.txt` summarising services.
- Internal linking: every service page links to ≥8 location pages; every location page links to ≥5 services + 3 nearby areas; blog posts link up to their cluster's money page. Footer: grouped link columns (Services / Top Areas / Company) — no duplicates.
- Headings: single H1, logical H2/H3.
- Image alt text descriptive, not stuffed. Filenames keyword-relevant.
- 301 redirects config in `vercel.json` for any future URL changes.
- Core Web Vitals budget enforced: no carousels with heavy JS, fonts preloaded, hero image ≤120KB.

---

## 10. Lead capture & tracking

- `QuoteForm` component used on home, every service & location page, contact.
- Fields: name, company, phone (Indian 10-digit validation), email, employees count (select ranges), service type, pickup area, office location, shift type (day/night/24x7), message. Hidden: page URL, slug, UTM params, gclid/fbclid, `lead_type`.
- Submit → POST JSON to `SITE.leadWebhook`; on success redirect to `/thank-you/` (fires GA4 `generate_lead` + Meta `Lead` with event_id for CAPI dedup). Graceful error state with WhatsApp fallback.
- Honeypot field + basic rate limit; no reCAPTCHA unless spam appears.
- WhatsApp links prefilled per page: "Hi, I need {service} in {area} for {N} employees".
- Click-to-call and WhatsApp clicks tracked as GA4 events.
- Load GA4/Pixel after consent banner interaction or `requestIdleCallback`; never block render.

---

## 11. Content rules (for every page Claude writes)

1. Write for HR, admin and facilities managers at Hyderabad companies — practical, specific, no fluff.
2. No fabricated facts: no fake clients, numbers, awards, reviews, years, or regulatory claims. Use `{{PLACEHOLDER}}` and list them in `TODO-CONTENT.md`.
3. Local specificity beats generic copy: name real roads, junctions, metro stations and travel-time patterns.
4. Don't copy text from corporatetaxiservices.com, whistledrive.com or any competitor. Original wording only.
5. Indian English, ₹ symbol, "lakh" where natural, 24-hour shift language (e.g. "2 AM drop").
6. Each FAQ answer 40–80 words, directly answers the question in the first sentence.

---

## 12. Build order (do in this sequence, commit after each)

1. Scaffold Astro + Tailwind + MDX + sitemap; set up `site.ts`, design tokens, BaseLayout, Header, Footer, StickyCTA, Schema.
2. Build component library (§1 list) with a `/styleguide` page (noindex) to review the design.
3. Home page.
4. `services.json` for all 16 services + service template → generate pages.
5. `locations.json` Priority 1 (16 areas) + template.
6. Fleet, Pricing (with estimator), Safety, Technology, About, Contact, FAQ, Attach-your-cab, legal pages, thank-you, 404.
7. Industries (6).
8. Blog setup + first 12 posts.
9. SEO pass: titles/meta audit script (`scripts/seo-audit.mjs` — flags duplicate titles/descriptions, missing H1, pages < 800 words, broken internal links, missing alt).
10. Lighthouse run on home, one service, one location, one blog post; fix to ≥95.
11. Write `TODO-CONTENT.md` listing every placeholder the owner must fill and every claim flagged for verification.
12. Location pages Priority 2.

## 13. Definition of done
- `npm run build` passes with zero warnings; `scripts/seo-audit.mjs` reports no errors.
- All pages render without JS except interactive islands.
- Every page has a form or a clear CTA above the fold on mobile.
- No placeholder text visible in production (`{{` grep returns nothing in `dist/`), or the build fails.
