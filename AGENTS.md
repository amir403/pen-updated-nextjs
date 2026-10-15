# Repository Guidelines

## Project Structure & Module Organization
This PEN website uses React, strict TypeScript, Vinext, and Tailwind CSS. `app/` contains the root layout, homepage, dynamic `[slug]` route, and global styles. `components/pen-site.tsx` holds the site shell and page views; `components/ui/` contains vendored shadcn primitives. Keep editorial content and navigation in `lib/content.ts`, structured school/resource records in `lib/source-data.json`, and static assets in `public/`.

`scripts/` and `build/` maintain the Sites/Vite/Cloudflare integration; `build/` contains tracked source files. `db/`, `drizzle/`, and `examples/d1/` provide database scaffolding; the public website has no configured application database. No automated test suite is currently configured.

## Build, Test, and Development Commands
Use Node.js 22.13+ and the pinned `pnpm@11.25.0` package manager.

- `pnpm install`: install dependencies.
- `pnpm dev`: run local development, normally on port 5173.
- `pnpm build`: produce the production build through the environment-aware framework wrapper.
- `pnpm start`: preview the built Worker locally with Wrangler; requires build output.
- `pnpm lint`: run ESLint with Next.js and TypeScript rules.
- `pnpm exec tsc --noEmit`: check TypeScript without emitting files.
- `pnpm db:generate`: generate Drizzle migrations when intentionally changing database scaffolding.

Preserve the framework wrappers and Sites Vite integration when modifying deployment behavior.

## Coding Style & Naming Conventions
Follow the surrounding file's formatting; existing site JSX is compact, while configuration files generally use two-space indentation. No Prettier configuration is present. Use PascalCase for React components, `use` prefixes for hooks, lowercase hyphenated component filenames, and descriptive types. Prefer `@/` imports for repository modules. Reuse existing UI primitives and CSS classes; avoid unrelated formatting changes to vendored components.

## Testing Guidelines
Run lint, TypeScript checks, and a production build before submitting code changes. No test runner, test naming convention, or coverage threshold is established. Manually verify affected routes, mobile navigation, search/filter controls, dialogs, and external links. For visual changes, check desktop and mobile layouts and capture screenshots.

## Commit & Pull Request Guidelines
The short Git history uses imperative subjects such as `Fix Windows development server startup`; continue with concise, descriptive subjects. Pull requests should explain the behavior changed, list validation performed, link relevant issues, and include screenshots for UI changes.

## Content & Configuration
Consult `CONTENT-SOURCES.md` when changing published figures, documents, or integration behavior. Preserve official donation/application links and the contact form's email-draft behavior. Keep credentials and local runtime state out of commits; `.env*` files are ignored.
