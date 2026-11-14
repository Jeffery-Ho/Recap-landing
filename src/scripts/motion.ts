// Page motion, following polaris-ai.work/v2: plain CSS driven by data attributes and classes.
// Without JavaScript every section renders its final frame.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Header theme switch, after Polaris: a two-option pill (dark, light). The inline script in Base.astro set data-theme
// before paint; picking an option applies and saves it.
const themeOptions = [...document.querySelectorAll<HTMLButtonElement>('[data-theme-option]')];
if (themeOptions.length) {
  const root = document.documentElement;
  const sync = () => themeOptions.forEach((option) => option.setAttribute('aria-pressed', String(option.dataset.themeOption === root.dataset.theme)));
  sync();
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  themeOptions.forEach((option) => option.addEventListener('click', () => {
    (window as unknown as { recapSetTheme: (theme: string) => void }).recapSetTheme(option.dataset.themeOption ?? 'light');
  }));
}
const root = document.documentElement;

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

// Feature gallery, after Polaris v2: the current slide's dot fills over 8 s, then the next slide scrolls in. Clicking a
// dot or a faded slide, swiping, or the arrow keys pick a slide and restart the bar. The bar pauses while the gallery
// is off screen, hovered or focused, or the tab is hidden; under reduced motion nothing advances on its own.
for (const gallery of document.querySelectorAll<HTMLElement>('[data-feature-gallery]')) {
  const track = gallery.querySelector<HTMLElement>('[data-feature-track]');
  const slides = [...gallery.querySelectorAll<HTMLElement>('[data-feature-slide]')];
  const dots = [...gallery.querySelectorAll<HTMLElement>('[data-feature-dot]')];
  if (!track || slides.length < 2) continue;
  let current = 0;
  let onScreen = false;
  let held = false;
  let settle = 0;

  const updatePlaying = () => {
    gallery.dataset.playing = String(onScreen && !held && !document.hidden && !reduceMotion.matches);
  };
  const restartBar = () => {
    dots.forEach((dot) => dot.classList.remove('is-running'));
    if (reduceMotion.matches) return;
    const dot = dots[current];
    void dot.offsetWidth; // restart the fill animation
    dot.classList.add('is-running');
  };
  const mark = (index: number) => {
    current = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-current', i === index);
      if (i === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    restartBar();
  };
  const go = (index: number) => {
    const slide = slides[(index + slides.length) % slides.length];
    mark(slides.indexOf(slide));
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => go(i));
    dot.querySelector('.feature-dot-fill')?.addEventListener('animationend', () => go(current + 1));
  });
  slides.forEach((slide, i) => slide.addEventListener('click', () => { if (i !== current) go(i); }));
  track.addEventListener('keydown', (event) => {
    if ((event.target as HTMLElement).closest('input, textarea, [role="radiogroup"]')) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); go(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(current - 1); }
  });
  // After a swipe or trackpad scroll settles, the slide nearest the centre becomes current.
  track.addEventListener('scroll', () => {
    window.clearTimeout(settle);
    settle = window.setTimeout(() => {
      const centre = track.scrollLeft + track.clientWidth / 2;
      const distance = (slide: HTMLElement) => Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre);
      const nearest = slides.reduce((best, slide, i) => (distance(slide) < distance(slides[best]) ? i : best), 0);
      if (nearest !== current) mark(nearest);
    }, 120);
  }, { passive: true });

  const hold = (value: boolean) => { held = value; updatePlaying(); };
  gallery.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') hold(true); });
  gallery.addEventListener('pointerleave', () => hold(false));
  gallery.addEventListener('focusin', (event) => { if ((event.target as HTMLElement).matches(':focus-visible')) hold(true); });
  gallery.addEventListener('focusout', (event) => { if (!gallery.contains(event.relatedTarget as Node)) hold(false); });
  document.addEventListener('visibilitychange', updatePlaying);
  new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; updatePlaying(); }, { threshold: 0.4 }).observe(gallery);
  mark(0);
  updatePlaying();
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

// Hero photo cards, after placify.app: cards zoom in one by one, then take turns (one every 1.1 s, in a scattered
// order) swapping photos without blinking: the card zooms out slightly, the next photo cross-fades in, and the card
// zooms back in. Paused while the hero is off screen.
const cardLayer = document.querySelector<HTMLElement>('[data-hero-cards]');
if (cardLayer && !reduceMotion.matches) {
  const cards = [...cardLayer.querySelectorAll<HTMLElement>('[data-hero-card]')];
  const order = [0, 5, 3, 6, 1, 7, 4, 2].filter((i) => i < cards.length);
  cards.forEach((card) => card.classList.remove('is-on'));
  cards.forEach((card, i) => window.setTimeout(() => card.classList.add('is-on'), 300 + i * 120));
  let step = 0;
  let timer = 0;
  const swap = () => {
    const visible = order.map((i) => cards[i]).filter((card) => card.offsetParent !== null);
    if (!visible.length) return;
    const card = visible[step++ % visible.length];
    card.classList.add('is-swapping');
    window.setTimeout(() => {
      // Next photo in this card's order that no other card is showing, so the same photo never appears twice at once.
      const shown = new Set(cards.filter((other) => other !== card)
        .map((other) => other.querySelector<HTMLElement>('img.is-current')?.dataset.photo));
      const images = [...card.querySelectorAll<HTMLElement>('img')];
      const current = images.findIndex((image) => image.classList.contains('is-current'));
      const next = images.map((_, k) => (current + 1 + k) % images.length).find((k) => !shown.has(images[k].dataset.photo)) ?? current;
      images.forEach((image, k) => image.classList.toggle('is-current', k === next));
      card.classList.remove('is-swapping');
    }, 420);
  };
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) timer = window.setInterval(swap, 1100);
    if (!entry.isIntersecting) { window.clearInterval(timer); timer = 0; }
  }).observe(cardLayer);
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

// The footer language menu closes on an outside click or Escape.
const languageControl = document.querySelector<HTMLDetailsElement>('.language-control');
if (languageControl) {
  document.addEventListener('click', (event) => {
    if (languageControl.open && !languageControl.contains(event.target as Node)) languageControl.open = false;
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') languageControl.open = false; });
}
