# Footer — visual polish + wireframe landscape

**Status:** Signed off 2026-09-29 ([#33](https://github.com/gavinfung321/HKAAA-website/issues/33))  
**GitHub issue:** [#33](https://github.com/gavinfung321/HKAAA-website/issues/33)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A  
**After:** Contact [#32](https://github.com/gavinfung321/HKAAA-website/issues/32) signed off  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (light trim); DesignCode footer landscape as **visual reference only** (we author our own)

---

## Goal

Close the page with a finished footer: real columns (no empty grid holes), website-first blurb, socials, and a **DesignCode-style wireframe landscape** as the atmospheric close — not another SaaS strip.

**Page order today:** … Contact → **Footer**

**Reference:** designcode.io footer — dark field + topographic wireframe mesh (mountains / cones) under link columns. We match the *idea* (wire landscape under type), not their sitemap density or assets.

---

## Phase 0 — locked (2026-09-28)

| # | Decision | Lock |
| --- | --- | --- |
| 1 | Landscape tech | **A** Authored Three.js wireframe terrain |
| 2 | Palette | **A** Cool HK night (soft blue-gray / faint violet) |
| 3 | Motion | **A** Very slow drift; pause off-screen; reduced-motion → still |
| 4 | Placement | **A** Full-bleed behind footer content + scrims |
| 5 | Columns | **B** Lean 3-up: Brand · Explore · Connect |
| 6 | Explore links | Process, Why Us, Services, Plans, Team, Contact |
| 7 | Blurb | From first site to automation. One team in Hong Kong. (no Kwun Tong) |
| 8 | Socials | Keep four; quieter chips |
| 9 | Legal | **A** Copyright only |
| 10 | Book a Call | **A** None in footer |

---

## Phase 0 — proposed (archive)

| # | Decision | Options | Recommend |
| --- | --- | --- | --- |
| 1 | **Landscape tech** | See landscape options below | **A** — authored Three.js wireframe terrain |
| 2 | **Landscape palette** | **A** Cool HK night (soft blue-gray / faint violet). **B** Pure DesignCode light-gray on black. **C** Strong purple mesh. | **A** — brand-adjacent, not a Strata clone |
| 3 | **Landscape motion** | **A** Very slow drift / gentle camera sway. **B** Static mesh. **C** Scroll-linked. | **A** — quiet presence; pause off-screen + reduced-motion → static |
| 4 | **Layout** | **A** Landscape full-bleed behind footer content. **B** Landscape only in a bottom band under a solid link row. **C** Links only, no landscape. | **A** — closest to reference; type sits over fade |
| 5 | **Content columns** | **A** Collapse to brand + socials + copyright (no empty cells). **B** Lean 3-up: Brand · Explore · Connect. **C** Fat DesignCode-style multi-sitemap. | **B** — fills the hole without fake density |
| 6 | **Explore links** | In-page anchors: Process, Why Us, Services, Plans, Team, Contact | Yes if **5 = B** |
| 7 | **Blurb** | Replace AI boilerplate (options below) | Pick one at lock |
| 8 | **Socials** | Keep FB / IG / X / LinkedIn; quieter chips (Contact-style muted, not purple hover wash) | Keep set; restyle chrome |
| 9 | **Legal** | **A** Copyright only. **B** + Privacy / Terms placeholders. | **A** until real pages exist |
| 10 | **Book a Call** | **A** None in footer. **B** Small text link to Calendly. **C** Full GradientBeamCta. | **A** or **B** — avoid third beam |

### Landscape tech (1) — detail

| Option | What | Pros | Cons |
| --- | --- | --- | --- |
| **A** Authored Three.js wireframe | Heightmapped plane → `WireframeGeometry` / line segments; section-scoped canvas under footer (same host pattern as Vortex / Blaze) | Closest to DesignCode; full control; `three` already in repo for testimonials | More build + perf care |
| **B** Static image / short loop | Art-directed PNG/WebM of wire terrain | Cheap, zero GPU risk | Flat; less “alive”; asset production |
| **C** CSS/SVG faux mesh | Decorative SVG hills | Lightest | Rarely reads as the reference |
| **D** Spline embed | External scene | Fast prototype | Heavy; Spline script already on hygiene “remove if unused” list — avoid |

**Recommend A.** Author locally (no scraping DesignCode meshes). Rights: our heightmap + shader/material only.

**Perf rules (if A):** one canvas; `IntersectionObserver` pause when off-screen; `prefers-reduced-motion` → freeze or swap to still; DPR cap like other effects.

### Content sketch (if 5 = B)

```
[ wireframe landscape — full bleed, dark ]

  HKAAA + short blurb     Explore              Connect
  socials                   Process              Phone
                            Why Us               Email
                            Services             (socials if not under brand)
                            Plans
                            Team
                            Contact

  © 2026 HKAAA. All rights reserved.
```

Type sits on a top scrim / bottom fade so wireframe doesn’t kill contrast (same lesson as Team over Blaze).

### Blurb options (no dashes)

1. Websites and automation for Hong Kong businesses, when you’re ready.
2. From first site to automation. One team in Kwun Tong.
3. Clear websites. SEO and AI when the business needs them.

**Lean pick (locked):** From first site to automation. One team in Hong Kong.

---

## What’s wrong today

| Issue | Live footer |
| --- | --- |
| Empty columns | 4-col grid with two blank cells — unfinished |
| Copy | “Transform businesses through innovative AI solutions…” |
| Materials | Thin black/50 bar; no atmosphere after Contact |
| Social chrome | Purple hover wash — old SaaS |
| No close | Page ends without a visual beat |

**Keep:** Real social URLs, logo + HKAAA wordmark, copyright year, Contact details available elsewhere (don’t duplicate the whole address block unless Explore/Connect needs a short line).

---

## Out of scope

| Item | Why |
| --- | --- |
| Copying DesignCode assets / HTML | Reference only; author our terrain |
| Fat 8-column sitemap | HKAAA is a one-pager; empty links look fake |
| Privacy / Terms pages | No routes yet |
| Reintroducing Spline viewer | Hygiene debt; Three local is enough |
| Full #16 voice pass | Light trim only |

---

## Approach (after lock)

### Phase 1 — Implement

1. Restructure `Footer.tsx` per locked columns + blurb
2. Port / author wireframe landscape effect (if **1 = A**) under footer with fades
3. Quiet social chips; copyright bar
4. Desktop + mobile; reduced-motion check

### Phase 2 — Verify

- Landscape readable under type; no illegible links
- Pause off-screen; no jank on Contact → Footer scroll
- Social links still work

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-28 | Phase 0 drafted. Designer wants DesignCode-like landscape; recommend Three.js wireframe (**A**) + lean 3-up columns (**B**). No code. |
| 2026-09-28 | Phase 0 locked: all recommends; blurb without Kwun Tong → “One team in Hong Kong.” Implementing. |
| 2026-09-28 | Issue [#33](https://github.com/gavinfung321/HKAAA-website/issues/33) opened; wireframe landscape + Footer rebuild in progress. |
| 2026-09-28 | Pointer parallax added (DesignCode engraved-terrain pattern: soft cam follow). |
| 2026-09-28 | Landscape → HK wireframe skyscraper cluster (box edges + ground grid). |
| 2026-09-29 | Terrain-first: drop building farm; DesignCode-style ridges + sparse cones; pointer kept. |
| 2026-09-29 | Designer sign-off for now. Issue closed. |
