# Issue 002 — Missing Supabase env crash

**GitHub:** https://github.com/gavinfung321/HKAAA-website/issues/2  
**Title:** Bug: Missing Supabase env vars crash the live site  
**Labels:** `bug`  
**Milestone:** v1.1 — Tighten the current site  
**Status:** Closed — 2026-09-27

## Outcome

- `src/lib/supabase.ts` skips `createClient` when env is missing (`supabase` is `null`)
- `ContactSection` shows an error state instead of crashing when the client is null
- Live `hkaiautomation.com` production JS includes a `*.supabase.co` URL (Netlify env vars are set)

## Context (original)

Live site white-screened because `createClient` threw when Netlify had not baked `VITE_SUPABASE_*` into the build.
