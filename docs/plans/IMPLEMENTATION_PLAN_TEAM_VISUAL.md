# Team section — visual polish

**Status:** Signed off 2026-09-28 ([#31](https://github.com/gavinfung321/HKAAA-website/issues/31))  
**GitHub issue:** [#31](https://github.com/gavinfung321/HKAAA-website/issues/31)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A  
**After:** Plans [#18](https://github.com/gavinfung321/HKAAA-website/issues/18)  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused — light trim only)

---

## Goal

Make **Meet Our Team** feel like the same site as Plans / Why Us — two co-founders, readable without hover gimmicks. No hire CTA in this section.

**Page order today:** … Plans → **Team** → Contact

---

## Phase 0 — locked (2026-09-28)

| Decision | Lock |
| --- | --- |
| Join card | **Remove** Become Our Member? / Apply CV |
| Layout | **A — two-up centered** photo plates |
| Readability | Name, role, short bio, LinkedIn **always visible** |
| Copy | Light trim only (full pass #16) |
| Photos | Keep Imgur for now (Phase B) |
| FX | **DesignCode Blaze** (purple smoke + sparks) behind Team — section-scoped. Flame Wrap tried then **removed** (too loud on portraits). |
| Header | Keep Meet Our + gradient **Team** |

---

## What’s wrong today

| Issue | Live section |
| --- | --- |
| Hire CTA in Team | Third “Become Our Member?” card |
| Hover-only content | Bio + LinkedIn opacity 0 until hover |
| Materials cliff | Zinc / purple SaaS after Plans craft |
| Generic voice | “AI innovation,” “creative projects,” “community” |

---

## Content (light trim)

| Slot | Now |
| --- | --- |
| Support | *(removed — cards carry the story)* |
| Gavin | Web design, automation, and AI outreach — building the sites and systems clients run on. |
| Natalie | Content creation and video editing — the stories and media that give each brand a clear voice. |

---

## Approach

### Phase 1 — Implement

1. Restyle `TeamSection.tsx` shell to Phase A padding / `bg-gray-900`
2. Two centered cards; drop join card + unused imports
3. Soft dark plate CSS (family with Plans rim, no iris)
4. Always-visible text + LinkedIn

### Phase 2 — Verify

- Desktop + mobile; `#team-section` nav

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-28 | Issue paused at designer request; code reverted. |
| 2026-09-28 | Phase 0 locked: remove join; A two-up; always-readable; light trim. Reopened #31; implementing. |
| 2026-09-28 | Aura WebGL Laser wired then **removed** — wrong match for background smoke ref. |
| 2026-09-28 | Identified DesignCode courses FX as **Blaze** (`BlazeBackground`); ported behind Team. |
| 2026-09-28 | Locked hover Flame Wrap: Gavin red, Natalie blue. Overlay only (no photo melt). |
| 2026-09-28 | Flame Wrap **removed** — too much on co-founder plates; Blaze backdrop kept. |
| 2026-09-28 | Designer sign-off: shorter photo crop, quiet plates, no hover lift, bios without dashes. Issue closed. |
