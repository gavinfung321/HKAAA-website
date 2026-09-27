# Process section visual polish — implementation plan

**Status:** Draft for review — **do not code until Phase 0 is approved.**  
**GitHub issue:** [#17](https://github.com/gavinfung321/HKAAA-website/issues/17)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / visual tighten  
**After:** Hero craft [#14](https://github.com/gavinfung321/HKAAA-website/issues/14)  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused — visuals first)

---

## Goal

Make **Process** feel like the next beat of the same site as the hero — not a three-card SaaS template.

Keep the three steps (Discovery → Design → Implementation) unless Phase 0 renames them lightly for layout. Full voice rewrite stays in #16.

---

## What’s wrong today

| Issue | In the live section |
| --- | --- |
| Card stack | Three `rounded-2xl` panels + inner cards + borders + purple blur orbs |
| Nested chrome | Expert grid, scrolling code fake, tech icon marquee — busy next to the hero |
| Double headline | “Our Process” + “How we transform your ideas” |
| Atmosphere cliff | Flat `max-w-7xl` block on `bg-gray-900` after full-bleed cloud field |
| Motion noise | Hover blurs, icon carousels, code scroll — more than the hero’s intentional motions |

---

## What we are / are not doing

### Adopt

- One clear section composition (one headline, one short support if needed, three steps)
- Materials closer to hero / Book a Call (restraint, light borders, no purple fog orbs)
- Mobile: readable stack, left-aligned to match hero (unless Phase 0 says otherwise)
- 2–3 intentional motions max (e.g. step reveal, subtle hover) — not per-card demos

### Do not adopt

- Full copy rebuild (#16)
- New WebGL / Three.js in Process
- DesignCode enroll density / stats / badges
- Keeping nested fake UIs unless Phase 0 explicitly keeps one as a single visual anchor

---

## Direction options (pick in Phase 0)

| Option | Layout | Visual idea |
| --- | --- | --- |
| **A — Timeline (recommended)** | Vertical or horizontal step rail; number + title + one line; no cards | Clean continuation of left-type discipline; field-friendly |
| **B — Editorial split** | Left: section title; right: three stacked steps with hairline rules | Magazine, less “product UI” |
| **C — Quiet panels** | Keep three columns but strip nested demos, orbs, and heavy glass; flat or barely bordered | Smallest change; still a bit card-like |

**Recommendation: A** — strongest fix for the hero cliff without a redesign of the whole page.

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Confirm direction: **A — Timeline**
- [ ] Confirm nested demos: awaiting pick (recommendation below)
- [x] Confirm section header: **one title + short support line**
- [ ] Confirm alignment: awaiting pick (recommendation below)
- [x] Confirm step labels: keep Discovery / Solution Design / Implementation for now

**Do not start Phase 1 until demos + alignment are confirmed.**

#### Nested demos (item 2) — recommendation: **remove all**

Today each step has a mini fake UI (expert grid / scrolling code / icon marquee). They add noise under the new hero and fight a clean timeline.

| Choice | Effect |
| --- | --- |
| **Remove all (recommended)** | Timeline stays calm; craft matches hero |
| Keep one | Pick a single visual for one step only (still a bit busy) |
| Keep all | Smallest change; cliff stays |

#### Alignment (item 4) — what this means

Where the Process **title, support line, and steps** sit on the page:

| Choice | Meaning |
| --- | --- |
| **Left (recommended)** | Same as the hero type column — one system top to bottom |
| Centered | Classic section header; steps may still be left or centered under it |

**Recommendation: left** so Process continues the hero’s left edge.

### Phase 1 — Structure

1. Extract `ProcessSection.tsx` from `App.tsx` if it keeps the change clean.
2. Rebuild layout per chosen option; keep `#process-section` + nav scroll target.
3. Remove purple blur orbs and unused mini-UI unless Phase 0 kept one.

### Phase 2 — Materials + motion

1. Match site tokens (dark ground, restrained borders, purple/pink only for accent type).
2. Soft seam from hero fade already exists; ensure Process background doesn’t fight it.
3. Ship 2–3 intentional motions; respect `prefers-reduced-motion`.

### Phase 3 — Verify

- [ ] Desktop: no template-card cliff under hero
- [ ] Mobile: stack/rail readable; left-aligned if chosen
- [ ] Nav “Process” still scrolls correctly
- [ ] Designer visual sign-off

---

## Acceptance criteria

- [ ] Phase 0 approved
- [ ] Process visual direction shipped
- [ ] Nested demo chrome handled per Phase 0
- [ ] Desktop + mobile verified
- [ ] Issue closed after sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted after hero merge; visuals-first priority. No code. Issue #17 opened. |
