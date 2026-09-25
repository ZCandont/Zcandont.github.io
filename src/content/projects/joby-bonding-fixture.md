---
title: Composite Bonding Assembly Fixture
summary: Designed a bonding assembly fixture for a bonded carbon fiber wing structure and wrote the full assembly work instructions, for a Joby Aviation technical interview.
category: hardware
org: personal
year: "2025"
role: "Solo (take-home technical assessment)"
teamSize: 1
tools: [CAD fixture design, GD&T, 3-2-1 clamping, Work instructions]
featured: true
links: []
---

Take-home technical assessment for Joby Aviation: design and illustrate an assembly fixture to bond a set of carbon fiber wing parts (two spars, two ribs) together, then write the assembly sequence and work instructions.

## Spotted

The parts: two spars with different bottom-surface shapes and two ribs that sandwich between them, all bonded carbon fiber, pre-cured (so no vacuum bagging needed). The fixture had to hold every part in the right position for bonding, using standard machining tools rather than custom-manufactured parts.

<figure>
<img src="/images/projects/joby-tooling/fig1-rough-sketch.png" alt="Rough sketch of the initial fixture concept, sketched on an iPad, with the key vertical-support idea circled" loading="lazy">
<figcaption>Initial concept sketch. The circled details became the vertical supports and padding that made the final design work.</figcaption>
</figure>

## Root cause

The two spars have different bottom-surface geometry, so they cannot simply sit flat on a table. That was the real constraint: whatever held them had to create a common, flat mounting plane for two differently-shaped parts, while still letting one spar move axially (to close the bond gap around the ribs) and the other stay fully fixed.

## Plan

Support both spars on machined foam padding shaped to each spar's underside, sitting on vertical supports that set a consistent height. Fix one spar completely; let the other slide axially on the T-hole table so the ribs can be sandwiched between them and bonded in place, then clamp everything for a 24-hour cure.

## Iterations

- **Origin and datum.** An L-shaped end plate at the assembly's origin, bolted down, gives the whole fixture a repeatable coordinate system (X spanwise, Y chordwise, Z vertical).
- **Fixing Spar 1.** Vertical clamp supports plus padding hold Spar 1 at a set height; an L-shaped back plate and a spring guide against the tip fully constrain it before anything else is placed.

  <img src="/images/projects/joby-tooling/fig3-vertical-clamp-supports.jpeg" alt="Vertical clamp supports and vertical supports in place on the T-hole table" loading="lazy">

  <img src="/images/projects/joby-tooling/fig4-spar-on-padding.jpeg" alt="Spar 1 placed on padding and vertical supports, clamped with screw clamps and constrained by the back plate" loading="lazy">

- **Locating the ribs.** Locating pins placed at measured T-hole coordinates align the ribs to the sanded, adhesive-ready sections of Spar 1, verified by visual inspection before any adhesive goes on.
- **Closing the joint.** Spar 2 sits on its own vertical clamp supports, free to slide, until the ribs are bonded and clamped to Spar 1. Then Spar 2 slides in the negative Y direction to close on the ribs under firm pressure and locks in place.

  <img src="/images/projects/joby-tooling/fig5-spar2-constrained.jpeg" alt="Spar 2 constrained along X and Z axes, vertical clamp supports still moveable along Y for bonding" loading="lazy">

  <img src="/images/projects/joby-tooling/fig6-ribs-adhered-spar1.jpeg" alt="Ribs adhered to Spar 1, clamped, with Spar 2 about to move into position" loading="lazy">

## Proof it's final

The finished 24-step assembly sequence, from surface prep and adhesive mixing through final clamp-up and cure, fully constrains every part at every stage (I checked and noted this explicitly for both spars in the instructions) using only standard clamps, locating pins and machined padding, no custom-manufactured tooling. Assumptions were stated up front (spar/rib naming, adhesive type, patch dimensions) so the design could be reviewed against them directly.

<figure>
<img src="/images/projects/joby-tooling/fig8-final-assembly-curing.png" alt="Ribs clamped to Spar 1, Spar 2 moved into position and clamped, ready to cure" loading="lazy">
<figcaption>Final assembly, clamped and ready for the 24-hour cure.</figcaption>
</figure>

<figure>
<img src="/images/projects/joby-tooling/assembly-animation.gif" alt="Animation of Spar 2 sliding into its bonded position against the ribs" loading="lazy">
<figcaption>Spar 2 closing onto the ribs, the final assembly move described above.</figcaption>
</figure>
