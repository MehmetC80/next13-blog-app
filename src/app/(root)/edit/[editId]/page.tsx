'use client';

import { FC } from 'react';
import FormPost from '@/components/form-posts';
import { FormInputPost } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

import { SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

interface EditPostPageProps {
  params: {
    editId: string;
  };
}

const EditPostPage: FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();

  const { data: dataPost, isLoading } = useQuery<FormInputPost>({
    queryKey: ['posts', params.editId],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${params.editId}
      `);
      return response.data;
    },
  });

  const { mutate: editPost, isLoading: updateLoading } = useMutation({
    mutationFn: (updatePost: FormInputPost) => {
      return axios.patch(`/api/posts/${params.editId}`, updatePost);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });

  console.log(dataPost);

  const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
    editPost(data);
  };

  if (isLoading) {
    return (
      <span className='flex justify-center items-center h-[calc(100vh-6rem)] '>
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
      </span>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center  h-[calc(100vh-16rem)] w-full'>
      <h1 className='text-2xl font-bold text-center'>Post bearbeiten</h1>
      <FormPost submit={handleEditPost} initialValue={dataPost!} isEditing />
    </div>
  );
};
export default EditPostPage;
