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
| Chat | Voiceflow widget |
| Assets | Imgur (logo, team, “Why Us” images) — to be replaced |
| Source | GitHub `main` |

### Page sections

| Section | What it does today |
| --- | --- |
| Header | Fixed nav: Process, Why Us, Our Services, Pricing, Team, Contact. Mobile menu. Logo + HKAAA wordmark. |
| Hero | “Transform Your Business With AI Automation.” CTA → Calendly. |
| Process | Discovery Call → Solution Design → Implementation. |
| Why Choose Us | Proven Expertise, End-to-End Support, Cutting-Edge Technology. |
| Services | Six cards: Workflow, Chatbot, Lead generation, Web Design, SEO, Content Creation. |
| Testimonials | Carousel. Mix of named quotes and stock-style photos. |
| Pricing | Launch / Practice / Partner, no public prices, one Calendly CTA, no named niche. Heading **Plans for your business**. See [IMPLEMENTATION_PLAN_PRICING.md](IMPLEMENTATION_PLAN_PRICING.md). |
| Team | Gavin Fung, Natalie Tso, plus “Become Our Member?” → `info@hkaiautomation.com`. |
| Contact | Form → Supabase `leads`. Address, phone, email. |
| Footer | Logo, blurb, socials. Two empty columns. |
| Chat | Voiceflow loaded from `index.html`. |

### Lead capture

| Column | Notes |
| --- | --- |
| `id` | UUID |
| `name`, `email`, `message` | required |
| `company` | optional in DB, required in the form |
| `service` | required; only `Lead Generation`, `Chatbot Development`, `Workflow Automation` |
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

- [ ] Fix hero line “surcharge leads” (replace with agreed copy, e.g. “source” or “capture”)
- [ ] Confirm all on-page copy is the language we want to ship (hero, process, services, pricing, team bios)
- [ ] Confirm testimonials: keep only real quotes; remove Unsplash / placeholder portraits
- [x] Pricing Plan A: Launch / Practice / Partner, no public prices, one section CTA, website-first with automation still in the quote — follow [IMPLEMENTATION_PLAN_PRICING.md](IMPLEMENTATION_PLAN_PRICING.md)

**Contact form vs services**

- [ ] Add Web Design, SEO, and Content Creation to the contact dropdown
- [ ] Add the same three values to the `leads.service` check constraint (new migration)
- [ ] Submit one test lead for a newly added service and confirm it lands in Supabase
- [ ] Align DB `company` rules with the form (either make DB NOT NULL or stop marking the field required in the UI)

**Code hygiene**

- [ ] Remove unused `ServiceCard` component (or use it for the six service cards)
- [ ] Remove unused Spline viewer script from `index.html` if still unused
- [ ] Remove unused plan / subscription state from `App.tsx`
- [ ] Fill footer empty columns (sitemap, contact, legal) or collapse the grid so it does not look unfinished

**Repo hygiene**

- [ ] Rewrite `README.md` for this project (not StackBlitz / `May-15-`)
- [ ] Commit `.gitignore`, `.env.example`, and `supabase/config.toml` (no secrets)

**Verify**

- [ ] Walk the full page on desktop: nav, hero CTA, pricing/plans CTAs, contact submit, chat widget
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
- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Netlify env vars (missing from the live JS bundle — contact form will fail until set)
- [x] Production build reached the domain
- [x] Live `hkaiautomation.com` includes Launch / Practice / Partner (no Stripe checkout on plans)
- [x] Domain already points at Netlify
- [ ] Recheck contact form on the live domain after env vars are set

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
