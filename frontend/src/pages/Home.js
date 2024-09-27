import React from 'react';
import QuizList from '../components/QuizList';
import './App.css'; // Import CSS file

const Home = ({ quizzes }) => {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Welcome to Simple Quiz App</h1>
      </header>
      <QuizList quizzes={quizzes} /> {/* Truyền danh sách quizzes */}
      <footer>
        <p>Simple Quiz App © 2024</p>
      </footer>
    </div>
  );
};

export default Home;
