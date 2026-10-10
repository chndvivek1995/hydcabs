// Renders the default 1200x630 OG image and the 180px apple-touch-icon from inline SVG using sharp.
import sharp from 'sharp';
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><radialGradient id="g1" cx="85%" cy="20%" r="60%"><stop offset="0" stop-color="#1E5BFF" stop-opacity=".45"/><stop offset="1" stop-color="#1E5BFF" stop-opacity="0"/></radialGradient>
<radialGradient id="g2" cx="10%" cy="95%" r="50%"><stop offset="0" stop-color="#FFC400" stop-opacity=".25"/><stop offset="1" stop-color="#FFC400" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".06"/></pattern></defs>
<rect width="1200" height="630" fill="#0B0F19"/><rect width="1200" height="630" fill="url(#grid)"/><rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
<g transform="translate(80 80)"><rect width="64" height="64" rx="16" fill="#FFC400"/><path transform="translate(0 0) scale(1)" d="M16 36l4-11a4 4 0 0 1 3.8-2.7h16.4A4 4 0 0 1 44 25l4 11v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3H22v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-9zm6.3-2h19.4l-2.6-7.2a1 1 0 0 0-.9-.7H25.8a1 1 0 0 0-.9.7L22.3 34zM22 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm20 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#0B0F19"/></g>
<text x="80" y="235" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#FFC400" letter-spacing="4">CORPORATE CAB &amp; EMPLOYEE TRANSPORTATION · HYDERABAD</text>
<text x="80" y="320" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="800" fill="#ffffff" letter-spacing="-2">Employee transport your</text>
<text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="800" fill="#ffffff" letter-spacing="-2">teams actually show up for</text>
<text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#8B94A7">Office pickup &amp; drop · Monthly cabs · Night shifts · Shuttles · GPS-tracked · 24×7 desk</text>
<g stroke-linecap="round" fill="none"><path d="M820 520 Q900 470 980 500 T1120 460" stroke="#FFC400" stroke-width="3" stroke-dasharray="8 10"/><path d="M780 560 Q880 600 960 560 T1130 540" stroke="#1E5BFF" stroke-width="3" stroke-dasharray="8 10"/></g>
<g fill="#FFC400"><circle cx="820" cy="520" r="9"/><circle cx="1120" cy="460" r="9"/></g><g fill="#fff"><circle cx="980" cy="500" r="6"/><circle cx="780" cy="560" r="6"/><circle cx="1130" cy="540" r="6"/></g>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og-default.jpg');
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180"><rect width="64" height="64" rx="14" fill="#FFC400"/><path d="M16 36l4-11a4 4 0 0 1 3.8-2.7h16.4A4 4 0 0 1 44 25l4 11v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3H22v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-9zm6.3-2h19.4l-2.6-7.2a1 1 0 0 0-.9-.7H25.8a1 1 0 0 0-.9.7L22.3 34zM22 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm20 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#0B0F19"/></svg>`;
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png');
console.log('og-default.jpg + apple-touch-icon.png written');
