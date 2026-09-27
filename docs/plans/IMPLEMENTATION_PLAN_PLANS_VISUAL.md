# Plans section — visual + placement

**Status:** Draft for review — **do not code until Phase 0 is approved.**  
**GitHub issue:** [#18](https://github.com/gavinfung321/HKAAA-website/issues/18)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A  
**Offer model (locked):** [IMPLEMENTATION_PLAN_PRICING.md](IMPLEMENTATION_PLAN_PRICING.md) / [#1](https://github.com/gavinfung321/HKAAA-website/issues/1)  
**After:** Hero craft [#14](https://github.com/gavinfung321/HKAAA-website/issues/14)  
**Related:** Process visual [#17](https://github.com/gavinfung321/HKAAA-website/issues/17) (pause until placement locked); site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused)

---

## Goal

Show **what you can buy** in a layout that continues the hero’s craft — then one Book a Call.

**Plans ≠ Process**

| | Plans | Process |
| --- | --- | --- |
| Job | Offer shelf | Delivery path |
| Answers | “What do I get?” | “How do we work?” |

---

## Locked offer (do not reopen in this issue)

- Three tiers: **Launch** · **Practice** (Most chosen) · **Partner**
- No dollar amounts, Stripe, or toggles
- One CTA for the section (Calendly), not per card
- Short blurb + 3–4 bullets per tier (copy from pricing plan unless Phase 0 trims further)
- Quote line once: “Every plan is quoted to your scope.”

---

## What it looks like today

Three glass/gradient cards in a row, Practice scaled up, centered section title, CTA under the grid. Content is mostly right; **materials and placement** feel like pre-hero craft (heavy purple wash, card stack, late on the page).

---

## Target look (wireframe)

```
┌─────────────────────────────────────────────────────────────┐
│  Hero (Elevate… · Book a Call · cloud field)                │
│  ░░░ soft fade ░░░                                          │
├─────────────────────────────────────────────────────────────┤
│  Plans                                                      │
│  Short support line (website first; AI when ready)          │
│                                                             │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐               │
│  │ Launch   │  │ Practice ★   │  │ Partner  │               │
│  │ one line │  │ one line     │  │ one line │               │
│  │ • • •    │  │ • • • •      │  │ • • •    │               │
│  └──────────┘  └──────────────┘  └──────────┘               │
│                                                             │
│  Every plan is quoted to your scope.                        │
│            [ Book a Call → ]                                │
└─────────────────────────────────────────────────────────────┘
```

Desktop: three columns. Mobile: stacked Launch → Practice → Partner (Practice still marked).

---

## Visual direction options (pick in Phase 0)

| Option | Look | Notes |
| --- | --- | --- |
| **A — Quiet offer rail (recommended)** | Three columns, light border / soft fill, **no** purple gradient wash or scale pop; Practice marked with a small label only; shared left/type rhythm with hero | Best match to hero restraint |
| **B — Featured middle** | Keep Practice slightly emphasized (border or label) but drop `scale-105` / heavy gradient panel | Closer to today, calmer |
| **C — Single comparison list** | One list / table of three tiers (not three cards) | Least “pricing card”; more editorial |

**Recommendation: A** — same offer, less SaaS-card energy under the cloud-field hero.

### Materials (whatever option)

- Reuse Book a Call `GradientBeamCta` for the section CTA
- Accent purple/pink on type or Practice label only — not full-card gradients
- Soft seam from hero fade already exists; Plans background should not fight it
- Avoid nested icons, Zap spam, multi-layer shadows

---

## Placement options (pick in Phase 0)

| Option | Order | Why |
| --- | --- | --- |
| **1 — After hero** | Hero → **Plans** → … | Deferred — designer prefers proof (testimonials) in this slot ([#19](https://github.com/gavinfung321/HKAAA-website/issues/19)) |
| **2 — Keep late (current lean)** | … Services → Testimonials → **Plans** → Team | Default until #19 ships; Plans stays an offer shelf, not first proof |
| **3 — After Process** | Hero → Process → **Plans** → … | How-then-what |

**Update (2026-09-27):** Post-hero slot reserved for **testimonials (#19)**. Plans visual still applies; placement defaults toward **2** unless Phase 0 picks otherwise.

---

## Approach (phased)

### Phase 0 — Approve direction

- [ ] Confirm visual option: **A** / **B** / **C**
- [ ] Confirm placement: **1 after hero** / **2 keep late** / **3 after Process**
- [ ] Confirm Practice treatment: label only vs subtle border vs none
- [ ] Confirm section header: left (match hero) vs centered
- [ ] Confirm copy: keep current Plan A strings vs light trim only

**Do not start Phase 1 until Phase 0 is checked.**

### Phase 1 — Placement (if needed)

1. Reorder sections in `App.tsx`.
2. Reorder Header nav items to match.
3. Verify scroll targets.

### Phase 2 — Visual rebuild

1. Restyle `PricingSection.tsx` per chosen option (extract only if clean).
2. Wire single `GradientBeamCta`.
3. Mobile stack; reduced-motion safe.

### Phase 3 — Verify

- [ ] Desktop + mobile: offer clear under/near hero craft
- [ ] No prices; one CTA; Practice readable as recommended
- [ ] Nav Plans still works
- [ ] Designer visual sign-off

---

## Acceptance criteria

- [ ] Phase 0 approved (look + placement)
- [ ] Offer model unchanged (#1)
- [ ] Visual craft matches hero restraint
- [ ] Placement + nav consistent
- [ ] Issue closed after sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from IA discussion (Plans vs Process) + current PricingSection. No code. Issue #18 opened. |
