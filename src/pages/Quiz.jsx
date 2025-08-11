import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../state/QuizStore';

export default function Quiz() {
  const navigate = useNavigate();
  const {
    quizData,
    currentQuestionIndex,
    score,
    selectedOption,
    isAnswered,
    selectOption,
    nextQuestion
  } = useQuizStore();

  if (quizData.length === 0) {
    navigate('/');
    return null;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      navigate('/result');
    } else {
      nextQuestion();
    }
  };

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
            onClick={() => selectOption(index)}
            disabled={isAnswered}
          >
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