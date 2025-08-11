import { useNavigate, useLocation } from 'react-router-dom';
import useQuizStore from '../state/QuizStore';
import './Result.css';

export default function QuizResults() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, quizData, resetQuiz } = useQuizStore();
  
  // Fallback to location state if store is empty
  const finalScore = score || state?.score || 0;
  const totalQuestions = quizData.length || state?.totalQuestions || 0;
  const percentage = Math.round((finalScore / totalQuestions) * 100);

  const getResultEmoji = () => {
    if (percentage >= 90) return '🎯';
    if (percentage >= 70) return '🎉';
    if (percentage >= 50) return '👍';
    return '🤔';
  };

  const getResultColor = () => {
    if (percentage >= 90) return 'text-emerald-400';
    if (percentage >= 70) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleRestart = () => {
    resetQuiz();
    navigate('/');
  };

  const handleReview = () => {
    navigate('/quiz', { state: { reviewMode: true } });
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <div className="results-header">
          <h1 className="results-title">Quiz Completed!</h1>
          <div className={`results-percentage ${getResultColor()}`}>
            {percentage}% {getResultEmoji()}
          </div>
        </div>

        <div className="results-score">
          <div className="score-circle">
            <span className="score-text">
              {finalScore}<span className="score-divider">/</span>{totalQuestions}
            </span>
          </div>
        </div>

        <div className="results-feedback">
          {percentage >= 90 && (
            <p className="feedback-text">Outstanding! You're a quiz master!</p>
          )}
          {percentage >= 70 && percentage < 90 && (
            <p className="feedback-text">Great job! You know your stuff!</p>
          )}
          {percentage >= 50 && percentage < 70 && (
            <p className="feedback-text">Good effort! Keep learning!</p>
          )}
          {percentage < 50 && (
            <p className="feedback-text">Keep practicing! You'll get better!</p>
          )}
        </div>

        <div className="results-stats">
          <div className="stat-item">
            <span className="stat-label">Correct</span>
            <span className="stat-value correct">{finalScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Incorrect</span>
            <span className="stat-value incorrect">{totalQuestions - finalScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{percentage}%</span>
          </div>
        </div>

        <div className="results-actions">
          <button 
            className="action-btn primary"
            onClick={handleRestart}
          >
            Start New Quiz
          </button>
          <button 
            className="action-btn secondary"
            onClick={handleReview}
          >
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
}