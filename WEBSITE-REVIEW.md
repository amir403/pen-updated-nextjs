# Website Review

Reviewed 21 October 2026 against commit `e592f1b` and the local Next.js preview.
This is a content and navigation review, not a live Vercel deployment audit.

Follow-up, 21 October: volunteer applications now have an on-site form preview
at `/volunteer#volunteer-application`, as requested after this review. Its fields
and selected documents are not submitted or saved. Careers remain external;
references below to external applications describe the original review baseline.

## Sources and interpretation

- `PEN Website.pptx`: revision brief and visual examples. Other charities' screenshots are design references, not evidence of PEN programmes or policies.
- `WEBSITE OUTLINE.docx`: supplied thematic, programme, priority and homepage copy.
- Existing PEN data: official-source records documented in `CONTENT-SOURCES.md`.
- `Potential partner.docx`: excluded as instructed; it belongs to the separate portal.

## Coverage

| Requested area | Current implementation | Status |
| --- | --- | --- |
| Outline: eight thematic areas | `/what-we-do`, linked from the navbar | Present |
| Outline: eight ongoing programmes | `/ongoing-projects` | Present |
| Outline: six upcoming priority categories | `/upcoming-projects`, labelled future priorities | Present; specific project announcements need PEN data |
| Outline: homepage headline, five themes and SDGs | Homepage, including the girls' empowerment subtheme and supplied images | Present |
| Outline: cross-cutting themes | Some topics appear in thematic cards | Partial: no dedicated six-theme section; explicit PSEA and disaster risk reduction are missing |
| PPT slides 7–9/12: navigation and presentation | Home link, grouped menus, larger header/footer text and photography | Present as an adaptation |
| PPT slide 10: partners | `/our-donors-supporters` has five sourced logos | Partial: no homepage partner strip; expanded approved partner list needed |
| PPT slide 11: impact | Published homepage counters, stories and school directory | Partial: no dedicated impact report/dashboard; current validated figures needed |
| PPT slides 13–15: child calculator and giving | Child calculator, eight donation-shop items, custom enquiry, six enquiry categories and Zakat estimate | UI present; unconfirmed options remain enquiry-only |
| PPT slide 16: get involved | Volunteer, careers, partnership enquiry and official applications | Present; no separate alumni programme confirmed |
| PPT slide 17: pictures/media/stories | Nine stories, 13-photo gallery and category search | Present |
| PPT slide 18: disclosures | Five corporate documents and site privacy/terms | Incomplete: audit reports, complaint channel, whistleblowing and organisational policies missing |
| PPT slides 2–3: Academy and domain direction | Academy page links to the existing portal | Final Academy-specific mission/vision copy and custom-domain/old-site decision still needed |

## Recommended order of work

1. **Disclosures:** add a clear section for audit reports, PEN policies, complaints and whistleblowing. Obtain approved PDFs and the authorised reporting contact/process. General contact details must not be presented as a confidential reporting mechanism.
2. **Cross-cutting commitments:** surface all six outline themes together, including child safeguarding/PSEA and climate resilience/disaster risk reduction. Link actual policies only when supplied.
3. **Tenders:** `/job` contains three explicitly labelled demo notices, while its hero refers to current opportunities. Replace demos with a clear empty state or approved real notices before treating this as a public opportunities directory.
4. **Partners and impact:** decide on homepage partner placement and an impact overview, using an approved logo list and dated figures/report links.
5. **Content handover:** confirm the pending links, data and service arrangements below.

## Pending data and functionality

- Facebook, Instagram, TikTok, LinkedIn and X URLs: visible placeholders, intentionally not clickable. Existing YouTube and WhatsApp links remain.
- School data: 268 records across 23 district/area labels; 13 map links absent. The separate homepage totals are published figures, not live counts.
- Donation availability/rates for teacher sponsorship, gifts, regular giving, membership, fundraising and Zakat arrangements need confirmation. Custom currency/frequency choices create enquiries; no currency conversion, recurring billing or native checkout exists.
- Zakat uses user-entered nisab and eligibility confirmation; no live market threshold or PEN compliance claim.
- Contact opens an email draft. Applications and uploads stay on PEN's official website. A website-managed submission service would be separate work.
- Corporate documents are historical source records, not verification of present certificate/exemption validity. The requested 2025–2026 audit material is not available in the current dataset.
- Upcoming projects need approved dates, locations and budgets if they are to become announcements. No such details were invented.

## Verification and limits

- All 39 content routes returned HTTP 200; an unknown route returned 404.
- No unresolved internal page links or fragment IDs found in the rendered route HTML.
- All 51 PDF URLs responded successfully to HTTP HEAD. This checks availability, not document contents, accessibility or current validity.
- Donation and volunteer endpoints initially returned 500 to HEAD, then both returned 200 to GET; careers and Academy also responded successfully.
- Eight representative pages checked at 390px and 1440px: no horizontal overflow. Sample screenshots inspected; no broken images observed. All dataset image paths exist locally.
- Homepage dark mode, mobile menu, scroll reveal and switching to reduced motion were checked without runtime errors.
- A screenshot timing artefact briefly produced hydration warnings (`caret-color: transparent` injected by the capture tool). Clean hydrated retests of donation/contact produced no console errors; no suppression change was made. Expected errors from the intentional 404 navigation were excluded.
- Existing calculator, search, filter, gallery and form interaction checks passed during their individual implementation turns. This review did not rerun every transaction or certify accessibility across every route.
- Local screenshots and raw check output are in `E:/pen-animation-qa/`; they are review artefacts outside the repository. External links can change after this check.
