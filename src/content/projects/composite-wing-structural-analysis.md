---
title: Composite vs Aluminum Wing Structural Analysis
summary: Wrote a MATLAB analysis tool for wing bending, torsion and shear, then used it to show an optimized composite wing can weigh 5.8x less than an equivalent-margin aluminum wing.
category: analysis
org: ucsd-course
year: "2023"
role: "Solo (individual MATLAB assignment)"
teamSize: 1
tools: [MATLAB, Composite mechanics, Structural analysis]
featured: true
links: []
---

SE 160B: Aerospace Structural Analysis II, UC San Diego.

## Spotted

For this course project I wrote a 436-line MATLAB function that fully analyzes a single-cell, four-stringer wing under bending, torsion and shear, given arbitrary geometry, material properties and aerodynamic loading. I then used that tool to answer a real design question: once every load case is required to have a positive margin of safety, how much weight can composite construction actually save over aluminum on the same wing?

## Root cause

The wing carries lift, drag and moment loads (modeled as chordwise polynomials) plus a distributed maneuvering wing weight, evaluated at cruise and all four corners of the V-n diagram (PHAA, PLAA, NHAA, NLAA). My function derives the section's modulus-weighted centroid, torsion constant and shear center, integrates the internal load resultants along the span, then computes stringer axial stress and skin shear stress at the root, their margins of safety, and tip displacement and twist.

## Plan

Baseline both an aluminum (7075-T6) and a carbon/epoxy wing at the same fixed stringer area and skin thickness across all five load cases, then iterate each design down to the minimum stringer area and skin thickness that keeps every margin of safety at or above zero, so the two materials could be compared on a genuinely apples-to-apples basis, both fully margin-optimized rather than just default sizing.

## Iterations

| Design | Stringer area | Skin thickness | Wing weight | Governing margins |
|---|---|---|---|---|
| Aluminum, baseline | 2.5 in^2 | 0.05 in | 358.6 lb | Negative at PHAA and PLAA (not viable) |
| Aluminum, optimized | 5.5 in^2 | 0.05 in | 670.3 lb | All >= 0 |
| Composite, baseline | 2.5 in^2 | 0.05 in | 200.8 lb | All >= 0 already |
| Composite, optimized | 1.6 in^2 | 0.0225 in | 115.9 lb | All >= 0 |

Bringing the baseline aluminum design to a viable, margin-positive design meant adding 311.7 lb. Bringing the baseline composite design to its minimum viable sizing meant removing 84.9 lb, the opposite direction, while every margin stayed positive.

## Proof it's final

The optimized composite wing came out 5.78x lighter than the optimized aluminum wing carrying identical load cases (115.9 lb vs. 670.3 lb), with every margin of safety at or above zero in both designs. The result is not "composite wins outright": composite's manufacturing cost, cure cycles and layup complexity are real costs a pure weight comparison hides, and the right material choice depends on program priorities, not just this table.

## Skills applied to later work

This margin-driven, iterate-to-minimum-viable-weight workflow, size a baseline, find every negative margin, converge on the lightest design that clears zero everywhere, is the same process I use for real structural sizing today.
