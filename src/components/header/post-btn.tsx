'use client';

import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const PostButton = () => {
  return (
    <Link
      href={'/create'}
      className={cn(buttonVariants({ variant: 'outline' }))}
    >
      Post erstellen
    </Link>
  );
};
export default PostButton;
