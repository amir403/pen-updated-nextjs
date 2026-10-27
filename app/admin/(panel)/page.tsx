import Link from 'next/link';
import {adminGet} from '@/lib/admin-api';
import {adminGroups,adminResources,adminSettings,resourceApiPath} from '@/lib/admin-resources';

export const metadata={title:'Dashboard'};

export default async function Dashboard(){
 const counts=await adminGet<Record<string,number>>('/summary');
 return <>
  <header className="admin-header"><div><h1>Dashboard</h1><p>Manage the content published on the PEN website. Saved changes appear on the site immediately.</p></div></header>
  {adminGroups.map(group=>{
   const resources=adminResources.filter(r=>r.group===group);
   const settings=adminSettings.filter(s=>s.group===group);
   if(!resources.length&&!settings.length)return null;
   return <section key={group} className="admin-dashboard-group" aria-labelledby={'group-'+group}>
    <h2 id={'group-'+group}>{group}</h2>
    <div className="admin-tiles">
     {resources.map(r=><Link key={r.key} href={'/admin/'+r.key} className="admin-tile"><strong>{counts[resourceApiPath(r)]??0}</strong><span>{r.label}</span><small>{r.description}</small></Link>)}
     {settings.map(s=><Link key={s.key} href={'/admin/settings/'+s.key} className="admin-tile"><strong aria-hidden="true">✎</strong><span>{s.label}</span><small>{s.description}</small></Link>)}
    </div>
   </section>;
  })}
 </>;
}
