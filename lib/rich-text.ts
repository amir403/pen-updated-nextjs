/**
 * Rich text written in the admin panel's editor. Values are small HTML fragments limited to
 * bold, italic, underline, links and line breaks; paragraph fields store one block per array item,
 * either inline HTML (a paragraph) or a `<ul>`/`<ol>` list. Plain text saved before the editor
 * existed parses as text, with newlines read as line breaks.
 *
 * Parsing never produces HTML for the browser to interpret: the website renders the parsed nodes as
 * React elements (components/rich-text.tsx), so anything outside this allowlist is dropped.
 */
export type RichInlineTag='strong'|'em'|'u'|'a'|'br';
export type RichNode=string|{tag:RichInlineTag|'p'|'ul'|'ol'|'li';href?:string;children:RichNode[]};
export type RichBlock={tag:'p';children:RichNode[]}|{tag:'ul'|'ol';items:RichNode[][]};

const aliases:Record<string,string>={b:'strong',i:'em',div:'p',h1:'p',h2:'p',h3:'p',h4:'p',h5:'p',h6:'p',blockquote:'p'};
const known=new Set(['strong','em','u','a','br','p','ul','ol','li']);
const dropContent=new Set(['script','style','template','iframe','object','noscript','title','head']);
const entities:Record<string,string>={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};

const decode=(text:string)=>text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,(match,code:string)=>{
 if(code[0]==='#'){const n=code[1]==='x'||code[1]==='X'?parseInt(code.slice(2),16):parseInt(code.slice(1),10);return n>0&&n<0x110000?String.fromCodePoint(n):match}
 return entities[code.toLowerCase()]??match;
});

/** Links may point to a website page, an anchor, or an http(s), mailto or tel address. */
export function safeHref(href:string){
 const value=href.trim();
 return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(value)?value:null;
}

/** Parses a fragment into a tree of allowed elements; unknown tags keep their text. */
function parse(html:string):RichNode[]{
 const root:{tag:string;href?:string;children:RichNode[]}={tag:'root',children:[]};
 const stack=[root];
 let skip:string|null=null;
 const text=(value:string)=>{
  if(skip||!value)return;
  // Plain text from before the editor uses newlines for line breaks.
  value.split('\n').forEach((part,index)=>{
   if(index)stack[stack.length-1].children.push({tag:'br',children:[]});
   if(part)stack[stack.length-1].children.push(decode(part));
  });
 };
 const pattern=/<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
 let last=0;
 for(let match=pattern.exec(html);match;match=pattern.exec(html)){
  text(html.slice(last,match.index));
  last=pattern.lastIndex;
  if(!match[2])continue;
  const closing=match[1]==='/';
  const raw=match[2].toLowerCase();
  if(skip){if(closing&&raw===skip)skip=null;continue}
  if(dropContent.has(raw)){if(!closing&&!/\/\s*$/.test(match[3]))skip=raw;continue}
  const tag=aliases[raw]??raw;
  if(!known.has(tag))continue;
  if(tag==='br'){if(!closing)stack[stack.length-1].children.push({tag:'br',children:[]});continue}
  if(closing){
   const index=stack.map(node=>node.tag).lastIndexOf(tag);
   if(index>0)stack.length=index;
   continue;
  }
  const node:{tag:string;href?:string;children:RichNode[]}={tag,children:[]};
  if(tag==='a'){
   const href=/\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(match[3]);
   const value=href&&safeHref(decode(href[2]??href[3]??href[4]??''));
   if(value)node.href=value;
  }
  stack[stack.length-1].children.push(node as RichNode);
  stack.push(node);
 }
 text(html.slice(last));
 return root.children;
}

const isBlock=(node:RichNode)=>typeof node!=='string'&&(node.tag==='p'||node.tag==='ul'||node.tag==='ol'||node.tag==='li');

