'use client';
import {useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,BookOpen,FileText,Search,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import data from '@/lib/source-data.json';

type ResourcePageKey=keyof typeof data.resources;
const categories=[{key:'publications',label:'Publications',intro:'Reports, magazines and updates from the PEN community.'},{key:'pen-activity-books',label:'Activity books',intro:'Classroom learning materials for kindergarten through Class 5.'},{key:'corporate-information',label:'Corporate information',intro:'Published organisational records and documents.'}] as const;
const gradeOf=(title:string)=>title.match(/class[-\s]*(KG|[1-5])/i)?.[1].toUpperCase()||'';
const subjectOf=(title:string)=>title.replace(/\s*class[-\s]*(KG|[1-5])/i,'').trim().replace(/^Social Study$/i,'Social Studies');
const typeOf=(title:string)=>/newsletter/i.test(title)?'Newsletters':/magazine/i.test(title)?'Magazines':/brochure/i.test(title)?'Brochures':'Reports';

export function Resources({page}:{page:ResourcePageKey}){
  const [query,setQuery]=useState('');const [grade,setGrade]=useState('all');const [kind,setKind]=useState('all');
  const input=useRef<HTMLInputElement>(null);const books=page==='pen-activity-books';const docs=data.resources[page];
  const subjects=Array.from(new Set(data.resources['pen-activity-books'].map(r=>subjectOf(r.title)))).sort();
  const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered=docs.filter(r=>words.every(word=>r.title.toLowerCase().includes(word))&&(grade==='all'||gradeOf(r.title)===grade)&&(kind==='all'||(books?subjectOf(r.title):typeOf(r.title))===kind));
  const reset=()=>{setQuery('');setGrade('all');setKind('all')};
  const info=categories.find(c=>c.key===page)!;
  return <section className="section container resource-directory">
    <nav className="resource-categories" aria-label="Resource categories">{categories.map(category=><Link href={'/'+category.key} key={category.key} aria-current={page===category.key?'page':undefined}><span>{category.label}</span><strong>{data.resources[category.key].length}</strong></Link>)}</nav>
    <div className="resource-intro"><p className="eyebrow"><span/>EXPLORE PEN RESOURCES</p><h2>{books?'Make room for learning.':page==='publications'?'Explore the work. Read the stories.':'Information, shared openly.'}</h2><p>{info.intro} Documents open as PDFs on PEN’s official website in a new tab.</p></div>
    <div className="resource-filters" role="search" aria-label="Resource directory"><div className="resource-query"><label htmlFor="resource-query">Search documents</label><div><Search size={17} aria-hidden="true"/><Input ref={input} id="resource-query" placeholder="Search by document title" value={query} onChange={event=>setQuery(event.target.value)}/>{query&&<button type="button" aria-label="Clear document search" onClick={()=>{setQuery('');input.current?.focus()}}><X size={17}/></button>}</div></div>
      {books&&<div><label htmlFor="resource-grade">Class</label><select id="resource-grade" value={grade} onChange={event=>setGrade(event.target.value)}><option value="all">All classes</option>{['KG','1','2','3','4','5'].map(g=><option key={g} value={g}>{g==='KG'?'Kindergarten':'Class '+g}</option>)}</select></div>}
      {page!=='corporate-information'&&<div><label htmlFor="resource-kind">{books?'Subject':'Publication type'}</label><select id="resource-kind" value={kind} onChange={event=>setKind(event.target.value)}><option value="all">{books?'All subjects':'All types'}</option>{(books?subjects:['Brochures','Magazines','Newsletters','Reports']).map(value=><option key={value}>{value}</option>)}</select></div>}
      <Button variant="outline" disabled={!query&&grade==='all'&&kind==='all'} onClick={reset}>Reset filters</Button>
    </div>
    <p className="resource-results" role="status">{filtered.length} of {docs.length} {filtered.length===1?'document':'documents'} shown</p>
    <div className="resource-grid">{filtered.map((resource,index)=><a href={resource.url} key={resource.url} className="resource-card" target="_blank" rel="noreferrer" aria-label={`Open ${resource.title} PDF (opens in a new tab)`}><div className={'resource-cover resource-tone-'+index%3}>{resource.image?<img src={resource.image} alt="" loading="lazy"/>:<FileText size={60} aria-hidden="true"/>}<span>PDF</span></div><div className="resource-info"><span className="small-label">{books?`${gradeOf(resource.title)==='KG'?'KG':'CLASS '+gradeOf(resource.title)} · ${subjectOf(resource.title)}`:page==='publications'?typeOf(resource.title):'CORPORATE DOCUMENT'}</span><h3>{resource.title}</h3><span className="text-link">Open PDF<ArrowUpRight size={17} aria-hidden="true"/></span></div></a>)}</div>
    {filtered.length===0&&<div className="empty-state"><BookOpen size={30} aria-hidden="true"/><h3>No documents match your filters.</h3><p>Try a shorter title or choose another class, subject or type.</p><Button variant="outline" onClick={()=>{reset();input.current?.focus()}}>Show all documents</Button></div>}
    <p className="source-note resource-source">Documents are linked from <a href={'https://pen.org.pk/'+page+'/'} target="_blank" rel="noreferrer">PEN’s published {info.label.toLowerCase()} page</a>. Titles and dates reflect the source collection; publication does not confirm that a certificate or exemption is currently valid. Files are hosted by PEN.</p>
  </section>;
}
