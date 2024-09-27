import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Fetch all quizzes
export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes`);
  return response.data;
};

// Fetch quiz by ID
export const getQuizById = async (quizId) => {
  const response = await axios.get(`${API_URL}/quizzes/${quizId}`);
  return response.data;
};

// Create a new quiz
export const createQuiz = async (quizData) => {
  const response = await axios.post(`${API_URL}/quizzes`, quizData);
  return response.data;
};

// Add a question to a quiz
export const addQuestionToQuiz = async (quizId, questionData) => {
  const response = await axios.post(`${API_URL}/quizzes/${quizId}/question`, questionData);
  return response.data;
};
