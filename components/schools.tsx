'use client';

import {useRef, useState} from 'react';
import {ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Search, School, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import data from '@/lib/source-data.json';

const pageSize=12;
const districts=Array.from(new Set(data.schools.map(s=>s.district))).sort();
const formatNumber=(value:number)=>value.toLocaleString('en-US');
const normalize=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

export function Schools(){
  const [query,setQuery]=useState('');
  const [district,setDistrict]=useState('all');
  const [sort,setSort]=useState('published');
  const [page,setPage]=useState(1);
  const results=useRef<HTMLHeadingElement>(null);
  const search=useRef<HTMLInputElement>(null);
  const words=normalize(query).split(' ').filter(Boolean);
  const filtered=data.schools.filter(s=>(district==='all'||s.district===district)&&words.every(word=>normalize(s.name+' '+s.district).includes(word)));
  if(sort==='name')filtered.sort((a,b)=>a.name.localeCompare(b.name,'en'));
  if(sort==='enrollment')filtered.sort((a,b)=>b.enrollment-a.enrollment||a.name.localeCompare(b.name,'en'));
  const pageCount=Math.ceil(filtered.length/pageSize);
  const active=query!==''||district!=='all'||sort!=='published';
  const reset=()=>{setQuery('');setDistrict('all');setSort('published');setPage(1)};
  const changePage=(next:number)=>{setPage(next);requestAnimationFrame(()=>{results.current?.focus({preventScroll:true});results.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})})};
  return <section className="section container schools-directory">
    <div className="schools-intro"><div><p className="eyebrow"><span/>FIND A PEN-SUPPORTED SCHOOL</p><h2>Real schools.<br/>Everyday possibilities.</h2><p>Find a school by name or area, explore published enrolment details and open its available map location.</p></div><div className="schools-directory-facts"><div><strong>{data.schools.length}</strong><span>School records</span></div><div><strong>{districts.length}</strong><span>District / area listings</span></div></div></div>
    <div className="schools-filters" role="search" aria-label="School directory">
      <div className="schools-query"><label htmlFor="schools-query">School name or district</label><div className="search-field"><Search size={18} aria-hidden="true"/><Input ref={search} id="schools-query" placeholder="e.g. Lahore or Makhdoomabad" value={query} onChange={event=>{setQuery(event.target.value);setPage(1)}}/>{query&&<button type="button" onClick={()=>{setQuery('');setPage(1);search.current?.focus()}} aria-label="Clear school search"><X size={17}/></button>}</div></div>
      <div><label htmlFor="schools-district">District / area</label><select id="schools-district" value={district} onChange={event=>{setDistrict(event.target.value);setPage(1)}}><option value="all">All districts / areas</option>{districts.map(d=><option key={d} value={d}>{d} ({data.schools.filter(s=>s.district===d).length})</option>)}</select></div>
      <div><label htmlFor="schools-sort">Sort results</label><select id="schools-sort" value={sort} onChange={event=>{setSort(event.target.value);setPage(1)}}><option value="published">Directory order</option><option value="name">School name: A–Z</option><option value="enrollment">Enrolment: highest first</option></select></div>
      <Button variant="outline" disabled={!active} onClick={reset}>Reset filters</Button>
    </div>
    <div className="schools-results-row"><h2 ref={results} tabIndex={-1} className="schools-results-heading" aria-live="polite" aria-atomic="true">{filtered.length===0?'No schools found':`${formatNumber(filtered.length)} ${filtered.length===1?'school':'schools'} found`}<span>{filtered.length>0?`Showing ${(page-1)*pageSize+1}–${Math.min(page*pageSize,filtered.length)}`:'Try a broader search or clear your filters.'}</span></h2><span className="schools-published-label">Published school directory</span></div>
    <div className="school-grid">{filtered.slice((page-1)*pageSize,page*pageSize).map((s,index)=><article className="school-card" key={s.name+s.district+index}><span className="district-label"><MapPin size={13} aria-hidden="true"/>{s.district}</span><School className="school-watermark" aria-hidden="true"/><h3>{s.name}</h3><dl className="school-numbers"><div><dd>{formatNumber(s.enrollment)}</dd><dt>Enrolled students</dt></div><div><dd>{formatNumber(s.boys)}</dd><dt>Boys</dt></div><div><dd>{formatNumber(s.girls)}</dd><dt>Girls</dt></div></dl><div className="school-card-location">{s.map?<a href={s.map} target="_blank" rel="noreferrer" className="text-link" aria-label={`View location of ${s.name} in ${s.district} (opens in a new tab)`}>View location<ArrowUpRight size={15} aria-hidden="true"/></a>:<span>Map location not listed</span>}</div></article>)}</div>
    {filtered.length===0&&<div className="empty-state schools-empty"><Search size={30} aria-hidden="true"/><h3>Let’s try another search.</h3><p>Check the spelling, use a shorter school name or choose another district.</p><Button variant="outline" onClick={()=>{reset();search.current?.focus()}}>Show all schools</Button></div>}
    {pageCount>1&&<nav className="pagination schools-pagination" aria-label="School results pages"><Button variant="outline" disabled={page===1} onClick={()=>changePage(page-1)}><ChevronLeft size={16} aria-hidden="true"/>Previous</Button><span aria-live="polite">Page {page} of {pageCount}</span><Button variant="outline" disabled={page===pageCount} onClick={()=>changePage(page+1)}>Next<ChevronRight size={16} aria-hidden="true"/></Button></nav>}
    <p className="source-note schools-source">These {data.schools.length} individual records come from <a href="https://pen.org.pk/explore-our-schools/" target="_blank" rel="noreferrer">PEN’s published school directory</a>. Enrolment figures may change. District / area labels follow the source; this directory does not list every school included in PEN’s homepage total.</p>
  </section>;
}
