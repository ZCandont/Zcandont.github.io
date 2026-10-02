// Particle engine: hero name convergence + settle. One canvas, one rAF loop.
//
// Decorative only: the real "Zachary Candau" <h1> is always in the DOM underneath,
// so no-JS and prefers-reduced-motion visitors see the complete page regardless.
//
// ponytail: this is the "converge" mode from the roadmap only. ambient drift across
// the whole page, cursor interaction, and the plume mode are later Phase 2 slices,
// add when a session is actually scoped for them.

const CONVERGE_MS = 3000; // per-particle fly-in duration
const MAX_DELAY_MS = 1500; // staggered start so particles don't all move in lockstep
// worst case settle time = CONVERGE_MS + MAX_DELAY_MS = 4.5s, under the 7s budget.

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  delay: number;
  size: number;
  color: string;
  jx: number;
  jy: number;
  jp: number;
}

function sampleHeadingPoints(heading: HTMLElement): { x: number; y: number }[] {
  const rect = heading.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return [];
  const style = getComputedStyle(heading);
  const scale = 2; // supersample for a cleaner glyph silhouette
  const off = document.createElement('canvas');
  off.width = Math.ceil(rect.width * scale);
  off.height = Math.ceil(rect.height * scale);
  const octx = off.getContext('2d');
  if (!octx) return [];
  octx.fillStyle = '#fff';
  octx.textBaseline = 'middle';
  octx.font = `${style.fontWeight} ${parseFloat(style.fontSize) * scale}px ${style.fontFamily}`;
  octx.fillText(heading.textContent?.trim() || '', 0, off.height / 2);
  const data = octx.getImageData(0, 0, off.width, off.height).data;
  const points: { x: number; y: number }[] = [];
  const step = 3;
  for (let y = 0; y < off.height; y += step) {
    for (let x = 0; x < off.width; x += step) {
      if (data[(y * off.width + x) * 4 + 3] > 120) {
        points.push({ x: rect.left + x / scale, y: rect.top + y / scale });
      }
    }
  }
  return points;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

async function initParticles() {
  const heading = document.querySelector<HTMLElement>('.hero h1');
  if (!heading) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = innerWidth;
  let height = innerHeight;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    width = innerWidth;
    height = innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  // Wait for the real font so sampled glyph shapes match what settles on screen.
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // fall through with whatever font was available
    }
  }

  const targets = shuffle(sampleHeadingPoints(heading));
  if (!targets.length) return; // heading not laid out yet; skip rather than draw nothing useful

  const count = Math.min(targets.length, width < 700 ? 450 : 900);
  let particles: Particle[] = targets.slice(0, count).map((t) => ({
    x: 0,
    y: 0,
    tx: t.x,
    ty: t.y,
    sx: Math.random() * width,
    sy: Math.random() * height,
    delay: Math.random() * MAX_DELAY_MS,
    size: Math.random() * 1.4 + 0.6,
    color: Math.random() < 0.82 ? 'rgba(76,201,255,0.85)' : 'rgba(255,122,47,0.85)',
    jx: Math.random() * Math.PI * 2,
    jy: Math.random() * Math.PI * 2,
    jp: 0.6 + Math.random() * 0.6,
  }));

  const startTime = performance.now();
  let rafId = 0;
  let frameMs = 16;
  let lastQualityCheck = startTime;

  function draw(now: number) {
    const elapsed = now - startTime;
    ctx!.clearRect(0, 0, width, height);
    for (const p of particles) {
      const t = Math.min(1, Math.max(0, (elapsed - p.delay) / CONVERGE_MS));
      const e = easeOutCubic(t);
      let x = p.sx + (p.tx - p.sx) * e;
      let y = p.sy + (p.ty - p.sy) * e;
      if (elapsed > p.delay + CONVERGE_MS) {
        const settleT = (elapsed - p.delay - CONVERGE_MS) / 1000;
        x += Math.sin(settleT * p.jp + p.jx) * 1.2;
        y += Math.cos(settleT * p.jp + p.jy) * 1.2;
      }
      ctx!.beginPath();
      ctx!.fillStyle = p.color;
      ctx!.arc(x, y, p.size, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  let last = performance.now();
  function frame(now: number) {
    frameMs = frameMs * 0.9 + (now - last) * 0.1;
    last = now;
    draw(now);
    // Auto-quality: only while still converging, drop particles once if the frame is heavy.
    if (now - startTime < CONVERGE_MS + MAX_DELAY_MS && now - lastQualityCheck > 500) {
      lastQualityCheck = now;
      if (frameMs > 40 && particles.length > 200) {
        particles = particles.filter((_, i) => i % 2 === 0);
      }
    }
    rafId = requestAnimationFrame(frame);
  }
  rafId = requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }
  });
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
}
