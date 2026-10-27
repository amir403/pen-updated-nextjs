import {cookies} from 'next/headers';
import {apiUrl} from '@/lib/cms';
import {adminTokenCookie} from '@/lib/admin-api';

/** Streams a private volunteer document from the API to the signed-in admin. */
export async function GET(_:Request,{params}:{params:Promise<{id:string;index:string}>}){
 const {id,index}=await params;
 const token=(await cookies()).get(adminTokenCookie)?.value;
 if(!apiUrl||!token)return new Response('Sign in to download documents.',{status:401});
 const response=await fetch(`${apiUrl}/api/submissions/${encodeURIComponent(id)}/files/${encodeURIComponent(index)}`,{cache:'no-store',headers:{Authorization:'Bearer '+token}});
 if(!response.ok)return new Response('Document not available.',{status:response.status});
 return new Response(response.body,{headers:{
  'Content-Type':response.headers.get('content-type')??'application/octet-stream',
  'Content-Disposition':response.headers.get('content-disposition')??'attachment',
  'Cache-Control':'private, no-store',
 }});
}
