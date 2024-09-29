'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
     const router = useRouter();
     const [username, setUsername] = useState('');
     const [error, setError] = useState('');

     const handleLogin = () => {
          if (!username.trim()) {
               setError('Username is required');
               return;
          }

          localStorage.setItem('username', username);
          localStorage.setItem('isLoggedIn', 'true');

          router.push('/home');
     };

     return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
               <h1>Login</h1>
               <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
               />
               <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
                    Login
               </button>
               {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
     );
}
