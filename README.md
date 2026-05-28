# nextgen

Next.js 15 (App Router) full-stack app for **The NextGen Healthcare Marketing**.

Migrated from a Vite + Express two-folder layout into a single deployable Next.js project on 2026-05-28.

## Stack

- Next.js 15 / React 19
- react-router-dom (mounted under a catch-all so the existing SPA pages keep working)
- Tailwind 3, i18next (en/es), GSAP, Lenis, Swiper, Recharts
- Prisma + Postgres (Supabase)
- JWT auth via httpOnly cookies
- Vercel Blob for image uploads
- Gemini-powered RAG chatbot + AI blog generator

## Local dev

```bash
npm install
npx prisma generate
npm run dev
```

Visit http://localhost:3000.

## Required env vars

Copy these into `.env.local` (gitignored) and into Vercel project settings:

```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
JWT_SECRET=...
GEMINI_API_KEY=...
BLOB_READ_WRITE_TOKEN=...
NODE_ENV=production
```

## Deploy

Connect this repo to Vercel — no Root Directory override needed. Next.js is auto-detected at the repo root.
