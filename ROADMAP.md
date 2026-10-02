# Roadmap: Zachary Candau portfolio site

## Context

The repo is a blank starter (plain HTML/CSS, placeholder copy, indigo/light palette, three sections). The goal is a portfolio that does five jobs at once:

1. **Recruiter link.** Fast, readable, and useful on a job application in 30 seconds.
2. **Autonomy proof.** Every project shows that Zach spotted a problem, found the root cause, planned, iterated, and justified a final design.
3. **Sticky.** Particle and star visuals themed on electric propulsion (blue ions, orange energy) that people want to play with.
4. **Leader credibility.** Reads as someone you would put in charge, not just a good junior engineer.
5. **Growth platform.** Adding a project, video or post should cost one file, not a redesign.

Source material: the resume (founding analysis engineer at a stealth space startup, Zipline intern, UCSD research and TA, Senior Design chief engineer, FSAE) and the 8-page portfolio (six projects: UAV wing, FSAE rear wing, ultrasonic C-scan, stepped-lap repair patch, solar-flare CNN, composite tooling).

### Decisions already made
| Topic | Decision |
|---|---|
| Stack | Astro (static) + vanilla canvas particle engine. No React unless a real need appears. |
| Hosting | GitHub Pages at `zcandont.github.io`, deployed by GitHub Actions. Custom domain later is a one-file change. |
| Name on site | **Zachary Candau** everywhere (fixes the "Zach Candont" placeholder). |
| Current employer | Generic only: "Founding Analysis Engineer, space startup, electric propulsion." No company name, no technical detail. Theme is design flavor only. |
| Order of work | Recruiter-ready first (Phase 1), particle and interaction layer second (Phase 2). |

---

## Phase 0 — Foundation (about 1 session)

- Scaffold Astro in the existing repo (keep git history). Set `site: 'https://zcandont.github.io'`, no `base`, because this is a user site.
- Add `.github/workflows/deploy.yml` (`withastro/action`). Zach sets repo **Settings → Pages → Source = GitHub Actions**.
- Design tokens in `src/styles/tokens.css` (base styles in `global.css`). Keep the existing token names (`--bg --fg --muted --accent --card --border`) and re-value them, starting point:
  - space `#05070F`, surface `#0B1020`, ion blue `#4CC9FF` / deep `#1E6BFF`, ember orange `#FF7A2F`, text `#E8EEF8`, muted `#9AA8C1`, stars `#FFFFFF`.
  - Blue is primary and structural. Orange is used sparingly for CTAs and "energy" moments. Verify every text/background pair is at least WCAG AA.
  - Dark only. A light theme is YAGNI for a space aesthetic.
- Pick one display font and one mono font (mono for data labels and specs). Self-host, no third-party font requests. Use `design-taste-frontend` to choose so it does not look templated.
- Base layout: nav, footer, SEO meta, favicon, default social-share image.
- Repo `CLAUDE.md` recording the palette, content schema, perf budget, confidentiality rules, and case-study template, so every future session starts consistent.
- `.claude/launch.json` so the dev server opens in the built-in browser pane.

**Exit gate:** `npm run build` passes, the Action is green, and the live URL shows the new shell.

**Status (2026-09-21):** shell built and verified locally (build passes; layout checked at 375 and 1440 wide; all text contrast pairs at least 7.7:1; no horizontal scroll). Remaining for the gate: Zach sets Pages source to GitHub Actions, then commit and push, and confirm the Action goes green. Deferred to Phase 1: the social-share image (needs a PNG) and the Resume CTA (needs the scrubbed PDF); the hero CTAs are "View work" and "Contact" until then.

## Phase 1 — Recruiter-ready site (about 4-6 sessions, mostly content)

Ship with **real content and light motion only** (CSS starfield, no particle engine yet). This is the version that goes on applications.

