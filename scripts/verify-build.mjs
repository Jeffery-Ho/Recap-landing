import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';

const root = 'dist';
const origin = 'https://www.recapmoments.app';
const routes = ['/', '/zh/', '/privacy/', '/zh/privacy/', '/terms/', '/zh/terms/', '/credits/', '/zh/credits/', '/changelog/', '/zh/changelog/', '/contact/', '/zh/contact/'];
const distFile = (urlPath) => join(root, String(urlPath).replace(/^\//, ''));
const pathFor = (url) => distFile(`${url}index.html`);
const documents = new Map();
const all = (node) => [node, ...(node.childNodes ?? []).flatMap(all)];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const mentionsRetiredV2 = (value) => /(?:^|\/\/|https?:\/\/[^/]+)?\/v2(?:\/|$|\?|#)/.test(value ?? '');
const mentionsApexHost = (value) => /https:\/\/recapmoments\.app(?![\w.-])/.test(value ?? '');
const jsonLd = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

for (const route of routes) {
  assert(existsSync(pathFor(route)), `Missing route: ${route}`);
  const html = readFileSync(pathFor(route), 'utf8');
  const nodes = all(parse(html));
  documents.set(route, nodes);
  assert.equal(attr(nodes.find((node) => node.tagName === 'html'), 'lang'), route.startsWith('/zh/') ? 'zh-CN' : 'en');
  assert.equal(nodes.filter((node) => node.tagName === 'h1').length, 1, `${route}: exactly one h1`);
  const canonical = attr(nodes.find((node) => attr(node, 'rel') === 'canonical'), 'href');
  assert.equal(canonical, `${origin}${route}`, `${route}: canonical`);
  assert(!mentionsRetiredV2(canonical), `${route}: canonical must not use /v2/`);
  assert(!mentionsApexHost(canonical), `${route}: canonical must use www`);
  for (const language of ['en', 'zh-CN', 'x-default']) {
    const alternate = nodes.find((node) => attr(node, 'hreflang') === language && attr(node, 'rel') === 'alternate');
    assert(alternate, `${route}: ${language} alternate`);
    assert(!mentionsRetiredV2(attr(alternate, 'href')), `${route}: ${language} hreflang must not use /v2/`);
    assert(!mentionsApexHost(attr(alternate, 'href')), `${route}: ${language} hreflang must use www`);
  }
  const ogUrl = attr(nodes.find((node) => attr(node, 'property') === 'og:url'), 'href') ?? attr(nodes.find((node) => attr(node, 'property') === 'og:url'), 'content');
  assert.equal(ogUrl, canonical, `${route}: og:url`);
  assert.equal(attr(nodes.find((node) => attr(node, 'property') === 'og:image:width'), 'content'), '1200', `${route}: og:image:width`);
  assert.equal(attr(nodes.find((node) => attr(node, 'property') === 'og:image:height'), 'content'), '630', `${route}: og:image:height`);
  assert(attr(nodes.find((node) => attr(node, 'property') === 'og:image:alt'), 'content'), `${route}: og:image:alt`);
  assert.equal(attr(nodes.find((node) => attr(node, 'name') === 'twitter:card'), 'content'), 'summary_large_image', `${route}: twitter:card`);
  assert(attr(nodes.find((node) => attr(node, 'name') === 'twitter:image:alt'), 'content'), `${route}: twitter:image:alt`);
  const image = attr(nodes.find((node) => attr(node, 'property') === 'og:image'), 'content');
  assert(image?.startsWith(`${origin}/og-home`), `${route}: locale share image`);
  assert(!nodes.some((node) => attr(node, 'name') === 'robots' && /noindex/.test(attr(node, 'content') ?? '')), `${route}: root canonical pages must be indexable`);
  const graph = jsonLd(html)['@graph'];
  assert(graph.some((node) => [].concat(node['@type']).includes('Organization')), `${route}: Organization`);
  assert(graph.some((node) => node['@type'] === 'WebSite'), `${route}: WebSite`);
  assert(graph.some((node) => node['@type'] === 'WebPage' && node.url === canonical), `${route}: WebPage`);
  assert.ok(!graph.some((node) => node.aggregateRating), `${route}: no unearned aggregateRating`);
  assert.ok(!graph.some((node) => [].concat(node['@type']).includes('VideoObject')), `${route}: no VideoObject for decorative demos`);
  assert(!mentionsApexHost(html), `${route}: HTML must not advertise the apex host`);

  const ids = nodes.map((node) => attr(node, 'id')).filter(Boolean);
  assert.equal(ids.length, new Set(ids).size, `${route}: duplicate IDs`);
  for (const image of nodes.filter((node) => node.tagName === 'img')) {
    assert.notEqual(attr(image, 'alt'), undefined, `${route}: image alt`);
    assert(Number(attr(image, 'width')) > 0 && Number(attr(image, 'height')) > 0, `${route}: image dimensions`);
    assert(!mentionsRetiredV2(attr(image, 'src')), `${route}: image ${attr(image, 'src')} must not use /v2/`);
    assert(existsSync(distFile(attr(image, 'src'))), `${route}: missing image ${attr(image, 'src')}`);
  }
}

let checkedLinks = 0;
for (const [route, nodes] of documents) {
  for (const anchor of nodes.filter((node) => node.tagName === 'a')) {
    const href = attr(anchor, 'href');
    assert(href && href !== '#', `${route}: empty link`);
    assert(!mentionsRetiredV2(href), `${route}: internal link ${href} must not use /v2/`);
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, `${origin}${route}`);
    assert(documents.has(url.pathname), `${route}: missing linked page ${url.pathname}`);
    if (url.hash) assert(documents.get(url.pathname).some((node) => attr(node, 'id') === decodeURIComponent(url.hash.slice(1))), `${route}: missing anchor ${href}`);
    checkedLinks++;
  }
}

const englishCtas = documents.get('/').filter((node) => attr(node, 'data-beta-cta') !== undefined);
const chineseCtas = documents.get('/zh/').filter((node) => attr(node, 'data-beta-cta') !== undefined);
// Header, hero, install and closing.
assert.equal(englishCtas.length, 4);
assert.equal(chineseCtas.length, 4);
const ctas = [...englishCtas, ...chineseCtas];
assert.equal(new Set(ctas.map((node) => node.tagName === 'a' ? attr(node, 'href') : 'pending')).size, 1, 'All beta CTAs must have the same destination/state');
for (const node of ctas) {
  if (node.tagName === 'a') assert.match(attr(node, 'href'), /^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+\/?$/);
  else assert.equal(attr(node, 'role'), 'status', 'Pending invitations must not be dead buttons');
}
for (const route of ['/', '/zh/']) {
  const nodes = documents.get(route);
  for (const id of ['features', 'pricing', 'install', 'faq', 'updates', 'privacy']) assert(nodes.some((node) => attr(node, 'id') === id), `${route}: #${id} section`);
  assert.equal(nodes.filter((node) => node.tagName === 'details' && !['menu', 'language-control'].includes(attr(node, 'class'))).length, 7, `${route}: native, script-free FAQ`);
  assert(nodes.some((node) => node.tagName === 'img' && attr(node, 'fetchpriority') === 'high'), `${route}: prioritized hero image`);
  assert(nodes.some((node) => node.tagName === 'img' && attr(node, 'loading') === 'lazy'), `${route}: lazy secondary images`);
  // Every photograph appears once per page (the brand icon is exempt), like hive.ink's one-image-per-slot rule.
  const photoUses = new Map();
  // Device frames (data-frame) are not photographs and may repeat; the hero wall's loop copies and week-card thumbnails (data-loop-copy) repeat its own photos by design.
  for (const image of nodes.filter((node) => node.tagName === 'img' && attr(node, 'src').startsWith('/_astro/') && attr(node, 'data-frame') === undefined && attr(node, 'data-loop-copy') === undefined)) {
    const key = attr(image, 'src').replace(/_[^_]+$/, '');
    photoUses.set(key, (photoUses.get(key) ?? 0) + 1);
  }
  for (const [key, count] of photoUses) assert.equal(count, 1, `${route}: photo ${key} is used ${count} times`);
  for (const image of nodes.filter((node) => node.tagName === 'img' && attr(node, 'src').startsWith('/_astro/'))) {
    assert(attr(image, 'srcset') && attr(image, 'sizes'), `${route}: responsive image`);
  }
}
for (const file of ['404.html', '_redirects', '_headers', 'robots.txt', 'sitemap.xml', 'llms.txt', 'og-home.jpg', 'og-home-zh.jpg']) assert(existsSync(join(root, file)), `Missing ${file}`);
for (const [route, nodes] of documents) {
  for (const node of nodes) {
    for (const name of ['href', 'src', 'srcset', 'content', 'action']) {
      const value = attr(node, name);
      if (value) assert(!mentionsRetiredV2(value), `${route}: ${name}=${value} must not use /v2/`);
    }
  }
}
const notFound = readFileSync(join(root, '404.html'), 'utf8');
assert(!mentionsRetiredV2(notFound), '404 page must not use /v2/');
const sitemapXml = readFileSync(distFile('sitemap.xml'), 'utf8');
assert.match(sitemapXml, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
assert.match(sitemapXml, /hreflang="zh-CN"/);
assert.match(sitemapXml, /hreflang="x-default"/);
assert(!mentionsRetiredV2(sitemapXml), 'sitemap must not list /v2/ URLs');
assert(!mentionsApexHost(sitemapXml), 'sitemap must use www');
for (const route of routes) {
  assert(sitemapXml.includes(`${origin}${route}`), `sitemap missing ${route}`);
}
assert.equal(readFileSync(distFile('og-home.jpg')).readUInt16BE(0), 0xffd8, 'og-home.jpg is JPEG');
assert.equal(readFileSync(distFile('og-home-zh.jpg')).readUInt16BE(0), 0xffd8, 'og-home-zh.jpg is JPEG');

const fontPreloads = (nodes) => nodes.filter((node) => node.tagName === 'link' && attr(node, 'rel') === 'preload' && attr(node, 'as') === 'font');
const zhFont = fontPreloads(documents.get('/zh/'));
assert.equal(zhFont.length, 1, 'zh home preloads the title font');
const fontHref = attr(zhFont[0], 'href');
assert(fontHref.endsWith('.woff2'), 'title font is woff2');
assert(!mentionsRetiredV2(fontHref), 'title font must not use /v2/');
const fontFile = distFile(fontHref);
assert(existsSync(fontFile), 'preloaded title font exists');
const fontBytes = readFileSync(fontFile).length;
assert(fontBytes < 80_000, `title font is ${fontBytes} bytes; keep the subset small`);
for (const route of ['/', '/privacy/', '/zh/privacy/', '/zh/changelog/']) {
  assert.equal(fontPreloads(documents.get(route)).length, 0, `${route} must not preload the zh title font`);
}
const stylesheet = attr(documents.get('/zh/').find((node) => node.tagName === 'link' && attr(node, 'rel') === 'stylesheet'), 'href');
assert(!mentionsRetiredV2(stylesheet), 'stylesheet must not use /v2/');
const css = readFileSync(distFile(stylesheet), 'utf8');
assert(css.includes('Noto Serif SC'), 'stylesheet declares Noto Serif SC');
assert(css.includes(fontHref), 'stylesheet and preload use the same font file');
assert(/font-weight:500/.test(css), 'zh titles request weight 500');
const zhHomeHtml = readFileSync(pathFor('/zh/'), 'utf8');
assert(zhHomeHtml.includes('整理方案'), 'zh features intro has the 整理方案 badge');
assert(!readFileSync(pathFor('/'), 'utf8').includes('整理方案'), 'english home does not show the zh badge');

const robots = readFileSync(distFile('robots.txt'), 'utf8');
assert.match(robots, /Disallow: \/v2\//);
assert.match(robots, /^Sitemap: https:\/\/www\.recapmoments\.app\/sitemap\.xml$/m);
assert.doesNotMatch(robots, /Sitemap:.*\/v2/);
assert(!mentionsApexHost(robots), 'robots.txt sitemap must use www');
assert(existsSync(distFile('google30243403f461dda3.html')), 'Search Console verification file');

const llms = readFileSync(distFile('llms.txt'), 'utf8');
assert.match(llms, /^# Recap$/m);
assert.match(llms, /https:\/\/www\.recapmoments\.app\//);
assert.doesNotMatch(llms, /polaris-ai\.work|Chrome Web Store|aggregateRating/i);

const homeHtml = readFileSync(pathFor('/'), 'utf8');
const zhHome = readFileSync(pathFor('/zh/'), 'utf8');
assert.match(homeHtml, /data-nosnippet/);
const homeGraph = jsonLd(homeHtml)['@graph'];
const faq = homeGraph.find((node) => node['@type'] === 'FAQPage');
assert.ok(faq.mainEntity.length >= 6 && faq.mainEntity.length <= 10, 'FAQPage size');
for (const question of faq.mainEntity) {
  assert.ok(homeHtml.includes(question.name), question.name);
  assert.ok(homeHtml.includes(`>${question.acceptedAnswer.text}</p>`), `answer: ${question.name}`);
}
const app = homeGraph.find((node) => [].concat(node['@type']).includes('SoftwareApplication'));
assert.equal(app.isAccessibleForFree, true);
assert.ok(app.offers.some((offer) => offer.price === '0'));
assert.equal(app.operatingSystem, 'iOS 18.6 or later');
const howTo = homeGraph.find((node) => node['@type'] === 'HowTo');
assert.ok(howTo, 'homepage HowTo');
for (const step of howTo.step) assert.ok(homeHtml.includes(step.text), step.text);
const zhFaq = jsonLd(zhHome)['@graph'].find((node) => node['@type'] === 'FAQPage');
assert.equal(zhFaq.inLanguage, 'zh-CN');
assert.match(zhFaq.mainEntity[0].name, /[\u4e00-\u9fff]/);

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
assert.equal(vercel.rewrites, undefined, '/v2/ must not be rewritten as duplicate content');
const redirects = vercel.redirects ?? [];
assert(redirects.some((rule) => rule.source === '/v2' && rule.destination === '/' && rule.permanent === true), 'permanent /v2 -> /');
assert(redirects.some((rule) => rule.source === '/v2/' && rule.destination === '/' && rule.permanent === true), 'permanent /v2/ -> /');
assert(redirects.some((rule) => rule.source === '/v2/:path(.*)' && rule.destination === '/:path' && rule.permanent === true), 'permanent /v2/:path(.*) -> /:path');
assert(!redirects.some((rule) => String(rule.destination).includes('/v2')), 'v2 redirects must not loop back to /v2/');

const hostedRedirects = readFileSync(distFile('_redirects'), 'utf8');
assert.match(hostedRedirects, /^\/v2 \/ 301$/m);
assert.match(hostedRedirects, /^\/v2\/ \/ 301$/m);
assert.match(hostedRedirects, /^\/v2\/\* \/:splat 301$/m);
assert.match(hostedRedirects, /^https:\/\/recapmoments\.app\/\* https:\/\/www\.recapmoments\.app\/:splat 301$/m);
assert.doesNotMatch(hostedRedirects, /https:\/\/www\.recapmoments\.app\/\* https:\/\/recapmoments\.app/);

console.log(`Verified ${routes.length} static routes, ${checkedLinks} local links, consistent beta CTAs, SEO, responsive assets, script-free FAQ markup, the zh title font, and retired /v2/ redirects.`);
