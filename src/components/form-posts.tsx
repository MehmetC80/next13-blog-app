'use client';

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
import { FC } from 'react';

const categories = ['one', 'two', 'three'];

const formSchema = z.object({
  title: z.string().min(1, { message: 'Titel ist erforderlich.' }).min(2, {
    message: 'Title muss mindestens aus 2 Zeichen bestehen.',
  }),
  description: z
    .string()
    .min(1, { message: 'Beschreibung ist erforderlich.' })
    .optional(),

  tag: z.string().refine((tag) => categories.includes(tag)),
});

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
  const router = useRouter();
  const form = useForm<FormInputPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tag: '',
    },
  });

  // const onSubmit = async (data: FormInputPost) => {
  //   console.log(data);
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col items-center justify-center  space-y-8'
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
        <FormField
          control={form.control}
          name='tag'
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
                      {categories.map((category) => {
                        return (
                          <SelectItem key={category} value={category}>
                            {category}
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
        <Button className='w-full max-w-lg mt-6' type='submit'>
          {isEditing ? 'Bearbeiten' : 'Erstellen'}
        </Button>
      </form>
    </Form>
  );
};
export default FormPost;
