import {adminGet} from '@/lib/admin-api';
import {ChangePasswordForm} from '@/components/admin/user-forms';

export const metadata={title:'My account'};

export default async function Account(){
 const me=await adminGet<{name:string;email:string}>('/auth/me');
 return <>
  <header className="admin-header"><div><h1>My account</h1><p>{me.name} · {me.email}</p></div></header>
  <h2 className="admin-subheading">Change password</h2>
  <ChangePasswordForm/>
 </>;
}
