// Puts the graded photo set into Recap's demo library on a simulator, so screenshots and screen recordings use the
// same photos as the website. Usage: node scripts/photos/load-simulator.mjs <simulator-udid> [zh-Hans|en]
//
// Recap's `-recap-website-photos` mode (mock branch, WebsiteScreenshotFixture) imports 68 bundled onboarding photos
// once and caches them as bundled-<name>.jpg in its demo library. This script launches the app once so that import
// exists, then overwrites each cached file with the photo photos/manifest.json assigns to that slot, clears the
// thumbnail caches and relaunches. The Recap repository is not changed. The fixture's own slot order is mirrored below.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const [udid, language = 'zh-Hans'] = process.argv.slice(2);
if (!udid) throw new Error('Usage: node scripts/photos/load-simulator.mjs <simulator-udid> [zh-Hans|en]');
const bundle = 'com.hexianji.recap';
const args = ['-recap-photo-library-provider', 'unsplash-lite', '-recap-photo-permission-status', 'authorized',
  '-recap-website-photos', '-recap-testing-pro-entitlement', '-recap.language.preference', language];

// WebsiteScreenshotFixture.swift: weekImageNames, lastYearImageNames, imagesByCategory and travelWeeks, in order.
const fixture = {
  week: ['OnboardingHistory01', 'OnboardingPaywall09', 'OnboardingHistory06', 'OnboardingCategory16', 'OnboardingWeekly01',
    'OnboardingHistory02', 'OnboardingCategory14', 'OnboardingHistory03', 'OnboardingPaywall16', 'OnboardingPaywall04',
    'OnboardingHistory09', 'OnboardingWelcome08', 'OnboardingWelcome17', 'OnboardingHistory04', 'OnboardingWeekly02',
    'OnboardingPaywall05', 'OnboardingPaywall03', 'OnboardingWelcome04'],
  lastYear: ['OnboardingPlaces01', 'OnboardingPlaces04', 'OnboardingPlaces05', 'OnboardingCategory13', 'OnboardingPaywall08',
    'OnboardingPaywall12', 'OnboardingRandom13', 'OnboardingPlaces03'],
  peoplePets: ['OnboardingCategory01', 'OnboardingCategory03', 'OnboardingCategory02', 'OnboardingGallery06', 'OnboardingGallery10', 'OnboardingGallery01', 'OnboardingGallery09'],
  plantsFlowers: ['OnboardingWelcome13', 'OnboardingGallery03', 'OnboardingCategory06', 'OnboardingCategory04', 'OnboardingPaywall07', 'OnboardingPaywall17', 'OnboardingGallery11'],
  seaAttraction: ['OnboardingGallery02', 'OnboardingRandom06', 'OnboardingGallery12', 'OnboardingRandom07', 'OnboardingWelcome09', 'OnboardingPaywall11', 'OnboardingRandom05'],
  sunsetBeach: ['OnboardingCategory07', 'OnboardingRandom10', 'OnboardingRandom11', 'OnboardingPaywall18', 'OnboardingRandom14', 'OnboardingCategory08', 'OnboardingWelcome16'],
  mountain: ['OnboardingWelcome18', 'OnboardingRandom09', 'OnboardingRandom03', 'OnboardingRandom04', 'OnboardingRandom08', 'OnboardingRandom12', 'OnboardingPaywall13'],
  partyMaster: ['OnboardingGallery05', 'OnboardingGallery07', 'OnboardingGallery04', 'OnboardingRandom02', 'OnboardingWelcome02', 'OnboardingWelcome03', 'OnboardingRandom16'],
  // travelWeeks, newest first (Kamakura, Hokkaido, Kyoto in autumn, Okinawa, Tokyo, Nagoya). Builds without them never
  // import these names; the copies are then unused.
  tripKamakura: ['OnboardingPaywall14', 'OnboardingPaywall15', 'OnboardingPlaces02', 'OnboardingPlaces06', 'OnboardingRandom01', 'OnboardingRandom15'],
  tripHokkaido: ['OnboardingWeekly03', 'OnboardingWeekly04', 'OnboardingWelcome01', 'OnboardingWelcome05', 'OnboardingWelcome06', 'OnboardingWelcome07'],
  tripKyotoAutumn: ['OnboardingWelcome10', 'OnboardingWelcome11', 'OnboardingWelcome12', 'OnboardingWelcome14', 'OnboardingWelcome15'],
  // The profile avatar in website mode (a dedicated seed, see WebsiteScreenshotFixture.avatarImageName).
  avatar: ['OnboardingLive01'],
  tripOkinawa: ['OnboardingCategory05', 'OnboardingCategory09', 'OnboardingCategory10', 'OnboardingCategory11', 'OnboardingCategory12', 'OnboardingCategory15'],
  tripTokyo: ['OnboardingCategory17', 'OnboardingCategory18', 'OnboardingCategory19', 'OnboardingCategory20', 'OnboardingGallery08', 'OnboardingHistory05'],
  tripNagoya: ['OnboardingHistory07', 'OnboardingHistory08', 'OnboardingPaywall01', 'OnboardingPaywall02', 'OnboardingPaywall06', 'OnboardingPaywall10'],
};

const simctl = (...rest) => execFileSync('xcrun', ['simctl', ...rest], { encoding: 'utf8' }).trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { app } = JSON.parse(readFileSync('photos/manifest.json', 'utf8'));
const container = simctl('get_app_container', udid, bundle, 'data');
const support = join(container, 'Library/Application Support');
const images = join(support, 'RecapStore/UnsplashMockLibrary/images');

if (!existsSync(join(images, 'bundled-OnboardingHistory01.jpg'))) {
  simctl('launch', udid, bundle, ...args);
  for (let i = 0; i < 30 && !existsSync(join(images, 'bundled-OnboardingRandom16.jpg')); i += 1) await sleep(1000);
}
try { simctl('terminate', udid, bundle); } catch {}
let count = 0;
for (const [slot, names] of Object.entries(fixture)) {
  const ids = app[slot];
  if (ids?.length !== names.length) throw new Error(`photos/manifest.json app.${slot} needs ${names.length} photos`);
  names.forEach((name, i) => { copyFileSync(`src/assets/photos/${ids[i]}.jpg`, join(images, `bundled-${name}.jpg`)); count += 1; });
}
for (const cache of ['RecapHomeIndex/GridThumbnails', 'RecapHomeIndex/ClassificationThumbnails']) rmSync(join(support, cache), { recursive: true, force: true });
rmSync(join(container, 'Library/Caches', bundle), { recursive: true, force: true });
simctl('launch', udid, bundle, ...args);
console.log(`Loaded ${count} photos into ${udid} (${language}).`);
