'use client';
import {useEffect,useRef,useState} from 'react';
import {FileText,ImageIcon,Upload,X} from 'lucide-react';
import {Attachment,AttachmentAction,AttachmentActions,AttachmentContent,AttachmentDescription,AttachmentMedia,AttachmentTitle,AttachmentTrigger} from '@/components/ui/attachment';

type Props={id?:string;name:string;accept:string;label:string;hint:string;required?:boolean;maxBytes?:number};

const formatSize=(bytes:number)=>bytes<1024*1024?Math.max(1,Math.round(bytes/1024))+' KB':(bytes/1024/1024).toFixed(1)+' MB';

/** Matches a file against an `accept` list such as ".pdf,image/*". */
function accepts(file:File,accept:string){
 const name=file.name.toLowerCase();
 return accept.split(',').map(rule=>rule.trim().toLowerCase()).some(rule=>rule.startsWith('.')?name.endsWith(rule):rule.endsWith('/*')?file.type.startsWith(rule.slice(0,-1)):file.type===rule);
}

/**
 * A file picker built on shadcn's Attachment: click or drop a file, see its name, size and a preview
 * for images, and remove it again. The real <input type="file"> stays in the form under `name`.
 */
export function FileUpload({id,name,accept,label,hint,required,maxBytes=10*1024*1024}:Props){
 const input=useRef<HTMLInputElement>(null);
 const [file,setFile]=useState<File|null>(null);
 const [error,setError]=useState('');
 const [dragging,setDragging]=useState(false);
 const [preview,setPreview]=useState('');

 const previewUrl=useRef('');
 const showPreview=(next:File|null)=>{
  if(previewUrl.current)URL.revokeObjectURL(previewUrl.current);
  previewUrl.current=next?.type.startsWith('image/')?URL.createObjectURL(next):'';
  setPreview(previewUrl.current);
 };
 useEffect(()=>()=>{if(previewUrl.current)URL.revokeObjectURL(previewUrl.current)},[]);

 // The form clears its inputs after each save attempt; clear the card with it.
 useEffect(()=>{
  const form=input.current?.form;
  const reset=()=>{setFile(null);setError('');showPreview(null)};
  form?.addEventListener('reset',reset);
  return()=>form?.removeEventListener('reset',reset);
 },[]);

 const choose=(files:FileList|null)=>{
  const next=files?.[0]??null;
  if(next&&!accepts(next,accept)){setError(next.name+' is not an accepted file type.');clear();return}
  if(next&&next.size>maxBytes){setError(next.name+' is larger than '+formatSize(maxBytes)+'.');clear();return}
  setError('');
  setFile(next);
  showPreview(next);
 };
 const clear=()=>{if(input.current)input.current.value='';setFile(null);showPreview(null)};

 return <div className="admin-file-upload"
  onDragOver={event=>{event.preventDefault();setDragging(true)}}
  onDragLeave={()=>setDragging(false)}
  onDrop={event=>{
   event.preventDefault();setDragging(false);
   if(!input.current||!event.dataTransfer.files.length)return;
   input.current.files=event.dataTransfer.files;
   choose(event.dataTransfer.files);
  }}>
  <input ref={input} id={id} name={name} type="file" accept={accept} required={required} className="sr-only" tabIndex={-1} onChange={event=>choose(event.target.files)}/>
  {file
   ?<Attachment className="w-full" state="done">
    <AttachmentMedia variant={preview?'image':'icon'}>{preview?<img src={preview} alt=""/>:file.type.startsWith('image/')?<ImageIcon/>:<FileText/>}</AttachmentMedia>
    <AttachmentContent><AttachmentTitle>{file.name}</AttachmentTitle><AttachmentDescription>{formatSize(file.size)} · ready to upload</AttachmentDescription></AttachmentContent>
    <AttachmentTrigger aria-label={'Choose a different file for '+label} onClick={()=>input.current?.click()}/>
    <AttachmentActions><AttachmentAction aria-label={'Remove '+file.name} onClick={clear}><X/></AttachmentAction></AttachmentActions>
   </Attachment>
   :<Attachment className={'w-full'+(dragging?' admin-file-upload-dragging':'')} state={error?'error':'idle'}>
    <AttachmentMedia><Upload/></AttachmentMedia>
    <AttachmentContent><AttachmentTitle>{dragging?'Drop the file to add it':'Choose a file or drag it here'}</AttachmentTitle><AttachmentDescription role={error?'alert':undefined}>{error||hint}</AttachmentDescription></AttachmentContent>
    <AttachmentTrigger aria-label={label+': choose a file'} onClick={()=>input.current?.click()}/>
   </Attachment>}
 </div>;
}
