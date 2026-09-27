# Glass floating header — implementation plan

**Status:** Draft for review — **do not code until this plan is approved.**  
**GitHub issue:** [#13](https://github.com/gavinfung321/HKAAA-website/issues/13)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / nav  
**Reference:** `Nav bar.mp4` + Animated Top Dock `modern` (method only)  

---

## Goal

Replace the full-width solid black `Header` with a **floating glass pill** nav that matches the hero + Book a Call polish, while keeping HKAAA’s one-page section jumps.

**Spring magnification:** desktop fine-pointer only.  
**Reduced-motion / coarse pointer / narrow screens:** static layout, fully usable.

---

## What we are adopting (and what we are not)

### Adopt (adapted)

| Piece | From reference | On HKAAA |
| --- | --- | --- |
| Floating centered (or inset) glass pill bar | Modern top dock chrome | Over cloud-field hero |
| Logo left · links center · action right | Modern layout | HKAAA logo + wordmark · section links · Contact |
| Soft proximity spring on items | `topDockController` spring (0.19 / 0.70, ~122px) | Desktop only; subtle, not macOS-dock extreme |
| Frosted face | Glass CTA language | `backdrop-blur` + translucent fill |

### Do not adopt

- Full `AnimatedTopDock` package / all four variants (sable, retro, glass vertical rail)
- Demo IA: Product / Solutions / Docs / Sign in / Start building / Lumina mark
- Demo stage copy (“Everything above the fold”)
- Icon+label for every item unless we explicitly decide icons help (default: **text links**, optional tiny icons later)
- WebGL / Three.js shader fields for the nav
- `@designcodeio/threeui` as a runtime dependency

---

## Current vs target

| | Today | Target |
| --- | --- | --- |
| Shape | Full-bleed solid black bar | Floating glass pill (inset from edges) |
| Links | Process, Why Us, Our Services, Plans, Team | Same scroll targets |
| CTA | Contact Us (outline pill) | Contact Us (glass-compatible; not competing with hero Book a Call) |
| Motion | None | Desktop spring grow/lift on proximity + focus |
| Mobile | Hamburger drawer | Keep hamburger; no spring |

---

## Target composition (desktop)

```
┌────────────────────────────────────────────────────────────┐
│  [logo HKAAA]   Process  Why Us  Services  Plans  Team   [Contact Us]  │
│              ← floating glass pill, not edge-to-edge →                │
└────────────────────────────────────────────────────────────┘
```

Sits fixed near the top with horizontal margin; hero content still readable underneath.

---

## Approach (phased)

### Phase 0 — Approve direction

- [ ] Confirm: **glass floating header** (not full Top Dock drop-in)
- [ ] Confirm: **spring on desktop fine-pointer only**; reduced-motion + coarse + mobile = static
- [ ] Confirm: keep current section labels (no Product/Docs rename)
- [ ] Confirm: text links (no icons) for v1
- [ ] Confirm: right action stays **Contact Us** (scroll to contact), not Book a Call (hero owns that)
- [ ] Confirm: bar centered with max-width vs full-width with side padding

**Do not code until Phase 0 is checked.**

### Phase 1 — Glass shell

1. Refactor `Header.tsx` (or extract `GlassFloatingHeader.tsx`) into a floating pill:
   - `fixed` top, horizontal inset, `z-50`
   - `rounded-full` (or large radius), `backdrop-blur`, translucent fill, light border
   - Logo + HKAAA · nav buttons · Contact Us
2. Preserve `scrollToSection` wiring for all existing section IDs.
3. Keep mobile hamburger + drawer; drawer can stay full-width below the pill or as a sheet.
4. Ensure header does not block hero CTA clicks (pointer events / layout gap).

### Phase 2 — Desktop spring

1. Port **only** the proximity-spring math from `topDockController` (or a minimal local equivalent):
   - measure item boxes at rest
   - influence from pointer distance (default proximity ~122)
   - spring 0.19 / damping 0.70
   - cap growth (width/height/drop) so it stays subtle next to the hero rotator + beam CTA
2. Enable when:
   - `matchMedia('(pointer: fine)')`
   - `min-width` desktop breakpoint (e.g. `md`)
   - NOT `prefers-reduced-motion: reduce`
3. Mirror influence for keyboard `:focus-visible` so Tab users get a clear active item.
4. Teardown: observers, listeners, RAF on unmount.

### Phase 3 — Verify

- [ ] Desktop: glass pill reads over cloud-field; spring feels subtle
- [ ] Reduced-motion: no spring; nav still works
- [ ] Coarse pointer / mobile: no spring; hamburger works
- [ ] All section jumps + Contact Us still correct
- [ ] No layout jump / CLS when spring engages
- [ ] Designer visual sign-off (“how it looks”)

---

## Technical notes

| Topic | Decision |
| --- | --- |
| Runtime | DOM + CSS (+ small JS spring). No WebGL in nav. |
| Dependencies | No `@designcodeio/threeui`. Local port of spring helper if needed. |
| Imgur logo | Keep for now; owned-asset move stays Phase B. |
| Scroll state | Optional: slightly denser glass when `scrollY > 0` (not solid black). |

---

## Acceptance criteria

- [ ] Phase 0 approved
- [ ] Floating glass header replaces solid full-bleed bar on desktop
- [ ] Spring only on desktop fine-pointer without reduced-motion
- [ ] Mobile + reduced-motion remain usable and static
- [ ] Section navigation unchanged in behavior
- [ ] Issue closed after visual sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from Nav bar.mp4 + Animated Top Dock modern analysis. No code. |
