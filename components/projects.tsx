import {SiteCard} from '@/components/site-card';
import Link from 'next/link';
import {ArrowUpRight, BookOpen, GraduationCap, Handshake, Laptop, School, Search, Users} from 'lucide-react';
import {useSiteContent} from '@/components/site-content-provider';
import {countWord} from '@/lib/count-words';

/** Icons for programme cards, keyed like `programmeIcons` in lib/programmes.ts. */
const programmeIcons = {school:School,handshake:Handshake,users:Users,graduation:GraduationCap,book:BookOpen,laptop:Laptop,search:Search} as const;
const external=(href:string)=>/^https?:\/\//.test(href)?{target:'_blank',rel:'noreferrer'}:{};

function RelatedTheme({id}: {id:string}) {
  const {thematicAreas}=useSiteContent();
  const theme = thematicAreas.find(area=>area.anchor===id);
  return theme?<Link href={'/what-we-do#'+theme.anchor} className="project-theme-link">{theme.title}<ArrowUpRight size={13} aria-hidden="true"/></Link>:null;
}

export function OngoingProjects() {
  const {ongoingProgrammes}=useSiteContent();
  return <div className="container section projects-page">
    <div className="project-intro">
      <div><p className="eyebrow"><span/>OUR PROGRAMMES</p><h2>Different pathways.<br/>One commitment to learning.</h2><p>From public-school improvement to digital education, these programmes bring PEN’s education work into focus. Explore each programme, its related thematic areas and the resources available to learn more.</p>
        <div className="project-intro-links"><Link className="text-link" href="/explore-our-schools">Explore our schools<ArrowUpRight size={16} aria-hidden="true"/></Link><Link className="text-link" href="/upcoming-projects">Looking ahead<ArrowUpRight size={16} aria-hidden="true"/></Link></div>
      </div>
      <img src="/images/website-outline/quality-education.jpg" alt="A teacher supporting children with classroom learning" width={640} height={420}/>
    </div>
    <div className="project-section-heading"><h2>Explore our {countWord(ongoingProgrammes.length)} programmes</h2><p>Find the work that matters to you.</p></div>
    <nav className="programme-jump-links" aria-label="Jump to a programme">{ongoingProgrammes.map(programme=><a href={'#'+programme.anchor} key={programme.anchor}>{programme.title}</a>)}</nav>
    <div className="project-grid">
      {ongoingProgrammes.map((programme,index)=>{
        const Icon = programmeIcons[programme.icon as keyof typeof programmeIcons]??School;
        return <SiteCard asChild key={index}><article className="project-card" id={programme.anchor} key={programme.anchor} aria-labelledby={'programme-'+programme.anchor}>
          <div className="project-card-top"><span className="project-icon"><Icon size={24} aria-hidden="true"/></span><span className="project-number">{String(index+1).padStart(2,'0')}</span></div>
          <h3 id={'programme-'+programme.anchor}>{programme.title}</h3><p>{programme.description}</p>
          <div className="project-themes"><span className="project-label">Related focus areas</span>{programme.themes.map(theme=><RelatedTheme id={theme} key={theme}/>)}</div>
          <div className="project-card-links"><Link href={programme.link_href} className="text-link" {...external(programme.link_href)}>{programme.link_label}<ArrowUpRight size={16} aria-hidden="true"/></Link>
            {programme.resource_href&&<a href={programme.resource_href} className="project-resource" {...external(programme.resource_href)}>{programme.resource_title}<ArrowUpRight size={14} aria-hidden="true"/></a>}
          </div>
        </article></SiteCard>;
      })}
    </div>
    <section className="project-next-step"><div><p className="eyebrow"><span/>WORK WITH PEN</p><h2>Bring opportunity closer.</h2><p>Connect with our team to discuss a programme, explore a partnership or find the right way to support children’s learning.</p></div><Link href="/contact-us" className="pen-button inline-flex items-center">Talk to our team<ArrowUpRight size={17} aria-hidden="true"/></Link></section>
  </div>;
}

export function UpcomingProjects() {
  const {priorities}=useSiteContent();
  return <div className="container section projects-page">
    <div className="priority-intro"><p className="eyebrow"><span/>LOOKING AHEAD</p><h2>Priorities for the next chapter.</h2><p>These focus areas guide future project discussions. For specific project announcements, locations, partnership opportunities and timelines, please contact the PEN team.</p></div>
    <div className="project-grid priority-grid">
      {priorities.map((priority,index)=>{
        return <SiteCard asChild key={index}><article className="project-card priority-card" id={priority.anchor} key={priority.anchor}>
          <div className="project-card-top"><span className="priority-status">Future priority</span><span className="project-number">{String(index+1).padStart(2,'0')}</span></div>
          <h3>{priority.title}</h3><p>{priority.text.replace(/\.?$/,'.')}</p>
          {priority.theme&&<div className="project-themes"><span className="project-label">Related focus area</span><RelatedTheme id={priority.theme}/></div>}
          <div className="project-card-links"><Link href={priority.link_href} className="text-link" {...external(priority.link_href)}>{priority.link_label}<ArrowUpRight size={16} aria-hidden="true"/></Link></div>
        </article></SiteCard>;
      })}
    </div>
    <section className="project-next-step"><div><p className="eyebrow"><span/>PARTNERSHIPS & RESOURCES</p><h2>Build what comes next, together.</h2><p>Get in touch about working with PEN, or explore our current programmes and publications.</p><div className="project-intro-links"><Link href="/ongoing-projects" className="text-link">Current programmes<ArrowUpRight size={16} aria-hidden="true"/></Link><Link href="/publications" className="text-link">Publications<ArrowUpRight size={16} aria-hidden="true"/></Link></div></div><Link href="/contact-us" className="pen-button inline-flex items-center">Discuss a partnership<ArrowUpRight size={17} aria-hidden="true"/></Link></section>
  </div>;
}
