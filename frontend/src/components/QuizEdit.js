import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; // Thêm đường dẫn đến file CSS

const QuizEdit = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({ title: '', description: '', questions: [] });
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', ''], correctAnswerIndex: 0 });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quizzes/${quizId}`); // Đổi sang cổng 3000
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({ text: '', options: ['', ''], correctAnswerIndex: 0 }); // Reset input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/quizzes/${quizId}`, quiz); // Đổi sang cổng 3000
      alert('Quiz updated!');
      navigate('/'); // Điều hướng về trang danh sách quiz
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className="quiz-edit-container">
      <h2>Edit Quiz</h2>
      <form onSubmit={handleSubmit} className="quiz-edit-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <h3>Add Question</h3>
          <label>Question Text:</label>
          <input
            type="text"
            name="text"
            value={newQuestion.text}
            onChange={handleNewQuestionChange}
            required
          />
          <label>Options:</label>
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const options = [...newQuestion.options];
                options[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options });
              }}
              required
            />
          ))}
          <button type="button" onClick={() => {
            const options = [...newQuestion.options, ''];
            setNewQuestion({ ...newQuestion, options });
          }}>Add Option</button>
          <label>Correct Answer Index:</label>
          <input
            type="number"
            name="correctAnswerIndex"
            value={newQuestion.correctAnswerIndex}
            onChange={handleNewQuestionChange}
            min="0"
            max={newQuestion.options.length - 1}
            required
          />
          <button type="button" onClick={handleAddQuestion}>Add Question</button>
        </div>
        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default QuizEdit;
