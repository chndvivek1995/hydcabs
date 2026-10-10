// Pricing structure. Actual ₹ figures are OPTIONAL and come ONLY from the owner. Leave a cell undefined → "On request".
// Fill `rates` from the owner's rate card before launch (listed in TODO-CONTENT.md).
export const pricing = {
  workingDays: 22,
  perEmployee: {
    columns: ['Day shift', 'Night shift (with allowance)'],
    rows: [
      { label: 'Up to 10 km', sub: 'one-way, home ↔ office', cells: [undefined, undefined] },
      { label: 'Up to 15 km', sub: 'one-way', cells: [undefined, undefined] },
      { label: 'Up to 20 km', sub: 'one-way', cells: [undefined, undefined] },
      { label: '20 km +', sub: 'ORR / cross-city routes', cells: ['Custom', 'Custom'] },
    ],
    note: 'Per employee per month, two trips a day, 22 working days. Shared sedan/SUV routes. Escort, toll and parking itemised separately.',
  },
  dedicated: {
    columns: ['Working days', 'Km cap / month', 'Extra km', 'Extra hour'],
    rows: [
      { label: 'Sedan', sub: 'Dzire / Etios class', cells: ['22', '2,000 km', undefined, undefined] },
      { label: 'SUV', sub: 'Ertiga / XL6 class', cells: ['22', '2,000 km', undefined, undefined] },
      { label: 'Premium MUV', sub: 'Innova Crysta class', cells: ['22', '2,000 km', undefined, undefined] },
      { label: 'Tempo Traveller', sub: '12 / 17-seater', cells: ['22', '2,000 km', undefined, undefined] },
      { label: 'Mini bus / Bus', sub: '26 / 40-seater', cells: ['22', 'Custom', undefined, undefined] },
    ],
    note: 'Dedicated vehicle with driver, fuel included up to the km cap, 12-hour duty day. Monthly package price shown on request after a route study. Driver night allowance applies after 10 PM.',
  },
  local: {
    columns: ['Sedan', 'SUV', 'Premium MUV'],
    rows: [
      { label: '4 hr / 40 km', sub: 'half-day local', cells: [undefined, undefined, undefined] },
      { label: '8 hr / 80 km', sub: 'full-day local', cells: [undefined, undefined, undefined] },
      { label: '12 hr / 120 km', sub: 'extended day', cells: [undefined, undefined, undefined] },
    ],
    note: 'Local packages for client visits, interviews and events. Extra km and hours billed at the contracted rate; tolls and parking at actuals.',
  },
  airport: {
    columns: ['Sedan', 'SUV', 'Premium MUV'],
    rows: [
      { label: 'IT corridor ↔ RGIA', sub: 'HITEC City, Gachibowli, Financial District, Kokapet', cells: [undefined, undefined, undefined] },
      { label: 'Central Hyderabad ↔ RGIA', sub: 'Banjara Hills, Jubilee Hills, Begumpet', cells: [undefined, undefined, undefined] },
      { label: 'East / North ↔ RGIA', sub: 'Uppal, Pocharam, Secunderabad, Kompally', cells: [undefined, undefined, undefined] },
    ],
    note: 'One-way transfers, PVNR Expressway tolls included where noted in the contract. Night pickups (11 PM–5 AM) carry a driver allowance.',
  },
  // Estimator: when the owner supplies per-employee slab rates, fill these (₹ per employee per month, day shift).
  // Leave null → estimator shows relative guidance (vehicle count, routes) instead of rupee ranges.
  estimatorRates: { 10: null as number | null, 15: null as number | null, 20: null as number | null, nightUplift: 0.15, escortPerRoute: null as number | null },
};
