import Link from 'next/link';
import {ArrowUpRight, Check} from 'lucide-react';
import {thematicAreas, upcomingPriorities} from '@/lib/website-outline';

export function ThematicOverview() {
  return <div className="container section thematic-overview">
    <div className="thematic-grid">
      {thematicAreas.map((area,index)=><section className="thematic-card" id={area.id} key={area.id}>
        <span className="thematic-number">{String(index+1).padStart(2,'0')}</span>
        <h2>{area.title}</h2><p>{area.summary}</p>
        <ul className="check-list">{area.points.map(point=><li key={point}><Check size={16} aria-hidden="true"/>{point}</li>)}</ul>
        <Link href={area.href} className="text-link">{area.linkText}<ArrowUpRight size={16} aria-hidden="true"/></Link>
      </section>)}
    </div>
    <section className="upcoming-priorities" id="upcoming-projects">
      <p className="eyebrow">LOOKING AHEAD</p><h2>Upcoming project priorities</h2>
      <p>Inclusion, innovation and impact guide these areas for future project discussions. For current project announcements, opportunities and timelines, please contact the PEN team.</p>
      <dl>{upcomingPriorities.map(([title,text])=><div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
      <Link href="/upcoming-projects" className="text-link">Explore upcoming priorities<ArrowUpRight size={16} aria-hidden="true"/></Link>
    </section>
  </div>;
}
