import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook for React Router v6
import './front.css'; // Custom CSS file for styling

const FrontPage = () => {
  const navigate = useNavigate(); // Using useNavigate() instead of useHistory()

  // Navigate to the prediction form when the button is clicked
  const handleMakePredictionClick = () => {
    navigate('/predict'); // Navigate to the '/predict' page
  };

  return (
    <div className="frontpage-container">
      <header className="header-banner">
        <h1>Medical Heart Failure Prediction System</h1>
        <p>Your Health Matters. Get timely predictions for heart failure risk.</p>
      </header>
      
      <div className="main-content">
        <section className="info-section">
          <h2>Welcome to Our Medical Prediction System</h2>
          <p>
            Our system helps in predicting the risk of heart failure based on various patient parameters. 
            By entering the necessary information, you can get an accurate prediction and plan ahead.
          </p>
        </section>

        <div className="button-container">
          <button onClick={handleMakePredictionClick} className="prediction-button">
            Make a Prediction
          </button>
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; 2024 Medical Prediction System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FrontPage;
