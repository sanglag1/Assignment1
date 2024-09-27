import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const QuizEdit = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({ title: '', description: '' });
  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
      setQuiz(response.data);
    };
    fetchQuiz();
  }, [quizId]);
  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/quizzes/${quizId}`, quiz);
      alert('Quiz updated!');
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={quiz.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={quiz.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};
export default QuizEdit;