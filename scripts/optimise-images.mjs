// Converts raw generated photos in src/assets/photos/*.{png,jpg} into sized WebP files in public/images.
// Hero → 1920w (q 72) + 960w mobile; others → 1536w (q 76) + 768w.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
mkdirSync('public/images', { recursive: true });
for (const f of readdirSync('src/assets/photos').filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const base = f.replace(/\.(png|jpe?g)$/i, '');
  const hero = base.startsWith('hero');
  const sizes = hero ? [[1920, 60, ''], [960, 64, '-960']] : [[1536, 76, ''], [768, 70, '-768']];
  for (const [w, q, suf] of sizes) {
    const out = `public/images/${base}${suf}.webp`;
    const info = await sharp(`src/assets/photos/${f}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(out);
    console.log(out, Math.round(info.size / 1024) + 'KB', info.width + 'x' + info.height);
  }
}