**Home order** (matches your section list, ordered for a 30-second skim):
1. Hero: name, one-line positioning, two CTAs (See work / Resume).
2. Proof strip: 3-4 quantified facts (wing held ultimate load in whiffletree, >10 kN stepped-lap joint, FSAE 8th overall, founding engineer).
3. Featured projects (3 gold-standard case studies).
4. About.
5. Experience: timeline recapping the resume + resume link.
6. Skills highlight (static grid for now; constellation in Phase 3).
7. All projects with filters.
8. Beyond engineering / future.
9. Contact and links.

**Routes:** `/`, `/projects/[slug]`, `/resume`. Later: `/lab`, `/links`.

**Content model** (Astro content collections, one Markdown file per item):
- `projects`: `title, summary, category (hardware|software|analysis|content), org (space-startup|zipline|ucsd-research|ucsd-team|personal), year, role, teamSize, tools[], cover, featured, status`, plus a short one-liner for each of the five beats (used on cards).
- `experience`: one file per role.
- One shared case-study template renders every project.

**Case-study template — the autonomy narrative** (this is the differentiator):
1. **Spotted:** the problem or idea, and why it mattered.
2. **Root cause:** the fundamentals and the analysis that explained it.
3. **Plan:** requirements, success criteria, approach chosen.
4. **Iterations:** v1 → vN, what failed and why, with images.
5. **Proof it's final:** test vs prediction, margins, and the decision that closed it.

