import {nav} from '@/lib/content';

// Header menu groups and footer link columns. Links are "Title | /link" lines so a whole menu
// can be edited in one field. The admin panel can override them; these values are the fallback
// and the database seed.
export type NavMenuGroup={label:string;description:string;mega:boolean;overview_href:string|null;links:string[]};
export type FooterColumn={heading:string;links:string[]};

/** The mega menu lists the thematic areas and cross-cutting themes itself, so it has no links here. */
export const navMenu:NavMenuGroup[]=nav.map(group=>({label:group.label,description:group.description,mega:Boolean(group.mega),overview_href:group.overview??null,links:group.mega?[]:group.items.map(item=>item.title+' | '+item.href)}));

export const footerColumns:FooterColumn[]=[
 {heading:'Discover PEN',links:['Our story | /about-us','Our work | /our-work','Our schools | /explore-our-schools','News & stories | /news','Our impact | /impact','Disclosures | /disclosures','Corporate information | /corporate-information']},
 {heading:'Make a difference',links:['Donate now | /donate-now','Become a volunteer | /volunteer','Work with us | /careers','Publications | /publications','FAQs | /faq']},
];

/** Splits a "Title | /link" line; lines without both parts are skipped. */
export function parseLinkLine(line:string){
 const [title,href]=line.split('|').map(part=>part.trim());
 return title&&href?{title,href}:null;
}
