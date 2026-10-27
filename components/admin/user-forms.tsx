'use client';
import {useActionState,useTransition} from 'react';
import {changePassword,createUser,deleteUser,type FormState} from '@/app/admin/actions';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

function Field({name,label,type='text',autoComplete,state,defaultValue}:{name:string;label:string;type?:string;autoComplete?:string;state:FormState;defaultValue?:string}){
 const error=state.errors?.[name]?.[0];
 return <div className="admin-field"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} autoComplete={autoComplete} defaultValue={defaultValue} required aria-invalid={!!error||undefined}/>{error&&<p className="admin-field-error">{error}</p>}</div>;
}

const Status=({state}:{state:FormState})=>state.message?<p className={'admin-alert '+(state.errors?'error':'success')} role="status">{state.errors?'Please correct the highlighted fields.':state.message}</p>:null;

export function AddUserForm(){
 const [state,action,pending]=useActionState<FormState,FormData>(createUser,{});
 return <form action={action} className="admin-form admin-card">
  <Status state={state}/>
  <Field name="name" label="Name" autoComplete="off" state={state} defaultValue={state.values?.name}/>
  <Field name="email" label="Email" type="email" autoComplete="off" state={state} defaultValue={state.values?.email}/>
  <Field name="password" label="Password (at least 12 characters)" type="password" autoComplete="new-password" state={state}/>
  <Field name="password_confirmation" label="Confirm password" type="password" autoComplete="new-password" state={state}/>
  <div className="admin-actions"><Button type="submit" disabled={pending}>{pending?'Adding…':'Add admin'}</Button></div>
 </form>;
}

export function RemoveUserButton({id,name}:{id:string;name:string}){
 const [pending,startTransition]=useTransition();
 return <Button variant="outline" size="sm" disabled={pending} onClick={()=>{if(confirm(`Remove ${name}? They will no longer be able to sign in.`))startTransition(()=>deleteUser(id))}}>{pending?'Removing…':'Remove'}</Button>;
}

export function ChangePasswordForm(){
 const [state,action,pending]=useActionState<FormState,FormData>(changePassword,{});
 return <form action={action} className="admin-form admin-card">
  <Status state={state}/>
  <Field name="current_password" label="Current password" type="password" autoComplete="current-password" state={state}/>
  <Field name="password" label="New password (at least 12 characters)" type="password" autoComplete="new-password" state={state}/>
  <Field name="password_confirmation" label="Confirm new password" type="password" autoComplete="new-password" state={state}/>
  <div className="admin-actions"><Button type="submit" disabled={pending}>{pending?'Saving…':'Change password'}</Button></div>
 </form>;
}
