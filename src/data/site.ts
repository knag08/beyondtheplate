/**
 * Single source of truth for site-wide facts.
 *
 * This is the file to edit for contact details, the booking link and the
 * navigation menu. Nothing else needs touching.
 */

export const site = {
  name: 'Beyond the Plate',
  tagline: 'Whole-child nutrition & health coaching',
  description:
    'Whole-child nutrition and health coaching for school-age children and the families who care for them. Dr. Indu Tana — board-certified health and life coach, with nearly 30 years as a dietitian in a super-specialty hospital.',
  url: 'https://beyondtheplate.us',
} as const;

export const coach = {
  name: 'Dr. Indu Tana',
  credentials: 'Board-Certified Health Coach & Life Coach',
  experience: 'Nearly 30 years of experience as a dietitian in a super-specialty hospital',
} as const;

export const contact = {
  /**
   * Fill these in and they appear automatically — in the footer, on the
   * Contact page and in the page metadata. Leave a value as an empty string
   * and every mention of it disappears instead of showing a blank.
   */
  email: 'indumathyd@gmail.com' as string,
  /** Deliberately withheld for now, to keep the practice from being swamped by calls. */
  phone: '' as string,
  /** How sessions actually happen. The practice is fully online. */
  delivery: 'Online practice — sessions by Zoom or Google Meet' as string,
} as const;

/**
 * The scheduler behind “Book a consultation”.
 *
 * Put the full Calendly (or similar) URL in `url` and every booking button on
 * the site points straight at it — header, mobile menu, footer, the home hero
 * and the call to action at the foot of every page. While it is empty the
 * buttons send visitors to the Contact page instead, so nothing is ever a dead
 * link.
 */
export const booking = {
  url: 'https://calendly.com/indumathyd/meet-dr-tana' as string,
  label: 'Book a consultation',

  /**
   * Calendly's floating badge — the pill that follows the visitor down every
   * page. Set `enabled: false` to remove it site-wide; the ordinary booking
   * buttons keep working either way.
   *
   * Note that switching this on is the one place where the site talks to a
   * third party: it loads a script from assets.calendly.com, which sees the
   * visitor's IP address and sets its own cookies. Nothing else on the site
   * does.
   */
  badge: {
    enabled: true,
    text: 'Meet Dr. Tana',
    /**
     * Pages that already put booking in front of the visitor, so the floating
     * pill would only duplicate it — and, on a phone, sit on top of it.
     */
    hideOn: ['/contact/'],
    /**
     * apricot-600, the site's own action colour. Deliberately not #ff7100:
     * white text on that orange comes out at 2.8:1, below the 4.5:1 the
     * badge's small text needs to stay readable. This tone gives 4.6:1.
     */
    color: '#b55f20',
    textColor: '#ffffff',
    branding: true,
  },
} as const;

/** Where a booking button should actually go, given the above. */
export const bookingHref = booking.url || '/contact/';
export const bookingIsExternal = Boolean(booking.url);

export const nav = [
  { label: 'Is this your child?', href: '/is-this-your-child/' },
  { label: 'The approach', href: '/approach/' },
  { label: 'How I can help', href: '/coaching/' },
  { label: 'About Dr. Tana', href: '/about/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/**
 * The four facts shown in the credentials band. Every one of these is a plain
 * restatement of Dr. Tana's background — please do not add figures here that
 * cannot be evidenced.
 */
export const credentials = [
  {
    value: '~30 years',
    label: 'In clinical nutrition',
    note: 'As a dietitian, and Head of Department, in a super-specialty hospital in India',
  },
  {
    value: 'Board-certified',
    label: 'Health & life coach',
    note: 'Coaching qualifications held alongside the clinical background',
  },
  {
    value: 'Holistic',
    label: 'Advanced training',
    note: 'Additional training in holistic medicine, brought into the coaching work',
  },
  {
    value: 'Six lenses',
    label: 'On every child',
    note: 'Nutrition, habits, lifestyle, feelings, family and life skills — looked at together',
  },
] as const;
