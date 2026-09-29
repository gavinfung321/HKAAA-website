# Lead email notify — setup

When someone submits the contact form, a row lands in Supabase `leads`. The `notify-lead` Edge Function emails via [Resend](https://resend.com).

**Status (2026-09-29):** Function deployed. DB trigger live. Domain verified; `LEAD_NOTIFY_TO=info@hkaiautomation.com`, from `noreply@hkaiautomation.com`.

- Secrets: `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`
- Function: `notify-lead` deployed (`--no-verify-jwt`)
- Trigger: `notify_lead_on_insert` on `public.leads` (migration `20260929140000_notify_lead_email_trigger.sql`)

## Notes

- Form no longer collects company; old rows may still have it.
- Do not put `RESEND_API_KEY` in Netlify or the Vite app.
- Rotate the Resend key if it was pasted in chat history.