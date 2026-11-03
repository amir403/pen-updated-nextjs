'use client';
import {useEffect,useRef,useState} from 'react';
import {Pencil,RotateCcw} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {slugify} from '@/lib/slug';

type Props={id:string;name:string;value:string;source:string;sourceValue:string;max:number;isNew:boolean;required?:boolean;invalid?:boolean;describedBy?:string};

/**
 * A URL slug or section link made from another field (usually the title). On a new record it follows
 * the title until the admin edits it; on a saved record it stays locked, because changing it breaks
 * links that already use it.
 */
export function SlugInput({id,name,value,source,sourceValue,max,isNew,required,invalid,describedBy}:Props){
 const input=useRef<HTMLInputElement>(null);
 const [slug,setSlug]=useState(value);
 // A new record follows the title, unless a value returned after a validation error was typed by hand.
 // A rejected value (for example a slug already in use) opens for editing straight away.
 const [mode,setMode]=useState<'auto'|'locked'|'manual'>(()=>invalid?'manual':!isNew?'locked':value&&value!==slugify(sourceValue,max)?'manual':'auto');
 const modeRef=useRef(mode);
 useEffect(()=>{modeRef.current=mode},[mode]);

 useEffect(()=>{
  const form=input.current?.form;
  const field=form?.elements.namedItem(source);
  if(!form||!(field instanceof HTMLInputElement))return;
  const follow=(event:Event)=>{if(event.target===field&&modeRef.current==='auto')setSlug(slugify(field.value,max))};
  form.addEventListener('input',follow);
  return()=>form.removeEventListener('input',follow);
 },[source,max]);

 const edit=()=>{setMode('manual');requestAnimationFrame(()=>input.current?.focus())};
 const followTitle=()=>{
  const field=input.current?.form?.elements.namedItem(source);
  setSlug(field instanceof HTMLInputElement?slugify(field.value,max):'');
  setMode('auto');
 };

 return <div className="admin-slug">
  <div className="admin-slug-row">
   <Input ref={input} id={id} name={name} value={slug} required={required} readOnly={mode!=='manual'} maxLength={max}
    aria-invalid={invalid||undefined} aria-describedby={describedBy}
    onChange={event=>setSlug(event.target.value)} onBlur={()=>mode==='manual'&&setSlug(slugify(slug,max))}/>
   {mode==='manual'
    ?(isNew&&<Button type="button" variant="outline" onClick={followTitle}><RotateCcw size={14}/>Use title</Button>)
    :<Button type="button" variant="outline" onClick={edit}><Pencil size={14}/>Edit</Button>}
  </div>
  {mode==='auto'&&<small>Made from the title as you type.</small>}
  {!isNew&&mode==='manual'&&slug!==value&&<small className="admin-slug-warning">Links that use “{value}” will stop working.</small>}
 </div>;
}
