import {statIcons} from '@/lib/homepage';
import {valueIcons} from '@/lib/about';
import {programmeIcons,programmePageSlugs} from '@/lib/programmes';
import {sponsorshipIcons} from '@/lib/donations';
import {opportunityTypes} from '@/lib/opportunities';
import {legalPages} from '@/lib/legal';

/** `upload` adds a file picker to a url/text field; the uploaded file's link fills the field. */
export type AdminField={name:string;label:string;type:'text'|'textarea'|'number'|'url'|'select'|'image'|'paragraphs'|'lines'|'checkbox'|'date';options?:readonly string[];required?:boolean;help?:string;upload?:boolean};
/** A list module. `key` is the admin URL segment; `apiPath` the Laravel path (defaults to `key`). */
export type AdminResource={key:string;apiPath?:string;group:AdminGroup;label:string;singular:string;description:string;titleField:string;columns:string[];fields:AdminField[];canCreate:boolean;canDelete:boolean};
/** A single-record settings form, stored in Laravel under `settings/<key>`. */
export type AdminSetting={key:string;group:AdminGroup;label:string;description:string;fields:AdminField[]};

/** Sidebar sections, in display order. */
export const adminGroups=['Content','Homepage','About PEN','Programmes','Get involved','Transparency','Website','Settings'] as const;
export type AdminGroup=typeof adminGroups[number];

/** Links may point to a website page ("/pen-academy"), an anchor or a full URL. */
const linkHelp='A website page such as /pen-academy, or a full https:// link.';

const position:AdminField={name:'position',label:'Position',type:'number',help:'Lower numbers appear first. Leave blank to add at the end.'};

