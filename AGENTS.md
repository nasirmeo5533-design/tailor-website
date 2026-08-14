# AGENTS.md

## Project

Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 website
for an online ladies tailoring service in Karachi (business model: sahiSe.com).
Customers pick a stitch pattern or design, choose fabric (their own or we source
it), share measurements online, and the finished outfit is stitched and
delivered to their doorstep. Data-driven: business config in `lib/site.ts`,
design showcase in `lib/designs.ts`, services in `lib/services.ts`, validation
in `lib/validation.ts`.

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
  via `@theme`. Palette is light purple / white / black, mapped onto the token
  names `pine` (purple primary), `brass` (lavender accent), `cream`/`sand`
  (light purple-tinted whites), `ink` (near-black). Reuse `btn-*`, `card`,
  `container-site`, `input-*`, `section-*` utility classes. Do not add inline
  styles or hardcoded hex colors — use theme tokens only.
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
- **Custom order route**: `app/api/custom-order` is the one exception to the
  JSON contract — it reads `request.formData()` (multipart) to support an
  optional reference-design image. Validate the file server-side: image MIME
  only (jpeg/png/webp/heic), max `2 * 1024 * 1024` bytes, attached to the
  email via nodemailer `attachments`. Keep the client in sync (same zod schema,
  same honeypot + `submittedAt` fields).
- **Escaping**: escape apostrophes in JSX (`&apos;`). Use `next/link` for
  internal navigation.

## Deployment

- Requires a Node host with serverless API routes (the 4 `app/api/*` routes
  handle the forms and need `SMTP_*`/`CONTACT_TO`). **Vercel is the target** —
  connect the repo, set all env vars from `.env.example`.
- **Do not** add `output: "export"` or `images.unoptimized` to
  `next.config.ts` — GitHub Pages/static hosts cannot run the API routes and
  break `next/image` optimization. Only static hosts make sense if the forms
  are reworked to non-API endpoints.

## Notes

- Content uses placeholder business data and stock images in `public/images/`.
- `.env.example` documents all supported environment variables.
