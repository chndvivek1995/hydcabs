// Cross-reference validation for data files. Exits 1 on dangling slugs or schema gaps.
import { readFileSync, readdirSync } from 'node:fs';
const dir = new URL('../src/data/', import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
const services = read('services.json'), locations = read('locations.json'), industries = read('industries.json'), solutions = read('solutions.json'), fleet = read('fleet.json'), faqs = read('faqs.json');
const blogs = readdirSync(new URL('../src/content/blog/', import.meta.url)).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
const S = new Set(services.map((s) => s.slug)), L = new Set(locations.map((l) => l.slug)), F = new Set(fleet.map((f) => f.slug)), B = new Set(blogs);
const errs = [];
const check = (ctx, arr, set, kind) => (arr || []).forEach((x) => { if (!set.has(x)) errs.push(`${ctx}: unknown ${kind} "${x}"`); });
const words = (o) => JSON.stringify(o).replace(/"[a-zA-Z0-9_]+":/g, ' ').split(/\s+/).filter((w) => /[a-zA-Z]/.test(w)).length;
for (const s of [...services, ...solutions]) {
  const c = `service ${s.slug}`;
  check(c, s.areas, L, 'location'); check(c, s.related, S, 'service'); check(c, s.blogs, B, 'blog'); check(c, s.vehicles, F, 'vehicle');
  if (s.process?.length !== 4) errs.push(`${c}: process has ${s.process?.length} steps`);
  if ((s.areas || []).length < 8) errs.push(`${c}: only ${s.areas?.length} areas`);
  if (s.metaTitle.length > 48) errs.push(`${c}: metaTitle ${s.metaTitle.length} chars`);
  if (s.metaDescription.length > 160) errs.push(`${c}: metaDescription ${s.metaDescription.length} chars`);
  if (JSON.stringify(s).includes('{{')) errs.push(`${c}: contains {{`);
  const w = words(s); if (w < 1100) errs.push(`${c}: only ~${w} words`);
}
for (const l of locations) {
  const c = `location ${l.slug}`;
  check(c, l.services, S, 'service'); check(c, l.nearby, L, 'location');
  if (l.nearby?.length !== 3) errs.push(`${c}: nearby has ${l.nearby?.length}`);
  if ((l.services || []).length < 5) errs.push(`${c}: only ${l.services?.length} services`);
  if (l.metaTitle.length > 48) errs.push(`${c}: metaTitle ${l.metaTitle.length} chars`);
  if (JSON.stringify(l).includes('{{')) errs.push(`${c}: contains {{`);
  const w = words(l); if (w < 900) errs.push(`${c}: only ~${w} words`);
}
for (const i of industries) { const c = `industry ${i.slug}`; check(c, i.areas, L, 'location'); check(c, i.services, S, 'service'); check(c, i.blogs, B, 'blog'); if (i.metaTitle.length > 48) errs.push(`${c}: metaTitle ${i.metaTitle.length} chars`); }
if (faqs.home?.length !== 8) errs.push(`faqs.home has ${faqs.home?.length}`);
const dupTitles = new Map(); [...services, ...solutions, ...locations, ...industries].forEach((x) => dupTitles.set(x.metaTitle, (dupTitles.get(x.metaTitle) || 0) + 1)); [...dupTitles].filter(([, n]) => n > 1).forEach(([t]) => errs.push(`duplicate metaTitle: ${t}`));
console.log(`services ${services.length} · solutions ${solutions.length} · locations ${locations.length} · industries ${industries.length} · blog ${blogs.length}`);
if (errs.length) { console.error(errs.join('\n')); process.exit(1); } else console.log('✓ data cross-references OK');
