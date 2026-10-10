import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { services, locations, industries, solutions } from '../lib/data';
export const GET: APIRoute = ({ site }) => {
  const base = String(site).replace(/\/$/, '');
  const body = `# ${SITE.brand} — corporate cab & employee transportation, Hyderabad

> ${SITE.brand} provides managed employee transportation for companies in Hyderabad: office pick-up and drop, monthly cab plans, night-shift cabs with women-safety protocols, employee shuttles, airport transfers, corporate car rental and leasing. GPS-tracked fleet, verified drivers, 24x7 command desk, monthly MIS and billing. Phone ${SITE.phone}.

## Services
${services.map((s) => `- [${s.h1}](${base}/services/${s.slug}/): ${s.metaDescription}`).join('\n')}

## Use cases
${solutions.map((s) => `- [${s.h1}](${base}/solutions/${s.slug}/): ${s.metaDescription}`).join('\n')}

## Industries
${industries.map((i) => `- [${i.h1}](${base}/industries/${i.slug}/)`).join('\n')}

## Areas served (Hyderabad)
${locations.map((l) => `- [${l.name}](${base}/locations/${l.slug}/)`).join('\n')}

## Other pages
- [Pricing](${base}/pricing/) · [Fleet](${base}/fleet/) · [Safety](${base}/safety/) · [Technology](${base}/technology/) · [FAQ](${base}/faq/) · [Blog](${base}/blog/) · [Contact](${base}/contact/)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
