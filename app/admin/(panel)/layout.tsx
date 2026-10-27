import Link from 'next/link';
import {logout} from '@/app/admin/actions';
import {adminGet} from '@/lib/admin-api';
import {adminResources} from '@/lib/admin-resources';
import {AdminNav} from '@/components/admin/admin-nav';

export default async function AdminPanelLayout({children}:{children:React.ReactNode}){
 const user=await adminGet<{name:string;email:string}>('/auth/me');
 const links=[{href:'/admin',label:'Dashboard'},...adminResources.map(r=>({href:'/admin/'+r.key,label:r.label})),{href:'/admin/settings',label:'Social links'}];
 return <div className="admin-shell">
  <aside className="admin-sidebar">
   <Link href="/admin" className="admin-brand">PEN<span>Admin panel</span></Link>
   <AdminNav links={links}/>
   <div className="admin-user"><span>{user.name}</span><small>{user.email}</small>
    <form action={logout}><button type="submit">Sign out</button></form>
    <Link href="/" target="_blank">View website ↗</Link>
   </div>
  </aside>
  <main className="admin-main">{children}</main>
 </div>;
}
