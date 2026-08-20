/**
 * Generates the PNG icons and the social-sharing card from the brand mark.
 *
 *   npm run icons
 *
 * Everything it writes lands in public/ and is committed, so this only needs
 * re-running if the mark or the wording on the card changes.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const out = (name) => resolve(import.meta.dirname, '../public', name);

const forest = '#0f2019';
const cream = '#fbf8f2';
const apricot = '#ecb374';
const apricotDeep = '#b55f20';

/** The mark, on a square ground. */
const mark = (size, ground, ink) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="${ground === 'none' ? 0 : 10}" fill="${ground === 'none' ? 'none' : ground}"/>
  <g fill="none" stroke="${ink}" stroke-width="1.7">
    <circle cx="24" cy="24" r="17.5" opacity="0.4"/>
    <circle cx="24" cy="24" r="12.6"/>
    <path d="M24 32V21" stroke-width="1.9" stroke-linecap="round"/>
    <path d="M24 21.6c0-3.9 2.9-6.9 6.9-7.2.3 3.9-2.7 6.9-6.9 7.2Z" stroke-linejoin="round"/>
    <path d="M24 24.6c0-3-2.2-5.3-5.3-5.6.2 3 2.1 5.3 5.3 5.6Z" stroke-linejoin="round"/>
  </g>
</svg>`;

/** The 1200×630 card used for link previews. */
const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${forest}"/>
  <circle cx="1010" cy="150" r="300" fill="${apricotDeep}" opacity="0.18"/>
  <circle cx="150" cy="560" r="220" fill="${apricot}" opacity="0.10"/>

  <g transform="translate(96, 150) scale(2.1)" fill="none" stroke="${apricot}" stroke-width="1.7">
    <circle cx="24" cy="24" r="17.5" opacity="0.4"/>
    <circle cx="24" cy="24" r="12.6"/>
    <path d="M24 32V21" stroke-width="1.9" stroke-linecap="round"/>
    <path d="M24 21.6c0-3.9 2.9-6.9 6.9-7.2.3 3.9-2.7 6.9-6.9 7.2Z" stroke-linejoin="round"/>
    <path d="M24 24.6c0-3-2.2-5.3-5.3-5.6.2 3 2.1 5.3 5.3 5.6Z" stroke-linejoin="round"/>
  </g>

  <text x="96" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="600" fill="${cream}">
    Beyond the Plate
  </text>
  <text x="96" y="392" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${cream}" opacity="0.78">
    Whole-child nutrition &amp; health coaching
  </text>
  <text x="96" y="436" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${cream}" opacity="0.78">
    for school-age children and their families
  </text>

  <rect x="96" y="486" width="86" height="3" fill="${apricot}"/>

  <text x="96" y="546" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${apricot}">
    Dr. Indu Tan
  </text>
  <text x="96" y="586" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="${cream}" opacity="0.6">
    Board-Certified Health Coach &amp; Life Coach
  </text>
</svg>`;

const jobs = [
  ['favicon-64.png', mark(64, forest, apricot)],
  ['apple-touch-icon.png', mark(180, forest, apricot)],
  ['logo.png', mark(512, forest, apricot)],
  ['og-default.png', card],
];

for (const [name, svg] of jobs) {
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  writeFileSync(out(name), png);
  console.log(`wrote public/${name} (${(png.length / 1024).toFixed(1)} kB)`);
}
