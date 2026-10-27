import Link from 'next/link';
import {notFound} from 'next/navigation';
import {adminFetch} from '@/lib/admin-api';
import {findAdminResource,resourceApiPath} from '@/lib/admin-resources';
import {RecordForm} from '@/components/admin/record-form';
import {DeleteButton} from '@/components/admin/delete-button';

type Params={params:Promise<{resource:string;id:string}>};

export async function generateMetadata({params}:Params){const resource=findAdminResource((await params).resource);return {title:resource&&'Edit '+resource.singular}}

export default async function EditRecord({params}:Params){
 const {resource:key,id}=await params;
 const resource=findAdminResource(key);
 if(!resource)notFound();
 const response=await adminFetch(`/${resourceApiPath(resource)}/${encodeURIComponent(id)}`);
 if(response.status===404)notFound();
 if(!response.ok)throw new Error(`Admin API failed with HTTP ${response.status}`);
 const record=(await response.json() as {data:Record<string,unknown>}).data;
 return <>
  <header className="admin-header"><div><Link href={'/admin/'+resource.key} className="admin-back">← {resource.label}</Link><h1>{String(record[resource.titleField]??'Edit '+resource.singular)}</h1>{resource.key==='pages'&&<p>/{String(record.slug)}</p>}</div>
   {resource.canDelete&&<DeleteButton resourceKey={resource.key} id={id} label={resource.singular}/>}
  </header>
  <RecordForm resource={resource} id={id} record={record}/>
 </>;
}
