---
name: Zachary Candau
description: Aerospace engineer's portfolio as a long exposure. Black sky, color only as light.
colors:
  void: "#03050b"
  plate: "#080c18"
  hairline: "#19223a"
  rule: "#26314f"
  starlight: "#e8eef8"
  haze: "#9aa8c1"
  dim-haze: "#74819b"
  ion-blue: "#4cc9ff"
  deep-ion: "#1e6bff"
  ember: "#ff7a2f"
  ember-hot: "#ffa06a"
  white-hot: "#ffffff"
typography:
  display:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.5rem, 12.6vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 5.4vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-lead:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 112"
  label:
    fontFamily: "'Archivo Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 112"
  data:
    fontFamily: "'Geist Mono Variable', ui-monospace, 'Cascadia Code', Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
    fontFeature: "'tnum'"
rounded:
  radius: "3px"
spacing:
  gutter: "1.25rem"
  gutter-wide: "2rem"
  section: "clamp(5rem, 11vw, 8.5rem)"
  heading-gap: "clamp(2rem, 4vw, 3.25rem)"
  wrap: "76rem"
  nav-h: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.radius}"
    padding: "0.85rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.ember-hot}"
    textColor: "{colors.void}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    typography: "{typography.label}"
    rounded: "{rounded.radius}"
    padding: "0.85rem 1.35rem"
  launch-pad:
    textColor: "{colors.starlight}"
    typography: "{typography.control}"
    rounded: "{rounded.radius}"
    padding: "1rem 1.6rem 1rem 1.25rem"
    height: "3.6rem"
  launch-pad-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
    typography: "{typography.control}"
    rounded: "{rounded.radius}"
    padding: "1rem 1.6rem 1rem 1.25rem"
    height: "3.6rem"
  launch-pad-primary-hover:
    backgroundColor: "{colors.ember-hot}"
    textColor: "{colors.void}"
  back-control:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    rounded: "{rounded.radius}"
    padding: "0.45rem 0.8rem 0.45rem 0.55rem"
  field-tag:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    rounded: "{rounded.radius}"
    padding: "0.4rem 0.75rem"
  skill-tag:
    backgroundColor: "transparent"
    textColor: "{colors.haze}"
    rounded: "{rounded.radius}"
    padding: "0.2rem 0.6rem"
  image-plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.radius}"
  case-card:
    textColor: "{colors.starlight}"
    rounded: "{rounded.radius}"
    padding: "0.85rem 0.85rem 1.25rem"
  nav:
    backgroundColor: "{colors.void}"
    textColor: "{colors.haze}"
    height: "{spacing.nav-h}"
---

# Design System: Zachary Candau

## Overview

**Creative North Star: "Long Exposure"**

The site is a long exposure of an engineer in motion: everything that moves leaves a light trail, and the trail is the record. The ground is a void-black sky with a static star field drawn for every visitor. Color does not exist as paint on surfaces; it exists only as light. Ion blue is the structural light (links, rules, markers, data codes), ember orange is the energy light (the primary call to action, the NOW label, the hot end of a trail), and where the two cross on the particle canvas they add toward white.

Type carries the identity alongside the light. The name and section heads are Archivo pushed to its expanded width (125%) at weight 800 in caps, heavy and wide like a stencil on hardware. Body text is the same family at normal width. Geist Mono speaks only for data: dates, years, category codes and the NOW label. Structure is drawn with hairline rules and a single small radius; nothing floats on a shadowed card. State is shown by a mark (a ring, a traced rule, a streak), never by introducing a new hue.

Density is editorial: generous section spacing, then packed, ruled indexes where information is scanned (skills, the project index). The particle engine is decoration over a complete page. Every word is real DOM text, and no-JS and reduced-motion visitors see the finished page from the first paint. Interaction answers in the same language: the hero's launch pads lift and throw particles off their edges, current projects drift across the sky like ions, and opening a case study from the portfolio passes through a particle storm that re-forms on the next page's heading.

**Key Characteristics:**
- Dark only. One theme, a void-black sky with a fixed star field.
- Two lights: ion blue structural, ember orange for CTAs and energy moments only.
- Archivo Expanded 800 caps for the name and section heads; Geist Mono only for data.
- Hairline rules and one 3px radius; flat surfaces, no card shadows.
- State by mark, never by a new hue.
- Motion animates only transform and opacity; scroll effects are CSS scroll-driven, never scroll listeners.

## Colors

A near-black blue-tinted sky with cool gray-blue text and exactly two emitted colors, which run hot toward white at their brightest point.

