import Link from 'next/link';
import {ArrowUpRight, BookOpen, GraduationCap, Handshake, Laptop, School, Search, Users} from 'lucide-react';
import {ongoingProgrammes, priorityDestinations, thematicAreas, upcomingPriorities} from '@/lib/website-outline';

const programmeIcons = [School,Handshake,Users,GraduationCap,BookOpen,Laptop,GraduationCap,Search];

function RelatedTheme({id}: {id:string}) {
  const theme = thematicAreas.find(area=>area.id===id);
  return theme?<Link href={'/what-we-do#'+theme.id} className="project-theme-link">{theme.title}<ArrowUpRight size={13} aria-hidden="true"/></Link>:null;
}

export function OngoingProjects() {
  return <div className="container section projects-page">
    <div className="project-intro">
      <div><p className="eyebrow"><span/>OUR PROGRAMMES</p><h2>Different pathways.<br/>One commitment to learning.</h2><p>From public-school improvement to digital education, these programmes bring PEN’s education work into focus. Explore each programme, its related thematic areas and the resources available to learn more.</p>
        <div className="project-intro-links"><Link className="text-link" href="/explore-our-schools">Explore our schools<ArrowUpRight size={16} aria-hidden="true"/></Link><Link className="text-link" href="/upcoming-projects">Looking ahead<ArrowUpRight size={16} aria-hidden="true"/></Link></div>
      </div>
      <img src="/images/website-outline/quality-education.jpg" alt="A teacher supporting children with classroom learning" width={640} height={420}/>
    </div>
    <div className="project-section-heading"><h2>Explore our eight programmes</h2><p>Find the work that matters to you.</p></div>
    <nav className="programme-jump-links" aria-label="Jump to a programme">{ongoingProgrammes.map(programme=><a href={'#'+programme.id} key={programme.id}>{programme.title}</a>)}</nav>
    <div className="project-grid">
      {ongoingProgrammes.map((programme,index)=>{
        const Icon = programmeIcons[index];
        return <article className="project-card" id={programme.id} key={programme.id} aria-labelledby={'programme-'+programme.id}>
          <div className="project-card-top"><span className="project-icon"><Icon size={24} aria-hidden="true"/></span><span className="project-number">{String(index+1).padStart(2,'0')}</span></div>
          <h3 id={'programme-'+programme.id}>{programme.title}</h3><p>{programme.description}</p>
          <div className="project-themes"><span className="project-label">Related focus areas</span>{programme.themes.map(theme=><RelatedTheme id={theme} key={theme}/>)}</div>
          <div className="project-card-links"><Link href={programme.href} className="text-link">{programme.linkText}<ArrowUpRight size={16} aria-hidden="true"/></Link>
            <a href={programme.resource.href} className="project-resource" {...(programme.resource.href.startsWith('https://')?{target:'_blank',rel:'noreferrer'}:{})}>{programme.resource.title}<ArrowUpRight size={14} aria-hidden="true"/></a>
          </div>
        </article>;
      })}
    </div>
    <section className="project-next-step"><div><p className="eyebrow"><span/>WORK WITH PEN</p><h2>Bring opportunity closer.</h2><p>Connect with our team to discuss a programme, explore a partnership or find the right way to support children’s learning.</p></div><Link href="/contact-us" className="pen-button inline-flex items-center">Talk to our team<ArrowUpRight size={17} aria-hidden="true"/></Link></section>
  </div>;
}

export function UpcomingProjects() {
  return <div className="container section projects-page">
    <div className="priority-intro"><p className="eyebrow"><span/>LOOKING AHEAD</p><h2>Priorities for the next chapter.</h2><p>These focus areas guide future project discussions. For specific project announcements, locations, partnership opportunities and timelines, please contact the PEN team.</p></div>
    <div className="project-grid priority-grid">
      {upcomingPriorities.map(([title,text],index)=>{
        const destination = priorityDestinations[index];
        return <article className="project-card priority-card" id={destination.id} key={destination.id}>
          <div className="project-card-top"><span className="priority-status">Future priority</span><span className="project-number">{String(index+1).padStart(2,'0')}</span></div>
          <h3>{title}</h3><p>{text}.</p>
          <div className="project-themes"><span className="project-label">Related focus area</span><RelatedTheme id={destination.theme}/></div>
          <div className="project-card-links"><Link href={destination.href} className="text-link">{destination.label}<ArrowUpRight size={16} aria-hidden="true"/></Link></div>
        </article>;
      })}
    </div>
    <section className="project-next-step"><div><p className="eyebrow"><span/>PARTNERSHIPS & RESOURCES</p><h2>Build what comes next, together.</h2><p>Get in touch about working with PEN, or explore our current programmes and publications.</p><div className="project-intro-links"><Link href="/ongoing-projects" className="text-link">Current programmes<ArrowUpRight size={16} aria-hidden="true"/></Link><Link href="/publications" className="text-link">Publications<ArrowUpRight size={16} aria-hidden="true"/></Link></div></div><Link href="/contact-us" className="pen-button inline-flex items-center">Discuss a partnership<ArrowUpRight size={17} aria-hidden="true"/></Link></section>
  </div>;
}
