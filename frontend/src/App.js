import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getQuizzes } from './services/quizService';
import QuizList from './components/QuizList';
import QuizCreate from './components/QuizCreate'; // Nhập component tạo quiz
import NotFound from './pages/NotFound';
import Home from './pages/Home'; // Nhập Home

function App() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const data = await getQuizzes();
      setQuizzes(data);
    }
    fetchQuizzes();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Quiz App</h1>
        <Routes>
          <Route path="/" element={<Home quizzes={quizzes} />} /> {/* Hiển thị Home */}
          <Route path="/create" element={<QuizCreate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
