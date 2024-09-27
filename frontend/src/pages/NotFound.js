import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../assets/styles.css'; // Import a custom CSS file for styling

const NotFound = () => {
  const navigate = useNavigate(); // For navigating back to home

  // Handle the click event for going back to home
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goHome} className="home-btn">
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
