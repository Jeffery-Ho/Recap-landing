import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { releaseEnvironment } from './scripts/environment.mjs';

export default defineConfig({
  site: 'https://recapmoments.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (url) => (releaseEnvironment().LEGAL_CONTENT_APPROVED ?? 'true') === 'true' || !/\/(privacy|terms)\//.test(url),
  })],
});
