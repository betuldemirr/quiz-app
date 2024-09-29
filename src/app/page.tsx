'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Loading...</div>;
}
