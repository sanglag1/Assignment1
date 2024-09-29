import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import { Link } from 'react-router-dom';
import '../styles/QuizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        alert("An error occurred while fetching quizzes. Please try again.");
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await quizService.deleteQuiz(id);
        setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== id)); // Cập nhật danh sách sau khi xóa
      } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("An error occurred while deleting the quiz. Please try again.");
      }
    }
  };

  return (
    <div className="quiz-list">
      <h2>Quizzes</h2>
      <Link to="/quizzes/create">Create Quiz</Link>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
            <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
