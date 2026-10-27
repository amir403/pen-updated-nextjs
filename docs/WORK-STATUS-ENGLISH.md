# PEN Website — Work Status Report

Updated: 21 October 2026 | Baseline: f4f2477, with the follow-up implementation described in this report

This report separates work derived from the presentation, website outline, existing PEN website and additional user requests. “Complete” means the stated interface or content is available; it does not mean a payment or application backend is connected.

## 1. Work based on PEN Website.pptx

| Requirement / reference | Work completed | Status |
| --- | --- | --- |
| New website appearance; slides 4–7 | PEN branding, photographic homepage, responsive layouts and improved typography. | Complete as a design adaptation. |
| Headings and dropdowns; slides 8–9, 12 | Six grouped navigation menus, a thematic mega menu and mobile accordion navigation. | Complete. |
| Partners; slide 10 | Supporters page, five-logo homepage strip and a partnership contact option. | Existing-data implementation complete; expanded approved list pending. |
| Impact; slide 11 | Published homepage counters, student stories, school directory, homepage impact introduction and /impact overview. | Overview complete; consolidated impact report and updated figures pending. |
| Adopt-a-child calculator; slide 13 | Child quantity selection, annual total, monthly equivalent and input validation. | Interface complete; monthly equivalent is not a subscription. |
| Donation shop and examples; slides 13–15 | Eight priced PEN options, six additional enquiry categories, custom amount/currency/frequency enquiry and Zakat estimator. | Interface complete; programme availability and payment arrangements require confirmation. |
| Get Involved; slide 16 | Volunteer page, on-site application preview, careers page and partnership enquiry. | Present; a separate alumni programme is unconfirmed. |
| Pictures, media and stories; slide 17 | News, blog and student-story cards, filters, search and photo gallery. | Complete using available content. |
| Disclosures; slide 18 | /disclosures landing page, four status-labelled categories and links to existing corporate records/publications. | Structure complete; approved reports, policies and reporting channels pending. |
| Contact; slide 18 | Contact details, office directions and an email-draft form. | Interface complete; direct server submission is not connected. |

Screenshots of other organisations in the presentation were treated as design references. Their statistics, services, policies and certifications were not copied as PEN claims.

## 2. Work based on WEBSITE OUTLINE.docx

| Requirement | Implementation | Status |
| --- | --- | --- |
| Homepage headline | “Transforming Education. Empowering Children. Strengthening Communities.” | Complete. |
| Five homepage themes | Quality education; girls’ education and child protection; digital learning; teacher development; inclusive education and community engagement. | Complete. |
| SDGs and supplied images | Supplied photographs, SDG graphics and mappings, plus the girls’ empowerment subtheme. | Complete. |
| Eight thematic areas | Quality education; girls and gender equality; digital learning; teacher development and school leadership; community and wellbeing; inclusion and child rights; infrastructure; research, monitoring, evaluation and learning. | Complete at /what-we-do. |
| Eight ongoing programmes | Public-school adoption; PEIMA; non-formal education; teacher training; academic development; PEN Academy; scholarships; monitoring and evaluation. | Complete at /ongoing-projects. |
| Six upcoming priority categories | Education; Girls & Inclusion; PEN Academy; Teacher & School Development; Research & Impact; Partnerships & Resources. | Complete as future priorities, rather than scheduled project announcements. |
| Cross-cutting themes | All six themes now appear at /what-we-do#cross-cutting-themes with related resource links. | Complete as a thematic section; policy documents remain pending. |

Potential partner.docx was excluded at the user’s request because it belongs to a separate portal, not this website.

## 3. Content migrated or adapted from the existing PEN website

