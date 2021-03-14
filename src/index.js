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
    setCurrentQuizIndex(currentQuizIndex + 1);
    setCurrentQuestionIndex(0);
    setAnswerStatus('');
    setIsFinished(false);
  }

  console.log('qa ', quizzes[currentQuizIndex]);
  
  function checkAnswer(selectedAnswer, correctAnswer) {
    console.log('checking answer');
    if (selectedAnswer === correctAnswer) {
      setAnswerStatus('Correct!');
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
                {/* {console.log(currentQuizIndex, currentQuestionIndex)} */}
                {currentQuiz.questions[currentQuestionIndex].text}
                <div>
                  {currentQuiz.questions[currentQuestionIndex].allAnswers.map((answer, i) => {
                    return (
                    <div key={i} onClick={() => checkAnswer(answer, currentQuiz.questions[currentQuestionIndex].correctAnswer)}>{answer}</div>
                    )
                  })}
                </div>
                <div>{answerStatus}</div>
                <button onClick={handleNextQuestionClicked}>Next</button>
            </div>
              ) : (
                <div>
                  <div>You got x out of {quizzes[currentQuizIndex].length} questions right.</div>
                  <div>{getMessage()}</div>
                  {currentQuizIndex + 1 < quizzes.length ? 
                    (
                      <button onClick={handleNextQuizClicked}>Next</button>
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