'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

interface TanstackProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const TanstackProvider: FC<TanstackProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default TanstackProvider;
