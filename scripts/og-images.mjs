// Renders the 1200×630 share images (public/og-home.jpg, public/og-home-zh.jpg): the app icon beside the App Store
// name and subtitle. Run after changing `aso` in src/data/site.ts: `node scripts/og-images.mjs`. Uses the system
// fonts of macOS (New York / Georgia, PingFang SC) through sharp's SVG renderer.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

// Keep in step with `aso` in src/data/site.ts.
const name = { brand: 'Recap', product: { en: 'Photo Organizer', zh: '相册整理' } };
const subtitle = { en: 'Organize, Explore, Share', zh: '整理 · 浏览 · 分享' };

const width = 1200;
const height = 630;
const icon = 220;
const iconX = 80;
const iconY = (height - icon) / 2;
const textX = 360;
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

async function render(locale, file) {
  const sans = locale === 'zh' ? "'PingFang SC', 'Hiragino Sans GB', sans-serif" : "'SF Pro Display', 'Helvetica Neue', sans-serif";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#f6f5f3"/>
  <text x="${textX}" y="265" font-family="'New York', Georgia, serif" font-weight="700" font-size="84" fill="#1b1a18">${name.brand}</text>
  <text x="${textX}" y="343" font-family="${sans}" font-weight="500" font-size="44" fill="#4a4742">${escape(name.product[locale])}</text>
  <text x="${textX}" y="403" font-family="${sans}" font-weight="500" font-size="28" fill="#2f5a45">${escape(subtitle[locale])}</text>
</svg>`;
  const iconImage = await sharp(readFileSync('public/app-icon.png')).resize(icon, icon).toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: iconImage, left: iconX, top: Math.round(iconY) }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(file);
  console.log(`Wrote ${file}`);
}

await render('en', 'public/og-home.jpg');
await render('zh', 'public/og-home-zh.jpg');
