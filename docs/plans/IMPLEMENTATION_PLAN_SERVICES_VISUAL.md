# Our Services — visual polish

**Status:** Done — designer signed off; shipping via PR.  
**GitHub issue:** [#25](https://github.com/gavinfung321/HKAAA-website/issues/25)  
**Parent:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A / visual tighten  
**After:** Process [#17](https://github.com/gavinfung321/HKAAA-website/issues/17), Why Us [#23](https://github.com/gavinfung321/HKAAA-website/issues/23), Plans [#18](https://github.com/gavinfung321/HKAAA-website/issues/18)  
**Related:** Site copy [#16](https://github.com/gavinfung321/HKAAA-website/issues/16) (paused — visuals first)

---

## Goal

Make **Our Services** feel like the same site as Process, Why Us and Plans, not the original six-card template.

Keep all six services unless Phase 0 merges or reorders them. Full voice rewrite stays in #16.

**Page order today:** Hero → Testimonials → Process → Why Us → **Services** → Plans → Team → Contact

---

## What's wrong today

| Issue | In the live section |
| --- | --- |
| Template grid | Six identical `zinc-900/30` cards, 3×2, each with a blurred purple blob in the corner. This is the old material the other sections have moved away from. |
| Mixed visuals | Three cards run live demos (`WorkflowDemo`, `ChatbotDemo`, `BusinessGraph`). The other three are static fake browser windows with traffic-light dots and pulsing or bouncing icons. They don't read as one set. |
| Very tall | Every card is fixed at 480px. On mobile the section is roughly 3,000px of scrolling. |
| Order fights the story | Order is Workflow → Chatbot → Lead gen → Web Design → SEO → Content. The hero and Plans are website first, AI when you're ready. Services leads with automation. |
| Card repeat risk | Why Us (above) and Plans (below) are both rows of glass cards. Another card grid here makes three card sections in a row. |
| SaaS voice | "Intelligently connecting your favourite applications," "extremely complicated queries," "AI-driven strategies." |
| Nested in App | About 190 copy-pasted lines inline in `App.tsx`. Card titles use `h2` instead of `h3`. An unused `ServiceCard.tsx` already exists. |

---

## What we are / are not doing

### Adopt

- One clear composition that is not another row of equal cards
- Website-first ordering or grouping, to match hero and Plans
- One consistent visual language across all six services
- Materials in family with the rest of the page (dark ground, restrained borders, purple/pink as accent only)
- 2–3 intentional motions max; respect `prefers-reduced-motion`
- Extract `ServicesSection.tsx` (and reuse or delete `ServiceCard.tsx`)

### Do not adopt

- Full copy rebuild (#16). A light trim of card bodies is OK if Phase 0 asks for it.
- Another glass 3D card treatment (already used by Why Us and Plans)
- New WebGL background unless the designer explicitly wants it (Process and Why Us already have animated backgrounds)
- Stock images or hotlinked art

---

## Direction options (pick in Phase 0)

| Option | Layout | Visual idea |
| --- | --- | --- |
| **A — Bento grid (recommended)** | Asymmetric grid. Web Design and one AI service get large tiles; the rest are smaller. Website services first. | Breaks the "row of equal cards" rhythm between Why Us and Plans. Large tiles keep the strongest live demos; small tiles use one simple icon or mini visual. |
| **B — Two groups** | Two labelled groups: **Websites** (Web Design, SEO, Content) and **When you're ready: AI** (Chatbot, Workflow, Lead gen). Three compact cards each. | Mirrors the Plans story directly. Shorter scroll. Still a card layout, so needs a different material from Why Us. |
| **C — Showcase list** | Six service names in a list on one side; one large demo panel on the other swaps as you hover or scroll. | Most premium feel and shortest section. Heaviest to build; needs a mobile fallback (probably a stack). |
| **D — Restyle only** | Keep the 3×2 grid. Unify the six visuals, drop the blobs, shorten the cards, fix headings. | Smallest change. Still reads as a template grid next to Why Us and Plans. |

**Recommendation: A.** It is the clearest break from the card rows above and below, lets website services lead, and keeps the live demos where they are strongest without forcing six equal visuals.

---

## Chosen direction (Phase 0 result)

**Bento, two rows of three**, based on the designer's reference video (`bento.mp4`): six tiles, slightly different widths, each with one short line of text and one quiet animated visual. Simpler than the big-tile map first proposed; the website-first order keeps Web Design top-left.

**Each tile:** small violet service name, a one-line headline, one visual. **No description paragraph.** No hover-only text (phones can't hover).

| Position | Service name | Headline (draft — final wording in #16) | Visual |
| --- | --- | --- | --- |
| Row 1, left | Web Design | A website that wins you customers | Browser window with a mini site building in |
| Row 1, middle | SEO | Get found on Google | Search box; "your site" slides into the #1 spot |
| Row 1, right | Content | Posts, blogs and videos, handled | Curved row of content-type icons drifting past |
| Row 2, left | Chatbot | Answers customers while you're busy | Chat bubbles typing in ("Open Saturday?" → booking reply) |
| Row 2, middle | Workflow | Busywork done automatically | Hub-and-branch: form → Airtable → email |
| Row 2, right | Lead gen | A steady stream of new enquiries | Dot travelling a dashed path: visitor → lead → booked call |

**Styling:** dark tiles, thin `white/10` borders, violet/pink for lines, glows and dots (not the reference's grey). Motion starts when a tile scrolls into view; static under `prefers-reduced-motion`.

**Header (trial, swap on review):** left-aligned "Our Services" with one support line: *Everything your business needs online, from one team.* Alternative: centered like Why Us / Plans.

**Retired:** `ChatbotDemo` (stock photo, fake input, dated copy), `BusinessGraph` (fake "+30%"), the three static browser mockups. `WorkflowDemo` is replaced by a tile-sized hub diagram.

---

## Content model (before — for reference)

| Service | Visual today | Body today |
| --- | --- | --- |
| Workflow automations | Live `WorkflowDemo` | We automate your workflows by intelligently connecting your favourite applications. Boosting efficiency, enhancing productivity, and reducing errors. |
| Chatbot development | Live `ChatbotDemo` | We develop advanced chatbots that are reactive, understand nuances, and are capable of solving extremely complicated queries. |
| Lead generation | Live `BusinessGraph` | We enhance lead generation with AI-driven strategies that capture and convert prospects efficiently. Boosting engagement and growing your business. |
| Web Design | Static browser mockup + pulsing `Layout` icon | Professional custom web design tailored to your brand. Responsive, user-friendly, and conversion-optimized websites to elevate your online presence. |
| SEO | Static browser mockup + pulsing `Search` icon | Boost your visibility with data-driven SEO strategies. Keyword research, on-page optimization, and backlink building to rank higher on Google. |
| Content Creation | Static "REC" mockup + bouncing `PenTool` icon | Engaging, SEO-optimized content crafted for your audience. Blogs, videos, and social media content to drive traffic and engagement. |

---

## Approach (phased)

### Phase 0 — Approve direction

- [x] Confirm layout option: **A — Bento grid**
- [x] Confirm order: **website first** (Web Design → SEO → Content → Chatbot → Workflow → Lead gen)
- [x] Confirm visuals: **one quiet visual per tile** (see Chosen direction); old demos retired
- [x] Confirm section header: **left-aligned + support line** as a trial; revisit on review
- [x] Confirm copy: **drop the paragraphs**; service name + one-line headline per tile

### Phase 1 — Structure

1. Extract `ServicesSection.tsx` from `App.tsx`; keep `#services-section` and the nav "Our Services" scroll.
2. Move service data into one array (title, body, visual) instead of six copy-pasted blocks.
3. Card titles become `h3`. Reuse or delete `ServiceCard.tsx`.
4. Save the current grid as `ServicesSection.legacy.tsx` (not mounted), as with Process and Why Us.

### Phase 2 — Materials + motion

1. Build the chosen layout with site tokens (`gray-900`, restrained borders, accent type).
2. Make the six visuals one set per Phase 0.
3. Soft seams with Why Us above and Plans below if needed.
4. Ship 2–3 intentional motions; respect `prefers-reduced-motion`.

### Phase 3 — Verify

- [x] Desktop: no template cliff between Why Us and Plans
- [x] Mobile: readable, and noticeably shorter than today's ~3,000px (~1,970px stacked)
- [x] Nav "Our Services" still scrolls correctly (`#services-section`)
- [x] Live demos still animate; nothing clipped
- [x] Designer visual sign-off

---

## Acceptance criteria

- [x] Phase 0 approved
- [x] Services visual direction shipped
- [x] Six visuals read as one set
- [x] Desktop + mobile verified
- [x] Issue closed after sign-off + merge

---

## Progress log

| Date | Note |
| --- | --- |
| 2026-09-28 | Plan drafted after #23 closed. Issue #25 opened. No code until Phase 0. |
| 2026-09-28 | Phase 0 partial: bento grid (A) + website-first order locked. Visuals, header and copy still open. |
| 2026-09-28 | Phase 0 approved: two-rows-of-three bento from designer reference; service name + headline + one visual per tile, no paragraphs. Header trial: left-aligned. Building for review. |
| 2026-09-28 | First build reviewed. Service name promoted to the purple title, headline demoted to grey support line. Added cursor spotlight + border glow, visual parallax, focus/dim of other tiles, and per-tile hover replays (tap on touch). |
| 2026-09-28 | Chrome tiles (adapted from threeui "chrome upload", CSS only): metal rim + inner groove, top-lit body, floor shadow, brand-tinted glints drifting slowly around each rim (staggered, 18s lap, speed up on hover, paused off-screen), blurred bloom, sparkles on hover only. Reduced motion: static rim, no sparkles. |
| 2026-09-28 | Designer signed off. Extracted `ServicesSection`, deleted unused `ServiceCard`, kept demos only via legacy. Closing #25 via PR. |
