import {Site} from '@/components/pen-site';
import {getSiteContent} from '@/lib/cms';
export default async function Home(){return <Site page="home" content={await getSiteContent()}/>}
