import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';

const root = 'dist';
const routes = ['/', '/zh/', '/privacy/', '/zh/privacy/', '/terms/', '/zh/terms/', '/credits/', '/zh/credits/', '/changelog/', '/zh/changelog/'];
const pathFor = (url) => join(root, url, 'index.html');
const documents = new Map();
const all = (node) => [node, ...(node.childNodes ?? []).flatMap(all)];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;

for (const route of routes) {
  assert(existsSync(pathFor(route)), `Missing route: ${route}`);
  const nodes = all(parse(readFileSync(pathFor(route), 'utf8')));
  documents.set(route, nodes);
  assert.equal(attr(nodes.find((node) => node.tagName === 'html'), 'lang'), route.startsWith('/zh/') ? 'zh-Hans' : 'en');
  assert.equal(nodes.filter((node) => node.tagName === 'h1').length, 1, `${route}: exactly one h1`);
  assert(nodes.some((node) => attr(node, 'rel') === 'canonical' && attr(node, 'href') === `https://recapmoments.app${route}`), `${route}: canonical`);
  for (const language of ['en', 'zh-Hans', 'x-default']) {
    assert(nodes.some((node) => attr(node, 'hreflang') === language && attr(node, 'rel') === 'alternate'), `${route}: ${language} alternate`);
  }
  assert(nodes.some((node) => attr(node, 'property') === 'og:image'), `${route}: social image`);
  const ids = nodes.map((node) => attr(node, 'id')).filter(Boolean);
  assert.equal(ids.length, new Set(ids).size, `${route}: duplicate IDs`);
  for (const image of nodes.filter((node) => node.tagName === 'img')) {
    assert.notEqual(attr(image, 'alt'), undefined, `${route}: image alt`);
    assert(Number(attr(image, 'width')) > 0 && Number(attr(image, 'height')) > 0, `${route}: image dimensions`);
    assert(existsSync(join(root, attr(image, 'src'))), `${route}: missing image ${attr(image, 'src')}`);
  }
}

let checkedLinks = 0;
for (const [route, nodes] of documents) {
  for (const anchor of nodes.filter((node) => node.tagName === 'a')) {
    const href = attr(anchor, 'href');
    assert(href && href !== '#', `${route}: empty link`);
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, `https://recapmoments.app${route}`);
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
for (const file of ['404.html', '_redirects', '_headers', 'robots.txt', 'sitemap-index.xml']) assert(existsSync(join(root, file)), `Missing ${file}`);

const fontPreloads = (nodes) => nodes.filter((node) => node.tagName === 'link' && attr(node, 'rel') === 'preload' && attr(node, 'as') === 'font');
const zhFont = fontPreloads(documents.get('/zh/'));
assert.equal(zhFont.length, 1, 'zh home preloads the title font');
const fontHref = attr(zhFont[0], 'href');
assert(fontHref.endsWith('.woff2'), 'title font is woff2');
const fontFile = join(root, fontHref);
assert(existsSync(fontFile), 'preloaded title font exists');
const fontBytes = readFileSync(fontFile).length;
assert(fontBytes < 80_000, `title font is ${fontBytes} bytes; keep the subset small`);
for (const route of ['/', '/privacy/', '/zh/privacy/', '/zh/changelog/']) {
  assert.equal(fontPreloads(documents.get(route)).length, 0, `${route} must not preload the zh title font`);
}
const stylesheet = attr(documents.get('/zh/').find((node) => node.tagName === 'link' && attr(node, 'rel') === 'stylesheet'), 'href');
const css = readFileSync(join(root, stylesheet), 'utf8');
assert(css.includes('Noto Serif SC'), 'stylesheet declares Noto Serif SC');
assert(css.includes(fontHref), 'stylesheet and preload use the same font file');
assert(/font-weight:500/.test(css), 'zh titles request weight 500');

console.log(`Verified ${routes.length} static routes, ${checkedLinks} local links, consistent beta CTAs, SEO, responsive assets, script-free FAQ markup, and the zh title font.`);
