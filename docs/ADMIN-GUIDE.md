# PEN Admin Panel — Istemal ki Guide

Admin panel: `https://<website>/admin` (local: `http://localhost:3000/admin`).
Login wahi email aur password hai jo `php artisan admin:create` se ya **Admin users**
page se banaya gaya.

## 1. Bunyadi baatein

- **Save karte hi website update ho jati hai.** Koi alag "publish" button nahi hai.
- Har list mein upar **Search** hai, aur har row ke aage **Edit**. Naya record
  **Add …** button se banta hai. Delete button Edit page par hai aur confirm maangta hai.
- Form mein ghalti ho to woh field laal ho jati hai, aur jo aap ne likha tha woh mehfooz rehta hai.
- **Position**: chhota number pehle dikhta hai. Khali chhorein to naya record list ke
  aakhir mein jata hai.
- Mobile par sidebar **Menu** button ke peeche hai.

### Field types

| Field | Kaise bharein |
| --- | --- |
| Photo / Logo | Upload wale dabbe par click karein ya image us par drag karein (max 10 MB), ya maujooda path rehne dein (jaise `/images/IMG_4631.jpg`). Chuni hui file ka naam, size aur chhoti tasveer nazar aati hai; ✕ se hata sakte hain. File **Save** dabane par upload hoti hai |
| Text / paragraphs | Editor ke upar wale buttons se **bold**, *italic*, underline, link aur (lambe text mein) bullet ya numbered list lagayein. Lambe text mein **Enter** naya paragraph banata hai; chhote text mein Enter se nayi line. Kahin aur se copy kiya text sirf text ki shakal mein paste hota hai |
| Lines (list) | Har cheez alag line par (yahan formatting nahi hoti), jaise phone numbers, checklist points, SDG numbers |
| Link | Website ka page (`/pen-academy`), section (`/what-we-do#girls-education`) ya poora `https://` link |
| "Title \| link" lines | Menu aur footer links: `Contact us \| /contact-us` |
| Published (checkbox) | Untick karne se record chhup jata hai, delete nahi hota |

PDF ya Word file ka link chahiye? **Content → File uploads** par file upload karein aur
**Copy link** dabayein. Documents aur Jobs & tenders ke forms mein file seedha bhi upload ho sakti hai.

## 2. Modules — kya kahan dikhta hai

| Sidebar | Module | Website par |
| --- | --- | --- |
| Content | News & stories | `/news`, `/stories`, `/pen-blogs`, har article ka page, homepage stories |
| | FAQs | `/faq` |
| | Schools | `/explore-our-schools` (search, district filter) |
| | Documents | `/publications`, `/pen-activity-books`, `/corporate-information` |
| | Photo gallery | `/photo-gallery` (caption viewer mein dikhta hai) |
| | Form submissions | Contact form ke messages aur volunteer applications (documents ke saath) |
| | File uploads | Kisi bhi file ka link banane ke liye |
| Homepage | Hero slides | Homepage ka bada slider |
| | Impact counters | Slider ke neeche animated numbers (ek row mein 6 tak) |
| | Focus areas | Homepage ke priority cards (SDG: sirf 3, 4, 5, 8, 9, 10, 16, 17) |
| | Homepage text | Homepage ke headings, photos aur paragraphs |
| About PEN | Founders & directors | `/founders` |
| | Mission & vision, Journey timeline, Core values, Accountability links | `/about-us`, `/core-values` |
| | Partners & supporters | `/our-donors-supporters` aur homepage logo strip |
| | Our story & CEO message | `/about-us` story, `/ceo-message` |
| Programmes | Education models | Homepage cards, `/our-work` |
| | Interventions | `/our-work` ke neeche cards |
| | Programme pages | `/pen-academy`, `/teacher-training`, `/academics`, `/scholarships` (sirf edit) |
| | Ongoing programmes | `/ongoing-projects` |
| | Upcoming priorities | `/upcoming-projects`, `/what-we-do` summary |
| | Thematic areas | `/what-we-do`, header ka "What We Do" menu, website search |
| | Cross-cutting themes | `/what-we-do` |
| Get involved | Sponsorship options, Bank accounts, Giving enquiries, Donation settings | `/donate-now` (calculator, shop, bank details) |
| | Jobs & tenders | `/job`, `/careers` |
| Transparency | Published impact figures | `/impact` |
| Website | Pages | Har page ka title (browser tab), hero heading aur hero text |
| | Header menu | Upar ka menu (desktop + mobile) |
| | Footer links | Footer ke link columns |
| | Privacy & terms | `/privacy-policy`, `/terms-of-services` |
| Settings | Offices | `/contact-us` office addresses |
| | Contact details | Footer, `/contact-us`, enquiry forms ka email |
| | Site options | Footer tagline, homepage video, official donation/careers links |
| | Social links | Footer social profiles |
| | Admin users, My account | Admins add/remove, apna password |

## 3. Khaas baatein

- **Article ka URL slug** aur **"Section link"** title likhte hi khud ban jate hain (`new-library-opening`). Badalna ho to **Edit** dabayein; **Use title** se dobara title wala ban jata hai. Pehle se save kiye record ka slug band rehta hai, kyunke badalne se purane links toot jate hain; Edit kar ke badal sakte hain, lekin warning aati hai.
- **Date label**: calendar button se tareekh chunein (jaise "15 April 2025"), ya koi label khud likhein (jaise "Student stories"). Jobs & tenders ki **Closing date** bhi calendar se chunein.
- **Focus areas** aur **Upcoming priorities** mein "What We Do section" ab dropdown hai, jis mein Thematic areas ki list aati hai.
- **Donation settings** mein per-child rate alag rakha gaya hai, taake calculator kabhi na toote.
  Baaki options **Sponsorship options** mein hain.
- **Jobs & tenders**: closing date guzarne par notice website se khud hat jata hai.
  Koi open notice na ho to `/job` par "No open jobs or tenders" dikhta hai.
- **Header menu**: "Focus areas menu" wala group thematic areas khud dikhata hai. Us ke links field ki zaroorat nahi.
- **Privacy & terms** text mein `{email}` likhein to wahan contact email ka link ban jata hai.
- **"Section link"** se doosre modules (focus areas, programmes) thematic areas ko jodte hain, is liye
  thematic area ka section link badalne se pehle soch lein.
- **Programme pages** sirf edit ho sakte hain, kyunke un ke page addresses fixed hain.
  Naya page add karne ke liye developer ki zaroorat hai.
- **Form submissions**: naye entries ki ginti sidebar mein dikhti hai. Entry kholne par woh "read" ho jati hai.
  **Reply by email** se jawab dein. Volunteer documents (CNIC wagera) sirf login ke baad download hote hain;
  kaam khatam hone par entry **Delete** kar dein, documents bhi mit jate hain. Spam bots ke liye form mein
  chhupa field aur har visitor ke liye 10 minute mein 5 submissions ki limit hai.
- Website ka code wala hissa (donation calculator ka logic, forms ke fields) admin se nahi badalta.

## 4. Backup aur update (technical team ke liye)

- Database backup: `mysqldump -u <user> -p pen > pen-backup.sql`
- Uploaded files: `backend/storage/app/public/uploads/` aur volunteer documents: `backend/storage/app/private/submissions/` folders ka backup lein.
- Naya code aane par `backend` mein: `composer install`, `php artisan migrate --force`,
  `php artisan db:seed --force`. Seeder sirf khali modules bharta hai; admin ki edits nahi badalti.
