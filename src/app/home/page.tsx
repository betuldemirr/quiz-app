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
          <HomeContainer>
               <h1>Welcome, {username}!</h1>
               <StartButton onClick={handleStartQuiz}>
                    Start Quiz
               </StartButton>
               <LogoutButton onClick={handleLogout}>
                    Logout
               </LogoutButton>
          </HomeContainer>
     );
}

const HomeContainer = styled.div`
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 20px;
`

const StartButton = styled.button`
     background-color: #28a745;
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 20px;
     font-size: 16px;
     cursor: pointer;
`

const LogoutButton = styled.button`
     background-color: #bababa;
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 20px;
     font-size: 16px;
     cursor: pointer;
`