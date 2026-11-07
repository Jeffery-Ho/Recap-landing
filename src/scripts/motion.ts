// Page motion, following polaris-ai.work/v2: plain CSS driven by data attributes and classes.
// Without JavaScript every section and scene renders its final frame.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;

/** Restarts a scene from its first frame. */
function playScene(scene: HTMLElement) {
  scene.classList.add('is-reset');
  scene.classList.remove('is-playing');
  void scene.offsetWidth;
  scene.classList.remove('is-reset');
  scene.classList.add('is-playing');
  typeInto(scene);
}

function typeInto(scene: HTMLElement) {
  for (const target of scene.querySelectorAll<HTMLElement>('[data-type]')) {
    const text = target.dataset.type ?? '';
    window.clearInterval(Number(target.dataset.timer));
    if (reduceMotion.matches) { target.textContent = text; continue; }
    const characters = Array.from(text);
    let shown = 0;
    target.textContent = '';
    const start = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        shown += 1;
        target.textContent = characters.slice(0, shown).join('');
        if (shown >= characters.length) window.clearInterval(timer);
      }, Math.max(40, 1300 / characters.length));
      target.dataset.timer = String(timer);
    }, 350);
    target.dataset.timer = String(start);
  }
}

// The header CTA appears once the hero is behind us.
const hero = document.querySelector('[data-hero]');
if (hero) {
  new IntersectionObserver(([entry]) => {
    root.dataset.pastHero = String(!entry.isIntersecting && entry.boundingClientRect.top < 0);
  }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
}
// Blocks fade in once as they enter the viewport.
const enterObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    (entry.target as HTMLElement).dataset.enter = 'entered';
    enterObserver.unobserve(entry.target);
  }
}, { rootMargin: '0px 0px -12% 0px' });
for (const block of document.querySelectorAll<HTMLElement>('[data-enter]')) {
  block.dataset.enter = 'pending';
  enterObserver.observe(block);
}

// Stand-alone scenes play each time they come back into view.
const sceneObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const scene = entry.target as HTMLElement;
    if (entry.isIntersecting && !scene.classList.contains('is-playing')) playScene(scene);
    if (!entry.isIntersecting) scene.classList.remove('is-playing');
  }
}, { threshold: .35 });
for (const scene of document.querySelectorAll<HTMLElement>('[data-scene]:not([data-owned])')) sceneObserver.observe(scene);

// Feature strips, after savee.com: while a strip is on screen its pill types the next state every 3.5 s
// and the photos below swap, slot by slot. Reduced motion keeps the first state.
for (const strip of document.querySelectorAll<HTMLElement>('[data-strip]')) {
  if (reduceMotion.matches) break;
  const states = JSON.parse(strip.dataset.states ?? '[]') as string[];
  const text = strip.querySelector<HTMLElement>('[data-strip-text]');
  const photos = [...strip.querySelectorAll<HTMLElement>('[data-s]')];
  if (states.length < 2 || !text) continue;
  let current = 0;
  let cycle = 0;
  let typing = 0;
  const show = (next: number) => {
    current = next;
    photos.forEach((photo) => photo.classList.toggle('is-current', photo.dataset.s === String(next)));
    const characters = Array.from(states[next]);
    let shown = 0;
    window.clearInterval(typing);
    text.textContent = '';
    typing = window.setInterval(() => {
      shown += 1;
      text.textContent = characters.slice(0, shown).join('');
      if (shown >= characters.length) window.clearInterval(typing);
    }, 40);
  };
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !cycle) cycle = window.setInterval(() => show((current + 1) % states.length), 3500);
    if (!entry.isIntersecting) { window.clearInterval(cycle); cycle = 0; }
  }, { threshold: 0.35 }).observe(strip);
}

// Onboarding recordings play only while on screen, and not at all under reduced motion (the poster stays).
const videoObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const video = entry.target as HTMLVideoElement;
    if (entry.isIntersecting && !reduceMotion.matches) video.play().catch(() => {});
    else video.pause();
  }
}, { threshold: 0.4 });
document.querySelectorAll<HTMLVideoElement>('[data-loop-video]').forEach((video) => videoObserver.observe(video));

// Hero photo wall: the columns loop on their own while on screen, and one week at a time lights up (every 3 s):
// its photos get a ring and its card pops up over the wall.
const wall = document.querySelector<HTMLElement>('[data-wall]');
if (wall) {
  const tiles = [...wall.querySelectorAll<HTMLElement>('[data-week]')];
  const pops = [...document.querySelectorAll<HTMLElement>('[data-pop]')];
  const weeks = new Set(tiles.map((tile) => tile.dataset.week)).size;
  let week = 0;
  let timer = 0;
  const show = (next: number) => {
    week = next;
    tiles.forEach((tile) => tile.classList.toggle('is-active', tile.dataset.week === String(week)));
    pops.forEach((pop) => pop.classList.toggle('is-on', pop.dataset.pop === String(week)));
  };
  wall.classList.add('has-week');
  new IntersectionObserver(([entry]) => {
    wall.classList.toggle('is-playing', entry.isIntersecting);
    if (entry.isIntersecting && !timer && !reduceMotion.matches) timer = window.setInterval(() => show((week + 1) % weeks), 3000);
    if (!entry.isIntersecting) { window.clearInterval(timer); timer = 0; }
  }).observe(wall);
}

// Hero photo chips cycle through a few photos, like Polaris's rotating platform icons.
if (!reduceMotion.matches) {
  const chips = [...document.querySelectorAll<HTMLElement>('[data-chip]')];
  let tick = 0;
  if (chips.length) window.setInterval(() => {
    tick += 1;
    chips.forEach((chip, c) => {
      const photos = [...chip.querySelectorAll('img')];
      const current = (tick + c) % photos.length;
      photos.forEach((photo, i) => photo.classList.toggle('is-current', i === current));
    });
  }, 2400);
}

// Keep the selected section when switching languages.
for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-language-switch]')) {
  link.addEventListener('click', () => { link.hash = window.location.hash; });
}
