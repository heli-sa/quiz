const questions = [
    {
        question: "Days in a leap year?",
        optionA: "355 days",
        optionB: "355 days",
        optionC: "355 days",
        optionD: "355 days"
        
    }
]

// const startButton =  document.getElementById('play-btn')

// function startGame(){
// console.log('Started')
// }


// let shuffledQuestions= []
// // function handleQuestions() {}


// function handleQuestions() { 
   
//     while (shuffledQuestions.length <= 1) {
//         const random = questions[Math.floor(Math.random() * questions.length)]
//         if (!shuffledQuestions.includes(random)) {
//             shuffledQuestions.push(random)
//         }
        
//     }
// }

// let questionNumber=1
// let playScore=0
// let wrongAttempt=0
// let indexNumber=0

let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 1) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
        
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function nextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("q-num").innerHTML = questionNumber
    // document.getElementById("player-score").innerHTML = playerScore
    // document.getElementById("display-question").innerHTML = currentQuestion.question;
    // document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    // document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    // document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    // document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}



// // function nextQuestion()


// // function checkAnswer()



// // function takeNextQuestion()

// // function resetOption()


// // function optionButton()

// // function endGame()


// // function closeScore()

// // function closeOption()
