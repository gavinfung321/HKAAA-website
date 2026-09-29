# Nav bar polish — implementation plan

**Status:** Signed off 2026-09-29 ([#35](https://github.com/gavinfung321/HKAAA-website/issues/35))  
**GitHub issue:** [#35](https://github.com/gavinfung321/HKAAA-website/issues/35)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / landing polish  
**File:** `src/components/Header.tsx` (+ `index.css` `.nav-link`)

---

## Goal

Keep the current transparent-at-rest / dark-on-scroll nav. Tighten labels, hierarchy, and feedback so the bar feels calmer on mid widths and clearer while scrolling. No glass floating redesign (#13 stays closed).

**Voice / product rules**

- Brand (logo + HKAAA) stays the strongest signal in the bar
- Contact Us stays secondary to hero **Book a Call**
- Mobile open-menu chrome from [#34](https://github.com/gavinfung321/HKAAA-website/issues/34) stays (scrolled plate while open; quiet-fill Contact)
- No em dashes in any new copy

---

## Out of scope

| Item | Why |
| --- | --- |
| Glass floating / spring header | [#13](https://github.com/gavinfung321/HKAAA-website/issues/13) closed not planned |
| Changing transparent-at-rest when menu closed | Hero craft (#14) |
| Traditional Chinese toggle | Phase E backlog; not this pass |
| Footer Explore links | Separate from header |
| New WebGL / effects in the bar | Overkill |

---

## Phase 0 — Lock direction

### 1. Link labels

| Option | What | Notes |
| --- | --- | --- |
| **A (recommended)** | Rename **Our Services** → **Services**; keep Process, Why Us, Plans, Team | Frees mid-width space; matches section voice |
| **B** | Keep **Our Services** | No label change |
| **C** | Broader shorten (e.g. Why Us → Why) | Risk of vagueness |

**Lock:** ___

### 2. Active section feedback (desktop)

| Option | What | Notes |
| --- | --- | --- |
| **A (recommended)** | Scroll-spy: current section link is white + underline (reuse `.nav-link` gradient underline) | Clear orientation; small JS |
| **B** | Hover only (today) | Zero new behavior |
| **C** | Scroll-spy + soft “pill” behind active link | Heavier; more SaaS |

**Lock:** ___

### 3. Desktop Contact Us plate

| Option | What | Notes |
| --- | --- | --- |
| **A (recommended)** | Match mobile quiet fill: `bg-white/10`, `border-white/15`, white label | One Contact language desktop + mobile |
| **B** | Keep desktop ghost (`bg-white/5`) as today | Fine; mobile stays slightly stronger |
| **C** | Promote to gradient / beam | Competes with Book a Call — avoid |

**Lock:** ___

### 4. Spacing / density (desktop)

| Option | What | Notes |
| --- | --- | --- |
| **A (recommended)** | If labels shortened: keep `space-x-8`; only tighten to `space-x-6` if still tight at `md` | Prefer label fix first |
| **B** | Always `space-x-6` | Slightly denser |
| **C** | No spacing change | |

**Lock:** ___

### 5. Accessibility / hygiene

| Option | What | Notes |
| --- | --- | --- |
| **A (recommended)** | Burger `aria-label` / `aria-expanded`; visible focus rings on links + burger; close menu on `md+` resize | Cheap, correct |
| **B** | Skip a11y this pass | |

**Lock:** ___

### Recommendation summary

Lock **1A + 2A + 3A + 4A + 5A** unless you prefer quieter (2B / 3B).

---

## Phase 1 — Implement (after locks)

1. Apply locked labels / Contact classes / spacing in `Header.tsx`.
2. If 2A: IntersectionObserver (or scroll listener) on section ids already used by `scrollToSection`; set active key; style active `.nav-link`.
3. If 5A: aria + focus + resize close.
4. Do not change hero or Calendly CTAs.

## Phase 2 — Verify

- [x] Desktop: labels clear at ~768–1024px
- [x] Desktop: active section tracks scroll
- [x] Contact Us secondary to Book a Call
- [x] Mobile: open menu still readable; Contact quiet-fill kept
- [x] Transparent at top when menu closed
- [x] Soft hover plate (no underline on hover); designer sign-off; close #35

---

## Acceptance criteria

- [x] Phase 0 options locked
- [x] Locked items shipped
- [x] No glass-nav / transparent-rest regressions
- [x] Issue closed after sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-29 | Plan drafted after nav analysis. No code until Phase 0 locked. |
| 2026-09-29 | Phase 0 locked: 1A Services, 2A scroll-spy, 3A Contact fill, 4A spacing, 5B skip a11y. Implementing. |
| 2026-09-29 | Trial: soft hover plate on desktop `.nav-link` (keep gradient active underline). |
| 2026-09-29 | Hover underline removed; plate-only hover. Designer sign-off. |
