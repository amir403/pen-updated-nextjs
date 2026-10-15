# Progressive Education Network

A responsive 35-page React/TypeScript website with PEN content and a TCF-inspired visual structure. Built with the Sites Vinext starter, Tailwind CSS and local shadcn/ui components.

## Main files
- `components/pen-site.tsx`: site shell and page components.
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
- 35 navigable pages including articles, About, leadership, programmes, schools, resources, donations and participation.
- shadcn dropdown navigation, mobile sheet, tabs, dialogs, accordions, selects, buttons and form inputs.
- 268 school records with district/name filters and pagination.
- 30 activity books, 16 publications and 5 corporate documents, linked to PEN-hosted PDFs.
- Searchable news and website search, photo lightbox, documentary modal and manual hero carousel.
- Donation sponsorship selector and bank-detail copy controls.

## Vercel deployment

Import this repository into Vercel and select the repository root (`./`).
The checked-in `vercel.json` selects Next.js, installs with `npm ci`, and runs
`npm run build:vercel`, producing `.next` output. This deployment path uses
Next.js directly; the existing Sites/Cloudflare commands remain available.
Next.js uses `tsconfig.next.json` to check application code without requiring
the local Sites hosting configuration in `.openai/hosting.json`.
Use Node.js 22.x or 24.x. The current public website requires no environment
variables, payment credentials, or database bindings.

To verify the Vercel build locally on Windows PowerShell:

```powershell
npm.cmd run build:vercel
```

After pushing your changes, choose **Add New Project** in Vercel, import the
GitHub repository, keep the settings from `vercel.json`, and select **Deploy**.

## External integrations
Donations and volunteer/job applications continue on PEN's official website. The contact form opens an email draft; it does not submit to a server. No CMS, payment processing or application database is configured.

## Validation
TypeScript and production build passed. All 35 pages were rendered on the server, with internal link and local image checks. All 51 PDF endpoints returned valid PDF signatures. Browser interaction and visual QA were unavailable in the build session.
