import servicesJson from '../data/services.json';
import locationsJson from '../data/locations.json';
import industriesJson from '../data/industries.json';
import solutionsJson from '../data/solutions.json';
import fleetJson from '../data/fleet.json';
import faqsJson from '../data/faqs.json';
import testimonialsJson from '../data/testimonials.json';
import clientsJson from '../data/clients.json';

export interface FAQ { q: string; a: string }
export interface IconItem { icon: string; title: string; text: string }
export interface TitledItem { title: string; text: string }
export interface Section { h2: string; paragraphs: string[]; bullets?: string[] }

export interface Service {
  slug: string; shortTitle: string; h1: string; metaTitle: string; metaDescription: string;
  primaryKeyword: string; icon: string; cardBlurb: string; intro: string[];
  whatsIncluded: IconItem[]; whoItsFor: TitledItem[]; process: TitledItem[]; vehicles: string[];
  safetyNote: string; areas: string[]; sections: Section[]; pricingNote: string; faqs: FAQ[];
  related: string[]; blogs: string[]; whatsapp: string; kicker?: string;
}
export interface Route { from: string; to: string; km: string; peak: string; note?: string }
export interface Location {
  slug: string; name: string; priority: 1 | 2; h1: string; metaTitle: string; metaDescription: string; tagline: string;
  intro: string[]; landmarks: string[]; techParks: string[]; metro: string[]; commonRoutes: Route[];
  travelNotes: string[]; commuteTimes: { origin: string; minutes: string }[]; services: string[]; nearby: string[];
  faqs: FAQ[]; whatsapp: string;
}
export interface Industry {
  slug: string; name: string; h1: string; metaTitle: string; metaDescription: string; icon: string; intro: string[];
  challenges: TitledItem[]; solutions: IconItem[]; shiftPatterns: TitledItem[]; hubs: string[]; areas: string[];
  services: string[]; sections: Section[]; faqs: FAQ[]; blogs: string[];
}
export interface Vehicle {
  slug: string; name: string; examples: string; seats: number; luggage: string; ac: boolean; icon: string;
  bestFor: string; notes: string; useCases: string[];
}
export interface Testimonial { name: string; role: string; company: string; quote: string; consent: boolean }
export interface Client { name: string; logo: string; alt: string }

export const services = servicesJson as Service[];
export const locations = locationsJson as Location[];
export const industries = industriesJson as Industry[];
export const solutions = solutionsJson as Service[];
export const fleet = fleetJson as Vehicle[];
export const faqs = faqsJson as { home: FAQ[]; groups: { name: string; items: FAQ[] }[] };
export const testimonials = (testimonialsJson as Testimonial[]).filter((t) => t.consent && t.quote);
export const clients = clientsJson as Client[];

const by = <T extends { slug: string }>(arr: T[]) => (slug: string) => arr.find((x) => x.slug === slug);
export const serviceBySlug = by(services);
export const locationBySlug = by(locations);
export const industryBySlug = by(industries);
export const solutionBySlug = by(solutions);
export const vehicleBySlug = by(fleet);

export const p1Locations = locations.filter((l) => l.priority === 1);
export const p2Locations = locations.filter((l) => l.priority === 2);
export const topAreas = (n = 16) => [...p1Locations, ...p2Locations].slice(0, n);

/** Home-page "6 core services" in display order. */
export const coreServiceSlugs = [
  'employee-transportation-hyderabad',
  'office-pickup-and-drop-hyderabad',
  'monthly-cab-for-office-hyderabad',
  'night-shift-cab-hyderabad',
  'employee-shuttle-bus-hyderabad',
  'airport-transfers-hyderabad',
];
export const coreServices = coreServiceSlugs.map(serviceBySlug).filter(Boolean) as Service[];

export const url = {
  service: (s: string) => `/services/${s}/`,
  location: (s: string) => `/locations/${s}/`,
  industry: (s: string) => `/industries/${s}/`,
  solution: (s: string) => `/solutions/${s}/`,
  blog: (s: string) => `/blog/${s}/`,
};
