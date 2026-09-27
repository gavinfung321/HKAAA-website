# Portal Field hero background — implementation plan

**Status:** Implementation in progress on `feat/issue-7-portal-field-hero` — Phase 0 approved.  
**GitHub issue:** [#7](https://github.com/gavinfung321/HKAAA-website/issues/7)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / hero visual  
**Scope:** Ambient WebGL field behind existing hero copy (not a 3D narrative scene).

---

## Goal

Replace the current CSS `AuroraBackground` on the first viewport with the **Portal Field / cloud-field (Strata)** ambient shader so the hero feels closer to the DesignCode-quality reference — without shipping Strata marketing UI, course cards, or `@designcodeio/threeui` as a package dependency.

Keep the HKAAA hero job intact: **brand + one headline + one supporting line + Calendly CTA**. The field is background only.

---

## What we are adopting (and what we are not)

### Adopt

| Piece | Source of truth | Role on HKAAA |
| --- | --- | --- |
| Cloud-field fullscreen WebGL (fbm mountain layers, stars, meteor, mouse parallax) | Authored `strata-cloud` / portal-field **cloud-field** shader + host lifecycle (verified Portal Field skill sources) | Full-bleed hero backdrop |
| React host pattern | Sized, overflow-hidden parent; canvas `pointer-events-none`; lazy mount; cleanup on unmount | Drop-in under `#hero-section` |
| Readability overlay | Radial darken behind type (as in Strata demo) | Keep CTA/text legible |

### Do not adopt

- Strata page chrome (nav, GA badge, stats strip, GSAP reveal sections, feature cards, Inter + violet product UI)
- Entire `PortalFieldCollection` multi-variant UI unless we later want a sandbox — **hero ships one variant first**
- Approximations / “similar looking” ShaderToy demos — use the authored GLSL and host behavior from the verified sources the designer provided

### License / ownership note

Implementation copies **authored shader + host code into this repo** (local components), not a live scrape of designcode.io and not a hard dependency on `@designcodeio/threeui`. Confirm you have rights to use that source in HKAAA before merge to `main`. If rights are unclear, stop at plan approval and do not ship.

---

## Target composition (first viewport)

```
┌─────────────────────────────────────────────┐
│  Header (existing, above / over hero)       │
│                                             │
│     [WebGL cloud-field — full bleed]        │
│        + soft radial vignette               │
│                                             │
│     Transform Your Business…                │
│     supporting line                         │
│     [ Book a Free Strategy Call ]           │
│                                             │
└─────────────────────────────────────────────┘
```

Rules:

1. One composition — not a dashboard; no stats row, countdown, or package list in the hero.
2. Canvas stays behind content; clicks hit the Calendly CTA.
3. Palette decision before code: keep violet grade **or** regrade via uniforms/`hue`/`saturation`/`brightness` toward HK night (deep blue / ink) so it does not read as a Strata clone. **Decided: regrade** (cooler / less violet) while keeping layer structure intact.

---

## Approach (phased)

### Phase 0 — Approve direction (this plan)

- [x] Confirm: ambient cloud-field behind hero (replace Aurora)
- [x] Confirm: rights to use the authored Portal Field / Strata cloud sources in this repo
- [x] Confirm palette: keep violet vs regrade for HKAAA → **regrade** (cooler HK night, less violet)
- [x] Confirm scope: **cloud-field only** for v1 (other Portal Field variants optional later)

**Phase 0 complete — implementation approved.**

### Phase 1 — Local effect module (sandbox-quality host)

1. [x] Add a local module under `src/components/effects/cloud-field/`.
2. [x] Port the **cloud-field** renderer from the verified HTML/WebGL source (shaders + host lifecycle).
3. [x] Wrap in React `CloudFieldBackground` with resize, DPR clamp, RAF, mouse smooth, teardown.
4. [x] HK-night palette regrade in fragment colors (less violet).

**Out of scope for Phase 1:** installing `@designcodeio/threeui` as the runtime (package may exist in repo; hero uses local canvas), porting all five variants, Strata HTML page.

### Phase 2 — Wire into HKAAA hero

1. [x] In `App.tsx` `#hero-section`, replace `AuroraBackground` with cloud-field host + radial scrim + existing copy/CTA.
2. [x] Canvas `pointer-events-none`; Calendly CTA clickable.
3. [x] Header still targets `#hero-section`.

### Phase 3 — Motion, mobile, a11y

- [x] `prefers-reduced-motion: reduce` → freeze time (single static frame)
- [x] Pause loop when hero off-screen (IntersectionObserver) + tab hidden
- [x] Mouse parallax; time-based drift when idle
- [ ] Recheck mid-phone FPS after visual sign-off (optional trim)
- [x] Context-loss: stop RAF on `webglcontextlost`

### Phase 4 — Polish + verify

- [x] Desktop browser check: canvas present, WebGL drawing, hero CTA visible
- [x] Mobile viewport walkthrough (designer sign-off)
- [x] Contrast / type legibility sign-off
- [x] Parent checklist ticked; close GitHub issue after merge

### Optional later (separate issue)

- Lazy collection: `flow-field`, `bell-field`, `stream-convergence`, `portal-field` variants for experimentation only
- Scroll-linked subtle speed change (not a full cinematic camera)

---

## Technical notes

| Topic | Decision |
| --- | --- |
| Runtime | Raw WebGL for cloud-field (as in strata HTML). Three.js only if a sibling variant requires it — do not force Three for this first ship. |
| Dependencies | Prefer **no new npm package** for the effect. Add `three` only if a later variant needs ShaderMaterial and is approved. |
| Assets | None (procedural). |
| Copy | Out of scope unless bundled: fix “surcharge leads” stays on the main plan checklist (can be same PR if tiny). |
| DesignCode landing | Reference for quality bar only; do not port their enroll UI. |

### Host sketch (orchestration only — shaders come from verified source)

```tsx
<div id="hero-section" className="relative min-h-[100svh] overflow-hidden bg-[#050510]">
  <CloudFieldBackground className="absolute inset-0 pointer-events-none" />
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(...)]" />
  <div className="relative z-10 …">
    {/* existing h1, p, Calendly CTA */}
  </div>
</div>
```

---

## Acceptance criteria

- [x] Plan approved (Phase 0)
- [x] Hero uses authored cloud-field WebGL (or approved collection entry) instead of Aurora
- [x] Headline + Calendly remain primary; canvas does not steal clicks
- [x] Reduced-motion and off-screen pause behave correctly
- [x] Desktop + mobile verified; no leaked RAF/listeners on teardown
- [x] Strata/DesignCode marketing chrome not shipped
- [ ] Issue closed with verification comment after merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from Portal Field skill + strata-cloud WebGL source + DesignCode reference video. No code. |
| 2026-09-27 | Harbour cinematic (#5) closed as not planned. This plan is the only hero visual path. |
| 2026-09-27 | Phase 0.1 approved: cloud-field behind hero (replace Aurora). |
| 2026-09-27 | Phase 0.2 approved: rights to ship authored Portal Field / Strata cloud sources. |
| 2026-09-27 | Phase 0.3 approved: palette regrade (cooler HK night, less violet). |
| 2026-09-27 | Phase 0.4 approved: cloud-field only for v1. Implementation started. |
| 2026-09-27 | Local `CloudFieldBackground` wired into hero (replace Aurora). Desktop WebGL verified. |
| 2026-09-27 | Designer visual sign-off: cooler HK-night regrade kept. |
