// Website-specific source: WEBSITE OUTLINE.docx, supplied 19 October 2026.
// Potential partner.docx belongs to a separate portal and is not a website source.
export const thematicAreas = [
  {id:'quality-education',title:'Access to Quality Education',summary:'Stronger public schools and more opportunities to learn.',points:['Public-school adoption and improvement','Education for underserved communities','Foundational literacy and numeracy','Inclusive and equitable education','Out-of-school children and non-formal education'],href:'/our-work',linkText:'Explore our education models'},
  {id:'girls-education',title:'Girls’ Education and Gender Equality',summary:'Equal opportunities, safe schools and girls’ empowerment.',points:['Girls’ enrolment, attendance and retention','Adolescent girls’ empowerment','Prevention of child marriage','Gender-responsive schools','Equal learning opportunities'],href:'/contact-us',linkText:'Connect with our team'},
  {id:'digital-learning',title:'Digital Learning and Educational Technology',summary:'PEN Academy, digital content and technology-enabled teaching.',points:['PEN Academy','E-learning and digital content','Technology-enabled teaching','Digital literacy','Learning analytics and education dashboards'],href:'/pen-academy',linkText:'Discover PEN Academy'},
  {id:'teacher-development',title:'Teacher Development and School Leadership',summary:'Supporting teachers, school leaders and better classroom practice.',points:['Teacher training and mentoring','School leadership and management','Pedagogical innovation','Classroom assessment','Institutional capacity building'],href:'/teacher-training',linkText:'Explore teacher development'},
  {id:'community-wellbeing',title:'Community Engagement and Child Wellbeing',summary:'Families, communities and children’s wellbeing at the heart of learning.',points:['Parent and community participation','Child protection and safeguarding','Adolescent life skills','Positive social norms','School-community partnerships'],href:'/volunteer',linkText:'Get involved with PEN'},
  {id:'inclusive-education',title:'Inclusive Education and Child Rights',summary:'Reducing barriers and creating safe, inclusive learning environments.',points:['Education for children with disabilities','Access for marginalized children','Safe and inclusive learning environments','Child participation and rights awareness','Prevention of discrimination and exclusion'],href:'/contact-us',linkText:'Discuss inclusive education'},
  {id:'school-infrastructure',title:'School Infrastructure and Learning Environments',summary:'Better facilities, accessible classrooms and learning resources.',points:['School rehabilitation and facilities','Water, sanitation and hygiene in schools','Safe classrooms and accessibility','Learning materials and educational resources','Climate-resilient schools'],href:'/explore-our-schools',linkText:'Explore our schools'},
  {id:'research-impact',title:'Research, Monitoring, Evaluation and Learning',summary:'Using education data, assessment and evidence to inform learning.',points:['Education data and performance monitoring','Learning assessments','Research and evidence generation','Digital dashboards and reporting','Impact evaluations and knowledge products'],href:'/publications',linkText:'Browse publications'},
];

export const upcomingPriorities = [
  ['Our Education Programmes','Quality education, school improvement and non-formal education'],
  ['Girls & Inclusion','Gender equality, child rights and safeguarding'],
  ['PEN Academy','Digital learning and educational technology'],
  ['Teacher & School Development','Training, leadership and infrastructure'],
  ['Research & Impact','Monitoring, evaluation, research and results'],
  ['Partnerships & Resources','Donor partnerships and opportunities to work together'],
];

