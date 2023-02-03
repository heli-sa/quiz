const questions = [
    {
        question: "how many days are in a leap year?",
        optionA: "355 days",
        optionB: "366 days",
        optionC: "359 days",
        optionD: "364 days",
        correctOption: "optionB"
        
    },
    {
        question: "Which five colors make up the Olympic rings?",
        optionA: "Black, green, blue, yellow and red",
        optionB: "Blue, green,yellow,black and white",
        optionC: "Green, white yellow, red and blue",
        optionD: "Black, green, blue, white and red",
        correctOption: "optionA"   
    },
    {
        question: "Which of the following sports does not use a ball?",
        optionA: "Tennis",
        optionB: "Golf",
        optionC: "Hockey",
        optionD: "Polo",
        correctOption: "optionC" 
        
    },
    {
        question: "What color is found on 75% of the world’s flags?",
        optionA: "white",
        optionB: "blue",
        optionC: "red",
        optionD: "green",
        correctOption: "optionC",   
    },
    {
    question:"What is the White House Number in Pennsylvania Avenue NW?",
    optionA: "1460",
    optionB: "1640",
    optionC: "1400",
    optionD: "1600",
    correctOption: "optionD"   
    },
{
question:"Porphyria is the fear of what??",
    optionA: "Spiders",
    optionB: "Fire",
    optionC: "Doors",
    optionD: "Stars",
    correctOption: "optionB",
    }, 
{ 
    question:"What is zero points in tennis known as?",
    optionA: "Love",
    optionB: "Lose",
    optionC: "Gone",
    optionD: "Hit",
    correctOption: "optionA"
}
{
    question:"	Which country is the origin of the cocktail Mojito?",
    optionA: "Mexico",
    optionB: "Argentina",
    optionC: "Cuba",
    optionD: "Panama",
    correctOption: "optionC"
    },
{
    question:"Which region produces the most apples??",
    optionA: "South Europa",
    optionB: "Central Asia",
    optionC: "North Africa",
    optionD: "Eurasia",
    correctOption: "optionB",

    },
{
    question:"What color is mollusk blood?",
    optionA: "pink",
    optionB: "red",
    optionC: "blue",
    optionD: "white",
    correctOption: "option C"
}         

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 2) {
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

function nextQuestion(index) {
  handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("q_num").innerHTML = questionNumber
    document.getElementById("p_score").innerHTML = playerScore
    document.getElementById("question").innerHTML = currentQuestion.question;
    document.getElementById("one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("four-label").innerHTML = currentQuestion.optionD;

}
// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 3) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}
