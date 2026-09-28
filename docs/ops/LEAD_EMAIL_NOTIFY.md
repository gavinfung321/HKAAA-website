# Lead email notify — setup

When someone submits the contact form, a row lands in Supabase `leads`. The `notify-lead` Edge Function emails via [Resend](https://resend.com).

**Status (2026-09-29):** Function deployed. DB trigger live. Resend testing mode can only send to `gavinfung321@gmail.com` until `hkaiautomation.com` is verified — so `LEAD_NOTIFY_TO` is set to that Gmail for now.

## Switch to info@hkaiautomation.com

1. In Resend → Domains, add and verify `hkaiautomation.com` (DNS records they show).
2. Then run:

```bash
npx supabase secrets set LEAD_NOTIFY_TO=info@hkaiautomation.com LEAD_NOTIFY_FROM="HKAAA Leads <noreply@hkaiautomation.com>" --project-ref mjufvzqgsigbfjcchzmb
```

3. Submit a test enquiry and confirm mail at info@.

## Already done

- Secrets: `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`
- Function: `notify-lead` deployed (`--no-verify-jwt`)
- Trigger: `notify_lead_on_insert` on `public.leads` (migration `20260929140000_notify_lead_email_trigger.sql`)

## Notes

- Form no longer collects company; old rows may still have it.
- Do not put `RESEND_API_KEY` in Netlify or the Vite app.
- Rotate the Resend key if it was pasted in chat history.