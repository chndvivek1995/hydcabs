// Renders the default 1200x630 OG image and the 180px apple-touch-icon from inline SVG using sharp.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const fraunces = readFileSync('public/fonts/fraunces-var.woff2').toString('base64');
const mark = `<circle cx="24" cy="24" r="22.5" fill="#1A1C1F" stroke="#0F55C0" stroke-width="1.5"/><path d="M15 35 L24 13 L33 35" fill="none" stroke="#0F55C0" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><path d="M24 20 V35" stroke="#0F55C0" stroke-width="1.8" stroke-dasharray="2.5 3" stroke-linecap="round"/><circle cx="24" cy="13" r="2.6" fill="#0F55C0"/>`;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><style>@font-face{font-family:'Fraunces';src:url(data:font/woff2;base64,${fraunces}) format('woff2');font-weight:100 900;}</style></defs>
<rect width="1200" height="630" fill="#1A1C1F"/>
<rect x="60" y="60" width="1080" height="510" fill="none" stroke="#ffffff" stroke-opacity=".14"/>
<g transform="translate(100 100) scale(1.6)">${mark}</g>
<text x="196" y="138" font-family="Fraunces, Georgia, serif" font-size="30" font-weight="500" fill="#FBFAF7">HydCorporate <tspan font-style="italic" font-weight="300" fill="#0F55C0">Cabs</tspan></text>
<text x="196" y="162" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#9AA0AB" letter-spacing="4">CORPORATE MOBILITY · HYDERABAD</text>
<text x="100" y="330" font-family="Fraunces, Georgia, serif" font-size="68" font-weight="500" fill="#FBFAF7" letter-spacing="-1">Employee transport your</text>
<text x="100" y="408" font-family="Fraunces, Georgia, serif" font-size="68" font-weight="500" fill="#FBFAF7" letter-spacing="-1">teams actually <tspan font-style="italic" font-weight="300" fill="#9CBCF2">show up for</tspan></text>
<line x1="100" y1="455" x2="160" y2="455" stroke="#0F55C0" stroke-width="1.5"/>
<text x="100" y="500" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#9AA0AB">Office pickup &amp; drop · Monthly plans · Night shifts · Shuttles · GPS-tracked fleet · 24×7 desk</text>
<g fill="none" stroke="#0F55C0" stroke-width="1.5" stroke-dasharray="5 9" stroke-linecap="round"><path d="M820 160 Q930 120 1040 170 T1120 150"/><path d="M860 250 Q960 300 1060 240"/></g>
<g fill="#0F55C0"><circle cx="820" cy="160" r="5"/><circle cx="1120" cy="150" r="5"/><circle cx="860" cy="250" r="4"/><circle cx="1060" cy="240" r="4"/></g>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 84, mozjpeg: true }).toFile('public/og-default.jpg');
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="180" height="180"><rect width="48" height="48" rx="10" fill="#1A1C1F"/><g transform="translate(4 4) scale(.8333)">${mark}</g></svg>`;
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png');
console.log('og-default.jpg + apple-touch-icon.png written');
