import {articles,faqs,founders,pageMeta,socialMedia,type Article} from '@/lib/content';
import data from '@/lib/source-data.json';
import {contactDetails,offices,siteOptions,type ContactDetails,type Office,type SiteOptions} from '@/lib/site-settings';

export type School={name:string;district:string;enrollment:number;boys:number;girls:number;map:string};
export type ResourceDoc={title:string;url:string;image:string};
export const resourceTypes=['publications','pen-activity-books','corporate-information'] as const;
export type ResourceType=typeof resourceTypes[number];
export type TeamMember={name:string;role:string;image:string};
export type SocialLink={label:string;href:string|null};

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
};
