import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface ContextProps {
  params: {
    postId: string;
  };
}

export const DELETE = async (req: Request, context: ContextProps) => {
  try {
    await prisma.post.delete({
      where: {
        id: context.params.postId,
      },
    });

    // because it is a delete finction we can not use NextResponse.json()
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const PATCH = async (req: Request, context: ContextProps) => {
  const body = await req.json();
  try {
    await prisma.post.update({
      where: {
        id: context.params.postId,
      },
      data: {
        title: body.title,
        description: body.description,
        tagId: body.tagId,
      },
    });

    // because it is a delete finction we can not use NextResponse.json()
    return NextResponse.json(
      { message: 'Update erfolgreich' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
