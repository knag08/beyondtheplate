import type { ImageMetadata } from 'astro';

/**
 * The gallery builds itself from whatever sits in src/assets/photos/.
 *
 * To add a photograph: drop the file into that folder, naming it with one of
 * the category prefixes below (`breakfast-`, `lunch-`, `snack-`, `salad-`,
 * `veg-`). Then add a line to `captions` describing what is in the picture —
 * that sentence is read aloud by screen readers and shown under the enlarged
 * photograph, so please write a real description rather than a filename.
 *
 * Photographs with no caption still appear, with a description generated from
 * the filename.
 */

export const categories = [
  { id: 'all', label: 'Everything' },
  { id: 'breakfast', label: 'Breakfasts' },
  { id: 'lunch', label: 'Lunches & dinners' },
  { id: 'snack', label: 'Snacks & lunchboxes' },
  { id: 'green', label: 'Vegetables & salads' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

/** Filename prefix → category. First match wins, so order matters. */
const rules: Array<[string, CategoryId]> = [
  ['breakfast-', 'breakfast'],
  ['lunch-', 'lunch'],
  ['snack-', 'snack'],
  ['salad-', 'green'],
  ['veg-', 'green'],
];

const captions: Record<string, string> = {
  'snack-paneer-scramble-toast':
    'Two slices of sourdough spread with hummus and piled with a paneer scramble studded with diced cucumber and red and orange peppers, beside a bowl of green herb-yogurt dip',
  'breakfast-sesame-thalipeeth-pan':
    'A sesame-crusted vegetable thalipeeth browning in a pan, flecked with coriander, carrot and chilli',
  'breakfast-paniyaram-sambar':
    'Rice-batter paniyaram broken open to show a spiced potato filling, served with sambar and coconut chutney',
  'snack-pesto-vegetable-panini':
    'A pressed pesto-and-vegetable panini cut in half and stacked, layered with peppers, cucumber and paneer',
  'lunch-grilled-tofu-rice-plate':
    'Grilled tofu and onion on shredded lettuce with steamed rice, sliced tomato and a small pot of dipping sauce',
  'breakfast-sabudana-thalipeeth':
    'A tapioca-pearl thalipeeth studded with crushed peanuts and coriander, cooking on a cast-iron pan',
  'salad-chickpea-jackfruit':
    'A chopped lettuce salad with halved cherry tomatoes under a spiced chickpea and jackfruit topping',
  'snack-idli-fry-masala': 'Idli wedges tossed in a pan with cumin, sesame, chilli powder and curry leaves',
  'snack-cucumber-toast-cutlets':
    'Three slices of toast fanned with thin cucumber rounds and cracked pepper, with crumb-coated cutlets between them',
  'snack-mango-cream-cups': 'Two crystal cups layered with fresh mango and cream',
  'veg-root-vegetable-coconut-fry':
    'A stir-fry of golden root-vegetable pieces with mustard seeds, curry leaves and shredded coconut in a steel wok',
  'lunch-grilled-bread-chickpea-curry':
    'Grilled sourdough with a bowl of chickpea and jackfruit curry, pan-fried tofu, carrot batons and steamed broccoli',
  'breakfast-idli-wedges-chutney':
    'A steel bowl of idli wedges dusted with chilli powder, with a dish of coconut chutney alongside',
  'breakfast-semiya-upma-coffee':
    'Vermicelli upma topped with shredded coconut and fine sev on a blue plate, with coconut chutney and a mug of filter coffee',
  'breakfast-semiya-upma-wok': 'Vermicelli upma being tossed in a wok with cashews, curry leaves and coconut',
  'lunch-idiyappam-coconut-curry':
    'A pan of coconut curry beside a container of freshly steamed string hoppers and a box of dark spiced stir-fry',
  'lunch-mash-roasted-vegetables-bowl':
    'A bowl of mash with roasted broccoli, carrots, green beans and brussels sprouts, cheese-topped mushroom caps and a drizzle of peanut sauce',
  'lunch-mash-stuffed-mushrooms':
    'Mash served with cheese-topped mushroom caps and roasted vegetables with sweet mini peppers under a peanut sauce',
  'breakfast-banana-leaf-rice-cake':
    'A rice cake and a spoonful of chutney podi served on a banana leaf, on a table laid with a rose and a carved lamp',
  'snack-tricolour-tea-sandwiches':
    'A platter of layered tea sandwiches cut into triangles — striped green with herb chutney, pink with beetroot and orange with carrot',
  'salad-diced-vegetable-croquettes':
    'A bowl of finely diced pepper, cucumber, apple and olive salad, with lettuce-lined croquettes and toasted buns',
  'snack-vegetable-burgers': 'Two vegetable burgers in soft buns with melted cheese and lettuce',
  'snack-beetroot-patties-mushrooms': 'Beetroot patties topped with melted cheese and sautéed mushrooms on a griddle',
  'lunch-paratha-courgette-yogurt':
    'A paratha with sautéed courgette, a spoonful of yogurt and a little red chilli pickle',
  'lunch-claypot-noodle-soup':
    'A clay pot of noodle soup in a red broth, finished with sesame seeds and sliced spring onion',
  'breakfast-lentil-idli-red-chutney':
    'Steamed savoury lentil idli flecked with curry leaves, with a spoonful of red coconut-chilli chutney',
  'lunch-toast-sambar-tofu-peppers':
    'Toast and a bowl of sambar with a dressed leaf salad and a tofu-and-pepper stir-fry',
  'breakfast-beans-greens-bake':
    'Toast spread with cream cheese, a bowl of baked beans and a crumb-topped bake of asparagus and greens',
  'lunch-cutlets-mushroom-soup':
    'A breadstick and two crumb-coated cutlets with roasted vegetables, sliced heirloom tomato and a bowl of creamy mushroom soup',
  'veg-okra-fry': 'A pan of stir-fried okra with dried red chillies',
  'veg-tofu-tomato-spring-onion': 'A dish of tofu and tomato stir-fry scattered with sliced spring onion',
  'lunch-kofta-curry-rice': 'Vegetable koftas in a rich curry beside a mound of steamed basmati rice',
  'salad-chickpea-chana-cucumber': 'A bowl of chickpeas and black chana tossed with diced cucumber and onion',
  'snack-sourdough-greens-cheese':
    'Two grilled slices of seeded sourdough with a bowl of sautéed greens under grated cheese',
  'lunch-red-curry-vegetables-rice':
    'A bowl of red curry thick with peppers, courgette, mushrooms and tofu, with steamed rice alongside',
  'veg-vegetable-stew-pan':
    'A wide pan of vegetable stew on the stove — celery, peppers, greens and paneer in a tomato broth',
  'lunch-banana-leaf-spread':
    'A banana-leaf plate set with chutney podi, rice-cake pieces in a mild curry, fresh grated coconut and a groundnut-jaggery crumble',
  'lunch-greens-mushroom-cucumber':
    'Stir-fried greens and mushrooms topped with fresh cucumber batons and black olives, with a cutlet and a millet flatbread',
  'lunch-peppers-broccoli-cutlet-toast':
    'Stir-fried peppers, broccoli, carrots and greens with fresh tomato, a spiced cutlet and a slice of seeded toast',
  'breakfast-steamed-idli-container':
    'Freshly steamed idli, flecked with chilli and curry leaf, in an insulated container',
  'breakfast-greens-olives-cheese-toast':
    'Sautéed greens, peppered tomato, olives, roasted peppers and celery with two slices of cheese toast and a mug of coffee',
  'lunch-vegetable-biryani': 'Vegetable biryani on an oval platter, scattered with cashews and fried onion',
  'lunch-noodles-tofu-buns':
    'A bowl of vegetable noodles with spiced tofu cubes, soft baked buns and a cutlet, with a bowl of leafy salad above',
  'lunch-salad-cutlets-flatbread':
    'A leaf salad with crumb-coated cutlets, sautéed green beans, carrot batons and a flatbread spread with green curry',
  'salad-asparagus-peppers-cutlets':
    'A leaf salad with cucumber and tomato beside roasted asparagus, sautéed yellow and red peppers and two crumbed cutlets',
  'lunch-tofu-stir-fry-leaves':
    'Peppered tomato slices and crumbed cutlets with a tofu-and-vegetable stir-fry and a generous pile of mixed baby leaves',
  'breakfast-dosa-chutneys':
    'Two thin crisp dosas with a spoonful of red chutney and a dish of tomato-and-carrot chutney',
  'snack-muffin-tomato-cheese-celery':
    'Toasted muffin halves topped with tomato and melted cheese, with celery sticks alongside',
  'breakfast-appam-vegetable-curry':
    'A lacy appam with a glass bowl of tomato-and-vegetable curry and two fresh curry leaves',
  'lunch-parotta-potato-curry-raita':
    'A flaky parotta with a bowl of potato curry, a bowl of cucumber raita and crisp lettuce leaves',
  'lunch-banana-leaf-rice-curry': 'Steamed rice on a banana leaf with a spiced pumpkin curry and a dark greens fry',
  'breakfast-vadai-pongal-leaf':
    'Two medu vadai and a mound of sweet pongal served on a banana leaf, with a copper tumbler alongside',
  'lunch-rice-podi-chutney-pickle':
    'Steamed rice with a crumbly spiced podi, green coriander chutney and a spoonful of brinjal pickle',
  'lunch-paneer-masala-fried-rice':
    'A bowl of paneer masala beside a large bowl of vegetable fried rice with peas, carrot, corn and broccoli',
  'breakfast-paniyaram-kootu-vadai':
    'Paniyaram with a small bowl of vegetable kootu, a vadai and a sprig of curry leaves',
  'lunch-ravioli-mushroom-sauce':
    'A pan of ravioli in a creamy mushroom sauce with cracked pepper, and a bowl of chopped lettuce and cucumber salad',
  'veg-beans-stir-fry-cabbage-rolls':
    'A pan of green bean and vegetable stir-fry with a bowl of steamed cabbage rolls',
  'lunch-white-sauce-vegetables-rice':
    'Steamed rice with cabbage, green beans, red pepper and roasted broccoli under a creamy white sauce',
  'breakfast-millet-roti-chutney':
    'Three millet rotis with a pat of butter and a spoonful of tomato chutney, with a mug of millet malt',
  'salad-sprouted-mung-chopped':
    'A large bowl of chopped salad with sprouted mung, tomato, cucumber, celery, olives and mushrooms',
  'veg-beans-carrot-tomato-toast':
    'A bowl of green bean, carrot and tomato stir-fry with three slices of buttered toast dusted with chilli',
  'veg-mixed-vegetable-stir-fry':
    'A plate of mixed vegetable stir-fry — green beans, carrots, tomato, cauliflower, peppers and mushrooms',
};

/** Photographs that lead the grid, so the gallery opens on its strongest work. */
const featured = [
  'snack-paneer-scramble-toast',
  'salad-asparagus-peppers-cutlets',
  'breakfast-dosa-chutneys',
  'salad-sprouted-mung-chopped',
  'snack-tricolour-tea-sandwiches',
  'lunch-red-curry-vegetables-rice',
  'breakfast-appam-vegetable-curry',
  'veg-mixed-vegetable-stir-fry',
];

const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png}', {
  eager: true,
});

