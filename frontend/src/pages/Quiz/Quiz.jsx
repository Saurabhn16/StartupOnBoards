import React, { useState, useEffect } from "react";
import quizData from "./quiz.json";
import "./Quiz.css";

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [quizStarted, timeLeft, showResults]);

  useEffect(() => {
    if (showResults) {
      let newScore = 0;
      quizData.forEach((question, index) => {
        if (question.correctAnswer === userAnswers[index]) {
          newScore++;
        }
      });
      setScore(newScore);
    }
  }, [showResults, userAnswers]);

  const handleAnswerSelect = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = () => {
    setShowResults(true); // Set showResults to true to display the quiz results
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h2 className="section-heading">
          Benefits of the Innovation IQ Assessment
        </h2>
        <button className="start-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
        <div className="quiz-section">
          {/* First section */}
          <div className="quiz-details">
            <img
              src="https://www.thestartupboard.com/assets/images/elements/access-to-startup.svg"
              alt="Access to Startup"
              className="quiz-image"
            />
            <div className="benefits-card">
              <ul>
                <li>
                  <b>Score : </b> is a numeric score between 0 and 100, given to
                  a technology venture after assessment on key parameters. A
                  report is also generated alongside to give impartial
                  guidelines of your strength and areas of improvement, with
                  specific action items. This assessment (score and report) is
                  automatic without human intervention. The innovation quotient
                  is arrived at through the analysis by a mentor.
                </li>
                <li>
                  <strong>Personalized Insights:</strong> Understand your
                  strengths and areas for improvement in innovation.
                </li>
                <li>
                  <strong>Benchmark Your Skills:</strong> Compare your
                  innovation skills against industry standards.
                </li>
                <li>
                  <strong>Professional Growth:</strong> Identify opportunities
                  for personal and professional development.
                </li>
              </ul>
              <p className="action-text">
                Take the first step towards mastering innovation today!
              </p>
            </div>
          </div>
          {/* Second section */}
          <div className="quiz-details">
            <div className="benefits-card">
              <ul>
                <li>
                  <strong>Career Advancement:</strong> Leverage your innovation
                  skills to boost your career prospects.
                </li>
                <li>
                  <strong>Comprehensive Feedback:</strong> Receive detailed
                  feedback on your performance to guide your learning journey.
                </li>
                <li>
                  <strong>Fun and Engaging:</strong> Experience a well-designed,
                  user-friendly quiz that makes learning enjoyable.
                </li>
              </ul>
              <p className="action-text">
                Take the first step towards mastering innovation today!
              </p>
            </div>
            <img
              src="https://www.thestartupboard.com/assets/images/elements/access-to-startup.svg"
              alt="Access to Startup"
              className="quiz-image"
            />
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-container">
        <h2 className="section-heading">Quiz Results</h2>
        <p className="result-text">
          Your score: {score} / {quizData.length}
        </p>
        {quizData.map((question, index) => (
          <div key={index} className="result-card">
            <h3>{question.question}</h3>
            <p>Your answer: {userAnswers[index]}</p>
            <p>Correct answer: {question.correctAnswer}</p>
            <p
              className={
                userAnswers[index] === question.correctAnswer
                  ? "correct-answer"
                  : "incorrect-answer"
              }
            >
              {userAnswers[index] === question.correctAnswer
                ? "Correct"
                : "Incorrect"}
            </p>
          </div>
        ))}
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="timer">Time left: {formatTime(timeLeft)}</div>
      
      <div className="question-card">
        <h3>{currentQuestion.question}</h3>
        
        <div className="options">
          {currentQuestion.options.map((option) => (
            <div key={option} className="option">
              <button
                className={`option-button ${userAnswers[currentQuestionIndex] === option ? "selected" : ""}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
        
        <button
          className="next-button"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex >= quizData.length - 1}
        >
          {currentQuestionIndex < quizData.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
      
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Quiz;
