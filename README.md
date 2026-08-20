# Beyond the Plate — beyondtheplate.us

The website for **Beyond the Plate**: whole-child nutrition and health coaching with
Dr. Indu Tana, for school-age children and the families who care for them.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It compiles to
plain static HTML, so it is fast, cheap to host, and has no database or server to maintain.

---

## Running it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:4321. The site reloads as you edit.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local preview server |
| `npm run build` | Build the finished site into `dist/` |
| `npm run check` | Type-check every page and component |
| `npm run preview` | Serve the built site exactly as it will be published |
| `npm run icons` | Regenerate the favicons and the link-preview card from the brand mark |

---

## Publishing

Deployment is automatic. Every push to `main` runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it
to GitHub Pages. You can also redeploy by hand from the **Actions** tab → *Deploy to GitHub Pages* →
**Run workflow**.

Setup on GitHub:

1. **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**. ⚠️ At the time of
   writing it is still **Deploy from a branch**, which means GitHub *also* runs its own built-in
   *pages build and deployment* workflow on every push. That one tries to build the repository with
   Jekyll, fails (this is an Astro project, not a Jekyll one), and leaves a red cross in the Actions
   tab. The site itself is fine — the *Deploy to GitHub Pages* workflow above is what actually
   publishes — but switching the source to **GitHub Actions** stops the pointless second build, clears
   the red crosses, and removes any chance of a stray Jekyll build overwriting the real site.
2. **Custom domain** is `beyondtheplate.us`, with **Enforce HTTPS** ticked.
3. At the registrar, the domain points at GitHub Pages:
   - four `A` records for `beyondtheplate.us` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` → `knag08.github.io`

There are two `CNAME` files, and both should stay:

- [`public/CNAME`](public/CNAME) is the one that matters. Astro copies it into `dist/`, so it travels
  with every deploy; without it a deploy would wipe the custom-domain setting.
- The `CNAME` at the repository root was written by the GitHub UI when the custom domain was first
  set. It is not used by the build, but deleting it can clear the domain setting, so leave it alone.

If the site ever moves to another domain, edit `public/CNAME` *and* the `site:` value in
[`astro.config.mjs`](astro.config.mjs) (it is used for canonical URLs and the sitemap).

### Pushing

The remote deliberately carries the username — `https://knag08@github.com/knag08/beyondtheplate.git`.
Without it, the macOS keychain hands over a different account's credential and the push fails with
`403 … denied to vgyan`. The `ndsai` repository is set up the same way.

---

## Editing the site

### Contact details and the booking link

Everything site-wide lives in one file: [`src/data/site.ts`](src/data/site.ts).

- **`booking.url`** — the Calendly address, currently
  `https://calendly.com/indumathyd/meet-dr-tana`. Every *Book a consultation* button on the site points
  at it. Emptying it makes those buttons fall back to the Contact page rather than dead-ending. See
  **Booking, and the one third party** below for the rest of the setup.
- **`contact.email` / `contact.phone` / `contact.location`** — each appears automatically in the
  footer and on the Contact page once filled in. Leaving one as `''` hides every mention of it rather
  than showing a blank.
- **`nav`** — the navigation menu.
- **`credentials`** — the four facts in the background band. Every one is a plain restatement of
  Dr. Tana's professional history; please do not add figures here that cannot be evidenced.

> Should `booking.url`, `contact.email` and `contact.phone` ever all be empty at once, the Contact page
> falls back to a panel reading *“Booking opens shortly”* rather than showing an empty column.

See [`TODO.md`](TODO.md) for what is deliberately still missing — the phone number and the
full-resolution photographs — and the exact line to change for each.

### The words on the page

The lists that repeat across pages — the “Is this your child?” checklist, the six lenses of the
approach, the six ways the coaching helps, and what a programme may cover — all live in
[`src/data/content.ts`](src/data/content.ts). Editing them there updates every page that shows them.

The rest of the prose is in the `.astro` files in [`src/pages/`](src/pages/). Each is HTML with a small
block of settings at the top; editing the words between the tags is safe, as the layout comes from the
shared components in [`src/components/`](src/components/).

### Photographs

