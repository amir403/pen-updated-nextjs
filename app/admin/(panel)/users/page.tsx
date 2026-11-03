import {adminGet} from '@/lib/admin-api';
import {AddUserForm,RemoveUserButton} from '@/components/admin/user-forms';

export const metadata={title:'Admin users'};

type User={id:number;name:string;email:string;created_at:string};

export default async function Users(){
 const [users,me]=await Promise.all([adminGet<User[]>('/users'),adminGet<User>('/auth/me')]);
 return <>
  <header className="admin-header"><div><h1>Admin users</h1><p>Everyone listed here can sign in and edit all website content.</p></div></header>
  <div className="admin-table-wrap"><table className="admin-table">
   <thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Added</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
   <tbody>{users.map(user=><tr key={user.id}><td>{user.name}{user.id===me.id&&<small className="admin-you"> (you)</small>}</td><td>{user.email}</td><td>{new Date(user.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</td><td>{user.id!==me.id&&<RemoveUserButton id={String(user.id)} name={user.name}/>}</td></tr>)}</tbody>
  </table></div>
  <h2 className="admin-subheading">Add an admin</h2>
  <AddUserForm/>
 </>;
}
