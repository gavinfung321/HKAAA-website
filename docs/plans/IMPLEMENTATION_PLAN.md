# HKAAA website — implementation plan

**Product:** Marketing site for Hong Kong AI Automation Agency (HKAAA)
**Live domain (declared):** [hkaiautomation.com](https://hkaiautomation.com/)
**Repo:** [github.com/gavinfung321/HKAAA-website](https://github.com/gavinfung321/HKAAA-website)
**How we work:** Build properly, then tick the checklist in this file. Do not mark an item done until it is verified (browser, form submit, or deploy — whichever applies).

Plans and issue guides live under `docs/`. Section-specific work gets its own plan in `docs/plans/` and a local brief in `docs/issues/`.

---

## How to use this file

1. Keep **Current snapshot** accurate when the product changes.
2. Tick checklist items with `[x]` only after the work is done and checked.
3. Add notes under an item if the decision changes (copy, pricing, hosting).
4. New work goes into the matching phase — do not leave stray tasks outside the checklist.
5. Follow [../issues/Github_Issue_Guide.md](../issues/Github_Issue_Guide.md) before creating GitHub issues.

---

## Current snapshot

Single-page marketing site. Navigation jumps to sections (no separate routes). GitHub and a new Supabase project are connected. Contact form writes to a live `leads` table.

### Stack

| Layer | Choice |
| --- | --- |
| App | React 18 + TypeScript, Vite |
| Styling | Tailwind CSS, Framer Motion, custom CSS animations |
| Backend | Supabase (`leads` table, anon insert only) |
| Payments | Stripe Payment Links exist; they will leave the public pricing UI (Plan A — see pricing plan) |
| Booking | Calendly (`hkaiautomationagency/30min`) |
| Chat | None on the marketing site (Voiceflow floating button removed — [#3](https://github.com/gavinfung321/HKAAA-website/issues/3)). Chatbot remains a service card + in-section demo. |
| Assets | Imgur (logo, team, “Why Us” images) — to be replaced |
| Source | GitHub `main` |

### Page sections

| Section | What it does today |
| --- | --- |
| Header | Fixed nav: Process, Why Us, Our Services, Pricing, Team, Contact. Mobile menu. Logo + HKAAA wordmark. |
| Hero | “Elevate with better” + rotating **Websites / SEO / Chatbots / Automation**. Brand lockup in hero; left/offset type; proof line; soft fade into Process. CTA → Calendly. Backdrop: cloud-field WebGL. |
| Process | Discovery Call → Solution Design → Implementation. |
| Why Choose Us | Proven Expertise, End-to-End Support, Cutting-Edge Technology. |
| Services | Six cards: Workflow, Chatbot, Lead generation, Web Design, SEO, Content Creation. |
| Testimonials | Carousel. Mix of named quotes and stock-style photos. |
| Pricing | Launch / Practice / Partner, no public prices, one Calendly CTA, no named niche. Heading **Plans for your business**. See [IMPLEMENTATION_PLAN_PRICING.md](IMPLEMENTATION_PLAN_PRICING.md). |
| Team | Gavin Fung, Natalie Tso, plus “Become Our Member?” → `info@hkaiautomation.com`. |
| Contact | Form → Supabase `leads`. Address, phone, email. |
| Footer | Logo, blurb, socials. Two empty columns. |
| Chat | No floating chat widget. Chatbot development service card and in-section demo remain. |

### Lead capture

| Column | Notes |
| --- | --- |
| `id` | UUID |
| `name`, `email`, `message` | required |
| `company` | optional in DB, required in the form |
| `service` | required; `Lead Generation`, `Chatbot Development`, `Workflow Automation`, `Web Design`, `SEO` |
| `created_at` | timestamp |

RLS is on. Anonymous visitors can **insert** only.

---

## Checklist

### Phase 0 — Foundation

- [x] GitHub remote points at `gavinfung321/HKAAA-website`
- [x] `main` tracks `origin/main`
- [x] New Supabase project **HKAAA-website** created and healthy
- [x] Repo linked to the new Supabase project
- [x] `leads` migrations applied
- [x] Contact form insert verified against the live table
- [x] Local `.env` holds `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [x] `.env` gitignored so secrets stay off GitHub
- [x] Site-wide implementation plan created
- [x] GitHub Issues Guide created
- [x] Docs folder for plans and issues created

Notes: Old “Contact Information” project could not be restored (paused 400+ days). Old leads were not recovered.

---

### Phase A — Tighten the current site

Copy, form/data alignment, unused code, and content that is already on the page. Verify in the browser after each change that shares layout or state.

**Copy and content**

- [x] Fix hero line “surcharge leads” — rotating headline (Websites / SEO / Workflows / Outreach) + service subline ([#9](https://github.com/gavinfung321/HKAAA-website/issues/9)); later refined in [#14](https://github.com/gavinfung321/HKAAA-website/issues/14)
- [ ] Site-wide copy pass to match hero voice — follow [IMPLEMENTATION_PLAN_SITE_COPY.md](IMPLEMENTATION_PLAN_SITE_COPY.md) ([#16](https://github.com/gavinfung321/HKAAA-website/issues/16)). Do not code until that plan is approved.
- [x] Testimonials after hero (auto marquee, mixed faces) — follow [IMPLEMENTATION_PLAN_TESTIMONIALS.md](IMPLEMENTATION_PLAN_TESTIMONIALS.md) ([#19](https://github.com/gavinfung321/HKAAA-website/issues/19)).
- [x] Confirm testimonials: keep only real quotes; remove Unsplash / placeholder portraits → done via [#19](https://github.com/gavinfung321/HKAAA-website/issues/19)
- [ ] Plans section visual + placement (match hero craft; Plans stays later than proof) — follow [IMPLEMENTATION_PLAN_PLANS_VISUAL.md](IMPLEMENTATION_PLAN_PLANS_VISUAL.md) ([#18](https://github.com/gavinfung321/HKAAA-website/issues/18)). Do not code until that plan is approved.
- [x] Pricing Plan A: Launch / Practice / Partner, no public prices, one section CTA, website-first with automation still in the quote — follow [IMPLEMENTATION_PLAN_PRICING.md](IMPLEMENTATION_PLAN_PRICING.md)
- [x] Remove the Voiceflow floating chat button — already removed in `f80e6cd`; [#3](https://github.com/gavinfung321/HKAAA-website/issues/3) closed. Chatbot development service card and in-section demo kept.

**Hero visual**

- [x] Portal Field / cloud-field WebGL behind the hero (replace Aurora) — follow [IMPLEMENTATION_PLAN_PORTAL_FIELD_HERO.md](IMPLEMENTATION_PLAN_PORTAL_FIELD_HERO.md) ([#7](https://github.com/gavinfung321/HKAAA-website/issues/7), [PR #8](https://github.com/gavinfung321/HKAAA-website/pull/8)).
- [x] Book a Call gradient-beam CTA — follow [IMPLEMENTATION_PLAN_BOOK_CALL_CTA.md](IMPLEMENTATION_PLAN_BOOK_CALL_CTA.md) ([#11](https://github.com/gavinfung321/HKAAA-website/issues/11), [PR #12](https://github.com/gavinfung321/HKAAA-website/pull/12)).
- [x] Hero craft pass (voice, composition, materials) — follow [IMPLEMENTATION_PLAN_HERO_CRAFT.md](IMPLEMENTATION_PLAN_HERO_CRAFT.md) ([#14](https://github.com/gavinfung321/HKAAA-website/issues/14)).
- [ ] Process section visual polish — follow [IMPLEMENTATION_PLAN_PROCESS_VISUAL.md](IMPLEMENTATION_PLAN_PROCESS_VISUAL.md) ([#17](https://github.com/gavinfung321/HKAAA-website/issues/17)). Do not code until that plan is approved.
- [x] Glass floating header + desktop spring — closed not planned ([#13](https://github.com/gavinfung321/HKAAA-website/issues/13)). Original nav kept; transparent-at-rest from #14.

**Contact form vs services**

- [x] Add Web Design and SEO to the contact dropdown ([#6](https://github.com/gavinfung321/HKAAA-website/issues/6))
- [ ] Add Content Creation to the contact dropdown (still on the six service cards; follow-up)
- [x] Add Web Design and SEO to the `leads.service` check constraint (migration `20260916120000_leads_service_web_design_seo.sql`)
- [x] Submit one test lead for a newly added service and confirm it lands in Supabase (Web Design + SEO inserts verified; test rows deleted)
- [ ] Align DB `company` rules with the form (either make DB NOT NULL or stop marking the field required in the UI)

**Code hygiene**

- [ ] Remove unused `ServiceCard` component (or use it for the six service cards)
- [ ] Remove unused Spline viewer script from `index.html` if still unused
- [ ] Remove unused plan / subscription state from `App.tsx`
- [ ] Fill footer empty columns (sitemap, contact, legal) or collapse the grid so it does not look unfinished

**Repo hygiene**

- [x] Rewrite `README.md` for this project (not StackBlitz / `May-15-`). Also removed unused `.bolt/` and renamed the npm package to `hkaaa-website`.
- [x] Commit `.gitignore`, `.env.example`, and `supabase/config.toml` (no secrets)

**Verify**

- [ ] Walk the full page on desktop: nav, hero CTA, pricing/plans CTAs, contact submit (no Voiceflow button once #3 is done)
- [ ] Walk the same flows on a mobile viewport

---

### Phase B — Assets we own

Stop depending on Imgur (and other hotlinked hosts) for brand-critical images.

- [ ] Move logo into the repo or Supabase Storage; update header, footer, favicon, and Open Graph tags
- [ ] Move “Why Us” images into owned hosting
- [ ] Move team photos into owned hosting
- [ ] Confirm every remaining remote image is intentional (or replace it)
- [ ] Recheck favicon, apple-touch-icon, and social preview after the move

---

### Phase C — Ship

The public site is already on **Netlify**. DNS for `hkaiautomation.com` is Netlify (NSOne / `domains+netlify.netlify.com`). HTTPS responses send `Server: Netlify`.

- [x] Host identified: Netlify (not Vercel, not GitHub Pages)
- [x] Push to `gavinfung321/HKAAA-website` `main` triggered a Netlify production deploy (`hkaiautomation.com` asset hash updated)
- [x] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Netlify env vars (live production JS includes `*.supabase.co` — verified 2026-09-27)
- [x] Production build reached the domain
- [x] Live `hkaiautomation.com` includes Launch / Practice / Partner (no Stripe checkout on plans)
- [x] Domain already points at Netlify
- [x] Recheck contact form on the live domain after env vars are set (env baked into bundle; `supabase` client guard + ContactSection null-safe — [#2](https://github.com/gavinfung321/HKAAA-website/issues/2))

---

### Phase D — Ops

A reliable way to see and act on new leads.

- [ ] Decide the lead inbox: Supabase Table Editor, email alert, Slack, or a private admin view
- [ ] Implement the chosen inbox
- [ ] Confirm a new form submit shows up there
- [ ] Optional: email/Slack notify on insert
- [ ] Optional: basic spam protection (honeypot or rate limit) if the form starts getting junk

---

### Phase E — Content and SEO (only if needed)

Do not start this phase until A–C are done, unless a specific page is blocking launch.

- [ ] Privacy policy
- [ ] Terms of use
- [ ] Sitemap
- [ ] Case studies / work samples
- [ ] Bilingual EN / ZH
- [ ] Richer SEO beyond the current meta tags and schema

---

## Progress log

| Date | What changed |
| --- | --- |
| 2026-09-15 | GitHub remote corrected. New Supabase project created, linked, migrations applied, contact insert verified. Plan and checklist added. |
| 2026-09-15 | Docs folder added (`docs/plans`, `docs/issues`). Pricing Plan A drafted for review. No pricing code. |
| 2026-09-15 | Pricing plan updated for HK CPA/accounting websites (Launch / Practice / Partner). No code. |
| 2026-09-15 | Pricing: one section CTA; website-first wording with chatbot / n8n / outreach still in the quote. No code. |
| 2026-09-15 | Pricing section implemented locally (Launch / Practice / Partner). Issue #1 open for visual review. |
| 2026-09-15 | Pricing copy pass planned: fewer words on cards; drop repeating “Custom quote.” No code. |
| 2026-09-15 | Pricing copy pass implemented locally. Issue #1 open for visual review. |
| 2026-09-15 | Pricing copy de-niched (no CPA / accounting firm). |
| 2026-09-15 | Pricing signed off. Issue #1 closed. Host: Netlify (`hkaiautomation.com`). |
| 2026-09-15 | Chat widget plan drafted (remove Voiceflow button). Issue #3. No code. Issue #2 paused until that is done. |
| 2026-09-27 | #3 closed: Voiceflow already removed (`f80e6cd`). #2 unblocked. |
| 2026-09-27 | #2 closed: live bundle has Supabase URL; client null-guard in place; site no longer white-screens. |
| 2026-09-27 | Book a Call gradient-beam CTA plan drafted (#11). No code until Phase 0 approved. |
| 2026-09-27 | #11 closed via PR #12 — Book a Call glass gradient-beam CTA on main. |
| 2026-09-27 | Glass floating header plan drafted (#13). No code until Phase 0 approved. |
| 2026-09-16 | Repo hygiene: removed `.bolt`, rewrote README, renamed package to `hkaaa-website`. Issue #4. |
| 2026-09-17 | Contact form: Web Design + SEO in dropdown; `leads.service` constraint migration applied; inserts verified (#6). Content Creation still open. |
| 2026-09-27 | Portal Field / cloud-field hero plan drafted (replace Aurora). No code until approved. |
| 2026-09-27 | Closed #5 (cinematic Victoria Harbour hero) as not planned. Hero path is #7 only. |
| 2026-09-27 | #7: cloud-field WebGL hero implemented on branch `feat/issue-7-portal-field-hero` (desktop verified; awaiting sign-off). |
| 2026-09-27 | #7: designer visual sign-off (keep cooler regrade). Merge/close pending. |
| 2026-09-27 | #7 closed via PR #8 merge — cloud-field WebGL hero on main. |
| 2026-09-27 | Hero copy: Web + AI headline; websites/SEO/automation/outreach subline (#9). |
| 2026-09-27 | #14: hero craft pass plan drafted (voice / composition / materials vs DesignCode). No code until Phase 0. |
| 2026-09-27 | #14 signed off: Elevate with better + rotator A; left/offset; deepen CTA; proof line; transparent nav; merge pending. |
| 2026-09-27 | #16: site-wide copy pass plan drafted (match hero voice). No code until Phase 0. |
| 2026-09-27 | #16 paused (visuals first). #17: Process visual polish plan drafted. No code until Phase 0. |
| 2026-09-27 | #18: Plans visual + placement plan drafted (offer shelf vs Process; recommend after hero). No code until Phase 0. |
| 2026-09-27 | #19: Testimonials after hero plan drafted (DesignCode-inspired marquee; Asian faces; no company names). Plans post-hero idea dropped. |
| 2026-09-27 | #19 signed off: marquee strip under hero; DesignCode cards; purple hover; soft seam; no Portal Field. |
