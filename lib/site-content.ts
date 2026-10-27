import {articles,faqs,founders,pageMeta,socialMedia,type Article} from '@/lib/content';
import data from '@/lib/source-data.json';
import {heroSlides,homepageText,impactStats,type FocusArea,type HeroSlide,type HomepageText,type ImpactStat} from '@/lib/homepage';
import {homepageFocus,thematicAreas,type ThematicArea} from '@/lib/website-outline';
import {crossCuttingThemes,disclosureCategories,existingPartners,publishedImpact,type CrossCuttingTheme,type DisclosureCategory,type ImpactFigure,type Partner} from '@/lib/transparency';
import {educationModels,interventions,ongoingProgrammes,priorities,programmePages,type EducationModel,type Intervention,type OngoingProgramme,type Priority,type ProgrammePage} from '@/lib/programmes';
import {donationBanks,donationSettings,givingEnquiries,sponsorships,type BankAccount,type DonationSettings,type GivingEnquiry,type SponsorshipOption} from '@/lib/donations';
import type {Opportunity} from '@/lib/opportunities';
import {legalSections,type LegalSection} from '@/lib/legal';
import {aboutText,accountabilityLinks,coreValues,journey,purposeCards,type AboutText,type AccountabilityLink,type CoreValue,type JourneyItem,type PurposeCard} from '@/lib/about';
import {contactDetails,offices,siteOptions,type ContactDetails,type Office,type SiteOptions} from '@/lib/site-settings';

export type School={name:string;district:string;enrollment:number;boys:number;girls:number;map:string};
export type ResourceDoc={title:string;url:string;image:string};
export const resourceTypes=['publications','pen-activity-books','corporate-information'] as const;
export type ResourceType=typeof resourceTypes[number];
export type TeamMember={name:string;role:string;image:string};
export type SocialLink={label:string;href:string|null};
export type GalleryPhoto={image:string;caption:string|null};

/** Content managed through the admin panel, in the shapes the site components render. */
export type SiteContent={
 pageMeta:Record<string,[string,string,string]>;
 articles:Article[];
 faqs:[string,string][];
 schools:School[];
 resources:Record<ResourceType,ResourceDoc[]>;
 team:TeamMember[];
 socialMedia:SocialLink[];
 contact:ContactDetails;
 site:SiteOptions;
 offices:Office[];
 heroSlides:HeroSlide[];
 impactStats:ImpactStat[];
 homepageFocus:FocusArea[];
 homepage:HomepageText;
 partners:Partner[];
 gallery:GalleryPhoto[];
 purposeCards:PurposeCard[];
 journey:JourneyItem[];
 coreValues:CoreValue[];
 accountabilityLinks:AccountabilityLink[];
 about:AboutText;
 educationModels:EducationModel[];
 interventions:Intervention[];
 programmePages:ProgrammePage[];
 ongoingProgrammes:OngoingProgramme[];
 priorities:Priority[];
 thematicAreas:ThematicArea[];
 crossCuttingThemes:CrossCuttingTheme[];
 donations:DonationSettings;
 sponsorships:SponsorshipOption[];
 bankAccounts:BankAccount[];
 givingEnquiries:GivingEnquiry[];
 publishedImpact:ImpactFigure[];
 disclosureCategories:DisclosureCategory[];
 opportunities:Opportunity[];
 legalSections:LegalSection[];
};

/** Content bundled with the site; used when the Laravel API is not configured or unreachable. */
export const staticSiteContent:SiteContent={
 pageMeta,
 articles:articles.map(a=>({...a,sourceUrl:'https://pen.org.pk/'+a.slug+'/'})),
 faqs:faqs as [string,string][],
 schools:data.schools,
 resources:data.resources,
 team:founders.map(([name,role],i)=>({name,role,image:data.founderImages[i]})),
 socialMedia,
 contact:contactDetails,
 site:siteOptions,
 offices,
 heroSlides,
 impactStats,
 homepageFocus:homepageFocus.map(f=>({anchor:f.id,title:f.title,image:'/images/website-outline/'+f.image,alt:f.alt,text:f.text,featured:f.featured??null,sdgs:f.sdgs})),
 homepage:homepageText,
 partners:existingPartners,
 gallery:data.gallery.map(image=>({image,caption:null})),
 purposeCards,
 journey,
 coreValues,
 accountabilityLinks,
 about:aboutText,
 educationModels,
 interventions,
 programmePages,
 ongoingProgrammes,
 priorities,
 thematicAreas:thematicAreas.map(a=>({anchor:a.id,title:a.title,summary:a.summary,points:a.points,link_href:a.href,link_label:a.linkText})),
 crossCuttingThemes:crossCuttingThemes.map(c=>({anchor:c.id,title:c.title,text:c.text,link_href:c.href,link_label:c.label})),
 donations:donationSettings,
 sponsorships,
 bankAccounts:donationBanks,
 givingEnquiries,
 publishedImpact,
 disclosureCategories,
 opportunities:[],
 legalSections,
};
