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

## Implementation
React / TypeScript using the Sites Vinext framework; Tailwind CSS; local shadcn/ui components built on Radix. All main pages use real URL routes. Source datasets are in lib/source-data.json; editorial content, navigation and article summaries are in lib/content.ts; page components in components/pen-site.tsx.

No custom CMS, email delivery server, card processor or job-application database is configured. External services remain on their existing official URLs. Site privacy/terms text describes this build and links to official terms.
