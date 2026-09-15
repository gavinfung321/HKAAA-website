# Issue 002 — Missing Supabase env crash

**GitHub:** https://github.com/gavinfung321/HKAAA-website/issues/2  
**Title:** Bug: Missing Supabase env vars crash the live site  
**Labels:** `bug`  
**Milestone:** v1.1 — Tighten the current site  
**Status:** Open — paused until issue #3 (remove Voiceflow button) is done

## Context

Live `hkaiautomation.com` white-screens because `createClient` throws when Netlify did not bake `VITE_SUPABASE_*` into the JS bundle. The contact form never mounts.

## Approach

- Guard `src/lib/supabase.ts` so a missing URL/key does not throw
- Contact form uses the existing error state when the client is unavailable
- Form still inserts into `leads` when env vars are present
