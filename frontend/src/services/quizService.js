import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Fetch all quizzes
export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error; // Re-throw the error if you want to handle it elsewhere
  }
};

// Fetch quiz by ID
export const getQuizById = async (quizId) => {
  try {
    const response = await axios.get(`${API_URL}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz with ID ${quizId}:`, error);
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${API_URL}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

// Add a question to a quiz
export const addQuestionToQuiz = async (quizId, questionData) => {
  try {
    const response = await axios.post(`${API_URL}/quizzes/${quizId}/question`, questionData);
    return response.data;
  } catch (error) {
    console.error(`Error adding question to quiz with ID ${quizId}:`, error);
    throw error;
  }
};
