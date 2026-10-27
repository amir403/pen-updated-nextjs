import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {apiUrl} from '@/lib/cms';

export const adminTokenCookie='pen_admin_token';

/** Calls the Laravel API with the signed-in admin's token. Redirects to the login page when the token is missing or rejected. */
export async function adminFetch(path:string,init:RequestInit={}){
 const token=(await cookies()).get(adminTokenCookie)?.value;
 if(!apiUrl||!token)redirect('/admin/login');
 const response=await fetch(apiUrl+'/api'+path,{...init,cache:'no-store',headers:{Accept:'application/json',Authorization:'Bearer '+token,...(init.body&&!(init.body instanceof FormData)?{'Content-Type':'application/json'}:{}),...init.headers}});
 if(response.status===401)redirect('/admin/login?expired=1');
 return response;
}

export async function adminGet<T>(path:string):Promise<T>{
 const response=await adminFetch(path);
 if(!response.ok)throw new Error(`Admin API ${path} failed with HTTP ${response.status}`);
 return (await response.json() as {data:T}).data;
}