Every project also gets a header block (role, team size, duration, tools, my contribution vs the team's) and a **decision log** (options, criteria, choice, cost/schedule/risk). Cost and schedule framing is what makes a reader see a manager, not only an analyst.

**Porting the six existing projects.** The portfolio has Goal → Approach → Result, but is missing the middle of the narrative. Gaps to fill from Zach:

| Project | Strong evidence already there | Missing (Zach supplies) |
|---|---|---|
| UAV composite wing | Full CAD→FEA→build→whiffletree chain; Technical Lead → Team Lead move | Design requirements, ultimate load number, predicted vs measured deflection, margin of safety, what went wrong |
| FSAE rear wing | Multi-airfoil low-speed downforce idea, 8th overall | CFD numbers, why multi-element, your share vs team result |
| Ultrasonic C-scan | Custom immersion setup + analysis code, defect map | Were defects seeded/known? Detection accuracy, what you wrote vs the lab |
| Stepped-lap repair | Volkersen model, pendulum impactor, >10 kN test | Predicted vs measured load, failure mode, step count rationale |
| Solar-flare CNN | 5 model families compared, loss curves | Honest framing: compute-limited, visible train/validation gap, what you would do next |
| Composite tooling (undisclosed company) | 3-2-1 fixture, work instructions | Keep company anonymous; needs its own permission check |

Also mine the resume for projects not yet in the portfolio: Zipline test setups and aero parts, Triton ML/API side project, TA work. Zach lists any other stored-away projects for an **intake list**.

**Project intake process** (repeatable for every future project): Zach brain-dumps against 8 prompts (the 5 beats, numbers, images, what you would change) → Claude drafts the Markdown → Zach corrects facts → publish.

**Cleanups while porting:**
- Do not copy portfolio typos ("illustrat", "Creat", "completeion", "intesntiy"; "Volkerson" should be "Volkersen").
- Extract images from the portfolio PDF (`pdfimages`/`pdf` skill) and convert to WebP/AVIF via Astro `<Image>`.
- **Privacy:** the current resume PDF contains a phone number and two professors' emails. Host a public version without phone or referral emails ("references on request"). Put the email behind a click or a mailto button.

**Exit gate:**
- No placeholder text left.
- Lighthouse ≥ 95 on performance, accessibility, best practices and SEO (mobile).
- Screenshots pass at 375 / 768 / 1440.
- A cold reader can answer in 30 seconds: who, what field, best project, how to contact.

## Phase 2 — Particle engine and signature interactions (about 5-8 sessions, time-boxed)

**Architecture (one engine, built once):**
- `src/scripts/particles.ts`: **one fixed full-viewport canvas** behind the content, **one requestAnimationFrame loop**. Particles can fly between sections; a canvas per section could not.
- Modes: `ambient` (stars + drifting ions), `cursor` (repel/attract, ion trail), `converge` (particles fly to a target), `plume` (thruster exhaust).
- **Converge targets** come from `data-particle-target` elements: text rasterized on an offscreen canvas, image pixels (particles take the pixel colors, then crossfade to the real image for crispness), or an SVG path.
- **Trigger:** `IntersectionObserver` per section. Particles start scattered and draggable, then converge as the section enters view.
- Auto-quality: measure frame time and shed particles when it drops. Fewer particles and touch-drag on mobile. Pause when the tab is hidden or the canvas is offscreen.

**Progressive enhancement (non-negotiable):**
- All real content is DOM text and `<img>`; particles are a decorative overlay and never the only way to read anything.
- `prefers-reduced-motion` gets the final static state.
- No-JS shows the full page.
- Canvas never blocks first paint or LCP.

**Signature interaction (hero):** a Hall-thruster cross-section. Orange electrons swirl in the annular channel (E×B drift), blue ions accelerate axially out the plume, and the cursor perturbs the field. ~~On scroll, the plume converges into "Zachary Candau."~~ **Changed 2026-10 at Zach's request: converges immediately on page load, not on scroll** (he wants the name visible within seconds, not gated on scrolling). Theme only, no employer detail.

**Status (2026-10):** first slice shipped: `src/scripts/particles.ts`, one canvas, one rAF loop. Particles scatter on load, converge onto the real `<h1>` text over ~3s (staggered, worst case 4.5s, under the 7s budget), then settle into a light shimmer in place. ~1.2 KB gzipped. Guarded by `prefers-reduced-motion`; canvas is decorative only, the real heading text is always in the DOM. Not yet built: ambient drift across the rest of the page, cursor interaction, the plume mode, and the rest of the micro-interaction backlog, those are separate future slices.

**Micro-interaction backlog** (build in slices, cut freely):
- Ion trail on the cursor; magnetic buttons.
- Project card hover "ionizes" and bursts, then click converges the cover image.
- Click-and-hold fires a thruster (easter egg).
- Loading "ignition" sequence.
- Keyboard shortcut / konami secret.
- Scroll-linked plume length.

**Time-box:** Phase 2 must not starve content. The rule: no new effect ships before the current phase's content gate is met.

**Exit gate:** ≥ 55 fps at target particle count on the dev laptop; reduced-motion and no-JS verified; engine ≤ ~15 KB gzipped; a fresh visitor interacts within 5 seconds without instructions.

## Phase 3 — Depth and credibility (about 3-5 sessions)

- **Skills constellation:** skills as stars, lines drawn to the projects that used them, data-driven from project `tools[]`, so every skill is backed by proof.
- **Experience as trajectory:** roles as waypoints along an orbit path, resume PDF link alongside.
- **Leadership evidence:** Technical Lead → Team Lead switch, Chief Engineer, TA. Show it, do not claim it.
- **Beyond engineering / Future:** F1, cooking, photography, the long-term direction. Zach decides how far to go with the NASA / Secretary of Transportation aspiration (recommend framing it as "long-term direction" in About, not a headline).
- Testimonials or referral quotes, only with permission.
- Ongoing: intake more stored-away projects.

## Phase 4 — Content engine and growth (about 3-4 sessions)

- `/lab`: videos via lite-YouTube facade (no heavy embeds), TikTok/YouTube links, build logs.
- Substack: pull latest posts from RSS at build time onto Home.
- `/links`: an on-theme Linktree replacement (keep the real Linktree too).
- SEO: sitemap, `Person` JSON-LD, auto-generated OG image per project.
- Privacy-friendly analytics with **custom events** (GoatCounter or Plausible; decide then) to measure what matters here: particle interactions, project opens, resume clicks, outbound clicks, scroll depth.
- Optional newsletter signup, RSS.

## Phase 5 — Operating cadence (ongoing)

- New project = one Markdown file + assets + the intake process.
- Monthly: review analytics → what people interact with → what to make more of.
- Only then automate (`/loop` or `/schedule` for broken-link and Lighthouse checks). Do not build automation before there is a recurring pain.

---

## Working method: how we design and edit together

Each session is one shippable slice:
1. Pick a slice from the roadmap; write down its exit gate first.
2. Direction for any new section via **`design-taste-frontend`** (keeps it from looking templated).
3. Build; keep changes small; commit per slice on a branch.
4. Preview in the **built-in browser pane** (`preview_start`, `resize_window` for 375/768/1440); use **`playwright-cli`** for screenshots and reduced-motion / dark checks.
5. Audit with **`web-design-guidelines`** (a11y/UX) before each release.
6. **`/code-review`** or **`/simplify`** before merge; **`/security-review`** once before Phase 4.
7. Merge to `main` → Action deploys.

| Tool | Where it earns its place |
|---|---|
| `design-taste-frontend` | Phase 0 fonts/tokens, every new section |
| `web-design-guidelines` | Pre-release audit, Phases 1-4 |
| `playwright-cli` + browser pane | Every visual change; perf and motion checks |
| `pdf` skill / `pdfimages` | Extracting portfolio images, building the public résumé |
| `dataviz` | Case-study charts (loss curves, FEA plots) in the site palette |
| `claude-mem` | Carrying decisions and project facts across sessions |
| `ponytail` | Keeps scope minimal: the particle engine is custom because it is the product; everything else uses Astro/CSS built-ins |
| `code-review` / `simplify` / `security-review` | Pre-merge gates |
| Vercel skills | **Not needed** (GitHub Pages, no React). Revisit only if the stack changes |

## Risks and guardrails

| Risk | Guardrail |
|---|---|
| Effects hurt readability, speed or accessibility | Progressive enhancement, reduced-motion, perf gates, auto-quality |
| Confidentiality (startup is ITAR/stealth; Zipline IP; "undisclosed" company) | Generic wording only; pre-publish checklist; written OK before anything from Zipline or the tooling project goes live |
| Spending all the time on particles, not content | Content gate on every phase; Phase 2 time-boxed |
| Solo maintainer with a full-time job | Every phase splits into single-session slices; every slice is shippable |
| Reads as junior instead of leader | Outcome-first, quantified copy; restrained type; decision logs with cost/schedule/risk; particles are seasoning, not the meal |
| Brand mismatch (Candont vs Candau) | Fixed in Phase 0; add a domain later |

## Inputs needed from Zach (not blocking Phase 0)

- Numbers and gaps listed in the port table above.
- Any other stored-away projects.
- Photo set (the Venice portrait and the layup photo are already usable).
- YouTube, TikTok, LinkedIn, Linktree handles; Substack name once created.
- Confirmation on what may be said publicly about Zipline and the tooling project.
- Whether to keep the NASA / DOT aspiration in the About copy.

## Critical files (created or changed)

- New: `package.json`, `astro.config.mjs`, `src/content.config.ts`, `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/projects/[...slug].astro`, `src/styles/tokens.css`, `src/scripts/particles.ts` (Phase 2), `.github/workflows/deploy.yml`, `CLAUDE.md`, `.claude/launch.json`, `src/content/projects/*.md`, `src/content/experience/*.md`.
- Reused: section IDs (`#about #projects #contact`) and the `.grid/.card` layout and token names from `index.html` / `style.css`; the README checklist is replaced by a link to `ROADMAP.md`.
- After approval: this plan is saved to the repo as `ROADMAP.md` (first commit), then Phase 0 starts.

## Verification (per phase)

- **Phase 0:** `npm run build` and `npm run preview` work locally; Actions run is green; live URL loads.
- **Phase 1:** Lighthouse mobile ≥ 95 on all four; Playwright screenshots at 375/768/1440; link check; no placeholder text; 30-second cold-read test.
- **Phase 2:** fps measured at target particle count; reduced-motion and no-JS render the complete page; hidden-tab pause confirmed; touch device check.
- **Phases 3-4:** each new page passes the Phase 1 gates; analytics events fire in a test session.
