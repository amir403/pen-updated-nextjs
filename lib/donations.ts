// Rechecked against https://pen.org.pk/donate-now/ on 19 October 2026.
export const officialDonationUrl = 'https://pen.org.pk/donate-now/';
export const sponsorshipOptions = [
  {id:'child',title:'Sponsor a child',amount:30000,period:'per year'},
  {id:'class',title:'Sponsor a class',amount:600000,period:'per year'},
  {id:'school',title:'Sponsor a school',amount:6000000,period:'per year'},
  {id:'lab',title:'Support a computer lab',amount:500000,period:'one time'},
];
export const donationBanks = [
  {name:'Samba Bank Limited',number:'2000287237',iban:'PK67SAMB0000002000287237',swift:'SAMBPKKA'},
  {name:'Bank Alfalah Limited',number:'5501-5000450414',iban:'PK19ALFH5501005000450414',swift:''},
];
export const maximumChildren = 1000;
export function formatDonationAmount(amount:number) { return amount.toLocaleString('en-US'); }
