import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Use Router if your App uses routing

test('renders the main header', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const headerElement = screen.getByText(/welcome to simple quiz app/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders quiz list', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const quizListElement = screen.getByText(/available quizzes/i); // Check for the quiz list header
  expect(quizListElement).toBeInTheDocument();
});

