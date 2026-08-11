# AGENTS.md

## Project

Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 website
for a women's tailoring business. Data-driven: business config in `lib/site.ts`,
services in `lib/services.ts`, validation in `lib/validation.ts`.

## Commands

```bash
npm run dev          # development server
npm run build        # production build (runs lint + typecheck first)
npm run start        # serve production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npm run typecheck    # tsc --noEmit
```

Always run `npm run build` (or at minimum `npm run lint` + `npm run typecheck`)
after making changes.

## Conventions

- **Components**: server components by default; add `"use client"` only when
  needed (forms, state, effects). Named exports, PascalCase files in
  `components/`.
- **Styling**: Tailwind CSS v4 with design tokens defined in `app/globals.css`
  via `@theme` (pine/brass/cream/sand/ink). Reuse `btn-*`, `card`, `container-site`,
  `input-*`, `section-*` utility classes. Do not add inline styles.
- **Imports**: use `@/` alias for `lib/` and `app/`; relative `./` for sibling
  components. Named imports for components (they are named exports).
- **Data**: business contact details come from `lib/site.ts`, overridable via
  `NEXT_PUBLIC_*` env vars. Server secrets (`SMTP_*`, `CONTACT_TO`) are read via
  `process.env` and must never be exposed client-side.
- **Forms**: client components using a zod schema from `lib/validation.ts`
  shared by the client and the API route; never duplicate validation logic.
  Schemas use zod v4 API (`z.email()`, `z.flattenError`).
- **Types**: TypeScript strict. Avoid `any`; cast only at boundaries (e.g. zod
  flatten internals). Never leave unused imports/variables — lint fails the build.
- **API routes**: `app/api/<name>/route.ts`, validate with the shared schema,
  return `{ ok, reference?, fieldErrors?, message? }`. Spam is handled silently:
  a filled honeypot field or submission faster than `FORM_MIN_SECONDS`
  (`lib/validation.ts`) returns HTTP 200 `{ ok: true, spam: true }` so clients
  render the success state. Rate limiting is an in-memory Map (10 req/h per IP)
  — resets on restart and only works on a single instance.
- **Escaping**: escape apostrophes in JSX (`&apos;`). Use `next/link` for
  internal navigation.

## Notes

- Content uses placeholder business data and stock images in `public/images/`.
- `.env.example` documents all supported environment variables.