### Primary
- **Ion Blue** (colors.ion-blue): the structural light. Links, focus outlines, timeline dots and the current-role ring, mono data codes, meta labels, table headers, list markers, the hover color of project titles, the "Case study" mark, the selection fill, the launch-pad hover border, sweep and tint, the odd-numbered light cores. Roughly 11:1 on the void.
- **Deep Ion** (colors.deep-ion): glows only, never text. Appears as the cold tail of the timeline trail gradient.

### Secondary
- **Ember** (colors.ember): the energy light. The primary button and primary launch-pad fill (with void text), the NOW label, the email underline and hover, the caret, the hot head of trail gradients, the even-numbered light cores, and the orange particle pass. Roughly 8:1 on the void.
- **Ember Hot** (colors.ember-hot): the hover state of an ember fill only (primary button and primary launch pad, fill and border). Never text, never a resting surface.

### Neutral
- **Void** (colors.void): the page ground, the nav (at 92% opacity), the text on ember fills, the knockout ring around timeline dots, the launch-pad ground (at 55% opacity).
- **Plate** (colors.plate): the one raised tone: behind images inside image plates, and as the translucent ground of portfolio case cards (at 72% opacity).
- **Hairline** (colors.hairline): default 1px rules: nav bottom, section rules, index and manifest row rules, plate and card borders, skill-tag borders, footer top.
- **Rule** (colors.rule): the slightly brighter line for emphasis and controls (meta-grid top, ghost button, launch-pad and back-control borders, card hover border, code separators, scrollbar thumb).
- **Starlight** (colors.starlight): headings, primary text, ghost button, launch-pad and back-control text. Roughly 18:1.
- **Haze** (colors.haze): secondary text: prose paragraphs, lead, nav links, skill tags. Roughly 8.4:1.
- **Dim Haze** (colors.dim-haze): tertiary text only: timeline dates, figcaptions, footer, "Write-up soon" marks. Roughly 5.3:1; keep it to small supporting text.
- **White Hot** (colors.white-hot): never a surface or text color. It is where light saturates: the center of every light core (to 18% of the radius, then ion or ember) and the light sweep across the ember launch pad (at 45% opacity).

### Named Rules
**The Light-Only Rule.** Color is emitted, never painted. Blue and orange appear as text, hairlines, markers, gradients and glows; surfaces stay void or plate. The only filled surfaces in a light color are the ember primary controls (one button or launch pad per view) and faint hover tints (12 to 14% ion blue).

**The Ember Budget Rule.** Ember is reserved for the primary call to action and energy moments (NOW, the email close, the hot end of a trail, alternate light cores). One ember button or ember launch pad per view.

**The Mark-Not-Hue Rule.** State is a mark. The current role is a ring on the timeline, not a different color; a hovered row gets a traced rule; a linked index row says "Case study" in blue while an unlinked one says "Write-up soon" in dim; an in-progress project carries a "Report in progress" mark and a Status row in its meta grid, never a status color. Never add a hue to express state.

**The White-Core Rule.** White appears only where the two lights are brightest: the center of a light core and a sweep crossing an ember fill. It is never text, never a fill, never a border.

## Typography

**Display Font:** Archivo Variable at font-stretch 125% (with system-ui, Segoe UI, sans-serif)
**Body Font:** Archivo Variable at normal width (same fallbacks)
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, Cascadia Code, Consolas)

**Character:** One grotesque family stretched two ways: expanded, heavy caps for the voice that names things, normal width for the voice that explains them. Mono is a third voice, strictly for readings.

### Hierarchy
- **Display** (800, clamp(2.5rem, 12.6vw, 7rem), 0.92, caps, 125% wide): the hero name, set as two stacked lines. The portfolio page title uses the same voice at clamp(2.6rem, 9vw, 6rem), 0.95.
- **Headline** (800, clamp(2.25rem, 5.4vw, 4.25rem), 0.95, caps, 125% wide): section heads (h2). The case-study and resume h1 use the same voice at clamp(2rem, 4.8vw, 3.6rem), 115% wide; sub-section heads ("Featured", "Case studies", "In progress", "Earlier work") at clamp(1.3rem, 2.4vw, 1.75rem); in-progress manifest titles at clamp(1.15rem, 2.2vw, 1.6rem); the contact email at clamp(1.35rem, 5.2vw, 3.75rem).
- **Title** (700, about 1.05 to 1.55rem, 1.2 to 1.3, sentence case, 108 to 115% wide): role names, skill names, project titles (the exposure title runs clamp(1.3rem, 2vw, 1.55rem), the first featured one enlarged to clamp(1.6rem, 2.6vw, 2.1rem); inside a case card clamp(1.15rem, 1.7vw, 1.35rem)). Slight extra width keeps them in the display family's orbit without shouting.
- **Body** (400, 1rem, 1.65): default text. Prose blocks run at 1.1rem in haze, max 66ch; the hero lead at clamp(1.1rem, 1.6vw, 1.3rem), 1.5; the case and resume lead at 1.2rem; case-study bodies max 70ch at line-height 1.75.
- **Control** (700, 0.95rem, 0.06em tracking, caps, 112% wide): launch-pad labels. Lane titles use the same voice at clamp(0.95rem, 1.3vw, 1.1rem), 0.78rem on phones.
- **Label** (650 to 700, 0.75 to 0.85rem, 0.06 to 0.08em tracking, caps, 112% wide): buttons and field tags. The back control is 600 at 0.85rem, sentence case.
- **Data** (Geist Mono 400, 0.72 to 0.8rem, 0.06em tracking, caps for codes, tabular numerals): dates, years, category codes, meta-grid labels, table headers, the NOW label.

