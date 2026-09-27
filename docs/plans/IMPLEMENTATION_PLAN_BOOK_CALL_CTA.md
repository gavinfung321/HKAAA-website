# Book a Call CTA — gradient beam button

**Status:** Draft for review — **do not code until this plan is approved.**  
**GitHub issue:** [#11](https://github.com/gavinfung321/HKAAA-website/issues/11)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / hero + pricing CTAs  
**Reference video:** `Book a call button.mp4` (gradient-beam rotating border)  
**Authored source:** `gradient-beam-cta.html` (Rectangle Buttons / ThreeUI skill — DOM + CSS only)

---

## Goal

Replace the current purple→pink filled Calendly CTAs with a **gradient-beam** pill button labeled **Book a Call**, matching the authored rotating border-beam treatment (conic beam, inner dots, hover glow, arrow).

Keep Calendly as the destination. Do not add a chat widget.

---

## What we are adopting (and what we are not)

### Adopt

| Piece | Source of truth | Role on HKAAA |
| --- | --- | --- |
| Gradient-beam pill CTA | Authored `gradient-beam-cta` markup + CSS (`beam-spin`, dots pattern, hover glow) | Primary Calendly CTA look |
| Label | Product decision | **Book a Call** |
| Arrow icon | Same treatment as source (lucide-style chevron right) | Affordance |

### Do not adopt

- Full `RectangleButtons` / 24-variant catalog
- `@designcodeio/threeui` as a runtime dependency (port the one CTA locally, same as cloud-field)
- Preview-page centering scripts from the sandbox HTML
- Changing Calendly URL or booking flow

### License / ownership

Ship a **local React port** of the authored DOM/CSS. Confirm rights to use that source before merge (same rule as Portal Field).

---

## Current CTAs to update

| Location | Today | After |
| --- | --- | --- |
| Hero (`App.tsx`) | “Book a Free Strategy Call” — purple/pink fill | **Book a Call** — gradient-beam |
| Pricing (`PricingSection.tsx`) | “Book a strategy call” — purple/pink fill | **Book a Call** — same component |

One shared component so hero and pricing stay consistent.

---

## Target look

```
┌─────────────────────────────────────┐
│  BOOK A CALL  →                     │  ← dark pill, uppercase tracking
│  (orange/brand beam spins on edge)  │
└─────────────────────────────────────┘
```

From the video / HTML:

- Pill (`rounded-full`), dark zinc fill, subtle top gradient
- Animated **conic-gradient** border beam (spin ~3s linear)
- Inner **dot grid** (slow drift)
- Bottom glow; stronger on hover
- Slight scale + shadow on hover
- Label + right arrow

---

## Approach (phased)

### Phase 0 — Approve direction

- [ ] Confirm label: **Book a Call** (not “Book a Free Strategy Call”)
- [ ] Confirm scope: **hero + pricing** both use the new CTA (recommended)
- [ ] Confirm palette: keep reference **orange** beam **or** regrade to HKAAA **purple/pink** so it matches the site
- [ ] Confirm rights to ship the authored gradient-beam HTML in this repo
- [ ] Confirm: uppercase + tracking like the reference, or sentence case “Book a Call”

**Do not code until Phase 0 is checked.**

### Phase 1 — Local CTA component

1. Add something like `src/components/ui/GradientBeamCta.tsx` (or `effects/gradient-beam-cta/`).
2. Port the authored button structure:
   - Outer beam ring (`conic-gradient` + `beam-spin`)
   - Inner fill + dots + hover glow
   - Label slot + optional arrow
3. Render as a real `<a>` (or `button` wrapping link) with:
   - `href` → Calendly
   - `target="_blank"` `rel="noopener noreferrer"`
   - Visible focus style (do not drop keyboard focus)
4. Props: `href`, `children` (default “Book a Call”), `className`
5. `prefers-reduced-motion: reduce` → stop `beam-spin` and `dots-move` (static beam position OK)

### Phase 2 — Wire into the site

1. Hero: replace the current fill CTA with `<GradientBeamCta href={CALENDLY}>Book a Call</GradientBeamCta>`
2. Pricing: same component / same label
3. Optional: extract shared `CALENDLY_URL` constant if not already shared
4. Remove unused purple-fill classes from those two anchors only

### Phase 3 — Verify

- [ ] Desktop: beam animates; hover scale/glow; click opens Calendly
- [ ] Mobile: tap target large enough; no layout jump
- [ ] Reduced-motion: no continuous spin
- [ ] Keyboard: Tab focus visible; Enter/Space activates link
- [ ] Hero readability over cloud-field still OK

---

## Technical notes

| Topic | Decision |
| --- | --- |
| Runtime | DOM + CSS only (no Three.js / WebGL) |
| Dependencies | Prefer **no** `@designcodeio/threeui`. Local component only. |
| Fonts | Use existing site type; do not pull SF Pro subsets unless needed |
| Brand clash | If Phase 0 picks purple/pink, map `#ea580c` beam/glow to brand accents; keep structure identical |

### Host sketch

```tsx
<a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="group … rounded-full …">
  {/* beam ring + inner fill from authored source */}
  <span className="relative z-10">Book a Call</span>
  {/* arrow svg */}
</a>
```

---

## Acceptance criteria

- [ ] Phase 0 approved
- [ ] Label is **Book a Call** on hero (and pricing if in scope)
- [ ] Gradient-beam treatment matches authored behavior (spin, dots, hover)
- [ ] Calendly still opens correctly
- [ ] Reduced-motion and focus verified
- [ ] No ThreeUI package required at runtime
- [ ] Issue closed with verification; parent checklist updated

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from gradient-beam-cta HTML + Book a call button.mp4. No code. |
