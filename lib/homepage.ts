// Homepage copy, slides and published figures. The admin panel can override them;
// these values are the fallback and the database seed.
export type HeroSlide={image:string;alt:string;kicker:string;title:string[];highlight:string;text:string};
export type ImpactStat={value:number;label:string;icon:string};
export type FocusArea={anchor:string;title:string;image:string;alt:string;text:string;featured:string|null;sdgs:number[]};
export type HomepageText={
 hero_tagline:string;hero_caption:string;
 stats_kicker:string;stats_heading:string;stats_note:string;
 about_image:string;about_since:string;about_heading:string;about_highlight:string;about_text:string[];
 focus_heading:string;focus_intro:string;
 schools_image:string;schools_heading:string[];schools_text:string;
};

export const heroSlides:HeroSlide[]=[
 {image:'/images/IMG_4626.jpg',alt:'Smiling students at a PEN-supported school',kicker:'EDUCATION CHANGES EVERYTHING',title:['Transforming Education.','Empowering Children.'],highlight:'Strengthening Communities.',text:'Together, we can give every child the opportunity to learn, dream and build a brighter future.'},
 {image:'/images/IMG_4631.jpg',alt:'Children learning together in a PEN classroom',kicker:'EVERY CHILD. EVERY OPPORTUNITY.',title:['Small beginnings.'],highlight:'Extraordinary futures.',text:'We work with public schools to bring quality education closer to children across Pakistan.'},
 {image:'/images/training-img.jpg',alt:'PEN teacher training',kicker:'STRONG TEACHERS. STRONGER FUTURES.',title:['Inspire a teacher.'],highlight:'Empower a generation.',text:'Practical training and classroom support help teachers make every lesson count.'},
];

/** Icons available for impact figures; the key is stored with each figure. */
export const statIcons=['school','students','districts','teachers','books','heart'] as const;

export const impactStats:ImpactStat[]=[
 {value:530,label:'Adopted schools',icon:'school'},
 {value:90301,label:'Enrolled students',icon:'students'},
 {value:27,label:'Districts across Pakistan',icon:'districts'},
];

export const homepageText:HomepageText={
 hero_tagline:'FREE, QUALITY EDUCATION. FOR EVERY CHILD.',
 hero_caption:'A smile. A school. A new beginning.',
 stats_kicker:'ONE MISSION.',
 stats_heading:'Thousands of possibilities.',
 stats_note:'Figures published on PEN’s homepage.',
 about_image:'/images/IMG_4631.jpg',
 about_since:'2005',
 about_heading:'Potential is everywhere.',
 about_highlight:'Opportunity should be too.',
 about_text:['Every child has the right to a quality education. We’re here to help make that right a reality.','Founded in 2005, PEN strengthens government schools and brings digital learning to children from underserved communities. Together with teachers and supporters, we create places where children can thrive.'],
 focus_heading:'Five ways to open a world of possibility.',
 focus_intro:'Education connects every part of our work. These five priorities bring our commitment to children, teachers and communities together.',
 schools_image:'/images/modelschoolpic1-ezgif.com-resize-1.jpg',
 schools_heading:['Closer to home.','Further in life.'],
 schools_text:'We work within communities to transform public schools into places of opportunity. Explore the people and places at the heart of our work.',
};
