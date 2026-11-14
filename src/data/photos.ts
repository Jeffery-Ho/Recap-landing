import type { ImageMetadata } from 'astro';
import manifest from '../../photos/manifest.json';

// The single photo set shared by the website, screenshots and screen recordings. photos/manifest.json lists every
// photo and the slot it fills; scripts/photos/grade.mjs writes the graded copies the site imports from src/assets/photos/.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export type WebSlot = keyof typeof manifest.web;

/** One graded photo by id. */
export function photo(id: string): ImageMetadata {
  const file = files[`../assets/photos/${id}.jpg`];
  if (!file) throw new Error(`Photo ${id} is missing; run node scripts/photos/grade.mjs`);
  return file.default;
}

/** The photos the manifest assigns to a slot on the website, in order. */
export function slot(name: WebSlot): ImageMetadata[] {
  return manifest.web[name].map(photo);
}
