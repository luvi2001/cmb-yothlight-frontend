'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.replace('/super-admin');
    } else {
      router.replace('/sign-in?error=google_login_failed');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-600">Completing login, please wait...</p>
    </div>
  );
}
