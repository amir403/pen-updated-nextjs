'use client';
import {useState} from 'react';
import {CalendarDays,X} from 'lucide-react';
import {Calendar} from '@/components/ui/calendar';
import {Popover,PopoverContent,PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

/** "2025-04-15" ⇄ Date in local time, so the picked day never shifts with the time zone. */
const parse=(value:string)=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value);return m?new Date(+m[1],+m[2]-1,+m[3]):undefined};
const iso=(date:Date)=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
/** The website's date style, e.g. "15 April 2025". */
export const longDate=(date:Date)=>date.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

type Common={id:string;name:string;value:string;required?:boolean;invalid?:boolean;describedBy?:string};

/** shadcn date picker (Popover + Calendar) for a date field; submits YYYY-MM-DD. */
export function DatePicker({id,name,value,required,invalid,describedBy}:Common){
 const [date,setDate]=useState(parse(value));
 const [open,setOpen]=useState(false);
 return <div className="admin-date">
  <Popover open={open} onOpenChange={setOpen}>
   <PopoverTrigger asChild>
    <Button id={id} type="button" variant="outline" className="admin-date-trigger" aria-invalid={invalid||undefined} aria-describedby={describedBy}>
     <CalendarDays size={16}/>{date?longDate(date):<span className="admin-date-placeholder">Pick a date</span>}
    </Button>
   </PopoverTrigger>
   <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} defaultMonth={date} captionLayout="dropdown" startMonth={new Date(2005,0)} endMonth={new Date(new Date().getFullYear()+5,11)} onSelect={next=>{setDate(next);setOpen(false)}}/>
   </PopoverContent>
  </Popover>
  {date&&!required&&<Button type="button" variant="ghost" size="icon" aria-label="Clear date" onClick={()=>setDate(undefined)}><X size={16}/></Button>}
  <input type="hidden" name={name} value={date?iso(date):''}/>
 </div>;
}

/**
 * Free-text date label (e.g. "15 April 2025" or "Student stories") with a calendar that writes the
 * picked day in the website's date style. The label stays editable for non-date labels.
 */
export function DateLabelInput({id,name,value,required,invalid,describedBy}:Common){
 const [label,setLabel]=useState(value);
 const [open,setOpen]=useState(false);
 const parsed=Date.parse(label);
 const selected=Number.isNaN(parsed)?undefined:new Date(parsed);
 return <div className="admin-date">
  <Input id={id} name={name} value={label} onChange={event=>setLabel(event.target.value)} required={required} aria-invalid={invalid||undefined} aria-describedby={describedBy}/>
  <Popover open={open} onOpenChange={setOpen}>
   <PopoverTrigger asChild><Button type="button" variant="outline" size="icon" aria-label="Pick a date"><CalendarDays size={16}/></Button></PopoverTrigger>
   <PopoverContent className="w-auto p-0" align="end">
    <Calendar mode="single" selected={selected} defaultMonth={selected} captionLayout="dropdown" startMonth={new Date(2005,0)} endMonth={new Date(new Date().getFullYear()+1,11)}
     onSelect={next=>{if(next)setLabel(longDate(next));setOpen(false)}}/>
   </PopoverContent>
  </Popover>
 </div>;
}
