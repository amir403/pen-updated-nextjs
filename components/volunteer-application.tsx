'use client';
import {useRef,useState} from 'react';
import Link from 'next/link';
import {Check,FileText,Upload} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const fields=[
  {id:'name',label:'Name',required:true,autoComplete:'name'},
  {id:'mobile',label:'Mobile number',required:true,type:'tel',autoComplete:'tel'},
  {id:'father-name',label:'Father name',required:true},
  {id:'cnic',label:'CNIC / parent or guardian CNIC',required:true,placeholder:'12345-1234567-1'},
  {id:'email',label:'Email address',required:true,type:'email',autoComplete:'email'},
  {id:'institution',label:'Institution',required:false},
  {id:'degree',label:'Degree',required:false},
];

export function VolunteerApplication(){
  const [files,setFiles]=useState<string[]>([]);const [checked,setChecked]=useState(false);
  const status=useRef<HTMLParagraphElement>(null);
  return <section className="volunteer-application" id="volunteer-application" aria-labelledby="volunteer-form-heading">
    <div className="section-heading"><div><p className="eyebrow"><span/>BECOME A VOLUNTEER</p><h2 id="volunteer-form-heading">Bring your purpose to PEN.</h2><p className="section-intro">Complete the application below. Fields marked * are required.</p></div></div>
    <div className="volunteer-form-layout"><form className="volunteer-form" aria-label="Volunteer application" aria-describedby="volunteer-preview-note" onChange={()=>setChecked(false)} onInput={event=>{const field=event.target;if(field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement)field.setCustomValidity('')}} onReset={()=>{setFiles([]);setChecked(false)}} onSubmit={event=>{
      event.preventDefault();const form=event.currentTarget;
      for(const field of Array.from(form.elements)){if((field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement)&&field.required&&!field.value.trim()){field.setCustomValidity('Please enter a value rather than spaces.');field.reportValidity();return}}
      setChecked(true);requestAnimationFrame(()=>status.current?.focus());
    }}>
      <p className="volunteer-preview-note" id="volunteer-preview-note"><strong>Application preview</strong> Submission is not connected yet. Your details and selected files stay on this page and are not sent or saved.</p>
      <fieldset><legend>Your details</legend><div className="volunteer-fields">{fields.map(field=><div key={field.id}><Label htmlFor={'volunteer-'+field.id}>{field.label}{field.required?' *':' (optional)'}</Label><Input id={'volunteer-'+field.id} name={field.id} type={'type' in field?field.type:'text'} autoComplete={'autoComplete' in field?field.autoComplete:undefined} required={field.required} placeholder={'placeholder' in field?field.placeholder:undefined} maxLength={200}/></div>)}</div><div className="volunteer-address"><Label htmlFor="volunteer-address">Address *</Label><Textarea id="volunteer-address" name="address" autoComplete="street-address" required rows={3} maxLength={500}/></div></fieldset>
      <fieldset><legend>Your documents</legend><p className="volunteer-field-note" id="volunteer-files-help">Select your CNIC copy, passport-size photograph and institution request letter, if applicable. For applicants under 18, use a parent or guardian’s CNIC. You can select multiple PDF, JPG or PNG files.</p><div className="volunteer-file-picker"><Upload size={23} aria-hidden="true"/><Label htmlFor="volunteer-documents">Choose documents</Label><Input id="volunteer-documents" type="file" name="documents" multiple accept=".pdf,.jpg,.jpeg,.png" aria-describedby="volunteer-files-help volunteer-files-status" onChange={event=>setFiles(Array.from(event.target.files||[],file=>file.name))}/></div><p id="volunteer-files-status" className="volunteer-field-note" aria-live="polite">{files.length?`${files.length} ${files.length===1?'file':'files'} selected on this device only.`:'No documents selected.'}</p>{files.length>0&&<ul className="volunteer-file-list">{files.map((file,index)=><li key={file+index}><FileText size={16} aria-hidden="true"/>{file}</li>)}</ul>}</fieldset>
      <div><Label htmlFor="volunteer-message">Message (optional)</Label><Textarea id="volunteer-message" name="message" rows={5} maxLength={2000} placeholder="Tell us about your interests and how you would like to contribute."/></div>
      <div className="volunteer-form-actions"><Button type="submit" className="pen-button">Check application<Check size={17} aria-hidden="true"/></Button><Button type="reset" variant="outline">Clear form</Button></div>
      {checked&&<p className="volunteer-form-status" role="status" tabIndex={-1} ref={status}>Your form has been checked. Submission is not connected yet; your application and documents have not been sent or saved.</p>}
    </form><aside className="volunteer-form-guidance" aria-label="Volunteer application guidance"><p className="eyebrow"><span/>BEFORE YOU APPLY</p><h3>Prepare for your next step.</h3><ul><li>Plan to apply at least three weeks before your proposed start date once submissions open.</li><li>Prepare identification, a passport-size photo and an institution letter where applicable.</li><li>Volunteering is unpaid. Certificates depend on satisfactory completion.</li><li>Follow PEN’s rules, attend regularly and respect organisational confidentiality.</li></ul><p>Have a question? <Link href="/contact-us" className="text-link">Contact the PEN team</Link>.</p></aside></div>
  </section>;
}
