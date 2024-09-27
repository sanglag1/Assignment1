import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuizList.css';

const QuizList = ({ quizzes, setQuizzes }) => {
  const navigate = useNavigate();

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`http://localhost:3000/api/quizzes/${quizId}`);
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  const handleView = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleEdit = (quizId) => {
    navigate(`/quiz/edit/${quizId}`);
  };

  if (quizzes.length === 0) {
    return <p>No quizzes available. Please add some quizzes.</p>;
  }

  return (
    <div className="quiz-list-container">
      <h2>Available Quizzes</h2>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item">
            <div className="quiz-details">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
            </div>
            <div className="quiz-actions">
              <button className="btn view-btn" onClick={() => handleView(quiz._id)}>
                View
              </button>
              <button className="btn edit-btn" onClick={() => handleEdit(quiz._id)}>
                Edit
              </button>
              <button className="btn delete-btn" onClick={() => handleDelete(quiz._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
