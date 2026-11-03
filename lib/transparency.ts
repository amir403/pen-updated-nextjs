// Cross-cutting headings: WEBSITE OUTLINE.docx. Summaries are editorial navigation aids.
export type CrossCuttingTheme={anchor:string;title:string;text:string;link_href:string;link_label:string};
export const crossCuttingThemes=[
 {id:'safeguarding-psea',title:'Child safeguarding and PSEA',text:'Keeping child safeguarding and protection from sexual exploitation and abuse in view across education programmes.',href:'/disclosures#policies',label:'Policy information'},
 {id:'gender-social-inclusion',title:'Gender equality and social inclusion',text:'Recognising barriers to participation and supporting equal learning opportunities.',href:'/what-we-do#girls-education',label:'Girls’ education'},
 {id:'disability-accessibility',title:'Disability inclusion and accessibility',text:'Considering accessibility and the participation of children with disabilities in learning environments.',href:'/what-we-do#inclusive-education',label:'Inclusive education'},
 {id:'climate-disaster-risk',title:'Climate resilience and disaster risk reduction',text:'Considering safer learning environments, resilience and risks that can interrupt education.',href:'/what-we-do#school-infrastructure',label:'Learning environments'},
 {id:'community-participation',title:'Community participation',text:'Engaging families and communities in children’s education and wellbeing.',href:'/what-we-do#community-wellbeing',label:'Community engagement'},
 {id:'evidence-accountability',title:'Evidence-based programming and accountability',text:'Using monitoring, learning and shared information to inform education programmes.',href:'/impact',label:'Explore impact and evidence'},
];
// Existing logo assets already used on the sourced supporters page.
export type Partner={name:string;logo:string;url:string|null};
export const existingPartners:Partner[]=[
 {name:'ABS & Co.',logo:'/images/ABS-Co.png',url:null},
 {name:'Agha Shahid & Associates',logo:'/images/Agha-Shahid-Associates.jpg',url:null},
 {name:'AGP',logo:'/images/AGP.jpg',url:null},
 {name:'Al-Fateh',logo:'/images/Al-Fateh.png',url:null},
 {name:'Excel Group',logo:'/images/Excel-Group-Logo.jpg',url:null},
];
export type ImpactFigure={value:string;label:string};
export const publishedImpact:ImpactFigure[]=[
 {value:'530',label:'Adopted schools'},
 {value:'90,301',label:'Enrolled students'},
 {value:'27',label:'Districts across Pakistan'},
];
/** Documents are "Title | https://link" lines, so one category can list several files. */
export type DisclosureCategory={anchor:string;title:string;status:string;text:string;documents:string[]};
export const disclosureCategories:DisclosureCategory[]=[
 {anchor:'audit-reports',title:'Audit reports',status:'Awaiting documents',text:'Year-wise approved audit reports, including the requested 2025–2026 material, will appear here when supplied.',documents:[]},
 {anchor:'policies',title:'PEN policies',status:'Awaiting documents',text:'Approved organisational policies, including safeguarding and PSEA material, will be added when available for publication.',documents:[]},
 {anchor:'complaints',title:'Complaints',status:'Awaiting confirmed process',text:'The authorised complaints contact, submission instructions and process are awaiting confirmation. A dedicated complaint number is not currently published here.',documents:[]},
 {anchor:'whistleblowing',title:'Whistleblowing',status:'Awaiting confirmed process',text:'The approved policy, authorised reporting channel and confidentiality information will be published once confirmed.',documents:[]},
];

/** Splits a "Title | https://link" document line; lines without a link are skipped. */
export function parseDocument(line:string){
 const [title,url]=line.split('|').map(part=>part.trim());
 return title&&url?{title,url}:null;
}
