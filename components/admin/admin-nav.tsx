'use client';
import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

type Section={label:string;links:{href:string;label:string;badge?:number}[]};

export function AdminNav({sections}:{sections:Section[]}){
 const pathname=usePathname();
 const [open,setOpen]=useState(false);
 const [openedAt,setOpenedAt]=useState(pathname);
 // Close the mobile menu after navigating.
 if(openedAt!==pathname){setOpenedAt(pathname);setOpen(false)}
 const link=(href:string,label:string,badge?:number)=>{const current=href==='/admin'?pathname==='/admin':pathname===href||pathname.startsWith(href+'/');return <Link key={href} href={href} aria-current={current?'page':undefined}>{label}{badge?<span className="admin-badge" aria-label={badge+' new'}>{badge}</span>:null}</Link>};
 return <>
  <button type="button" className="admin-menu-toggle" aria-expanded={open} aria-controls="admin-nav" onClick={()=>setOpen(!open)}>{open?'Close menu':'Menu'}</button>
  <nav id="admin-nav" className={'admin-nav'+(open?' open':'')} aria-label="Admin sections">
   {link('/admin','Dashboard')}
   {sections.map(section=><div className="admin-nav-section" key={section.label}><p>{section.label}</p>{section.links.map(l=>link(l.href,l.label,l.badge))}</div>)}
  </nav>
 </>;
}
