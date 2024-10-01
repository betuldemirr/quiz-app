"use client"

import { fetchQuizQuestions, Question } from "@/services/api/quiz";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Quiz = () => {
     const [questions, setQuestions] = useState<Question[]>([]);
     const searchParams = useSearchParams();
     const category = searchParams.get('category') || 'general_knowledge';
     const difficulty = searchParams.get('difficulty') || 'easy';

     const [selectedOption, setSelectedOption] = useState<string>('');
     const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
     const [options, setOptions] = useState<string[]>([]);
     const [timeLeft, setTimeLeft] = useState<number>(5);
     const [score, setScore] = useState<number>(0);
     const [error, setError] = useState<string | null>(null);

     const router = useRouter();

     useEffect(() => {
          const loadQuestions = async () => {
               try {
                    const fetchedQuestions = await fetchQuizQuestions(category, 10, difficulty);
                    setQuestions(fetchedQuestions);
                    console.log("Fetched Questions:", fetchedQuestions);
                    setError(null);
               } catch (error) {
                    console.error('Error loading questions:', error);
                    setError("There was an error loading the questions. Please try again later.");
               }
          };
          loadQuestions();
     }, [category, difficulty]);

     useEffect(() => {
          if (questions.length > 0) {
               const question = questions[currentQuestionIndex];
               const answers = [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5);

               setOptions(answers);
               setSelectedOption('');
               setTimeLeft(5);

               const timer = setInterval(() => {
                    setTimeLeft((prevTime) => {
                         if (prevTime <= 1) {
                              clearInterval(timer);
                              handleSubmit();
                              return 0;
                         }
                         return prevTime - 1;
                    });
               }, 1000);

               return () => clearInterval(timer);
          }
     }, [questions, currentQuestionIndex]);


     const handleSubmit = () => {
          if (timeLeft <= 0 || !selectedOption) {
               if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
               } else {
                    handleFinish();
               }
               return;
          }

          if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
               setScore(prevScore => prevScore + 1);
          }

          if (currentQuestionIndex < questions.length - 1) {
               setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          } else {
               handleFinish();
          }
     };

     const handleFinish = () => {
          router.push(`/score?score=${score}&total=${questions.length}`);
     };

     console.log("Current Index:", currentQuestionIndex);
     console.log("Total Questions:", questions.length);

     return (
          <QuizContainer>
               {error && <ErrorMessage>{error}</ErrorMessage>}
               {questions.length > 0 && (
                    <div>
                         <QuestionTitle>{questions[currentQuestionIndex].question}</QuestionTitle>
                         <Timer>Time left: {timeLeft} seconds</Timer>
                         <ButtonContainer>
                              {options.map((option, index) => (
                                   <OptionButton key={index} onClick={() => setSelectedOption(option)} disabled={timeLeft === 0} isSelected={selectedOption === option}>
                                        {option}
                                   </OptionButton>
                              ))}
                              {currentQuestionIndex < questions.length - 1 ? (
                                   <SubmitButton onClick={handleSubmit} disabled={!selectedOption || timeLeft === 0}>
                                        Submit
                                   </SubmitButton>
                              ) : (
                                   <SubmitButton onClick={handleFinish} disabled={!selectedOption || timeLeft === 0}>
                                        Finish
                                   </SubmitButton>
                              )}
                         </ButtonContainer>
                    </div>

               )}
          </QuizContainer>
     );
}

export default Quiz;

const QuizContainer = styled.div`
     width: 100%;
     height: 100vh;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     background-color: #f8f9fa;
`;

const QuestionTitle = styled.h2`
     font-size: 24px;
     margin-bottom: 20px;
     color: #343a40;
`;

const ErrorMessage = styled.h2`
     font-size: 24px;
     margin-bottom: 20px;
     color: #dc3545;
`;

const Timer = styled.p`
     font-size: 18px;
     color: #dc3545;
`;

const ButtonContainer = styled.div`
     display: flex;
     flex-direction: row;
     justify-content: flex-start;
     align-items: center;
     gap: 20px;
`;

const OptionButton = styled.button<{ disabled: boolean; isSelected: boolean }>`
     background-color: ${(props) =>
          props.isSelected ? "#0056b3" : props.disabled ? "#e9ecef" : "#50a5ff"};
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 15px;
     font-size: 16px;
     cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
     transition: background-color 0.3s ease;

     &:hover {
          background-color: ${(props) =>
          props.isSelected ? "#003d80" : props.disabled ? "#e9ecef" : "#0056b3"};
     }
`;

const SubmitButton = styled.button`
     background-color: #28a745;
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 15px;
     font-size: 16px;
     cursor: pointer;
     transition: background-color 0.3s ease;

     &:disabled {
          background-color: #e9ecef;
          cursor: not-allowed;
     }

     &:hover:not(:disabled) {
          background-color: #218838;
     }
`;
