import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL = production origin (set on Vercel). Falls back to the placeholder domain in site.ts.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  server: { port: 4900 },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !/\/(thank-you|404|styleguide)\/?$/.test(page) }),
  ],
  vite: { plugins: [tailwindcss()] },
});
