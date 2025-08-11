import './Quiz.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();
  
  // Get quizData from location state
  const location = useLocation();
  const quizData = location.state?.quizData || [];

  // If no quiz data, redirect back
  if (quizData.length === 0) {
    navigate('/');
    return null;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (currentQuestion.options[optionIndex] === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswered) return;
    
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      navigate('/quiz-results', { state: { score, totalQuestions } });
    }
  };

  const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="score-display">
          <span className="score-label">SCORE</span>
          <span className="score-value">{score}/{totalQuestions}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="question-count">
          QUESTION {currentQuestionIndex + 1}/{totalQuestions}
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedOption === index 
                  ? option === currentQuestion.answer 
                    ? 'correct' 
                    : 'incorrect'
                  : isAnswered && option === currentQuestion.answer 
                    ? 'correct' 
                    : ''
              }`}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {isAnswered && (
        <div className="feedback-section">
          <button 
            className="next-button"
            onClick={handleNextQuestion}
          >
            {isLastQuestion ? 'SEE RESULTS' : 'NEXT QUESTION'}
            <span className="button-icon">→</span>
          </button>
        </div>
      )}
    </div>
  );
}