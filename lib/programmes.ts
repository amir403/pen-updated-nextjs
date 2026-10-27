// Education models, interventions, programme pages and project priorities as published on the
// website. The admin panel can override them; these values are the fallback and the database seed.
export type EducationModel={anchor:string;title:string;tag:string;image:string;text:string};
export type Intervention={title:string;text:string;image:string;href:string};
export type ProgrammePage={page:string;image:string;title:string;text:string[];points:string[];cta_label:string;cta_href:string};
export type OngoingProgramme={anchor:string;title:string;description:string;themes:string[];icon:string;link_href:string;link_label:string;resource_title:string;resource_href:string};
export type Priority={anchor:string;title:string;text:string;theme:string;link_href:string;link_label:string};

/** Pages with a programme detail section; each has exactly one programme page record. */
export const programmePageSlugs=['pen-academy','teacher-training','academics','scholarships'] as const;
/** Icons for ongoing programme cards; the key is stored with each programme. */
export const programmeIcons=['school','handshake','users','graduation','book','laptop','search'] as const;

export const educationModels:EducationModel[]=[
 {anchor:'peima',title:'PEIMA model',tag:'PUBLIC–PRIVATE PARTNERSHIP',image:'/images/modelschoolpic1-ezgif.com-resize-1.jpg',text:'Managing partner schools, strengthening teaching, and improving facilities through a partnership with Punjab Education Initiatives Management Authority.'},
 {anchor:'pen',title:'PEN model',tag:'STRONGER PUBLIC SCHOOLS',image:'/images/IMG_4701-1-min-scaled.jpg',text:'Supporting government-managed schools with resources and better learning environments.'},
 {anchor:'non-formal',title:'Non-formal education',tag:'A SECOND CHANCE TO LEARN',image:'/images/Non-Formal-Education-min-scaled.jpg',text:'Flexible schooling helps working and out-of-school children return to learning.'},
];

export const interventions:Intervention[]=[
 {title:'PEN Academy',text:'Free digital lessons and learning resources.',image:'/images/IMG_958330-1-scaled.jpg',href:'/pen-academy'},
 {title:'Teacher development',text:'Practical training and classroom mentoring.',image:'/images/training-img.jpg',href:'/teacher-training'},
 {title:'Academic support',text:'Lesson plans, activity books and learning materials.',image:'/images/IMG_4631.jpg',href:'/academics'},
 {title:'100 Scholarship Program',text:'Helping deserving students continue their education.',image:'/images/IMG_3496.jpg',href:'/scholarships'},
];

export const programmePages:ProgrammePage[]=[
 {page:'pen-academy',image:'/images/IMG_958330-1-scaled.jpg',title:'A classroom, wherever you are.',text:['PEN Academy brings digital educational resources to students, teachers and parents. Its portal organises learning by grade and subject, aligned with the Punjab curriculum.','Explore video lessons, practice material and resources through the learning portal and YouTube channel.'],points:['Grade-wise and subject-wise lessons','Resources for learners and educators','Free access to learning content'],cta_label:'Visit PEN Academy',cta_href:'https://penacademy.pk/'},
 {page:'teacher-training',image:'/images/training-img.jpg',title:'Confidence in every classroom.',text:['PEN supports teachers through training and ongoing mentoring.'],points:['Pre-service and in-service training','Practical classroom methods','Ongoing mentoring and refresher support'],cta_label:'Connect with PEN',cta_href:'/contact-us'},
 {page:'academics',image:'/images/IMG_4631.jpg',title:'Good resources. Better learning.',text:['PEN develops lesson plans and learning materials, alongside support for school libraries and computer labs.'],points:['Lesson planning and teaching resources','Activity books for primary classes','Co-curricular learning opportunities'],cta_label:'Explore activity books',cta_href:'/pen-activity-books'},
 {page:'scholarships',image:'/images/IMG_3496.jpg',title:'Support for the next chapter.',text:['The PEN 100 Scholarship Program helps students facing financial barriers continue their studies.'],points:['Support for deserving students','Encouraging academic potential','Funded by PEN’s Board of Directors'],cta_label:'Ask about the programme',cta_href:'/contact-us'},
];

