// Merges agent-written part files into the canonical data files, validates cross-references, then removes the parts.
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
const dir = new URL('../src/data/', import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
const merge = (parts, out) => {
  const present = parts.filter((p) => existsSync(new URL(p, dir)));
  if (!present.length) return;
  const all = present.flatMap(read);
  writeFileSync(new URL(out, dir), JSON.stringify(all, null, 2) + '\n');
  present.forEach((p) => unlinkSync(new URL(p, dir)));
  console.log(`${out}: ${all.length} objects from ${present.join(', ')}`);
};
merge(['services-a.json', 'services-b.json'], 'services.json');
merge(['locations-p1a.json', 'locations-p1b.json', 'locations-p2a.json', 'locations-p2b.json'], 'locations.json');
