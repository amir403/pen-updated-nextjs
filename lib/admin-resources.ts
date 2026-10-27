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
];

export const findAdminResource=(key:string)=>adminResources.find(r=>r.key===key);
export const resourceApiPath=(resource:AdminResource)=>resource.apiPath??resource.key;

/** Settings forms. `social_media` has its own list editor; the rest use the generic form. */
export const adminSettings:AdminSetting[]=[
 {key:'social_media',group:'Settings',label:'Social links',description:'Profiles listed in the website footer.',fields:[]},
];

export const findAdminSetting=(key:string)=>adminSettings.find(s=>s.key===key);

