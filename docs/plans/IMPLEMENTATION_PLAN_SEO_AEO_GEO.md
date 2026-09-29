# SEO / AEO / GEO — implementation plan

**Status:** Soft SEO pass **shipped** 2026-09-29 — body nudges + prerender + Organization/WebSite. FAQ dropped (K4 D). **K7 done** (Search Console sitemap Success, 6 URLs).  
**Locks:** **K1 C · K2 A · K3 A · K4 D · K5 A′ · K6 A · K7 A**  
**Site:** [hkaiautomation.com](https://hkaiautomation.com/) · `/` EN · `/zh` 繁體  
**Voice:** Website first. AI when ready. Hong Kong team. **機構 / agency** only. No em dashes. No fake proof.

Related: [IMPLEMENTATION_PLAN_I18N.md](IMPLEMENTATION_PLAN_I18N.md) · [I18N_COPY_DRAFT_ZH_HANT.md](I18N_COPY_DRAFT_ZH_HANT.md) · [SEO_COPY_DRAFT.md](SEO_COPY_DRAFT.md) · sitemap already live.  
FAQ: dropped (K4 D). FAQ copy draft file removed.

---

## Goal

Help Hong Kong buyers **find** HKAAA for **Hong Kong web design** and **Hong Kong AI / AI automation**, and give crawlers/models a **citeable org entity** — without a redundant FAQ chapter on an already full one-pager.

| Layer | This pass |
| --- | --- |
| **SEO** | Primary. Titles, body keywords, prerender, sitemap (done), CWV sanity |
| **GEO** | Organization + WebSite JSON-LD (in code; keep in static HTML too) |
| **AEO** | No FAQ UI. Rely on clear section copy (Process / Services / Plans) + org facts. Revisit FAQ only if Search Console / AI answers stay weak after prerender |

---

## Keyword focus (locked — K1 C)

**Dual spine.** Homepage owns both clusters. Do not chase every service as its own URL.

### Cluster A — Web design (Hong Kong)

| Locale | Phrase |
| --- | --- |
| EN | hong kong web design · web design hong kong · hong kong web design agency |
| 繁 | 香港網頁設計 · 香港網站設計 · 香港網頁設計機構 (prefer 機構; people may search 公司) |

### Cluster B — AI / automation (Hong Kong)

| Locale | Phrase |
| --- | --- |
| EN | ai automation · hong kong ai · hong kong ai automation · hong kong ai automation agency |
| 繁 | AI 自動化 · 香港 AI · 香港 AI 自動化 · 香港人工智能自動化機構 |

### Secondary (body / services only)

hong kong seo · chatbot · workflow automation · 香港 SEO · 香港聊天機械人

### Brand

HKAAA · Hong Kong AI Automation Agency · 香港人工智能自動化機構

### Title (K2 A — keep)

`HKAAA | Hong Kong Web Design & AI Automation`  
繁: `HKAAA｜香港網頁設計與 AI 自動化機構`

---

## Why FAQ was dropped

- Hero, Services, Plans, Process, Contact already answer the same questions
- Accordion fought global `h3` styles and felt like a bolted-on SaaS block
- Visible FAQ is optional for ranking; schema without a useful UI is worse
- One-pager should stay short into Contact

---

## Locks

| # | Lock | Choice |
| --- | --- | --- |
| **K1** | Keyword spine | **C** Dual web design + AI automation / Hong Kong AI |
| **K2** | Title | **A** Keep current EN + 繁 titles |
| **K3** | Prerender | **A** Richer static HTML for `/` and `/zh` |
| **K4** | FAQ | **D** None this pass (was A; revised after visual review) |
| **K5** | Schema | **A′** `Organization` + `WebSite` only (no FAQPage) |
| **K6** | URLs | **A** One-pager + legal |
| **K7** | Search Console | **A** Verify + submit sitemap — **done** 2026-09-29 (Success, 6 pages) |

---

## Current state

| Item | Status |
| --- | --- |
| Meta / hreflang / `/zh` | Done |
| Sitemap + robots | Done |
| Privacy / terms | Done |
| Organization + WebSite JSON-LD | In app + bootstrap in `index.html` |
| FAQ section | **Removed** |
| Prerender beyond meta shell | **Open (K3)** |
| Body keyword audit | **Open** |
| Search Console | **Done** — sitemap Success, 6 URLs (2026-09-29) |

---

## This pass — build order

### 1. Ship schema clean (already partly coded)

- [x] Remove FAQ UI + FAQ dictionary + FAQPage
- [x] Organization + WebSite JSON-LD in `index.html` bootstrap + runtime `HomeJsonLd`
- [x] `/zh` postbuild patches WebSite `inLanguage` / url
- [ ] Confirm live after deploy (view-source)

### 2. Body keyword pass

- [x] Hero sub / under-CTA EN + 繁 (dual spine)
- [x] Services sub EN + 繁
- [x] Footer tagline EN + 繁

### 3. Prerender (K3)

- [x] Static summary inside `#root` for EN (`index.html`)
- [x] ZH summary written by `scripts/write-zh-html.mjs`

---

## Out of scope

| Item | Why |
| --- | --- |
| FAQ UI / FAQPage | Dropped |
| Case studies | Separate Phase E item (biggest long-term SEO lever) |
| Blog | Too large |
| Service landers `/services/...` | Wait for real content |
| Keyword-stuffed H1 | Keep brand-led hero |

---

## AEO without FAQ

Answer-ready copy already lives in:

- Hero sub + under-CTA
- Process three steps
- Why Us three reasons
- Services six tiles
- Plans three tiers

After prerender, those strings exist in first HTML. That is enough AEO for v1. If AI Overviews still ignore the brand later, revisit a **short always-open** Q&A (2–3 items), not a full accordion.

---

## Verify

- [ ] FAQ gone from home EN + `/zh`
- [ ] curl/view-source: Organization + WebSite present
- [ ] After K3: `/` and `/zh` static HTML contain locale-correct summary copy
- [ ] No keyword stuffing in first viewport
- [ ] Page walk desktop + mobile into Contact

---

## Opinion

**SEO priority order now:** (1) prerender so `/zh` has Chinese in first HTML, (2) keep Organization schema honest, (3) light body keyword pass, (4) Search Console, (5) case studies later.

FAQ was the wrong section for this brand page. Schema + crawlable copy beat another accordion.

---

## Next action

Confirm K3 approach **A** (expand postbuild static summary), then we implement prerender + any body copy table for your review.
