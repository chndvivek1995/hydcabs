// SEO audit over dist/: duplicate titles/descriptions, missing/multiple H1, title/description length, thin pages (<800 words,
// excluding legal/utility pages), broken internal links, images without alt, missing canonical. Exit 1 on errors.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const root = 'dist';
if (!existsSync(root)) { console.error('dist/ not found — run `astro build` first'); process.exit(1); }
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f === 'index.html') pages.push(p); } };
walk(root);
const errors = [], warns = [];
const titles = new Map(), descs = new Map();
const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const skipThin = /^(thank-you|404|styleguide|privacy-policy|terms|contact)\/?$/;
const urls = new Set(pages.map((p) => '/' + relative(root, p).replace(/index\.html$/, '')));
for (const file of pages) {
  const url = '/' + relative(root, file).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim() || "");
  const desc = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const noindex = /<meta name="robots" content="noindex/.test(html);
  if (!title) errors.push(`${url}: missing <title>`); else { titles.set(title, [...(titles.get(title) || []), url]); if (title.length > 60) warns.push(`${url}: title ${title.length} chars: "${title}"`); }
  if (!desc) errors.push(`${url}: missing description`); else { descs.set(desc, [...(descs.get(desc) || []), url]); if (desc.length > 160) warns.push(`${url}: description ${desc.length} chars`); if (desc.length < 70) warns.push(`${url}: description short (${desc.length})`); }
  if (!/<link rel="canonical"/.test(html)) errors.push(`${url}: missing canonical`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length; if (h1s !== 1) errors.push(`${url}: ${h1s} <h1> tags`);
  if (!/application\/ld\+json/.test(html)) errors.push(`${url}: missing JSON-LD`);
  const words = text(html.replace(/<header[\s\S]*?<\/header>/, '').replace(/<footer[\s\S]*?<\/footer>/, '')).split(' ').length;
  if (!noindex && !skipThin.test(url.slice(1)) && words < 800) warns.push(`${url}: thin page (~${words} words)`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) { if (!/\balt=/.test(m[0])) errors.push(`${url}: <img> without alt`); }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) { let h = m[1]; if (/\.[a-z0-9]+$/i.test(h)) { if (!existsSync(join(root, h))) errors.push(`${url}: broken link ${h}`); continue; } if (!h.endsWith('/')) { warns.push(`${url}: link without trailing slash ${h}`); h += '/'; } if (!urls.has(h)) errors.push(`${url}: broken internal link ${h}`); }
  if (!noindex && /\{\{[A-Z0-9_]+\}\}/.test(html)) warns.push(`${url}: placeholder text present`);
}
for (const [t, us] of titles) if (us.length > 1) errors.push(`duplicate title "${t}": ${us.join(', ')}`);
for (const [d, us] of descs) if (us.length > 1) errors.push(`duplicate description: ${us.join(', ')}`);
console.log(`Audited ${pages.length} pages.`);
if (warns.length) console.log(`\n⚠ ${warns.length} warnings\n` + warns.map((w) => '  ' + w).join('\n'));
if (errors.length) { console.error(`\n✖ ${errors.length} errors\n` + errors.map((e) => '  ' + e).join('\n')); process.exit(1); }
console.log('\n✓ No SEO errors');
