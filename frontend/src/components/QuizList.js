import React from 'react';
// Sửa đường dẫn này, nếu App.css nằm trong thư mục src
import '../App.css';  // Truy cập từ thư mục gốc của src

const QuizList = ({ quizzes }) => {
  return (
    <div className="quiz-list">
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <li key={quiz._id} className="quiz-item">
              <a href={`/quiz/${quiz._id}`}>{quiz.title}</a>
            </li>
          ))
        ) : (
          <p>No quizzes available at the moment.</p>
        )}
      </ul>
    </div>
  );
};

export default QuizList;
