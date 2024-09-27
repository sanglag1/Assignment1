import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const QuizDetails = () => {
  const { quizId } = useParams(); // Get the quizId from the URL
  const navigate = useNavigate(); // For navigating back to the quiz list
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // To store user's selected answers
  const [showResults, setShowResults] = useState(false); // To show quiz results
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);
  // Handle answer selection
  const handleAnswerChange = (questionId, selectedOptionIndex) => {
    if (!showResults) {
      setAnswers({
        ...answers,
        [questionId]: selectedOptionIndex
      });
    }
  };
  // Handle quiz submission
  const handleSubmit = () => {
    setShowResults(true); // Show results and disable selection
  };
  // Handle going back to the quiz list
  const handleGoBack = () => {
    navigate('/'); // Navigate back to the quiz list
  };
  if (!quiz) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <form>
        {quiz.questions.map((question) => {
          const userAnswer = answers[question._id];
          const isCorrect = userAnswer === question.correctAnswerIndex;
          return (
            <div key={question._id} className="question-block">
              <h3>{question.text}</h3>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        name={question._id} // Group options by question
                        value={index}
                        checked={answers[question._id] === index}
                        onChange={() => handleAnswerChange(question._id, index)}
                        disabled={showResults} // Disable selection after submission
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              {/* Show answer feedback right after the question */}
              {showResults && (
                <p>
                  {isCorrect ? (
                    <span style={{ color: 'green' }}>✔️ Correct</span>
                  ) : (
                    <span style={{ color: 'red' }}>
                      ❌ Wrong (Correct answer: {question.options[question.correctAnswerIndex]})
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
        {!showResults && (
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </form>
      {showResults && (
        <button type="button" onClick={handleGoBack}>
          Back to Quiz List
        </button>
      )}
    </div>
  );
};
export default QuizDetails;