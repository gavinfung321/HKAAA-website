# Testimonials after hero — implementation plan

**Status:** Complete — signed off and merged.  
**GitHub issue:** [#19](https://github.com/gavinfung321/HKAAA-website/issues/19)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A  
**Reference:** [designcode.io](https://designcode.io/) post-hero proof strip (method only)  
**After:** Hero craft [#14](https://github.com/gavinfung321/HKAAA-website/issues/14)  
**Follow-up:** Dark paper / vellum card material — [#27](https://github.com/gavinfung321/HKAAA-website/issues/27) / [IMPLEMENTATION_PLAN_TESTIMONIALS_PAPER.md](IMPLEMENTATION_PLAN_TESTIMONIALS_PAPER.md)

---

## Goal

Put a calm, auto-moving **proof strip** directly under the hero so trust shows up before Process / Services / Plans — without cloning DesignCode’s “120k enrolled” product energy.

---

## What DesignCode does (and what we’ll do better)

| DesignCode | HKAAA approach |
| --- | --- |
| Proof strip soon after hero | **Same placement** — immediately under hero |
| Infinite horizontal quote cards + avatars | **Soft CSS marquee**, slow **right → left** (no dots) |
| Job titles + names; big social number in headline | **No fake headcount**; name + role only (**no company names**) |
| Continuous motion | Auto-move; **hover pauses strip**; **only the hovered card** goes grayscale → color |
| Global / mixed faces | **Mix:** prior clients (John / Robby / Mike) + **Asian** personas (Daniel / Mei / Sophia) |
| Dense card chrome | Quieter cards so the cloud-field hero still wins |

**Do not copy:** enrollment counts, dual marquees of the same quotes, course-product framing.

---

## Locked from designer (confirm in Phase 0 + revision)

- Placement: **next section after hero**
- Faces: **Asian personas + keep prior client portraits** mixed in the strip
- Remove **company names** and **@handles**
- Motion: **soft marquee**, slow R→L; **no dots**
- Hover: strip **pauses**; **per-card** color only (not whole strip)
- Heading: designer picking from options below (interim in code: **B**)
- Portraits: Asian headshots need **varied backgrounds + poses** (not same studio gray)

---

## Target composition

```
┌─────────────────────────────────────────────┐
│  Hero … soft fade                           │
├─────────────────────────────────────────────┤
│  Short heading (quiet, two lines)           │
│  ←  [card] [card] [card] [card] …  →        │
│      slow R→L · hover pauses strip          │
│      hover card only → color                │
└─────────────────────────────────────────────┘
│  Next section (Process / Services / …)      │
```

Each card: portrait · first name · short role · short quote. No stars.

---

## Content model (v1)

| Field | Rule |
| --- | --- |
| `name` | First name only — no @handles |
| `role` | Role only — **no company** |
| `image` | Prior clients: existing remote portraits OK for now; Asian personas: `public/testimonials/` |
| `quote` | Keep prior client quotes (light polish); Asian personas: website / automation / HK reality |

**Count:** 6 cards (3 prior + 3 Asian), duplicated for seamless loop.

**Honesty note:** Generated Asian portraits are stand-ins until real client photos exist. Do not invent fake companies.

---

## Heading options (designer pick)

| ID | Lines | Note |
| --- | --- | --- |
| **A** | Trusted by founders who / ship sites that work | Original; designer disliked |
| **B** *(interim in code)* | Sites that work. / Clients who stay. | Short, quiet |
| **C** | Built for founders / who need the site done right | Service-forward |
| **D** | Real clients. / Real results in Hong Kong. | Place-forward |
| **E** | From first site / to the systems that run after | Continuity with hero voice |

Swap the `<h2>` in `TestimonialsSection` when designer locks one.

---

## Motion / interaction

| State | Behavior |
| --- | --- |
| Default | CSS `.testimonial-marquee` ~70s linear infinite, `translate3d(0→-50%)` (R→L) |
| Hover strip | `animation-play-state: paused` |
| Hover card | That card only: image grayscale-0 + quote lightens |
| `prefers-reduced-motion` | Static wrap row; no continuous move |

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Placement after hero; soft marquee; no dots/arrows/stars; no company names
- [x] +3 Asian personas + mix with prior John / Robby / Mike
- [x] Heading: **B** locked — “Sites that work.” / “Clients who stay.” (gradient accent)

**Phase 0 locked.**

#### Personas in strip

| Name | Role · industry | Source |
| --- | --- | --- |
| John | Founder · Marketing | Prior client portrait |
| Daniel | CPA Partner · Accounting | `public/testimonials/accountant.png` |
| Robby | Growth lead · Agency | Prior client portrait |
| Mei | Brand lead · Retail | `public/testimonials/ecommerce.png` |
| Mike | Content lead · Media | `public/testimonials/mike.png` (regenerated) |
| Sophia | CEO · Consulting | `public/testimonials/ceo.png` |

One Founder + one CEO only; others use distinct titles + industry.

### Phase 1 — Content + assets

- [x] 6-card mix (prior + Asian)
- [x] Asian headshots regenerated with varied bg / pose (v2)
- [x] Prior client remote images retained for now

### Phase 2 — Build

- [x] Section under hero in `App.tsx`
- [x] Soft marquee via `index.css` (not Tailwind-only) for reliable motion
- [x] Per-card hover color; strip pause on hover
- [x] Reduced-motion static wrap

### Phase 3 — Verify

- [x] Desktop: slow R→L; hover pauses; **only hovered card** colors (purple fill)
- [x] Mobile: readable; touch doesn’t fight scroll
- [x] Reduced-motion: no continuous motion
- [x] Mixed faces; no company names
- [x] Heading locked + designer sign-off (no Portal Field; soft seam into `bg-gray-900`)

---

## Acceptance criteria

- [x] Phase 0 direction approved
- [x] Testimonials under hero
- [x] Slow R→L marquee; hover pause; **per-card** purple hover
- [x] Prior + Asian mix; no company names
- [x] Desktop + mobile + reduced-motion verified
- [ ] Issue closed after sign-off + merge

---

## Related issues

| Issue | Note |
| --- | --- |
| [#18](https://github.com/gavinfung321/HKAAA-website/issues/18) Plans visual | Plans stays **later**; post-hero slot is testimonials |
| [#17](https://github.com/gavinfung321/HKAAA-website/issues/17) Process visual | Still after proof |
| [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) Site copy | Paused |

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from DesignCode proof strip + designer brief. Issue #19 opened. |
| 2026-09-27 | Phase 0 locked; soft marquee + 3 Asian headshots + DesignCode-style heading. |
| 2026-09-27 | Revision: heading options A–E; restore John/Robby/Mike mixed with Asians; CSS marquee 70s R→L; per-card color only; regenerate Asian portraits (varied bg/pose). |
| 2026-09-27 | Roles: one Founder + one CEO; others titled + industry; Daniel → CPA Partner; Mike portrait regenerated locally. |
| 2026-09-27 | Daniel/Mei/Sophia portraits v3: candid workplace poses + detailed environments (desk/shop/boardroom), not plain headshots. |
| 2026-09-27 | DesignCode-taller cards + 3D chrome/hairlines/numbers; purple hover fill; gradient Sites/Clients; Portal Field rejected; soft hero seam. Designer signed off. |
