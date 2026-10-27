// Editorial summaries of PEN's published About, CEO Message and Core Values pages.
export type PurposeCard={title:string;text:string};
export const purposeCards:PurposeCard[] = [
  {title:'Our mission',text:'Support the holistic development of children in public schools through quality education, stronger teaching and better learning environments.'},
  {title:'Our vision',text:'Public schools where children can learn and thrive, supported by improved facilities, inspired teachers and opportunities to grow.'},
];
export type JourneyItem={year:string;title:string;text:string;href?:string|null;label?:string|null};
export const journey:JourneyItem[] = [
  {year:'2005',title:'A shared beginning',text:'PEN is established to bring free, quality education to underserved children through public-school adoption.'},
  {year:'2019',title:'Learning beyond the classroom',text:'PEN Academy introduces a collective digital-learning initiative for students and teachers.',href:'/pen-academy',label:'Discover PEN Academy'},
  {year:'2022',title:'Growing with communities',text:'PEN reports expansion to more than 27 districts in its published organisational timeline.',href:'/explore-our-schools',label:'Explore our schools'},
];
export type CoreValue={title:string;summary:string;text:string;icon:string};
/** Icon keys for values; each maps to one icon on the About page and one on the Core Values page. */
export const valueIcons=['responsibility','governance','impact','transparency','community','learning'] as const;
export const coreValues:CoreValue[] = [
  {title:'Social responsibility',summary:'Education is a right. Improving access is a shared responsibility.',text:'Basic education is a child’s right. We share responsibility for improving access.',icon:'responsibility'},
  {title:'Corporate governance',summary:'Responsible management and oversight guide the work.',text:'Our work is guided by responsible management and oversight.',icon:'governance'},
  {title:'High impact',summary:'Focus on classroom learning and improvements that reach children through public schools.',text:'We focus on changes that improve learning in public school classrooms.',icon:'impact'},
  {title:'Radical transparency',summary:'Openness and information sharing keep stakeholders connected.',text:'We value openness and sharing information with stakeholders.',icon:'transparency'},
];
export type AccountabilityLink={title:string;text:string;href:string};
export const accountabilityLinks:AccountabilityLink[] = [
  {title:'Publications',text:'Explore published reports and updates.',href:'/publications'},
  {title:'Corporate information',text:'Find organisational documents and records.',href:'/corporate-information'},
  {title:'Our supporters',text:'Meet the partners behind the work.',href:'/our-donors-supporters'},
];

export type AboutText={
  story_image:string;story_since:string;story_heading:string;story_highlight:string;story_text:string[];
  ceo_photo:string;ceo_name:string;ceo_role:string;ceo_heading:string;ceo_message:string[];ceo_source_url:string|null;
};
export const aboutText:AboutText = {
  story_image:'/images/IMG_4631.jpg',
  story_since:'2005',
  story_heading:'Potential is everywhere.',
  story_highlight:'Opportunity should be too.',
  story_text:['Progressive Education Network is a professionally managed nonprofit working to bring free, quality education to children from underserved communities in Pakistan.','Since 2005, PEN has adopted public schools and supported better teaching, school facilities and digital learning. Teachers, families and supporters help turn that purpose into everyday opportunities to learn.'],
  ceo_photo:'/images/ceo-ezgif.com-resize.jpg',
  ceo_name:'Dr. Muhammad Najeeb Khan',
  ceo_role:'CEO, Progressive Education Network',
  ceo_heading:'Unlocking potential, together.',
  ceo_message:['In his published message, Dr. Muhammad Najeeb Khan describes PEN’s purpose as the holistic development of children in public schools.','His priorities include better learning environments, improved school infrastructure and close collaboration with teachers, communities and partners.','The message emphasises responsible use of funds, transparency and accountability across management and school teams, with children’s academic progress at the centre of the work.'],
  ceo_source_url:'https://pen.org.pk/ceo-message/',
};