export const ongoingProgrammes:OngoingProgramme[]=[
 {anchor:'public-school-adoption',title:'Public-School Adoption',description:'School improvement, access to education and support for disadvantaged children.',themes:['quality-education','school-infrastructure'],icon:'school',link_href:'/our-work#pen',link_label:'Explore the PEN model',resource_title:'Find our schools',resource_href:'/explore-our-schools'},
 {anchor:'peima-partnership',title:'PEIMA Partnership Model',description:'Management and quality improvement of public schools in Punjab.',themes:['quality-education','school-infrastructure'],icon:'handshake',link_href:'/our-work#peima',link_label:'Explore the PEIMA model',resource_title:'Browse the school directory',resource_href:'/explore-our-schools'},
 {anchor:'non-formal-education',title:'Non-Formal Education (NFE)',description:'Second-chance education for out-of-school and working children.',themes:['quality-education','inclusive-education'],icon:'users',link_href:'/our-work#non-formal',link_label:'Discover non-formal education',resource_title:'Speak to our team',resource_href:'/contact-us'},
 {anchor:'teacher-training',title:'Teacher Training',description:'Pre-service, in-service and refresher training, alongside mentoring and professional development.',themes:['teacher-development'],icon:'graduation',link_href:'/teacher-training',link_label:'Explore teacher development',resource_title:'Browse PEN publications',resource_href:'/publications'},
 {anchor:'academic-development',title:'Academic Development',description:'Lesson plans, activity books, teaching resources and student assessments.',themes:['quality-education','teacher-development'],icon:'book',link_href:'/academics',link_label:'Discover academic support',resource_title:'Explore activity books',resource_href:'/pen-activity-books'},
 {anchor:'pen-academy',title:'PEN Academy',description:'Digital learning content, educational technology and online learning resources.',themes:['digital-learning'],icon:'laptop',link_href:'/pen-academy',link_label:'Discover PEN Academy',resource_title:'Visit the learning portal',resource_href:'https://penacademy.pk/'},
 {anchor:'scholarships',title:'Scholarships',description:'Financial support for academically strong students from marginalized families.',themes:['quality-education','inclusive-education'],icon:'graduation',link_href:'/scholarships',link_label:'Explore the scholarship programme',resource_title:'Ask about scholarships',resource_href:'/contact-us'},
 {anchor:'monitoring-evaluation',title:'Monitoring and Evaluation',description:'Monitoring attendance, retention, classroom quality, teacher performance and school facilities.',themes:['research-impact'],icon:'search',link_href:'/what-we-do#research-impact',link_label:'Explore research and learning',resource_title:'Read our publications',resource_href:'/publications'},
];

export const priorities:Priority[]=[
 {anchor:'education-programmes',title:'Our Education Programmes',text:'Quality education, school improvement and non-formal education',theme:'quality-education',link_href:'/ongoing-projects',link_label:'Explore education programmes'},
 {anchor:'girls-inclusion',title:'Girls & Inclusion',text:'Gender equality, child rights and safeguarding',theme:'inclusive-education',link_href:'/what-we-do#girls-education',link_label:'Explore girls’ education'},
 {anchor:'digital-education',title:'PEN Academy',text:'Digital learning and educational technology',theme:'digital-learning',link_href:'/pen-academy',link_label:'Discover PEN Academy'},
 {anchor:'teacher-school-development',title:'Teacher & School Development',text:'Training, leadership and infrastructure',theme:'school-infrastructure',link_href:'/teacher-training',link_label:'Explore teacher development'},
 {anchor:'research-impact',title:'Research & Impact',text:'Monitoring, evaluation, research and results',theme:'research-impact',link_href:'/what-we-do#research-impact',link_label:'Explore research and impact'},
 {anchor:'partnerships-resources',title:'Partnerships & Resources',text:'Donor partnerships and opportunities to work together',theme:'community-wellbeing',link_href:'/contact-us',link_label:'Connect with PEN'},
];
