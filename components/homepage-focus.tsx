import {SiteCard} from '@/components/site-card';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {homepageFocus, sdgLabels} from '@/lib/website-outline';

export function HomepageFocus() {
  return <section className="section home-focus" aria-labelledby="focus-heading">
    <div className="container">
      <div className="section-heading">
        <div><p className="eyebrow"><span/>OUR FOCUS, THEIR FUTURE</p><h2 id="focus-heading">Five ways to open a world of possibility.</h2><p className="section-intro">Education connects every part of our work. These five priorities bring our commitment to children, teachers and communities together.</p></div>
        <Link href="/what-we-do" className="text-link">Explore all focus areas<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
      <div className="focus-grid">
        {homepageFocus.map((focus,index)=><SiteCard asChild interactive key={focus.id}><Link href={'/what-we-do#'+focus.id} className={`focus-card ${index===0?'focus-card--featured':''}`} key={focus.id} aria-labelledby={'focus-title-'+focus.id}>
          <div className="focus-photo"><img src={'/images/website-outline/'+focus.image} alt={focus.alt} loading="lazy" width={640} height={420}/><span className="focus-index">0{index+1}</span></div>
          <div className="focus-copy">
            <h3 id={'focus-title-'+focus.id}>{focus.title}</h3><p>{focus.text}</p>
            {focus.featured&&<p className="focus-subtheme"><strong>In focus</strong>{focus.featured}</p>}
            <div className="focus-sdgs"><span>Aligned with</span><div>{focus.sdgs.map(sdg=><img key={sdg} src={'/images/website-outline/sdg-'+String(sdg).padStart(2,'0')+'.jpg'} alt={'SDG '+sdg+': '+sdgLabels[sdg]} title={'SDG '+sdg+': '+sdgLabels[sdg]} width={48} height={48} loading="lazy"/>)}</div></div>
            <span className="text-link focus-link">Explore this focus area<ArrowUpRight size={17} aria-hidden="true"/></span>
          </div>
        </Link></SiteCard>)}
      </div>
    </div>
  </section>;
}
