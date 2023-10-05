'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Pencil, Trash } from 'lucide-react';

const ButtonAction = () => {
  return (
    <div>
      <Link
        href={'/edit/id'}
        className={cn(buttonVariants({ variant: 'outline' }), 'mr-2 text-md')}
      >
        <Pencil className='mr-1' /> Bearbeiten
      </Link>
      <Button variant={'destructive'}>
        <Trash />
        Löschen
      </Button>
    </div>
  );
};
export default ButtonAction;
