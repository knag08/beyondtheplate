# Still to do

Deliberate omissions, not oversights. Each one is a small, contained change —
the file and the exact line to edit is named.

## 1. The phone number

**File:** [`src/data/site.ts`](src/data/site.ts) → `contact.phone`

Held back on purpose for now, to keep the practice from being swamped by calls. Add it
and it appears on its own in two places: as a line in the footer, and as a tap-to-call
panel on the Contact page. No other file needs touching.

## 2. Full-resolution photographs

The 62 photographs in [`src/assets/photos/`](src/assets/photos/) are currently 620 px
wide — macOS blocked this machine's tooling from reading `~/Downloads`, so they were
brought in at review resolution. To swap in the originals without disturbing any filename
or caption:

```bash
node scripts/import-photos.mjs ~/Downloads/Food_Images
npm run build
```

The script maps each original WhatsApp filename to its site filename, so captions,
categories and the hero images all stay exactly where they are.

## 3. Switch the Pages source to GitHub Actions

**Where:** repository **Settings → Pages → Build and deployment → Source**

It is currently **Deploy from a branch**, so GitHub runs its own *pages build and
deployment* workflow alongside ours on every push, tries to build the repository with
Jekyll, and fails — one red cross in the Actions tab per push. The live site is unaffected,
but setting the source to **GitHub Actions** stops the wasted build and removes the risk of
a stray Jekyll run overwriting the real deployment.

## 4. A privacy note

Booking now runs through Calendly, which means a request to `assets.calendly.com` on every
page, Calendly's own cookies, and a form that collects a parent's name, email and whatever
they choose to write about their child — all on Calendly's servers.

That is a normal arrangement for a coaching practice, but it is the first time the site
handles anyone's personal data, so a short plain-English privacy note is worth having: what
Calendly receives, what is done with an enquiry, and how long it is kept. It wants writing
by someone who can speak for the practice rather than being drafted here, and it would sit
naturally as a `/privacy/` page linked from the footer.

## 5. Worth considering later

- **A testimonials section.** Nothing on the site currently quotes a parent, because no
  real quotes were available and inventing them was not an option. There is a natural home
  for two or three on the home page, between *How I can help* and the credentials band.
- **Programme structure and pricing.** The site describes what the coaching covers but not
  how it is packaged — session length, number of sessions, cost. Parents usually look for
  this before booking.
- **A short video introduction.** Three video files were mentioned during the build but
  were not on disk, so nothing was wired up for them.
