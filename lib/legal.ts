// Privacy and terms sections as published on this website. The admin panel can override them;
// these values are the fallback and the database seed. "{email}" in text becomes the contact email link.
export type LegalSection={page:string;heading:string;text:string[];link_label:string|null;link_href:string|null};

export const legalPages=['privacy-policy','terms-of-services'] as const;

export const legalSections:LegalSection[]=[
 {page:'privacy-policy',heading:'Information you choose to share',text:['The contact and volunteer forms send the details you enter, and any documents you attach, to PEN’s team through this website. Volunteer documents are kept in private storage that only signed-in PEN administrators can open. If the contact form cannot be sent, it offers to prepare an email draft instead.','To ask about or remove information you have sent, contact {email}.'],link_label:null,link_href:null},
 {page:'privacy-policy',heading:'Applications and donations',text:['Donation and careers links take you to PEN’s official website. Its privacy practices apply to information you submit there. This website does not collect payment information.'],link_label:null,link_href:null},
 {page:'privacy-policy',heading:'External content',text:['The documentary loads from YouTube when you choose to watch it. External websites, maps and learning resources operate under their own privacy policies.'],link_label:null,link_href:null},
 {page:'privacy-policy',heading:'Questions',text:['Contact {email} for questions about information shared with PEN.'],link_label:null,link_href:null},
 {page:'terms-of-services',heading:'Website information',text:['This website presents information and resources from Progressive Education Network’s published website. School figures, sponsorship amounts and organisational information may change.'],link_label:null,link_href:null},
 {page:'terms-of-services',heading:'Linked services',text:['Applications and donations are completed through PEN’s official channels. Confirm current requirements and payment instructions with PEN before submitting documents or making a contribution.'],link_label:null,link_href:null},
 {page:'terms-of-services',heading:'Content and resources',text:['Photographs and educational resources remain the property of their respective owners. Please contact PEN about reuse or permission.'],link_label:'Read PEN’s official terms',link_href:'https://pen.org.pk/terms-of-services/'},
];