const humanise = (name: string) =>
  name
    .replace(/^(breakfast|lunch|snack|salad|veg)-/, '')
    .replace(/-/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());

export interface GalleryPhoto {
  id: string;
  src: ImageMetadata;
  alt: string;
  category: CategoryId;
}

export const photos: GalleryPhoto[] = Object.entries(modules)
  .map(([path, mod]) => {
    const id = path.split('/').pop()!.replace(/\.\w+$/, '');
    const rule = rules.find(([prefix]) => id.startsWith(prefix));
    return {
      id,
      src: mod.default,
      alt: captions[id] ?? `${humanise(id)}, cooked at home`,
      category: rule ? rule[1] : ('green' as CategoryId),
    };
  })
  .sort((a, b) => {
    const ai = featured.indexOf(a.id);
    const bi = featured.indexOf(b.id);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    return a.id.localeCompare(b.id);
  });

export const countFor = (id: CategoryId) =>
  id === 'all' ? photos.length : photos.filter((p) => p.category === id).length;

/** Look one photograph up by name, for use as a hero or feature image. */
export const photoById = (id: string): GalleryPhoto => {
  const found = photos.find((p) => p.id === id);
  if (!found) throw new Error(`No photograph named "${id}" in src/assets/photos/`);
  return found;
};
