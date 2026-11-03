// Job and tender notices are published from the admin panel only; there is no bundled content.
export type Opportunity={type:string;title:string;reference:string|null;category:string|null;location:string|null;closing_date:string|null;summary:string|null;document_url:string|null;apply_url:string|null;is_open:boolean};

export const opportunityTypes=['Job','Tender'] as const;

/** Open notices whose closing date (if any) has not passed, soonest deadline first. */
export function currentOpportunities(items:Opportunity[],today=new Date().toISOString().slice(0,10)){
 return items.filter(item=>item.is_open&&(!item.closing_date||item.closing_date>=today))
  .sort((a,b)=>(a.closing_date??'9999').localeCompare(b.closing_date??'9999'));
}

export const formatClosingDate=(date:string)=>new Date(date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
