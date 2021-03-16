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
I started by combining the `correctAnswer` and `incorrectAnswers` from the data into a single array.

The `App` component deals with the overall state of the quizzes - indexing, tracking if quizzes exist, adding quizzes

The `Quiz` component handles the state of a single quiz and its questions including the summary data

The `Question` componenet handles the state of a single question

The `Summary` component displays the final 'slide' of a `Question`
### Feature Requirements
   - A random encouragement message _(use `getMessage` from `data/messages.js`)_.

### Delighters

Originally I wanted to write tests, but didn't feel I had time to write them very thoroughly, so I decided to go with delighters A and B.

- A: Once both of the quizzes have gotten all answers correct, use `getMoreQuizzes` to load in more quizzes that the user can take.
- B: In addition to the "Next" button after taking a quiz, display the number of times the quiz has been taken along with a "Retake" button.

### Submission Requirements

Please give a high-level summary of the technical decisions you made in `DOCS.md`.
It shouldn't be a full essay - just a few sentences explaining your code's architecture and tradeoffs.
