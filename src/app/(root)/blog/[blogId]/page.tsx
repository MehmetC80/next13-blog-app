import BackButton from '@/components/back-btn';
import ButtonAction from '@/components/button-action';

const BlogDetailPage = () => {
  return (
    <div>
      <BackButton />
      <div className='mb-8'>
        <h2 className='text-2xl font-bold my-4'>Title</h2>
        <ButtonAction />
      </div>
      <p className='text-slate-700'>Content</p>
    </div>
  );
};
export default BlogDetailPage;
