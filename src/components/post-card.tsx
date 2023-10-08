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
import { FC } from 'react';
import { Tag } from '@prisma/client';
import { Badge } from './ui/badge';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    tag: Tag;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Card className='w-full bg-base-100 shadow-xl border' key={post.id}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>

      <CardFooter className='flex justify-between'>
        <Badge variant='default'>{post.tag.name}</Badge>

        <Link
          href={`/blog/${post.id}`}
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
