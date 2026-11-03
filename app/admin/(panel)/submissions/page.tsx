import Link from 'next/link';
import {adminGet} from '@/lib/admin-api';
import {formatDateTime} from '@/lib/admin-format';

export const metadata={title:'Form submissions'};

type Entry={id:number;type:string;status:string;name:string;email:string;subject:string|null;created_at:string};
type Params={searchParams:Promise<{type?:string;status?:string;deleted?:string;archived?:string}>};

const filters=[['','All'],['contact','Contact messages'],['volunteer','Volunteer applications']] as const;

export default async function Submissions({searchParams}:Params){
 const {type='',status='',deleted,archived}=await searchParams;
 const query=new URLSearchParams({...(type&&{type}),...(status&&{status})}).toString();
 const entries=await adminGet<Entry[]>('/submissions'+(query?'?'+query:''));
 const href=(next:{type?:string;status?:string})=>{const params=new URLSearchParams({...(next.type??type?{type:next.type??type}:{}),...(next.status??status?{status:next.status??status}:{})});return '/admin/submissions'+(params.size?'?'+params:'')};
 return <>
  <header className="admin-header"><div><h1>Form submissions</h1><p>Messages and applications sent from the website. Opening an entry marks it as read.</p></div></header>
  {deleted&&<p className="admin-alert success" role="status">Entry deleted, including any attached documents.</p>}
  {archived&&<p className="admin-alert success" role="status">Entry archived.</p>}
  <nav className="admin-filters" aria-label="Filter submissions">
   {filters.map(([value,label])=><Link key={value} href={href({type:value})} aria-current={type===value?'page':undefined}>{label}</Link>)}
   <span aria-hidden="true">·</span>
   <Link href={href({status:''})} aria-current={status===''?'page':undefined}>Inbox</Link>
   <Link href={href({status:'new'})} aria-current={status==='new'?'page':undefined}>Unread</Link>
   <Link href={href({status:'archived'})} aria-current={status==='archived'?'page':undefined}>Archived</Link>
  </nav>
  <div className="admin-table-wrap"><table className="admin-table">
   <thead><tr><th scope="col">Received</th><th scope="col">Type</th><th scope="col">Name</th><th scope="col">Subject</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
   <tbody>{entries.map(entry=><tr key={entry.id} className={entry.status==='new'?'admin-row-new':undefined}><td>{formatDateTime(entry.created_at)}</td><td>{entry.type==='volunteer'?'Volunteer':'Contact'}</td><td>{entry.name}<br/><small>{entry.email}</small></td><td>{entry.subject}</td><td>{entry.status==='new'?'Unread':entry.status==='read'?'Read':'Archived'}</td><td><Link href={'/admin/submissions/'+entry.id}>Open</Link></td></tr>)}</tbody>
  </table>{entries.length===0&&<p className="admin-empty">No entries here yet.</p>}</div>
 </>;
}
