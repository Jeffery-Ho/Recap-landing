// Interactive pieces of the Sort, Browse and Stats chapters. Each is a progressive enhancement: without JavaScript the
// markup shows a finished still frame. Under reduced motion nothing animates on its own.

export {};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Runs `tick` every `ms` while `element` is on screen. */
function whileVisible(element: Element, ms: number, tick: () => void) {
  let timer = 0;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) timer = window.setInterval(tick, ms);
    if (!entry.isIntersecting) { window.clearInterval(timer); timer = 0; }
  }, { threshold: 0.35 }).observe(element);
}

// Clean up slide: the copies in a burst fold away, the best shot stays tagged, then the next set comes in.
for (const scene of document.querySelectorAll<HTMLElement>('[data-cleanup]')) {
  if (reduceMotion.matches) break;
  const sets = [...scene.querySelectorAll<HTMLElement>('[data-cleanup-set]')];
  const text = scene.querySelector<HTMLElement>('[data-cleanup-text]');
  let current = 0;
  let cleared = false;
  whileVisible(scene, 1800, () => {
    if (!cleared) { sets[current].classList.add('is-cleared'); cleared = true; return; }
    sets[current].classList.remove('is-current', 'is-cleared');
    current = (current + 1) % sets.length;
    sets[current].classList.add('is-current');
    if (text) text.textContent = sets[current].dataset.state ?? '';
    cleared = false;
  });
}

// Hero scroll zoom: progress through the pinned hero drives the copy, the cards and the Duo (CSS in global.css). The
// Duo's screen sits in the top ~66% of the hand image; it grows to fill the width and its centre settles mid-screen.
const zoomHero = document.querySelector<HTMLElement>('[data-hero]');
const zoomHand = zoomHero?.querySelector<HTMLElement>('.hero-hand');
const wide = window.matchMedia('(min-width: 861px)');
if (zoomHero && zoomHand && !reduceMotion.matches) {
  let base = { top: 0, width: 0, height: 0 };
  const measure = () => {
    zoomHero.style.setProperty('--p', '0');
    zoomHand.style.removeProperty('--duo-y');
    zoomHand.style.removeProperty('--duo-s');
    const pin = zoomHero.querySelector<HTMLElement>('[data-hero-pin]')!.getBoundingClientRect();
    const hand = zoomHand.getBoundingClientRect();
    base = { top: hand.top - pin.top, width: hand.width, height: hand.height };
  };
  const update = () => {
    if (!wide.matches) return;
    const range = zoomHero.offsetHeight - window.innerHeight;
    const raw = Math.min(Math.max(-zoomHero.getBoundingClientRect().top / Math.max(range, 1), 0), 1);
    const p = raw * raw * (3 - 2 * raw);
    const target = Math.min(1.4, (window.innerWidth * 0.96) / base.width, (window.innerHeight * 0.86) / (base.height * 0.66));
    const scale = 1 + (target - 1) * p;
    zoomHero.style.setProperty('--p', p.toFixed(4));
    zoomHand.style.setProperty('--duo-s', scale.toFixed(4));
    zoomHand.style.setProperty('--duo-y', `${((window.innerHeight / 2 - (base.top + base.height * 0.33 * target)) * p).toFixed(1)}px`);
  };
  let frame = 0;
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => { measure(); schedule(); });
  window.addEventListener('load', () => { measure(); schedule(); });
  measure();
  update();
}

// Places map: pins pop up, a ring gathers them into the city card. Plays while on screen.
for (const scene of document.querySelectorAll<HTMLElement>('[data-places-scene]')) {
  if (reduceMotion.matches) break;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !scene.classList.contains('is-playing')) { void scene.offsetWidth; scene.classList.add('is-playing'); }
    if (!entry.isIntersecting) scene.classList.remove('is-playing');
  }, { threshold: 0.4 }).observe(scene);
}

// Shuffle Mode demo: the CSS loop (turn, lay out, controls, scrolling wall, turn back) runs only while the phone is
// on screen, from its first frame each time.
for (const demo of document.querySelectorAll<HTMLElement>('[data-shuffle]')) {
  if (reduceMotion.matches) break;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !demo.classList.contains('is-playing')) {
      void demo.offsetWidth;
      demo.classList.add('is-playing');
    }
    if (!entry.isIntersecting) demo.classList.remove('is-playing');
  }, { threshold: 0.4 }).observe(demo);
}

// Live Photo card: share sheet, tap Stories, the print as an Instagram story. Plays while on screen.
for (const stage of document.querySelectorAll<HTMLElement>('[data-live-share]')) {
  if (reduceMotion.matches) break;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !stage.classList.contains('is-playing')) { void stage.offsetWidth; stage.classList.add('is-playing'); }
    if (!entry.isIntersecting) stage.classList.remove('is-playing');
  }, { threshold: 0.4 }).observe(stage);
}

