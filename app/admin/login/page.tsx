import {LoginForm} from '@/components/admin/login-form';
import {apiUrl} from '@/lib/cms';

export const metadata={title:'Sign in'};

export default async function LoginPage({searchParams}:{searchParams:Promise<{expired?:string}>}){
 const {expired}=await searchParams;
 return <main className="admin-login"><div className="admin-card">
  <p className="admin-brand">PEN<span>Admin panel</span></p>
  <h1>Sign in</h1>
  {!apiUrl?<p className="admin-alert error">The admin panel needs the Laravel API. Set <code>PEN_API_URL</code> and restart the website.</p>:<>
   {expired&&<p className="admin-alert">Your session has ended. Please sign in again.</p>}
   <LoginForm/>
  </>}
 </div></main>;
}
