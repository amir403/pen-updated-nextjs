import Link from 'next/link';
import {adminGet} from '@/lib/admin-api';
import {adminResources} from '@/lib/admin-resources';

export const metadata={title:'Dashboard'};

export default async function Dashboard(){
 const counts=await Promise.all(adminResources.map(r=>adminGet<unknown[]>('/'+r.key).then(rows=>rows.length)));
 return <>
  <header className="admin-header"><div><h1>Dashboard</h1><p>Manage the content published on the PEN website. Saved changes appear on the site immediately.</p></div></header>
  <div className="admin-tiles">{adminResources.map((r,i)=><Link key={r.key} href={'/admin/'+r.key} className="admin-tile"><strong>{counts[i]}</strong><span>{r.label}</span><small>{r.description}</small></Link>)}
   <Link href="/admin/settings" className="admin-tile"><strong>↗</strong><span>Social links</span><small>Profiles shown in the website footer.</small></Link>
  </div>
 </>;
}
