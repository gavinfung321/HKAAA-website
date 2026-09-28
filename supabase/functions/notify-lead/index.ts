// Supabase Edge Function: email info@ when a new leads row is inserted.
// Deploy: npx supabase functions deploy notify-lead --no-verify-jwt
// Secrets: RESEND_API_KEY, LEAD_NOTIFY_TO (optional), LEAD_NOTIFY_FROM (optional)
// Wire: Database Webhook on public.leads INSERT → this function URL

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type LeadRecord = {
  id?: string;
  name?: string;
  email?: string;
  company?: string | null;
  service?: string;
  message?: string;
  created_at?: string;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  record?: LeadRecord;
  schema?: string;
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = Deno.env.get("LEAD_NOTIFY_TO") ?? "info@hkaiautomation.com";
// Use a verified Resend domain sender in production. Until then Resend allows onboarding@resend.dev for tests.
const NOTIFY_FROM =
  Deno.env.get("LEAD_NOTIFY_FROM") ?? "HKAAA Leads <onboarding@resend.dev>";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY is not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const payload = (await req.json()) as WebhookPayload;
    const record = payload.record ?? (payload as LeadRecord);

    if (!record?.email && !record?.name) {
      return new Response(JSON.stringify({ error: "Missing lead record" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const name = record.name?.trim() || "(no name)";
    const email = record.email?.trim() || "(no email)";
    const service = record.service?.trim() || "(no service)";
    const message = record.message?.trim() || "(no message)";
    const company = record.company?.trim();

    const lines = [
      "New enquiry from the HKAAA website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      ...(company ? [`Company: ${company}`] : []),
      "",
      "Message:",
      message,
      "",
      record.id ? `Lead id: ${record.id}` : "",
      record.created_at ? `Created: ${record.created_at}` : "",
    ].filter(Boolean);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: email.includes("@") ? email : undefined,
        subject: `New lead: ${name} (${service})`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error", res.status, detail);
      return new Response(JSON.stringify({ error: "Email send failed", detail }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
