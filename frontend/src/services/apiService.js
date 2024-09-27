import axios from 'axios';

export const fetchQuizzes = async () => {
  const response = await axios.get('/quizzes'); // Yêu cầu GET đến API backend
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await axios.post('/quizzes', quizData); // Yêu cầu POST đến API backend
  return response.data;
};
