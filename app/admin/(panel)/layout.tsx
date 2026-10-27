import Link from 'next/link';
import {logout} from '@/app/admin/actions';
import {adminGet} from '@/lib/admin-api';
import {adminGroups,adminResources,adminSettings} from '@/lib/admin-resources';
import {AdminNav} from '@/components/admin/admin-nav';

export default async function AdminPanelLayout({children}:{children:React.ReactNode}){
 const user=await adminGet<{name:string;email:string}>('/auth/me');
 const links=[...adminResources.map(r=>({group:r.group,href:'/admin/'+r.key,label:r.label})),...adminSettings.map(s=>({group:s.group,href:'/admin/settings/'+s.key,label:s.label}))];
 const sections=adminGroups.map(group=>({label:group,links:links.filter(link=>link.group===group)})).filter(section=>section.links.length>0);
 return <div className="admin-shell">
  <aside className="admin-sidebar">
   <Link href="/admin" className="admin-brand">PEN<span>Admin panel</span></Link>
   <AdminNav sections={sections}/>
   <div className="admin-user"><span>{user.name}</span><small>{user.email}</small>
    <form action={logout}><button type="submit">Sign out</button></form>
    <Link href="/" target="_blank">View website ↗</Link>
   </div>
  </aside>
  <main className="admin-main">{children}</main>
 </div>;
}
