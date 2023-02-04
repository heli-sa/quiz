// Notes on functions and variables needed
// Javascript
// Variables
// Array to store questions
// Timer, Username

// Functions
// Load questions
// GetUserName
// Display first question
// Randomisation of questions (on/off)
// Start Quiz
// Start Timer
// Stop Timer
// Timer Set Time for Quiz
// GotoNextQuestion
// ShowAnswer
// Listener for Start Button
// Listener for Next Button
// Create LeaderBoard
// Update LeaderBoard
// Clear LeaderBoard

//store question text, options and answers in an array
// Note: put option in code to read this array from JSON file (time permitting)
const questions = [
    {
      questionText: "Question 1 - First Question",
      options: ["1. ans1", "2. ans2", "3. ans3", "4. ans4"],
      answer: "3. ans3",
    },
    {
      questionText: "Question 2 Second Question",
      options: ["1. ans1", "2. ans2", "3. ans3", "4. ans4"],
      answer: "4. ans4",
    },
    {
        questionText: "Question 3 Third Question",
        options: ["1. ans1", "2. ans2", "3. ans3", "4. ans4"],
        answer: "2. ans2",
    },
];

// Create Global variables to display questions, scorecard, leaderboard
// Time, intervalID
const startCard = document.querySelector("#instructions");
const questionCard = document.querySelector("#question");
const scoreCard = document.querySelector("#scorecard");
const leaderboardCard = document.querySelector("#leaderboard");
const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");
const timeDisplay = document.querySelector("#time");
var intervalID;
var time;
var currentQuestion;

// Hide cards at the start
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
  }

// Start Quiz
document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
  //hide any visible cards, show the question card - log to console function started
  console.log("Quiz Started");

  hideCards();
  questionCard.removeAttribute("hidden");

  //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
  currentQuestion = 0;
  displayQuestion();

  //set total time depending on number of questions
  time = questions.length * 10;

  //executes function "countdown" every 1000ms to update time and display on page
  intervalID = setInterval(countdown, 1000);

  //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
  displayTime();
}

//reduce time by 1 and display new value, if time runs out then end quiz
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
      endQuiz();
    }
  }
  
function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;
  
    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
  
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      // button on page targetted with name + number option1,option2
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
  }

function displayTime() {
  timeDisplay.textContent = time;
}

// check which option(button) selected and pass to checkAnswer function
document.querySelector("#quiz-options").addEventListener("click", checkAnswer);



//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
  }
  
  //if answer is incorrect, penalise time
  function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)) {
      resultText.textContent = "Correct!";
      setTimeout(hideResultText, 1000);
    } else {
      resultText.textContent = "Incorrect!";
      setTimeout(hideResultText, 1000);
      if (time >= 10) {
        time = time - 10;
        displayTime();
      } else {
        //if time is less than 10, display time as 0 and end quiz
        //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 10 seconds left on the timer
        time = 0;
        displayTime();
        endQuiz();
      }
    }
  
    //increment current question by 1
    currentQuestion++;
    //if we have not run out of questions then display next question, else end quiz
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  //at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
  }
