'use client';

import {ThemeProvider} from 'next-themes';
import type {ReactNode} from 'react';

export function SiteThemeProvider({children}: {children: ReactNode}) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="pen-theme" disableTransitionOnChange>{children}</ThemeProvider>;
}
