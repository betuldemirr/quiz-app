import { fetchQuizQuestions, Question } from "@/api/quiz";
import { useEffect, useState } from "react";

const Quiz = () => {

     const [questions, setQuestions] = useState<Question[]>([]);
     const [category, setCategory] = useState<string>('general_knowledge');
     const [difficulty, setDifficulty] = useState<string>('easy');

     useEffect(() => {
          const loadQuestions = async () => {
               try {
                    const fetchedQuestions = await fetchQuizQuestions(category, 10, difficulty);
                    setQuestions(fetchedQuestions);
               } catch (error) {
                    console.error('Error loading questions:', error);
               }
          };
          loadQuestions();
     }, [category, difficulty]);

     return (
          <div>
               <h1>Let start the Quiz !!!</h1>
               {questions.map((q, index) => (
                    <div key={index}>
                         <p>{q.question}</p>
                    </div>
               ))}
          </div>
     );

}
export default Quiz;