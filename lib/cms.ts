import {cache} from 'react';
import {resourceTypes,staticSiteContent,type GalleryPhoto,type ResourceDoc,type ResourceType,type SiteContent} from '@/lib/site-content';
import type {Office} from '@/lib/site-settings';
import type {FocusArea,HeroSlide,ImpactStat} from '@/lib/homepage';
import type {CrossCuttingTheme,DisclosureCategory,ImpactFigure,Partner} from '@/lib/transparency';
import type {ThematicArea} from '@/lib/website-outline';
import type {Opportunity} from '@/lib/opportunities';
import type {LegalSection} from '@/lib/legal';
import type {FooterColumn,NavMenuGroup} from '@/lib/navigation';
import type {BankAccount,GivingEnquiry,SponsorshipOption} from '@/lib/donations';
import type {EducationModel,Intervention,OngoingProgramme,Priority,ProgrammePage} from '@/lib/programmes';
import type {AccountabilityLink,CoreValue,JourneyItem,PurposeCard} from '@/lib/about';

/** Base URL of the Laravel API, e.g. https://api.example.org (without /api). */
export const apiUrl=process.env.PEN_API_URL?.replace(/\/+$/,'');

type ApiContent={
 pages:{slug:string;title:string;heading:string;intro:string}[];
 articles:{slug:string;title:string;category:string;date_label:string;image:string;summary:string;body:string[];source:string|null;source_url:string|null}[];
 faqs:{question:string;answer:string}[];
 schools:{name:string;district:string;enrollment:number|null;boys:number|null;girls:number|null;map:string|null}[];
 resources:{type:string;title:string;url:string;image:string|null}[];
 team:{name:string;role:string;image:string|null}[];
 settings:{social_media?:{label:string;href:string|null}[]}&Record<string,unknown>;
 collections?:Record<string,Record<string,unknown>[]>;
};

/** A collection from the API, or the bundled fallback when the API predates it. */
export function fromCollection<T>(api:ApiContent,name:string,fallback:T[],map:(item:Record<string,unknown>)=>T=item=>item as T):T[]{
 const items=api.collections?.[name];
 return items?items.map(map):fallback;
}

/** A settings record from the API merged over the bundled fallback, so new fields keep a value. */
export function fromSetting<T extends object>(api:ApiContent,key:string,fallback:T):T{
 const value=api.settings[key];
 return value&&typeof value==='object'&&!Array.isArray(value)?{...fallback,...value}:fallback;
}

