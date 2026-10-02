// Particle engine: one fixed canvas, one rAF loop, sitewide. The world is a long exposure:
// every particle draws a light trail, and blue/orange add to white where they cross.
//
// Modes
//   converge  the hero name forms from two color passes on load (the real <h1> stays hidden
//             until they land, then exposes slowly), and headings get traced as they enter view
//   residue   after the name forms, light trails keep streaming off its letters
//   ambient   ions drifting through the sky behind the content
//   cursor    the pointer is a small thruster: repel + swirl (E x B), exhaust trail when moving
//   fire      press and hold anywhere that isn't a control to fire a plume
//   gather    hover the formed name and the particles re-form it
//   burst     hovering or pressing a [data-burst] control throws particles off its edges
//   storm     clicking a [data-storm] link swirls a storm, the page fades, and the next page
//             opens inside the storm, which converges onto its heading as the content fades in
//
// Decorative only: all content is real DOM text. No JS or prefers-reduced-motion means this
// file never runs and the html.motion class is never set, so everything is visible from the start.
// CSS failsafes reveal the name (6s) and storm-in content (3.2s) if anything here fails.

const BLUE = '76,201,255';
const ORANGE = '255,122,47';
const R = 110; // cursor field radius, px
const K = 0.022; // seek spring
const D = 0.86; // seek damping
const SWIRL = 0.006; // tangential pull while seeking
const VMAX = 16; // px per frame

interface P {
  x: number; y: number; px: number; py: number; vx: number; vy: number;
  tx: number; ty: number; // target (or residue home), page coords
  dx: number; dy: number; // ambient drift velocity
  job: number; delay: number; c: 0 | 1; a: number; life: number; temp: boolean;
  storm: boolean; res: boolean; age: number; max: number;
}
type Pt = { x: number; y: number };

const html = document.documentElement;
const mobile = matchMedia('(max-width: 700px), (pointer: coarse)').matches;
const rand = Math.random;
const parts: P[] = [];
let W = 0;
let H = 0;
let jobId = 0;
let temps = 0;
let trails = true;

const hero = document.querySelector<HTMLElement>('[data-converge]');
const reveal = () => hero?.classList.add('is-formed');
const stormIn = html.classList.contains('storm-in');
const endStormIn = () => {
  html.classList.add('storm-done');
  setTimeout(() => html.classList.remove('storm-in', 'storm-done'), 1400);
};

function make(x: number, y: number, c: 0 | 1, a: number, temp = false): P {
  return {
    x, y, px: x, py: y, vx: 0, vy: 0, tx: 0, ty: 0,
    dx: 0.12 + rand() * 0.35, dy: (rand() - 0.5) * 0.16,
    job: 0, delay: 0, c, a, life: Infinity, temp, storm: false, res: false, age: 0, max: 0,
  };
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (rand() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Rasterize an element's text word by word (so wrapped lines land where the browser put them)
// and return up to `max` points on the glyphs, in page coordinates.
function sample(el: HTMLElement, max: number): Pt[] {
  const pts: Pt[] = [];
  const off = document.createElement('canvas');
  const o = off.getContext('2d', { willReadFrequently: true });
  if (!o) return pts;
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const st = getComputedStyle(n.parentElement!);
    const stretch = parseFloat(st.fontStretch) || 100;
    const text = n.textContent || '';
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      range.setStart(n, m.index);
      range.setEnd(n, m.index + m[0].length);
      const r = range.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      off.width = Math.ceil(r.width) + 2;
      off.height = Math.ceil(r.height) + 2;
      o.font = `${st.fontWeight} ${st.fontSize} ${st.fontFamily}`;
      (o as any).fontStretch = stretch >= 120 ? 'expanded' : stretch >= 108 ? 'semi-expanded' : 'normal';
      (o as any).letterSpacing = st.letterSpacing === 'normal' ? '0px' : st.letterSpacing;
      const word = st.textTransform === 'uppercase' ? m[0].toUpperCase() : m[0];
      const mt = o.measureText(word);
      const asc = mt.fontBoundingBoxAscent || r.height * 0.8;
      const desc = mt.fontBoundingBoxDescent || r.height * 0.2;
      // Fit the canvas word to the browser's box so the particles register with the real type.
      o.setTransform(r.width / (mt.width || 1), 0, 0, 1, 0, 0);
      o.fillStyle = '#fff';
      o.fillText(word, 0, (r.height * asc) / (asc + desc));
      const data = o.getImageData(0, 0, off.width, off.height).data;
      for (let y = 0; y < off.height; y += 2) {
        for (let x = 0; x < off.width; x += 2) {
          if (data[(y * off.width + x) * 4 + 3] > 128) pts.push({ x: r.left + x, y: r.top + scrollY + y });
        }
      }
    }
  }
  return shuffle(pts).slice(0, max);
}

