export const images = {
 hero:'/images/IMG_4626.jpg', classroom:'/images/IMG_4631.jpg', school:'/images/modelschoolpic1-ezgif.com-resize-1.jpg', training:'/images/training-img.jpg', academy:'/images/IMG_958330-1-scaled.jpg', nfe:'/images/Non-Formal-Education-min-scaled.jpg', school2:'/images/IMG_4701-1-min-scaled.jpg', scholarship:'/images/IMG_3496.jpg', logo:'/images/pen-logo-simple.png'
};
export const nav = [
 {label:'About us',items:[['Our story','/about-us'],['CEO message','/ceo-message'],['Founders & directors','/founders'],['Our values','/core-values'],['Corporate information','/corporate-information'],['Our supporters','/our-donors-supporters'],['FAQs','/faq']]},
 {label:'Our work',items:[['Our education models','/our-work'],['Our schools','/explore-our-schools'],['PEN Academy','/pen-academy'],['Teacher development','/teacher-training'],['Academics','/academics'],['Scholarships','/scholarships']]},
 {label:'Get involved',items:[['Ways to give','/donate-now'],['Volunteer with us','/volunteer'],['Contact us','/contact-us']]},
 {label:'News & stories',items:[['Latest news','/news'],['PEN heroes','/stories'],['Our blog','/pen-blogs'],['Photo gallery','/photo-gallery']]},
 {label:'Resources',items:[['Activity books','/pen-activity-books']]}
];
export const models = [
 {id:'peima',title:'PEIMA model',tag:'PUBLIC–PRIVATE PARTNERSHIP',image:images.school,text:'Managing partner schools, strengthening teaching, and improving facilities through a partnership with Punjab Education Initiatives Management Authority.'},
 {id:'pen',title:'PEN model',tag:'STRONGER PUBLIC SCHOOLS',image:images.school2,text:'Supporting government-managed schools with resources and better learning environments.'},
 {id:'non-formal',title:'Non-formal education',tag:'A SECOND CHANCE TO LEARN',image:images.nfe,text:'Flexible schooling helps working and out-of-school children return to learning.'}
];
export const programmes = [
 {title:'PEN Academy',text:'Free digital lessons and learning resources.',image:images.academy,href:'/pen-academy'},
 {title:'Teacher development',text:'Practical training and classroom mentoring.',image:images.training,href:'/teacher-training'},
 {title:'Academic support',text:'Lesson plans, activity books and learning materials.',image:images.classroom,href:'/academics'},
 {title:'100 Scholarship Program',text:'Helping deserving students continue their education.',image:images.scholarship,href:'/scholarships'}
];
export type Article={slug:string;title:string;category:string;date:string;image:string;summary:string;body:string[];source?:string};
export const articles:Article[]=[
 {slug:'ali-garh-model-school-sports-gala-2025',title:'A day of teamwork, talent and possibility',category:'News',date:'15 April 2025',image:'/images/pic-3.Edited-Pic-png-1.png',summary:'Highlights from the Ali Garh Model School Sports Gala 2025.',body:['PEN shared photographic highlights from the Ali Garh Model School Sports Gala 2025. Explore the event through the original photo feature.'],source:'Ali Garh Model School Sports Gala 2025'},
 {slug:'second-annual-health-screening-camp',title:'Healthier children. Stronger communities.',category:'News',date:'14 April 2025',image:'/images/camp.jpg',summary:'PEN and IPAC Foundation brought health screening to the Assu Mehta school community.',body:['The second annual health screening camp took place at Government Girls Primary School, Assu Mehta, in collaboration with IPAC Foundation.','The initiative reached 83 students, staff members and parents. Services included 73 general checkups, 72 dental screenings and 73 eye screenings, supporting early detection and access to care.'],source:'Second Annual Health Screening Camp'},
 {slug:'pakistan-maths-challenge-2024',title:'Young minds rise to the maths challenge',category:'News',date:'21 January 2025',image:'/images/WhatsApp-Image-2025-01-15-at-1.18.50-PM.jpeg',summary:'More than 700 PEN and PEIMA students took part in Pakistan Maths Challenge 2024.',body:['Students from Grades 1–10 tested their problem-solving skills in the Pakistan Maths Challenge, hosted by 3P Learning.','PEN reported 57 gold medals and 173 silver medals. The competition celebrated mathematical confidence and the effort of students and teachers.'],source:'Pakistan Maths Challenge 2024'},
 {slug:'the-next-bapsi-sidhwa',title:'A young writer finds her voice',category:'PEN heroes',date:'Student stories',image:'/images/kk3-1.jpg',summary:'Komal Latif’s prize-winning essay shows what opportunity can unlock.',body:['Komal Latif, a Class VIII student at Government Girls Middle School, Kot Lakhpat, won first prize in an English creative-writing competition with more than 2,000 participants.','Her essay celebrated a hardworking farmer in her neighbourhood. PEN’s academic team helped her return to school after financial pressures interrupted her education. She continued studying while supporting her family, with the ambition of becoming a teacher.'],source:'The next Bapsi Sidhwa'},
 {slug:'against-all-odds',title:'An education that changed Sajid’s path',category:'PEN heroes',date:'Student stories',image:'/images/Sajid-Ali-2.png',summary:'From leaving school to returning with determination and support.',body:['When financial hardship interrupted Sajid Ali’s education, PEN’s academic team worked with his family to bring him back to Government Boys Middle School, Sadhoki.','With sponsorship and encouragement, Sajid returned to the classroom. He won a PEN Urdu essay competition and achieved 91% in his Class VIII exams. PEN’s account records that he later joined Punjab Police as a constable.'],source:'Against all odds'},
 {slug:'the-use-of-social-media-as-a-learning-tool',title:'Social media as a learning tool',category:'Blog',date:'11 October 2024',image:images.academy,summary:'Exploring digital platforms as a place to learn, connect and collaborate.',body:['PEN explores how online platforms can make educational resources easier to access and help learners exchange knowledge.','Used with purpose, video lessons, professional networks and group discussions can complement classroom teaching. The article considers accessibility, collaboration and the changing relationship between technology and education.']},
 {slug:'how-education-can-transform-lives-a-pathway-to-progress',title:'How education can transform lives',category:'Blog',date:'11 September 2024',image:images.classroom,summary:'Why learning is the foundation for independence and opportunity.',body:['Literacy and numeracy help people make informed decisions in daily life. PEN’s article connects these skills with self-reliance, personal development and wider opportunity.','Education also supports critical thinking and participation in communities. Access to good teaching gives children a stronger foundation for the choices ahead.']},
 {slug:'how-education-breaks-the-cycle-of-poverty-insights-from-progressive-education-network-pen',title:'Education and the cycle of poverty',category:'Blog',date:'10 September 2024',image:images.hero,summary:'The connection between access to learning and a more secure future.',body:['PEN examines how education can expand employment opportunities and help families improve their circumstances.','The article highlights the importance of access to quality schooling for children from underserved communities, connecting classroom learning with long-term opportunity.']},
 {slug:'why-donate-to-progressive-education-network',title:'Why support Progressive Education Network?',category:'Blog',date:'6 June 2024',image:images.school,summary:'How support for public schools can help more children learn.',body:['PEN’s approach focuses on improving existing government schools through stronger teaching, school facilities and digital resources.','The article explains the need for community support in schools that face shortages of resources, helping children access free quality education.']}
];
export const founders=[['Omar Khayyam Sheikh','Chairman · CEO, Hadayat & Co.'],['Ahsan Imran Sheikh','CEO, Millat Equipment Ltd.'],['Muhammad Farooq Naseem','Chairman & CEO, DWP Group'],['Nadeem Babar','CEO, Orient Power Company'],['Adnan Asdar Ali','CEO, Multinet Pakistan'],['Dr. Shujaat Nadeem','International & Strategy, The Saudi National Bank'],['Agha Shahid Majeed Khan','Senior Managing Partner, Agha Shahid & Associates'],['Salman Akhtar','Founder & Co-CEO, Techlogix']];
export const faqs=[
 ['What is PEN?','A nonprofit that strengthens public education through school partnerships, resources and teaching support.'],
 ['Why work with government schools?','Existing public schools reach underserved children. PEN focuses on improving teaching and basic facilities.'],
 ['How is progress monitored?','Teams visit schools and review attendance, teaching, facilities and student learning.'],
 ['How does PEN measure impact?','Through enrolment, retention, assessments, teacher development and the provision of school facilities.'],
 ['Who supports PEN?','Founders, individual donors and corporate partners contribute to its work.'],
 ['Can I volunteer?','Yes. Visit the volunteer page for application requirements and the official application form.'],
 ['How can I donate?','Choose a sponsorship option or use PEN’s official donation page for current payment instructions.']
];
export const pageMeta:Record<string,[string,string,string]>={
 'about-us':['Our story','A shared belief. A better future.','Helping children discover what is possible through free, quality education.'],
 'ceo-message':['CEO message','Working together for every child.','A commitment to education, accountability and the potential of our children.'],
 'founders':['Our people','A shared purpose, from the start.','Meet the founders and directors behind Progressive Education Network.'],
 'core-values':['Our values','The principles behind our progress.','Responsibility, strong governance, meaningful impact and transparency.'],
 'corporate-information':['Accountability','Built on trust. Open to you.','Explore PEN’s corporate records and published certificates.'],
 'our-donors-supporters':['Our supporters','Progress is a collective effort.','Thank you to the partners and supporters who help make learning possible.'],
 'faq':['Your questions','Get to know PEN.','Answers about our approach, impact and ways to take part.'],
 'our-work':['Our work','Different pathways. One purpose.','Helping more children access a school environment where they can thrive.'],
 'explore-our-schools':['Our schools','Rooted in communities.','Explore the schools in PEN’s published directory across Pakistan.'],
 'pen-academy':['PEN Academy','Learning without boundaries.','Free digital resources for students, teachers and families.'],
 'teacher-training':['Teacher development','Better teaching. Brighter classrooms.','Supporting educators with practical training and ongoing mentoring.'],
 'academics':['Academics','Make every lesson count.','Learning materials and classroom support for children and their teachers.'],
 'scholarships':['100 Scholarship Program','Keep a promising future in reach.','Supporting deserving students as they continue their studies.'],
 'donate-now':['Give an education','Their tomorrow starts with you.','Help more children learn, grow and build a future of their own.'],
 'volunteer':['Volunteer with PEN','Give your time. Open a world.','Be part of a community that believes in every child’s potential.'],
 'careers':['Careers at PEN','Put your purpose to work.','Bring your skills to the mission of quality education for all.'],
 'job':['Jobs & tenders','Opportunities at PEN.','Browse current job opportunities and tender notices.'],
 'contact-us':['Contact us','Let’s make a difference together.','Reach our team about partnerships, donations and opportunities to get involved.'],
 'news':['News & stories','Small moments. Lasting change.','News, milestones and stories from the PEN community.'],
 'stories':['PEN heroes','Every child has a story.','Meet the young people whose determination inspires our work.'],
 'pen-blogs':['The PEN journal','Ideas that move education forward.','Perspectives on learning, opportunity and a more inclusive future.'],
 'photo-gallery':['Life at PEN','A window into our classrooms.','Learning, discovery and community through the PEN lens.'],
 'publications':['Media','Our work, in words and pictures.','Browse magazines, newsletters, brochures and reports published by PEN.'],
 'pen-activity-books':['Learning resources','A little curiosity goes a long way.','Activity books for early learners, from kindergarten to Class 5.'],
 'privacy-policy':['Privacy','Your information matters.','How this website handles your information.'],
 'terms-of-services':['Terms of use','Using this website.','Information about the website and its linked services.']
};
