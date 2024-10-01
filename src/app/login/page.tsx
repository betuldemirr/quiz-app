'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

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
          <LoginContainer>
               <Title>Login with Username</Title>
               <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
               />
               <JoinButton onClick={handleLogin}>Join Quiz</JoinButton>
               {error && <ErrorMessage>{error}</ErrorMessage>}
          </LoginContainer>

     );
}

const LoginContainer = styled.div`
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 20px;
`

const JoinButton = styled.button`
     background-color: #28a745;
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 20px;
     font-size: 16px;
     cursor: pointer;
`

const Title = styled.h1`
    font-size: 32px;
    color: #333;
`;

const Input = styled.input`
    width: 200px; 
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #28a745;
        outline: none;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
`;