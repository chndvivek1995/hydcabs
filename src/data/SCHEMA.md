# Content schema & slug registry (single source of truth for all content agents)

All JSON files are arrays of objects. Keys are camelCase. Strings are plain text (no HTML, no Markdown)
unless a field says otherwise. Use Indian English, ₹, "lakh", 24-hour shift wording ("2 AM drop").

## HARD RULES (every writer)
1. NO fabricated facts: no client names, no company counts, no ratings, no awards, no years in business,
   no vehicle counts, no prices, no "₹X per km", no regulatory claims stated as fact. If pricing must be
   discussed, describe what drives it and say rates are shared after a route study.
2. NEVER write `{{` or `}}` in content (build fails on placeholders in HTML). Brand is injected by templates.
   Refer to the company as "we"/"our team". Never write a brand name.
3. Local specificity: real, well-known Hyderabad roads, junctions, metro stations, tech parks, landmarks only
   (e.g. ORR, Biodiversity Junction, Mindspace, Raidurg Metro, Gachibowli flyover, PVNR Expressway, IKEA
   junction, Cyber Towers, Wipro Circle, ISB Road, Kothaguda junction, Botanical Garden, Durgam Cheruvu bridge,
   Khajaguda, Nanakramguda, Kondapur-Kothaguda, Hafeezpet, JNTU, Kukatpally Y Junction, Miyapur Metro,
   Ameerpet Metro interchange, Begumpet flyover, Paradise Circle, Uppal Ring Road, Pocharam SEZ, LB Nagar Metro,
   Shamshabad RGIA, Outer Ring Road exits). If unsure a tech park exists, do NOT name it — say "the IT parks
   along X Road". Travel times are ranges labelled "typical" (e.g. "35–55 min in peak").
4. Original wording only. Do not copy any competitor site.
5. Each FAQ answer 40–80 words; first sentence directly answers the question.
6. Primary keyword appears naturally in: h1, metaTitle, metaDescription, first paragraph of intro, one H2.
   No keyword stuffing.
7. Word budgets are for the full page (sum of all text fields). Service page 1,200–2,000 words.
   Location page 1,000–1,500 (≥60% area-specific). Industry page 1,000–1,400. Solution page 1,200–1,600.
8. metaTitle ≤ 48 characters (template appends " | Brand"). metaDescription 120–155 chars, ends with a CTA.
9. Output must be valid JSON (no trailing commas, no comments). Use straight quotes inside strings escaped as \".

## Slug registry (use EXACTLY these slugs in cross-references)

### services (file: services.json) — 16
employee-transportation-hyderabad · office-pickup-and-drop-hyderabad · monthly-cab-for-office-hyderabad ·
corporate-car-rental-hyderabad · corporate-taxi-hyderabad · corporate-cab-vendor-hyderabad ·
night-shift-cab-hyderabad · airport-transfers-hyderabad · employee-shuttle-bus-hyderabad ·
corporate-event-transport-hyderabad · executive-chauffeur-hyderabad · outstation-corporate-travel-hyderabad ·
hourly-cab-rental-hyderabad · electric-cab-employee-transport-hyderabad · transport-management-solution ·
corporate-vehicle-leasing-hyderabad

### locations (file: locations.json) — 30
Priority 1: hitec-city · gachibowli · madhapur · kondapur · financial-district · raidurg · kokapet · manikonda ·
narsingi · kukatpally · begumpet · banjara-hills · jubilee-hills · pocharam · uppal · shamshabad
Priority 2: miyapur · chandanagar · tellapur · kollur · nallagandla · ameerpet · secunderabad · kompally ·
balanagar · jeedimetla · genome-valley · patancheru · lb-nagar · dilsukhnagar

### industries (file: industries.json) — 6
it-ites · bpo-kpo-contact-centres · pharma-life-sciences · hospitals-healthcare · manufacturing-warehousing ·
startups-coworking

### solutions (file: solutions.json) — 3  (URL: /solutions/<slug>/)
women-safety-employee-transport-hyderabad · employee-transport-cost-optimization ·
factory-shift-employee-transport-hyderabad

### fleet (file: fleet.json, already written) — slugs
sedan · suv · muv · tempo-traveller · mini-bus · bus · ev-sedan

### blog (files: src/content/blog/<slug>.mdx) — launch set of 12
monthly-cab-cost-office-commute-hyderabad · per-employee-vs-dedicated-vehicle-pricing ·
company-bus-vs-cabs-vs-shuttle-cost-comparison-hyderabad · dead-kilometres-employee-transport-bill ·
gst-on-employee-transportation-cab-rental · hidden-charges-corporate-cab-contracts ·
how-to-choose-corporate-cab-vendor-hyderabad-checklist · rfp-template-employee-transportation-services ·
questions-before-signing-monthly-cab-contract · in-house-fleet-vs-outsourced-employee-transport ·
sla-metrics-employee-transport · switching-transport-vendors-without-disrupting-shifts

### lucide icon names allowed (use only these)
bus · car · car-front · shield-check · map-pin · map · route · clock · moon · sun · plane · users · user-check ·
building-2 · factory · hospital · briefcase · phone · message-circle · bar-chart-3 · gauge · radar · siren ·
lock · leaf · zap · wallet · receipt · calendar-check · file-check · badge-check · headset · navigation ·
smartphone · layout-dashboard · timer · circle-check-big · sparkles · truck · ticket · key-round · gem ·
alert-triangle · eye · heart-handshake · trending-down · repeat · bell-ring · cpu · wifi · battery-charging

