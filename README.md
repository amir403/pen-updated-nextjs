# Progressive Education Network

A responsive 39-page React/TypeScript website with PEN content and a TCF-inspired visual structure. Built with the Sites Vinext starter, Tailwind CSS and local shadcn/ui components.

## Main files
- `components/pen-site.tsx`: site shell and page components.
- `components/site-header.tsx`: shared desktop and mobile navigation and website search.
- `lib/website-outline.ts`: document-supplied thematic areas and upcoming priority categories.
- `components/homepage-focus.tsx`: five homepage priorities with supplied photographs and SDG graphics.
- `components/projects.tsx`: ongoing programme cards, related resources and upcoming priority areas.
- `components/donation.tsx` and `lib/donations.ts`: validated child-sponsorship estimates and sourced donation rates/bank details.
- `components/donation-ways.tsx`: donation shop, enquiry categories, custom contribution drafts and a user-supplied-nisab Zakat estimator.
- `lib/content.ts`: navigation, programmes, article summaries and page metadata.
- `lib/source-data.json`: school directory, gallery and resource documents.
- `app/globals.css`: responsive visual design.
- `CONTENT-SOURCES.md`: content provenance and integration boundaries.

## Development
Use Node 22.13+ and the package manager pinned by the checkout.

```sh
pnpm install
pnpm dev
pnpm build
```

The hosted build uses the Sites build helper and Cloudflare Workers. Keep the existing Sites Vite integration when changing deployment configuration.

## Included
- 39 navigable pages including articles, About, leadership, ongoing programmes, upcoming priorities, thematic expertise, schools, resources, donations and participation.
- shadcn dropdown navigation, mobile sheet, tabs, dialogs, accordions, selects, buttons and form inputs.
- 268 school records with district/name filters and pagination.
- 30 activity books, 16 publications and 5 corporate documents, linked to PEN-hosted PDFs.
- Searchable news and website search, photo lightbox, documentary modal and manual hero carousel.
- Child sponsorship calculator (yearly total or monthly equivalent), other sponsorship options and bank-detail copy controls. Donations continue on PEN's official website.

## Animation behavior

`components/site-motion.tsx` uses Motion for hero entrances, section/card reveals,
and impact counters. Entrance effects run once per element, including cards
mounted by tabs and pagination. Short hover interactions live in `app/globals.css`.
Content remains visible without JavaScript. Reduced-motion preferences disable
the effects, including when the preference changes during a visit.

## Color themes

Use the sun/moon button in the header to switch between light and dark mode.
The first visit follows the system theme; an explicit choice is saved as
`pen-theme` in local storage. `components/site-theme-provider.tsx` initializes
the theme before paint, while `app/theme.css` defines the dark palette for page
content and portaled dialogs. Both themes share the same content and animations.

## Vercel deployment

Import this repository into Vercel and select the repository root (`./`).
The checked-in `vercel.json` selects Next.js, installs with `npm ci`, and runs
`npm run build:vercel`, producing `.next` output. This deployment path uses
Next.js directly; the existing Sites/Cloudflare commands remain available.
Next.js uses `tsconfig.next.json` to check application code without requiring
the local Sites hosting configuration in `.openai/hosting.json`.
Use Node.js 22.x or 24.x. The public website needs no payment credentials or
database bindings. Set `PEN_API_URL` to enable the admin panel (see below);
without it the site serves its bundled content.

To verify the Vercel build locally on Windows PowerShell:

```powershell
npm.cmd run build:vercel
```

For a local Next.js preview matching the Vercel deployment, run
`npm.cmd run dev:vercel` and open `http://localhost:5173`.

After pushing your changes, choose **Add New Project** in Vercel, import the
GitHub repository, keep the settings from `vercel.json`, and select **Deploy**.

## Admin panel and API

`/admin` is a Next.js admin panel for the website's content: page titles and
hero text, homepage slides, counters and sections, news and stories, FAQs, the
school directory, documents, the photo gallery, About pages and the CEO message,
education models, programmes and priorities, thematic areas, donation rates and
bank accounts, impact figures and disclosures, job and tender notices, privacy
and terms, the header menu and footer links, contact details, offices, social
links and admin users. It talks to the Laravel API in `backend/`, which stores
content in MySQL and handles sign-in and file uploads; see `backend/README.md`
for setup and endpoints, and `docs/ADMIN-GUIDE.md` for how to use each module.
The module plan and status are in `docs/ADMIN-CMS-WORK-PLAN.md`.

Set `PEN_API_URL` to the API's base address (for example `http://localhost:8000`)
in the environment that runs Next.js, including Vercel project settings. Public
pages read `GET /api/content`, cached for 60 seconds and refreshed immediately
whenever the admin panel saves. If `PEN_API_URL` is unset or the API cannot be
reached, the site falls back to the content bundled in `lib/` (for example
`lib/content.ts`, `lib/homepage.ts`, `lib/programmes.ts` and
`lib/source-data.json`), which also seeds the database. The admin token is kept in
an HTTP-only cookie and every admin request is made server-side.

## External integrations
Donations and volunteer/job applications continue on PEN's official website. The contact form opens an email draft; it does not submit to a server. Content management uses the admin panel above; no payment processing or form-submission database is configured.

## Validation
TypeScript, production build, and ESLint pass (existing lint warnings remain). Animation changes were checked in Chrome at desktop and mobile sizes, including hero slides, scroll reveals, hover effects, counters, search, tabs, school pagination, donation selection, reduced-motion changes, and rendering without JavaScript. Screenshots were inspected for layout issues.

Original content validation covered server rendering of all 35 pages, internal links, local images, and valid PDF signatures from all 51 PDF endpoints.