// Send particles to targets. Free ambient (and storm) particles are recruited first, the rest spawn at `spawn`.
function assign(pts: Pt[], spawn: (i: number) => Pt, delay: (i: number) => number, recruit: boolean): number {
  const job = ++jobId;
  let i = 0;
  if (recruit) {
    for (const p of parts) {
      if (i >= pts.length) break;
      if (p.job || p.res || (p.temp && !p.storm)) continue;
      p.storm = false; p.job = job; p.a = 0.9; p.tx = pts[i].x; p.ty = pts[i].y; p.delay = delay(i); i++;
    }
  }
  for (; i < pts.length; i++) {
    const s = spawn(i);
    const p = make(s.x, s.y, i % 3 === 0 ? 1 : 0, 0.95, true);
    p.vx = (rand() - 0.5) * 2; p.vy = (rand() - 0.5) * 2;
    p.job = job; p.tx = pts[i].x; p.ty = pts[i].y; p.delay = delay(i);
    parts.push(p);
  }
  return job;
}

// Let particles go: recruits return to the drift, spawned ones blow off like exhaust and fade.
function letGo(p: P) {
  p.job = 0;
  p.storm = false;
  if (p.temp) {
    p.life = 30 + rand() * 70;
    p.vx += 0.8 + rand() * 3.2;
    p.vy += (rand() - 0.5) * 1.6;
    temps++;
  } else {
    p.a = 0.45;
    p.vx += (rand() - 0.5) * 3;
    p.vy += (rand() - 0.5) * 3;
  }
}
function release(job: number) {
  for (const p of parts) if (p.job === job) letGo(p);
}

// Throw particles off an element's edges (rect) or radially from a point.
function burst(r: DOMRect | null, x: number, y: number, n: number, c?: 0 | 1) {
  for (let k = 0; k < n && temps < 900; k++) {
    let sx = x;
    let sy = y;
    let nx: number;
    let ny: number;
    if (r) {
      const t = rand() * 2 * (r.width + r.height);
      if (t < r.width) { sx = r.left + t; sy = r.top; nx = 0; ny = -1; }
      else if (t < r.width + r.height) { sx = r.right; sy = r.top + t - r.width; nx = 1; ny = 0; }
      else if (t < 2 * r.width + r.height) { sx = r.right - (t - r.width - r.height); sy = r.bottom; nx = 0; ny = 1; }
      else { sx = r.left; sy = r.bottom - (t - 2 * r.width - r.height); nx = -1; ny = 0; }
    } else {
      const ang = rand() * Math.PI * 2;
      nx = Math.cos(ang);
      ny = Math.sin(ang);
    }
    const sp = 1.2 + rand() * 3.8;
    const p = make(sx, sy, c ?? (rand() < 0.7 ? 0 : 1), 0.9, true);
    p.vx = nx * sp + (rand() - 0.5);
    p.vy = ny * sp + (rand() - 0.5);
    p.life = 35 + rand() * 40;
    parts.push(p);
    temps++;
  }
}

// whole particles per frame for a fractional rate (frame-rate independent emission)
const count = (x: number) => Math.floor(x) + (rand() < x % 1 ? 1 : 0);

