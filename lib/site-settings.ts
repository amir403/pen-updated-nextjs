// Contact details and site-wide links as published on the website (rechecked 20 October 2026).
// The admin panel can override them; these values are the fallback and the database seed.
export type ContactDetails={email:string;phones:string[];whatsapp:string[];address:string[]};
export type SiteOptions={topbar_text:string;footer_tagline:string;video_url:string;donation_url:string;careers_url:string};
export type Office={title:string;address:string[];map_url:string|null};

export const contactDetails:ContactDetails={
 email:'info@pen.org.pk',
 phones:['+92 42 3584 2554','+92 42 3584 7711'],
 whatsapp:['+92 349 4443736','+92 345 0055422'],
 address:['172-A, Ahmad Block,','New Garden Town, Lahore 54000'],
};

export const siteOptions:SiteOptions={
 topbar_text:'Opening doors through education, since 2005.',
 footer_tagline:'Every child deserves the chance\nto learn. Every future matters.',
 video_url:'https://www.youtube.com/watch?v=AzbJMPYcaV0',
 donation_url:'https://pen.org.pk/donate-now/',
 careers_url:'https://pen.org.pk/careers/',
};

export const offices:Office[]=[
 {title:'Head office · Lahore',address:['172-A, Ahmad Block, New Garden Town,','Lahore 54000, Pakistan'],map_url:'https://www.google.com/maps/search/?api=1&query=Progressive+Education+Network+172-A+Lahore'},
 {title:'Regional office · Karachi',address:['Plot No. C117, Sector 31, Mehran Town Extension,','Korangi Industrial Area, Karachi'],map_url:'https://www.google.com/maps/search/?api=1&query=Progressive+Education+Network+Mehran+Town+Karachi'},
];

const digits=(value:string)=>value.replace(/\D/g,'');
export const telHref=(phone:string)=>'tel:'+(phone.trim().startsWith('+')?'+':'')+digits(phone);
export const whatsappHref=(phone:string)=>'https://wa.me/'+digits(phone);
export const mailtoHref=(email:string,subject?:string,body?:string)=>'mailto:'+email+(subject?'?subject='+encodeURIComponent(subject)+(body?'&body='+encodeURIComponent(body):''):'');

/** Embed URL for a YouTube watch, share or embed link; null for anything else. */
export function youtubeEmbedUrl(url:string){
 const id=url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1];
 return id?`https://www.youtube.com/embed/${id}?autoplay=1`:null;
}
