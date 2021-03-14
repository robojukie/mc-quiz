import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getQuizzes } from './data/quizzes';
import { getMessage } from './data/messages';
import './styles.css';

const App = () => {

  const [ quizzes, setQuizzes ] = useState([]);
  const [ currentQuizIndex, setCurrentQuizIndex ] = useState(0);
  
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ isFinished, setIsFinished ] = useState(false);
  const [ answerStatus, setAnswerStatus ] = useState('');
  const [ score, setScore ] = useState(0);
  const [ attemptCount, setAttemptCount ] = useState(0);
  const [ chosenAnswers, setChosenAnswers ] = useState([])

  useEffect(() => {
    function shuffleAnswers(answers) {
      let currentIndex = answers.length, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]]

      }
      return answers
    }

    const fetchQuizzes = async () => {
      await getQuizzes()
        .then((response) => response)
        .then((quizData) => {
          let updatedQuizzes = [];

          quizData.forEach((quiz) => {
            let updatedQuestions = [];

            quiz.questions.forEach((question) => {
              let allAnswers = [...question.incorrectAnswers, question.correctAnswer]
              const { text, correctAnswer } = question
              updatedQuestions.push({
                text: text,
                correctAnswer: correctAnswer,
                allAnswers: shuffleAnswers(allAnswers)
              });
            })

            updatedQuizzes.push({
              title: quiz.title,
              questions: updatedQuestions
            })

          })
          setQuizzes(updatedQuizzes);
        })
        // .catch(err => console.log(err))
    }

    fetchQuizzes();

  }, [])

  function handleNextQuestionClicked() {
    setAnswerStatus('');
    if (currentQuestionIndex + 1 >= quizzes[currentQuizIndex].questions.length) {
      setIsFinished(true);
      return;
    } 
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleNextQuizClicked() {
    // setAttemptCount(attemptCount + 1);
    setCurrentQuizIndex(currentQuizIndex + 1);
    setCurrentQuestionIndex(0);
    setAnswerStatus('');
    setScore(0);
    setIsFinished(false);
  }

  // console.log('qa ', quizzes[currentQuizIndex]);
  
  function checkAnswer(e, selectedAnswer, correctAnswer) {
    e.preventDefault();
    console.log('checking answer');
    if (selectedAnswer === correctAnswer) {
      setAnswerStatus('Correct!');
      setScore(score + 1);
    } else {
      setAnswerStatus('Incorrect...');
    }
  }

  const currentQuiz = quizzes[currentQuizIndex];
  // const currentQuestions = currentQuiz.questions[currentQuestionIndex];
  return (
    <div className="app">
      
      {quizzes.length === 0 ? 'Just a sec! Thanks for waiting, and good luck!' : 
        <div>
          
          {currentQuiz.title}
          <div>
            {!isFinished ? (
              <div>
                {currentQuiz.questions[currentQuestionIndex].text}
                <div>
                  {currentQuiz.questions[currentQuestionIndex].allAnswers.map((answer, i) => {
                    return (
                    <li type="A" key={i} onClick={(e) => {
                      checkAnswer(e, answer, currentQuiz.questions[currentQuestionIndex].correctAnswer)}}
                      >{answer}</li>
                    )
                  })}
                </div>
                <div>{answerStatus}</div>
                <button onClick={handleNextQuestionClicked}>Next</button>
            </div>
              ) : (
                <div>
                  <div>You got {score} out of {currentQuiz.questions.length} questions right.</div>
                  <div>{getMessage()}</div>
                  <div>This was attempt number {attemptCount}</div>
                  <div>
                    You had:
                    {currentQuiz.questions.map((question, index) => {
                      return <li key={index}>{question.text} \\selected answer\\ </li>
                    })}
                  </div>
                  {currentQuizIndex + 1 < quizzes.length ? 
                    (
                      <div>
                        <button onClick={handleNextQuizClicked}>Next</button>
                        <button>Retake</button>
                      </div>
                    ) : null
                  }
                </div>
              )
            }
          </div>
        </div>
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));