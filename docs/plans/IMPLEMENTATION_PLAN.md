# HKAAA website — implementation plan

**Product:** Marketing site for Hong Kong AI Automation Agency (HKAAA)
**Live domain (declared):** [hkaiautomation.com](https://hkaiautomation.com/)
**Repo:** [github.com/gavinfung321/HKAAA-website](https://github.com/gavinfung321/HKAAA-website)
**How we work:** Build properly, then tick the checklist in this file. Do not mark an item done until it is verified (browser, form submit, or deploy — whichever applies).

Living checklist lives here. Copy drafts and the issue guide: [docs/README.md](../README.md). Completed section plans and issue briefs were removed 2026-09-29 (history is in git).

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
| Payments | Stripe Payment Links exist; not shown on public Plans UI |
| Booking | Calendly (`hkaiautomationagency/30min`) |
| Chat | No floating widget ([#3](https://github.com/gavinfung321/HKAAA-website/issues/3)). Chatbot is a Services tile only. |
| Assets | `public/brand`, `public/team` (owned). |
| Source | GitHub `main` |

### Page sections

| Section | What it does today |
| --- | --- |
| Header | Fixed nav: Process, Why Us, Our Services, Plans, Team, Contact. Mobile menu. Logo + HKAAA wordmark. |
| Hero | “Elevate with better” + rotating **Websites / SEO / Chatbots / Automation**. Brand lockup in hero; left/offset type; proof line. CTA → Calendly. Backdrop: cloud-field WebGL. |
| Testimonials | Auto marquee strip under the hero ([#19](https://github.com/gavinfung321/HKAAA-website/issues/19)). |
| Process | Left timeline (Discovery Call → Solution Design → Implementation) over Matrix Junction laser ([#17](https://github.com/gavinfung321/HKAAA-website/issues/17)). |
| Why Choose Us | Centered header, three 3D glass cards (Proven delivery / One team through launch / Ready for what comes next) over violet background paths ([#23](https://github.com/gavinfung321/HKAAA-website/issues/23)). |
| Services | Two-row bento (website first), chrome tiles + one animated visual each ([#25](https://github.com/gavinfung321/HKAAA-website/issues/25)). |
| Plans | Launch / Practice / Partner glass 3D cards, no public prices, one Calendly CTA. Heading **Plans for your business** ([#18](https://github.com/gavinfung321/HKAAA-website/issues/18) signed off). |
| Team | Gavin Fung + Natalie Tso only (join CTA removed). Quiet plates + Blaze backdrop ([#31](https://github.com/gavinfung321/HKAAA-website/issues/31) signed off). |
| Contact | Quiet plates + website-first form → Supabase `leads`. Address, phone, email ([#32](https://github.com/gavinfung321/HKAAA-website/issues/32) signed off). |
| Footer | Brand / Explore / Connect over terrain wireframe ([#33](https://github.com/gavinfung321/HKAAA-website/issues/33) signed off). |
| Chat | No floating chat widget. Chatbot development is a Services tile. |

### Lead capture

| Column | Notes |
| --- | --- |
| `id` | UUID |
| `name`, `email`, `message` | required |
| `company` | optional in DB; **removed from the public form** (2026-09-29) |
| `service` | required; `Lead Generation`, `Chatbot Development`, `Workflow Automation`, `Web Design`, `SEO`, `Content Creation` (migration ready; apply when Supabase is unpaused) |
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
- [x] Site-wide copy pass to match hero voice ([#16](https://github.com/gavinfung321/HKAAA-website/issues/16)). Signed off 2026-09-29.
- [x] Testimonials after hero (auto marquee, mixed faces) ([#19](https://github.com/gavinfung321/HKAAA-website/issues/19)).
- [x] Confirm testimonials: keep only real quotes; remove Unsplash / placeholder portraits → done via [#19](https://github.com/gavinfung321/HKAAA-website/issues/19)
- [x] Plans section visual + placement (glass 3D cards; keep late after Services) ([#18](https://github.com/gavinfung321/HKAAA-website/issues/18)).
- [x] Team section visual polish ([#31](https://github.com/gavinfung321/HKAAA-website/issues/31)). Signed off 2026-09-28.
- [x] Contact / Get in Touch visual polish ([#32](https://github.com/gavinfung321/HKAAA-website/issues/32)). Signed off 2026-09-28.
- [x] Footer visual polish + wireframe landscape ([#33](https://github.com/gavinfung321/HKAAA-website/issues/33)). Signed off 2026-09-29.
- [x] Fill footer empty columns (sitemap, contact, legal) or collapse the grid so it does not look unfinished — done via [#33](https://github.com/gavinfung321/HKAAA-website/issues/33) Brand / Explore / Connect.
- [x] Pricing Plan A: Launch / Practice / Partner, no public prices, one section CTA, website-first with automation still in the quote
- [x] Remove the Voiceflow floating chat button — already removed in `f80e6cd`; [#3](https://github.com/gavinfung321/HKAAA-website/issues/3) closed. Chatbot remains a Services tile.

**Hero visual**

- [x] Portal Field / cloud-field WebGL behind the hero (replace Aurora) ([#7](https://github.com/gavinfung321/HKAAA-website/issues/7), [PR #8](https://github.com/gavinfung321/HKAAA-website/pull/8)).
- [x] Book a Call gradient-beam CTA ([#11](https://github.com/gavinfung321/HKAAA-website/issues/11), [PR #12](https://github.com/gavinfung321/HKAAA-website/pull/12)).
- [x] Hero craft pass (voice, composition, materials) ([#14](https://github.com/gavinfung321/HKAAA-website/issues/14)).
- [x] Process section visual polish ([#17](https://github.com/gavinfung321/HKAAA-website/issues/17)).
- [x] Why Choose Us visual polish ([#23](https://github.com/gavinfung321/HKAAA-website/issues/23), [PR #24](https://github.com/gavinfung321/HKAAA-website/pull/24)).
- [x] Our Services visual polish ([#25](https://github.com/gavinfung321/HKAAA-website/issues/25)).
- [x] Testimonials brand 3D plate polish — closed not using ([#27](https://github.com/gavinfung321/HKAAA-website/issues/27)). Keep current testimonials look.
- [x] Testimonials vortex particle background — closed not using ([#28](https://github.com/gavinfung321/HKAAA-website/issues/28)). Keep current background.
- [x] Stack tools logo carousel above testimonials — closed; logos good as shipped ([#29](https://github.com/gavinfung321/HKAAA-website/issues/29)).
- [x] Glass floating header + desktop spring — closed not planned ([#13](https://github.com/gavinfung321/HKAAA-website/issues/13)). Original nav kept; transparent-at-rest from #14.

**Contact form vs services**

- [x] Add Web Design and SEO to the contact dropdown ([#6](https://github.com/gavinfung321/HKAAA-website/issues/6))
- [x] Add Content Creation to the contact dropdown (matches six service cards)
- [x] Add Web Design and SEO to the `leads.service` check constraint (migration `20260916120000_leads_service_web_design_seo.sql`)
- [x] Add Content Creation to the `leads.service` check constraint (migration `20260929120000_leads_service_content_creation.sql` — apply when Supabase project is unpaused)
- [x] Submit one test lead for a newly added service and confirm it lands in Supabase (Web Design + SEO inserts verified; test rows deleted)
- [x] Align DB `company` rules with the form — company removed from the public form (DB column stays optional)

**Code hygiene**

- [x] Remove unused `ServiceCard` component (or use it for the six service cards) — deleted in [#25](https://github.com/gavinfung321/HKAAA-website/issues/25)
- [x] Remove unused Spline viewer script from `index.html`
- [x] Remove unused plan / subscription state from `App.tsx` — already gone (no leftover Stripe/plan selection state)
- [x] Mobile burger menu readable on hero ([#34](https://github.com/gavinfung321/HKAAA-website/issues/34)). Option A + quiet-fill Contact Us; signed off 2026-09-29.
- [x] Nav bar polish (labels, active section, Contact) ([#35](https://github.com/gavinfung321/HKAAA-website/issues/35)). Soft hover plate; signed off 2026-09-29.
- [x] Remove unmounted `HongKongSkyline` and the `three` / `@types/three` deps (left over from #23)
- [x] Fill footer empty columns (sitemap, contact, legal) or collapse the grid so it does not look unfinished — done via [#33](https://github.com/gavinfung321/HKAAA-website/issues/33) Brand / Explore / Connect.

**Repo hygiene**

- [x] Rewrite `README.md` for this project (not StackBlitz / `May-15-`). Also removed unused `.bolt/` and renamed the npm package to `hkaaa-website`.
- [x] Commit `.gitignore`, `.env.example`, and `supabase/config.toml` (no secrets)

**Verify**

- [x] Walk the full page on desktop: nav, hero CTA, pricing/plans CTAs, contact submit — done 2026-09-29 (local walk)
- [x] Walk the same flows on a mobile viewport — done 2026-09-29 (390×844)

---

### Phase B — Assets we own

Stop depending on Imgur (and other hotlinked hosts) for brand-critical images.

- [x] Move logo into the repo or Supabase Storage; update header, footer, favicon, and Open Graph tags — `public/brand/logo.png`
- [x] Move “Why Us” images into owned hosting — not needed: images removed in [#23](https://github.com/gavinfung321/HKAAA-website/issues/23)
- [x] Move team photos into owned hosting — `public/team/gavin.png`, `public/team/natalie.png`
- [x] Confirm every remaining remote image is intentional (or replace it) — brand/team under `public/`; no Imgur
- [x] Recheck favicon, apple-touch-icon, and social preview after the move — points at `/brand/logo.png` / absolute OG URLs

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

- [x] Decide the lead inbox: email to info@hkaiautomation.com (Resend) + Supabase Table Editor
- [x] Implement the chosen inbox — `notify-lead` Edge Function + pg_net trigger; see [docs/ops/LEAD_EMAIL_NOTIFY.md](../ops/LEAD_EMAIL_NOTIFY.md)
- [x] Confirm a new form submit shows up there — page-walk insert verified 2026-09-29 (test row deleted)
- [x] Optional: email/Slack notify on insert — Resend → info@ live
- [x] Optional: basic spam protection — client honeypot on contact form (fake success, no insert); rate limit still open if needed later

---

### Phase E — Content and SEO (only if needed)

Do not start this phase until A–C are done, unless a specific page is blocking launch.

- [x] Privacy policy — `/privacy` · `/zh/privacy`. HK PDPO. Copy: [LEGAL_COPY_DRAFT.md](LEGAL_COPY_DRAFT.md)
- [x] Terms of use — `/terms` · `/zh/terms`. HK governing law. Same draft.
- [x] Sitemap — `public/sitemap.xml` + `robots.txt` (EN/`zh` home, privacy, terms + hreflang)
- [ ] Case studies / work samples
- [x] **Traditional Chinese language switcher** (EN ↔ 繁體中文) — `/` EN · `/zh` 繁體; Copy: [I18N_COPY_DRAFT_ZH_HANT.md](I18N_COPY_DRAFT_ZH_HANT.md). Shipped.
- [x] **SEO / AEO / GEO pass** — soft body + prerender + Organization/WebSite + Search Console sitemap (6 URLs). FAQ dropped. Copy: [SEO_COPY_DRAFT.md](SEO_COPY_DRAFT.md).

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
| 2026-09-27 | #17 signed off: left timeline, Matrix Junction laser (right focus), soft seams; legacy cards saved. |
| 2026-09-27 | #18: Plans visual + placement plan drafted (offer shelf vs Process; recommend after hero). No code until Phase 0. |
| 2026-09-27 | #18 signed off: centered header; glass 3D cards with cursor spotlight; keep late; Partner “Site plus automation.” |
| 2026-09-27 | #23: Why Choose Us visual polish plan drafted. No code until Phase 0. |
| 2026-09-27 | #19: Testimonials after hero plan drafted (DesignCode-inspired marquee; Asian faces; no company names). Plans post-hero idea dropped. |
| 2026-09-27 | #19 signed off: marquee strip under hero; DesignCode cards; purple hover; soft seam; no Portal Field. |
| 2026-09-28 | #23 closed via PR #24: centered 3D glass cards over violet background paths; Imgur zig-zag removed. |
| 2026-09-28 | #25: Our Services visual polish plan drafted (recommend bento grid, website first). No code until Phase 0. |
| 2026-09-28 | #25 closed: two-row bento, website-first order, chrome tiles + six quiet visuals; designer signed off. |
| 2026-09-28 | Removed unmounted `HongKongSkyline` and uninstalled `three` / `@types/three` (leftover from #23). Footer left for designer. |
| 2026-09-28 | #27: Testimonials dark paper / vellum card polish plan drafted (CSS+SVG; no Three.js). No code until Phase 0. |
| 2026-09-28 | #28: Testimonials vortex particle background — Three.js Points (no R3F); cool violet→blue; implementing. |
| 2026-09-28 | #31 closed: Team two-up quiet plates + Blaze backdrop; join CTA removed; bios trimmed. |
| 2026-09-28 | #32 closed: Contact quiet plates, website-first form, Send enquiry; footer still open. |
| 2026-09-29 | #33 closed: Footer Brand/Explore/Connect + terrain-first wireframe landscape (pointer parallax). |
| 2026-09-29 | Closed #27/#28/#29 (not using paper/vortex/carousel). Dropped unused Spline script. Content Creation added to contact dropdown + migration file. DB push blocked: Supabase project paused. Plan/subscription state already absent from App.tsx. |
| 2026-09-29 | #34 closed: mobile burger uses scrolled chrome while open; quiet-fill Contact Us. |
| 2026-09-29 | #16 closed: site-wide copy pass (Process → Footer) to match hero voice; no em dashes. |
| 2026-09-29 | Company field removed from form. Logo + team photos moved to `public/`. Lead email notify function drafted (Resend → info@); needs secrets + webhook. |
| 2026-09-29 | Backlog: Traditional Chinese (繁體) language switcher noted under Phase E. No code until prioritized. |
| 2026-09-29 | #35: Nav polish plan drafted (labels / scroll-spy / Contact / a11y). Phase 0; no code until locked. |
| 2026-09-29 | #35 closed: Services label, scroll-spy, quiet Contact, soft hover plate (no hover underline). |
| 2026-09-29 | Full page walk desktop + mobile (390): nav/CTAs/form OK; no Voiceflow; owned assets; lead insert verified. Meta description still old AI voice. |
| 2026-09-29 | Meta/OG/Twitter copy aligned to hero voice. Natalie photo compressed (~10MB PNG → ~100KB JPEG). Burger aria-label added. |
| 2026-09-29 | Backlog: SEO / AEO / GEO pass noted under Phase E (with 繁體 switcher). No code until prioritized. |
| 2026-09-29 | Contact honeypot: hidden website field; filled = fake success, no leads insert. |
| 2026-09-29 | Phase 0: Traditional Chinese switcher plan drafted. Awaiting locks. |
| 2026-09-29 | I18n locks: 1A 2A 3A 4-table 5B 6A 7A. 繁體 copy draft for review: [I18N_COPY_DRAFT_ZH_HANT.md](I18N_COPY_DRAFT_ZH_HANT.md). |
| 2026-09-29 | I18n lock **1 revised A→B**: `/zh` slug for ranking; Netlify SPA + hreflang in this pass; prerender may follow in SEO pass. |
| 2026-09-29 | 繁體 copy draft marked ready for v1 (meta/hero/testimonials edits). Awaiting go to implement switcher. |
| 2026-09-29 | I18n implement: LocaleProvider, `/`·`/zh`, EN\|繁 toggle, dictionaries, Netlify SPA `_redirects`, hreflang/meta. |
| 2026-09-29 | Privacy + Terms live: `/privacy` `/terms` and `/zh` twins. HK PDPO / implied services terms. No amount cap. Name: HKAAA. |
| 2026-09-29 | Sitemap + robots.txt: six indexable URLs with hreflang alternates. |
| 2026-09-29 | SEO/AEO/GEO Phase 0 drafted. Dual spine: HK web design + AI automation / Hong Kong AI. Awaiting K1–K7. |
| 2026-09-29 | Soft SEO shipped: hero/services nudges, static `#root` prerender EN+繁, Organization JSON-LD. FAQ out. K7 Search Console still ops. |
| 2026-09-29 | K7 done: Search Console sitemap Success, 6 discovered URLs. SEO/AEO/GEO pass complete for this phase. |
| 2026-09-29 | FAQ removed after review. K4 → D. SEO plan refocused on prerender + Organization + dual keywords. |
| 2026-09-29 | Docs cleanup: removed completed section plans + issue briefs; dropped unused legacy demos, aurora, vortex. |