The small-text ladder is deliberate and steps by about 0.05rem: 0.72rem (codes, marks, NOW), 0.75rem (captions, field tags, table heads, footer hint), 0.8rem (skill tags, timeline dates), 0.85rem (button labels, brand, back control, footer), 0.9rem (nav links), 0.95rem (launch pads, the NOW strip, tables), 1rem (body). Stay on these steps rather than adding new ones.

### Named Rules
**The Two-Widths Rule.** Expanded caps (125%) name things: the hero name, the portfolio title, section and sub-section heads, in-progress project names, the brand, the email close. Everything else is normal width or only slightly widened (108 to 115%) for titles, controls and labels.

**The Readings-Only Mono Rule.** Geist Mono is used only for dates, years, codes, counts and the NOW label. Never for body, headings or buttons.

## Layout

A single centered column (max 76rem) with 1.25rem gutters, widening to 2rem from 48rem. Sections breathe at clamp(5rem, 11vw, 8.5rem) vertical padding; heads sit clamp(2rem, 4vw, 3.25rem) above their content.

The hero fills the first viewport (100dvh minus the 4rem nav). The name sits upper left; from 60rem a side column (16 to 22rem) carries the lead and field tags; the launch-pad row spans below (a two-by-two grid under 40rem). Under the pads the current-projects lane runs edge to edge (clamp(11rem, 26vh, 16rem) tall, 7.5rem with three rows on phones), and a hairline strip at the bottom carries the current role. On a phone the whole hero, NOW strip included, fits one screen.

Information that is scanned is laid out as ruled indexes: the experience timeline (a 10.5rem date column, a vertical trail, the role), the skills definition list (2fr / 3fr from 52rem), the in-progress manifest and the earlier-work index (15rem code column, title and text, mark at the end from 52rem). Featured projects on the homepage and the case-study cards on /portfolio share one staggered two-column rule from 52rem: even items dropped 6rem, the first title enlarged, so no row of equal cards forms. The gallery is a horizontal scroll-snap strip (items min(36rem, 82vw)).

/portfolio stacks three blocks at clamp(2.5rem, 6vw, 4.5rem): case studies (the staggered deck), in progress (the manifest), earlier work (the ruled index). A project page opens with a back control, the h1, the lead and a ruled meta grid (Status first when the project is in progress); an in-progress page carries a short in-progress note in place of the five-beat body.

Breakpoints in use: 40rem (nav drops the brand, meta grid stacks, pads go two-by-two, lane goes to three rows), 44rem (timeline collapses to one column with the trail at the left edge; manifest rows wrap code and mark under the title), 48rem (wider gutters), 52rem (two-column about, skills, featured, deck, index), 60rem (hero side column). Full-height uses dvh, never vh.

## Elevation & Depth

Flat. Depth comes from light and layering, not shadows: a fixed star field (two tiled star SVGs at 70% opacity) at the bottom of the z-scale, the particle canvas on the same layer drawing additive trails, then content on the void. The raised tones are the plate behind images and the translucent plate of portfolio case cards, both bordered by a hairline and casting nothing. The nav is solid void at 92% with a hairline, no blur.

### Shadow Vocabulary
- **Ember glow** (`box-shadow: 0 10px 28px -14px var(--ember)`): under the primary button, a soft emitted glow, not an offset block.
- **Pad glow** (`box-shadow: 0 14px 34px -16px var(--ember)`): the same emitted glow, scaled up for the larger primary launch pad.
- **Knockout ring** (`box-shadow: 0 0 0 4px var(--bg)`): cuts timeline dots out of the trail line.

