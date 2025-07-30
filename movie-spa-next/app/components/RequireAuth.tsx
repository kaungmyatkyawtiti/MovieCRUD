'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectAuthToken } from '@/lib/features/auth/authSlice';
import Loading from '../loading';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAppSelector(selectAuthToken);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return <Loading />;
  }

  return <>{children}</>;
}
