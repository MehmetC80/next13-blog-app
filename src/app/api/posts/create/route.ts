import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { title, description, tagId } = body;

    if (!title || !description || !tagId) {
      return NextResponse.json(
        { message: 'Engaben fehler oder sind fehlerhaft' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        description: description,
        tagId: tagId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