// Instant print editor: paper color and flip; the caption types itself, a few lines in turn, while on screen.
for (const editor of document.querySelectorAll<HTMLElement>('[data-print]')) {
  const card = editor.querySelector<HTMLElement>('[data-print-card]');
  const caption = editor.querySelector<HTMLElement>('[data-print-caption]');
  const flip = editor.querySelector<HTMLButtonElement>('[data-print-flip]');
  const swatches = [...editor.querySelectorAll<HTMLButtonElement>('[data-print-color]')];
  if (!card || !caption || !flip) continue;
  editor.classList.add('is-ready');
  const pick = (swatch: HTMLButtonElement) => {
    swatches.forEach((other) => {
      other.setAttribute('aria-checked', String(other === swatch));
      other.tabIndex = other === swatch ? 0 : -1;
    });
    card.style.setProperty('--paper', swatch.dataset.printColor ?? '');
    card.classList.toggle('is-dark', swatch === swatches[swatches.length - 1]);
  };
  swatches.forEach((swatch, i) => {
    swatch.tabIndex = i === 0 ? 0 : -1;
    swatch.addEventListener('click', () => pick(swatch));
    swatch.addEventListener('keydown', (event) => {
      const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const back = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
      if (!forward && !back) return;
      event.preventDefault();
      const next = swatches[(i + (forward ? 1 : -1) + swatches.length) % swatches.length];
      pick(next);
      next.focus();
    });
  });
  const setFlipped = (flipped: boolean) => {
    card.classList.toggle('is-flipped', flipped);
    flip.setAttribute('aria-pressed', String(flipped));
  };
  flip.addEventListener('click', () => setFlipped(!card.classList.contains('is-flipped')));
  card.addEventListener('click', () => setFlipped(!card.classList.contains('is-flipped')));

  if (reduceMotion.matches) continue;
  const lines = JSON.parse(caption.dataset.captions ?? '[]') as string[];
  if (!lines.length) continue;
  let line = 0;
  let timer = 0;
  let running = false;
  const wait = (ms: number, next: () => void) => { timer = window.setTimeout(next, ms); };
  const type = (chars: string[], shown: number) => {
    caption.textContent = chars.slice(0, shown).join('') || '\u00a0';
    if (shown < chars.length) return wait(110, () => type(chars, shown + 1));
    wait(2600, () => erase(chars, chars.length));
  };
  const erase = (chars: string[], shown: number) => {
    caption.textContent = chars.slice(0, shown).join('') || '\u00a0';
    if (shown > 0) return wait(45, () => erase(chars, shown - 1));
    line = (line + 1) % lines.length;
    wait(400, () => type(Array.from(lines[line]), 0));
  };
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      caption.classList.add('is-typing');
      wait(1200, () => erase(Array.from(caption.textContent ?? ''), Array.from(caption.textContent ?? '').length));
    }
    if (!entry.isIntersecting && running) { running = false; window.clearTimeout(timer); }
  }, { threshold: 0.4 }).observe(editor);
}

