import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';

const root = 'dist';
const routes = ['/', '/zh/', '/privacy/', '/zh/privacy/', '/terms/', '/zh/terms/', '/credits/', '/zh/credits/'];
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
assert.equal(englishCtas.length, 3);
assert.equal(chineseCtas.length, 3);
const ctas = [...englishCtas, ...chineseCtas];
assert.equal(new Set(ctas.map((node) => node.tagName === 'a' ? attr(node, 'href') : 'pending')).size, 1, 'All beta CTAs must have the same destination/state');
for (const node of ctas) {
  if (node.tagName === 'a') assert.match(attr(node, 'href'), /^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+\/?$/);
  else assert.equal(attr(node, 'role'), 'status', 'Pending invitations must not be dead buttons');
}
for (const route of ['/', '/zh/']) {
  const nodes = documents.get(route);
  assert.equal(nodes.filter((node) => node.tagName === 'details').length, 7, `${route}: native, script-free FAQ`);
  assert(nodes.some((node) => node.tagName === 'img' && attr(node, 'fetchpriority') === 'high'), `${route}: prioritized hero image`);
  assert(nodes.some((node) => node.tagName === 'img' && attr(node, 'loading') === 'lazy'), `${route}: lazy secondary images`);
  for (const image of nodes.filter((node) => node.tagName === 'img' && attr(node, 'src').startsWith('/_astro/'))) {
    assert(attr(image, 'srcset') && attr(image, 'sizes'), `${route}: responsive image`);
  }
}
for (const file of ['404.html', '_redirects', '_headers', 'robots.txt', 'sitemap-index.xml']) assert(existsSync(join(root, file)), `Missing ${file}`);
console.log(`Verified ${routes.length} static routes, ${checkedLinks} local links, consistent beta CTAs, SEO, responsive assets, and script-free FAQ markup.`);
