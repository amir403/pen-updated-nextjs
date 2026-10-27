'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,HandHeart,BriefcaseBusiness,Users} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {useSiteContent} from '@/components/site-content-provider';
import {mailtoHref} from '@/lib/site-settings';
import {submitContact,type FormResult} from '@/app/form-actions';

export function ContactForm(){
  const {contact:{email},formsEnabled}=useSiteContent();
  const [topic,setTopic]=useState('General enquiry');const [draft,setDraft]=useState('');
  const [sending,setSending]=useState(false);const [result,setResult]=useState<FormResult|null>(null);
  const draftFor=(fields:FormData)=>{const value=(name:string)=>String(fields.get(name)||'').trim();return mailtoHref(email,topic+': '+value('subject'),`Name: ${value('name')}\nEmail: ${value('email')}\nPhone: ${value('phone')||'Not provided'}\nEnquiry: ${topic}\n\n${value('message')}`)};
  const openDraft=(href:string)=>{setDraft(href);window.location.href=href};
  return <form className="contact-form enquiry-form" id="contact-form" onChange={()=>{setDraft('');setResult(current=>current?.ok?null:current)}} onSubmit={async event=>{
    event.preventDefault();const form=event.currentTarget;const fields=new FormData(form);
    for(const name of ['name','subject','message']){const field=form.elements.namedItem(name) as HTMLInputElement|HTMLTextAreaElement;if(!field.value.trim()){field.setCustomValidity('Please enter a message or value, rather than spaces.');field.reportValidity();return}}
    if(!formsEnabled){openDraft(draftFor(fields));return}
    setSending(true);setDraft(draftFor(fields));
    const response=await submitContact(fields).catch(():FormResult=>({unavailable:true}));
    setSending(false);setResult(response);
    if(response.ok){form.reset();setTopic('General enquiry');setDraft('')}
  }} onInput={event=>{const field=event.target;if(field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement)field.setCustomValidity('')}}>
    <p className="eyebrow"><span/>WRITE TO PEN</p><h2>Start a conversation.</h2><p id="enquiry-help">{formsEnabled?'Your message is sent to the PEN team, who will reply by email. Required fields are marked *.':'This form opens an email draft. Send it from your email app to complete your enquiry. Required fields are marked *.'}</p>
    <div><Label htmlFor="enquiry-topic">What would you like to discuss?</Label><select id="enquiry-topic" name="topic" value={topic} onChange={event=>setTopic(event.target.value)}>{['General enquiry','Partnership','Volunteering','Careers','Donations'].map(value=><option key={value}>{value}</option>)}</select></div>
    <div className="form-row"><div><Label htmlFor="name">Your name *</Label><Input id="name" name="name" required autoComplete="name" placeholder="Full name" maxLength={120}/></div><div><Label htmlFor="email">Email address *</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" maxLength={200}/></div></div>
    <div className="form-row"><div><Label htmlFor="phone">Phone number (optional)</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+92" maxLength={40}/></div><div><Label htmlFor="subject">Subject *</Label><Input id="subject" name="subject" required placeholder="How can we help?" maxLength={180}/></div></div>
    <div><Label htmlFor="message">Your message *</Label><Textarea id="message" name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Tell us a little about your enquiry" aria-describedby="message-help"/><p className="enquiry-field-help" id="message-help">10–2,000 characters. For applications, use the official forms linked below.</p></div>
    {/* Hidden from people; spam bots that fill it are rejected. */}
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <Button type="submit" className="pen-button" aria-describedby="enquiry-help" disabled={sending}>{formsEnabled?(sending?'Sending…':'Send message'):'Open email draft'}<ArrowUpRight size={17} aria-hidden="true"/></Button>
    {result?.ok&&<p role="status" className="form-status">{result.message}</p>}
    {result&&!result.ok&&<div role="alert" className="form-status form-status--error"><p>{result.unavailable?'Your message could not be sent right now.':result.message}</p>{result.errors&&<ul>{Object.values(result.errors).map(messages=><li key={messages[0]}>{messages[0]}</li>)}</ul>}{draft&&<p><a href={draft}>Send it as an email instead</a>.</p>}</div>}
    {!formsEnabled&&draft&&<p role="status" className="form-status">Your draft is ready; it has not been sent by this website. Send it from your email app. <a href={draft}>Open draft again</a>.</p>}
    <a href={mailtoHref(email)} className="enquiry-fallback">Prefer to write directly? {email}</a>
  </form>;
}

export function InvolvementPaths(){const {contact:{email}}=useSiteContent();return <section className="involvement-paths" aria-labelledby="involvement-heading"><div className="section-heading"><div><p className="eyebrow"><span/>FIND YOUR WAY TO HELP</p><h2 id="involvement-heading">Your next step starts here.</h2></div></div><div className="involvement-grid">{[{Icon:HandHeart,title:'Volunteer your time',text:'Read the requirements and apply through PEN’s volunteer form.',href:'/volunteer',label:'Explore volunteering'},{Icon:BriefcaseBusiness,title:'Work with PEN',text:'Prepare your CV and share your experience through the careers form.',href:'/careers',label:'Explore careers'},{Icon:Users,title:'Build a partnership',text:'Tell PEN about your organisation, the support you can offer and the work you would like to explore together.',href:mailtoHref(email,'Partnership enquiry'),label:'Discuss a partnership'}].map(({Icon,title,text,href,label})=><article key={title}><Icon size={28} aria-hidden="true"/><h3>{title}</h3><p>{text}</p><Link href={href} className="text-link">{label}<ArrowUpRight size={16} aria-hidden="true"/></Link></article>)}</div></section>}

export function ApplicationSteps({volunteer}:{volunteer:boolean}){const {formsEnabled}=useSiteContent();return <section className="application-guide" aria-labelledby="application-guide-heading"><div className="section-heading"><div><p className="eyebrow"><span/>HOW TO GET STARTED</p><h2 id="application-guide-heading">A clear path to getting involved.</h2></div></div><ol className="application-steps">{[{title:'Prepare your details',text:volunteer?'Gather your identification, photograph and any applicable institution request letter.':'Have your CV, qualifications, experience and the position you are interested in ready.'},{title:volunteer?(formsEnabled?'Submit the application form':'Try the application form'):'Apply through PEN',text:volunteer?(formsEnabled?'Complete the form on this page and attach your documents. PEN’s team receives your application directly.':'Complete the form on this page and select your documents. Submission will be available once connected.'):'Open the official application form to enter your details and upload the requested documents.'},{title:'Ask your questions',text:'If you need clarification about requirements or opportunities, contact PEN directly.'}].map((step,index)=><li key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.text}</p>{index===2&&<Link href="/contact-us" className="text-link">Contact PEN<ArrowUpRight size={16}/></Link>}</li>)}</ol></section>}
