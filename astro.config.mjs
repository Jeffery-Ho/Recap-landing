import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { releaseEnvironment } from './scripts/environment.mjs';

// Production is always the site root. SITE_BASE remains only for local sub-path experiments.
const env = releaseEnvironment();
const base = env.SITE_BASE || '/';

export default defineConfig({
  site: 'https://recapmoments.app',
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (url) => {
      if (/\/v2(\/|$)/.test(url)) return false;
      return (releaseEnvironment().LEGAL_CONTENT_APPROVED ?? 'true') === 'true' || !/\/(privacy|terms)\//.test(url);
    },
  })],
});
