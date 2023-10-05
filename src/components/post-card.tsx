'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { cn } from '@/lib/utils';

const PostCard = () => {
  return (
    <Card className='w-full bg-base-100 shadow-xl border'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>

      <CardFooter className='flex justify-between'>
        <Link
          href={'/blog/1'}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'hover:underline'
          )}
        >
          Details...
        </Link>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
