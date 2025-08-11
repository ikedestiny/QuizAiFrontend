import { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import QuizReady from './QuizReady';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [quizParams, setQuizParams] = useState({
        type: 'MATHS',
        numberOfQuestions: 10,
        level: 'EASY'
    });
    const [quizData, setQuizData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizParams(prev => ({
            ...prev,
            [name]: name === 'numberOfQuestions' ? parseInt(value) : value
        }));
    };

    const generateQuiz = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/quiz/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: quizParams.type,
                    numberOfQuestions: quizParams.numberOfQuestions,
                    level: quizParams.level
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setQuizData(data); // Store the quiz data
            setIsReady(true);  // Mark as ready
        } catch (error) {
            console.error('Error generating quiz:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading screen while generating
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Show quiz ready screen when data is available
    if (isReady && quizData) {
        navigate('/ready', { state: { quizData: quizData } });
    }

    // Default view - quiz parameter selection
    return (
        <div className="app-container">
            <div className="quiz-controls">
                <h1 className="app-title">QUIZ AI</h1>
                
                <div className="control-group">
                    <label htmlFor="TYPE" className="input-label">QUIZ TYPE</label>
                    <select 
                        id="TYPE" 
                        name="type" 
                        className="styled-select"
                        value={quizParams.type}
                        onChange={handleInputChange}
                    >
                        <option value="MATHS">MATHS</option>
                        <option value="POLITICS">POLITICS</option>
                        <option value="MUSIC">MUSIC</option>
                        <option value="FOOTBALL">FOOTBALL</option>
                        <option value="TRIVIA">TRIVIA</option>
                    </select>
                </div>

                <div className="control-group">
                    <h2 className="section-title">NUMBER OF QUESTIONS</h2>
                    <input 
                        type="number" 
                        min="1" 
                        max="20" 
                        name="numberOfQuestions"
                        value={quizParams.numberOfQuestions}
                        onChange={handleInputChange}
                        className="styled-input" 
                    />
                </div>

                <div className="control-group">
                    <label htmlFor="diff" className="input-label">DIFFICULTY</label>
                    <select 
                        name="difficulty" 
                        id="diff" 
                        className="styled-select"
                        value={quizParams.difficulty}
                        onChange={handleInputChange}
                    >
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>
                </div>

                <button 
                    className="generate-btn" 
                    onClick={generateQuiz}
                    disabled={isLoading}
                >
                    GENERATE!
                </button>
            </div>
        </div>
    );
}

export default Home;