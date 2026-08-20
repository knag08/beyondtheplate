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

One-time setup on GitHub (already done for this repository):

1. **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**.
2. **Custom domain** is `beyondtheplate.us`, with **Enforce HTTPS** ticked.
3. At the registrar, the domain points at GitHub Pages:
   - four `A` records for `beyondtheplate.us` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` → `knag08.github.io`

[`public/CNAME`](public/CNAME) holds the custom domain and must stay in the repository — a deploy would
otherwise wipe the setting. If the site ever moves to another domain, edit that file *and* the `site:`
value in [`astro.config.mjs`](astro.config.mjs) (it is used for canonical URLs and the sitemap).

---

## Editing the site

### Contact details and the booking link

Everything site-wide lives in one file: [`src/data/site.ts`](src/data/site.ts).

- **`booking.url`** — the full Calendly (or similar) address. Fill it in and every *Book a
  consultation* button on the site points straight at it, opening in a new tab. While it is empty
  those buttons send visitors to the Contact page instead, so nothing is ever a dead link.
- **`contact.email` / `contact.phone` / `contact.location`** — each appears automatically in the
  footer and on the Contact page once filled in. Leaving one as `''` hides every mention of it rather
  than showing a blank.
- **`nav`** — the navigation menu.
- **`credentials`** — the four facts in the background band. Every one is a plain restatement of
  Dr. Tana's professional history; please do not add figures here that cannot be evidenced.

> While `booking.url`, `contact.email` and `contact.phone` are all empty, the Contact page shows a
> panel reading *“Booking opens shortly”*. Filling in any one of them replaces it.

See [`TODO.md`](TODO.md) for what is deliberately still missing — the Calendly link, the phone
number, and the full-resolution photographs — and the exact line to change for each.

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
  from Google or any other third party, so the site works behind restrictive networks and leaks no
  visitor data.
- **Accessibility** — every photograph carries a description, the site works with the keyboard alone,
  colour contrast meets WCAG AA, and the reveal animation switches itself off for anyone who has asked
  their device to reduce motion.
- **No tracking.** There is no analytics, no advertising pixel and no third-party embed anywhere on the
  site.
- **The medical disclaimer** in the footer states that coaching is educational and not medical care.
  Please keep it, and have it reviewed if the scope of the practice changes.
