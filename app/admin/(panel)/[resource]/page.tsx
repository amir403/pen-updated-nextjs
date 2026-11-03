import Link from 'next/link';
import {notFound} from 'next/navigation';
import {adminGet} from '@/lib/admin-api';
import {findAdminResource,resourceApiPath} from '@/lib/admin-resources';
import {RecordTable} from '@/components/admin/record-table';

type Params={params:Promise<{resource:string}>;searchParams:Promise<{saved?:string;deleted?:string}>};

export async function generateMetadata({params}:Params){return {title:findAdminResource((await params).resource)?.label}}

const cell=(value:unknown)=>value==null?'':typeof value==='boolean'?(value?'Yes':'No'):Array.isArray(value)?value.join(', '):String(value);

export default async function ResourceList({params,searchParams}:Params){
 const resource=findAdminResource((await params).resource);
 if(!resource)notFound();
 const {saved,deleted}=await searchParams;
 const rows=await adminGet<Record<string,unknown>[]>('/'+resourceApiPath(resource));
 return <>
  <header className="admin-header"><div><h1>{resource.label}</h1><p>{resource.description}</p></div>
   {resource.canCreate&&<Link href={`/admin/${resource.key}/new`} className="admin-button">Add {resource.singular}</Link>}
  </header>
  {saved&&<p className="admin-alert success" role="status">Saved. The website has been updated.</p>}
  {deleted&&<p className="admin-alert success" role="status">Deleted. The website has been updated.</p>}
  <RecordTable resourceKey={resource.key} columns={resource.columns} imageColumns={resource.fields.filter(f=>f.type==='image').map(f=>f.name)} rows={rows.map(row=>({id:String(row.id),cells:resource.columns.map(c=>cell(row[c]))}))}/>
 </>;
}
