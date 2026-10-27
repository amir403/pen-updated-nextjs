# PEN website content provenance

Source collection: 13 October 2026.

- Design reference: https://www.tcf.org.pk/ (navigation, photographic hero, impact strip, models, schools, education, participation and story sections). This build adapts the reference to PEN branding rather than reproducing TCF branding or claims.
- Main content and photos: https://pen.org.pk/
- About and timeline: https://pen.org.pk/about-us/
- CEO: https://pen.org.pk/ceo-message/
- Directors: https://pen.org.pk/founders/
- Values: https://pen.org.pk/core-values/
- FAQs: https://pen.org.pk/faq/
- Schools: https://pen.org.pk/explore-our-schools/ (268 individual school records extracted; the source directory headline says 507, whereas the homepage counter data says 530. Homepage figures are labelled as published figures.)
- Homepage HTML counters: 530 schools, 90,301 students, 27 districts. These are not live figures.
- Resources: https://pen.org.pk/publications/, https://pen.org.pk/pen-activity-books/, https://pen.org.pk/corporate-information/
- Story/article sources match each article slug under https://pen.org.pk/. Display copy is a concise paraphrase, with a link to the original article.
- Learning portal: https://pen.org.pk/pen-academy/, https://penacademy.pk/
- Donation amounts and bank details: https://pen.org.pk/donate-now/. No payment processing is implemented in this build; all donation processing is on PEN's official channels. The selected sponsorship amount is informational and not transmitted to the official donation page.
- Donation rates and both bank accounts were rechecked on 19 October 2026. The published annual child sponsorship is PKR 30,000. The calculator's PKR 2,500 monthly equivalent is derived by dividing that annual rate by 12; it is not described as a confirmed monthly payment plan. Estimates multiply by a whole-number child count from 1 to 1,000. No checkout, recurring payment, or prefilled donation handoff is implemented.
- The donation shop includes all eight published PEN options, including classroom (PKR 1,500,000), washroom (PKR 1,000,000), bench/desk (PKR 15,000) and water cooler (PKR 150,000). Teacher sponsorship, gifts, membership, fundraising, regular giving and Zakat arrangements are enquiry-only until PEN confirms availability/terms. Custom donations prepare a local email draft in the preferred currency; they do not convert currency or schedule payments.
- Zakat planning reference: https://islamic-relief.org/zakat-calculator/. The tool estimates 2.5% of entered net wealth only after the user supplies a positive current nisab and confirms relevant eligibility/lunar-year conditions. It uses no assumed market prices, makes no claim about PEN's Zakat compliance, and transmits none of the financial inputs.
- Contact: https://pen.org.pk/contact-us/. The contact form opens a mailto draft and does not claim server submission.
- Volunteer and careers applications use the official forms at https://pen.org.pk/volunteer/ and https://pen.org.pk/careers/.

## Website navigation outline

The user supplied `WEBSITE OUTLINE.docx` on 19 October 2026. Its eight thematic
areas and six upcoming programme priority categories inform the navigation and
the `/what-we-do` overview. These priorities are not presented as funded project
announcements, verified outcomes, or scheduled launches. Existing programme pages,
official application links, and donation behavior retain their previous sources.
`PEN Website.pptx` remains a design/revision reference. `Potential partner.docx`
was explicitly excluded by the user because it belongs to a separate portal.

The homepage headline, five flagship thematic summaries, SDG mappings, five
photographs, and eight distinct SDG graphics also come from `WEBSITE OUTLINE.docx`.
Original embedded JPEGs are stored in `public/images/website-outline/`. The SDG
labels describe thematic alignment, not external certification or endorsement.

The `/ongoing-projects` programme descriptions reproduce or lightly edit the
eight entries in the outline's ongoing-projects table. Related thematic links
are editorial navigation aids. `/upcoming-projects` expands the six supplied
priority categories; it adds no project dates, budgets, locations or launch claims.
The older `/our-work` education-model URLs and thematic overview anchors remain
available so existing links continue to resolve.

## Implementation

21 October follow-up: `/what-we-do#cross-cutting-themes` displays all six outline
headings with editorial summaries. `/disclosures` provides a structure only:
audit reports, organisational policies and reporting channels are visibly
pending, with no invented files, contacts or confidentiality promises. The
homepage supporter strip reuses the same five logo assets as the supporters
page. `/impact` reuses the published homepage figures collected 13 October
and the existing two PEN Heroes summaries, clearly distinguishing the smaller
school directory dataset. No new outcome totals or impact evaluation are claimed.

Volunteer form update, 21 October 2026: the user requested the official form's
fields locally, deferring submission. `/volunteer#volunteer-application` now
provides name, mobile, address, father name, CNIC, email, institution, degree,
document selection and message. Fields were checked against the official
volunteer page. File selection and validation are browser-only; no uploads,
requests, persistent storage or success/delivery claims are implemented.
Careers applications continue to use the official external form.

Contact, volunteer and careers details were rechecked against their official
PEN pages on 20 October 2026. Contact enquiries still prepare a local email draft;
topic selection and draft status do not imply delivery. Partnership is an email
enquiry, with no new partner terms. Application steps summarise the existing
official process; identity documents and CVs are uploaded only on PEN's website.
No vacancies, placements or response times are promised.

The Resources refresh retains the existing 16 publications, 30 activity books
and five corporate documents. Class, subject and publication-type filters are
derived from existing titles (Social Study/Studies share one subject filter).
The user documents guide the overall website structure; these document records
come from PEN's official pages, not the PPT or website outline. Search, category
links and filter behavior are implementation improvements. No new files or
claims of current certificate/exemption validity are added.

The News & Media refresh reuses the existing nine sourced article summaries,
dates and gallery assets. It adds local category/search controls, same-category
related-story ordering and keyboard gallery navigation. Article detail pages
explicitly identify their copy as a summary and retain the original story link.
No new event dates, student outcomes or photo-specific claims are introduced.

The school directory refresh retains the 268 existing source records and their
original district/area labels. Its 23 district/area listings describe this
dataset, not PEN's complete footprint. Search matches school names and areas;
sorting and pagination are local. Missing map links are labelled as unlisted,
and no addresses, enrolments or coordinates are inferred.

The About Us refresh uses editorial summaries of PEN's official About Us, CEO
Message and Core Values pages (rechecked 19 October 2026). Mission and vision
cards are summaries, not verbatim formal statements. The dated journey retains
the published 2005, 2019 and 2022 milestones; the 2022 district statement is
historical. Leadership and accountability links reuse existing sourced pages.
`WEBSITE OUTLINE.docx` contains no replacement About Us copy. No new outcome,
certification or leadership appointment is asserted.
React / TypeScript using the Sites Vinext framework; Tailwind CSS; local shadcn/ui components built on Radix. All main pages use real URL routes. Source datasets are in lib/source-data.json; editorial content, navigation and article summaries are in lib/content.ts; page components in components/pen-site.tsx.

Content can be edited through the `/admin` panel backed by the Laravel API in `backend/`; its database is seeded from the same sourced records in `lib/content.ts` and `lib/source-data.json`, and edits made there are not covered by the provenance notes in this file. No email delivery server, card processor or job-application database is configured. External services remain on their existing official URLs. Site privacy/terms text describes this build and links to official terms.