/** Content types managed in the admin panel. `key` is both the admin URL segment and the Laravel API path. */
export const adminResources:AdminResource[]=[
 {key:'pages',group:'Website',label:'Pages',singular:'page',description:'Titles and hero text for every page.',titleField:'title',columns:['slug','title','heading'],canCreate:false,canDelete:false,fields:[
  {name:'title',label:'Page title',type:'text',required:true,help:'Used in the browser tab, breadcrumbs and website search.'},
  {name:'heading',label:'Hero heading',type:'text',required:true},
  {name:'intro',label:'Hero introduction',type:'textarea',required:true},
 ]},
 {key:'articles',group:'Content',label:'News & stories',singular:'article',description:'News, PEN heroes and blog posts.',titleField:'title',columns:['title','category','date_label'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'slug',label:'URL slug',type:'text',required:true,help:'Lowercase words separated by hyphens; the article opens at /your-slug.'},
  {name:'category',label:'Category',type:'select',options:['News','PEN heroes','Blog'],required:true},
  {name:'date_label',label:'Date label',type:'text',required:true,help:'For example “15 April 2025” or “Student stories”.'},
  {name:'image',label:'Image',type:'image',required:true},
  {name:'summary',label:'Summary',type:'textarea',required:true},
  {name:'body',label:'Body',type:'paragraphs',required:true,help:'Separate paragraphs with a blank line.'},
  {name:'source',label:'Original story title',type:'text',help:'Also used as the image description for screen readers.'},
  {name:'source_url',label:'Original story link',type:'url',help:'Adds a “Read PEN’s original story” link and summary note.'},
  position,
 ]},
 {key:'faqs',group:'Content',label:'FAQs',singular:'FAQ',description:'Questions on the FAQ page.',titleField:'question',columns:['question','position'],canCreate:true,canDelete:true,fields:[
  {name:'question',label:'Question',type:'text',required:true},
  {name:'answer',label:'Answer',type:'textarea',required:true},
  position,
 ]},
 {key:'schools',group:'Content',label:'Schools',singular:'school',description:'The school directory.',titleField:'name',columns:['name','district','enrollment'],canCreate:true,canDelete:true,fields:[
  {name:'name',label:'School name',type:'text',required:true},
  {name:'district',label:'District / area',type:'text',required:true},
  {name:'enrollment',label:'Enrolment',type:'number'},
  {name:'boys',label:'Boys',type:'number'},
  {name:'girls',label:'Girls',type:'number'},
  {name:'map',label:'Map link',type:'url'},
  position,
 ]},
 {key:'resources',group:'Content',label:'Documents',singular:'document',description:'Publications, activity books and corporate documents.',titleField:'title',columns:['title','type'],canCreate:true,canDelete:true,fields:[
  {name:'type',label:'Section',type:'select',options:['publications','pen-activity-books','corporate-information'],required:true},
  {name:'title',label:'Title',type:'text',required:true},
  {name:'url',label:'PDF link',type:'url',required:true,upload:true},
  {name:'image',label:'Cover image',type:'image'},
  position,
 ]},
 {key:'team-members',group:'About PEN',label:'Founders & directors',singular:'person',description:'People on the founders page.',titleField:'name',columns:['name','role'],canCreate:true,canDelete:true,fields:[
  {name:'name',label:'Name',type:'text',required:true},
  {name:'role',label:'Role',type:'text',required:true},
  {name:'image',label:'Photo',type:'image'},
  position,
 ]},
 {key:'hero-slides',apiPath:'collections/hero_slides',group:'Homepage',label:'Hero slides',singular:'slide',description:'Large photo slides at the top of the homepage.',titleField:'kicker',columns:['kicker','title','position'],canCreate:true,canDelete:true,fields:[
  {name:'image',label:'Photo',type:'image',required:true,help:'Wide landscape photo, at least 1600 px across.'},
  {name:'alt',label:'Photo description',type:'text',required:true,help:'Describes the photo for screen readers.'},
  {name:'kicker',label:'Small heading',type:'text',help:'Short line above the heading, for example “EVERY CHILD. EVERY OPPORTUNITY.”'},
  {name:'title',label:'Heading',type:'lines',required:true,help:'One line per row.'},
  {name:'highlight',label:'Highlighted last line',type:'text',help:'Shown in gold under the heading.'},
  {name:'text',label:'Text',type:'textarea'},
  position,
 ]},
 {key:'impact-figures',apiPath:'collections/impact_stats',group:'Homepage',label:'Impact counters',singular:'figure',description:'Animated figures under the homepage slides. Up to six fit on one row.',titleField:'label',columns:['value','label','icon'],canCreate:true,canDelete:true,fields:[
  {name:'value',label:'Number',type:'number',required:true},
  {name:'label',label:'Label',type:'text',required:true},
  {name:'icon',label:'Icon',type:'select',options:statIcons,required:true},
  position,
 ]},
 {key:'focus-areas',apiPath:'collections/homepage_focus',group:'Homepage',label:'Focus areas',singular:'focus area',description:'Priority cards on the homepage, linked to What We Do.',titleField:'title',columns:['title','sdgs'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'What We Do section',type:'text',required:true,help:'The section the card opens, for example “girls-education”.'},
  {name:'image',label:'Photo',type:'image',required:true},
  {name:'alt',label:'Photo description',type:'text',required:true},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'featured',label:'“In focus” line',type:'text'},
  {name:'sdgs',label:'SDG numbers',type:'lines',help:'One per line. Available: 3, 4, 5, 8, 9, 10, 16, 17.'},
  position,
 ]},
 {key:'purpose-cards',apiPath:'collections/purpose_cards',group:'About PEN',label:'Mission & vision',singular:'card',description:'Purpose cards on the About page.',titleField:'title',columns:['title','text'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'text',label:'Text',type:'textarea',required:true},
  position,
 ]},
 {key:'journey',apiPath:'collections/journey',group:'About PEN',label:'Journey timeline',singular:'milestone',description:'Milestones on the About page.',titleField:'title',columns:['year','title'],canCreate:true,canDelete:true,fields:[
  {name:'year',label:'Year',type:'text',required:true},
  {name:'title',label:'Title',type:'text',required:true},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'href',label:'Link',type:'text',help:linkHelp},
  {name:'label',label:'Link text',type:'text',help:'Required when a link is set.'},
  position,
 ]},
 {key:'core-values',apiPath:'collections/core_values',group:'About PEN',label:'Core values',singular:'value',description:'Values on the About and Core Values pages.',titleField:'title',columns:['title','icon'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'summary',label:'Short text (About page)',type:'textarea',required:true},
  {name:'text',label:'Full text (Core Values page)',type:'textarea',required:true},
  {name:'icon',label:'Icon',type:'select',options:valueIcons,required:true},
  position,
 ]},
 {key:'accountability-links',apiPath:'collections/accountability_links',group:'About PEN',label:'Accountability links',singular:'link',description:'Link cards at the end of the About page.',titleField:'title',columns:['title','href'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'href',label:'Link',type:'text',required:true,help:linkHelp},
  position,
 ]},
 {key:'education-models',apiPath:'collections/education_models',group:'Programmes',label:'Education models',singular:'model',description:'Model cards on the homepage and the Our Work page.',titleField:'title',columns:['image','title','tag'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens; the card opens /our-work#this-value.'},
  {name:'tag',label:'Small heading',type:'text'},
  {name:'image',label:'Photo',type:'image',required:true},
  {name:'text',label:'Text',type:'textarea',required:true},
  position,
 ]},
 {key:'interventions',apiPath:'collections/interventions',group:'Programmes',label:'Interventions',singular:'intervention',description:'Linked cards under the models on the Our Work page.',titleField:'title',columns:['image','title','href'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'image',label:'Photo',type:'image',required:true},
  {name:'href',label:'Link',type:'text',required:true,help:linkHelp},
  position,
 ]},
 {key:'programme-pages',apiPath:'collections/programme_pages',group:'Programmes',label:'Programme pages',singular:'programme page',description:'Main section of the PEN Academy, teacher development, academics and scholarships pages.',titleField:'page',columns:['page','title'],canCreate:false,canDelete:false,fields:[
  {name:'page',label:'Page',type:'select',options:programmePageSlugs,required:true},
  {name:'image',label:'Photo',type:'image',required:true},
  {name:'title',label:'Heading',type:'text',required:true},
  {name:'text',label:'Text',type:'paragraphs',required:true,help:'Separate paragraphs with a blank line.'},
  {name:'points',label:'Checklist points',type:'lines',help:'One point per line.'},
  {name:'cta_label',label:'Button text',type:'text',required:true},
  {name:'cta_href',label:'Button link',type:'text',required:true,help:linkHelp},
 ]},
 {key:'ongoing-programmes',apiPath:'collections/ongoing_programmes',group:'Programmes',label:'Ongoing programmes',singular:'programme',description:'Programme cards on the Ongoing Programmes page.',titleField:'title',columns:['title','icon','position'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens, used for the jump links.'},
  {name:'description',label:'Description',type:'textarea',required:true},
  {name:'icon',label:'Icon',type:'select',options:programmeIcons,required:true},
  {name:'themes',label:'Related focus areas',type:'lines',help:'One What We Do section per line, for example “girls-education”.'},
  {name:'link_label',label:'Link text',type:'text',required:true},
  {name:'link_href',label:'Link',type:'text',required:true,help:linkHelp},
  {name:'resource_title',label:'Second link text',type:'text'},
  {name:'resource_href',label:'Second link',type:'text',help:'Optional. '+linkHelp},
  position,
 ]},
 {key:'upcoming-priorities',apiPath:'collections/upcoming_priorities',group:'Programmes',label:'Upcoming priorities',singular:'priority',description:'Cards on the Upcoming Project Priorities page and the What We Do summary.',titleField:'title',columns:['title','theme'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens.'},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'theme',label:'Related focus area',type:'text',help:'A What We Do section, for example “digital-learning”.'},
  {name:'link_label',label:'Link text',type:'text',required:true},
  {name:'link_href',label:'Link',type:'text',required:true,help:linkHelp},
  position,
 ]},
 {key:'thematic-areas',apiPath:'collections/thematic_areas',group:'Programmes',label:'Thematic areas',singular:'thematic area',description:'Focus areas on the What We Do page and in the header menu.',titleField:'title',columns:['title','anchor'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens; the section opens at /what-we-do#this-value. Programmes and focus cards refer to it.'},
  {name:'summary',label:'Summary',type:'textarea',required:true,help:'Also shown in the header menu.'},
  {name:'points',label:'Points',type:'lines',help:'One point per line.'},
  {name:'link_label',label:'Link text',type:'text',required:true},
  {name:'link_href',label:'Link',type:'text',required:true,help:linkHelp},
  position,
 ]},
 {key:'cross-cutting-themes',apiPath:'collections/cross_cutting_themes',group:'Programmes',label:'Cross-cutting themes',singular:'theme',description:'Shared commitments on the What We Do page.',titleField:'title',columns:['title','link_href'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens.'},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'link_label',label:'Link text',type:'text',required:true},
  {name:'link_href',label:'Link',type:'text',required:true,help:linkHelp},
  position,
 ]},
 {key:'sponsorship-options',apiPath:'collections/sponsorship_options',group:'Get involved',label:'Sponsorship options',singular:'option',description:'Donation shop items and estimates, after the per-child rate.',titleField:'title',columns:['title','amount','period'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'amount',label:'Amount (PKR)',type:'number',required:true},
  {name:'period',label:'Period',type:'text',required:true,help:'For example “per year”, “one time” or “each”.'},
  {name:'icon',label:'Icon',type:'select',options:sponsorshipIcons,required:true},
  position,
 ]},
 {key:'bank-accounts',apiPath:'collections/bank_accounts',group:'Get involved',label:'Bank accounts',singular:'bank account',description:'Bank details on the donation page.',titleField:'name',columns:['name','iban'],canCreate:true,canDelete:true,fields:[
  {name:'name',label:'Bank name',type:'text',required:true},
  {name:'number',label:'Account number',type:'text',required:true},
  {name:'iban',label:'IBAN',type:'text',required:true,help:'Capital letters and digits, no spaces.'},
  {name:'swift',label:'SWIFT code',type:'text',help:'Optional. 8 or 11 capital letters and digits.'},
  position,
 ]},
 {key:'giving-enquiries',apiPath:'collections/giving_enquiries',group:'Get involved',label:'Giving enquiries',singular:'enquiry option',description:'“More ways to give” cards, each opening an email enquiry.',titleField:'title',columns:['title','text'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens.'},
  {name:'text',label:'Text',type:'textarea',required:true},
  position,
 ]},
 {key:'published-impact',apiPath:'collections/published_impact',group:'Transparency',label:'Published impact figures',singular:'figure',description:'Figures on the Our Impact page.',titleField:'label',columns:['value','label'],canCreate:true,canDelete:true,fields:[
  {name:'value',label:'Figure',type:'text',required:true,help:'As it should appear, for example “90,301”.'},
  {name:'label',label:'Label',type:'text',required:true},
  position,
 ]},
 {key:'disclosures',apiPath:'collections/disclosure_categories',group:'Transparency',label:'Disclosures',singular:'disclosure category',description:'Audit reports, policies and reporting channels on the Disclosures page.',titleField:'title',columns:['title','status','documents'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Title',type:'text',required:true},
  {name:'anchor',label:'Section link',type:'text',required:true,help:'Lowercase words with hyphens.'},
  {name:'status',label:'Status',type:'text',required:true,help:'For example “Awaiting documents” or “Published”.'},
  {name:'text',label:'Text',type:'textarea',required:true},
  {name:'documents',label:'Documents',type:'lines',help:'One per line as “Title | https://link”. Upload files under File uploads to get a link.'},
  position,
 ]},
 {key:'jobs-tenders',apiPath:'collections/opportunities',group:'Get involved',label:'Jobs & tenders',singular:'notice',description:'Job and tender notices on the Jobs & Tenders and Careers pages.',titleField:'title',columns:['type','title','closing_date','is_open'],canCreate:true,canDelete:true,fields:[
  {name:'type',label:'Type',type:'select',options:opportunityTypes,required:true},
  {name:'title',label:'Title',type:'text',required:true},
  {name:'reference',label:'Reference',type:'text'},
  {name:'category',label:'Category',type:'text',help:'For example “Supply tender” or “Full-time”.'},
  {name:'location',label:'Location',type:'text'},
  {name:'closing_date',label:'Closing date',type:'date',help:'Notices disappear from the website after this date.'},
  {name:'summary',label:'Summary',type:'textarea'},
  {name:'document_url',label:'Notice document',type:'url',upload:true},
  {name:'apply_url',label:'Application or submission link',type:'text',help:'A https:// link or mailto: address.'},
  {name:'is_open',label:'Published',type:'checkbox',help:'Untick to hide the notice without deleting it.'},
  position,
 ]},
 {key:'partners',apiPath:'collections/partners',group:'About PEN',label:'Partners & supporters',singular:'partner',description:'Logos on the supporters page and the homepage strip.',titleField:'name',columns:['name','url'],canCreate:true,canDelete:true,fields:[
  {name:'name',label:'Name',type:'text',required:true,help:'Also used as the logo description.'},
  {name:'logo',label:'Logo',type:'image',required:true},
  {name:'url',label:'Website',type:'url',help:'Optional. The logo links here when set.'},
  position,
 ]},
 {key:'gallery',apiPath:'collections/gallery',group:'Content',label:'Photo gallery',singular:'photo',description:'Photos on the gallery page.',titleField:'caption',columns:['image','caption','position'],canCreate:true,canDelete:true,fields:[
  {name:'image',label:'Photo',type:'image',required:true},
  {name:'caption',label:'Caption',type:'text',help:'Optional. Shown in the photo viewer and read by screen readers.'},
  position,
 ]},
 {key:'legal-sections',apiPath:'collections/legal_sections',group:'Website',label:'Privacy & terms',singular:'section',description:'Sections of the privacy policy and terms of use pages.',titleField:'heading',columns:['page','heading','position'],canCreate:true,canDelete:true,fields:[
  {name:'page',label:'Page',type:'select',options:legalPages,required:true},
  {name:'heading',label:'Heading',type:'text',required:true},
  {name:'text',label:'Text',type:'paragraphs',required:true,help:'Separate paragraphs with a blank line. Write {email} to insert the contact email as a link.'},
  {name:'link_label',label:'Link text',type:'text'},
  {name:'link_href',label:'Link',type:'text',help:'Optional. '+linkHelp},
  position,
 ]},
 {key:'offices',apiPath:'collections/offices',group:'Settings',label:'Offices',singular:'office',description:'Office addresses on the contact page.',titleField:'title',columns:['title','address'],canCreate:true,canDelete:true,fields:[
  {name:'title',label:'Office name',type:'text',required:true,help:'For example “Head office · Lahore”.'},
  {name:'address',label:'Address',type:'lines',required:true,help:'One line per row.'},
  {name:'map_url',label:'Map link',type:'url',help:'Google Maps link for the “Get directions” button.'},
  position,
 ]},
];

