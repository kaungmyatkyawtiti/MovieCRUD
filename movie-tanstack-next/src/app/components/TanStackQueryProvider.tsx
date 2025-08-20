'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '../hooks/queryClient';

export default function TanStackQueryProvider({ children }: { children: ReactNode }) {
  const [qClient] = useState(queryClient);

  return (
    <QueryClientProvider client={qClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
