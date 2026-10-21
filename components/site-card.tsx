import type {ComponentProps} from 'react';
import {Slot} from 'radix-ui';
import {Card} from '@/components/ui/card';
import {cn} from '@/lib/utils';

/** Shared shadcn card surface; Slot preserves a link, button or article root. */
export function SiteCard({asChild=false,interactive=false,className,...props}:ComponentProps<'div'>&{asChild?:boolean;interactive?:boolean}){
  const Component=asChild?Slot.Root:Card;
  return <Component data-slot="card" className={cn('site-card',interactive&&'site-card-interactive',className)} {...props}/>;
}
