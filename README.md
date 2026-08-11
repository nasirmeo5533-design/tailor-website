# Abid Ali Tailors — Website

A production-ready Next.js website for a premium women's tailoring and clothing
alteration business (physical workshop in Karachi, Pakistan).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` design tokens)
- Zod v4 validation, nodemailer email delivery
- ESLint 9 flat config

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start the development server         |
| `npm run build`       | Production build + lint + typecheck  |
| `npm run start`       | Serve the production build           |
| `npm run lint`        | Run ESLint                           |
| `npm run typecheck`   | Run TypeScript type checking         |

## Configuration

All business details (name, WhatsApp, address, hours, socials, maps) live in
`lib/site.ts` and can be overridden with `NEXT_PUBLIC_*` environment variables.
Services, FAQs, and testimonials live in `lib/` data files. See `.env.example`
for every supported variable.

## Structure

```
app/            Routes, API handlers (booking/contact/schedule-call), layout
components/     UI components (header, forms, sections, buttons, …)
lib/            Data layer (site config, services, validation, email, SEO)
public/images/  Stock imagery
```

## Notes

- Content uses placeholder data and stock images — no client photos or real
  requirements were used.
- Forms require SMTP credentials (`SMTP_*`, `CONTACT_TO`) for email delivery;
  without them submissions are accepted and logged so the site never fails for
  visitors.
