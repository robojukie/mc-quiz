import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles.css';

const Question = ({
  handleAnswered,
  handleNextQuestion,
  text,
  answerOptions,
  correctAnswer,
  answerStatus,
  isAnswered,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  function handleSelectedAnswer(selected) {
    setSelectedAnswer(selected);
  }
  return (
    <div className="question-container">
      <h3 className="question">{text}</h3>
      <div className="answers">
        {answerOptions &&
          answerOptions.map((answer, i) => {
            return (
              <li
                className={`answer-option ${
                  isAnswered && answer === correctAnswer && 'correct'
                } ${
                  isAnswered &&
                  answer === selectedAnswer &&
                  answer !== correctAnswer &&
                  'incorrect'
                } ${isAnswered && 'disabled'}
                `}
                type="A"
                key={i}
              >
                <button 
                  disabled={isAnswered}
                  onClick={() => {
                  handleSelectedAnswer(answer);
                  handleAnswered(answer);
                }}>{answer}</button>
              </li>
            );
          })}
      </div>
      <div className={`answer-status ${
          isAnswered &&
          answerStatus === 'Incorrect...' &&
          'incorrect'
        }`}>{answerStatus}
      </div>
      <div className="button-container">
        <button
          disabled={!isAnswered}
          className="next-question"
          onClick={() => {
            handleNextQuestion();
          }}
        >
          Next ?
        </button>
      </div>
    </div>
  );
};

Question.propTypes = {
  handleAnswered: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  answerStatus: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired,

};
export default Question;
