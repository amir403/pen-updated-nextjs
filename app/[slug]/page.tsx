import {Site} from '@/components/pen-site';
import {getSiteContent} from '@/lib/cms';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {pageMeta,articles}=await getSiteContent();return {title:pageMeta[slug]?.[0]||articles.find(a=>a.slug===slug)?.title||'Page not found'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const content=await getSiteContent();if(!content.pageMeta[slug]&&!content.articles.some(a=>a.slug===slug))notFound();return <Site page={slug} content={content}/>}
