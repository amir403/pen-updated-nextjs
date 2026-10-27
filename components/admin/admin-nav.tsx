'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export function AdminNav({links}:{links:{href:string;label:string}[]}){
 const pathname=usePathname();
 return <nav className="admin-nav" aria-label="Admin sections">{links.map(link=>{
  const current=link.href==='/admin'?pathname==='/admin':pathname.startsWith(link.href);
  return <Link key={link.href} href={link.href} aria-current={current?'page':undefined}>{link.label}</Link>;
 })}</nav>;
}
