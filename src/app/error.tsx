'use client';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col gap-4 w-full mx-2 sm:w-8/12 md:w-6/12 lg:max-w-[30vw]'>
        <h1 className='text-2xl'>Etwas ist schiefgeflaufen!!!</h1>
        <Button onClick={reset} variant={'destructive'}>
          Probier es nochmal
        </Button>
      </div>
    </div>
  );
};
export default ErrorPage;