### Named Rules
**The Light-Not-Lift Rule.** Nothing casts a shadow. A surface reads as forward because it emits (a glow, a brighter rule) or moves on hover, never because it sits on a drop shadow. Lift is a hover response of interactive controls only: 2px for buttons, 3px for launch pads. Cards, plates and rows never lift; they answer with a brighter rule.

## Shapes

One radius, 3px, for buttons, launch pads, the back control, tags, image plates, case cards, embedded images, the resume embed and focus outlines. Circles are reserved for markers of light: timeline dots and rings, and the light cores of current projects. Lines are 1px hairlines in hairline or rule; the thicker lines are the 2px ember underline on the email close and the 2px trail behind a light core. Rules can carry a gradient (blue to ember, or ember to blue to deep ion) when they represent a trail.

## Components

### Buttons
Tactile and quick: the button lifts, the fill fades in on a layer.
- **Shape:** gently squared (3px).
- **Primary:** ember fill, void text, Label type, 0.85rem by 1.35rem padding, ember glow beneath. One per view, used for the main intent of an inner page (Download PDF on the resume).
- **Ghost:** transparent with a rule border and starlight text; for secondary destinations (case-study links, Open in new tab).
- **Hover / Focus:** translateY(-2px) over 0.25s on the ease-out curve; an overlay layer fades to full opacity (ember hot for primary, 14% ion blue for ghost, whose border turns ion blue). Active presses back to scale(0.98). Focus is a 2px ion-blue outline offset 3px.

### Launch Pads (signature)
The hero's controls, larger and louder than buttons: a Tabler outline icon (1.6rem, stroke 1.6, inlined as SVG at build time) beside a Control-type label, min height 3.6rem, rule border on a 55% void ground. One primary pad (Resume) in ember with the pad glow; the rest are outline pads. The same outline pad closes the homepage projects section ("Open the full portfolio").
- **Hover / Focus:** the pad lifts translateY(-3px) over 0.35s, the border turns ion blue (ember hot on the primary), a diagonal light sweep crosses left to right over 0.9s (38% ion blue; white hot at 45% on the primary), a 12% ion tint fades in (ember hot on the primary), and the icon scales 1.18 and tilts -8deg. The particle engine throws a burst off the pad's edges (ember particles for the primary).
- **Press:** scale(0.97) and a radial particle burst from the pointer.

### Back Control
A bordered navigation control, not a text link: Tabler arrow-left icon (1.1rem) plus a sentence-case label ("Back to portfolio", "Back home"), 0.85rem at 600, rule border, 3px radius. Hover turns the border ion blue and slides the arrow 3px left.

### Chips
- **Field tag:** caps Label type at 0.75rem, 650 weight, 1px border mixed from ion blue (45%) and rule; the hero's three field labels.
- **Skill tag:** 0.8rem haze text with a hairline border, 3px radius; 3 to 4 per timeline role.

### Cards / Containers
Images sit in **image plates**: 1px hairline border, 3px radius, plate background, clipped, with a dim 0.75rem caption. Every photo and project figure uses the plate.

**Case cards** exist only on /portfolio, by request, for the complete case studies: a project exposure wrapped in a hairline-bordered, 3px, 72% plate ground with 0.85rem padding (1.25rem bottom), closed by a blue "Case study" mark. Hover brightens the border to rule; no shadow, no lift of the card itself. Cards are always laid out on the staggered two-column rule, never three equal in a row, and nowhere else on the site.

### Navigation
Sticky 4rem bar, void at 92% with a hairline bottom. Brand at left in expanded 800 caps (0.85rem); links in haze at 0.9rem, starlight on hover. Below 40rem the brand hides and the links center. Inner pages add the back control above the h1.

### Experience Timeline (signature)
A vertical hairline with a second line over it, a gradient trail from ember through ion blue to deep ion that exposes (scaleY 0 to 1) as the list scrolls through view. Each role has an 8px ion-blue dot knocked out of the line; the current role is a 13px ion-blue ring with a slow outward ping and its date in ion blue. Dates are mono, dim.

### Ruled Index (signature)
Skills and the earlier-work index are rows separated by hairlines. Each row's top rule exposes left to right (scaleX) as it enters view and traces again on hover (blue to ember for skills, solid blue for projects). A project row is fully clickable only when a case study exists; the trailing mark states which ("Case study" in blue, "Write-up soon" in dim).

### Project Exposure (signature)
A featured project as a link: 16:10 plate, mono code line with an exposure rule that grows from 12% to full width on hover or focus, an enlarged title that turns ion blue on hover, haze summary. Each exposure drifts a few pixels on its own 8 to 11.5s loop (transform only), staggered. Plain on the homepage ("Featured"); wrapped as a case card on /portfolio.

