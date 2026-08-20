/**
 * Copies Dr. Tana's photographs out of a source folder and into
 * src/assets/photos/ under the names the site expects.
 *
 *   node scripts/import-photos.mjs ~/Downloads/Food_Images
 *
 * The mapping below is by original WhatsApp filename, so the same photograph
 * always lands on the same site filename (and therefore keeps its caption in
 * src/data/photos.ts). Re-running it is safe: files are overwritten in place.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const mapping = {
  'WhatsApp Image 2026-08-18 at 15.54.23.jpeg': 'snack-paneer-scramble-toast',
  'WhatsApp Image 2026-08-18 at 15.54.55.jpeg': 'breakfast-sesame-thalipeeth-pan',
  'WhatsApp Image 2026-08-18 at 15.55.36.jpeg': 'breakfast-paniyaram-sambar',
  'WhatsApp Image 2026-08-18 at 15.56.29.jpeg': 'snack-pesto-vegetable-panini',
  'WhatsApp Image 2026-08-18 at 15.57.24.jpeg': 'lunch-grilled-tofu-rice-plate',
  'WhatsApp Image 2026-08-18 at 15.57.41.jpeg': 'breakfast-sabudana-thalipeeth',
  'WhatsApp Image 2026-08-18 at 15.58.45.jpeg': 'salad-chickpea-jackfruit',
  'WhatsApp Image 2026-08-18 at 15.59.10.jpeg': 'snack-idli-fry-masala',
  'WhatsApp Image 2026-08-18 at 15.59.41.jpeg': 'snack-cucumber-toast-cutlets',
  'WhatsApp Image 2026-08-18 at 16.00.03.jpeg': 'snack-mango-cream-cups',
  'WhatsApp Image 2026-08-18 at 16.00.28.jpeg': 'veg-root-vegetable-coconut-fry',
  'WhatsApp Image 2026-08-18 at 16.00.50.jpeg': 'lunch-grilled-bread-chickpea-curry',
  'WhatsApp Image 2026-08-18 at 16.01.13.jpeg': 'breakfast-idli-wedges-chutney',
  'WhatsApp Image 2026-08-18 at 16.01.33.jpeg': 'breakfast-semiya-upma-coffee',
  'WhatsApp Image 2026-08-18 at 16.02.10.jpeg': 'breakfast-semiya-upma-wok',
  'WhatsApp Image 2026-08-18 at 16.02.36.jpeg': 'lunch-idiyappam-coconut-curry',
  'WhatsApp Image 2026-08-18 at 16.03.10.jpeg': 'lunch-mash-roasted-vegetables-bowl',
  'WhatsApp Image 2026-08-18 at 16.03.32.jpeg': 'lunch-mash-stuffed-mushrooms',
  'WhatsApp Image 2026-08-18 at 16.04.12.jpeg': 'breakfast-banana-leaf-rice-cake',
  'WhatsApp Image 2026-08-18 at 16.06.11.jpeg': 'snack-tricolour-tea-sandwiches',
  'WhatsApp Image 2026-08-18 at 16.06.53.jpeg': 'salad-diced-vegetable-croquettes',
  'WhatsApp Image 2026-08-18 at 16.07.09.jpeg': 'snack-vegetable-burgers',
  'WhatsApp Image 2026-08-18 at 16.07.33.jpeg': 'snack-beetroot-patties-mushrooms',
  'WhatsApp Image 2026-08-18 at 16.07.57.jpeg': 'lunch-paratha-courgette-yogurt',
  'WhatsApp Image 2026-08-18 at 16.08.31.jpeg': 'lunch-claypot-noodle-soup',
  'WhatsApp Image 2026-08-18 at 16.08.50.jpeg': 'breakfast-lentil-idli-red-chutney',
  'WhatsApp Image 2026-08-18 at 16.09.13.jpeg': 'lunch-toast-sambar-tofu-peppers',
  'WhatsApp Image 2026-08-18 at 16.09.48.jpeg': 'breakfast-beans-greens-bake',
  'WhatsApp Image 2026-08-18 at 16.10.05.jpeg': 'lunch-cutlets-mushroom-soup',
  'WhatsApp Image 2026-08-18 at 16.10.28.jpeg': 'veg-okra-fry',
  'WhatsApp Image 2026-08-18 at 16.11.07.jpeg': 'veg-tofu-tomato-spring-onion',
  'WhatsApp Image 2026-08-18 at 16.11.42.jpeg': 'lunch-kofta-curry-rice',
  'WhatsApp Image 2026-08-18 at 16.12.19.jpeg': 'salad-chickpea-chana-cucumber',
  'WhatsApp Image 2026-08-18 at 16.12.35.jpeg': 'snack-sourdough-greens-cheese',
  'WhatsApp Image 2026-08-18 at 16.12.57.jpeg': 'lunch-red-curry-vegetables-rice',
  'WhatsApp Image 2026-08-18 at 16.13.19.jpeg': 'veg-vegetable-stew-pan',
  'WhatsApp Image 2026-08-18 at 16.13.41.jpeg': 'lunch-banana-leaf-spread',
  'WhatsApp Image 2026-08-18 at 16.14.00.jpeg': 'lunch-greens-mushroom-cucumber',
  'WhatsApp Image 2026-08-18 at 16.14.24.jpeg': 'lunch-peppers-broccoli-cutlet-toast',
  'WhatsApp Image 2026-08-18 at 16.15.00.jpeg': 'breakfast-steamed-idli-container',
  'WhatsApp Image 2026-08-18 at 16.15.17.jpeg': 'breakfast-greens-olives-cheese-toast',
  'WhatsApp Image 2026-08-18 at 16.15.49.jpeg': 'lunch-vegetable-biryani',
  'WhatsApp Image 2026-08-18 at 16.16.10.jpeg': 'lunch-noodles-tofu-buns',
  'WhatsApp Image 2026-08-18 at 16.16.32.jpeg': 'lunch-salad-cutlets-flatbread',
  'WhatsApp Image 2026-08-18 at 16.16.51.jpeg': 'salad-asparagus-peppers-cutlets',
  'WhatsApp Image 2026-08-18 at 16.17.13.jpeg': 'lunch-tofu-stir-fry-leaves',
  'WhatsApp Image 2026-08-18 at 16.17.54.jpeg': 'breakfast-dosa-chutneys',
  'WhatsApp Image 2026-08-18 at 16.18.09.jpeg': 'snack-muffin-tomato-cheese-celery',
  'WhatsApp Image 2026-08-18 at 16.19.04.jpeg': 'breakfast-appam-vegetable-curry',
  'WhatsApp Image 2026-08-18 at 16.19.38.jpeg': 'lunch-parotta-potato-curry-raita',
  'WhatsApp Image 2026-08-18 at 16.20.11.jpeg': 'lunch-banana-leaf-rice-curry',
  'WhatsApp Image 2026-08-18 at 16.20.24.jpeg': 'breakfast-vadai-pongal-leaf',
  'WhatsApp Image 2026-08-18 at 16.20.49.jpeg': 'lunch-rice-podi-chutney-pickle',
  'WhatsApp Image 2026-08-18 at 16.21.24.jpeg': 'lunch-paneer-masala-fried-rice',
  'WhatsApp Image 2026-08-18 at 16.22.14.jpeg': 'breakfast-paniyaram-kootu-vadai',
  'WhatsApp Image 2026-08-18 at 16.22.40.jpeg': 'lunch-ravioli-mushroom-sauce',
  'WhatsApp Image 2026-08-18 at 16.23.29.jpeg': 'veg-beans-stir-fry-cabbage-rolls',
  'WhatsApp Image 2026-08-18 at 16.23.53.jpeg': 'lunch-white-sauce-vegetables-rice',
  'WhatsApp Image 2026-08-18 at 16.24.11.jpeg': 'breakfast-millet-roti-chutney',
  'WhatsApp Image 2026-08-18 at 16.24.35.jpeg': 'salad-sprouted-mung-chopped',
  'WhatsApp Image 2026-08-18 at 16.24.59.jpeg': 'veg-beans-carrot-tomato-toast',
  'WhatsApp Image 2026-08-18 at 16.25.15.jpeg': 'veg-mixed-vegetable-stir-fry',
};

const source = resolve(process.argv[2] ?? `${process.env.HOME}/Downloads/Food_Images`);
const target = resolve(import.meta.dirname, '../src/assets/photos');

if (!existsSync(source)) {
  console.error(`No such folder: ${source}`);
  process.exit(1);
}
mkdirSync(target, { recursive: true });

const present = new Set(readdirSync(source));
let copied = 0;
const missing = [];

for (const [original, name] of Object.entries(mapping)) {
  if (!present.has(original)) {
    missing.push(original);
    continue;
  }
  copyFileSync(join(source, original), join(target, `${name}.jpg`));
  copied += 1;
}

console.log(`Copied ${copied} of ${Object.keys(mapping).length} photographs into src/assets/photos/`);
if (missing.length) {
  console.warn(`\nNot found in ${source}:`);
  for (const name of missing) console.warn(`  ${name}`);
}
