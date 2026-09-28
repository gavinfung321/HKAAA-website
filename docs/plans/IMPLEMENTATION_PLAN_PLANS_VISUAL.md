# Plans section — visual + placement

**Status:** Signed off 2026-09-28 — iridescent glass shelf + gradient header + Book a Call. [#18](https://github.com/gavinfung321/HKAAA-website/issues/18) closed.  
**GitHub issue:** [#18](https://github.com/gavinfung321/HKAAA-website/issues/18)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A  
**Offer model (locked):** [IMPLEMENTATION_PLAN_PRICING.md](IMPLEMENTATION_PLAN_PRICING.md) / [#1](https://github.com/gavinfung321/HKAAA-website/issues/1)  
**After:** Process visual [#17](https://github.com/gavinfung321/HKAAA-website/issues/17)  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused); testimonials plate [#27](https://github.com/gavinfung321/HKAAA-website/issues/27)

---

## Goal

Show **what you can buy** in a layout that continues site craft — then one Book a Call.

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
- Short blurb + 3–4 bullets per tier
- Quote line once: “Every plan is quoted to your scope.”
- Partner blurb: **Site plus automation.** (aligned one-liner)

---

## Shipped look (2026-09-28)

- Iridescent glass cards (button outlook: Fresnel rim + cyan/magenta/indigo caustics; idle drift + cursor tilt)
- Rest dialed for readability; Practice lift + stronger iris; no CSS scale (blur)
- Equal-height cards; feature lists top-aligned; empty fill under lists
- Soft static vignette behind shelf (no section FX)
- Header: **Plans** purple→pink gradient (site-consistent)
- One `GradientBeamCta` (“Book a Call”) — shader button study not used as CTA

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Visual: glass 3D offer cards (v1 signed off 2026-09-27)
- [x] Placement: **2 keep late**
- [x] Practice: label only
- [x] Header: **centered**
- [x] Copy: Plan A strings + Partner “Site plus automation.”
- [x] Iridescent glass trial + dial pass (2026-09-28)

### Phase 1 — Placement

Skipped — stay after Services.

### Phase 2 — Visual rebuild

- [x] Restyle `PricingSection.tsx`
- [x] Single `GradientBeamCta`
- [x] Reduced-motion: no tilt / iris animation
- [x] Equal heights; Practice hierarchy without scale blur

### Phase 3 — Verify

- [x] Desktop: offer clear; glass + cursor light
- [x] No prices; one CTA; Practice marked
- [x] Nav Plans still works
- [x] Designer visual sign-off (2026-09-28)

---

## Acceptance criteria

- [x] Phase 0 approved (look + placement)
- [x] Offer model unchanged (#1)
- [x] Visual craft signed off
- [x] Placement + nav consistent
- [x] Issue closed after sign-off

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted from IA discussion (Plans vs Process) + current PricingSection. No code. Issue #18 opened. |
| 2026-09-27 | Option A quiet offer rail built for review (left header, label-only Practice, keep late). |
| 2026-09-27 | Designer: too plain. Center header; glass + 3D + cursor spotlight; Partner → “Site plus automation.” |
| 2026-09-27 | Stronger tilt; resting spots per card. Designer signed off. |
| 2026-09-28 | Designer: still not satisfied. Analyzed A/B/C/D; **try Hybrid D** — brand plate + Practice lift + quieter purple. |
| 2026-09-28 | Iridescent glass trial; dial brightness; equal heights; restore Book a Call; gradient **Plans** header. Designer signed off — closing. |