### Current-Projects Lane (signature)
The in-progress projects as light cores crossing the hero band. Each link is a 1.5rem light core (white hot center, ion or ember alternating, fading out by 72%) trailing a 6.5rem, 2px gradient tail, beside a Control-type caps title. Rows sit at 19% steps; each link crosses left to right (translateX from -24rem to 100vw, 44s plus 6s per row, linear, looping, staggered) while bobbing on the drift loop. Hover or focus on the band, or a touch tap of the band, parks every link; a hovered link turns ion blue and its core scales 1.5. Phones run three rows (7.5rem band, 1.1rem cores, 70s laps, two items per row half a lap apart). Without motion the lane is a static wrapped list of the same links.

### In-Progress Manifest (signature)
On /portfolio, the in-progress projects as a ruled list: light core, expanded caps title, the first two code fields, and a "Report in progress" mark. Cores alternate ion and ember and pulse (scale 1 to 1.45 over 2.6s, half-cycle offset). Hover or focus turns the title ion blue. Under 44rem the code and mark wrap under the title.

### Particle Sky (signature)
One fixed, pointer-transparent canvas behind content, one animation loop, additive blending, every particle drawn as a short trail in ion blue or ember. Modes:
- **Converge:** on load, two color passes streak in and register into the hero name. The real h1 stays hidden (opacity 0) until the passes land, then exposes slowly over 2.6s (opacity through 0.55 at 45%, scale 0.985 to 1); a CSS failsafe reveals it at 6s regardless.
- **Residue:** after the name forms, light trails keep streaming off its letters.
- **Ambient:** ions drift and wrap around the sky (fewer on mobile).
- **Cursor:** the pointer is a small thruster, repelling and swirling nearby particles and leaving an exhaust trail while moving.
- **Fire:** press and hold anywhere that is not a control to fire a plume.
- **Gather:** hovering the formed name dims the letters and the particles re-form it.
- **Trace:** section heads are traced by particles as they scroll into view (IntersectionObserver).
- **Burst:** hovering a launch pad throws particles off its edges; pressing one throws them radially.
- **Storm:** clicking a portfolio card or manifest row swirls a vortex out of it while the page fades (main and footer to opacity 0, scale 0.985); the destination opens inside the storm (its content held at opacity 0 by a flag set before first paint), the storm converges onto the page's h1, then the content fades in. A CSS failsafe reveals the content at 3.2s, and a page restored from the back/forward cache comes back whole.

Without JavaScript, or with reduced motion, the engine never runs and the motion class is never set: the name, all text and the static star field are present from first paint, scroll-driven rules render fully drawn, exposures and lane links sit still, storm links navigate normally, and the footer's interaction hint is hidden.

## Do's and Don'ts

### Do:
- **Do** keep the page dark only, on the void with the static star field behind everything.
- **Do** use ion blue for structure (links, rules, markers, data) and ember only for the primary CTA and energy moments.
- **Do** set the name and section heads in Archivo at 125% width, weight 800, caps; body in Archivo at normal width.
- **Do** reserve Geist Mono for dates, years, category codes, counts and the NOW label.
- **Do** use the one 3px radius on every rectangle, and 1px hairline or rule lines for structure.
- **Do** express state with a mark: a ring, a traced rule, a text mark.
- **Do** animate only transform and opacity, gate decorative motion behind the motion class, and drive scroll effects with CSS scroll timelines or IntersectionObserver.
- **Do** frame every photo in an image plate with a dim caption.
- **Do** keep text pairs at WCAG AA or better; dim haze is for small supporting text only.
- **Do** take icons from Tabler outline, inlined as SVG at build time, and stay on the small-text ladder for sizes.
- **Do** give every motion surface a complete static state: the lane becomes a list, storm links navigate, the name is simply there.

### Don't:
- **Don't** introduce a light theme, a third accent hue, or a new hue to signal state.
- **Don't** use deep ion as text; it is a glow color.
- **Don't** put more than one ember button or ember launch pad in a view, or use ember for structural elements.
- **Don't** use drop shadows, glass blur or shadowed cards; depth is light, and lift is a hover response of buttons and launch pads only.
- **Don't** lay out three equal cards in a row or a uniform card grid; use ruled indexes and staggered exposures, with case cards only on /portfolio on the staggered two-column rule.
- **Don't** use Geist Mono for headings, body or buttons.
- **Don't** add window scroll listeners, animate layout properties, or use 100vh.
- **Don't** let the particle canvas carry content; every word stays real DOM text and the page is complete without it.
- **Don't** use white as text, fill or border; it exists only at the core of the light.
