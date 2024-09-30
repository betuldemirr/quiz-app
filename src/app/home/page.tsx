'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

     const handleStartQuiz = () => {
          router.push('/quiz');
     };

     return (
          <Container>
               <h1>Welcome, {username}!</h1>
               <button onClick={handleStartQuiz} style={{ padding: '10px 20px', margin: '20px 0', fontSize: '18px' }}>
                    Quiz Başla
               </button>
               <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
                    Logout
               </button>
          </Container>
     );
}

const Container = styled.div`
     display: 'flex';
     flex-direction: 'column';
     align-items: 'center';
     justify-content: 'center';
     height: '100vh';
`