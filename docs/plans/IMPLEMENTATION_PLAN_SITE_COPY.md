# Site-wide copy pass — implementation plan

**Status:** Paused — designer prioritizing below-fold **visual** work first. Copy drafts later (workflow A: agent options → designer pick).  
**GitHub issue:** [#16](https://github.com/gavinfung321/HKAAA-website/issues/16)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / Copy and content  
**Voice reference:** Hero (#14) — website-first, Hong Kong, clear scope; Elevate with better + Websites / SEO / Chatbots / Automation

---

## Goal

Bring every major section’s language in line with the new hero so the page feels like one studio, not a premium first screen over template body copy.

**Rules of voice**

- Website-first; AI / automation as “when you’re ready”
- Short sentences; cut filler (“cutting-edge”, “transform your ideas into reality”, “comprehensive AI solutions”)
- Concrete over vague
- No fake named proof unless designer supplies it
- No service laundry lists that repeat the hero rotator in every section

---

## Out of scope

| Item | Why |
| --- | --- |
| Hero headline / subline / proof | Shipped in #9 / #14 |
| Glass nav / new WebGL | Closed / not planned |
| Pricing structure (Launch / Practice / Partner) | Already Plan A; only light wording if it clashes |
| Lead form field set / DB migrations | Separate hygiene unless labels need a one-line tweak |
| Full redesign of section layouts | Copy only unless a line change forces a tiny layout fix |

---

## Sections in scope

| Section | Current smell (examples) | Target |
| --- | --- | --- |
| Process | “How we transform your ideas”, generic discovery/design/implement | Match website-first process |
| Why Us | “Proven Expertise”, “Cutting-Edge Technology”, ROI boilerplate | Specific HKAAA reasons |
| Services | Long marketing paragraphs; some titles vs hero rotator mismatch | Shorter cards; align names with offer |
| Team | Bios + “Become Our Member?” community tone | Honest co-founder bios; rethink or cut membership CTA |
| Contact | Generic “transform your business with AI” | Align with Book a Call / clear scope |
| Footer | Thin / unfinished columns | Real links or collapse; short blurb matching voice |

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Confirm sections in scope: Process, Why Us, Services, Team, Contact, Footer
- [x] Confirm voice rules (website-first, short, concrete, honest proof, don’t repeat rotator)
- [x] Testimonials: **leave for now**; later Asian headshots (generate when ready)
- [x] “Become Our Member?”: **leave as-is** → superseded 2026-09-28: **removed** from Team in [#31](https://github.com/gavinfung321/HKAAA-website/issues/31)
- [x] Workflow: **A — agent drafts options → designer picks** (when copy pass resumes)

**Phase 0 mostly locked. Issue paused: visuals first; no copy implementation until designer unpauses.**

#### Voice rules (item 2) — what this means

A short checklist for every line we rewrite, so the page matches the hero:

| Rule | Meaning | Example |
| --- | --- | --- |
| Website-first | Lead with sites; AI/automation as “when ready” | Not “AI transforms everything” |
| Short | Cut filler | Drop “cutting-edge”, “comprehensive solutions” |
| Concrete | Say what you do | Prefer “bilingual site + WhatsApp” over “innovative digital presence” |
| Honest proof | No fake clients/names | Headshots/photos can wait; don’t invent logos |
| Don’t repeat the rotator | Sections shouldn’t re-list Websites/SEO/Chatbots/Automation every time | Process = how you work; Why Us = why HKAAA |

Say **yes** to these rules, or tell us what to change.

#### Workflow (item 5) — what this means

How we produce the new words:

- **A — Agent drafts:** I write 1–2 options per section → you pick/edit → then we code  
- **B — You write:** You supply the finals (or mark up the live page) → I only implement  

**Recommendation:** A (faster for a designer-led pass).

### Phase 1 — Draft + lock copy

1. Inventory live strings per section (Process → Footer).
2. Draft replacements (options if requested).
3. Designer locks finals section-by-section (or one pass).

### Phase 2 — Implement

1. Update copy in `App.tsx`, `TeamSection`, `ContactSection`, `Footer`, service blocks, etc.
2. Keep layout/components unless a string length forces a small wrap fix.
3. Align service card titles with hero language where it helps (e.g. Automation vs vague “Workflows” wording) without renaming nav IDs.

### Phase 3 — Verify

- [ ] Read-through top to bottom: one voice
- [ ] Desktop + mobile: no awkward wraps on new lines
- [ ] No accidental hero/pricing regressions
- [ ] Designer sign-off
- [ ] Parent checklist ticked; issue closed after merge

---

## Acceptance criteria

- [ ] Phase 0 approved
- [ ] Locked copy shipped for every in-scope section
- [ ] Voice matches hero (website-first, HK, concrete)
- [ ] Testimonials handled per Phase 0 decision
- [ ] Issue closed after visual/copy sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-27 | Plan drafted after #14 hero craft merge. No code. Issue #16 opened. |
| 2026-09-27 | Phase 0: sections + voice + leave testimonials/member CTA; workflow A. **Paused** — visuals first. |
