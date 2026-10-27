// Rechecked against https://pen.org.pk/donate-now/ on 19 October 2026.
import {mailtoHref} from '@/lib/site-settings';
export type SponsorshipOption={title:string;amount:number;period:string;icon:string};
export type BankAccount={name:string;number:string;iban:string;swift:string|null};
export type GivingEnquiry={anchor:string;title:string;text:string};
export type DonationSettings={child_title:string;child_amount:number;max_children:number;account_title:string};

/** Icons for sponsorship options; the key is stored with each option. */
export const sponsorshipIcons=['class','school','lab','classroom','washroom','furniture','water','child'] as const;

export const donationSettings:DonationSettings = {child_title:'Sponsor a child',child_amount:30000,max_children:1000,account_title:'Progressive Education Network'};

/** Sponsorship options other than the per-child rate, which the calculator handles separately. */
export const sponsorships:SponsorshipOption[] = [
  {title:'Sponsor a class',amount:600000,period:'per year',icon:'class'},
  {title:'Sponsor a school',amount:6000000,period:'per year',icon:'school'},
  {title:'Support a computer lab',amount:500000,period:'one time',icon:'lab'},
  {title:'Build a classroom',amount:1500000,period:'one time',icon:'classroom'},
  {title:'Build a washroom',amount:1000000,period:'one time',icon:'washroom'},
  {title:'Student bench & desk',amount:15000,period:'per bench & desk',icon:'furniture'},
  {title:'Electric water cooler',amount:150000,period:'each',icon:'water'},
];
export const donationBanks:BankAccount[] = [
  {name:'Samba Bank Limited',number:'2000287237',iban:'PK67SAMB0000002000287237',swift:'SAMBPKKA'},
  {name:'Bank Alfalah Limited',number:'5501-5000450414',iban:'PK19ALFH5501005000450414',swift:null},
];

/** All options as the donation page lists them: the per-child rate first, then the others. */
export function sponsorshipList(settings:DonationSettings,others:SponsorshipOption[]){
  return [{id:'child',title:settings.child_title,amount:settings.child_amount,period:'per year',icon:'child'},...others.map((option,index)=>({...option,id:'option-'+(index+1)}))];
}
export function formatDonationAmount(amount:number) { return amount.toLocaleString('en-US',{maximumFractionDigits:2}); }

export const givingEnquiries:GivingEnquiry[] = [
  {anchor:'teacher-sponsorship',title:'Sponsor a teacher',text:'Discuss support for teacher training, mentoring and professional development.'},
  {anchor:'charitable-gifts',title:'Charitable gifts',text:'Books, stationery, toys or clothes: ask about current needs and agree collection or delivery before sending items.'},
  {anchor:'regular-giving',title:'Regular giving',text:'Explore monthly or regular contributions and arrange payment details directly with PEN.'},
  {anchor:'membership',title:'Membership',text:'Ask about membership opportunities, eligibility, contributions and ways to stay involved.'},
  {anchor:'fundraising',title:'Fundraising',text:'Discuss a community appeal, fundraising event or campaign with the PEN team.'},
  {anchor:'zakat-giving',title:'Zakat giving',text:'Confirm PEN’s Zakat acceptance, allocation and payment arrangements before making a transfer.'},
];
export function givingEnquiryUrl(email:string,subject:string,body='Please share availability, rates and next steps.') {
  return mailtoHref(email,subject,body);
}
// Parse monetary inputs as whole minor units, without accepting partial strings.
export function parseGivingAmount(value:string):number|null {
  if(!/^\d{1,12}(?:\.\d{1,2})?$/.test(value)) return null;
  const [whole,fraction=''] = value.split('.');
  const cents = Number(whole)*100+Number(fraction.padEnd(2,'0'));
  return Number.isSafeInteger(cents)&&cents>0?cents:null;
}
