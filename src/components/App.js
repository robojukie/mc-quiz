import React, { useState, useEffect } from 'react';
import { getQuizzes, getMoreQuizzes } from '../data/quizzes.js';
import Quiz from './Quiz';
import '../styles.css';

const App = () => {
  // quizzes will expand when getMoreQuizzes is added
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  // used to determine if more quizzes should be added
  const [isPerfectScore, setIsPerfectScore] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // this variable tracks the last of the original quizzes
  const [isRequiredFinished, setIsRequiredFinished] = useState(false);

  const [moreQuizzes, setMoreQuizzes] = useState([]);
  const [isFinalQuiz, setIsFinalQuiz] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

  // load quiz data in the useEffect hook, then merge correct answers with incorrect and shuffle the order
  function shuffleAnswers(answers) {
    let currentIndex = answers.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [answers[currentIndex], answers[randomIndex]] = [
        answers[randomIndex],
        answers[currentIndex],
      ];
    }
    return answers;
  }
  // loads quizzes
  // load more quizzes at the same time, so they are readily available when need to be used rather than needing to load them later
  useEffect(() => {
    // modifies the answer data to combine into one array with all answers
    function updateQuiz(quizData) {
      let modifiedQuizzes = []
      quizData.forEach((quiz) => {
        let updatedQuestions = [];
  
        quiz.questions.forEach((question) => {
          let allAnswers = [
            ...question.incorrectAnswers,
            question.correctAnswer,
          ];
          const { text, correctAnswer } = question;
          updatedQuestions.push({
            text: text,
            correctAnswer: correctAnswer,
            allAnswers: shuffleAnswers(allAnswers),
          });
        });
  
        modifiedQuizzes.push({
          title: quiz.title,
          questions: updatedQuestions,
        });
      });
      return modifiedQuizzes
    }

    const fetchQuizzes = async () => {
      await getQuizzes()
        .then((response) => response)
        .then((quizData) => {
          const updatedQuizzes = updateQuiz(quizData)
          setQuizzes(updatedQuizzes);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchQuizzes();

    const fetchMoreQuizzes = async () => {
      await getMoreQuizzes()
        .then((response) => response)
        .then((quizData) => {
          const updatedQuizzes = updateQuiz(quizData)
          setMoreQuizzes(updatedQuizzes);
        })
        .catch((err) => console.log(err));
    };

    fetchMoreQuizzes();
  }, []);

  // updates whether either set of quizzes has been completed
  function updateIsRequiredDone(status) {
    if (isMerged && status && currentQuizIndex === quizzes.length - 1) {
      setIsFinalQuiz(true);
    }
    if (status === true && currentQuizIndex === quizzes.length - 1) {
      setIsRequiredFinished(true);
    } else {
      setIsRequiredFinished(false);
    }
  }
  
  function handleNextQuiz() {
    // if first set of quizzes are done and all answers are correct, add in more quizzes to take, else handle end of each quiz
    if (isPerfectScore && isRequiredFinished) {
      const mergedQuizzes = quizzes.concat(moreQuizzes);
      setQuizzes(mergedQuizzes);
      setIsMerged(true);
    } else {
      if (currentQuizIndex + 1 >= quizzes.length) {
        setCurrentQuizIndex(0);
        return;
      }
    }
    setCurrentQuizIndex(currentQuizIndex + 1);
  }

  // sum score and total questions to find if all questions have been answered correctly
  function sumScoreAndTotal(correct, total) {
    setTotalCorrect(totalCorrect + correct);
    setTotalQuestions(totalQuestions + total);
  }

  useEffect(() => {
    function setPerfectStatus() {
      if (totalQuestions > 0 && totalCorrect === totalQuestions) {
        setIsPerfectScore(true);
      } else {
        setIsPerfectScore(false);
      }
    }

    setPerfectStatus()

  }, [totalCorrect, totalQuestions])
   
  const currentQuiz = quizzes[currentQuizIndex];
  return (
    <div className="app">
      {isLoading ? (
        'Just a sec! Thanks for waiting, and good luck!'
      ) : (
        <Quiz
          title={currentQuiz && currentQuiz.title}
          questions={currentQuiz && currentQuiz.questions}
          handleNextQuiz={handleNextQuiz}
          sumScoreAndTotal={sumScoreAndTotal}
          isRequiredFinished={isRequiredFinished}
          updateIsRequiredDone={updateIsRequiredDone}
          isFinalQuiz={isFinalQuiz}
          isPerfectScore={isPerfectScore}
        />
      )}
    </div>
  );
};

export default App;
