'use client';

import BackButton from '@/components/back-btn';
import FormPost from '@/components/form-posts';
import { FormInputPost } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';

const CreatePage = () => {
  const router = useRouter();
  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
    console.log(data);
  };

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post('/api/posts/create', newPost);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <div>
      <BackButton />
      <h1 className='text-2xl my-4 font-bold text-center'>Post hinzufügen</h1>
      <FormPost submit={handleCreatePost} isEditing={false} />
    </div>
  );
};
export default CreatePage;
