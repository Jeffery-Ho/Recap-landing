import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { releaseEnvironment } from './scripts/environment.mjs';

// The v2 branch is previewed at recapmoments.app/v2/ (main's vercel.json proxies that path to the branch deployment),
// so it builds under /v2. SITE_BASE overrides this for local checks.
const env = releaseEnvironment();
const base = env.SITE_BASE ?? (env.VERCEL_GIT_COMMIT_REF === 'v2' ? '/v2' : '/');

export default defineConfig({
  site: 'https://recapmoments.app',
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (url) => (releaseEnvironment().LEGAL_CONTENT_APPROVED ?? 'true') === 'true' || !/\/(privacy|terms)\//.test(url),
  })],
});
