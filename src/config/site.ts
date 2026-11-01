// All business details live here. Never hard-code them in pages.
// {{PLACEHOLDERS}} must be filled before launch — see TODO-CONTENT.md. The build fails on Vercel if any remain.
export const SITE = {
  brand: "{{BRAND_NAME}}",            // e.g. "HydCorporate Cabs"
  legalName: "{{LEGAL_ENTITY_NAME}}", // e.g. "XYZ Travels Pvt Ltd"
  domain: (import.meta.env.SITE_URL as string | undefined) || "https://{{DOMAIN}}",
  phone: "+91-9121389004",
  phoneDial: "+919121389004",
  phoneDisplay: "+91 91213 89004",
  whatsapp: "919121389004",
  email: "{{EMAIL}}",
  address: {
    street: "{{STREET_ADDRESS}}",
    locality: "{{LOCALITY}}",
    city: "Hyderabad",
    region: "Telangana",
    pin: "{{PIN}}",
    country: "IN",
  },
  geo: { lat: 0, lng: 0 },           // office location for schema — fill before launch
  gstin: "{{GSTIN}}",                // optional, shown in footer = trust
  founded: "{{YEAR}}",
  hours: "Mo-Su 00:00-23:59",        // 24x7 command desk
  stats: {
    vehicles: "{{N}}+",
    clients: "{{N}}+",
    tripsPerMonth: "{{N}}+",
    employeesDaily: "{{N}}+",
  },
  // Risk reducers shown in the final CTA band — keep only the ones the business actually offers.
  riskReducers: ["Free route study", "Trial week before you commit", "No setup fee"],
  social: {
    linkedin: "{{LINKEDIN_URL}}",
    googleBusiness: "{{GOOGLE_BUSINESS_PROFILE_URL}}",
  },
  leadWebhook: (import.meta.env.PUBLIC_LEAD_WEBHOOK as string | undefined) || "",
  ga4: (import.meta.env.PUBLIC_GA4_ID as string | undefined) || "",
  metaPixel: (import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined) || "",
} as const;

// Display-only name for the logo lockup until BRAND_NAME is filled (the brief's own example). Titles, schema and copy still use SITE.brand.
export const brandDisplay = /\{\{/.test(SITE.brand) ? "HydCorporate Cabs" : SITE.brand;
export const isPlaceholder = (v: string) => /\{\{.*\}\}/.test(v);
// True on preview hosts (vercel.app) or while the domain is unfilled — pages render noindex so the placeholder site is never indexed.
export const tempHost = /vercel\.app|\{\{/.test(SITE.domain);
export const fullAddress = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.pin}`;

export const waLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:${SITE.phoneDial}`;
