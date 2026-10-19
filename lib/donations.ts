// Rechecked against https://pen.org.pk/donate-now/ on 19 October 2026.
export const officialDonationUrl = 'https://pen.org.pk/donate-now/';
export const sponsorshipOptions = [
  {id:'child',title:'Sponsor a child',amount:30000,period:'per year'},
  {id:'class',title:'Sponsor a class',amount:600000,period:'per year'},
  {id:'school',title:'Sponsor a school',amount:6000000,period:'per year'},
  {id:'lab',title:'Support a computer lab',amount:500000,period:'one time'},
  {id:'classroom',title:'Build a classroom',amount:1500000,period:'one time'},
  {id:'washroom',title:'Build a washroom',amount:1000000,period:'one time'},
  {id:'bench',title:'Student bench & desk',amount:15000,period:'per bench & desk'},
  {id:'water-cooler',title:'Electric water cooler',amount:150000,period:'each'},
];
export const donationBanks = [
  {name:'Samba Bank Limited',number:'2000287237',iban:'PK67SAMB0000002000287237',swift:'SAMBPKKA'},
  {name:'Bank Alfalah Limited',number:'5501-5000450414',iban:'PK19ALFH5501005000450414',swift:''},
];
export const maximumChildren = 1000;
export function formatDonationAmount(amount:number) { return amount.toLocaleString('en-US',{maximumFractionDigits:2}); }

export const givingEnquiries = [
  {id:'teacher-sponsorship',title:'Sponsor a teacher',text:'Discuss support for teacher training, mentoring and professional development.'},
  {id:'charitable-gifts',title:'Charitable gifts',text:'Books, stationery, toys or clothes: ask about current needs and agree collection or delivery before sending items.'},
  {id:'regular-giving',title:'Regular giving',text:'Explore monthly or regular contributions and arrange payment details directly with PEN.'},
  {id:'membership',title:'Membership',text:'Ask about membership opportunities, eligibility, contributions and ways to stay involved.'},
  {id:'fundraising',title:'Fundraising',text:'Discuss a community appeal, fundraising event or campaign with the PEN team.'},
  {id:'zakat-giving',title:'Zakat giving',text:'Confirm PEN’s Zakat acceptance, allocation and payment arrangements before making a transfer.'},
];
export function givingEnquiryUrl(subject:string,body='Please share availability, rates and next steps.') {
  return 'mailto:info@pen.org.pk?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}
// Parse monetary inputs as whole minor units, without accepting partial strings.
export function parseGivingAmount(value:string):number|null {
  if(!/^\d{1,12}(?:\.\d{1,2})?$/.test(value)) return null;
  const [whole,fraction=''] = value.split('.');
  const cents = Number(whole)*100+Number(fraction.padEnd(2,'0'));
  return Number.isSafeInteger(cents)&&cents>0?cents:null;
}
