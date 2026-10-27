'use client';
import {SiteCard} from '@/components/site-card';

import {useState} from 'react';
import {ArrowUpRight, Gift} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {formatDonationAmount as money, givingEnquiries, givingEnquiryUrl as enquiryUrl, parseGivingAmount, sponsorshipOptions} from '@/lib/donations';
import {useSiteContent} from '@/components/site-content-provider';

export function DonationWays({onChoose}: {onChoose:(index:number)=>void}) {
  const {contact} = useSiteContent();
  const givingEnquiryUrl = (subject:string,body?:string) => enquiryUrl(contact.email,subject,body);
  const [custom,setCustom] = useState('');
  const [currency,setCurrency] = useState('PKR');
  const [frequency,setFrequency] = useState('One-time');
  const [wealth,setWealth] = useState('');
  const [nisab,setNisab] = useState('');
  const [eligible,setEligible] = useState(false);
  const customCents = parseGivingAmount(custom);
  const wealthCents = parseGivingAmount(wealth);
  const nisabCents = parseGivingAmount(nisab);
  const zakatReady = wealthCents!==null&&nisabCents!==null&&eligible;
  const zakatCents = zakatReady&&wealthCents>=nisabCents?Math.round(wealthCents/40):null;
  const customBody = customCents===null?'':`I would like to discuss a ${frequency.toLowerCase()} contribution of ${currency} ${money(customCents/100)}. Please confirm accepted currency, availability and payment arrangements.`;

  return <>
    <section className="giving-section" id="donation-shop" aria-labelledby="donation-shop-heading">
      <p className="eyebrow"><span/>DONATION SHOP</p><h2 id="donation-shop-heading">Choose a way to make a difference.</h2><p className="section-intro">Explore PEN’s published sponsorship options. Select an item to review its estimate above.</p>
      <div className="giving-shop-grid">{sponsorshipOptions.map((item,index)=><SiteCard asChild interactive key={item.id}><button type="button" className="giving-shop-card" key={item.id} onClick={()=>onChoose(index)}>
        <Gift size={23} aria-hidden="true"/><strong>{item.title}</strong><span className="giving-shop-price">PKR {money(item.amount)}</span><span>{item.period}</span><span className="text-link">Review this option<ArrowUpRight size={15} aria-hidden="true"/></span>
      </button></SiteCard>)}</div>
    </section>
    <section className="giving-section" id="giving-options" aria-labelledby="giving-options-heading">
      <p className="eyebrow"><span/>MORE WAYS TO GIVE</p><h2 id="giving-options-heading">Bring your support to the conversation.</h2><p className="section-intro">These options are open for enquiries. Availability, rates and arrangements will be confirmed by PEN.</p>
      <div className="giving-enquiry-grid">{givingEnquiries.map(item=><SiteCard asChild key={item.id}><article className="giving-enquiry-card" id={item.id} key={item.id}>
        <span className="giving-status">By enquiry</span><h3>{item.title}</h3><p>{item.text}</p><a href={givingEnquiryUrl(item.title+' enquiry')} aria-label={'Enquire about '+item.title} className="text-link">Enquire with PEN<ArrowUpRight size={15} aria-hidden="true"/></a>
      </article></SiteCard>)}</div>
      <p className="source-note">Enquiry links open an email draft; send it from your email app to contact PEN.</p>
    </section>
    <section className="giving-section giving-tools" aria-label="Donation planning tools">
      <div className="giving-tool" id="custom-giving">
        <p className="eyebrow"><span/>YOUR CHOICE</p><h2>Plan a custom donation.</h2><p>Choose your preferred amount, currency and frequency, then ask PEN to confirm the payment options.</p>
        <label htmlFor="giving-currency">Preferred currency</label><select id="giving-currency" value={currency} onChange={event=>setCurrency(event.target.value)}>{['PKR','USD','GBP','EUR','AED'].map(code=><option key={code}>{code}</option>)}</select>
        <label htmlFor="giving-custom-amount">Donation amount</label><Input id="giving-custom-amount" type="number" min="0.01" step="0.01" inputMode="decimal" value={custom} onChange={event=>setCustom(event.target.value)} aria-invalid={custom!==''&&customCents===null} aria-describedby="custom-amount-help"/>
        <p className="calculator-help" id="custom-amount-help">Enter a positive amount with up to two decimal places.</p>
        <label htmlFor="giving-frequency">Frequency</label><select id="giving-frequency" value={frequency} onChange={event=>setFrequency(event.target.value)}><option>One-time</option><option>Monthly</option><option>Yearly</option></select>
        <p className="giving-tool-note">No currency conversion or automatic recurring payment is performed. PEN will confirm accepted currencies and arrangements.</p>
        {customCents!==null?<Button asChild className="pen-button"><a href={givingEnquiryUrl('Custom donation enquiry',customBody)}>Prepare donation enquiry<ArrowUpRight size={16} aria-hidden="true"/></a></Button>:<Button className="pen-button" disabled>Enter your donation amount</Button>}
      </div>
      <div className="giving-tool" id="zakat-calculator">
        <p className="eyebrow"><span/>ZAKAT PLANNING</p><h2>Estimate your Zakat.</h2><p>Use your assessed zakatable wealth and a current nisab threshold in PKR. Check eligibility and deductible liabilities with the guidance you follow.</p>
        <label htmlFor="zakat-wealth">Net zakatable wealth (PKR)</label><Input id="zakat-wealth" type="number" min="0.01" step="0.01" value={wealth} onChange={event=>setWealth(event.target.value)} aria-invalid={wealth!==''&&wealthCents===null}/>
        <label htmlFor="zakat-nisab">Current nisab threshold (PKR)</label><Input id="zakat-nisab" type="number" min="0.01" step="0.01" value={nisab} onChange={event=>setNisab(event.target.value)} aria-invalid={nisab!==''&&nisabCents===null} aria-describedby="nisab-help"/><p className="calculator-help" id="nisab-help">Enter a current gold- or silver-based threshold from a source you trust; no market rate is assumed here.</p>
        <label className="zakat-confirm"><input type="checkbox" checked={eligible} onChange={event=>setEligible(event.target.checked)}/>I have confirmed the relevant lunar-year and eligibility conditions.</label>
        <output className="zakat-result" aria-live="polite">{!zakatReady?'Enter valid amounts and confirm eligibility to see an estimate.':zakatCents===null?'Your entered wealth is below your entered nisab.':`Estimated Zakat: PKR ${money(zakatCents/100)}`}</output>
        <p className="giving-tool-note">This planning estimate uses 2.5% of the full entered net wealth when it meets the entered nisab. Confirm your individual obligations and PEN’s Zakat arrangements before donating. Amounts entered here are not sent to a server.</p>
        <a href="https://islamic-relief.org/zakat-calculator/" target="_blank" rel="noreferrer" className="text-link">Read Zakat calculation guidance<ArrowUpRight size={15} aria-hidden="true"/></a>
        <a href={givingEnquiryUrl('Zakat giving enquiry')} className="text-link">Ask PEN about Zakat giving<ArrowUpRight size={15} aria-hidden="true"/></a>
      </div>
    </section>
  </>;
}
