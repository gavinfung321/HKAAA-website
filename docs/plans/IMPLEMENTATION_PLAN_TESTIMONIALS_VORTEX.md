# Testimonials — vortex particle background

**Status:** Phase 0 locked — implementing.  
**GitHub issue:** [#28](https://github.com/gavinfung321/HKAAA-website/issues/28)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / visual tighten  
**After:** Testimonials strip [#19](https://github.com/gavinfung321/HKAAA-website/issues/19); card polish [#27](https://github.com/gavinfung321/HKAAA-website/issues/27)  
**Inspiration:** DesignCode / shadcn-style `Vortex` particle spiral — method only  

---

## Goal

Put a **quiet spiral vortex** behind the testimonials marquee so the strip bridges:

**Hero** (soft cloud-field) → **Testimonials** (ambient particles) → **Process** (cool laser matrix)

Cards stay primary; background is atmospheric only.

---

## Locked from designer

| Choice | Value |
| --- | --- |
| Effect | **Vortex** (not diagonal neon streak shader) |
| Technique | **Three.js** Points (same spiral seed as reference) — no R3F / no shadcn theme utils |
| Palette | Cool violet → soft blue rim (match hero / Process night blues) |
| Strength | Low opacity (~0.3–0.45); additive points |
| Motion | Slow Y rotation; pause off-screen; reduced-motion = frozen frame |
| Fades | Top fade from `gray-900` (hero), bottom fade into Process |

---

## Approach

### Phase 0

- [x] Vortex chosen over streak shader
- [x] Cool regrade + low opacity + fades

### Phase 1

- [x] `VortexBackground` under `src/components/effects/vortex/`
- [x] Wire into `TestimonialsSection` behind content
- [x] Top / bottom vignette fades

### Phase 2

- [ ] Desktop + mobile visual check
- [ ] Reduced-motion / off-screen pause

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-28 | Direction locked (vortex). Implementing with Three.js (no R3F). |
| 2026-09-28 | Vortex unwired from Testimonials for now — solid `bg-gray-900`; component kept for later. |
