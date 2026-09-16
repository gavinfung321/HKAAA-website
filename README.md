# Hong Kong AI Automation Agency

Marketing site for [Hong Kong AI Automation Agency](https://hkaiautomation.com/).

Repo: [gavinfung321/HKAAA-website](https://github.com/gavinfung321/HKAAA-website)

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Supabase (`leads` table)
- Calendly for booking
- Netlify for hosting

## Local setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Then:

```bash
npm run dev
```

The app runs at [http://localhost:5173/](http://localhost:5173/).

Do not commit `.env`. The database password is for local Supabase CLI only — do not put it on Netlify.

## Production

Netlify builds `main` and publishes `hkaiautomation.com`. Vite needs the two `VITE_SUPABASE_*` values set as Netlify environment variables, then a new deploy.

## Docs

Plans and issue tracking live in [`docs/`](docs/README.md).
