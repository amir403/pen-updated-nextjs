'use client';
import {createContext,useContext} from 'react';
import {staticSiteContent,type SiteContent} from '@/lib/site-content';

const SiteContentContext=createContext<SiteContent>(staticSiteContent);

export function SiteContentProvider({content,children}:{content:SiteContent;children:React.ReactNode}){return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>}

export function useSiteContent(){return useContext(SiteContentContext)}
