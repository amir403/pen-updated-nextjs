import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'PEN — Every child deserves a brighter future',template:'%s | Progressive Education Network'},description:'Progressive Education Network supports free quality education in Pakistan through public schools, teacher development and digital learning.',icons:{icon:'/favicon.png',shortcut:'/favicon.png',apple:'/favicon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