/** Keeps only inline formatting. Blocks become runs separated by line breaks. */
function inline(nodes:RichNode[]):RichNode[]{
 const out:RichNode[]=[];
 const breakLine=()=>{if(out.length&&!(typeof out[out.length-1]!=='string'&&(out[out.length-1] as {tag:string}).tag==='br'))out.push({tag:'br',children:[]})};
 for(const node of nodes){
  if(typeof node==='string'){if(typeof out[out.length-1]==='string')out[out.length-1]+=node;else out.push(node);continue}
  if(isBlock(node)){breakLine();out.push(...inline(node.children));breakLine();continue}
  if(node.tag==='br'){out.push(node);continue}
  if(node.tag==='a'&&!node.href){out.push(...inline(node.children));continue}
  const children=inline(node.children);
  if(children.some(child=>typeof child!=='string'||child.trim()))out.push({...node,children});
  else out.push(...children);
 }
 while(out.length&&typeof out[out.length-1]!=='string'&&(out[out.length-1] as {tag:string}).tag==='br')out.pop();
 while(out.length&&typeof out[0]!=='string'&&(out[0] as {tag:string}).tag==='br')out.shift();
 return out;
}

const hasText=(nodes:RichNode[]):boolean=>nodes.some(node=>typeof node==='string'?node.trim()!=='':node.tag!=='br'&&hasText(node.children));

/** Splits a fragment into paragraphs and lists. Line breaks between loose text stay inside its paragraph. */
function blocks(nodes:RichNode[]):RichBlock[]{
 const out:RichBlock[]=[];
 let loose:RichNode[]=[];
 const flush=()=>{const children=inline(loose);if(hasText(children))out.push({tag:'p',children});loose=[]};
 for(const node of nodes){
  if(typeof node!=='string'&&(node.tag==='ul'||node.tag==='ol')){
   flush();
   const items=node.children.flatMap(child=>typeof child!=='string'&&child.tag==='li'?[inline(child.children)]:[inline([child])]).filter(hasText);
   if(items.length)out.push({tag:node.tag,items});
  }else if(typeof node!=='string'&&node.tag==='p'){flush();out.push(...blocks(node.children))}
  else loose.push(node);
 }
 flush();
 return out;
}

const escape=(text:string)=>text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g,'&nbsp;');
const serialize=(nodes:RichNode[]):string=>nodes.map(node=>{
 if(typeof node==='string')return escape(node);
 if(node.tag==='br')return '<br>';
 const open=node.tag==='a'?`<a href="${escape(node.href??'').replace(/"/g,'&quot;')}">`:`<${node.tag}>`;
 return open+serialize(node.children)+`</${node.tag}>`;
}).join('');
const serializeBlock=(block:RichBlock)=>block.tag==='p'?serialize(block.children):`<${block.tag}>${block.items.map(item=>'<li>'+serialize(item)+'</li>').join('')}</${block.tag}>`;

/** Inline nodes of a single-text field. */
export const richInline=(value:string)=>inline(parse(value));

/** Blocks of one paragraph-field item (a paragraph, or a list). */
export const richBlocks=(value:string)=>blocks(parse(value));

/** Cleans a single-text field from the editor. */
export const sanitizeInline=(html:string)=>serialize(richInline(html));

/** Turns editor HTML into paragraph-field items: inline HTML per paragraph, or a whole list. */
export const toParagraphs=(html:string)=>richBlocks(html).map(serializeBlock);

/** Editor HTML for paragraph-field items. */
export const fromParagraphs=(items:string[])=>items.flatMap(item=>richBlocks(item)).map(block=>block.tag==='p'?'<p>'+serialize(block.children)+'</p>':serializeBlock(block)).join('');

/** Text without formatting, for places that cannot hold markup (alt text, menus inside links, search). */
export function richToPlain(value:string){
 const walk=(nodes:RichNode[]):string=>nodes.map(node=>typeof node==='string'?node:node.tag==='br'?' ':walk(node.children)+(isBlock(node)?' ':'')).join('');
 return walk(parse(value)).replace(/\s+/g,' ').trim();
}
