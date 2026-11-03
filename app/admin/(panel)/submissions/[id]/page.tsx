import Link from 'next/link';
import {notFound} from 'next/navigation';
import {adminFetch} from '@/lib/admin-api';
import {mailtoHref} from '@/lib/site-settings';
import {SubmissionActions} from '@/components/admin/submission-actions';
import {formatDateTime} from '@/lib/admin-format';

export const metadata={title:'Form submission'};

type Entry={id:number;type:string;status:string;name:string;email:string;phone:string|null;subject:string|null;message:string|null;data:Record<string,string|null>;documents:{name:string;size:number}[];created_at:string};

const labels:Record<string,string>={topic:'Topic',father_name:'Father name',cnic:'CNIC',institution:'Institution',degree:'Degree',address:'Address'};

export default async function Submission({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const response=await adminFetch('/submissions/'+encodeURIComponent(id));
 if(response.status===404)notFound();
 if(!response.ok)throw new Error(`Admin API failed with HTTP ${response.status}`);
 const entry=(await response.json() as {data:Entry}).data;
 const rows:[string,string|null][]=[['Received',formatDateTime(entry.created_at)],['Email',entry.email],['Phone',entry.phone],...Object.entries(entry.data).map(([key,value]):[string,string|null]=>[labels[key]??key,value])];
 return <>
  <header className="admin-header"><div><Link href="/admin/submissions" className="admin-back">← Form submissions</Link><h1>{entry.name}</h1><p>{entry.type==='volunteer'?'Volunteer application':'Contact message'}{entry.subject?' · '+entry.subject:''}</p></div>
   <SubmissionActions id={String(entry.id)} status={entry.status}/>
  </header>
  <div className="admin-card admin-entry">
   <dl>{rows.filter(([,value])=>value).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   {entry.message&&<><h2>Message</h2><p className="admin-entry-message">{entry.message}</p></>}
   {entry.documents.length>0&&<><h2>Documents</h2><ul className="admin-entry-files">{entry.documents.map((document,index)=><li key={index}><a href={`/admin/submissions/${entry.id}/files/${index}`}>{document.name}</a> <small>({Math.max(1,Math.round(document.size/1024))} KB)</small></li>)}</ul><p className="admin-entry-note">Documents may contain identity details. Download them only on trusted devices and delete the entry when it is no longer needed.</p></>}
   <a className="admin-button" href={mailtoHref(entry.email,'Re: '+(entry.subject??'Your message to PEN'))}>Reply by email</a>
  </div>
 </>;
}
