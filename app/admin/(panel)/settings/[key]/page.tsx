import {notFound} from 'next/navigation';
import {adminGet} from '@/lib/admin-api';
import {findAdminSetting} from '@/lib/admin-resources';
import {staticSiteContent,type SocialLink} from '@/lib/site-content';
import {SettingsForm} from '@/components/admin/settings-form';
import {SocialLinksForm} from '@/components/admin/social-links-form';

type Params={params:Promise<{key:string}>};

export async function generateMetadata({params}:Params){return {title:findAdminSetting((await params).key)?.label}}

export default async function SettingPage({params}:Params){
 const setting=findAdminSetting((await params).key);
 if(!setting)notFound();
 const settings=await adminGet<Record<string,unknown>>('/settings');
 return <>
  <header className="admin-header"><div><h1>{setting.label}</h1><p>{setting.description}</p></div></header>
  {setting.key==='social_media'
   ?<SocialLinksForm links={(settings.social_media as SocialLink[]|undefined)??staticSiteContent.socialMedia}/>
   :<SettingsForm setting={setting} value={(settings[setting.key] as Record<string,unknown>|undefined)??{}}/>}
 </>;
}
