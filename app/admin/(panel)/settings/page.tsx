import {adminGet} from '@/lib/admin-api';
import {staticSiteContent,type SocialLink} from '@/lib/site-content';
import {SocialLinksForm} from '@/components/admin/social-links-form';

export const metadata={title:'Social links'};

export default async function Settings(){
 const settings=await adminGet<{social_media?:SocialLink[]}>('/settings');
 return <>
  <header className="admin-header"><div><h1>Social links</h1><p>Profiles listed in the website footer. Leave a link empty to show the profile as “Coming soon”.</p></div></header>
  <SocialLinksForm links={settings.social_media??staticSiteContent.socialMedia}/>
 </>;
}
