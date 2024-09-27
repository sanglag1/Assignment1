import axios from 'axios';

export const fetchQuizzes = async () => {
  try {
    const response = await axios.get('/quizzes'); // GET request to backend API
    return response.data; // Return the data if successful
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return []; // Returning an empty array in case of an error
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post('/quizzes', quizData); // POST request to backend API
    return response.data; // Return the data if successful
  } catch (error) {
    console.error('Error creating quiz:', error);    
    return null; // Returning null in case of an error
  }
};
