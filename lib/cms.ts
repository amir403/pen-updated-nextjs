import {cache} from 'react';
import {resourceTypes,staticSiteContent,type ResourceDoc,type ResourceType,type SiteContent} from '@/lib/site-content';

/** Base URL of the Laravel API, e.g. https://api.example.org (without /api). */
export const apiUrl=process.env.PEN_API_URL?.replace(/\/+$/,'');

type ApiContent={
 pages:{slug:string;title:string;heading:string;intro:string}[];
 articles:{slug:string;title:string;category:string;date_label:string;image:string;summary:string;body:string[];source:string|null;source_url:string|null}[];
 faqs:{question:string;answer:string}[];
 schools:{name:string;district:string;enrollment:number|null;boys:number|null;girls:number|null;map:string|null}[];
 resources:{type:string;title:string;url:string;image:string|null}[];
 team:{name:string;role:string;image:string|null}[];
 settings:{social_media?:{label:string;href:string|null}[]};
};

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
