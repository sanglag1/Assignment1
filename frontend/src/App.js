import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getQuizzes } from './services/quizService';
import QuizList from './components/QuizList';

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
          <Route path="/" element={<QuizList quizzes={quizzes} />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
