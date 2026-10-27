'use client';
import {useActionState,useState} from 'react';
import {saveSocialLinks,type FormState} from '@/app/admin/actions';
import type {SocialLink} from '@/lib/site-content';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

export function SocialLinksForm({links}:{links:SocialLink[]}){
 const [state,action,pending]=useActionState<FormState,FormData>(saveSocialLinks,{});
 const [rows,setRows]=useState(()=>links.map((link,i)=>({...link,key:i})));
 const update=(key:number,change:Partial<SocialLink>)=>setRows(current=>current.map(r=>r.key===key?{...r,...change}:r));
 const error=(i:number)=>state.errors?.[`value.${i}.href`]?.[0]??state.errors?.[`value.${i}.label`]?.[0];
 return <form action={action} className="admin-form admin-card">
  {state.message&&<p className={'admin-alert '+(state.errors?'error':'success')} role="status">{state.message}</p>}
  {rows.map((row,i)=><div className="admin-link-row" key={row.key}>
   <Input name="label" value={row.label} onChange={event=>update(row.key,{label:event.target.value})} placeholder="Label" aria-label={`Link ${i+1} label`} required/>
   <Input name="href" type="url" value={row.href??''} onChange={event=>update(row.key,{href:event.target.value})} placeholder="https://…" aria-label={`Link ${i+1} URL`}/>
   <Button type="button" variant="outline" onClick={()=>setRows(rows.filter(r=>r.key!==row.key))}>Remove</Button>
   {error(i)&&<p className="admin-field-error">{error(i)}</p>}
  </div>)}
  <div className="admin-actions">
   <Button type="button" variant="outline" onClick={()=>setRows([...rows,{label:'',href:null,key:Math.max(0,...rows.map(r=>r.key))+1}])}>Add link</Button>
   <Button type="submit" disabled={pending}>{pending?'Saving…':'Save'}</Button>
  </div>
 </form>;
}
