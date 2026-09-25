# Zachary Candau portfolio (Zcandont.github.io)

Astro static site on GitHub Pages. The plan lives in `ROADMAP.md`; work one phase slice per session and check its exit gate before moving on.

## Commands
- `npm run dev` (port 4321, also in `.claude/launch.json`), `npm run build`, `npm run preview`
- `main` deploys via `.github/workflows/deploy.yml` (repo Settings > Pages > Source = GitHub Actions)

## Non-negotiables
- **Name on the site is "Zachary Candau."** Never "Candont" (that is only the GitHub handle).
- **Confidentiality.** Current employer is a stealth, ITAR-regulated space startup: say only "founding analysis engineer, space startup, electric propulsion." No company name, no technical detail, no images. Zipline and the "undisclosed aerospace company" tooling project need written permission before real detail goes live.
- **Privacy.** No phone number, and no referral emails, anywhere on the site or in the hosted resume PDF.
- **Progressive enhancement.** All content is real DOM text and `<img>`. Particles/canvas are decoration only. `prefers-reduced-motion` and no-JS must show the complete page.
- **Performance budget.** Lighthouse mobile at least 95 on all four categories. Particle engine at most about 15 KB gzipped. Fonts self-hosted (Geist, Geist Mono via Fontsource). No third-party requests.

## Design system (one theme, dark only)
- Tokens live in `src/styles/tokens.css`. Blue `--accent` is primary/structural; orange `--ember` only for CTAs and "energy" moments. One radius (`--radius`). Z-index only from the `--z-*` scale.
- Text contrast at least WCAG AA (current pairs are 7.7:1 or better). Recheck when adding a color.
- Copy rules: no em-dashes (or en-dash separators) in visible text, no filler verbs ("seamless", "elevate"), no scroll cues, no decorative dots, section eyebrows at most 1 per 3 sections, one CTA label per intent ("View work", "Contact"). Hero: headline at most 2 lines, subtext at most 20 words, 1 primary + 1 secondary CTA.
- No hand-rolled icons (use an icon library when icons are needed). Animate only `transform` and `opacity`. No `window` scroll listeners; use IntersectionObserver or CSS scroll-driven animation.
- Use `100dvh`, never `100vh`. Layout: no three equal cards, no more than 2 consecutive image+text splits.

## Project case-study template (the differentiator)
Every project shows autonomy in five beats: **Spotted** (problem/idea) > **Root cause** (fundamentals and analysis) > **Plan** (requirements, success criteria) > **Iterations** (v1 to vN, what failed) > **Proof it's final** (test vs prediction, margins, closing decision). Plus a header block (role, team size, duration, tools, my contribution vs the team's) and a decision log (options, criteria, choice, cost/schedule/risk). Numbers come from Zach; never invent metrics.

## Content model (Phase 1, in progress)
`src/content.config.ts` defines the `projects` collection (glob loader over `src/content/projects/*.md`): `category` (hardware|software|analysis|content), `org` (space-startup|zipline|ucsd-research|ucsd-team|ucsd-course|personal), `year`, `role`, `teamSize`, `tools`, `featured`, `links`. The five-beat narrative (Spotted/Root cause/Plan/Iterations/Proof it's final) is the Markdown body as H2 sections, rendered by `src/pages/projects/[...slug].astro`. Astro 7's content layer requires the `loader` property (`astro/loaders`' `glob`); the old `type: 'content'` alone silently returns an empty collection.

Migrated so far: `uav-composite-wing`, `composite-wing-structural-analysis`, `joby-bonding-fixture`, `solar-flare-cnn`, `microstructure-property-prediction`. Project images live in `public/images/projects/<slug>/` and are embedded as `<figure><img loading="lazy">` in the Markdown. The homepage sorts case studies featured-first, then newest year first. The rest of the homepage's project list is still shell copy in `src/pages/index.astro` (`shellOnly` array) pending the same treatment. Each software project also gets its own GitHub repo (one repo per project, README with results/limitations/next steps, no course data or instructor handouts) that the case study links to via `links`. An `experience` collection is still to do.