## services.json object
{
  "slug": "",
  "shortTitle": "",             // 2–4 words for cards/menus, e.g. "Employee Transportation"
  "h1": "",                     // page H1 = title
  "metaTitle": "",              // ≤48 chars
  "metaDescription": "",        // 120–155 chars
  "primaryKeyword": "",
  "icon": "",                   // from allowed list
  "cardBlurb": "",              // ≤ 140 chars for service cards
  "intro": ["", ""],            // 2 paragraphs; keyword in first 100 words
  "whatsIncluded": [ { "icon": "", "title": "", "text": "" } ],   // 6–8 items, text 25–45 words
  "whoItsFor": [ { "title": "", "text": "" } ],                   // 5–6 items, text 25–40 words
  "process": [ { "title": "", "text": "" } ],                     // exactly 4 steps
  "vehicles": [""],                                               // fleet slugs, 2–5
  "safetyNote": "",                                               // 60–100 words, refers to safety practices generally
  "areas": [""],                                                  // ≥ 8 location slugs, mostly Priority 1
  "sections": [ { "h2": "", "paragraphs": [""], "bullets": [""] } ], // 2–4 deep sections, 120–250 words each; one H2 includes the primary keyword; bullets optional
  "pricingNote": "",                                              // 80–140 words: what drives cost; no numbers
  "faqs": [ { "q": "", "a": "" } ],                               // 6–10
  "related": [""],                                                // 3 service slugs
  "blogs": [""],                                                  // 2–3 blog slugs
  "whatsapp": ""                                                  // prefilled WA text, e.g. "Hi, I need employee transportation in Hyderabad for our team."
}

## locations.json object
{
  "slug": "", "name": "", "priority": 1,
  "h1": "Corporate Cab Services in <Name>",
  "metaTitle": "", "metaDescription": "",
  "tagline": "",                      // ≤ 90 chars, area-specific
  "intro": ["", "", ""],              // 3 paragraphs: why companies here need managed transport; area character; our coverage
  "landmarks": [""],                  // 4–8 real landmarks/junctions
  "techParks": [""],                  // real only; may be [] 
  "metro": [""],                      // nearby metro stations, may be []
  "commonRoutes": [ { "from": "", "to": "", "km": "~14 km", "peak": "45–65 min", "note": "" } ], // 4–6 routes
  "travelNotes": ["", ""],            // 2–3 paragraphs on peak patterns, flyovers, ORR access, bottlenecks
  "commuteTimes": [ { "origin": "", "minutes": "35–55" } ],  // 5–8 origins (residential belts) → this area
  "services": [""],                   // ≥ 5 service slugs
  "nearby": [""],                     // exactly 3 location slugs
  "faqs": [ { "q": "", "a": "" } ],   // 5–6, area-specific
  "whatsapp": ""
}

## industries.json object
{
  "slug": "", "name": "", "h1": "Employee Transport for <Industry> in Hyderabad",
  "metaTitle": "", "metaDescription": "", "icon": "",
  "intro": ["", ""],
  "challenges": [ { "title": "", "text": "" } ],       // 4–5
  "solutions": [ { "icon": "", "title": "", "text": "" } ], // 5–6
  "shiftPatterns": [ { "title": "", "text": "" } ],    // 3–4 (e.g. "US shift 6 PM–3 AM")
  "hubs": [""],                                        // where this industry clusters in Hyderabad (plain text)
  "areas": [""],                                       // ≥ 6 location slugs
  "services": [""],                                    // 4–6 service slugs
  "sections": [ { "h2": "", "paragraphs": [""] } ],    // 1–2 deep sections
  "faqs": [ { "q": "", "a": "" } ],                    // 5–6
  "blogs": [""]
}

## solutions.json object  — same shape as services.json (all fields), plus "kicker": "" (≤ 60 chars, e.g. "Use case")

## faqs.json
{ "home": [ {q,a} x 8 ], "groups": [ { "name": "Pricing", "items": [ {q,a} x 5–6 ] }, ... Safety, Operations, Billing, Contracts ] }

## Blog MDX frontmatter (src/content/blog/<slug>.mdx)
---
title: ""                       # ≤ 65 chars
description: ""                 # 120–155 chars
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: "Operations Team"
cluster: "cost-pricing" | "vendor-selection" | "safety-compliance" | "commute-guides" | "operations-tech" | "use-cases" | "ev-sustainability" | "hr"
primaryKeyword: ""
moneyPage: "/services/<slug>/" | "/pricing/" | "/locations/<slug>/"
needsVerification: false        # true if any legal/regulatory/tax claim is made; also add a "Verify before publishing" note
tags: [""]
faqs:
  - q: ""
    a: ""
---
Body: 1,200–1,800 words of Markdown. One H2 structure (## only, ### allowed). Must include one table OR a
checklist. ≥ 3 internal links as plain Markdown links to money/location pages using site-relative URLs with
trailing slash, e.g. [monthly cab plans](/services/monthly-cab-for-office-hyderabad/). No HTML, no imports,
no JSX components. No images. End with a short "Next step" paragraph linking to /contact/ or /pricing/.
