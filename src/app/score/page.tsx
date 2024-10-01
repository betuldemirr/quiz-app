"use client";

import { useSearchParams } from "next/navigation";
import styled from "styled-components";

const Score = () => {
     const searchParams = useSearchParams();
     const score = searchParams.get('score');
     const total = searchParams.get('total');

     return (
          <ScoreContainer style={{ textAlign: 'center', padding: '50px' }}>
               <h1>Quiz Completed!</h1>
               <p>Your Score: {score}/{total}</p>
               <HomeButton onClick={() => window.location.href = '/'}>Go to Home</HomeButton>
          </ScoreContainer>
     );
}
export default Score;

const ScoreContainer = styled.div`
     width: %100;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 20px;
`;

const HomeButton = styled.button`
     background-color: #28a745;
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 15px;
     font-size: 16px;
     cursor: pointer;
     transition: background-color 0.3s ease;

     &:hover {
          background-color: #218838;
     }
`;