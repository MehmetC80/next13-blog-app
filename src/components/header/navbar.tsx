import Image from 'next/image';
import Link from 'next/link';
import PostButton from './post-btn';

const Navbar = () => {
  return (
    <nav className='w-full h-16 flex items-center border-b-2 border-slate-300 px-5'>
      <Link href={'/'}>
        <Image src={'/images/logo.png'} alt='logo' height={40} width={40} />
      </Link>
      <div className='ml-auto'>
        <PostButton />
      </div>
    </nav>
  );
};
export default Navbar;
