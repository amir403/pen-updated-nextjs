'use client';
import {useActionState} from 'react';
import {saveRecord,type FormState} from '@/app/admin/actions';
import type {AdminField,AdminResource} from '@/lib/admin-resources';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const initialValue=(field:AdminField,value:unknown)=>value==null?'':Array.isArray(value)?value.join('\n\n'):String(value);

function FieldInput({field,value,invalid}:{field:AdminField;value:string;invalid:boolean}){
 const common={id:field.name,name:field.name,defaultValue:value,required:field.required,'aria-invalid':invalid||undefined,'aria-describedby':field.help?field.name+'-help':undefined};
 if(field.type==='textarea'||field.type==='paragraphs')return <Textarea {...common} rows={field.type==='paragraphs'?10:4}/>;
 if(field.type==='select')return <select {...common} className="admin-select"><option value="">Choose…</option>{field.options?.map(o=><option key={o} value={o}>{o}</option>)}</select>;
 if(field.type==='image')return <div className="admin-image-field">
  {value&&<img src={value} alt=""/>}
  <div><Input {...common} required={false} placeholder="/images/photo.jpg or https://…"/><Input name={field.name+'_file'} type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-label={field.label+' upload'}/><small>Upload a new image (max 5 MB) or enter an image path.</small></div>
 </div>;
 return <Input {...common} type={field.type==='number'?'number':field.type==='url'?'url':'text'} min={field.type==='number'?0:undefined}/>;
}

export function RecordForm({resource,id,record}:{resource:AdminResource;id:string|null;record:Record<string,unknown>}){
 // React resets the form after each attempt but restores <select> to its first option, so remount the
 // fields with the submitted values instead.
 const [state,action,pending]=useActionState<FormState&{attempt?:number},FormData>(async(previous,form)=>({...await saveRecord(resource.key,id,previous,form),attempt:(previous.attempt??0)+1}),{});
 return <form action={action} className="admin-form admin-card" key={state.attempt}>
  {state.message&&<p className="admin-alert error" role="alert">{state.errors?'Please correct the highlighted fields.':state.message}</p>}
  {resource.fields.map(field=>{const errors=state.errors?.[field.name]??state.errors?.[field.name+'.0'];return <div className="admin-field" key={field.name}>
   <Label htmlFor={field.name}>{field.label}{field.required&&<span aria-hidden="true"> *</span>}</Label>
   <FieldInput field={field} value={state.values?.[field.name]??initialValue(field,record[field.name])} invalid={!!errors}/>
   {field.help&&<small id={field.name+'-help'}>{field.help}</small>}
   {errors&&<p className="admin-field-error">{errors[0]}</p>}
  </div>})}
  <div className="admin-actions"><Button type="submit" disabled={pending}>{pending?'Saving…':'Save'}</Button></div>
 </form>;
}