| Area | Existing content used | New website implementation |
| --- | --- | --- |
| About Us | PEN introduction, purpose and historical milestones. | Introduction, mission/vision summaries and the 2005, 2019 and 2022 journey. |
| Leadership | CEO message and eight founder/director profiles. | Separate pages and navigation links. |
| Core values and FAQs | Four core values and sourced FAQ content. | Value cards and FAQ accordion. |
| Supporters | Five available logo assets. | Supporters page. |
| Education models | PEN, PEIMA and non-formal education models. | Model sections with working anchor links. |
| Programme information | Academy, teacher development, academics and scholarships. | Dedicated information pages. |
| PEN Academy | Existing learning portal and YouTube links. | Links to the portal and channel; the learning portal itself was not rebuilt. |
| Schools | 268 school records across 23 district/area labels. | Name/area search, district filters, sorting, enrolment cards and pagination. |
| Publications | 16 PDF records. | Category navigation, document search and publication-type filters. |
| Activity books | 30 PDF records. | Class and subject filters, search and PDF links. |
| Corporate records | Five certificates/organisational documents. | Searchable PDF cards; these remain historical source documents. |
| News and stories | Nine article summaries. | News, PEN Heroes and Blog categories, detail pages and original-source links. |
| Photo gallery | 13 photographs. | Responsive gallery, full-photo dialog and keyboard navigation. |
| Donation rates | Child, class, school, computer lab, classroom, washroom, bench/desk and water cooler options. | Eight-option donation shop and cost estimates. |
| Bank details | Samba and Bank Alfalah account details. | Bank information and copy controls. |
| Contact information | Phone, email, WhatsApp and Lahore/Karachi addresses. | Contact links and office directions. |
| Volunteer application | Name, mobile, address, father name, CNIC, email, institution, degree, documents and message. | On-site form with the same fields, local validation, file selection and reset; no submission. |
| Volunteer requirements | Supporting documents, advance application timing and participation conditions. | Preparation guidance. |
| Careers | Official application destination and CV/details guidance. | Careers page; application still opens the existing official website. |

## 4. Additional requests and development work completed

- GitHub repository setup and ongoing pushes; Vercel-compatible build configuration; resolution of the deployment blocker involving .openai/hosting.json.
- Repository contributor guide and content-source documentation.
- Motion animations, slower transitions and counters, and reduced-motion support.
- Removal of the text beside the header logo.
- Dark mode, theme toggle and handling of browser-extension attributes that caused body hydration warnings.
- Local development preview, responsive checks and browser interaction checks.
- Home link in the navbar, larger navbar/footer fonts and hover dropdowns, while retaining click and keyboard controls.
- Footer entries for Facebook, Instagram, TikTok, LinkedIn, X, YouTube and WhatsApp; five profile URLs remain placeholders.
- Shared card styling with rounded corners, consistent spacing, subtle shadows, hover lift on clickable cards and mobile/dark-mode support.
- Fix for the school-search clear icon alignment.
- Contact enquiry topics, clear email-draft status and partnership enquiry option.
- Source comparison and website review documented in WEBSITE-REVIEW.md.

## 5. Follow-up implementation using available content

| Remaining work | Current position and required action |
| --- | --- |
| Dedicated cross-cutting section | Completed: all six supplied headings are presented together with summaries and related links. |
| Cross-cutting coverage | Include child safeguarding/PSEA; gender equality/social inclusion; disability inclusion/accessibility; climate resilience/disaster risk reduction; community participation; evidence-based programming/accountability. |
| Disclosures landing page and navigation | Completed at /disclosures. Audit reports, policies, complaints and whistleblowing show explicit pending statuses; approved material is still needed. |
| Homepage partner strip | Completed on the homepage using the five existing PEN logo assets. Expanded coverage still needs approved logos and names. |
| Dedicated impact overview | Completed at /impact, with a homepage introduction. Uses existing published counters, stories and evidence links; stronger/current reporting needs updated material. |
| Demo tender cleanup | Complete (27 October 2026): demo notices removed. /job lists real notices from the admin panel's Jobs & tenders module, with an empty state when none are open. |

## 6. Missing from the collected old-website data or awaiting approved information

