import axios from 'axios';

const API_URL = 'http://localhost:3000/api/quizzes'; // Đảm bảo URL này chính xác

const quizService = {
  // Lấy tất cả quizzes
  getAllQuizzes: async () => {
    const response = await axios.get(API_URL);
    return response.data; // Trả về danh sách quiz
  },

  // Lấy quiz theo ID
  getQuizById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Trả về quiz theo id
  },

  // Tạo quiz mới
  createQuiz: async (quizData) => {
    const response = await axios.post(API_URL, quizData);
    return response.data;
  },

  // Cập nhật quiz
  updateQuiz: async (id, quizData) => {
    const response = await axios.put(`${API_URL}/${id}`, quizData);
    return response.data;
  },

  // Xóa quiz
  deleteQuiz: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default quizService;