function addStorm(n: number, at: (k: number) => Pt, swirl = false) {
  for (let k = 0; k < n; k++) {
    const s = at(k);
    const p = make(s.x, s.y, rand() < 0.65 ? 0 : 1, 0.9, true);
    if (swirl) {
      // already circling the screen center, like the storm the last page ended in
      const ex = s.x - W / 2;
      const ey = s.y - H / 2;
      const r = Math.sqrt(ex * ex + ey * ey) + 1;
      p.vx = (-ey / r) * 8;
      p.vy = (ex / r) * 8;
    } else {
      p.vx = (rand() - 0.5) * 6;
      p.vy = (rand() - 0.5) * 6;
    }
    p.storm = true;
    parts.push(p);
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function init() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    if (stormIn) endStormIn();
    return reveal();
  }

  let heroPts: Pt[] | null = null;
  let rehome = false;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    heroPts = null;
    rehome = true;
  }
  resize();
  addEventListener('resize', resize);

  for (let i = 0, n = mobile ? 90 : 200; i < n; i++) parts.push(make(rand() * W, rand() * H, rand() < 0.75 ? 0 : 1, 0.45));

  // pointer: the cursor is a thruster
  const ptr = { x: -1e4, y: -1e4, lx: -1e4, ly: -1e4, on: false, down: false };
  addEventListener('pointermove', (e) => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; }, { passive: true });
  addEventListener('pointerdown', (e) => {
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.lx = ptr.x; ptr.ly = ptr.y; ptr.on = true;
    const t = e.target as Element;
    if (t.closest?.('[data-burst]')) burst(null, ptr.x, ptr.y, mobile ? 30 : 60);
    else if (e.button === 0 && !t.closest?.('a, button, input, textarea, select, label, summary, object')) ptr.down = true;
  });
  addEventListener('pointerup', () => { ptr.down = false; });
  addEventListener('pointercancel', () => { ptr.down = false; ptr.on = false; });
  html.addEventListener('pointerleave', () => { ptr.on = false; ptr.down = false; });

  // touch has no hover: tapping the open band of the current-projects lane parks or releases it
  const lane = document.querySelector('.lane');
  lane?.addEventListener('pointerdown', (e) => {
    if ((e as PointerEvent).pointerType !== 'mouse' && !(e.target as Element).closest('a')) lane.classList.toggle('parked');
  });

  // controls throw particles off their edges when the pointer arrives
  let burstEl: Element | null = null;
  addEventListener('pointerover', (e) => {
    const el = (e.target as Element).closest?.('[data-burst]') ?? null;
    if (el && el !== burstEl) burst(el.getBoundingClientRect(), 0, 0, mobile ? 14 : 28, el.classList.contains('pad-primary') ? 1 : 0);
    burstEl = el;
  }, { passive: true });

  const fetched = new Set<string>();
  const prefetch = (e: Event) => {
    const a = (e.target as Element).closest?.('a[data-storm]') as HTMLAnchorElement | null;
    if (!a || fetched.has(a.href)) return;
    fetched.add(a.href);
    const l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = a.href;
    document.head.append(l);
  };
  addEventListener('pointerover', prefetch, { passive: true });
  addEventListener('focusin', prefetch);

  // storm out: the clicked card dissolves into a vortex, the page fades, then the report opens
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a[data-storm]') as HTMLAnchorElement | null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    e.preventDefault();
    try { sessionStorage.setItem('storm', '1'); } catch { /* storage blocked: the next page simply skips its storm */ }
    html.classList.add('storm-out');
    const r = a.getBoundingClientRect();
    for (const p of parts) if (!p.job && !p.res) { p.storm = true; p.a = 0.9; }
    addStorm(mobile ? 300 : 650, () => ({ x: r.left + rand() * r.width, y: r.top + rand() * r.height }));
    setTimeout(() => location.assign(a.href), 820);
  });
  // back/forward cache: a page restored mid-storm must come back whole
  addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    html.classList.remove('storm-out');
    for (const p of parts) if (p.storm) letGo(p);
  });

  let heroJob = 0;
  let heroStart = 0;
  let formed = !hero;
  let stormJob = 0;
  let stormStart = 0;

  let gatherJob = 0;
  let lastInside = 0;
  let last = performance.now();
  let acc = 0;
  let frames = 0;
  let rafId = 0;
  const paths: Path2D[] = [];
  rafId = requestAnimationFrame(frame); // start now: frame() is hoisted, and the storm must move during the font wait

  // storm in: this page opened from a storm; swirl, then converge onto the heading while the content fades in
  if (stormIn) {
    addStorm(mobile ? 300 : 650, () => {
      const ang = rand() * Math.PI * 2;
      const r = Math.min(W, H) * (0.15 + rand() * 0.33);
      return { x: W / 2 + Math.cos(ang) * r, y: H / 2 + Math.sin(ang) * r };
    }, true);
    await Promise.race([document.fonts?.ready, wait(1500)]);
    setTimeout(() => {
      const target = document.querySelector<HTMLElement>('.case-header h1, main h1');
      const pts = target ? sample(target, mobile ? 500 : 1100) : [];
      if (!pts.length) {
        endStormIn();
        for (const p of parts) if (p.storm) letGo(p);
        return;
      }
      stormStart = performance.now();
      stormJob = assign(pts, () => ({ x: rand() * W, y: rand() * H }), () => stormStart + rand() * 300, true);
    }, 650);
  }

  // hero: the name forms from two passes, blue ions from the left and orange electrons from the right
  if (hero) {
    const r = hero.getBoundingClientRect();
    if (r.bottom < 0 || r.top > H) {
      reveal();
      formed = true;
    } else {
      await Promise.race([document.fonts?.ready, wait(2500)]);
      heroPts = sample(hero, mobile ? 700 : 1500);
      if (!heroPts.length) {
        reveal();
        formed = true;
      } else {
        heroStart = performance.now();
        heroJob = assign(
          heroPts,
          (i) => (i % 3 === 0 ? { x: W * (0.5 + rand() * 0.5), y: rand() * H } : { x: W * rand() * 0.5, y: rand() * H }),
          (i) => heroStart + 350 + (i % 3 === 0 ? 450 : 0) + rand() * 900,
          false,
        );
      }
    }
  }

  // residue: light trails that keep streaming off the formed name
  function startResidue() {
    if (!hero) return;
    heroPts ??= sample(hero, 1500);
    if (!heroPts.length) return;
    for (let i = 0, n = mobile ? 50 : 130; i < n; i++) {
      const p = make(0, 0, rand() < 0.6 ? 0 : 1, 0.55);
      p.res = true;
      p.max = 30 + rand() * 45;
      p.age = p.max; // respawns at a glyph on its first step
      parts.push(p);
    }
  }

  // headings get traced by particles as they enter view (the text itself is always visible)
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      io.unobserve(en.target);
      const pts = sample(en.target as HTMLElement, mobile ? 220 : 480);
      if (!pts.length) continue;
      const t0 = performance.now();
      const edge = () => (rand() < 0.5 ? { x: rand() < 0.5 ? -10 : W + 10, y: rand() * H } : { x: rand() * W, y: H + 10 });
      const job = assign(pts, edge, () => t0 + rand() * 350, true);
      setTimeout(() => release(job), 2300);
    }
  }, { threshold: 0.6, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll<HTMLElement>('[data-particle-target], .prose-body h2').forEach((el) => {
    if (!(stormIn && el.closest('.case-header'))) io.observe(el);
  });


  // share of a job's particles that have landed
  function landed(job: number, sy: number) {
    let n = 0;
    let total = 0;
    for (const p of parts) {
      if (p.job !== job) continue;
      total++;
      if (Math.abs(p.tx - p.x) + Math.abs(p.ty - sy - p.y) < 2 && Math.abs(p.vx) + Math.abs(p.vy) < 1) n++;
    }
    return total ? n / total : 1;
  }

  function frame(now: number) {
    const dt = Math.min(Math.max(now - last, 1), 100);
    last = now;
    // variable timestep in 60 Hz units: every display frame draws (smooth on 120/144 Hz screens),
    // and long frames split into substeps so the springs stay stable
    const fr = dt / 16.67;
    const steps = Math.ceil(fr);
    const h = fr / steps;
    const Dh = Math.pow(D, h);
    const d97 = Math.pow(0.97, h);
    const d975 = Math.pow(0.975, h);
    acc += dt;
    // auto-quality: shed the ambient field, then the trails, if frames run long
    if (++frames === 60) {
      if (acc / 60 > 26) {
        if (trails && parts.length > 120) {
          for (let i = parts.length - 1; i >= 0; i -= 2) if (!parts[i].job && !parts[i].temp && !parts[i].res) parts.splice(i, 1);
        } else trails = false;
      }
      frames = 0;
      acc = 0;
    }

    const sy = scrollY;
    if (trails) {
      ctx!.globalCompositeOperation = 'destination-out';
      ctx!.fillStyle = `rgba(0,0,0,${1 - Math.pow(0.72, fr)})`;
      ctx!.fillRect(0, 0, W, H);
    } else ctx!.clearRect(0, 0, W, H);
    ctx!.globalCompositeOperation = 'lighter';

    // hero: start exposing the real type while the passes are still landing, then let the particles drift off it
    if (heroJob && (landed(heroJob, sy) > 0.75 || now - heroStart > 3800)) {
      reveal();
      formed = true;
      const job = heroJob;
      heroJob = 0;
      setTimeout(() => { release(job); startResidue(); }, 1700);
    }
    if (rehome && formed && hero) {
      heroPts = sample(hero, 1500);
      rehome = false;
    }

    // storm in: the heading has formed, so hand over to the content
    if (stormJob && (landed(stormJob, sy) > 0.75 || now - stormStart > 1600)) {
      endStormIn();
      const job = stormJob;
      stormJob = 0;
      for (const p of parts) if (p.storm) letGo(p);
      setTimeout(() => release(job), 900);
    }

    // gather: hovering the formed name pulls particles back into it
    if (hero && formed && !mobile && ptr.on) {
      const r = hero.getBoundingClientRect();
      if (ptr.x > r.left && ptr.x < r.right && ptr.y > r.top && ptr.y < r.bottom) {
        lastInside = now;
        if (!gatherJob) {
          heroPts ??= sample(hero, 1500);
          gatherJob = assign(heroPts.slice(0, 1000), () => ({ x: ptr.x, y: ptr.y }), () => now + rand() * 250, true);
          hero.classList.add('is-gathering');
        }
      }
    }
    if (gatherJob && now - lastInside > 220) {
      hero?.classList.remove('is-gathering');
      release(gatherJob);
      gatherJob = 0;
    }

    // exhaust while the cursor moves fast, a plume while it is held down
    if (ptr.on) {
      const vx = ptr.x - ptr.lx;
      const vy = ptr.y - ptr.ly;
      if (ptr.lx > -1e3 && (vx * vx + vy * vy) / (fr * fr) > 30 && temps < 160) {
        for (let k = 0, n = count(2 * fr); k < n; k++) {
          const p = make(ptr.x, ptr.y, rand() < 0.75 ? 0 : 1, 0.8, true);
          p.vx = (-vx / fr) * 0.18 + (rand() - 0.5) * 1.2;
          p.vy = (-vy / fr) * 0.18 + (rand() - 0.5) * 1.2;
          p.life = 26 + rand() * 18;
          parts.push(p);
          temps++;
        }
      }
      ptr.lx = ptr.x;
      ptr.ly = ptr.y;
    }
    if (ptr.down && temps < 700) {
      for (let k = 0, n = count(6 * fr); k < n; k++) {
        const ang = (rand() - 0.5) * 0.55;
        const sp = 3 + rand() * 7;
        const p = make(ptr.x, ptr.y, rand() < 0.7 ? 0 : 1, 0.95, true);
        p.vx = Math.cos(ang) * sp;
        p.vy = Math.sin(ang) * sp;
        p.life = 45 + rand() * 40;
        parts.push(p);
        temps++;
      }
    }

    const cx = W / 2;
    const cy = H / 2;
    const ring = Math.min(W, H);
    for (let i = 0; i < 8; i++) paths[i] = new Path2D();
    outer: for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.px = p.x;
      p.py = p.y;
      for (let st = 0; st < steps; st++) {
        if (p.job) {
          if (now >= p.delay) {
            // spring toward the target plus a tangential pull (E x B), so the two passes spiral in
            // opposite directions; the swirl vanishes at the target so they still settle
            const ex = p.tx - p.x;
            const ey = p.ty - sy - p.y;
            const s = p.c ? -SWIRL : SWIRL;
            p.vx = (p.vx + (ex * K - ey * s) * h) * Dh;
            p.vy = (p.vy + (ey * K + ex * s) * h) * Dh;
            const v2 = p.vx * p.vx + p.vy * p.vy;
            if (v2 > VMAX * VMAX) {
              const k = VMAX / Math.sqrt(v2);
              p.vx *= k;
              p.vy *= k;
            }
          } else {
            p.vx *= d97;
            p.vy *= d97;
          }
        } else if (p.storm) {
          // vortex: orbit the screen center on a band, each particle on its own radius
          const ex = p.x - cx;
          const ey = p.y - cy;
          const r = Math.sqrt(ex * ex + ey * ey) + 1;
          const radial = (r - ring * (0.12 + p.dx * 0.7)) * 0.03;
          const sp = 7 + p.c * 4;
          p.vx += ((-ey / r) * sp - (ex / r) * radial - p.vx) * 0.07 * h;
          p.vy += ((ex / r) * sp - (ey / r) * radial - p.vy) * 0.07 * h;
        } else if (p.res) {
          if ((p.age += h) > p.max && heroPts?.length) {
            const t = heroPts[(rand() * heroPts.length) | 0];
            p.x = p.px = t.x;
            p.y = p.py = t.y - sy;
            p.vx = 1 + rand() * 1.8;
            p.vy = (rand() - 0.5) * 0.5;
            p.age = 0;
          }
        } else if (p.temp) {
          p.vx *= d975;
          p.vy *= d975;
        } else {
          p.vx += (p.dx - p.vx) * 0.03 * h;
          p.vy += (p.dy - p.vy) * 0.03 * h;
        }
        if (ptr.on) {
          const ex = p.x - ptr.x;
          const ey = p.y - ptr.y;
          const d2 = ex * ex + ey * ey;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * (p.job ? 0.3 : 1) * h;
            p.vx += (ex / d) * f * 1.1 - (ey / d) * f * 0.9;
            p.vy += (ey / d) * f * 1.1 + (ex / d) * f * 0.9;
          }
        }
        p.x += p.vx * h;
        p.y += p.vy * h;

        if (p.life !== Infinity && (p.life -= h) <= 0) {
          parts.splice(i, 1);
          temps--;
          continue outer;
        }
      }
      if (p.life === Infinity && !p.job && !p.temp && !p.res) {
        // ambient ions wrap around the sky
        if (p.x > W + 20) p.x = p.px = -20;
        else if (p.x < -20) p.x = p.px = W + 20;
        if (p.y > H + 20) p.y = p.py = -20;
        else if (p.y < -20) p.y = p.py = H + 20;
      }

      // dim in flight, bright at rest: the letters flare as the passes land
      let a: number;
      if (p.res) {
        if (p.age > p.max) continue;
        a = p.a * Math.sin((Math.PI * p.age) / p.max);
      } else {
        const sp = Math.abs(p.vx) + Math.abs(p.vy);
        a = (p.life < 40 ? (p.a * p.life) / 40 : p.a) * (p.job ? Math.max(0.3, 1 - sp / 14) : 1);
      }
      const lvl = Math.min(3, Math.max(0, Math.round(a * 4) - 1));
      const path = paths[p.c * 4 + lvl];
      // residue streaks are drawn long: a light trail behind each one
      if (p.res) path.moveTo(p.x - p.vx * 9, p.y - p.vy * 9);
      else path.moveTo(p.px, p.py);
      path.lineTo(p.x + 0.4, p.y);
    }
    ctx!.lineCap = 'round';
    for (let i = 0; i < 8; i++) {
      const lvl = i % 4;
      ctx!.strokeStyle = `rgba(${i < 4 ? BLUE : ORANGE},${(lvl + 1) / 4})`;
      ctx!.lineWidth = 1.1 + lvl * 0.3;
      ctx!.stroke(paths[i]);
    }
    rafId = requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(rafId);
    if (!document.hidden) {
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }
  });
}

if (html.classList.contains('motion')) {
  init().catch(() => {
    reveal();
    if (stormIn) endStormIn();
  });
}
