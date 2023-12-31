'use client';

import {} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { FormInputPost } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tag } from '@prisma/client';
import { TailSpin } from 'react-loader-spinner';

interface DataTags {
  tags: [{ id: string; name: string }];
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Titel ist erforderlich.' }).min(2, {
    message: 'Title muss mindestens aus 2 Zeichen bestehen.',
  }),
  description: z
    .string()
    .min(1, { message: 'Beschreibung ist erforderlich.' })
    .optional(),

  tagId: z.any(),
});

export interface FormEditInput {
  message: string;
  post: {
    id: string;
    title: string;
    description: string;
    tagId: string;
    createdAt: Date;
    updateAt: Date;
  };
}

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
  initialValue?: FormEditInput;
  isLoadingSubmit?: boolean;
}

const FormPost = ({
  submit,
  isEditing,
  initialValue,
  isLoadingSubmit,
}: FormPostProps) => {
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<DataTags>({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get('/api/tags');
      return response.data;
    },
  });

  const router = useRouter();

  const form = useForm<FormInputPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `${isEditing ? initialValue?.post.title : ''}`,
      description: `${isEditing ? initialValue?.post.description : ''}`,
      tagId: `${isEditing ? initialValue?.post.tagId : ''}`,
    },
  });

  // fetch  lists tags

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col items-center justify-center  space-y-8 w-full'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='w-full max-w-lg'>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder='Post Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='w-full max-w-lg'>
              <FormLabel>Post Beschreibung</FormLabel>
              <FormControl>
                <Textarea placeholder='Post Beschreibung...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoadingTags ? (
          'Loading...'
        ) : (
          <FormField
            control={form.control}
            name='tagId'
            render={({ field }) => (
              <FormItem className='w-full max-w-lg'>
                <FormLabel>Kategorien</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(selectedValue) =>
                      field.onChange(selectedValue)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Wähle eine Kategorie' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kategorie</SelectLabel>
                        {dataTags?.tags &&
                          dataTags?.tags?.length > 0 &&
                          dataTags?.tags.map((item: Tag) => {
                            return (
                              <SelectItem value={item.id} key={item.id}>
                                {item.name}
                              </SelectItem>
                            );
                          })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button className='w-full max-w-lg mt-6' type='submit'>
          {isLoadingSubmit && (
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
          )}
          {isEditing
            ? isLoadingSubmit
              ? 'Updating...'
              : 'Bearbeiten'
            : isLoadingSubmit
            ? 'erstellen...'
            : 'Erstellen'}
        </Button>
      </form>
    </Form>
  );
};
export default FormPost;
