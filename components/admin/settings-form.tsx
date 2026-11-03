'use client';
import {useActionState} from 'react';
import {saveSetting,type FormState} from '@/app/admin/actions';
import type {AdminSetting} from '@/lib/admin-resources';
import {Button} from '@/components/ui/button';
import {FieldList} from '@/components/admin/record-form';

export function SettingsForm({setting,value}:{setting:AdminSetting;value:Record<string,unknown>}){
 const [state,action,pending]=useActionState<FormState&{attempt?:number},FormData>(async(previous,form)=>({...await saveSetting(setting.key,previous,form),attempt:(previous.attempt??0)+1}),{});
 return <form action={action} className="admin-form admin-card" key={state.attempt}>
  {state.message&&<p className={'admin-alert '+(state.errors?'error':'success')} role="status">{state.errors?'Please correct the highlighted fields.':state.message}</p>}
  <FieldList fields={setting.fields} record={value} state={state}/>
  <div className="admin-actions"><Button type="submit" disabled={pending}>{pending?'Saving…':'Save'}</Button></div>
 </form>;
}
