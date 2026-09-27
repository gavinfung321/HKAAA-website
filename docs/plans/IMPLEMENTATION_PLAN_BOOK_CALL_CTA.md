# Book a Call CTA — gradient beam button

**Status:** Implementation in progress on `feat/issue-11-book-call-cta` — Phase 0 approved.  
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

- [x] Confirm label: **Book a Call** (not “Book a Free Strategy Call”)
- [x] Confirm scope: **hero + pricing** both use the new CTA (recommended)
- [x] Confirm palette: keep reference **orange** beam **or** regrade to HKAAA **purple/pink** so it matches the site → **regrade purple/pink**
- [x] Confirm rights to ship the authored gradient-beam HTML in this repo
- [x] Confirm: uppercase + tracking like the reference, or sentence case “Book a Call” → **Book a Call** (sentence case)

**Phase 0 complete — implementation approved.**

### Phase 1 — Local CTA component

1. [x] Add `src/components/ui/GradientBeamCta.tsx`.
2. [x] Port authored beam ring, inner fill, dots, hover glow, arrow.
3. [x] Real `<a>` to Calendly with focus-visible ring.
4. [x] Default label **Book a Call**; purple/pink regrade.
5. [x] `motion-safe:` animations (reduced-motion stops spin/dots).

### Phase 2 — Wire into the site

1. [x] Hero uses `<GradientBeamCta />`.
2. [x] Pricing uses same component.
3. [x] Shared `CALENDLY_URL` exported from the CTA module.

### Phase 3 — Verify

- [x] Desktop: label + beam present; Calendly link (hero + pricing)
- [x] Mobile viewport sign-off
- [x] Reduced-motion sign-off (CSS media query)
- [x] Designer visual sign-off (glass face + spinning beam)
- [ ] Issue closed after merge

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
| 2026-09-27 | Phase 0 approved: Book a Call; hero+pricing; purple/pink regrade; rights OK; sentence case. |
| 2026-09-27 | Implemented `GradientBeamCta` on hero + pricing. Awaiting visual sign-off. |
| 2026-09-27 | Glass face + fixed spinning beam; designer signed off hero CTA. |
