import axios from "axios";

const BASE_URL = "https://the-trivia-api.com/api/questions";

export interface Question {
     question: string,
     correctAnswer: string,
     incorrectAnswers: string[],
}

export const fetchQuizQuestions = async (category: string, limit: number, difficulty: string): Promise<Question[]> => {
     try {
          const response = await axios.get(BASE_URL, {
               params: {
                    categories: category,
                    limit: limit,
                    difficulty: difficulty,
               },
          });

          console.log("response:", response.data);

          return response.data;
     } catch (error: any) {
          throw new Error(`Error fetching questions: ${error.message}`);
     }
}