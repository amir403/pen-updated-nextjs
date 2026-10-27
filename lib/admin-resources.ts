import {statIcons} from '@/lib/homepage';

export type AdminField={name:string;label:string;type:'text'|'textarea'|'number'|'url'|'select'|'image'|'paragraphs'|'lines'|'checkbox'|'date';options?:readonly string[];required?:boolean;help?:string};
/** A list module. `key` is the admin URL segment; `apiPath` the Laravel path (defaults to `key`). */
export type AdminResource={key:string;apiPath?:string;group:AdminGroup;label:string;singular:string;description:string;titleField:string;columns:string[];fields:AdminField[];canCreate:boolean;canDelete:boolean};
/** A single-record settings form, stored in Laravel under `settings/<key>`. */
export type AdminSetting={key:string;group:AdminGroup;label:string;description:string;fields:AdminField[]};

/** Sidebar sections, in display order. */
export const adminGroups=['Content','Homepage','About PEN','Programmes','Get involved','Transparency','Website','Settings'] as const;
export type AdminGroup=typeof adminGroups[number];

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
  {name:'url',label:'PDF link',type:'url',required:true},
  {name:'image',label:'Cover image',type:'image'},
  position,
 ]},
 {key:'team-members',group:'Website',label:'Founders & directors',singular:'person',description:'People on the founders page.',titleField:'name',columns:['name','role'],canCreate:true,canDelete:true,fields:[
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

export const findAdminSetting=(key:string)=>adminSettings.find(s=>s.key===key);

