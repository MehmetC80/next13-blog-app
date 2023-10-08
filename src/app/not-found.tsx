import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl'>Diese Seite wurde nicht gefunden</h1>
        <Link
          href={'/'}
          className='text-gray-500 text-md hover:underline duration-300'
        >
          Zurück zur startseite
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
