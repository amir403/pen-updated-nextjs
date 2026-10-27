# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` holds the repository guidelines (style, commit conventions, validation expectations) and applies here too; this file adds the architecture needed to work across files.

## Commands

Node.js 22.13+, `pnpm@11.25.0` (npm is used on Vercel via `package-lock.json`).

- `pnpm dev` / `pnpm build` — Sites/Vinext/Cloudflare path via `scripts/run-framework.mjs`. `vite.config.ts` imports `.openai/hosting.json`, which is gitignored checkout-local state; on a clean clone without it, these fail.
- `pnpm dev:vercel` / `pnpm build:vercel` — plain Next.js (`--webpack`, port 5173). This is the Vercel deployment path (`vercel.json`) and works on a clean clone.
- `pnpm lint` — ESLint (some pre-existing warnings are expected).
- `pnpm exec tsc --noEmit` — typecheck. Next.js checks against `tsconfig.next.json`, which excludes the Sites/Cloudflare tooling.

There is no test suite. Validate with lint, typecheck, a production build, and manual checks in a browser (desktop + mobile).

## Architecture

**Single client-side site component.** Every page renders `<Site page={slug}/>` from `components/pen-site.tsx` (`'use client'`). `app/page.tsx` passes `"home"`; `app/[slug]/page.tsx` accepts a slug only if it is a key of `pageMeta` or an `articles[].slug` in `lib/content.ts`, otherwise `notFound()`. Inside `Site`, page dispatch is a chain of `if (page === '...')` branches (`Site` → `InfoPage` → `ProgramPage`, plus `ArticlePage`, `Contact`, `Join`, `Legal`, etc.) that delegate to feature components in `components/*.tsx`.

**Adding a page** therefore means: add an entry to `pageMeta` (`[title, hero heading, hero text]`, used for `<title>` and `PageHero`), add a dispatch branch in `pen-site.tsx`, and add it to `nav` in `lib/content.ts` and/or the header search in `components/site-header.tsx` if it should be discoverable. Articles only need an entry in `articles`.

**Data sources.** Editorial copy and nav live in `lib/content.ts`; topic-specific data in `lib/about.ts`, `lib/donations.ts`, `lib/transparency.ts`, `lib/website-outline.ts`; bulk records (268 schools, gallery, resource PDFs, founder images) in `lib/source-data.json`. Images are under `public/images/`.

**Styling.** Plain CSS classes, not Tailwind utilities, carry most of the design. `app/globals.css` sets up Tailwind 4 + vendored shadcn CSS; per-area stylesheets (`homepage.css`, `donation.css`, `schools.css`, …) are imported individually in `app/layout.tsx` — a new stylesheet must be added there. Dark mode uses the `.dark` class, toggled by `components/site-theme-provider.tsx` (stored as `pen-theme` in localStorage) with the palette in `app/theme.css`; portaled dialogs must be styled there as well.

**Motion.** `components/site-motion.tsx` provides `AnimatedMain`, `HeroCopy`, `PageIntro`, `CountUp`, etc. Effects run once per element, respect reduced-motion (including live changes), and content must remain visible without JavaScript.

**Deployment scaffolding.** `scripts/`, `build/` (tracked sources despite the name), `vite.config.ts`, `cloudflare-env.d.ts`, and the connector files in `lib/connector-*` belong to the Sites/Cloudflare Worker integration. `db/`, `drizzle/`, `examples/d1/` are unused scaffolding — the site has no backend.

## Content constraints

- No forms submit to a server: contact prepares a `mailto:` draft, the volunteer form is a browser-only preview, and donations/job applications link to PEN's official site. Don't add success/delivery claims.
- Don't invent figures, dates, documents, contacts or outcomes. `CONTENT-SOURCES.md` records the provenance of every published claim and must be updated when content changes. `WORK-STATUS.md` (Roman Urdu) and `docs/WORK-STATUS-ENGLISH.md` track what is complete vs. pending against the client's PPT and website outline.