Photographs live in [`src/assets/photos/`](src/assets/photos/). The gallery builds itself from whatever
is in that folder — drop a file in and it appears.

Name it with one of these prefixes so it lands in the right filter:

| Prefix | Filter it appears under |
| --- | --- |
| `breakfast-` | Breakfasts |
| `lunch-` | Lunches & dinners |
| `snack-` | Snacks & lunchboxes |
| `salad-`, `veg-` | Vegetables & salads |

Then add a line to the `captions` list in [`src/data/photos.ts`](src/data/photos.ts) describing what is
in the picture. That description is read aloud by screen readers and shown beneath the enlarged
photograph, so please write a real sentence rather than a filename.

Photographs are automatically resized, converted to WebP and served at the right size for each device,
so a large file straight from a phone or camera is fine.

To re-import a batch of photographs from a folder of WhatsApp exports, keeping the site filenames (and
therefore the captions) stable:

```bash
node scripts/import-photos.mjs ~/Downloads/Food_Images
```

### Booking, and the one third party

The scheduler is Calendly, and the whole integration is driven from `booking` in
[`src/data/site.ts`](src/data/site.ts). It works on three levels:

1. **`booking.url`** — every booking link on the site points here: the header button, the mobile menu,
   the footer, the home hero and the call to action at the foot of every page. These are ordinary
   links, so they work with JavaScript disabled and with nothing loaded from Calendly at all.
2. **The popup.** [`src/components/Calendly.astro`](src/components/Calendly.astro) loads Calendly's
   widget after the page has finished rendering, then upgrades those same links to open the calendar in
   an overlay rather than navigating away. This is an enhancement only — the `href` is left in place,
   so a click that lands before the script has loaded still reaches the booking page the ordinary way,
   and ⌘- or ctrl-clicking still opens a new tab.
3. **The floating badge** — the pill that follows the visitor down the page. Set
   `booking.badge.enabled: false` to remove it site-wide; the buttons carry on working. It is
   deliberately suppressed on the Contact page, listed in `booking.badge.hideOn`, because that page
   already leads with a booking card and on a phone the badge landed directly on top of it.

The badge colour is `#b55f20`, the site's own action colour, rather than Calendly's suggested
`#ff7100`: white text on that brighter orange measures 2.8:1, short of the 4.5:1 that the badge's 14px
text needs to stay legible. The current tone measures 4.6:1.

> **This is the only place the site talks to a third party.** Loading the widget means a request to
> `assets.calendly.com`, which sees the visitor's IP address and sets Calendly's cookies, and the
> booking form itself collects a parent's name, email and whatever they type about their child — on
> Calendly's servers, under Calendly's privacy policy. Everything else on the site is served from the
> site's own domain. See [`TODO.md`](TODO.md) for the privacy note this probably warrants.

### The brand mark and icons

The mark — a plate seen from above with a sprig growing out of it — is drawn in
[`src/components/Wordmark.astro`](src/components/Wordmark.astro) and again, standalone, in
[`public/favicon.svg`](public/favicon.svg). The PNG favicons and the 1200×630 link-preview card are
generated from it by [`scripts/make-icons.mjs`](scripts/make-icons.mjs); run `npm run icons` after
changing the mark or the wording on the card.

---

## Things worth knowing

- **Design tokens** — colours, fonts and the shared shapes are at the top of
  [`src/styles/global.css`](src/styles/global.css). The palette comes from the food itself: deep leaf
  green for text and dark sections, warm apricot for the eyebrows and the primary action, a berry red
  used sparingly, all on a cream ground the colour of a plate. The site's two structural motifs are a
  circle (`.plate`) and a leaf (`.leafy`).
- **Fonts** are bundled with the site — Newsreader for headings, Nunito for text. Nothing is loaded
  from Google, so the site works behind restrictive networks.
- **Accessibility** — every photograph carries a description, the site works with the keyboard alone,
  colour contrast meets WCAG AA, and the reveal animation switches itself off for anyone who has asked
  their device to reduce motion.
- **No tracking.** There is no analytics and no advertising pixel anywhere on the site. Calendly is the
  single third party involved — see below.
- **The medical disclaimer** in the footer states that coaching is educational and not medical care.
  Please keep it, and have it reviewed if the scope of the practice changes.
