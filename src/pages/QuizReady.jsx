import './Ready.css';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function QuizReady() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get quizData from location state
  const quizData = location.state?.quizData;

  // Optional: Add typing animation effect
  useEffect(() => {
    document.title = "Quiz Ready | Quiz AI";
    
    // Redirect if no quiz data is available
    if (!quizData) {
      navigate('/');
    }
  }, [quizData, navigate]);

  const startQuiz = () => {
    navigate('/quiz', { state: { quizData } });
  };

  return (
    <div className="quiz-ready-container">
      <div className="quiz-ready-card">
        <div className="status-indicator">
          <div className="status-light"></div>
          <span>READY</span>
        </div>
        
        <h1 className="ready-title">QUIZ IS READY</h1>
        
        <div className="pulse-animation">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" className="pulse-circle" />
          </svg>
        </div>
        
        <p className="ready-description">
          Your {quizData?.length || 0}-question quiz has been generated successfully.<br />
          Click below to begin the challenge!
        </p>
        
        <button 
          className="start-button"
          onClick={startQuiz}
        >
          START QUIZ
          <span className="button-arrow">→</span>
        </button>
      </div>
    </div>
  );
}