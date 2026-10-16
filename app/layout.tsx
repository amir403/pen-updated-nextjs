import type { Metadata } from 'next';
import './globals.css';
import './theme.css';
import {SiteThemeProvider} from '@/components/site-theme-provider';
export const metadata:Metadata={title:{default:'PEN — Every child deserves a brighter future',template:'%s | Progressive Education Network'},description:'Progressive Education Network supports free quality education in Pakistan through public schools, teacher development and digital learning.',icons:{icon:'/favicon.png',shortcut:'/favicon.png',apple:'/favicon.png'}};
// Browser extensions such as Grammarly inject attributes on body before hydration.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><SiteThemeProvider>{children}</SiteThemeProvider></body></html>}
