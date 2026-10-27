# PEN Website — Admin Panel & Dynamic Content Work Plan

**Shuru:** 27 October 2026 · **Branch:** `claude/youthful-darwin-uh07iv` · **PR:** amir403/pen-updated-nextjs#1

Is document mein poori website ko dynamic banane ka work chart hai: kaun sa content
abhi code mein hardcoded hai, kaun sa admin module use manage karega, aur har module
ka status kya hai. Har module complete hone par is file ka status update hota hai.

**Status keys:** ✅ Complete · 🔄 In progress · ⏳ Pending · ❓ Aap ke faisle ka intezar

---

## 1. Architecture (sab modules isi par chalenge)

| Layer | Kya hai |
| --- | --- |
| **Laravel API** (`backend/`) | MySQL database, Sanctum login, validation, image uploads |
| **Admin panel** (`/admin`, Next.js) | Login, dashboard, har module ki list / add / edit / delete screens |
| **Public website** (Next.js) | Har page content `GET /api/content` se leta hai. API band ho to purana bundled content dikhata hai (fallback) |

Bade data sets (articles, schools, documents) ke apne tables hain. Chhoti lists
(slides, gallery, partners, timeline, programmes, wagera) ke liye ek **collections
engine** banega: ek `content_items` table + har collection ka validation schema.
Single-record content (contact details, CEO message, legal text) ke liye **settings
engine**: har setting key ka apna schema aur apna admin form. Is tarah naya module
add karna sirf schema + admin field list likhne ka kaam reh jata hai.

Har module ke liye ye kaam hota hai:
1. Database: table ya collection schema + validation rules
2. Seed: website ka maujooda content database mein import (koi content khoya nahi jata)
3. API: CRUD endpoints + `/api/content` mein shamil
4. Admin: list, add, edit, delete screens (image upload ke saath)
5. Website: page ko hardcoded data ki jagah API data se chalana (fallback ke saath)
6. Testing: Laravel feature tests + browser mein check (desktop + mobile)

---

## 2. Work chart

| # | Module | Admin mein kya manage hoga | Website pages | Status |
| --- | --- | --- | --- | --- |
| M0 | **Foundation** | Login/logout, page titles & hero text (31 pages), news & stories, FAQs, schools (268), documents (51), founders & directors, footer social links | Sab pages ke hero, `/news`, `/stories`, `/pen-blogs`, articles, `/faq`, `/explore-our-schools`, `/publications`, `/pen-activity-books`, `/corporate-information`, `/founders`, footer | ✅ |
| M1 | **Collections & settings engine** | Generic list modules + generic settings forms, admin sidebar groups, naye field types (list of lines, toggle, date) | — (infrastructure) | ✅ |
| M2 | **Site settings & contact** | Contact details (email, phones, WhatsApp, footer address), offices (address, map link), top bar text, footer tagline, homepage video, official donation & careers links | Header, footer, `/contact-us`, `/volunteer`, `/careers`, homepage video | ✅ |
| M3 | **Homepage** | Hero slides (image, heading, text), impact counters (530 schools, 90,301 students, 27 districts), 5 focus areas (image, text, SDGs), homepage section text & photos | `/` (home) | ✅ |
| M4 | **Partners & supporters** | Partner logos (name, logo, link) | `/our-donors-supporters`, homepage supporters strip | ✅ |
| M5 | **Photo gallery** | Photos (image, caption), order | `/photo-gallery` | ✅ |
| M6 | **About PEN** | Mission/vision cards, journey timeline, core values, CEO message (photo, name, paragraphs), accountability links | `/about-us`, `/ceo-message`, `/core-values` | ✅ |
| M7 | **Programmes & projects** | Education models (PEIMA, PEN model, NFE), programme pages (PEN Academy, teacher development, academics, scholarships), ongoing programmes, upcoming priorities | `/our-work`, `/pen-academy`, `/teacher-training`, `/academics`, `/scholarships`, `/ongoing-projects`, `/upcoming-projects` | ✅ |
| M8 | **What we do** | 8 thematic areas (summary, points), 6 cross-cutting themes | `/what-we-do`, header mega menu | ✅ |
| M9 | **Donations** | Sponsorship options & rates, bank accounts (IBAN/SWIFT), giving enquiry categories, max children limit | `/donate-now` (calculator, shop, bank details) | ✅ |
| M10 | **Impact & transparency** | Published impact figures, disclosure categories (status, text, document links) | `/impact`, `/disclosures` | ✅ |
| M11 | **Jobs & tenders** | Real job/tender notices (reference, title, type, deadline, document link, open/closed) — demo notices hata kar | `/job`, `/careers` | ✅ |
| M12 | **Legal pages** | Privacy policy & terms ke sections | `/privacy-policy`, `/terms-of-services` | ✅ |
| M13 | **Navigation menu** | Header menu groups & links, footer links | Header (desktop + mobile), footer | ⏳ |
| M14 | **Admin users & account** | Admin users list, naya admin, remove, apna password change | `/admin` | ⏳ |
| M15 | **Form submissions inbox** | Contact & volunteer forms ki entries admin mein | `/contact-us`, `/volunteer` | ❓ |
| M16 | **Final QA & handover** | Poori website + admin ka end-to-end test, docs, deployment guide | Sab | ⏳ |

