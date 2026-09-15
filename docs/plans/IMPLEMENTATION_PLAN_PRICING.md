# Pricing section — Plan A (practice plans)

**Status:** Done. Shipped in GitHub issue #1. Live domain is Netlify (`hkaiautomation.com`).
**GitHub issue:** [#1 — Hide public prices and rethink the pricing section](https://github.com/gavinfung321/HKAAA-website/issues/1)
**Parent plan:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A

**Decisions so far:**

- **Plan A** — three cards, no public prices, no Stripe
- **One CTA for the whole section** — not a button on every card
- **Lead offer:** websites first; chatbots, workflow automation, and AI outreach in the same quote
- **No named niche** on this block — do not say CPA, accounting firm, or any other vertical. Niches can be added later.
- **Nav:** Plans
- **Heading:** Plans for your business

**New after first visual review:**

- Cards have **too many words** — cut to a short line + a few bullets
- **Do not repeat “Custom quote”** on every card (or any similar filler in the old price slot)

---

## Visual review (what is wrong now)

The first implementation is on the local site. It is too heavy:

- Each card has a large **Custom quote** line. Three times in a row it reads like leftover prices, not a plan name.
- Launch / Practice also share **Scoped to your firm**, so the middle of the grid is the same phrase twice more.
- Feature lists are 5–8 bullets plus a long description. Visitors scanning the page will not finish them.

Keep the three-card layout. Strip the cards down. Say “quoted to your firm” **once**, next to the single button.

---

## How the section should look

```
Plans for your business
Short subline (website first, automation in the same quote)

[ Launch ]          [ Practice ]         [ Partner ]
                    (Most chosen)
A professional      A bilingual          Site plus ongoing
website             website              automation
• 5-page site       • Everything in      • Everything in
• Enquiry form        Launch               Practice
• Built with you    • EN + 繁中          • Monthly sessions
                    • Optional chatbot   • Chatbot, workflows,
                                           outreach

Every plan is quoted to your scope.
            [ Book a strategy call ]
```

**Rules**

- No dollar amounts, no `/month`, no yearly toggle, no Stripe
- No CTA on the cards
- No **Custom quote** (or any other repeated phrase) in the old price slot
- No shared support line like “Scoped to your firm” on multiple cards
- One button under the grid, same Calendly URL as the hero
- Each card: **name**, optional badge, **one short line**, **3–4 bullets**
- Practice stays highlighted

---

## Tight copy (review)

Say the quote rule **once**, not on the cards.

**Subline:**

> Websites, plus chatbots, workflow automation, and AI outreach when you need them.

**Line above the CTA:**

> Every plan is quoted to your scope.

**CTA:** Book a strategy call → `https://calendly.com/hkaiautomationagency/30min`

### Launch

One line: *A professional website.*

- 5-page site (Home, About, Services, Team, Contact)
- Enquiry form
- Built with you in working sessions

### Practice (Most chosen)

One line: *A bilingual website.*

- Everything in Launch
- English + Traditional Chinese
- SEO and WhatsApp
- Optional site chatbot

### Partner

One line: *Site plus ongoing automation.*

- Everything in Practice
- Monthly working sessions
- Workflows, chatbot, and AI outreach

Drop from the cards (still true, just not on the card): domain launch, “mobile-ready,” full service-page list, team bios, insights list, seasonal care, priority turnaround. Those can come up on the call.

---

## What stays

- Section id `pricing-section`
- Three-card grid, hover, purple/pink styling
- Practice highlight + “Most chosen”
- One Calendly button
- Nav **Plans**, heading **Plans for your business**

## What goes (this pass)

- The large **Custom quote** line on every card
- Repeated **Scoped to your firm**
- Long descriptions
- Bullet lists longer than four items

---

## Files we expect to touch (when this copy pass is approved)

| File | Change |
| --- | --- |
| `src/components/PricingSection.tsx` | Shorter copy; remove repeated quote slot; one quote line above the CTA |

Header nav stays **Plans**. No Stripe. No new routes.

---

## Out of scope

- Public prices
- A second automation table
- Rewriting hero / services / process
- Headline Cursor or n8n

---

## Open items for review

- [x] Tight bullets (3–4 per card)
- [x] One-line blurbs: *A professional website* / *A bilingual website* / *Site plus ongoing automation*
- [x] No “Custom quote” on cards
- [x] Quote said once above the CTA: **Every plan is quoted to your scope.**
- [x] Subline has **no named niche** (no CPA / accounting firm)

**Suggested defaults:** use the tight copy in this file as-is.

---

## Checklist

Do not tick the copy-pass implementation until it is coded and checked in the browser.

### Plan and decision

- [x] Plan A: no public prices, one section CTA, Launch / Practice / Partner
- [x] First implementation on the local site
- [x] Visual review: too much copy; “Custom quote” repeats
- [x] Tight copy drafted
- [x] This copy pass approved

### Implementation (copy pass)

- [x] Remove “Custom quote” and repeated support lines from cards
- [x] Cut each card to one short line + 3–4 bullets
- [x] Put a single quote line above the section CTA
- [x] Shorten the section subline
- [x] Remove CPA / accounting / named-niche wording from this section

### Verify (after the copy pass)

- [x] Cards readable in one glance; no repeated quote phrase
- [x] Still no prices or Stripe
- [x] One Calendly button
- [x] Desktop and mobile visual sign-off

### Already done (first build)

- [x] BASIC / PRO / PREMIUM and Stripe removed
- [x] Nav renamed to Plans
- [x] One Calendly button under the grid
- [x] Contact form and hero Calendly unchanged

---

## Progress log

| Date | What changed |
| --- | --- |
| 2026-09-15 | Plan A chosen. First draft (generic AI packages). No code. |
| 2026-09-15 | Offer rewritten as HK CPA websites, Launch / Practice / Partner. No code. |
| 2026-09-15 | Single section CTA. Website-first, automation still in the quote. No code. |
| 2026-09-15 | First implementation on the local site. |
| 2026-09-15 | Visual review: cut card copy; drop repeating “Custom quote.” **No code this pass.** |
| 2026-09-15 | Copy pass implemented locally. Issue #1 open for visual review. |
| 2026-09-15 | De-niched copy: no CPA / accounting firm. Heading “Plans for your business.” Implemented. |
| 2026-09-15 | Visual sign-off. Issue #1 closed. Host confirmed: Netlify for hkaiautomation.com. |
