# Documentation

Hi again! 👋

This is where you'll put a few sentences about the architecture of your code.

You can see the competencies we'll be grading it on [here](https://github.com/Codecademy/engineering-competencies/blob/master/interviews/frontend-takehome.md). We expect this to take you roughly 2-3 hours. Please let us know if there's anything unclear about it!

> We recommend copy & pasting these instructions into https://dillinger.io/ to view them as formatted text.

## Getting Started  

This project can be imported into CodeSandbox

### Steps to run locally  

`npm i`  
`npm start` 

### Approach

The `App` component deals with the overall state of the quizzes - indexing, tracking if quizzes exist, adding quizzes.  The first step was to load the quizzes, then modify it to a usable format by combining the `correctAnswer` and `incorrectAnswers` from the data into a single array of all answers to be displayed for each Question.  

This layer handles the current quiz to be displayed, and passes the quiz data (title, questions, handleNextQuiz).  I also included variables to track if the quiz to display was the last one in the original list of quizzes, and if it was the final quiz of the App, so that the `Summary` pages could display and handle the correct actions (get next quizzes, retake, get more quizzes, prevent next when out of quizzes)

Adding Delighter A added a layer of complexity to this component - I added variables to track whether all questions were correct as well as a function to do this calculation.  I also added a function to check if the last of the first set of quizzes was done.  This involved passing data about the current Quiz up to the App layer, such as if a quiz was done with its last question, which is not the 'React' way, but I thought it made more sense than to track each Quiz's state in the parent layer.  The data was used to make calculations about the quizzes as a whole, since calculating the perfect scores involves tracking through each quiz. 


The `Quiz` component handles the state of a single quiz.  It determines whether to display a question (the question text, and answer options) or the summary page.  It handles all the quiz actions, like retaking or getting the next question in the quiz, as well as checking for answer validity.

The `Question` component handles the state of a single question.  It grabs the selected answer, and passes it up through function calls, before getting the result to display.  It handles the styling of correct and incorrect answers.

The `Summary` component displays the final 'slide' of a `Question` with properties passed down from the Quiz layer (score, quiz attempts) and respective buttons to get next quiz or retake (the second delighter I implemented).  This is the only stateless component in this application.