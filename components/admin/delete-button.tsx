'use client';
import {useTransition} from 'react';
import {deleteRecord} from '@/app/admin/actions';
import {Button} from '@/components/ui/button';

export function DeleteButton({resourceKey,id,label}:{resourceKey:string;id:string;label:string}){
 const [pending,startTransition]=useTransition();
 return <Button variant="destructive" disabled={pending} onClick={()=>{if(confirm(`Delete this ${label}? It will be removed from the website.`))startTransition(()=>deleteRecord(resourceKey,id))}}>{pending?'Deleting…':'Delete'}</Button>;
}