### M15 ke liye aap ka faisla chahiye
Abhi contact form sirf email draft kholta hai, aur volunteer form browser mein preview
hai (koi data server par nahi jata). Ye project ki pehli requirement thi aur privacy
policy mein bhi yahi likha hai. Agar entries admin panel mein save karni hain to:
form data (CNIC samait) database mein jayega, privacy policy ka text badalna hoga, aur
spam protection lagani hogi. Aap "haan" kahenge tabhi ye module banega.

---

## 3. Order of work

M1 → M2 → M3 → M4 → M5 → M6 → M7 → M8 → M9 → M10 → M11 → M12 → M13 → M14 → (M15) → M16

M1 pehle is liye ke baaki sab modules usi engine par bante hain. Har module alag commit
mein push hota hai, taake har step alag se review aur test ho sake.

## 4. Content rules (har module par lagu)

- Seed mein sirf wahi content jata hai jo website par abhi hai. Koi naye figures,
  dates, contacts ya claims add nahi kiye jate.
- Admin se edit hone wala content `CONTENT-SOURCES.md` ke provenance notes mein shamil
  nahi; wo admin ki zimmedari hai.
- Donation aur application ke official links waisay hi rehte hain jab tak admin khud
  na badle.

## 5. Progress log

| Date | Module | Notes |
| --- | --- | --- |
| 27 Oct 2026 | M0 | Laravel API, admin panel, 6 content types, social links. Local test user ne confirm kiya |
| 27 Oct 2026 | M1 | `content_items` table + `config/content.php` schemas, `/api/collections/{name}` CRUD, settings schemas, `/api/summary`. Admin: grouped sidebar (mobile menu), grouped dashboard, generic settings forms, list/toggle/date fields. 4 naye tests |
| 27 Oct 2026 | M2 | Settings `contact` + `site`, collection `offices`. Footer, top bar, contact page, enquiry forms (email), careers link, donation links aur homepage video ab admin se. Video link khali ho to button chhup jata hai; WhatsApp numbers khali hon to section chhup jata hai |
| 27 Oct 2026 | M3 | Collections `hero_slides`, `impact_stats`, `homepage_focus` + setting `homepage`. Slider kitni bhi slides chala sakta hai; counters 1–6 ek row mein; SDG sirf woh 8 jin ki images maujood hain. Education model cards M7 mein |
| 27 Oct 2026 | M4 | Collection `partners` (name, logo, optional website link). Supporters page aur homepage strip ek hi list se. Pehle se maujood bug theek kiya: lambe logos tile se bahar nikal rahe the |
| 27 Oct 2026 | M5 | Collection `gallery` (photo, optional caption). Caption viewer mein dikhta hai aur screen readers ke liye alt text banta hai. Admin lists mein ab image columns ke thumbnails |
| 27 Oct 2026 | M6 | Collections `purpose_cards`, `journey`, `core_values` (About page ka chhota text + Core Values page ka poora text ek hi record mein), `accountability_links` + setting `about` (story aur CEO message). Founders & partners bhi "About PEN" group mein |
| 27 Oct 2026 | M7 | Collections `education_models`, `interventions`, `programme_pages` (4 fixed pages, sirf edit), `ongoing_programmes`, `upcoming_priorities`. Data `lib/programmes.ts` mein ikattha. "Explore our eight programmes" ab ginti ke hisaab se badalta hai; external links naye tab mein |
| 27 Oct 2026 | M8 | Collections `thematic_areas`, `cross_cutting_themes`. What We Do page, header mega menu ("Eight focus areas" ginti ke saath badalta hai), website search aur programme cards ke related-theme links sab isi se |
| 27 Oct 2026 | M9 | Setting `donations` (per-child rate, calculator limit, account title) + collections `sponsorship_options`, `bank_accounts` (IBAN/SWIFT format check), `giving_enquiries`. Per-child rate alag setting mein taake ghalti se delete na ho |
| 27 Oct 2026 | M10 | Collections `published_impact`, `disclosure_categories` (har category mein documents: "Title \| link" lines). Uploads ab PDF/Word/Excel/PowerPoint bhi (max 10 MB); admin mein "File uploads" page (upload + copy link); Documents module mein PDF seedha upload |
| 27 Oct 2026 | M11 | Collection `opportunities` (job/tender, reference, closing date, notice document upload, apply link, published toggle). Demo notices hata diye; closing date guzarne par notice khud chhup jata hai; careers page par open jobs; koi notice na ho to empty state |
| 27 Oct 2026 | M12 | Collection `legal_sections` (page, heading, paragraphs, optional link). Text mein `{email}` likhne se contact email ka link ban jata hai |
