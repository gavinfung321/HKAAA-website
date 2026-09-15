# Chat widget — remove the Voiceflow button

**Status:** Implemented locally. Waiting on visual check.
**GitHub issue:** [#3 — Remove the Voiceflow AI chatbot button](https://github.com/gavinfung321/HKAAA-website/issues/3)
**Parent plan:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) → Phase A

**Paused until this is done:** [#2](https://github.com/gavinfung321/HKAAA-website/issues/2) — live Supabase / `createClient` / Netlify env vars.

---

## What this is

The purple round button in the bottom-right corner of the site. It opens an AI chat. That widget is **Voiceflow**.

It is **not**:

- The **Chatbot development** service card
- The small fake chat UI inside the services section (`ChatbotDemo`)
- Calendly or the contact form

Those stay.

---

## Decision to approve

**Take the Voiceflow button off the site. Do not put another chat widget in its place in this issue.**

We can add a chat widget again later as its own issue.

**Ways to get in touch after this:**

- Book a strategy call (Calendly)
- Contact form
- Phone / email on the contact block

---

## What to remove (after approval)

| Piece | Where | Why |
| --- | --- | --- |
| Voiceflow script | `index.html` | This is what draws the purple button |
| `ChatbotWidget` | `src/App.tsx` | Unused wrapper around that script |
| `ChatbotWidget.tsx` | `src/components/` | No longer needed once the widget is gone |

## What to keep

| Piece | Why |
| --- | --- |
| Services card: Chatbot development | We still sell chatbots |
| In-section chatbot demo | Product illustration, not a live agent |
| Calendly CTAs | Primary booking path |
| Contact form | Lead capture |

---

## How to check (after code, not now)

- Desktop: no purple chat button, rest of the page still works
- Mobile: same
- Live `hkaiautomation.com` after the next Netlify deploy: button gone there too

---

## Out of scope

- Replacing Voiceflow with another chat product
- Changing chatbot service copy or the demo conversation
- Issue #2 (blank live site / missing Netlify Supabase keys)
