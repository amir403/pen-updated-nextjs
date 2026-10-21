# PEN Website — Kaam Ki Complete Status List

**Updated:** 21 October 2026. **Code baseline:** `f4f2477`.

Ye list PPT, website outline, old PEN website se collect kiye gaye content aur user ke additional requests ko alag karti hai. “Complete” ka matlab listed UI/content available hai; payment ya form backend bhi complete hone ka matlab nahi.

## 1. PPT se liya gaya aur complete kiya gaya kaam

| Item / reference | Kya kiya hai | Status |
| --- | --- | --- |
| Naya website look; slides 4–7 | PEN branding, photographic homepage, responsive layout, readable typography | Complete as a design adaptation |
| Headings/dropdowns; slides 8–9, 12 | Six grouped navbar menus; thematic mega menu; mobile accordion | Complete |
| Partners; slide 10 | Our Supporters page, five existing PEN logos, partnership contact | Partial; homepage strip pending |
| Impact; slide 11 | Published homepage counters, student stories, school directory | Partial; dedicated impact overview/report pending |
| Adopt-a-child calculator; slide 13 | Child quantity, annual total, monthly equivalent, validation | Complete UI; monthly equivalent is not a subscription |
| Donation shop/examples; slides 13–15 | Eight PEN-priced options; six additional enquiry categories; custom amount/currency/frequency enquiry; Zakat estimator | Complete UI; availability and payment arrangements remain pending |
| Get involved; slide 16 | Volunteer page, on-site application preview, careers page and partnership enquiry | Present; no confirmed alumni programme |
| Pictures/media/stories; slide 17 | News/blog/student-story cards, filters, search and photo gallery | Complete with available content |
| Contact; slide 18 | Contact details, office directions, email-draft form | Complete UI; direct server submission not connected |

PPT mein doosri organisations ke screenshots ko design references samjha gaya hai. Unke figures, services, policies ya certifications PEN ke naam par copy nahi kiye.

## 2. WEBSITE OUTLINE.docx se complete kiya gaya kaam

| Item | Kya available hai | Status |
| --- | --- | --- |
| Homepage headline | Transforming Education. Empowering Children. Strengthening Communities. | Complete |
| Five homepage thematic runners | Quality education; girls' education/child protection; digital learning; teacher development; inclusive education/community engagement | Complete |
| SDGs and supplied images | Supplied photographs, SDG graphics/mappings, girls' empowerment subtheme | Complete |
| Eight thematic areas | Quality education; girls/gender equality; digital learning; teacher/school leadership; community/wellbeing; inclusion/child rights; infrastructure; research/MEL | Complete on `/what-we-do` |
| Eight ongoing programmes | Public-school adoption; PEIMA; NFE; teacher training; academic development; PEN Academy; scholarships; monitoring/evaluation | Complete on `/ongoing-projects` |
| Six upcoming priority categories | Education; Girls & Inclusion; Academy; Teacher & School Development; Research & Impact; Partnerships & Resources | Complete as future priorities, not scheduled announcements |
| Cross-cutting themes | Some concepts included within thematic cards | Partial; dedicated six-theme section pending |

`Potential partner.docx` website source nahi hai; user ki instruction par exclude kiya gaya hai.

## 3. Old PEN website se liya gaya aur implement kiya gaya kaam

| Area | Existing content / data used | Nayi website par kya hai |
| --- | --- | --- |
| About Us | PEN introduction, purpose and historical milestones | Introduction, mission/vision summaries, 2005/2019/2022 journey |
| Leadership | CEO message and eight founders/directors | Separate pages and navigation links |
| Core values / FAQs | Four values and sourced FAQ content | Values cards and FAQ accordion |
| Supporters | Five logo assets | Supporters page |
| Education models | PEN, PEIMA and non-formal education | Education-model sections and working anchor links |
| Programme content | Academy, teacher development, academics and scholarships | Dedicated information pages |
| Academy | Existing portal and YouTube links | Portal/YouTube handoff; portal itself was not rebuilt |
| Schools | 268 records, 23 district/area labels | Name/area search, district filters, sorting, enrolment cards and pagination |
| Publications | 16 PDF records | Category links, document search and publication-type filters |
| Activity books | 30 PDF records | Class and subject filters, search and PDF links |
| Corporate records | Five certificates/organisational documents | Searchable PDF cards; documents are historical source records |
| News and stories | Nine article summaries | News, PEN Heroes and Blog categories; detail pages; original-story links |
| Gallery | 13 photographs | Responsive gallery, full-photo dialog, keyboard navigation |
| Donation rates | Child, class, school, computer lab, classroom, washroom, bench/desk and water cooler | Eight-option donation shop and estimates |
| Bank details | Samba and Bank Alfalah accounts | Bank information and copy controls |
| Contact information | Phone, email, WhatsApp, Lahore/Karachi addresses | Contact links and directions |
| Volunteer application | Name, mobile, address, father name, CNIC, email, institution, degree, documents and message | Same fields on-site, local validation/file selection/reset; no submission |
| Volunteer requirements | Documents, advance application timing and participation conditions | Preparation guidance |
| Careers | Existing official application destination and CV/details guidance | Careers page; application still opens old official site |

## 4. Additional user requests / development work complete

