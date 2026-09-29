# Traditional Chinese language switcher — implementation plan

**Status:** Implemented locally 2026-09-29 — awaiting designer walk + push  

**Locks:** **1B** · 2A · 3A · 4 as table · **5B** · **6A** · **7A**

| # | Lock |
| --- | --- |
| 1 | **B** — `/` = EN, `/zh` = 繁體. Toggle changes path. Netlify SPA fallback. `hreflang` + canonical. (Was 1A; revised for ranking.) |
| 2 | A — default EN on `/`; `/zh` is 繁體. Remember last choice only when landing on `/` without a lang path (optional; path wins when present). |
| 3 | A — header **EN \| 繁** |
| 4 | As table (brand/names/tools EN; service values EN for DB) |
| 5 | **B** — full 繁體 translation of testimonial quotes |
| 6 | **A** — LocaleProvider + dictionaries (no i18n npm) |
| 7 | **A** — draft 繁體 first; designer reviews before domain push → [I18N_COPY_DRAFT_ZH_HANT.md](I18N_COPY_DRAFT_ZH_HANT.md) |

---

## Goal

Hong Kong clients can read the full marketing page in Traditional Chinese **and** Google can treat 繁體 as its own URL for ranking / AEO / GEO.

- `/` → English  
- `/zh` → 繁體中文  
- Header toggle switches locale **and** path  
- Brand (HKAAA) stays English  
- No em dashes in new copy  

---

## Opinion (why adjust)

Prefer **`/zh` now** if ranking matters. Shipping toggle-only (1A) then bolting on `/zh` later means redoing URL sync, meta, and Netlify. Path + dictionaries in one pass is the right cut.

Be honest about crawl depth:

| Layer | This pass | Why |
| --- | --- | --- |
| Addressable `/zh` URL | **Yes** | Required for ranking intent |
| Toggle ↔ path sync | **Yes** | UX + shareable Chinese link |
| Netlify rewrite `/* → /index.html` | **Yes** | Otherwise `/zh` 404s |
| `hreflang` + per-locale canonical | **Yes** | Tells Google EN ↔ 繁 are alternates |
| `html lang` + document title/description | **Yes** | Correct language signal in rendered DOM |
| **Prerender / SSG of `/` and `/zh`** | **Stretch / follow-up** | Full SEO needs Chinese in first HTML, not only after JS. Vite SPA alone is a partial win. Note under SEO/AEO/GEO if we defer. |

Slug choice: **`/zh`** (short). Hreflang value: `zh-Hant` (Traditional). Not `zh.example.com`.

---

## Out of scope (this pass)

| Item | Why |
| --- | --- |
| Subdomain `zh.hkaiautomation.com` | Split authority; unnecessary |
| Auto geo/IP redirect to `/zh` | Blocks crawlers; surprises EN visitors |
| Full Next.js / SSR migration | Too large; dictionaries stay portable |
| Instantly / outreach mail | Ops |
| Privacy / terms pages | Not built yet |
| Translating tool brand names | Stay EN |

---

## Phase 0 — Lock 1 (revised)

### 1. URL / persistence

| Option | What | Notes |
| --- | --- | --- |
| A | Same URL + localStorage + `?lang=` | UX only; weak for ranking |
| **B (locked)** | `/` EN · `/zh` 繁體 · toggle updates path · localStorage mirrors path | Ranking-ready URL; needs Netlify SPA fallback |
| C | Query only | Not for indexable locales |

**Lock:** **B** — path `/zh` (hreflang `zh-Hant`)

### 2–7

Unchanged from prior locks (2A, 3A, 4 table, 5B, 6A, 7A). Meta/OG for active locale moves **into this pass** (not deferred entirely to SEO phase), because `/zh` without Chinese title/description is hollow.

**§4 update:** `index.html` shell stays EN defaults; on `/zh` runtime (and prerender later) set title, description, `og:locale`, canonical, hreflang.

---

## Build sketch (after copy sign-off)

1. `src/i18n/` — locale type (`en` | `zh-Hant`), dictionaries from signed draft, `LocaleProvider`, `t` / `useLocale`
2. **Path sync** — lightweight: read `location.pathname` (`/` vs `/zh`); on toggle `history.pushState` + set locale (avoid full react-router unless it stays tiny). Section hashes stay (`/zh#contact-section`)
3. **Netlify** — `public/_redirects` or `netlify.toml`: SPA fallback so `/zh` serves the app
4. Header **EN \| 繁** — navigates to `/` or `/zh` (preserve hash when sensible)
5. Wire all public sections to dictionaries (hero → footer + service visuals microcopy)
6. Contact: 繁體 labels; service **values** EN
7. Head tags on locale change: `document.title`, meta description, `link[rel=canonical]`, `link[rel=alternate] hreflang` (`en`, `zh-Hant`, `x-default`), `html lang`
8. Desktop + mobile walk on `/` and `/zh`
9. Sign-off → push domain
10. **Follow-up (SEO pass if not in this PR):** prerender `/` + `/zh` so crawlers see Chinese without waiting on JS

---

## Verify

- [ ] `/` is EN; `/zh` is 繁體; toggle switches path
- [ ] Hard refresh on `/zh` keeps 繁體 (no bounce to EN)
- [ ] Direct open `https://hkaiautomation.com/zh` works (no Netlify 404)
- [ ] `hreflang` + canonical present for both locales
- [ ] Full page 繁體: no leftover English UI (except locked exceptions)
- [ ] Contact insert OK; service value English
- [ ] Layout OK for Chinese line lengths (hero, nav, plans)
- [ ] Optional: View Source / curl still EN shell until prerender — known limitation, logged

---

## Parent checklist

Update [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) Phase E item to point at `/zh` + this plan. SEO/AEO/GEO pass still owns deeper schema, sitemap enrichment, and prerender if deferred.