These are gaps in the collected dataset. This does not establish that the information has never existed anywhere on the old website or internet. PEN may hold newer or unlisted material.

| Information gap | Effect on the website | Information required from PEN |
| --- | --- | --- |
| Requested audit reports, including 2025–2026 material | Disclosures/audit library is incomplete. | Approved year-by-year PDFs and publication dates. |
| Whistleblowing process | No dedicated reporting route is configured. | Approved policy, authorised reporting channel and confidentiality/process wording. |
| Complaint number and process | Complaint facility is not configured. | Confirmed reporting contact, process and routing. The general phone number has not been assumed to be a complaint number. |
| PEN organisational policies | Policy library is incomplete. | Approved safeguarding/PSEA and other applicable policy PDFs. |
| Current reconciled impact figures | Impact reporting remains based on published, static figures. | Dated school/student/district totals, methodology and impact report. |
| Missing school records and map details | The directory does not cover the full homepage footprint; 13 map links are unlisted. | Updated school export, locations and map URLs. |
| Additional donation programme terms | Six categories remain enquiry-only. | Confirmed availability, rates and arrangements for teacher sponsorship, gifts, regular giving, membership, fundraising and Zakat. |
| Confirmed upcoming projects | Six categories remain future priorities. | Approved project descriptions, dates, locations, budgets and announcements. |
| Expanded partner list | Supporters page uses five available logos. | Approved names, logos and relationship descriptions. |
| Separate alumni programme | No alumni-specific programme/page is available. | Confirmation that PEN offers the programme and approved content. |
| Revised Academy-specific mission and vision | The presentation provides direction/placeholders rather than final copy. | Approved Academy statements and digitisation scope. |

## 7. Deferred work and decisions

The volunteer backend, donation-availability updates and five social URLs were explicitly deferred by the user. Other items below remain service integrations, decisions or optional future scope.

| Item | Current state | Remaining action |
| --- | --- | --- |
| Volunteer submission/upload backend | Complete (27 October 2026): with the API configured, applications and documents arrive in the admin panel's Form submissions; documents are stored privately. | Email notifications are not set up, as requested. |
| Donation category availability | Additional options are visible as enquiries. | Confirm and update later, as requested. |
| Five social-media URLs | Facebook, Instagram, TikTok, LinkedIn and X show Coming soon. | Add proper profile URLs when supplied. |
| Contact server submission | Complete (27 October 2026): with the API configured, messages arrive in Form submissions; without it the form opens an email draft. | Email notifications are not set up. |
| Native payments and recurring billing | Official payment handoff; no on-site checkout. | Separate payment integration and confirmed arrangements are required. |
| Domain and old-site strategy | GitHub/Vercel workflow is configured. | Decide the final domain and how the old site and Academy should link or redirect. |
| On-site careers form | The existing external application is retained. | Optional future migration; the on-site form request covered volunteering only. |

## 8. Verification already performed

- At the review baseline, all 39 content routes returned HTTP 200 and an unknown route returned HTTP 404.
- No unresolved internal page links or anchors were found in the rendered-route review.
- All 51 resource PDF URLs returned successful availability responses. PDF contents and current validity were not certified.
- Mobile/desktop layouts, light/dark mode, hover cards, navbar keyboard/hover controls, gallery, filters and calculator were checked during the relevant changes.
- The volunteer preview was checked for required fields, document selection, reset and absence of POST submission.
- Production builds, TypeScript and lint checks were run for code changes. Existing lint warnings remain; the latest code change passed without lint errors.

## Recommended next steps

1. ~~Replace demo tenders with approved notices or an appropriate empty state.~~ Done: notices are managed in the admin panel.
2. Supply approved audit reports, policies and reporting contacts to populate the completed Disclosures structure.
3. Confirm updated impact figures and any additional partner logos for the completed overview and homepage strip.
4. Connect deferred services when their content and arrangements are confirmed.
