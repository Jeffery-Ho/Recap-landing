import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { releaseEnvironment } from './scripts/environment.mjs';

// Production is always the site root. SITE_BASE remains only for local sub-path experiments.
const env = releaseEnvironment();
const base = env.SITE_BASE || '/';
const origin = 'https://www.recapmoments.app';
const sitemapLastmod = '2026-11-23';

function recapSitemapXml() {
  return {
    name: 'recap-sitemap-xml',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const legalOk = (releaseEnvironment().LEGAL_CONTENT_APPROVED ?? 'true') === 'true';
        const pages = ['', 'privacy', 'terms', 'credits', 'changelog', 'contact']
          .filter((page) => legalOk || !['privacy', 'terms'].includes(page));
        const loc = (locale, page) => `${origin}${locale === 'zh' ? '/zh/' : '/'}${page ? `${page}/` : ''}`;
        const links = (page) => [
          `    <xhtml:link rel="alternate" hreflang="en" href="${loc('en', page)}"/>`,
          `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${loc('zh', page)}"/>`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('en', page)}"/>`,
        ].join('\n');
        const url = (locale, page) => `  <url>\n    <loc>${loc(locale, page)}</loc>\n    <lastmod>${sitemapLastmod}</lastmod>\n${links(page)}\n  </url>`;
        const body = pages.flatMap((page) => [url('en', page), url('zh', page)]).join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
        writeFileSync(fileURLToPath(new URL('sitemap.xml', dir)), xml);
      },
    },
  };
}

export default defineConfig({
  site: origin,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN',
        },
      },
      serialize(item) {
        return { ...item, lastmod: sitemapLastmod };
      },
      filter: (url) => {
        if (/\/v2(\/|$)/.test(url)) return false;
        return (releaseEnvironment().LEGAL_CONTENT_APPROVED ?? 'true') === 'true' || !/\/(privacy|terms)\//.test(url);
      },
    }),
    recapSitemapXml(),
  ],
});
