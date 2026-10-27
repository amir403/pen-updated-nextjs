'use client';
import {useActionState} from 'react';
import {login,type FormState} from '@/app/admin/actions';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export function LoginForm(){
 const [state,action,pending]=useActionState<FormState,FormData>(login,{});
 return <form action={action} className="admin-form">
  {state.message&&<p className="admin-alert error" role="alert">{state.errors?.email?.[0]??state.message}</p>}
  <div className="admin-field"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" autoComplete="username" defaultValue={state.values?.email} required/></div>
  <div className="admin-field"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" autoComplete="current-password" required/></div>
  <Button type="submit" disabled={pending}>{pending?'Signing in…':'Sign in'}</Button>
 </form>;
}
