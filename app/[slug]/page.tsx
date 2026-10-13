import {Site} from '@/components/pen-site';
import {pageMeta,articles} from '@/lib/content';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:pageMeta[slug]?.[0]||articles.find(a=>a.slug===slug)?.title||'Page not found'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!pageMeta[slug]&&!articles.some(a=>a.slug===slug))notFound();return <Site page={slug}/>}
