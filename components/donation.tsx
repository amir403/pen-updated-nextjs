'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Armchair, ArrowUpRight, BookOpen, Building2, Check, Copy, DoorOpen, Droplets, GraduationCap, Mail, Minus, Plus, School, ShieldCheck, Users} from 'lucide-react';
import {DonationWays} from '@/components/donation-ways';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {images} from '@/lib/content';
import {donationBanks, formatDonationAmount as money, maximumChildren, sponsorshipOptions} from '@/lib/donations';
import {useSiteContent} from '@/components/site-content-provider';

const optionIcons = [GraduationCap,Users,School,BookOpen,Building2,DoorOpen,Armchair,Droplets];

export function Donation() {
  const {site:{donation_url:officialDonationUrl}} = useSiteContent();
  const [mode,setMode] = useState('children');
  const [selectedOther,setSelectedOther] = useState(1);
  const [quantity,setQuantity] = useState('1');
  const [period,setPeriod] = useState('yearly');
  const [copied,setCopied] = useState('');
  const count = Number(quantity);
  const validCount = /^\d+$/.test(quantity) && Number.isSafeInteger(count) && count>=1 && count<=maximumChildren;
  const childMode = mode==='children';
  const valid = !childMode || validCount;
  const option = sponsorshipOptions[childMode?0:selectedOther];
  const yearlyTotal = validCount?count*sponsorshipOptions[0].amount:0;
  const total = childMode?(validCount?(period==='monthly'?yearlyTotal/12:yearlyTotal):null):option.amount;
  const title = childMode?(validCount?`Sponsor ${count===1?'a child':money(count)+' children'}`:'Plan your child sponsorship'):option.title;
  async function copy(value:string) {
    try { await navigator.clipboard.writeText(value);setCopied(value);setTimeout(()=>setCopied(''),2500); }
    catch { window.prompt('Copy bank account details',value); }
  }

  return <section className="section container donation-page">
    <nav className="giving-jump-links" aria-label="Donation sections"><a href="#sponsorship-calculator">Child sponsorship</a><a href="#donation-shop">Donation shop</a><a href="#giving-options">More ways to give</a><a href="#custom-giving">Custom donation</a><a href="#zakat-calculator">Zakat calculator</a><a href="#bank-details">Bank details</a></nav>
    <div className="donation-layout" id="sponsorship-calculator">
      <div><p className="eyebrow"><span/>INVEST IN POSSIBILITY</p><h2>A little support.<br/>A world of possibility.</h2><p className="section-intro">Plan support for one child or many, or explore another way to strengthen a learning community.</p>
        <Tabs value={mode} onValueChange={setMode} className="sponsorship-tabs">
          <TabsList aria-label="Choose your sponsorship"><TabsTrigger value="children">Sponsor children</TabsTrigger><TabsTrigger value="other">Other sponsorships</TabsTrigger></TabsList>
          <TabsContent value="children">
            <div className="sponsorship-calculator">
              <div className="calculator-rate"><GraduationCap size={26} aria-hidden="true"/><div><span>Published child sponsorship</span><strong>PKR {money(sponsorshipOptions[0].amount)} <small>per child / year</small></strong></div></div>
              <fieldset className="calculator-period"><legend>View your estimate</legend><div>
                <label><input type="radio" name="sponsorship-period" value="yearly" checked={period==='yearly'} onChange={()=>setPeriod('yearly')}/><span>Yearly total</span></label>
                <label><input type="radio" name="sponsorship-period" value="monthly" checked={period==='monthly'} onChange={()=>setPeriod('monthly')}/><span>Monthly equivalent</span></label>
              </div></fieldset>
              <div className="calculator-quantity"><label htmlFor="sponsored-children">How many children would you like to support?</label>
                <div className="quantity-stepper"><Button variant="outline" size="icon" aria-label="Support one fewer child" disabled={!validCount||count<=1} onClick={()=>setQuantity(String(count-1))}><Minus size={18} aria-hidden="true"/></Button>
                  <Input id="sponsored-children" type="number" min={1} max={maximumChildren} step={1} inputMode="numeric" value={quantity} onChange={event=>setQuantity(event.target.value)} aria-invalid={!validCount} aria-describedby="children-help"/>
                  <Button variant="outline" size="icon" aria-label="Support one more child" disabled={!validCount||count>=maximumChildren} onClick={()=>setQuantity(String(count+1))}><Plus size={18} aria-hidden="true"/></Button>
                </div>
                <p id="children-help" className={validCount?'calculator-help':'calculator-error'} role={!validCount?'status':undefined}>{validCount?'Choose a number from 1 to 1,000.':'Enter a whole number from 1 to 1,000 to see your estimate.'}</p>
                <div className="quantity-presets" aria-label="Suggested numbers of children">{[1,2,5,10].map(value=><button type="button" key={value} aria-pressed={validCount&&count===value} onClick={()=>setQuantity(String(value))}>{value} {value===1?'child':'children'}</button>)}</div>
              </div>
              <output htmlFor="sponsored-children" className="calculator-inline-total" aria-live="off"><span>Your estimate<small>{period==='monthly'?'Monthly equivalent':'Yearly total'}</small></span><strong>PKR {total===null?'—':money(total)}</strong></output>
              <p className="calculator-explanation">The monthly equivalent is the published annual rate divided by 12: PKR {money(sponsorshipOptions[0].amount/12)} per child. Confirm payment arrangements directly with PEN.</p>
              <a href={officialDonationUrl} target="_blank" rel="noreferrer" className="text-link">See PEN’s published rates<ArrowUpRight size={15} aria-hidden="true"/></a>
            </div>
          </TabsContent>
          <TabsContent value="other"><div className="donation-options">{sponsorshipOptions.slice(1).map((item,index)=>{
            const Icon = optionIcons[index+1];
            return <button type="button" key={item.id} onClick={()=>setSelectedOther(index+1)} className={`donation-option ${selectedOther===index+1?'chosen':''}`} aria-pressed={selectedOther===index+1}>
              <Icon size={24} aria-hidden="true"/><span><strong>{item.title}</strong><span><b>PKR {money(item.amount)}</b> / {item.period}</span></span><span className="radio-mark">{selectedOther===index+1&&<Check size={12} aria-hidden="true"/>}</span>
            </button>;
          })}</div><p className="source-note">Sponsorship amounts published by PEN. Confirm current details before transferring.</p></TabsContent>
        </Tabs>
      </div>
      <aside className="donation-summary" id="sponsorship-estimate" tabIndex={-1} aria-label="Your sponsorship estimate"><img src={images.hero} alt="Children at a PEN-supported school"/><div>
        <span className="small-label">YOUR GENEROSITY. THEIR FUTURE.</span><h3>{title}</h3>
        <p className="donation-amount" aria-live="polite" aria-atomic="true"><span>PKR</span> {total===null?'—':money(total)}</p>
        <p className="donation-period">{childMode?(period==='monthly'?'Monthly equivalent':'Yearly total'):option.period}</p>
        {childMode&&validCount&&<dl className="donation-breakdown"><div><dt>Children to support</dt><dd>{money(count)}</dd></div><div><dt>Annual rate per child</dt><dd>PKR {money(sponsorshipOptions[0].amount)}</dd></div>{period==='monthly'&&<div><dt>Full-year equivalent</dt><dd>PKR {money(yearlyTotal)}</dd></div>}</dl>}
        {valid?<Button asChild className="pen-button"><a href={officialDonationUrl} target="_blank" rel="noreferrer">Continue to PEN donation page<ArrowUpRight size={17} aria-hidden="true"/></a></Button>:<Button className="pen-button" disabled>Enter a valid number of children</Button>}
        <p className="secure-note"><ShieldCheck size={15} aria-hidden="true"/>Payment is completed through PEN’s official channels. Confirm your chosen amount and payment arrangements with PEN; this estimate is not sent to their website.</p>
      </div></aside>
    </div>
    <DonationWays onChoose={index=>{if(index===0)setMode('children');else{setMode('other');setSelectedOther(index);}requestAnimationFrame(()=>{const estimate=document.getElementById('sponsorship-estimate');estimate?.focus({preventScroll:true});estimate?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});}}/>
    <div className="bank-section" id="bank-details"><div className="section-heading"><div><p className="eyebrow"><span/>OTHER WAYS TO GIVE</p><h2>A direct contribution. A real difference.</h2><p className="section-intro">Use PEN’s published bank details or send a cheque in favour of Progressive Education Network.</p></div></div>
      <div className="bank-grid">{donationBanks.map(bank=><div className="bank-card" key={bank.name}><h3>{bank.name}</h3><dl><dt>Account title</dt><dd>Progressive Education Network</dd><dt>Account number</dt><dd>{bank.number}</dd><dt>IBAN</dt><dd className="iban">{bank.iban}</dd>{bank.swift&&<><dt>SWIFT code</dt><dd>{bank.swift}</dd></>}</dl><Button variant="outline" onClick={()=>copy(bank.iban)}>{copied===bank.iban?<Check size={15} aria-hidden="true"/>:<Copy size={15} aria-hidden="true"/>} {copied===bank.iban?'Copied':'Copy IBAN'}</Button></div>)}</div>
      <div className="cheque-note"><Mail size={23} aria-hidden="true"/><p><strong>Prefer to send a cheque?</strong><br/>Address it to Progressive Education Network, 172-A, Ahmad Block, New Garden Town, Lahore 54000.</p><Link className="text-link" href="/contact-us">Need help?<ArrowUpRight size={16} aria-hidden="true"/></Link></div>
    </div>
  </section>;
}
