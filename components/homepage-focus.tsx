import {SiteCard} from '@/components/site-card';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {sdgLabels} from '@/lib/website-outline';
import {useSiteContent} from '@/components/site-content-provider';

export function HomepageFocus() {
  const {homepageFocus,homepage} = useSiteContent();
  if(!homepageFocus.length) return null;
  return <section className="section home-focus" aria-labelledby="focus-heading">
    <div className="container">
      <div className="section-heading">
        <div><p className="eyebrow"><span/>OUR FOCUS, THEIR FUTURE</p><h2 id="focus-heading">{homepage.focus_heading}</h2>{homepage.focus_intro&&<p className="section-intro">{homepage.focus_intro}</p>}</div>
        <Link href="/what-we-do" className="text-link">Explore all focus areas<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
      <div className="focus-grid">
        {homepageFocus.map((focus,index)=><SiteCard asChild interactive key={focus.anchor}><Link href={'/what-we-do#'+focus.anchor} className={`focus-card ${index===0?'focus-card--featured':''}`} key={focus.anchor} aria-labelledby={'focus-title-'+focus.anchor}>
          <div className="focus-photo"><img src={focus.image} alt={focus.alt} loading="lazy" width={640} height={420}/><span className="focus-index">{String(index+1).padStart(2,'0')}</span></div>
          <div className="focus-copy">
            <h3 id={'focus-title-'+focus.anchor}>{focus.title}</h3><p>{focus.text}</p>
            {focus.featured&&<p className="focus-subtheme"><strong>In focus</strong>{focus.featured}</p>}
            <div className="focus-sdgs"><span>Aligned with</span><div>{focus.sdgs.map(sdg=><img key={sdg} src={'/images/website-outline/sdg-'+String(sdg).padStart(2,'0')+'.jpg'} alt={'SDG '+sdg+(sdgLabels[sdg]?': '+sdgLabels[sdg]:'')} title={'SDG '+sdg+(sdgLabels[sdg]?': '+sdgLabels[sdg]:'')} width={48} height={48} loading="lazy"/>)}</div></div>
            <span className="text-link focus-link">Explore this focus area<ArrowUpRight size={17} aria-hidden="true"/></span>
          </div>
        </Link></SiteCard>)}
      </div>
    </div>
  </section>;
}
