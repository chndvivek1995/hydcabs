import { SITE, fullAddress } from '../config/site';
import { locations } from './data';
import type { FAQ } from './data';

const base = () => SITE.domain.replace(/\/$/, '');
const abs = (path: string) => base() + path;

export const organizationId = () => abs('/#organization');

export function organization() {
  return {
    '@type': ['Organization', 'LocalBusiness', 'TaxiService'],
    '@id': organizationId(),
    name: SITE.brand,
    legalName: SITE.legalName,
    url: base() + '/',
    logo: abs('/logo.svg'),
    image: abs('/og-default.jpg'),
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: SITE.founded,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.pin,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00', closes: '23:59',
    }],
    areaServed: [
      { '@type': 'City', name: 'Hyderabad' },
      ...locations.map((l) => ({ '@type': 'Place', name: `${l.name}, Hyderabad` })),
    ],
    sameAs: Object.values(SITE.social).filter((u) => u && !u.includes('{{')),
    contactPoint: [{ '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'sales', areaServed: 'IN', availableLanguage: ['en', 'hi', 'te'] }],
  };
}

export function website() {
  return { '@type': 'WebSite', '@id': abs('/#website'), url: base() + '/', name: SITE.brand, publisher: { '@id': organizationId() }, inLanguage: 'en-IN' };
}

export function webpage(path: string, name: string, description: string) {
  return { '@type': 'WebPage', '@id': abs(path) + '#webpage', url: abs(path), name, description, isPartOf: { '@id': abs('/#website') }, about: { '@id': organizationId() }, inLanguage: 'en-IN' };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqPage(items: FAQ[]) {
  if (!items?.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function service(opts: { path: string; name: string; description: string; areaServed?: string[]; serviceType?: string }) {
  return {
    '@type': 'Service',
    '@id': abs(opts.path) + '#service',
    name: opts.name,
    serviceType: opts.serviceType || 'Corporate cab and employee transportation',
    description: opts.description,
    url: abs(opts.path),
    provider: { '@id': organizationId() },
    areaServed: (opts.areaServed?.length ? opts.areaServed : ['Hyderabad']).map((a) => ({ '@type': 'Place', name: a })),
    audience: { '@type': 'BusinessAudience', name: 'Companies in Hyderabad' },
  };
}

export function blogPosting(opts: { path: string; title: string; description: string; published: Date; updated?: Date; author: string; image?: string }) {
  return {
    '@type': 'BlogPosting',
    '@id': abs(opts.path) + '#article',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated || opts.published).toISOString(),
    author: { '@type': 'Organization', name: `${opts.author}, ${SITE.brand}` },
    publisher: { '@id': organizationId() },
    image: abs(opts.image || '/og-default.jpg'),
    inLanguage: 'en-IN',
  };
}

export function graph(...nodes: (object | null | undefined)[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
