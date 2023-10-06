import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const GET = async () => {
  try {
    const tags = await prisma.tag.findMany();

    if (!tags) {
      return NextResponse.json(
        { message: 'tags konnten nicht gefunden werden' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'tags erfolgreich gefetched', tags },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
