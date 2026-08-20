// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The custom domain lives in public/CNAME. If the site ever moves to a project
// page (https://<user>.github.io/beyondtheplate), add `base: '/beyondtheplate'`
// here as well as changing `site` below.
export default defineConfig({
  site: 'https://beyondtheplate.us',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
  },
});
