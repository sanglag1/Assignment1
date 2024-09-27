import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css'; // Thêm đường dẫn đến file CSS nếu cần

const QuizCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', ''], correctAnswerIndex: 0 });
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, newQuestion]);
    setNewQuestion({ text: '', options: ['', ''], correctAnswerIndex: 0 }); // Reset input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { title, description, questions };
    try {
      await axios.post('http://localhost:3000/api/quizzes', quizData);
      alert('Quiz created!');
      navigate('/'); // Điều hướng về trang danh sách quiz
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="quiz-create-container">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <h3>Add Question</h3>
          <input
            type="text"
            placeholder="Question Text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            required
          />
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
          <button type="button" onClick={() => setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] })}>
            Add Option
          </button>
          <input
            type="number"
            placeholder="Correct Answer Index"
            value={newQuestion.correctAnswerIndex}
            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswerIndex: e.target.value })}
            min="0"
            max={newQuestion.options.length - 1}
            required
          />
          <button type="button" onClick={handleAddQuestion}>Add Question</button>
        </div>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizCreate;
