'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Pencil, Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });

  return (
    <div>
      <Link
        href={'/edit/id'}
        className={cn(buttonVariants({ variant: 'outline' }), 'mr-2 text-md')}
      >
        <Pencil className='mr-1' /> Bearbeiten
      </Link>
      <Button variant={'destructive'} onClick={() => deletePost()}>
        {isLoading && (
          <span className=''>
            <TailSpin
              height='40'
              width='40'
              color='#4fa94d'
              ariaLabel='tail-spin-loading'
              radius='1'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
            )
          </span>
        )}
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <Trash />
            Löschen
          </>
        )}
      </Button>
    </div>
  );
};
export default ButtonAction;
