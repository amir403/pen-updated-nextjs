import {Fragment,type ReactNode} from 'react';
import {richBlocks,richInline,type RichNode} from '@/lib/rich-text';

/** Applies `replace` to every piece of text, e.g. to turn {email} into a link. */
type TextReplacer=(text:string,key:string)=>ReactNode;

/** `inLink` renders links as plain text, for copy inside a card that is itself a link. */
function renderNodes(nodes:RichNode[],replace?:TextReplacer,prefix='r',inLink=false):ReactNode[]{
 return nodes.map((node,index)=>{
  const key=prefix+'-'+index;
  if(typeof node==='string')return replace?<Fragment key={key}>{replace(node,key)}</Fragment>:node;
  const children=renderNodes(node.children,replace,key,inLink);
  if(node.tag==='br')return <br key={key}/>;
  if(node.tag==='strong')return <strong key={key}>{children}</strong>;
  if(node.tag==='em')return <em key={key} className="rich-em">{children}</em>;
  if(node.tag==='u')return <u key={key}>{children}</u>;
  if(node.tag==='a'&&!inLink){
   const external=/^https?:\/\//i.test(node.href??'');
   return <a key={key} href={node.href} className="rich-link" {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}</a>;
  }
  return <Fragment key={key}>{children}</Fragment>;
 });
}

/** A single-text field written in the admin editor, rendered inside an existing element such as <p>. */
export function RichText({value,replace,inLink}:{value:string;replace?:TextReplacer;inLink?:boolean}){
 return <>{renderNodes(richInline(value),replace,'r',inLink)}</>;
}

/** Paragraph-field items: each paragraph becomes a <p> (with `className`), each list a <ul> or <ol>. */
export function RichParagraphs({value,className,replace}:{value:string[];className?:string;replace?:TextReplacer}){
 return <>{value.flatMap((item,i)=>richBlocks(item).map((block,j)=>{
  const key=i+'-'+j;
  if(block.tag==='p')return <p key={key} className={className}>{renderNodes(block.children,replace,key)}</p>;
  const List=block.tag;
  return <List key={key} className="rich-list">{block.items.map((item,k)=><li key={k}>{renderNodes(item,replace,key+'-'+k)}</li>)}</List>;
 }))}</>;
}
