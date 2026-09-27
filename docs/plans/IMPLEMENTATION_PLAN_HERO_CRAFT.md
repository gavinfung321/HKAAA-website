# Hero craft pass — implementation plan

**Status:** Done — awaiting merge for [#14](https://github.com/gavinfung321/HKAAA-website/issues/14).  
**GitHub issue:** [#14](https://github.com/gavinfung321/HKAAA-website/issues/14)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / Hero visual  
**Reference:** [designcode.io](https://designcode.io/) craft bar (method only — not a layout clone)  
**Builds on:** [#7](https://github.com/gavinfung321/HKAAA-website/issues/7) cloud-field · [#9](https://github.com/gavinfung321/HKAAA-website/issues/9) rotating copy · [#11](https://github.com/gavinfung321/HKAAA-website/issues/11) beam CTA

---

## Goal

Raise the first viewport to DesignCode **quality** (voice, composition, materials) without becoming a DesignCode **enroll page**.

Keep the HKAAA hero job: **one composition** — brand + one headline + one supporting line + one CTA + full-bleed cloud field.

---

## Why this pass (gap vs DesignCode)

| Gap | DesignCode | HKAAA today | Response in this plan |
| --- | --- | --- | --- |
| Visual role | Field / particle **is** the stage | Cloud field is wallpaper behind centered type | Recompose so the field owns more of the frame |
| Voice | Sharp POV headline | Generic “Transform your business with better…” | Rewrite headline; keep rotator only if it still fits |
| Materials | Specular glass CTA / chrome | Flat blur + fill | Deepen **Book a Call** only |
| Trust | Proof near CTA | None in hero | One quiet proof line (not a stat strip) |
| Seam | Continuous scroll craft | Hard cut into Process | Soft bottom fade |

### Do not adopt from DesignCode

- Countdown / limited-time chrome
- Price stack / dual CTAs / package chip rows
- Sub-nav strip under header
- Glass Top Dock / `#13` floating spring header
- New WebGL variants (cloud-field stays)

---

## Target composition (first viewport)

```
┌──────────────────────────────────────────────────────────┐
│  Header (existing transparent → solid on scroll)         │
│                                                          │
│   [HKAAA lockup]     │     [cloud-field owns right/    │
│   POV headline       │      majority of the frame]     │
│   supporting line    │                                 │
│   [ Book a Call ]    │                                 │
│   quiet proof        │                                 │
│                                                          │
│  ░░░░░ soft fade into Process ░░░░░                      │
└──────────────────────────────────────────────────────────┘
```

Desktop: type **left / offset**; field readable as the stage (not only a vignette behind centered text).  
Mobile: stack type above; field remains full-bleed behind; no side-by-side squeeze.

Rules:

1. One composition — no stats row, badges cluster, or second CTA.
2. Brand test: strip the nav; the first screen must still read as HKAAA.
3. Clicks still hit Book a Call; canvas stays `pointer-events-none`.

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Confirm: craft pass on **existing** hero (cloud-field + beam CTA stay); no new WebGL product
- [x] Confirm composition: **left / offset type** on desktop (mobile stacked)
- [x] Confirm brand lockup: **quiet wordmark / logo above headline** in hero
- [x] Confirm voice: **Elevate with better** + rotator; subline locked (below)
- [x] Confirm rotator: **Websites / SEO / Chatbots / Automation** (option A)
- [x] Confirm proof: **short text** under CTA
- [x] Confirm materials: deepen **Book a Call only** (no glass dock / nav redesign)
- [x] Confirm seam: soft bottom fade into Process

**Phase 0 complete — implementation approved.**

#### Locked copy

| Piece | Text |
| --- | --- |
| Headline | `Elevate with better` + rotator |
| Rotator | Websites · SEO · Chatbots · Automation |
| Subline | We build your next-level website, drive organic traffic, and deploy AI when you’re ready. |
| Proof (v1) | From first site to automation. One team in Hong Kong. |

### Phase 1 — Voice + composition

1. [x] Lock headline + subline (and rotator decision).
2. [x] Extract `HeroSection.tsx`:
   - Desktop: offset / left type column; field remains full-bleed
   - Mobile: centered stack
3. [x] Quiet brand lockup above headline — muted “HKAAA” wordmark only (no icon/gradient); full logo stays in nav.
4. [x] Keep one CTA: `GradientBeamCta`.

### Phase 2 — Materials + proof + seam

1. [x] Deepen Book a Call glass (specular rim, stronger inset, outer depth).
2. [x] Proof line: “From first site to automation. One team in Hong Kong.”
3. [x] Soft bottom fade into Process.
4. [x] Rotator phrases updated; reduced-motion paths unchanged.
5. [x] Rotator polish: no blur ghost; clipped slide only.
6. [x] Typography / spacing micro-pass on hero stack.

### Phase 3 — Verify

- [x] Desktop: composition reads as stage + type; brand test passes
- [x] Mobile: type legible; no layout collapse; CTA tappable
- [x] Reduced-motion: usable, no essential motion-only meaning
- [x] No DesignCode enroll chrome crept in
- [x] Designer visual sign-off

---

## Technical notes

| Topic | Decision |
| --- | --- |
| Files | Primarily hero block in `App.tsx`; `GradientBeamCta.tsx`; optional `HeroSection.tsx` extract; cloud-field host unchanged unless fade needs a wrapper |
| Dependencies | None new |
| Nav | Keep current full-width header (transparent → solid). Out of scope: [#13](https://github.com/gavinfung321/HKAAA-website/issues/13) |
| Copy ownership | Final POV line is a designer decision; agent may draft options only |

---

## Acceptance criteria

- [x] Phase 0 approved
- [x] Hero still one composition (brand, headline, support, one CTA, field)
- [x] Brand test passes without relying on the nav alone
- [x] Materials on Book a Call feel deeper without a dock redesign
- [x] Soft seam into Process
- [x] Desktop + mobile + reduced-motion verified
- [ ] Issue closed after visual sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from DesignCode comparison (voice / composition / materials). No code. Issue #14 opened. |
| 2026-09-27 | Phase 0 partial: keep field+CTA; brand in hero; short proof; deepen Book a Call; bottom fade. Awaiting composition yes, headline letter, rotator set. |
| 2026-09-27 | Phase 0 locked: Elevate with better + Websites/SEO/Chatbots/Automation; left/offset; implementation started on `feat/issue-14-hero-craft`. |
| 2026-09-27 | Optional polish pulled into #14: rotator ghost fix, type/spacing micro-pass. Named-client proof reverted; final proof line locked. Designer sign-off; commit/PR/merge. |
