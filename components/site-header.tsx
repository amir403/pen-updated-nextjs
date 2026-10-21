'use client';

import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight, ChevronDown, Heart, Menu, Search} from 'lucide-react';
import {images, nav, pageMeta, articles} from '@/lib/content';
import {thematicAreas} from '@/lib/website-outline';
import {ThemeToggle} from '@/components/theme-toggle';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';

export function Header() {
  const [menu,setMenu] = useState(false);
  const [search,setSearch] = useState(false);
  const [query,setQuery] = useState('');
  const [openGroup,setOpenGroup] = useState<string|null>(null);
  const closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const hoverOpened=useRef(false);
  const cancelClose=()=>{if(closeTimer.current!==null){clearTimeout(closeTimer.current);closeTimer.current=null}};
  const scheduleClose=()=>{cancelClose();closeTimer.current=setTimeout(()=>setOpenGroup(null),220)};
  useEffect(()=>()=>{if(closeTimer.current!==null)clearTimeout(closeTimer.current)},[]);
  const pathname = usePathname();
  const currentGroup = nav.find(group=>group.overview===pathname) ?? nav.find(group=>group.items.some(item=>item.href===pathname));
  const results = [...Object.entries(pageMeta).map(([slug,value])=>({title:value[0],slug})),...thematicAreas.map(area=>({title:area.title,slug:'what-we-do#'+area.id})),...articles.map(article=>({title:article.title,slug:article.slug}))]
    .filter(item=>item.title.toLowerCase().includes(query.trim().toLowerCase()));

  return <>
    <div className="topbar"><div className="container topbar-inner">
      <span>Opening doors through education, since 2005.</span>
      <div><Link href="/pen-academy">PEN Academy<ArrowUpRight size={12} aria-hidden="true"/></Link><Link href="/careers">Careers</Link><Link href="/contact-us">Contact us</Link></div>
    </div></div>
    <header className="header"><div className="container nav-inner">
      <Link href="/" className="brand" aria-label="PEN home"><img src={images.logo} alt="PEN"/></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/" className="nav-link nav-home" data-current={pathname==='/'||undefined} aria-current={pathname==='/'?'page':undefined}>Home</Link>
        {nav.map(group=><DropdownMenu key={group.label} modal={false} open={openGroup===group.label} onOpenChange={open=>{cancelClose();setOpenGroup(open?group.label:null)}}>
          <DropdownMenuTrigger className="nav-link" data-current={currentGroup===group || undefined}
            onPointerEnter={event=>{if(event.pointerType==='mouse'){cancelClose();hoverOpened.current=true;setOpenGroup(group.label)}}}
            onPointerLeave={event=>{if(event.pointerType==='mouse')scheduleClose()}}
            onPointerDownCapture={()=>{hoverOpened.current=false}}
            onKeyDownCapture={()=>{hoverOpened.current=false}}>
            {group.label}<ChevronDown size={12} aria-hidden="true"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={group.mega?'center':'start'} sideOffset={12} collisionPadding={20} aria-label={group.label} className={`nav-dropdown ${group.mega?'nav-dropdown--mega':''}`}
            onPointerEnter={cancelClose}
            onPointerLeave={event=>{if(event.pointerType==='mouse')scheduleClose()}}
            onKeyDownCapture={()=>{hoverOpened.current=false}}
            onCloseAutoFocus={event=>{if(hoverOpened.current)event.preventDefault()}}>
            <DropdownMenuLabel className="nav-menu-intro"><span>{group.label}</span><p>{group.description}</p></DropdownMenuLabel>
            <DropdownMenuGroup className={group.mega?'nav-menu-grid':undefined}>
              {group.items.map(item=><DropdownMenuItem asChild key={item.href}>
                <Link href={item.href} className="nav-menu-item" aria-current={item.href===pathname?'page':undefined}>
                  <span className="nav-menu-copy"><span className="nav-menu-title">{item.title}</span>{item.description&&<span className="nav-menu-description">{item.description}</span>}</span>
                  <ArrowUpRight size={15} aria-hidden="true"/>
                </Link>
              </DropdownMenuItem>)}
            </DropdownMenuGroup>
            {group.overview&&<DropdownMenuItem asChild><Link href={group.overview} className="nav-menu-overview">Explore all focus areas<ArrowUpRight size={16} aria-hidden="true"/></Link></DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>)}
      </nav>
      <div className="nav-actions">
        <ThemeToggle/>
        <Button variant="ghost" size="icon" aria-label="Search website" onClick={()=>setSearch(true)}><Search size={19} aria-hidden="true"/></Button>
        <Button asChild className="donate-button"><Link href="/donate-now"><Heart size={16} aria-hidden="true"/>Donate now</Link></Button>
        <Sheet open={menu} onOpenChange={setMenu}>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation"><Menu aria-hidden="true"/></Button></SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetHeader><SheetTitle>Explore PEN</SheetTitle></SheetHeader>
            <Link href="/" className="mobile-home-link" onClick={()=>setMenu(false)} aria-current={pathname==='/'?'page':undefined}>Home<ArrowUpRight size={16} aria-hidden="true"/></Link>
            <Accordion type="single" collapsible className="mobile-nav" aria-label="Mobile navigation">
              {nav.map(group=><AccordionItem value={group.label} key={group.label}>
                <AccordionTrigger className={currentGroup===group?'mobile-nav-current':undefined}>{group.label}</AccordionTrigger>
                <AccordionContent>
                  {group.overview&&<Link className="mobile-nav-overview" href={group.overview} onClick={()=>setMenu(false)}>Explore all focus areas<ArrowUpRight size={14} aria-hidden="true"/></Link>}
                  {group.items.map(item=><Link key={item.href} href={item.href} onClick={()=>setMenu(false)} aria-current={item.href===pathname?'page':undefined}>{item.title}<ArrowUpRight size={14} aria-hidden="true"/></Link>)}
                </AccordionContent>
              </AccordionItem>)}
            </Accordion>
            <div className="mobile-direct-links"><Link href="/pen-academy" onClick={()=>setMenu(false)}>PEN Academy<ArrowUpRight size={14} aria-hidden="true"/></Link><Link href="/contact-us" onClick={()=>setMenu(false)}>Contact us<ArrowUpRight size={14} aria-hidden="true"/></Link></div>
            <Button asChild className="pen-button"><Link href="/donate-now" onClick={()=>setMenu(false)}>Support a child<ArrowUpRight size={17} aria-hidden="true"/></Link></Button>
          </SheetContent>
        </Sheet>
      </div>
    </div></header>
    <Dialog open={search} onOpenChange={setSearch}>
      <DialogContent className="search-dialog">
        <DialogHeader><DialogTitle>Explore PEN</DialogTitle><DialogDescription>Find programmes, resources and stories.</DialogDescription></DialogHeader>
        <Input autoFocus aria-label="Search pages" placeholder="What are you looking for?" value={query} onChange={event=>setQuery(event.target.value)}/>
        <div className="search-results">{results.slice(0,12).map(result=><Link key={result.slug} href={'/'+result.slug} onClick={()=>setSearch(false)}>{result.title}<ArrowUpRight size={15} aria-hidden="true"/></Link>)}{results.length===0&&<p>No matching pages. Try “schools” or “books”.</p>}</div>
      </DialogContent>
    </Dialog>
  </>;
}