export const findAdminResource=(key:string)=>adminResources.find(r=>r.key===key);
export const resourceApiPath=(resource:AdminResource)=>resource.apiPath??resource.key;

/** Settings forms. `social_media` has its own list editor; the rest use the generic form. */
export const adminSettings:AdminSetting[]=[
 {key:'homepage',group:'Homepage',label:'Homepage text',description:'Headings, photos and text in the homepage sections.',fields:[
  {name:'hero_tagline',label:'Slider bottom line',type:'text'},
  {name:'hero_caption',label:'Slider photo caption',type:'text'},
  {name:'stats_kicker',label:'Counters: small heading',type:'text'},
  {name:'stats_heading',label:'Counters: heading',type:'text'},
  {name:'stats_note',label:'Counters: source note',type:'text'},
  {name:'about_image',label:'About: photo',type:'image',required:true},
  {name:'about_since',label:'About: year badge',type:'text',help:'Leave empty to hide the badge.'},
  {name:'about_heading',label:'About: heading',type:'text',required:true},
  {name:'about_highlight',label:'About: highlighted line',type:'text'},
  {name:'about_text',label:'About: text',type:'paragraphs',required:true,help:'Separate paragraphs with a blank line.'},
  {name:'focus_heading',label:'Focus areas: heading',type:'text',required:true},
  {name:'focus_intro',label:'Focus areas: introduction',type:'textarea'},
  {name:'schools_image',label:'Schools: photo',type:'image',required:true},
  {name:'schools_heading',label:'Schools: heading',type:'lines',required:true,help:'One line per row.'},
  {name:'schools_text',label:'Schools: text',type:'textarea'},
 ]},
 {key:'about',group:'About PEN',label:'Our story & CEO message',description:'About page story and the CEO message page.',fields:[
  {name:'story_image',label:'Story: photo',type:'image',required:true},
  {name:'story_since',label:'Story: year badge',type:'text',help:'Leave empty to hide the badge.'},
  {name:'story_heading',label:'Story: heading',type:'text',required:true},
  {name:'story_highlight',label:'Story: highlighted line',type:'text'},
  {name:'story_text',label:'Story: text',type:'paragraphs',required:true,help:'Separate paragraphs with a blank line.'},
  {name:'ceo_photo',label:'CEO: photo',type:'image',required:true},
  {name:'ceo_name',label:'CEO: name',type:'text',required:true},
  {name:'ceo_role',label:'CEO: role',type:'text'},
  {name:'ceo_heading',label:'Message: heading',type:'text',required:true},
  {name:'ceo_message',label:'Message: text',type:'paragraphs',required:true,help:'Separate paragraphs with a blank line.'},
  {name:'ceo_source_url',label:'Message: original link',type:'url',help:'Leave empty to hide the “Read the original message” link.'},
 ]},
 {key:'donations',group:'Get involved',label:'Donation settings',description:'Per-child sponsorship rate, calculator limit and bank account title.',fields:[
  {name:'child_title',label:'Child sponsorship title',type:'text',required:true},
  {name:'child_amount',label:'Yearly rate per child (PKR)',type:'number',required:true},
  {name:'max_children',label:'Maximum children in the calculator',type:'number',required:true},
  {name:'account_title',label:'Bank account title',type:'text',required:true},
 ]},
 {key:'contact',group:'Settings',label:'Contact details',description:'Email, phone, WhatsApp and address shown in the footer, contact page and enquiry forms.',fields:[
  {name:'email',label:'Email address',type:'text',required:true,help:'Enquiry forms open an email draft to this address.'},
  {name:'phones',label:'Phone numbers',type:'lines',help:'One number per line. The first appears in the footer.'},
  {name:'whatsapp',label:'WhatsApp numbers',type:'lines',help:'One number per line. Leave empty to hide the WhatsApp section.'},
  {name:'address',label:'Footer address',type:'lines',required:true,help:'One line per row. Office addresses are managed under Offices.'},
 ]},
 {key:'site',group:'Settings',label:'Site options',description:'Top bar text, footer tagline, homepage video and official links.',fields:[
  {name:'topbar_text',label:'Top bar text',type:'text'},
  {name:'footer_tagline',label:'Footer tagline',type:'textarea',help:'Press Enter for a line break.'},
  {name:'video_url',label:'Homepage video (YouTube link)',type:'url',help:'Leave empty to hide the “Watch our story” button.'},
  {name:'donation_url',label:'Official donation page',type:'url',required:true},
  {name:'careers_url',label:'Official careers form',type:'url',required:true},
 ]},
 {key:'social_media',group:'Settings',label:'Social links',description:'Profiles listed in the website footer.',fields:[]},
];

/** Admin pages that are neither list modules nor settings forms. */
export const adminTools:{href:string;group:AdminGroup;label:string;description:string}[]=[
 {href:'/admin/uploads',group:'Content',label:'File uploads',description:'Upload a PDF, document or image and copy its link.'},
];

export const findAdminSetting=(key:string)=>adminSettings.find(s=>s.key===key);

