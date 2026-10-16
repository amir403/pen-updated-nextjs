'use client';

import {useSyncExternalStore} from 'react';
import {useTheme} from 'next-themes';
import {Moon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const {resolvedTheme, setTheme} = useTheme();
  const dark = mounted && resolvedTheme === 'dark';
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  return <Button variant="ghost" size="icon" className="theme-toggle" aria-label={label} title={label} disabled={!mounted} onClick={() => setTheme(dark ? 'light' : 'dark')}>
    {dark ? <Sun size={19} aria-hidden="true"/> : <Moon size={19} aria-hidden="true"/>}
  </Button>;
}