function fromApi(api:ApiContent):SiteContent{
 const resources=Object.fromEntries(resourceTypes.map(type=>[type,[] as ResourceDoc[]])) as Record<ResourceType,ResourceDoc[]>;
 for(const r of api.resources)if(r.type in resources)resources[r.type as ResourceType].push({title:r.title,url:r.url,image:r.image??''});
 return {
  pageMeta:Object.fromEntries(api.pages.map(p=>[p.slug,[p.title,p.heading,p.intro]])),
  articles:api.articles.map(a=>({slug:a.slug,title:a.title,category:a.category,date:a.date_label,image:a.image,summary:a.summary,body:a.body,...(a.source?{source:a.source}:{}),...(a.source_url?{sourceUrl:a.source_url}:{})})),
  faqs:api.faqs.map(f=>[f.question,f.answer]),
  schools:api.schools.map(s=>({name:s.name,district:s.district,enrollment:s.enrollment??0,boys:s.boys??0,girls:s.girls??0,map:s.map??''})),
  resources,
  team:api.team.map(t=>({name:t.name,role:t.role,image:t.image??''})),
  socialMedia:api.settings.social_media??staticSiteContent.socialMedia,
  contact:fromSetting(api,'contact',staticSiteContent.contact),
  site:fromSetting(api,'site',staticSiteContent.site),
  offices:fromCollection(api,'offices',staticSiteContent.offices,item=>item as Office),
  heroSlides:fromCollection(api,'hero_slides',staticSiteContent.heroSlides,item=>item as HeroSlide),
  impactStats:fromCollection(api,'impact_stats',staticSiteContent.impactStats,item=>({...item,value:Number(item.value)}) as ImpactStat),
  // SDG numbers typed in the admin panel arrive as strings.
  homepageFocus:fromCollection(api,'homepage_focus',staticSiteContent.homepageFocus,item=>({...item,sdgs:(item.sdgs as unknown[]).map(Number)}) as FocusArea),
  homepage:fromSetting(api,'homepage',staticSiteContent.homepage),
  partners:fromCollection(api,'partners',staticSiteContent.partners,item=>item as Partner),
  gallery:fromCollection(api,'gallery',staticSiteContent.gallery,item=>item as GalleryPhoto),
  purposeCards:fromCollection(api,'purpose_cards',staticSiteContent.purposeCards,item=>item as PurposeCard),
  journey:fromCollection(api,'journey',staticSiteContent.journey,item=>item as JourneyItem),
  coreValues:fromCollection(api,'core_values',staticSiteContent.coreValues,item=>item as CoreValue),
  accountabilityLinks:fromCollection(api,'accountability_links',staticSiteContent.accountabilityLinks,item=>item as AccountabilityLink),
  about:fromSetting(api,'about',staticSiteContent.about),
  educationModels:fromCollection(api,'education_models',staticSiteContent.educationModels,item=>item as EducationModel),
  interventions:fromCollection(api,'interventions',staticSiteContent.interventions,item=>item as Intervention),
  programmePages:fromCollection(api,'programme_pages',staticSiteContent.programmePages,item=>item as ProgrammePage),
  ongoingProgrammes:fromCollection(api,'ongoing_programmes',staticSiteContent.ongoingProgrammes,item=>item as OngoingProgramme),
  priorities:fromCollection(api,'upcoming_priorities',staticSiteContent.priorities,item=>item as Priority),
  thematicAreas:fromCollection(api,'thematic_areas',staticSiteContent.thematicAreas,item=>item as ThematicArea),
  crossCuttingThemes:fromCollection(api,'cross_cutting_themes',staticSiteContent.crossCuttingThemes,item=>item as CrossCuttingTheme),
  donations:(settings=>({...settings,child_amount:Number(settings.child_amount),max_children:Number(settings.max_children)}))(fromSetting(api,'donations',staticSiteContent.donations)),
  sponsorships:fromCollection(api,'sponsorship_options',staticSiteContent.sponsorships,item=>({...item,amount:Number(item.amount)}) as SponsorshipOption),
  bankAccounts:fromCollection(api,'bank_accounts',staticSiteContent.bankAccounts,item=>item as BankAccount),
  givingEnquiries:fromCollection(api,'giving_enquiries',staticSiteContent.givingEnquiries,item=>item as GivingEnquiry),
  publishedImpact:fromCollection(api,'published_impact',staticSiteContent.publishedImpact,item=>item as ImpactFigure),
  disclosureCategories:fromCollection(api,'disclosure_categories',staticSiteContent.disclosureCategories,item=>item as DisclosureCategory),
  navMenu:fromCollection(api,'nav_menu',staticSiteContent.navMenu,item=>({...item,mega:Boolean(item.mega)}) as NavMenuGroup),
  formsEnabled:true,
  footerColumns:fromCollection(api,'footer_columns',staticSiteContent.footerColumns,item=>item as FooterColumn),
  legalSections:fromCollection(api,'legal_sections',staticSiteContent.legalSections,item=>item as LegalSection),
  opportunities:fromCollection(api,'opportunities',staticSiteContent.opportunities,item=>({...item,is_open:Boolean(item.is_open)}) as Opportunity),
 };
}

/**
 * Site content from the Laravel API, cached for a minute and refreshed immediately
 * when the admin panel saves. Falls back to the bundled content so the public site
 * keeps working without the API.
 */
export const getSiteContent=cache(async():Promise<SiteContent>=>{
 if(!apiUrl)return staticSiteContent;
 try{
  const response=await fetch(apiUrl+'/api/content',{headers:{Accept:'application/json'},next:{revalidate:60,tags:['site-content']}});
  if(!response.ok)throw new Error('HTTP '+response.status);
  return fromApi(await response.json() as ApiContent);
 }catch(error){
  console.error('Falling back to bundled site content:',error);
  return staticSiteContent;
 }
});
