'use server';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {revalidatePath,updateTag} from 'next/cache';
import {apiUrl} from '@/lib/cms';
import {adminFetch,adminTokenCookie} from '@/lib/admin-api';
import {findAdminResource} from '@/lib/admin-resources';

export type FormState={message?:string;errors?:Record<string,string[]>;values?:Record<string,string>};

async function failure(response:Response):Promise<FormState>{
 const body=await response.json().catch(()=>({})) as {message?:string;errors?:Record<string,string[]>};
 return {message:body.message||`The API responded with HTTP ${response.status}.`,errors:body.errors};
}

/** Makes saved changes visible on the public website straight away. */
function refreshSite(){updateTag('site-content');revalidatePath('/','layout')}

export async function login(_:FormState,form:FormData):Promise<FormState>{
 if(!apiUrl)return {message:'PEN_API_URL is not configured.'};
 const values={email:String(form.get('email')??'')};
 let response:Response;
 try{
  response=await fetch(apiUrl+'/api/auth/login',{method:'POST',cache:'no-store',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({email:form.get('email'),password:form.get('password')})});
 }catch{return {message:'The API could not be reached.',values}}
 if(response.status===429)return {message:'Too many attempts. Please wait a minute and try again.',values};
 if(!response.ok)return {...await failure(response),values};
 const {token}=await response.json() as {token:string};
 (await cookies()).set(adminTokenCookie,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:12*60*60});
 redirect('/admin');
}

export async function logout(){
 const token=(await cookies()).get(adminTokenCookie)?.value;
 if(apiUrl&&token)await fetch(apiUrl+'/api/auth/logout',{method:'POST',cache:'no-store',headers:{Accept:'application/json',Authorization:'Bearer '+token}}).catch(()=>null);
 (await cookies()).delete(adminTokenCookie);
 redirect('/admin/login');
}

export async function saveRecord(resourceKey:string,id:string|null,_:FormState,form:FormData):Promise<FormState>{
 const resource=findAdminResource(resourceKey);
 if(!resource||(!id&&!resource.canCreate))return {message:'This content type cannot be saved here.'};
 const payload:Record<string,unknown>={};
 // Returned with errors so the form keeps what was typed.
 const values:Record<string,string>={};
 for(const field of resource.fields){
  const value=String(form.get(field.name)??'').trim();
  values[field.name]=value;
  if(field.type==='number')payload[field.name]=value===''?null:Number(value);
  else if(field.type==='paragraphs')payload[field.name]=value.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  else if(field.type==='image'){
   const file=form.get(field.name+'_file');
   if(file instanceof File&&file.size>0){
    const upload=new FormData();upload.append('file',file);
    const response=await adminFetch('/uploads',{method:'POST',body:upload});
    if(!response.ok){const state=await failure(response);return {message:state.message,errors:{[field.name]:state.errors?.file??[state.message!]},values}}
    payload[field.name]=values[field.name]=(await response.json() as {url:string}).url;
   }else payload[field.name]=value||null;
  }else payload[field.name]=value===''&&!field.required?null:value;
 }
 const response=await adminFetch(`/${resource.key}${id?'/'+id:''}`,{method:id?'PUT':'POST',body:JSON.stringify(payload)});
 if(!response.ok)return {...await failure(response),values};
 refreshSite();
 redirect(`/admin/${resource.key}?saved=1`);
}

export async function deleteRecord(resourceKey:string,id:string){
 const resource=findAdminResource(resourceKey);
 if(!resource?.canDelete)return;
 const response=await adminFetch(`/${resource.key}/${id}`,{method:'DELETE'});
 if(!response.ok)throw new Error(`Delete failed with HTTP ${response.status}`);
 refreshSite();
 redirect(`/admin/${resource.key}?deleted=1`);
}

export async function saveSocialLinks(_:FormState,form:FormData):Promise<FormState>{
 const labels=form.getAll('label').map(v=>String(v).trim());
 const hrefs=form.getAll('href').map(v=>String(v).trim());
 const value=labels.map((label,i)=>({label,href:hrefs[i]||null})).filter(link=>link.label||link.href);
 const response=await adminFetch('/settings/social_media',{method:'PUT',body:JSON.stringify({value})});
 if(!response.ok)return failure(response);
 refreshSite();
 return {message:'Social links saved.'};
}
