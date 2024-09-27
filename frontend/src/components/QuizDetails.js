import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; // Import CSS để sử dụng cho styling

const QuizDetails = () => {
  const { quizId } = useParams(); // Lấy quizId từ URL
  const navigate = useNavigate(); // Dùng để điều hướng về danh sách quiz
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // Lưu câu trả lời của người dùng
  const [showResults, setShowResults] = useState(false); // Hiển thị kết quả

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Xử lý lựa chọn câu trả lời
  const handleAnswerChange = (questionId, selectedOptionIndex) => {
    if (!showResults) {
      setAnswers({
        ...answers,
        [questionId]: selectedOptionIndex,
      });
    }
  };

  // Xử lý khi nộp quiz
  const handleSubmit = () => {
    setShowResults(true); // Hiển thị kết quả và khóa lựa chọn
  };

  // Xử lý khi quay lại danh sách quiz
  const handleGoBack = () => {
    navigate('/'); // Quay lại danh sách quiz
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-details-container">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <form>
        {quiz.questions.map((question) => {
          const userAnswer = answers[question._id];
          const isCorrect = userAnswer === question.correctAnswerIndex;
          return (
            <div key={question._id} className="question-block">
              <h3>{question.text}</h3>
              <ul className="options-list">
                {question.options.map((option, index) => (
                  <li key={index}>
                    <label className={showResults && index === question.correctAnswerIndex ? 'correct-answer' : ''}>
                      <input
                        type="radio"
                        name={question._id} // Nhóm các tùy chọn theo câu hỏi
                        value={index}
                        checked={answers[question._id] === index}
                        onChange={() => handleAnswerChange(question._id, index)}
                        disabled={showResults} // Vô hiệu sau khi nộp bài
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              {showResults && (
                <p>
                  {isCorrect ? (
                    <span className="result correct">✔️ Correct</span>
                  ) : (
                    <span className="result wrong">
                      ❌ Wrong (Correct answer: {question.options[question.correctAnswerIndex]})
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
        {!showResults && (
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </form>
      {showResults && (
        <button type="button" className="back-btn" onClick={handleGoBack}>
          Back to Quiz List
        </button>
      )}
    </div>
  );
};

export default QuizDetails;
