# Contact section — visual polish (Get in Touch)

**Status:** Signed off 2026-09-28 ([#32](https://github.com/gavinfung321/HKAAA-website/issues/32))  
**GitHub issue:** [#32](https://github.com/gavinfung321/HKAAA-website/issues/32)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A  
**After:** Team [#31](https://github.com/gavinfung321/HKAAA-website/issues/31) signed off  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused — light trim here); form DB follow-ups already listed in parent plan

---

## Goal

Make **Get in Touch** feel like the same site as Team / Plans — quiet plates, website-first voice, working lead form. No materials cliff after Team’s Blaze.

**Page order today:** … Team → **Contact** → Footer

---

## Phase 0 — locked (2026-09-28)

| # | Decision | Lock |
| --- | --- | --- |
| 1 | Layout | **A** Form left + details right |
| 2 | Materials | **A** Quiet dark plates (Team / Plans rim family, no iris, no purple blur orbs) |
| 3 | Atmosphere | **A** Flat `bg-gray-900` + soft edge fades (no new WebGL) |
| 4 | Header | Keep **Get in** + gradient **Touch** |
| 5 | Support line | **1** — Tell us what you need. We’ll come back with a clear next step. |
| 6 | Submit label | **B** Send enquiry |
| 6b | Submit look | **B** Purple→pink fill, quieter hover; beam stays Calendly-only |
| 7 | Dropdown | **A** Website-first order; Content Creation only if DB allows (else follow-up) |
| 8 | Fields | Keep Name, Email, Service, Company, Message |
| 9 | Info icons | **B** Bare Lucide muted (~20px, `white/45`); no purple tiles |
| 10 | Footer | **A** Out of scope |

---

## What’s wrong today

| Issue | Live section |
| --- | --- |
| Materials cliff | Zinc cards, purple blur orbs, purple hover after Team craft |
| Copy | “Ready to transform your business with AI?” |
| Dropdown | AI-first order; Content Creation missing vs Services |
| CTA | Gradient pill “Send Message” feels template vs Book a Call language elsewhere |
| Motion | Framer per-card; fine but optional to simplify to `animate-on-scroll` |
| Atmosphere | Hard cut from Team Blaze into flat contact |

**Keep:** Supabase `leads` insert, required validation, success/error states, real HK address / phone / email, two-column idea, gradient Touch.

---

## Out of scope

| Item | Why |
| --- | --- |
| Calendly embed / replace form | Form is the lead path; Book a Call stays hero/Plans |
| Full #16 voice pass | Light trim only |
| Footer sitemap / empty columns | Separate; after Contact |
| DB `company` NOT NULL vs UI required | Parent plan hygiene; don’t block visual |
| Content Creation in DB constraint | Add if migration already easy; else follow-up checklist item |

---

## Approach

### Phase 1 — Implement

1. Restyle shell to Phase A padding / `bg-gray-900` + soft fades
2. Quiet plate CSS for form + info (Team family)
3. Drop purple orbs; restyle inputs / submit (6b **B**)
4. Copy + dropdown order; icons **B**
5. Verify submit still hits Supabase

### Phase 2 — Verify

- Desktop + mobile; `#contact-section` nav
- One test lead insert

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-28 | Phase 0 drafted for designer lock. No code. |
| 2026-09-28 | Added submit look (6b) + info icon options (9); recommend button **B**, icons **B**. |
| 2026-09-28 | Phase 0 locked: all recommends; **6b = B**, **9 = B**. Implementing. |
| 2026-09-28 | Issue [#32](https://github.com/gavinfung321/HKAAA-website/issues/32) opened; Contact restyle in progress. |
| 2026-09-28 | Designer sign-off: quiet plates locked for now; optional later polish deferred. Issue closed. |
