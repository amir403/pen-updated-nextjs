'use client';
import {useTransition} from 'react';
import {deleteSubmission,setSubmissionStatus} from '@/app/admin/actions';
import {Button} from '@/components/ui/button';

export function SubmissionActions({id,status}:{id:string;status:string}){
 const [pending,startTransition]=useTransition();
 return <div className="admin-entry-actions">
  {status!=='new'&&<Button variant="outline" size="sm" disabled={pending} onClick={()=>startTransition(()=>setSubmissionStatus(id,'new'))}>Mark as unread</Button>}
  {status!=='archived'?<Button variant="outline" size="sm" disabled={pending} onClick={()=>startTransition(()=>setSubmissionStatus(id,'archived'))}>Archive</Button>:<Button variant="outline" size="sm" disabled={pending} onClick={()=>startTransition(()=>setSubmissionStatus(id,'read'))}>Move to inbox</Button>}
  <Button variant="destructive" size="sm" disabled={pending} onClick={()=>{if(confirm('Delete this entry and any attached documents? This cannot be undone.'))startTransition(()=>deleteSubmission(id))}}>Delete</Button>
 </div>;
}
