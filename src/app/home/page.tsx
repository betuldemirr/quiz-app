// src/app/home/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
     const router = useRouter();
     const [username, setUsername] = useState('');

     useEffect(() => {
          const storedUsername = localStorage.getItem('username');
          const isLoggedIn = localStorage.getItem('isLoggedIn');

          if (!isLoggedIn || !storedUsername) {
               router.push('/login');
          } else {
               setUsername(storedUsername);
          }
     }, [router]);

     const handleLogout = () => {
          localStorage.removeItem('username');
          localStorage.removeItem('isLoggedIn');
          router.push('/login');
     };

     return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100vh' }}>
               <h1>Welcome, {username}!</h1>

               <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
                    Logout
               </button>
          </div>
     );
}