- GitHub repository setup/pushes and Vercel-compatible build configuration; deployment blocker involving `.openai/hosting.json` resolved.
- Repository contributor guide and content-source documentation.
- Motion animations, slower transitions/counters and reduced-motion support.
- Header mein logo ke saath wala text removed.
- Dark mode and theme toggle; browser-extension body hydration warning handling.
- Local development preview, responsive checks and browser interaction checks.
- Navbar mein Home link, larger navbar/footer fonts and hover dropdown opening with click/keyboard support retained.
- Footer mein Facebook, Instagram, TikTok, LinkedIn, X, YouTube and WhatsApp entries; five URLs pending placeholders hain.
- Shared card styling: rounded corners, consistent spacing, subtle shadow, clickable-card hover lift, dark/mobile support.
- School-search clear icon alignment fixed.
- Contact enquiry topics and email-draft status; partnership enquiry option.
- Final source comparison and review documented in `WEBSITE-REVIEW.md`.

## 5. Abhi implement nahi kiya — data available hai ya layout ban sakta hai

| Remaining work | Abhi kyun pending / kya chahiye |
| --- | --- |
| Dedicated cross-cutting section | Outline mein all six headings available hain; implementation pending. Ye data-missing item nahi hai. |
| All six cross-cutting headings | Child safeguarding/PSEA; gender equality/social inclusion; disability inclusion/accessibility; climate resilience/disaster risk reduction; community participation; evidence-based programming/accountability. |
| Disclosures landing page/navigation | Structure ban sakta hai; actual reports, policies aur reporting channels ke liye approved data chahiye. |
| Homepage partner strip | Five existing logos se initial strip ban sakti hai; expanded list/placement approval pending. |
| Dedicated impact overview | Existing published counters/stories se initial overview ban sakta hai; stronger/current reporting ke liye updated data chahiye. |
| Demo tenders cleanup | `/job` par three clearly labelled demo notices hain. Real notices na hon to empty state aur matching hero copy karna pending hai. |

## 6. Old website ke collected data mein nahi mila / approved data chahiye

Ye **collected dataset ka gap** hai; poori old website/internet par kabhi data tha hi nahi, aisa claim nahi hai. Later additions ya unlisted documents PEN se mil sakte hain.

| Data gap | Kis kaam par asar | PEN se kya chahiye |
| --- | --- | --- |
| Requested audit reports, including 2025–2026 material | Disclosures/audit library incomplete | Approved year-wise PDF files and publication dates |
| Whistleblowing process | Dedicated reporting route absent | Approved policy, authorised channel, confidentiality/process wording |
| Complaint number/process | Complaint facility not configured | Confirmed reporting contact, process and routing; general phone ko complaint number assume nahi kiya |
| PEN organisational policies | Policy library incomplete | Approved safeguarding/PSEA and other applicable policy PDFs |
| Current reconciled impact figures | Impact reporting remains published/static | Dated school/student/district totals, methodology and impact report |
| Missing school records/map details | Directory is not the full homepage footprint; 13 maps unlisted | Updated school export, locations and map URLs |
| Extra donation programme terms | Six categories remain enquiry-only | Teacher sponsorship, gifts, regular giving, membership, fundraising and Zakat availability/rates/arrangements |
| Confirmed upcoming projects | Six categories remain future priorities | Project descriptions, dates, locations, budgets and approved announcements |
| Expanded partner list | Supporters page uses five available logos | Approved names, logos and relationship descriptions |
| Separate alumni programme | No alumni-specific page/programme | Confirmation that PEN offers it and approved programme copy |
| Academy-specific revised vision/mission | PPT contains direction/placeholders rather than final copy | Final approved Academy statements and digitisation scope |

## 7. User ne baad ke liye defer kiya / decisions pending

| Item | Current state | Remaining action |
| --- | --- | --- |
| Volunteer submission/upload backend | On-site form preview only; nothing sent or saved | Connect submission/storage/email later, as requested |
| Donation category availability | Visible enquiry options | Confirm and update later, as requested |
| Five social media URLs | Facebook, Instagram, TikTok, LinkedIn and X show Coming soon | User will supply proper URLs later |
| Contact server submission | Opens email draft | Connect a delivery service if direct website submission is wanted |
| Native payments/recurring billing | Official payment handoff; no on-site checkout | Separate payment integration and confirmed arrangements required |
| Domain / old-site strategy | GitHub/Vercel workflow configured | Decide final domain and how the old site/Academy should be linked or redirected |
| On-site careers form | Official external application retained | Optional future migration; current request was volunteer only |

## 8. Verification already performed

- Review baseline par all 39 content routes returned 200; unknown route returned 404.
- Rendered internal page links and anchors: no unresolved targets in that review.
- All 51 resource PDF URLs returned successful availability responses; PDF contents/current validity were not certified.
- Mobile/desktop layouts, light/dark mode, hover cards, navbar keyboard/hover controls, gallery, filters and calculator checked during relevant changes.
- Volunteer preview checked for required fields, document selection, reset and absence of POST submission.
- Production builds, TypeScript and lint checks run for code changes. Existing lint warnings remain; latest change passed with no lint errors.

**Suggested next implementation:** cross-cutting section and demo-tender cleanup can proceed with existing material. Disclosures structure can follow; its approved content/reporting channels need PEN input.
