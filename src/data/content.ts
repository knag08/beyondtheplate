/**
 * The words of the site, kept out of the markup so they can be edited without
 * touching layout — and so the same list can appear on more than one page
 * without ever falling out of step with itself.
 */

/** The “Is this your child?” checklist. */
export const childSigns = [
  'Says “I don’t like it!” before even taking a bite',
  'Eats only a few favourite foods and refuses to try anything new',
  'Resists vegetables, fruits or other nutrient-dense foods',
  'Asks for snacks, sweets or processed foods instead of the meal you have prepared',
  'Turns mealtimes into arguments, negotiations, pleading or frustration',
  'Seems to have very limited food variety',
  'Makes you worry about whether they are getting the nutrients they need',
  'Barely touches the nutritious meal you have spent time preparing',
  'Has irregular eating, sleeping, screen or daily routines',
  'Experiences stress, anxiety or negative emotions around food and mealtimes',
  'Leaves you wondering, “Am I doing something wrong?”',
] as const;

/** The six lenses of the whole-child approach. */
export const pillars = [
  {
    number: '01',
    icon: 'nutrition' as const,
    title: 'Nutrition',
    question: 'What is your child eating?',
    text: 'We look at the quality, variety and nutrient density of the foods your child is eating, and explore practical ways to nourish their growing body.',
  },
  {
    number: '02',
    icon: 'habits' as const,
    title: 'Eating habits',
    question: 'How and when is your child eating?',
    text: 'We explore mealtime patterns, routines, hunger and fullness cues, food preferences, and the child’s relationship with eating.',
  },
  {
    number: '03',
    icon: 'lifestyle' as const,
    title: 'Lifestyle',
    question: 'How is your child living?',
    text: 'Sleep, movement, hydration, screen habits, daily routines and activity all play an important role in a child’s health, energy and well-being.',
  },
  {
    number: '04',
    icon: 'feelings' as const,
    title: 'Emotional well-being',
    question: 'How does your child experience food and mealtimes?',
    text: 'Food should not become a source of anxiety, pressure, conflict or guilt. We encourage a positive and healthy relationship with food and mealtimes.',
  },
  {
    number: '05',
    icon: 'family' as const,
    title: 'Family environment',
    question: 'What habits are being modelled at home?',
    text: 'Children learn by watching. Family eating patterns, attitudes toward food, mealtime routines and everyday lifestyle choices can influence the habits children develop.',
  },
  {
    number: '06',
    icon: 'skills' as const,
    title: 'Life skills',
    question: 'What is your child learning for the future?',
    text: 'Beyond what children eat today, we want to help them develop skills and confidence that can serve them as they grow — making informed choices, listening to their bodies, understanding nourishment, and taking an active role in their own well-being.',
  },
] as const;

/** The six ways the coaching helps. */
export const helpAreas = [
  {
    icon: 'plate' as const,
    title: 'Plan the plate',
    text: 'Create balanced, nutrient-dense meals tailored to your child’s individual needs.',
  },
  {
    icon: 'menu' as const,
    title: 'Build the menu',
    text: 'Explore simple, delicious breakfast, lunch, dinner and snack ideas that fit your family’s lifestyle.',
  },
  {
    icon: 'palate' as const,
    title: 'Expand their palate',
    text: 'Find supportive ways to introduce new foods and encourage children to enjoy a greater variety.',
  },
  {
    icon: 'mealtime' as const,
    title: 'Make mealtimes easier',
    text: 'Move away from pressure, battles and frustration toward a more positive relationship with food.',
  },
  {
    icon: 'energy' as const,
    title: 'Nourish for energy & vitality',
    text: 'Focus on wholesome foods and sustainable dietary habits that support your child’s growth, well-being and energy for years to come.',
  },
  {
    icon: 'empower' as const,
    title: 'Empower the family',
    text: 'Give parents the knowledge, confidence and practical tools to make healthy choices part of everyday family life.',
  },
] as const;

/** What a personalised programme may cover. */
export const workTogether = [
  'Healthy meal planning',
  'Kid-friendly menu ideas',
  'Balanced breakfasts, lunches, dinners and snacks',
  'Nutrient-dense food choices',
  'Picky eating and food variety',
  'Healthy eating routines',
  'Positive mealtime experiences',
  'Sleep and daily routines',
  'Movement and physical activity',
  'Hydration',
  'Screen habits',
  'Family lifestyle patterns',
  'Building independence and food-related life skills',
  'Sustainable healthy habits for the future',
] as const;

/** The three promises repeated across the site. */
export const promises = ['No extreme diets.', 'No rigid rules.', 'No guilt.'] as const;

/**
 * The opening promise, used in the home page hero.
 *
 * `headline` is split in three so "health coach" can be picked out in the
 * accent colour — the words were sent in capitals for emphasis, and colour
 * carries that better than shouting does at headline size.
 */
export const opening = {
  headline: {
    before: 'Partner with a dedicated ',
    emphasis: 'health coach',
    after: ' to build a healthier future for your family from the comfort of your home!',
  },
  support:
    'Discover expert online nutritional coaching designed to foster a positive relationship with food, positive routines and total well-being of your child.',
} as const;

/** Vision and mission, shown together directly below the hero. */
export const visionMission = [
  {
    label: 'My vision',
    statement:
      'Empowering parents; empowering children — nourishing their childhood today, building their health for a lifetime.',
    body: [
      'Let’s create a home where your children truly thrive — no more mealtime battles, no food rules.',
      'Expert, stress-free online food advice, tailored to your busy family.',
    ],
  },
  {
    label: 'My mission',
    statement:
      'To help children develop healthy eating habits, positive routines, essential life skills and a healthy relationship with food — all while empowering families to create an environment where children can thrive.',
    body: [
      'Welcome your family health coach right into your kitchen. Get personalised online guidance to transform picky eating into peaceful family meals.',
      'You aren’t just serving dinner — you are writing your child’s health picture. Let’s make it a masterpiece!',
    ],
  },
] as const;

/** The core philosophy, on the About page. */
export const philosophy = [
  'My core philosophy is rooted in stress-free family meals and intuitive eating. I believe that when you remove the pressure, anxiety and rigid rules from the dinner table, children naturally become adventurous eaters.',
  'Nutrition should never feel like a chore or a battle. Instead it is about empowering parents to create a supportive environment where children can learn and explore new textures at their own pace, and build a joyful lifelong relationship with food.',
] as const;

/** An invitation to reply, introducing the list of things a programme may cover. */
export const resonates =
  'Now that you know my approach — I would love to hear about yours: which of these elements resonates?';

/** The closing lines, at the foot of the About page. */
export const closing = {
  question: 'Ready to transform your family table?',
  action: 'Book your free 20-minute discovery call today.',
} as const;
