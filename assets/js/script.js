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
      questionText: "Question 1 - How many days are in a leap year?",
      options: ["1. 355 days", "2. 366 days", "3. 359 days", "4. 364 days"],
      answer: "2. 366 days",
    },
    {
      questionText: "Which five colors make up the Olympic rings?",
      options: ["1. Black, green, blue, yellow and red", 
                "2. Blue, green,yellow,black and white", 
                "3. Green, white yellow, red and blue", 
                "4. Black, green, blue, white and red"],
      answer: "4. Black, green, blue, white and red",
    },
    {
      questionText: "Which of the following sports does not use a ball?",
      options: ["1. Tennis", "2. Golf", "3. Ice-Hockey", "4. Polo"],
      answer: "3. Ice-Hockey",
    },
    {
      questionText: "What color is found on 75% of the world’s flags?",
      options: ["1. White", "2. Blue", "3. Green", "4. Red"],
      answer: "4. Red",
    },
    {
      questionText: "What is the White House Number in Pennsylvania Avenue NW?",
      options: ["1. 1600", "2. 1670", "3. 1640", "4. 1610"],
      answer: "1. 1600",
    },
    {
      questionText: "Porphyria is the fear of what?",
      options: ["1. Spiders", "2. Fire", "3. Doors", "4. Stars"],
      answer: "2. Fire",
    },
    {
      questionText: "What is zero points in tennis known as?",
      options: ["1. Love", "2. Lose", "3. Gone", "4. Hit"],
      answer: "1. Love",
    },
    {
      questionText: " Which country is the origin of the cocktail Mojito?",
      options: ["1. Mexico", "2. Argentina", "3. Cuba", "4. Panama"],
      answer: "3. Cuba",
    },
    {
      questionText: " Which region produces the most apples?",
      options: ["1. South Europe", "2. Central Asia", "3. North Africa", "4. Eurasia"],
      answer: "2. Central Asia",
    },
    {
      questionText: " What color is mollusk blood?",
      options: ["1. pink", "2. red", "3. blue", "4. White"],
      answer: "3. blue",
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
const score = document.querySelector("#score");
  
var intervalID;
var time;
var currentQuestion;
// Total number of questions in the Quiz (totalQuestions = questions-1)
var totalQuestions = 9;
//empty array to hold shuffled selected 
let randomQuestions = [];

// Hide cards at the start
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
  }
  
  //hide result div
  function hideResultText() {
    resultDiv.style.display = "none";
  }

function shuffleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (randomQuestions.length <= totalQuestions) {
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!randomQuestions.includes(random)) {
          randomQuestions.push(random);
        }
    }
}

  // Start Quiz
  document.querySelector("#start-button").addEventListener("click", startQuiz);
  
  function startQuiz() {
    //hide any visible cards, show the question card
    hideCards();
    questionCard.removeAttribute("hidden");
  
    // Randomize/shuffle the questions array before starting quiz.
    shuffleQuestions();
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
  
  //display time on page
  function displayTime() {
    timeDisplay.textContent = time;
  }
  //display the question and answer options for the current question
  function displayQuestion() {
   // Swap commented lines below to change from non-random to random 
   // let question = questions[currentQuestion];
    let question = randomQuestions[currentQuestion];
    
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

  // check which option(button) selected and pass to checkAnswer function
  document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  
  //Compare the text content of the option button with the answer to the current question
  function optionIsCorrect(optionButton) {
   // Swap commented lines below to change from non-random to random 
//   return optionButton.textContent === questions[currentQuestion].answer;

    return optionButton.textContent === randomQuestions[currentQuestion].answer;
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

  // Leaderboard section

  const submitButton = document.querySelector("#submit-button");
  const inputElement = document.querySelector("#PersonName");
  
  //store user name and score when submit button is clicked
  submitButton.addEventListener("click", storeScore);
  
  function storeScore(event) {
    //prevent default behaviour of form submission
    event.preventDefault();
  
    //check for input
    if (!inputElement.value) {
      alert("Please enter your name before pressing submit!");
      return;
    }
  
    //store score and name in an object
    let leaderboardItem = {
      initials: inputElement.value,
      score: time,
    };
  
    updateStoredLeaderboard(leaderboardItem);
  
    //hide the question card, display the leaderboard
    hideCards();
    leaderboardCard.removeAttribute("hidden");
  
    renderLeaderboard();
  }
  
  //updates the leaderboard stored in local storage
  function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    //append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
  }
  
  //get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
  function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
      let leaderboardArray = JSON.parse(storedLeaderboard);
      return leaderboardArray;
    } else {
      leaderboardArray = [];
    }
    return leaderboardArray;
  }
  
  //display leaderboard on leaderboard card
  function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
      let leaderboardEntry = sortedLeaderboardArray[i];
      let newListItem = document.createElement("li");
      newListItem.textContent =
        leaderboardEntry.initials + " - " + leaderboardEntry.score;
      highscoreList.append(newListItem);
    }
  }
  
  //sort leaderboard array from highest to lowest
  function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
      return;
    }
  
    leaderboardArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leaderboardArray;
  }
  
  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", clearHighscores);
  
  //clear local storage and display empty leaderboard
  function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
  }
  
  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", returnToStart);
  
  //Hide leaderboard card show start card
  function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
  }
  
  //use link to view highscores from any point on the page
  const leaderboardLink = document.querySelector("#leaderboard-link");
  leaderboardLink.addEventListener("click", showLeaderboard);
  
  function showLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");
  
    //stop countdown
    clearInterval(intervalID);
  
    //assign undefined to time and display that, so that time does not appear on page
    time = undefined;
    displayTime();
  
    //display leaderboard on leaderboard card
    renderLeaderboard();
  }


  
