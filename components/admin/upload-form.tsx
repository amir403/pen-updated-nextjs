'use client';
import {useActionState,useState} from 'react';
import {uploadFile,type FormState} from '@/app/admin/actions';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export function UploadForm(){
 const [state,action,pending]=useActionState<FormState&{url?:string},FormData>(uploadFile,{});
 const [copied,setCopied]=useState('');
 return <form action={action} className="admin-form admin-card">
  {state.message&&!state.url&&<p className="admin-alert error" role="alert">{state.errors?.file?.[0]??state.message}</p>}
  <div className="admin-field"><Label htmlFor="file">File</Label><Input id="file" name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*" required/></div>
  <div className="admin-actions"><Button type="submit" disabled={pending}>{pending?'Uploading…':'Upload'}</Button></div>
  {state.url&&<div className="admin-alert success" role="status"><p>Uploaded. Link:</p><div className="admin-copy-row"><Input readOnly value={state.url} aria-label="Uploaded file link" onFocus={event=>event.currentTarget.select()}/><Button type="button" variant="outline" onClick={async()=>{try{await navigator.clipboard.writeText(state.url!);setCopied(state.url!)}catch{setCopied('')}}}>{copied===state.url?'Copied':'Copy link'}</Button></div></div>}
 </form>;
}
