'use server';
import {headers} from 'next/headers';
import {apiUrl} from '@/lib/cms';

export type FormResult={ok?:boolean;message?:string;errors?:Record<string,string[]>;unavailable?:boolean};

/** Sends a website form to the Laravel API with the visitor's IP for its rate limit. */
async function relay(path:string,body:FormData):Promise<FormResult>{
 if(!apiUrl)return {unavailable:true};
 const request=await headers();
 const clientIp=request.get('x-forwarded-for')?.split(',')[0]?.trim()||request.get('x-real-ip')||'';
 let response:Response;
 try{
  response=await fetch(apiUrl+'/api/forms/'+path,{method:'POST',cache:'no-store',body,headers:{Accept:'application/json',...(process.env.PEN_FORMS_KEY?{'X-Forms-Key':process.env.PEN_FORMS_KEY,'X-Client-IP':clientIp}:{})}});
 }catch{return {unavailable:true}}
 if(response.status===429)return {message:'Too many submissions from your connection. Please try again in a few minutes.'};
 const result=await response.json().catch(()=>({})) as {message?:string;errors?:Record<string,string[]>};
 if(response.ok)return {ok:true,message:result.message};
 if(response.status===422)return {message:'Please check the highlighted details.',errors:result.errors};
 return {unavailable:true};
}

const text=(form:FormData,name:string)=>String(form.get(name)??'').trim();

export async function submitContact(form:FormData):Promise<FormResult>{
 const body=new FormData();
 for(const name of ['topic','name','email','phone','subject','message','website'])body.append(name,text(form,name));
 return relay('contact',body);
}

export async function submitVolunteer(form:FormData):Promise<FormResult>{
 const body=new FormData();
 // Form field ids use hyphens; the API uses snake_case.
 for(const [field,name] of [['name','name'],['mobile','mobile'],['father-name','father_name'],['cnic','cnic'],['email','email'],['institution','institution'],['degree','degree'],['address','address'],['message','message'],['website','website']])body.append(name,text(form,field));
 form.getAll('documents').forEach(file=>{if(file instanceof File&&file.size>0)body.append('documents[]',file,file.name)});
 const result=await relay('volunteer',body);
 // Map API names back to the form's field ids for error display.
 if(result.errors)result.errors=Object.fromEntries(Object.entries(result.errors).map(([name,messages])=>[name.replace('father_name','father-name').replace(/^documents\..*/,'documents'),messages]));
 return result;
}
