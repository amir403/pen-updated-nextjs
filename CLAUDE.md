# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` holds the repository guidelines (style, commit conventions, validation expectations) and applies here too; this file adds the architecture needed to work across files.

## Commands

Node.js 22.13+, `pnpm@11.25.0` (npm is used on Vercel via `package-lock.json`).

- `pnpm dev` / `pnpm build` — Sites/Vinext/Cloudflare path via `scripts/run-framework.mjs`. `vite.config.ts` imports `.openai/hosting.json`, which is gitignored checkout-local state; on a clean clone without it, these fail.
- `pnpm dev:vercel` / `pnpm build:vercel` — plain Next.js (`--webpack`, port 5173). This is the Vercel deployment path (`vercel.json`) and works on a clean clone.
- `pnpm lint` — ESLint (some pre-existing warnings are expected).
- `pnpm exec tsc --noEmit -p tsconfig.next.json` — typecheck application code (the root `tsconfig.json` also covers `vite.config.ts`, which needs the missing `.openai/hosting.json`).
- Backend (`cd backend`): `php artisan test` (PHPUnit feature tests on in-memory SQLite), `vendor/bin/pint` (style), `php artisan serve`. See `backend/README.md` for MySQL setup, seeding and `admin:create`.

The Next.js side has no test suite. Validate with lint, typecheck, a production build, and manual checks in a browser (desktop + mobile).

## Architecture

**Single client-side site component.** Every page renders `<Site page={slug}/>` from `components/pen-site.tsx` (`'use client'`). `app/page.tsx` passes `"home"`; `app/[slug]/page.tsx` accepts a slug only if it is a key of `pageMeta` or an `articles[].slug` in `lib/content.ts`, otherwise `notFound()`. Inside `Site`, page dispatch is a chain of `if (page === '...')` branches (`Site` → `InfoPage` → `ProgramPage`, plus `ArticlePage`, `Contact`, `Join`, `Legal`, etc.) that delegate to feature components in `components/*.tsx`.

**Adding a page** therefore means: add an entry to `pageMeta` (`[title, hero heading, hero text]`, used for `<title>` and `PageHero`), add a dispatch branch in `pen-site.tsx`, and add it to `nav` in `lib/content.ts` and/or the header search in `components/site-header.tsx` if it should be discoverable. Articles only need an entry in `articles`.

**Data sources.** Editorial copy and nav live in `lib/content.ts`; topic-specific data in `lib/about.ts`, `lib/donations.ts`, `lib/transparency.ts`, `lib/website-outline.ts`; bulk records (268 schools, gallery, resource PDFs, founder images) in `lib/source-data.json`. Images are under `public/images/`.

**Admin-managed content.** Almost all editorial content can be overridden from the Laravel API (see the module list in `docs/ADMIN-CMS-WORK-PLAN.md`); bundled fallbacks live in `lib/*.ts` (`homepage.ts`, `about.ts`, `programmes.ts`, `donations.ts`, `transparency.ts`, `navigation.ts`, `legal.ts`, `site-settings.ts`, …) and `lib/source-data.json`. The server pages (`app/page.tsx`, `app/[slug]/page.tsx`) call `getSiteContent()` (`lib/cms.ts`), which fetches `PEN_API_URL/api/content` (60 s cache, tag `site-content`) and maps it to the `SiteContent` shape in `lib/site-content.ts`, falling back to `staticSiteContent` built from the `lib/` files. `Site` passes it through `SiteContentProvider`; components read it with `useSiteContent()` — never import those collections directly from `lib/content.ts`/`source-data.json` in components. Adding a managed field means touching the Laravel migration/model/controller rules, `SiteContentController`, the seed JSON (`backend/database/seeders/data/site-content.json`), `fromApi` in `lib/cms.ts`, and the field list in `lib/admin-resources.ts`.

**Admin panel.** `app/admin/` (route group `(panel)` is auth-guarded by its layout; `login/` is outside it). Generic list/new/edit pages are driven by `adminResources` in `lib/admin-resources.ts` (`apiPath` defaults to `key`), and settings forms by `adminSettings` (`/admin/settings/[key]`). Small lists use the collections engine: a schema in `backend/config/content.php` (`collections` → rows in `content_items`, CRUD at `/api/collections/{name}`; `settings` → `PUT /api/settings/{key}` with `{value}`), returned by `/api/content` under `collections`/`settings` and read in `lib/cms.ts` with `fromCollection`/`fromSetting`. A new module = schema + seed JSON entry + admin field config + `fromApi` mapping + component reading `useSiteContent()`. Plan and status: `docs/ADMIN-CMS-WORK-PLAN.md`. All API calls happen server-side (`lib/admin-api.ts`, server actions in `app/admin/actions.ts`) with the Sanctum token in the HTTP-only `pen_admin_token` cookie; saves call `updateTag('site-content')` + `revalidatePath` so the public site updates immediately. React resets forms after actions, so forms return submitted `values` (and `RecordForm` remounts) to keep input on validation errors.

**Styling.** Plain CSS classes, not Tailwind utilities, carry most of the design. `app/globals.css` sets up Tailwind 4 + vendored shadcn CSS; per-area stylesheets (`homepage.css`, `donation.css`, `schools.css`, …) are imported individually in `app/layout.tsx` — a new stylesheet must be added there. Dark mode uses the `.dark` class, toggled by `components/site-theme-provider.tsx` (stored as `pen-theme` in localStorage) with the palette in `app/theme.css`; portaled dialogs must be styled there as well.

**Motion.** `components/site-motion.tsx` provides `AnimatedMain`, `HeroCopy`, `PageIntro`, `CountUp`, etc. Effects run once per element, respect reduced-motion (including live changes), and content must remain visible without JavaScript.

**Deployment scaffolding.** `scripts/`, `build/` (tracked sources despite the name), `vite.config.ts`, `cloudflare-env.d.ts`, and the connector files in `lib/connector-*` belong to the Sites/Cloudflare Worker integration. `db/`, `drizzle/`, `examples/d1/` are unused Sites scaffolding; the real backend is the Laravel app in `backend/` (MySQL).

## Content constraints

- No public forms submit to a server: contact prepares a `mailto:` draft, the volunteer form is a browser-only preview, and donations/job applications link to PEN's official site. Don't add success/delivery claims.
- Don't invent figures, dates, documents, contacts or outcomes. `CONTENT-SOURCES.md` records the provenance of every published claim and must be updated when content changes. `WORK-STATUS.md` (Roman Urdu) and `docs/WORK-STATUS-ENGLISH.md` track what is complete vs. pending against the client's PPT and website outline.
