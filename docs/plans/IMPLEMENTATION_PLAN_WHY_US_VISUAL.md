# Why Choose Us — visual polish

**Status:** Closed — shipped via [PR #24](https://github.com/gavinfung321/HKAAA-website/pull/24); designer sign-off 2026-09-28.  
**GitHub issue:** [#23](https://github.com/gavinfung321/HKAAA-website/issues/23)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / visual tighten  
**After:** Process [#17](https://github.com/gavinfung321/HKAAA-website/issues/17), Plans [#18](https://github.com/gavinfung321/HKAAA-website/issues/18)  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused — visuals first)

---

## Goal

Make **Why Choose Us** feel like the same site as Process and Plans — not a generic AI agency zig-zag with Imgur illustrations.

Keep three reasons unless Phase 0 merges or renames them lightly. Full voice rewrite stays in #16.

**Page order today:** Hero → Testimonials → Process → **Why Choose Us** → Services → Plans → Team → Contact

---

## What’s wrong today

| Issue | In the live section |
| --- | --- |
| Template zig-zag | Three `lg:grid-cols-2` rows: icon + title + purple subhead + body ↔ Imgur PNG |
| Stock / off-site art | Hotlinked Imgur images — brittle, not on-brand, Phase B “own assets” debt |
| SaaS voice | “comprehensive AI solutions,” “maximum ROI,” “Cutting-Edge Technology” — fights hero HK voice |
| Materials cliff | Flat centered block after Process laser craft; icon blobs + purple subheads feel older |
| Nested in App | Still inline in `App.tsx` (~90 lines) — harder to iterate than `ProcessSection` / `PricingSection` |

---

## What we are / are not doing

### Adopt

- One clear section composition (one headline, one short support if needed, three reasons)
- Materials in family with Process / Plans (dark ground, restrained borders, purple/pink as accent only)
- Mobile: readable stack; alignment picked in Phase 0
- 2–3 intentional motions max — not image carousels or heavy demos
- Prefer dropping Imgur for this pass (type-first or one simple local visual) unless Phase 0 keeps placeholders

### Do not adopt

- Full copy rebuild (#16) — light trim of titles/subheads OK if Phase 0 asks
- New WebGL behind Why Us unless designer explicitly wants it
- DesignCode enroll density / fake stats
- Replacing Imgur with other random CDN stock without a plan for owned assets

---

## Direction options (pick in Phase 0)

| Option | Layout | Visual idea |
| --- | --- | --- |
| **A — Editorial stack (recommended)** | Left (or centered) header; three stacked reasons with hairline rules + number; **no** big Imgur panels | Matches Process restraint; fastest craft win |
| **B — Quiet three-up** | Three columns: title + one line each; light border / soft glass optional | Closer to Plans rhythm; denser |
| **C — Refined zig-zag** | Keep alternating text/media but strip icon chrome; replace art later or use abstract local panels | Smallest structural change; still image-dependent |

**Recommendation: A** — Why Us sits right under Process; another timeline-adjacent stack keeps the page one system. Drop Imgur now; add owned visuals later if needed.

---

## Content model (v1 — keep unless Phase 0 trims)

| Slot | Today | Note |
| --- | --- | --- |
| Section title | Why Choose Us | Keep structure; accent “Choose Us” or whole title TBD |
| Support | Experience the difference with our comprehensive AI solutions | Likely light trim in Phase 0 or leave for #16 |
| Reason 1 | Proven Expertise | |
| Reason 2 | End-to-End Support | |
| Reason 3 | Cutting-Edge Technology | Title may feel most “SaaS”; soft rename optional in Phase 0 |

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Confirm visual option: **A — Editorial stack**
- [x] Confirm imagery: **remove Imgur for now** (legacy zig-zag saved)
- [x] Confirm section header: **centered**
- [x] Confirm reason labels: **light rename** (see content table below)
- [x] Confirm copy: **light trim** (full pass remains #16)

**Phase 0 locked — start Phase 1.**

#### Locked light rename + trim

| Slot | Was | Now |
| --- | --- | --- |
| Support | Experience the difference with our comprehensive AI solutions | Clear ownership. Real delivery. Room to grow after the site ships. |
| 01 | Proven Expertise | **Proven delivery** — Real results, not slide decks |
| 02 | End-to-End Support | **One team through launch** — Strategy, build, and support |
| 03 | Cutting-Edge Technology | **Ready for what comes next** — Website first, AI when you’re ready |

### Phase 1 — Structure

1. Extract `WhyUsSection.tsx` from `App.tsx`.
2. Rebuild layout per chosen option; keep `#why-us-section` + nav “Why Us” scroll.
3. Remove unused Imgur `<img>`s / icon chrome if Phase 0 dropped them.

### Phase 2 — Materials + motion

1. Match site tokens (`gray-900`, restrained borders, accent type).
2. Soft seams with Process above and Services below if needed.
3. Ship 2–3 intentional motions; respect `prefers-reduced-motion`.

### Phase 3 — Verify

- [x] Desktop: no template cliff under Process
- [x] Mobile: stack readable
- [x] Nav “Why Us” still scrolls correctly
- [x] Designer visual sign-off

---

## Shipped (final)

Phase 0 picked an editorial stack; review moved away from it because it looked too much like Process. What shipped:

- Centered header over animated violet **background paths** (`ui/background-paths.tsx`)
- Three **3D CSS glass cards** (`ui/GlassCard.tsx`) in a row: Delivery / Team / Future, with Lucide marks (PackageCheck / Users / Sparkles)
- Mild hover tilt (~12°) so copy stays readable
- Copy per the locked light rename + trim above
- Tried and dropped: procedural Three.js HK skyline (removed after #25; `three` deps uninstalled), broken-glass shards, WebGL glass slabs, stacked hover deck

---

## Acceptance criteria

- [x] Phase 0 approved
- [x] Why Choose Us visual direction shipped
- [x] Imagery handled per Phase 0 (Imgur removed; legacy zig-zag kept unmounted)
- [x] Desktop + mobile verified
- [x] Issue closed after sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted after #17/#18 close. Issue #23 opened. No code until Phase 0. |
| 2026-09-27 | Phase 0 locked: A editorial; drop Imgur; centered; light rename + trim. Legacy zig-zag in `WhyUsSection.legacy.tsx`. Building. |
| 2026-09-28 | Layout shifted off Process look: split + word labels + glass rows; procedural Three.js HK skyline (no Meshy GLB). |
| 2026-09-28 | Skyline unmounted (WebGL later). Eyebrow removed. Lighter copy. Single-column glass stack. |
| 2026-09-28 | Background paths (violet) + 3D CSS glass cards; stacked deck trialled, then centered row chosen; Lucide marks; tilt eased to 12°. |
| 2026-09-28 | Merged via PR #24. Designer sign-off. #23 closed. |
