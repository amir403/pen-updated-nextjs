'use server';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {revalidatePath,updateTag} from 'next/cache';
import {apiUrl} from '@/lib/cms';
import {adminFetch,adminTokenCookie} from '@/lib/admin-api';
import {findAdminResource,findAdminSetting,resourceApiPath,type AdminField} from '@/lib/admin-resources';

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

type Converted={payload:Record<string,unknown>;values:Record<string,string>;error?:FormState};

/**
 * Converts submitted form fields to the API payload. Image files are uploaded first and
 * replaced by their URL. `values` keeps what was typed so a failed save can refill the form.
 */
async function convertFields(fields:AdminField[],form:FormData):Promise<Converted>{
 const payload:Record<string,unknown>={};
 const values:Record<string,string>={};
 for(const field of fields){
  const value=String(form.get(field.name)??'').trim();
  values[field.name]=value;
  if(field.type==='number')payload[field.name]=value===''?null:Number(value);
  else if(field.type==='checkbox'){payload[field.name]=form.get(field.name)==='on';values[field.name]=payload[field.name]?'on':''}
  else if(field.type==='paragraphs')payload[field.name]=value.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  else if(field.type==='lines')payload[field.name]=value.split('\n').map(p=>p.trim()).filter(Boolean);
  else if(field.type==='image'||field.upload){
   const file=form.get(field.name+'_file');
   if(file instanceof File&&file.size>0){
    const upload=new FormData();upload.append('file',file);
    const response=await adminFetch('/uploads',{method:'POST',body:upload});
    if(!response.ok){const state=await failure(response);return {payload,values,error:{message:state.message,errors:{[field.name]:state.errors?.file??[state.message!]},values}}}
    payload[field.name]=values[field.name]=(await response.json() as {url:string}).url;
   }else payload[field.name]=value||null;
  }else payload[field.name]=value===''&&!field.required?null:value;
 }
 return {payload,values};
}

export async function saveRecord(resourceKey:string,id:string|null,_:FormState,form:FormData):Promise<FormState>{
 const resource=findAdminResource(resourceKey);
 if(!resource||(!id&&!resource.canCreate))return {message:'This content type cannot be saved here.'};
 const {payload,values,error}=await convertFields(resource.fields,form);
 if(error)return error;
 const response=await adminFetch(`/${resourceApiPath(resource)}${id?'/'+id:''}`,{method:id?'PUT':'POST',body:JSON.stringify(payload)});
 if(!response.ok)return {...await failure(response),values};
 refreshSite();
 redirect(`/admin/${resource.key}?saved=1`);
}

export async function saveSetting(key:string,_:FormState,form:FormData):Promise<FormState>{
 const setting=findAdminSetting(key);
 if(!setting)return {message:'Unknown setting.'};
 const {payload,values,error}=await convertFields(setting.fields,form);
 if(error)return error;
 const response=await adminFetch('/settings/'+setting.key,{method:'PUT',body:JSON.stringify({value:payload})});
 if(!response.ok){
  const state=await failure(response);
  // Laravel names setting fields "value.<field>"; the form uses the bare field names.
  const errors=state.errors&&Object.fromEntries(Object.entries(state.errors).map(([name,messages])=>[name.replace(/^value\./,''),messages]));
  return {...state,errors,values};
 }
 refreshSite();
 return {message:'Saved. The website has been updated.',values};
}

export async function uploadFile(_:FormState&{url?:string},form:FormData):Promise<FormState&{url?:string}>{
 const file=form.get('file');
 if(!(file instanceof File)||file.size===0)return {message:'Choose a file to upload.',errors:{file:['Choose a file to upload.']}};
 const upload=new FormData();upload.append('file',file);
 const response=await adminFetch('/uploads',{method:'POST',body:upload});
 if(!response.ok)return failure(response);
 return {message:'Uploaded.',url:(await response.json() as {url:string}).url};
}

export async function createUser(_:FormState,form:FormData):Promise<FormState>{
 const values={name:String(form.get('name')??''),email:String(form.get('email')??'')};
 const response=await adminFetch('/users',{method:'POST',body:JSON.stringify({...values,password:form.get('password'),password_confirmation:form.get('password_confirmation')})});
 if(!response.ok)return {...await failure(response),values};
 revalidatePath('/admin/users');
 return {message:`${values.name} can now sign in to the admin panel.`};
}

export async function deleteUser(id:string){
 const response=await adminFetch('/users/'+id,{method:'DELETE'});
 if(!response.ok)throw new Error(`Removing the user failed with HTTP ${response.status}`);
 revalidatePath('/admin/users');
}

export async function changePassword(_:FormState,form:FormData):Promise<FormState>{
 const response=await adminFetch('/auth/password',{method:'PUT',body:JSON.stringify({current_password:form.get('current_password'),password:form.get('password'),password_confirmation:form.get('password_confirmation')})});
 if(!response.ok)return failure(response);
 return {message:'Password changed. Other signed-in sessions have been signed out.'};
}

export async function deleteRecord(resourceKey:string,id:string){
 const resource=findAdminResource(resourceKey);
 if(!resource?.canDelete)return;
 const response=await adminFetch(`/${resourceApiPath(resource)}/${id}`,{method:'DELETE'});
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
