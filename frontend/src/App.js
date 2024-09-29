import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QuizList from './components/QuizList';
import QuizDetails from './components/QuizDetails';
import QuizCreate from './components/QuizCreate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:quizId" element={<QuizDetails />} />
        <Route path="/quizzes/create" element={<QuizCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
