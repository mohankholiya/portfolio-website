import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Inline the bundled CSS into each page's <head> so the stylesheet is not a
  // render-blocking request. Astro only auto-inlines sheets < 4KB; ours is ~36KB
  // (~8KB gzipped), and this brochure site's pages each ship one small sheet, so
  // inlining improves FCP/LCP without a meaningful HTML-size penalty.
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
