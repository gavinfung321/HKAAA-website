/*
  # Email notify on new lead

  After insert on public.leads, POST the row to the notify-lead Edge Function
  (Resend → LEAD_NOTIFY_TO). Requires pg_net.
*/

create extension if not exists pg_net with schema extensions;

create or replace function public.notify_lead_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://mjufvzqgsigbfjcchzmb.supabase.co/functions/v1/notify-lead',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', to_jsonb(NEW)
    )
  );
  return NEW;
end;
$$;

drop trigger if exists notify_lead_on_insert on public.leads;

create trigger notify_lead_on_insert
  after insert on public.leads
  for each row
  execute function public.notify_lead_email();
