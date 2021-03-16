import React from 'react';
import PropTypes from 'prop-types';
import { getMessage } from '../data/messages.js';
import '../styles.css';

const Summary = ({
  isRequiredFinished,
  handleNextQuiz,
  isFinalQuiz,
  retakeQuiz,
  score,
  questionCount,
  attempts,
  isPerfectScore
}) => {
  return (
    <div className="summary-page">
      <div className="summary">
        <div>
          You got <span className='number'>{score}</span> out of <span className='number'>{questionCount}</span> questions right.
        </div>
        <div>{getMessage()}</div>
        <div>This was attempt number <span className='number'>{attempts}</span></div>
        <div>
        </div>
      </div>
      <div className="button-container">
        {(!isRequiredFinished || (isRequiredFinished && isPerfectScore)) && !isFinalQuiz && (
          <button
            style={{
              marginRight: 10,
            }}
            onClick={() => {
              handleNextQuiz();
            }}
          >
            Next Quiz
          </button>
        )}
        <button onClick={() => retakeQuiz()}>Retake</button>
      </div>
    </div>
  );
};

Summary.propTypes = {
  handleNextQuiz: PropTypes.func.isRequired,
  isFinalQuiz: PropTypes.bool.isRequired,
  isRequiredFinished: PropTypes.bool.isRequired,
  retakeQuiz: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  isPerfectScore: PropTypes.bool.isRequired
};
export default Summary;
