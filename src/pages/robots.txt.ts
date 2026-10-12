import type { APIRoute } from 'astro';
import { tempHost } from '../config/site';
export const GET: APIRoute = ({ site }) => new Response(
  tempHost
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /thank-you/\nDisallow: /styleguide/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
