import './Loading.css'
import { useEffect, useState } from 'react';

const programmingFacts = [
  "The first computer bug was an actual moth stuck in a Harvard Mark II computer in 1947.",
  "Python was named after Monty Python's Flying Circus, not the snake.",
  "The original JavaScript was written in just 10 days by Brendan Eich in 1995.",
  "There are about 700 programming languages in existence today.",
  "The C programming language was developed at Bell Labs between 1969-1973.",
  "The first computer programmer was Ada Lovelace in the 1840s.",
  "The term 'debugging' comes from Admiral Grace Hopper in the 1940s.",
  "The Apollo 11 moon landing code had less than 2MB of memory.",
  "The QWERTY keyboard layout was designed to slow typists down to prevent jamming.",
  "The first website (info.cern.ch) is still online today."
];

export default function LoadingScreen() {
  const [currentFact, setCurrentFact] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through facts
    const factInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * programmingFacts.length);
      setCurrentFact(programmingFacts[randomIndex]);
    }, 5000);

    // Simulate progress (remove in production)
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 800);

    // Set initial fact
    setCurrentFact(programmingFacts[0]);

    return () => {
      clearInterval(factInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="terminal-loader">
          <div className="terminal-header">
            <div className="terminal-title">QUIZ AI LOADING...</div>
            <div className="terminal-controls">
              <span className="control close"></span>
              <span className="control minimize"></span>
              <span className="control maximize"></span>
            </div>
          </div>
          <div className="terminal-body">
            <div className="fact-display">{currentFact}</div>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="loading-message">
              <span className="blinking-cursor">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}