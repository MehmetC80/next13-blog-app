import PostCard from '@/components/post-card';
import prisma from '@/lib/prismadb';

const getPosts = async () => {
  const response = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      tag: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response;
};

const Home = async () => {
  const posts = await getPosts();
  console.log(posts);

  return (
    <main className='grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </main>
  );
};
export default Home;
