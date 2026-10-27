'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Input} from '@/components/ui/input';

const heading=(column:string)=>column.replace(/_label$/,'').replace(/_/g,' ');

export function RecordTable({resourceKey,columns,imageColumns=[],rows}:{resourceKey:string;columns:string[];imageColumns?:string[];rows:{id:string;cells:string[]}[]}){
 const [query,setQuery]=useState('');
 const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const filtered=rows.filter(row=>words.every(word=>row.cells.join(' ').toLowerCase().includes(word)));
 return <>
  <div className="admin-toolbar"><Input type="search" placeholder="Search…" aria-label="Search records" value={query} onChange={event=>setQuery(event.target.value)}/><span role="status">{filtered.length} of {rows.length}</span></div>
  <div className="admin-table-wrap"><table className="admin-table">
   <thead><tr>{columns.map(c=><th key={c} scope="col">{heading(c)}</th>)}<th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
   <tbody>{filtered.map(row=><tr key={row.id}>{row.cells.map((cell,i)=><td key={columns[i]}>{imageColumns.includes(columns[i])&&cell?<img src={cell} alt="" className="admin-thumb" loading="lazy"/>:cell}</td>)}<td><Link href={`/admin/${resourceKey}/${row.id}`}>Edit</Link></td></tr>)}</tbody>
  </table>{filtered.length===0&&<p className="admin-empty">No records match your search.</p>}</div>
 </>;
}