// Heatmap, as a time picker on its side: the year drifts slowly past the middle and, week by week, the busiest day in
// the middle is picked while the photo row below moves along by one. Clicking a day brings it to the middle and picks it;
// the drift waits a few seconds after any click, drag or wheel. The numbers count up once on first view. The chart is
// drawn twice, so the drift loops by jumping back one copy.
for (const heatmap of document.querySelectorAll<HTMLElement>('[data-heatmap]')) {
  const scroll = heatmap.closest<HTMLElement>('[data-heatmap-scroll]');
  const card = heatmap.closest<HTMLElement>('.heatmap-card');
  const tip = card?.querySelector<HTMLElement>('[data-heatmap-tip]');
  const photos = [...(card?.querySelectorAll<HTMLElement>('.heatmap-day-photo') ?? [])];
  const grid = heatmap.querySelector<HTMLElement>('.heatmap-grid');
  if (!scroll || !card || !tip || !grid) continue;
  const cells = [...grid.children] as HTMLElement[];
  const template = heatmap.dataset.tip ?? '';
  const none = heatmap.dataset.tipNone ?? '';
  const number = new Intl.NumberFormat(heatmap.dataset.locale === 'zh' ? 'zh-CN' : 'en-US');

  const metric = (name: string) => parseFloat(getComputedStyle(heatmap).getPropertyValue(name));
  const pitch = () => metric('--cell') + metric('--gap');
  const inset = () => parseFloat(getComputedStyle(scroll).paddingLeft) || 0;
  const period = () => (cells.length / 14) * pitch(); // one copy of the year
  const columnAt = (left: number) => Math.floor((left + scroll.clientWidth / 2 - inset() + metric('--gap') / 2) / pitch());
  const leftFor = (column: number) => inset() + column * pitch() + metric('--cell') / 2 - scroll.clientWidth / 2;

  // Shows a day: outlines it and moves the photo row along by one, so photos come in at an even pace: the left one
  // leaves, the others shift, a new one comes in on the right.
  let picked = cells.find((cell) => cell.classList.contains('is-picked')) ?? null;
  let row = photos.slice(0, 3);
  let nextPhoto = 3 % photos.length;
  const place = (photo: HTMLElement, slot: number) => {
    photo.style.setProperty('--slot', String(slot));
    photo.style.zIndex = slot === 1 ? '1' : '';
    photo.classList.toggle('is-shown', slot >= 0 && slot <= 2);
  };
  const advance = () => {
    if (photos.length < 4) return;
    const leaving = row.shift()!;
    place(leaving, -1);
    const coming = photos[nextPhoto];
    nextPhoto = (nextPhoto + 1) % photos.length;
    coming.style.transition = 'none';
    place(coming, 3);
    void coming.offsetWidth;
    coming.style.transition = '';
    row.push(coming);
    row.forEach((photo, slot) => place(photo, slot));
  };
  const pick = (cell: HTMLElement) => {
    if (cell === picked) return;
    picked?.classList.remove('is-picked');
    cell.classList.add('is-picked');
    picked = cell;
    const count = Number(cell.dataset.c ?? 0);
    tip.textContent = (count ? template : none).replace('{date}', cell.dataset.d ?? '').replace('{count}', number.format(count));
    advance();
  };
  const busiest = (column: number) => {
    const week = cells.slice(column * 7, column * 7 + 7);
    return week.reduce((a, b) => (Number(b.dataset.c) > Number(a.dataset.c) ? b : a), week[0]);
  };

  // Start with the picked day (the last week) in the middle.
  if (picked) scroll.scrollLeft = leftFor(Math.floor(cells.indexOf(picked) / 7));
  let column = columnAt(scroll.scrollLeft);
  const follow = () => {
    const now = columnAt(scroll.scrollLeft);
    if (now === column || !cells[now * 7]) return;
    column = now;
    pick(busiest(now));
  };

  // Clicks pick a day; any hand on the chart holds the drift for a while.
  let holdUntil = 0;
  const hold = () => { holdUntil = performance.now() + 5000; };
  for (const type of ['pointerdown', 'wheel', 'touchstart']) scroll.addEventListener(type, hold, { passive: true });
  grid.addEventListener('click', (event) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>('.heat-cell');
    if (!cell) return;
    hold();
    column = Math.floor(cells.indexOf(cell) / 7);
    pick(cell);
    scroll.scrollTo({ left: leftFor(column), behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  });
  let settle = 0;
  scroll.addEventListener('scroll', () => {
    if (performance.now() < holdUntil) {
      // A reader scrolling: wrap at the copy seam and pick the week in the middle once they stop.
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        const now = columnAt(scroll.scrollLeft);
        if (picked && Math.floor(cells.indexOf(picked) / 7) !== now) { column = now; pick(busiest(now)); }
      }, 220);
    }
  }, { passive: true });

  if (reduceMotion.matches) continue;

  // Count the numbers up once.
  const countUp = () => {
    const stats = [...card.querySelectorAll<HTMLElement>('[data-stat]')];
    const begin = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - begin) / 1600, 1);
      const eased = 1 - (1 - t) ** 3;
      for (const stat of stats) stat.textContent = number.format(Math.round(Number(stat.dataset.to) * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // The drift: about one week every 1.4 seconds, wrapping back a copy when the first one has passed.
  let running = false;
  let last = 0;
  let position = scroll.scrollLeft;
  const drift = (now: number) => {
    if (!running) return;
    const dt = Math.min(now - last, 64);
    last = now;
    if (now >= holdUntil) {
      if (Math.abs(scroll.scrollLeft - position) > 2) position = scroll.scrollLeft; // after a reader's scroll
      position += (pitch() / 1400) * dt;
      if (position >= period()) position -= period();
      scroll.scrollLeft = position;
      follow();
    } else {
      position = scroll.scrollLeft;
      if (position < 1) { position += period(); scroll.scrollLeft = position; }
    }
    requestAnimationFrame(drift);
  };
  let counted = false;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !counted) { counted = true; countUp(); }
    if (entry.isIntersecting && !running) { running = true; last = performance.now(); position = scroll.scrollLeft; requestAnimationFrame(drift); }
    if (!entry.isIntersecting) running = false;
  }, { threshold: 0.3 }).observe(heatmap);
}
