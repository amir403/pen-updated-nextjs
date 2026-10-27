'use client';
import {SiteCard} from '@/components/site-card';
import {CardContent} from '@/components/ui/card';

import {useRef, useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, ChevronLeft, ChevronRight, ImageIcon, Search, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {type Article} from '@/lib/content';
import {useSiteContent} from '@/components/site-content-provider';
import data from '@/lib/source-data.json';

export function ArticleCard({article}:{article:Article}){return <SiteCard asChild interactive><Link href={'/'+article.slug} className="article-card"><div className="article-image"><img src={article.image} alt={article.source||article.title} loading="lazy"/><span className="round-arrow"><ArrowUpRight size={19} aria-hidden="true"/></span></div><CardContent className="news-card-content"><div className="article-meta"><span>{article.category==='PEN heroes'?'PEN Heroes':article.category}</span><span>{article.date}</span></div><h3>{article.title}</h3><p>{article.summary}</p><span className="text-link media-read-link">Read story<ArrowUpRight size={16} aria-hidden="true"/></span></CardContent></Link></SiteCard>}

export function News({page}:{page:string}){
  const {articles}=useSiteContent();
  const initial=page==='stories'?'PEN heroes':page==='pen-blogs'?'Blog':'All';
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState(initial);
  const input=useRef<HTMLInputElement>(null);
  const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered=articles.filter(a=>(category==='All'||a.category===category)&&words.every(word=>(a.title+' '+a.summary+' '+(a.source||'')).toLowerCase().includes(word)));
  const reset=()=>{setQuery('');setCategory(initial)};
  return <section className="section container media-directory">
    <div className="media-intro"><div><p className="eyebrow"><span/>NEWS & MEDIA</p><h2>{page==='stories'?'Every child has a story.':page==='pen-blogs'?'Ideas that move education forward.':'Life, learning and progress at PEN.'}</h2><p>{page==='stories'?'Meet students whose determination shines through the opportunities around them.':page==='pen-blogs'?'Explore perspectives on learning, opportunity and the role of education in everyday life.':'Explore school updates, student journeys and perspectives from the PEN community.'}</p></div><Link href="/photo-gallery" className="text-link">Explore our photo gallery<ArrowUpRight size={17}/></Link></div>
    <div className="media-tools"><div className="filter-pills" role="group" aria-label="Story categories">{(page==='news'?['All','News','PEN heroes','Blog']:[initial]).map(item=><button key={item} type="button" aria-pressed={category===item} className={category===item?'selected':''} onClick={()=>setCategory(item)}>{item==='PEN heroes'?'PEN Heroes':item}<span>{articles.filter(a=>item==='All'||a.category===item).length}</span></button>)}</div><div className="media-search"><label htmlFor="media-search">Search {page==='pen-blogs'?'the blog':'stories'}</label><div><Search size={17} aria-hidden="true"/><Input ref={input} id="media-search" placeholder="Search titles and summaries" value={query} onChange={event=>setQuery(event.target.value)}/>{query&&<button type="button" aria-label="Clear story search" onClick={()=>{setQuery('');input.current?.focus()}}><X size={17}/></button>}</div></div></div>
    <div className="media-results"><p role="status">{filtered.length} {filtered.length===1?'story':'stories'} found{category!=='All'?` · ${category==='PEN heroes'?'PEN Heroes':category}`:''}</p>{(query||category!==initial)&&<button type="button" onClick={reset}>Reset filters</button>}</div>
    <div className="article-grid">{filtered.map(article=><ArticleCard key={article.slug} article={article}/>)}</div>
    {filtered.length===0&&<div className="empty-state"><Search size={30} aria-hidden="true"/><h3>No stories match your search.</h3><p>Try fewer words or explore another category.</p><Button variant="outline" onClick={()=>{reset();input.current?.focus()}}>Show stories</Button></div>}
    <nav className="media-explore" aria-label="Explore News and Media">{[['All news & stories','/news'],['PEN Heroes','/stories'],['From our blog','/pen-blogs'],['Photo gallery','/photo-gallery']].map(([label,href])=><Link key={href} href={href} aria-current={href==='/'+page?'page':undefined}>{label}<ArrowUpRight size={16}/></Link>)}</nav>
  </section>;
}

export function Gallery(){
  const [selected,setSelected]=useState<number|null>(null);
  const opener=useRef<HTMLButtonElement|null>(null);
  const move=(direction:number)=>setSelected(current=>current===null?null:(current+direction+data.gallery.length)%data.gallery.length);
  return <section className="section container media-gallery"><div className="media-intro"><div><p className="eyebrow"><span/>LIFE AT PEN</p><h2>A closer look at our community.</h2><p>Explore {data.gallery.length} photographs from PEN’s published gallery. Select a photo to view it in full.</p></div><Link href="/news" className="text-link">Read our stories<ArrowUpRight size={17}/></Link></div><div className="gallery-grid">{data.gallery.map((image,index)=><button type="button" key={image} className="gallery-photo" onClick={event=>{opener.current=event.currentTarget;setSelected(index)}} aria-label={`Open PEN gallery photo ${index+1}`}><img src={image} alt={`PEN learning and community gallery, photo ${index+1}`} loading="lazy"/><span><ImageIcon size={18} aria-hidden="true"/>View photo {index+1}</span></button>)}</div><Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null)}}><DialogContent className="gallery-dialog media-gallery-dialog" onCloseAutoFocus={event=>{event.preventDefault();opener.current?.focus()}} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}if(event.key==='ArrowRight'){event.preventDefault();move(1)}}}><DialogHeader><DialogTitle>Life at PEN</DialogTitle><DialogDescription>Use Previous / Next or the arrow keys to explore. Press Escape to close.</DialogDescription></DialogHeader>{selected!==null&&<><div className="media-gallery-image"><img src={data.gallery[selected]} alt={`PEN gallery photo ${selected+1}`}/></div><div className="gallery-nav"><Button variant="outline" onClick={()=>move(-1)}><ChevronLeft size={16} aria-hidden="true"/>Previous</Button><span role="status">Photo {selected+1} of {data.gallery.length}</span><Button variant="outline" onClick={()=>move(1)}>Next<ChevronRight size={16} aria-hidden="true"/></Button></div></>}</DialogContent></Dialog></section>;
}
