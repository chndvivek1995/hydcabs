// Fails the production build if any {{PLACEHOLDER}} survives into dist/. Locally it only warns
// (so the site can be reviewed before the owner fills site.ts). Strict only when STRICT_PLACEHOLDERS=1 is set (set it on Vercel once the owner has filled site.ts).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const strict = process.env.STRICT_PLACEHOLDERS === "1";
const hits = new Map();
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.(html|xml|txt|json|js)$/.test(f)) { const m = readFileSync(p, 'utf8').match(/\{\{[A-Z0-9_]+\}\}/g); if (m) hits.set(p, [...new Set(m)]); } } };
walk('dist');
if (hits.size) {
  const tokens = new Set([...hits.values()].flat());
  console[strict ? 'error' : 'warn'](`\n${strict ? '✖' : '⚠'} ${hits.size} built files still contain placeholders: ${[...tokens].join(', ')}\n  Fill src/config/site.ts (see TODO-CONTENT.md).${strict ? '' : ' (warning until STRICT_PLACEHOLDERS=1)'}`);
  if (strict) process.exit(1);
} else console.log('✓ No {{PLACEHOLDER}} text in dist/');
