# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: recruiters and hiring managers** (confirmed 2026-10). They arrive from a job application or a shared link and must be able to answer in about 30 seconds: who Zachary Candau is, what field he works in, what his best project is, and how to reach him. The resume, GitHub, LinkedIn and Linktree are one click from the first viewport.
- **Secondary: peers, collaborators and a future engineering-content audience** (videos, posts). They stay longer, play with the interactive layer, and read case studies in depth.

## Product Purpose

A personal and professional portfolio for Zachary Candau, aerospace engineer. It does five jobs: a recruiter link, proof of engineering autonomy, a site people want to interact with and remember, leadership credibility despite his age, and a growth platform where a new project, video or post costs one file, not a redesign. Success: a cold visitor remembers him, opens a case study, and opens the resume or a contact link.

## Positioning

Every project is told as an autonomy narrative in five beats: Spotted, Root cause, Plan, Iterations, Proof it's final, plus a header block and a decision log. Most engineering portfolios show results; this one shows the judgment that produced them. The visual identity is electric propulsion (Hall-effect thrusters), his current field, rendered as an interactive particle world.

## Operating Context

- Static Astro site on GitHub Pages (`zcandont.github.io`), deployed from `main` by GitHub Actions.
- Routes: `/`, `/portfolio` (every project), `/projects/[slug]` (case studies and in-progress reports from the `projects` content collection), `/resume` (embeds `public/resume.pdf`).
- Sent on job applications, linked from LinkedIn and Linktree, viewed on phones and laptops.

## Capabilities and Constraints

- **Name:** "Zachary Candau" everywhere. "Candont"/"ZCandont" is only the GitHub/Linktree handle.
- **Confidentiality:** current employer is a stealth, ITAR-regulated space startup. Say only "founding analysis engineer, space startup, electric propulsion." No company name, technical detail or images. Zipline and the undisclosed aerospace tooling project need written permission before real detail goes live.
- **Privacy:** no phone number and no referral emails in site copy. `public/resume.pdf` is the exception and is never edited unless asked.
- **Progressive enhancement:** all content is real DOM text and `<img>`. Particles are decoration. No-JS and `prefers-reduced-motion` show the complete page.
- **Performance:** Lighthouse mobile at least 95 in all four categories; particle engine at most about 15 KB gzipped; self-hosted fonts; no third-party requests.
- **Numbers come from Zach.** Never invent metrics.
- Hero holds individual buttons with icons for Resume, GitHub, LinkedIn and Linktree, the field labels "Aerospace", "Astrospace", "Automotive", and the current projects drifting across it as links (Zach's instruction, 2026-10).
- Current projects (reports in progress, nothing published yet): Quant Trading API, AI Structural Optimizing Agent, Formula 1 Wing Design, Camera Gimbal Mount, Catan AI Player. Their categories (software/hardware) are inferred from the titles; Zach confirms them when each report starts.
- The bonding-fixture take-home names its company only as "an undisclosed electric aerospace company".
- Contact channels that exist today: email (zbcandau@gmail.com), LinkedIn (linkedin.com/in/zachary-candau), Linktree (linktr.ee/zcandont), GitHub (github.com/ZCandont). YouTube, TikTok and Substack do not exist yet; add them only when Zach supplies them.

## Brand Commitments

- Theme from Zach's brief: electric propulsion. Blue for the ion plume, orange for rocket/energy, black space with white star points, lots of particles and small dots floating around that can be moved and that converge into final images at the start of pages or sections. "The more interaction and small touches and details the better."
- The hero name is formed by particles converging on page load; the name is not visible before the particles form it (Zach's instruction, 2026-10). No-JS and reduced-motion visitors see the name immediately.
- The About copy is Zach's own voice and is kept word for word (confirmed 2026-10).
- Copy rules in CLAUDE.md (no em-dashes, no filler verbs, no scroll cues).

## Evidence on Hand

- Case studies with full five-beat bodies: `uav-composite-wing`, `composite-wing-structural-analysis`, `composite-bonding-fixture`, `solar-flare-cnn`, `microstructure-property-prediction` (`src/content/projects/`), with figures in `public/images/projects/<slug>/`.
- Shell-only projects (summary copy only): stepped-lap repair patch (>10 kN), ultrasonic C-scan, FSAE rear wing (8th overall).
- Experience: six roles in `src/pages/index.astro`.
- Photos: `public/images/about/profile-palace-of-fine-arts.jpg`, `public/images/gallery/` (two photos).
- Resume: `public/resume.pdf`.
- Absent, never fabricate: testimonials, view counts, follower counts, performance metrics not in the case studies.

## Product Principles

1. **Recruiter in 30 seconds, explorer for 30 minutes.** The skim path is never blocked by the play layer.
2. **Show judgment, not only results.** The five-beat narrative is the differentiator; every project page carries it.
3. **Play is real but optional.** Interaction rewards curiosity and never gates content.
4. **One file per new thing.** Growth must not need a redesign.
5. **Discretion is part of credibility.** Confidential work stays generic; numbers are Zach's.

## Accessibility & Inclusion

WCAG AA text contrast at minimum. Full keyboard access, visible focus, skip link. Motion respects `prefers-reduced-motion`; the canvas is decorative and hidden from assistive tech.
