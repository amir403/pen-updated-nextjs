import {ArrowUpRight} from 'lucide-react';
import {socialMedia} from '@/lib/content';

export function FooterSocials(){return <div className="footer-socials" aria-label="PEN social media">{socialMedia.map(item=>item.href?<a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={14} aria-hidden="true"/></a>:<span key={item.label} className="social-pending" aria-label={item.label+' — link coming soon'} title="Link coming soon">{item.label}<small>Coming soon</small></span>)}</div>}
