# Mobile burger menu vs hero — implementation plan

**Status:** Signed off 2026-09-29 ([#34](https://github.com/gavinfung321/HKAAA-website/issues/34))  
**GitHub issue:** [#34](https://github.com/gavinfung321/HKAAA-website/issues/34)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / Code hygiene  
**File:** `src/components/Header.tsx`

---

## Goal

Open mobile menu stays readable on the hero. Closed bar at top of page stays transparent (hero craft).

---

## Analysis

| State | Nav background today | Mobile menu panel |
| --- | --- | --- |
| Top of page, menu closed | `bg-transparent` | hidden |
| Top of page, menu open | `bg-transparent` | **no fill** → overlap |
| Scrolled | `bg-black/90 backdrop-blur-sm` | inherits; OK |

Cause: intentional transparent-at-rest nav (#14) plus a dropdown that never got its own plate. Not a z-index bug (`z-50` is correct).

**Verdict:** Yes — give the open menu a dark background (or force scrolled chrome while open). Do not change hero typography to work around it.

---

## Phase 0 — pick one

| Option | What | Recommend? |
| --- | --- | --- |
| **A (locked)** | `isMenuOpen \|\| isScrolled` → `bg-black/90 backdrop-blur-sm` on whole `<nav>` | Locked 2026-09-29 |
| **B** | `bg-black/95` (or similar) only on dropdown inner div | OK if you want the logo row to stay clear |
| **C** | Full-screen dim + sheet | Overkill for this bug |

### Out of scope

- Desktop links
- Closed-state transparency at rest
- Reopening glass floating header (#13)

---

## Phase 1 — Implement (after lock)

1. Apply locked option in `Header.tsx` only.
2. Optional: close menu on resize to `md+` (nice-to-have).

## Phase 2 — Verify

- [x] iPhone-width: open on hero — labels clear
- [x] Close menu — bar transparent again at top
- [x] Scrolled open — still fine
- [x] Designer sign-off; close #34

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-29 | Bug reported; analysis + issue #34. No code until Phase 0. |
| 2026-09-29 | Phase 0 locked **A**. Implementing. |
| 2026-09-29 | Quiet-fill Contact Us (not full-width). Designer sign-off; ship. |
