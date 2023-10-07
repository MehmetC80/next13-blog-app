import { FC } from 'react';

import BackButton from '@/components/back-btn';
import ButtonAction from '@/components/button-action';
import prisma from '@/lib/prismadb';
import { Badge } from '@/components/ui/badge';

interface BlogDetailPageProps {
  params: {
    blogId: string;
  };
}

const getPost = async (blogId: string) => {
  const response = await prisma.post.findFirst({
    where: {
      id: blogId,
    },
    select: {
      tag: true,
      description: true,
      title: true,
      id: true,
    },
  });
  return response;
};

const BlogDetailPage: FC<BlogDetailPageProps> = async ({
  params: { blogId },
}) => {
  const post = await getPost(blogId);

  return (
    <div>
      <BackButton />
      <div className='flex flex-col'>
        <div className=' flex mb-8 gap-4 w-full items-center'>
          <h2 className='text-2xl font-bold my-4'>{post?.title}</h2>
          <Badge>{post?.tag.name}</Badge>
        </div>
        <p className='text-slate-700 mb-5'>{post?.description}</p>
        <ButtonAction id={blogId} />
      </div>
    </div>
  );
};
export default BlogDetailPage;
