import Link from 'next/link';
import {notFound} from 'next/navigation';
import {findAdminResource} from '@/lib/admin-resources';
import {RecordForm} from '@/components/admin/record-form';

type Params={params:Promise<{resource:string}>};

export async function generateMetadata({params}:Params){const resource=findAdminResource((await params).resource);return {title:resource&&'Add '+resource.singular}}

export default async function NewRecord({params}:Params){
 const resource=findAdminResource((await params).resource);
 if(!resource?.canCreate)notFound();
 return <>
  <header className="admin-header"><div><Link href={'/admin/'+resource.key} className="admin-back">← {resource.label}</Link><h1>Add {resource.singular}</h1></div></header>
  <RecordForm resource={resource} id={null} record={{}}/>
 </>;
}
