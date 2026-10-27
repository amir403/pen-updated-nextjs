import {SiteCard} from '@/components/site-card';
import {CrossCutting} from '@/components/impact-and-transparency';
import Link from 'next/link';
import {ArrowUpRight, Check} from 'lucide-react';
import {thematicAreas} from '@/lib/website-outline';
import {useSiteContent} from '@/components/site-content-provider';

export function ThematicOverview() {
  const {priorities}=useSiteContent();
  return <div className="container section thematic-overview">
    <div className="thematic-grid">
      {thematicAreas.map((area,index)=><SiteCard asChild key={area.id}><section className="thematic-card" id={area.id} key={area.id}>
        <span className="thematic-number">{String(index+1).padStart(2,'0')}</span>
        <h2>{area.title}</h2><p>{area.summary}</p>
        <ul className="check-list">{area.points.map(point=><li key={point}><Check size={16} aria-hidden="true"/>{point}</li>)}</ul>
        <Link href={area.href} className="text-link">{area.linkText}<ArrowUpRight size={16} aria-hidden="true"/></Link>
      </section></SiteCard>)}
    </div>
    <CrossCutting/><section className="upcoming-priorities" id="upcoming-projects">
      <p className="eyebrow">LOOKING AHEAD</p><h2>Upcoming project priorities</h2>
      <p>Inclusion, innovation and impact guide these areas for future project discussions. For current project announcements, opportunities and timelines, please contact the PEN team.</p>
      <dl>{priorities.map(priority=><div key={priority.anchor}><dt>{priority.title}</dt><dd>{priority.text.replace(/\.$/,'')}</dd></div>)}</dl>
      <Link href="/upcoming-projects" className="text-link">Explore upcoming priorities<ArrowUpRight size={16} aria-hidden="true"/></Link>
    </section>
  </div>;
}
