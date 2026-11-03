/** Lowercase words joined by hyphens, as the API expects for URL slugs and section links. */
export function slugify(text:string,max=60){
 const slug=text.normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase()
  .replace(/['’‘`]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
 // Cut at a word boundary where possible so the slug never ends mid-word or with a hyphen.
 if(slug.length<=max)return slug;
 const cut=slug.slice(0,max+1);
 return (cut.lastIndexOf('-')>max/2?cut.slice(0,cut.lastIndexOf('-')):slug.slice(0,max)).replace(/-+$/,'');
}