export const ongoingProgrammes = [
  {id:'public-school-adoption',title:'Public-School Adoption',description:'School improvement, access to education and support for disadvantaged children.',themes:['quality-education','school-infrastructure'],href:'/our-work#pen',linkText:'Explore the PEN model',resource:{title:'Find our schools',href:'/explore-our-schools'}},
  {id:'peima-partnership',title:'PEIMA Partnership Model',description:'Management and quality improvement of public schools in Punjab.',themes:['quality-education','school-infrastructure'],href:'/our-work#peima',linkText:'Explore the PEIMA model',resource:{title:'Browse the school directory',href:'/explore-our-schools'}},
  {id:'non-formal-education',title:'Non-Formal Education (NFE)',description:'Second-chance education for out-of-school and working children.',themes:['quality-education','inclusive-education'],href:'/our-work#non-formal',linkText:'Discover non-formal education',resource:{title:'Speak to our team',href:'/contact-us'}},
  {id:'teacher-training',title:'Teacher Training',description:'Pre-service, in-service and refresher training, alongside mentoring and professional development.',themes:['teacher-development'],href:'/teacher-training',linkText:'Explore teacher development',resource:{title:'Browse PEN publications',href:'/publications'}},
  {id:'academic-development',title:'Academic Development',description:'Lesson plans, activity books, teaching resources and student assessments.',themes:['quality-education','teacher-development'],href:'/academics',linkText:'Discover academic support',resource:{title:'Explore activity books',href:'/pen-activity-books'}},
  {id:'pen-academy',title:'PEN Academy',description:'Digital learning content, educational technology and online learning resources.',themes:['digital-learning'],href:'/pen-academy',linkText:'Discover PEN Academy',resource:{title:'Visit the learning portal',href:'https://penacademy.pk/'}},
  {id:'scholarships',title:'Scholarships',description:'Financial support for academically strong students from marginalized families.',themes:['quality-education','inclusive-education'],href:'/scholarships',linkText:'Explore the scholarship programme',resource:{title:'Ask about scholarships',href:'/contact-us'}},
  {id:'monitoring-evaluation',title:'Monitoring and Evaluation',description:'Monitoring attendance, retention, classroom quality, teacher performance and school facilities.',themes:['research-impact'],href:'/what-we-do#research-impact',linkText:'Explore research and learning',resource:{title:'Read our publications',href:'/publications'}},
];

// Related destinations provide navigation, not new project announcements.
export const priorityDestinations = [
  {id:'education-programmes',href:'/ongoing-projects',label:'Explore education programmes',theme:'quality-education'},
  {id:'girls-inclusion',href:'/what-we-do#girls-education',label:'Explore girls’ education',theme:'inclusive-education'},
  {id:'digital-education',href:'/pen-academy',label:'Discover PEN Academy',theme:'digital-learning'},
  {id:'teacher-school-development',href:'/teacher-training',label:'Explore teacher development',theme:'school-infrastructure'},
  {id:'research-impact',href:'/what-we-do#research-impact',label:'Explore research and impact',theme:'research-impact'},
  {id:'partnerships-resources',href:'/contact-us',label:'Connect with PEN',theme:'community-wellbeing'},
];

export const sdgLabels: Record<number,string> = {
  3:'Good Health and Well-being',4:'Quality Education',5:'Gender Equality',
  8:'Decent Work and Economic Growth',9:'Industry, Innovation and Infrastructure',
  10:'Reduced Inequalities',16:'Peace, Justice and Strong Institutions',17:'Partnerships for the Goals',
};

export const homepageFocus = [
  {id:'quality-education',title:'Quality Education and School Improvement',image:'quality-education.jpg',alt:'A teacher supporting children with their classroom work',text:'Strengthening schools, improving teaching and learning, and expanding equitable access to quality education for underserved children.',sdgs:[4,10]},
  {id:'girls-education',title:'Girls’ Education and Child Protection',image:'girls-education.jpg',alt:'Girls reading and learning together in a classroom',text:'Promoting girls’ enrolment, retention and empowerment while supporting safe learning environments, child safeguarding and awareness to prevent child marriage.',featured:'Child Marriage Prevention and Adolescent Girls’ Empowerment',sdgs:[5,3,16]},
  {id:'digital-learning',title:'Digital Learning — PEN Academy',image:'digital-learning.jpg',alt:'Students using tablets for digital learning in a classroom',text:'Expanding access to technology-enabled education through digital lessons, learning resources and innovative approaches that support students and teachers.',sdgs:[4,9]},
  {id:'teacher-development',title:'Teacher Development and Institutional Strengthening',image:'teacher-development.jpg',alt:'Teachers collaborating during a professional development session',text:'Building teachers’ skills, strengthening school leadership and improving institutional systems to support effective, accountable and sustainable education delivery.',sdgs:[4,8,16]},
  {id:'inclusive-education',title:'Inclusive Education and Community Engagement',image:'inclusive-education.jpg',alt:'A student using a wheelchair alongside an adult at a school event',text:'Engaging families and communities to reduce barriers to education, promote inclusion and strengthen local ownership of children’s learning and wellbeing.',sdgs:[4,5,10,17]},
];
