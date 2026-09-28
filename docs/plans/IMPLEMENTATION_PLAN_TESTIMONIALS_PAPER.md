# Testimonials — brand 3D plate polish

**Status:** Phase 0 locked — implementing Option A (brand 3D plate).  
**GitHub issue:** [#27](https://github.com/gavinfung321/HKAAA-website/issues/27)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / visual tighten  
**After:** Testimonials strip [#19](https://github.com/gavinfung321/HKAAA-website/issues/19)  
**Inspiration:** Plans card lighting language (bevel + sheen + tilt) — solid plate, no glass blur  
**Related:** Japanese certificate / gold / hanko pass superseded; frosted-vellum / matte-paper passes superseded

---

## Goal

Make each testimonial card read as a **brand-tinted 3D plate** — solid dark fill, violet/white bevel, pointer sheen, restrained tilt — so the strip has depth without competing with Plans glass or Japanese certificate chrome.

Keep placement, personas, copy, marquee motion, and hover-pause from [#19](https://github.com/gavinfung321/HKAAA-website/issues/19).

**Page order today:** Hero → **Testimonials** → Process → Why Us → Services → Plans → Team → Contact

---

## Locked from designer (Phase 0)

| Choice | Value |
| --- | --- |
| Material | **A — Brand 3D plate** (solid, not glass, not gold certificate) |
| Technique | **CSS only** — no Three.js |
| Scope | **All six** cards |
| Accent | **Brand violet / soft white** bevel + sheen |
| Tilt | Keep restrained **±3° X / ±4° Y** (liked) |
| Chrome | Simple quote layout — **no** hanko / 認定 / gold frame / stamp |
| Distinct from Plans | No `backdrop-filter` blur; more opaque plate |

---

## What we dropped

- Japanese certificate framing, gold hairlines, vermilion seal, stamp box
- Gold palette (`#C6A35C`)
- Over-dampened sheen that made cards read flat

---

## Target material stack

```
┌─────────────────────────────────────┐
│ violet–white dual-fill bevel border │
│ solid dark plate fill               │
│ soft grain                          │
│ pointer sheen (brand violet/white)  │
│ portrait · name · role · quote      │
│ depth shadow + hover translateZ     │
│ restrained tilt                     │
└─────────────────────────────────────┘
```

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Option **A** locked (after Japanese certificate rejected)
- [x] Keep tilt; drop gold / Japanese chrome
- [x] Brand bevel + stronger sheen for 3D read

**Phase 0 locked.**

### Phase 1 — Restyle cards

- [x] Retune `.testimonial-card` (bevel border, solid fill, sheen, depth shadow, translateZ hover)
- [x] Strip certificate chrome from `TestimonialsSection`
- [x] Keep tilt handlers + marquee / reduced-motion

### Phase 2 — Verify

- [ ] Desktop: depth reads on hover; tilt still subtle; marquee pause OK
- [ ] Distinct from Plans glass
- [ ] Mobile + reduced-motion OK

---

## Acceptance criteria

- [x] Phase 0 direction approved (Option A)
- [ ] All six cards use brand 3D plate (no gold / Japanese chrome)
- [ ] Restrained tilt preserved
- [ ] #19 marquee behaviors preserved
- [ ] No Three.js on the strip
- [ ] Desktop + mobile + reduced-motion verified

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-28 | Drafted as dark paper / vellum; later Japanese certificate pivot. |
| 2026-09-28 | Designer: Japanese + gold don’t fit; tilt good; not 3D enough. |
| 2026-09-28 | Phase 0: Option A brand 3D plate locked. Implementing. |
