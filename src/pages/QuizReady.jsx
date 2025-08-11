import { useNavigate } from 'react-router-dom';
import useQuizStore from '../state/QuizStore'
import './Ready.css';

export default function QuizReady() {
  const navigate = useNavigate();
  const { quizData, resetQuiz } = useQuizStore();

  const startQuiz = () => {
    resetQuiz(); // Reset quiz state before starting
    console.log("ready date:",quizData)
    navigate('/quiz');
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
        Your {quizData.length}-question quiz is ready!
      </p>
      <button className="start-button" onClick={startQuiz}>
        START QUIZ
      </button>
      </div>
    </div>
  );
}