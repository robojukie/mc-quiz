import React, { useState, useEffect } from 'react';
import Question from './Question';
import Summary from './Summary';
import '../styles.css';

const Quiz = ({
  title,
  questions,
  handleNextQuiz,
  isRequiredFinished,
  sumScoreAndTotal,
  isFinalQuiz,
  isPerfectScore,
  updateIsRequiredDone
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // variables to be displayed in summary
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [answerStatus, setAnswerStatus] = useState('');

  useEffect(() => {
    setScore(0);
    setAttempts(1);
    setIsFinished(false);
  }, [title]);

  function handleNextQuestion() {
    setAnswerStatus('');
    setIsAnswered(false);
    if (currentQuestionIndex + 1 >= questions.length) {
      sumScoreAndTotal(score, questions.length);
      updateIsRequiredDone(true);
      setIsFinished(true);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    
  }

  function handleAnswered(selectedAnswer) {
    setIsAnswered(true);

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setAnswerStatus('Correct!');
      setScore(score + 1);
    } else {
      setAnswerStatus('Incorrect...');
    }
  }

  function handleRetake() {
    setAnswerStatus('');
    setScore(0);
    setAttempts(attempts + 1);
    // on a retake, we want to subtract score and question count that was just added while taking quiz
    sumScoreAndTotal(-score, -questions.length)
    updateIsRequiredDone(false);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
  }

  return (
    <div className="quiz">
      {<h2>{title}</h2>}
      {!isFinished
        ? questions && (
            <div>
              <Question
                handleAnswered={handleAnswered}
                text={questions[currentQuestionIndex].text || ''}
                answerOptions={questions[currentQuestionIndex].allAnswers || []}
                correctAnswer={questions[currentQuestionIndex].correctAnswer}
                isAnswered={isAnswered}
                answerStatus={answerStatus}
                handleNextQuestion={handleNextQuestion}
              />
            </div>
          )
        : (
            <Summary
              handleNextQuiz={handleNextQuiz}
              sumScoreAndTotal={sumScoreAndTotal}
              isFinalQuiz={isFinalQuiz}
              isRequiredFinished={isRequiredFinished}
              isPerfectScore={isPerfectScore}
              retakeQuiz={handleRetake}
              score={score}
              questionCount={questions && questions.length}
              attempts={attempts}
            />
          )}
    </div>
  );
};

export default Quiz;
