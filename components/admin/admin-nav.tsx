'use client';
import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ChevronDown} from 'lucide-react';

type Section={label:string;links:{href:string;label:string;badge?:number}[]};

const isCurrent=(pathname:string,href:string)=>href==='/admin'?pathname==='/admin':pathname===href||pathname.startsWith(href+'/');
const sectionOf=(sections:Section[],pathname:string)=>sections.find(section=>section.links.some(l=>isCurrent(pathname,l.href)))?.label;

/** Sidebar with collapsible groups; the group holding the current page opens by itself. */
export function AdminNav({sections}:{sections:Section[]}){
 const pathname=usePathname();
 const [open,setOpen]=useState(false);
 const [expanded,setExpanded]=useState<string[]>(()=>{const current=sectionOf(sections,pathname);return current?[current]:[]});
 const [openedAt,setOpenedAt]=useState(pathname);
 // After navigating: close the mobile menu and show only the new page's group, so the list stays short.
 if(openedAt!==pathname){
  setOpenedAt(pathname);setOpen(false);
  const current=sectionOf(sections,pathname);
  if(current)setExpanded([current]);
 }
 const toggle=(label:string)=>setExpanded(expanded.includes(label)?expanded.filter(l=>l!==label):[...expanded,label]);
 const link=(href:string,label:string,badge?:number)=><Link key={href} href={href} aria-current={isCurrent(pathname,href)?'page':undefined}>{label}{badge?<span className="admin-badge" aria-label={badge+' new'}>{badge}</span>:null}</Link>;
 return <>
  <button type="button" className="admin-menu-toggle" aria-expanded={open} aria-controls="admin-nav" onClick={()=>setOpen(!open)}>{open?'Close menu':'Menu'}</button>
  <nav id="admin-nav" className={'admin-nav'+(open?' open':'')} aria-label="Admin sections">
   {link('/admin','Dashboard')}
   {sections.map((section,index)=>{
    const isOpen=expanded.includes(section.label);
    const badge=section.links.reduce((sum,l)=>sum+(l.badge??0),0);
    const id='admin-nav-group-'+index;
    return <div className="admin-nav-section" key={section.label}>
     <button type="button" className="admin-nav-heading" aria-expanded={isOpen} aria-controls={id} onClick={()=>toggle(section.label)}>
      <span>{section.label}</span>{!isOpen&&badge>0&&<span className="admin-badge" aria-label={badge+' new'}>{badge}</span>}<ChevronDown size={14} aria-hidden="true"/>
     </button>
     <div id={id} className="admin-nav-links" hidden={!isOpen}>{section.links.map(l=>link(l.href,l.label,l.badge))}</div>
    </div>;
   })}
  </nav>
 </>;
}
