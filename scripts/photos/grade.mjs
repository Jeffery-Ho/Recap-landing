// Builds the website's photo set from the single library in photos/: every original in photos/originals/ gets the
// shared grade from photos/manifest.json (low saturation, warm, lifted blacks) and lands in src/assets/photos/<id>.jpg.
// The same graded files are what scripts/photos/load-simulator.mjs puts into the app's demo library, so the website,
// screenshots and screen recordings all show one set. Run after adding or replacing a photo: node scripts/photos/grade.mjs
import { mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import sharp from 'sharp';

const manifest = JSON.parse(readFileSync('photos/manifest.json', 'utf8'));
const { saturation, brightness, recomb, linear } = manifest.grade;
const out = 'src/assets/photos';
mkdirSync(out, { recursive: true });
const ids = new Set(manifest.photos.map((photo) => photo.id));
for (const file of readdirSync(out)) if (!ids.has(file.replace(/\.jpg$/, ''))) rmSync(`${out}/${file}`);
for (const { id } of manifest.photos) {
  await sharp(`photos/originals/${id}.jpg`)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .modulate({ saturation, brightness })
    .recomb(recomb)
    .linear(...linear)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${out}/${id}.jpg`);
}
console.log(`Graded ${ids.size} photos into ${out}/`);
