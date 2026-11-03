'use client';
import {useRef} from 'react';
import {Bold,Italic,Link2,List,ListOrdered,RemoveFormatting,Underline,Unlink} from 'lucide-react';
import {fromParagraphs,safeHref,sanitizeInline,toParagraphs} from '@/lib/rich-text';

type Props={id:string;name:string;value:string;multiline:boolean;labelId:string;invalid?:boolean;describedBy?:string};

/**
 * A small rich text editor for admin textareas. The cleaned HTML goes into a hidden input under the
 * field's name; paragraph fields submit one block per paragraph, separated by blank lines, which is
 * what the save action splits on.
 */
export function RichTextEditor({id,name,value,multiline,labelId,invalid,describedBy}:Props){
 const editor=useRef<HTMLDivElement>(null);
 const hidden=useRef<HTMLInputElement>(null);
 const toValue=(html:string)=>multiline?toParagraphs(html).join('\n\n'):sanitizeInline(html);
 // Only the initial value is rendered; the form remounts the editor after each save attempt. The
 // markup comes from the sanitizer, so it holds nothing but the allowed formatting.
 const initial=multiline?fromParagraphs(value.split(/\n\s*\n/)):sanitizeInline(value);

 const sync=()=>{if(editor.current&&hidden.current)hidden.current.value=toValue(editor.current.innerHTML)};
 const run=(command:string,argument?:string)=>{
  editor.current?.focus();
  document.execCommand('styleWithCSS',false,'false');
  if(multiline)document.execCommand('defaultParagraphSeparator',false,'p');
  document.execCommand(command,false,argument);
  sync();
 };
 const addLink=()=>{
  const address=window.prompt('Link address: a website page such as /pen-academy, or a full https:// link');
  if(address==null)return;
  const href=safeHref(address)??(/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(address.trim())?'https://'+address.trim():null);
  if(!href){window.alert('Please enter a page such as /pen-academy, or a link starting with https://');return}
  const selection=window.getSelection();
  if(selection&&selection.isCollapsed)run('insertHTML',`<a href="${href.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">${href.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</a>`);
  else run('createLink',href);
 };

 const tools:[string,React.ComponentType<{size?:number}>,string][]=[
  ['Bold',Bold,'bold'],
  ['Italic',Italic,'italic'],
  ['Underline',Underline,'underline'],
  ['Add link',Link2,'link'],
  ['Remove link',Unlink,'unlink'],
  ...(multiline?[['Bulleted list',List,'insertUnorderedList'],['Numbered list',ListOrdered,'insertOrderedList']] as [string,React.ComponentType<{size?:number}>,string][]:[]),
  ['Clear formatting',RemoveFormatting,'removeFormat'],
 ];

 return <div className={'admin-rich'+(invalid?' invalid':'')}>
  <div className="admin-rich-toolbar" role="toolbar" aria-label="Formatting" aria-controls={id}>
   {tools.map(([label,Icon,command])=><button key={label} type="button" title={label} aria-label={label} onMouseDown={event=>event.preventDefault()} onClick={()=>command==='link'?addLink():run(command)}><Icon size={16}/></button>)}
  </div>
  <div ref={editor} id={id} className={'admin-rich-content'+(multiline?' multiline':'')} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-labelledby={labelId} aria-describedby={describedBy} aria-invalid={invalid||undefined}
   dangerouslySetInnerHTML={{__html:initial}} onInput={sync} onBlur={sync}
   onFocus={()=>{if(multiline)document.execCommand('defaultParagraphSeparator',false,'p')}}
   onKeyDown={event=>{
    if(!multiline&&event.key==='Enter'){event.preventDefault();document.execCommand('insertLineBreak');sync()}
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();addLink()}
   }}
   onPaste={event=>{
    // Pasted Word or web content brings its own styling; keep the text only.
    event.preventDefault();
    document.execCommand('insertText',false,event.clipboardData.getData('text/plain'));
    sync();
   }}/>
  <input ref={hidden} type="hidden" name={name} defaultValue={toValue(initial)}/>
 </div>;
}
