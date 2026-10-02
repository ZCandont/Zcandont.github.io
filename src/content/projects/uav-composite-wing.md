---
title: UAV Composite Wing
summary: Led design, analysis and manufacturing of a carbon fiber UAV wing from concept to a whiffletree test that exceeded its ultimate load case.
category: hardware
org: ucsd-team
year: "2024"
role: "Technical Lead (design phase), then Team Lead (analysis and manufacturing)"
teamSize: 5
tools: [SolidWorks, Abaqus, MATLAB, Carbon fiber layup, Vacuum bagging]
featured: true
links: []
---

Senior Design capstone, UC San Diego. Team of five: Zachary Candau (Technical Lead, then Team Lead), Alex Wang (Chief Engineer), Cory Girard, Ryan Murphy and Aidan Sung.

<figure>
<img src="/images/projects/uav-composite-wing/fixture-assembly-wrench.jpg" alt="Zachary Candau tightening a bolt on the wing's test fixture with a wrench" loading="eager">
<figcaption>Assembling the test fixture ahead of the whiffletree load test.</figcaption>
</figure>

## Spotted

Our capstone goal was to design, analyze and manufacture a small carbon fiber UAV wing from nothing to a tested final product, sized to given aerodynamic and maneuvering load requirements. I started as Technical Lead through the design phase, then moved into Team Lead once the project shifted into analysis and manufacturing, where my strengths were more useful to the team.

## Root cause

Before any structural sizing, we had to find which flight condition actually governed the design. Comparing the four corners of the V-n diagram, the positive high angle-of-attack case (PHAA) occurs at a higher angle of attack (14.5 degrees) than the positive low angle-of-attack case (PLAA, 6.5 degrees), but PLAA produced larger loads at max C_L/C_D. That made PLAA the governing case, and every structural analysis that followed used loads derived from it: a piecewise chordwise and spanwise pressure distribution, partitioned at the wing's quarter-chord.

## Plan

The plan was to validate a simplified Preliminary Design Review (PDR) wing model by hand calculation, lock a structural configuration, then build a full global FEA model (foam core, skin and spar meshed as one assembly) for the Critical Design Review (CDR), and finally verify every prediction against a physical whiffletree test.

## Iterations

- **Spar configuration.** The structural configuration iterated to a final short-spar design (carbon fiber over foam, layup `[45, 0, 0, 45, 0, 45, 0, 45, 0, 45]` with ply drops) after the aileron design changed.
- **Global model construction.** The foam core geometry was converted from SolidWorks, then the skin was generated from the foam's outer face so skin and foam elements shared mesh nodes. The spar was tied to the foam core with a tie constraint, representing how it was actually laid up with microspheres holding it in the foam cutout.
- **Mesh convergence.** Before trusting the model's failure predictions, we ran a convergence study across four element sizes (0.5 in down to 0.0625 in, 40,000 to 133,000 elements) and confirmed the peak stress had converged.
- **Hand calculation vs FEA.** Root stress hand-calculated with My/I gave 2,296 psi; the FEA model gave 2,571 psi, about 12% error. Tip deflection from the PDR simplified model (1.23 in) was checked against the CDR global model (1.11 in), also about 12% error. Both checks were close enough to trust the global model for design decisions.
- **Manufacturing.** The skin was vacuum-bagged over the foam core and spar to cure the layup under uniform pressure, the step that turned the analysis into an actual physical wing.

<figure>
<img src="/images/projects/uav-composite-wing/vacuum-bag-layup.jpg" alt="Three team members vacuum-bagging the wing skin over its foam core, with a senior design poster titled Design, Build, and Certify a Composite Wing for Long Endurance UAS in the background" loading="lazy">
<figcaption>Vacuum-bagging the skin layup over the foam core and spar.</figcaption>
</figure>

## Proof it's final

Before physical testing, the CDR analysis predicted five governing failure modes under the aerodynamic ultimate load case, each with a positive margin of safety: buckling at the top of the spar (MS 3.7), shear at the spar root (MS 5.5 and 7.1), and compression at the spar and skin (MS 11.5 and 29.3). Translated into the whiffletree test setup for the Test Readiness Review, the predicted first failure (spar buckling) corresponded to 340% of the test's limit load, with a spar bending failure load of about 521 lbf against a factor of safety of 9.3.

<figure>
<img src="/images/projects/uav-composite-wing/whiffletree-test-setup.jpg" alt="The wing's whiffletree test setup with chains and shackles suspending point loads along the span" loading="lazy">
<figcaption>Whiffletree test setup, applying point loads along the span to match the predicted load distribution.</figcaption>
</figure>

<figure>
<img src="/images/projects/uav-composite-wing/test-setup-chains.jpg" alt="Two wing sections suspended by chains in the whiffletree test rig, with a team member at the monitoring station in the background" loading="lazy">
<figcaption>Monitoring the load test from the data acquisition station.</figcaption>
</figure>

The wing was then tested in the whiffletree rig and exceeded its ultimate load case without failure, consistent with the predicted margins.
