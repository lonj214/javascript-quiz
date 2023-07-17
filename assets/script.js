var startQuizButton = document.querySelector(".startQuizButton");
var qAndA = document.querySelector(".qAndA")
var startScreen = document.querySelector(".startScreen")

startQuizButton.addEventListener('click', () => {
    qAndA.classList.remove('hidden');
    startScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    setTimer();
    currentQuestion();
});

// var timer;
// var timerCount;

// var initial = [];

// let currentQuestion = {}
// let correctAnswer = true;
// let score = 0;
// let questionCounter = 0;
// let availableQuestions = []
let presentedQuestion = 0

let questions = [
    {
        question: "Arrays in Javascript can be used to store ___?",
        choices: ["Other arrays", "booleans", "numbers and strings", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["alerts", "strings", "booleans", "numbers",],
        answer: "strings"
    },
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
        choices: ["for loops", "terminal/bash", "JavaScript", "console.log"],
        answer: "console.log"
    },
    {
        question: "The condition in an if/else statement is enclosed within ___.",
        choices: ["parenthesis", "square brackets", "quotes", "curly brackets"],
        answer: "parenthesis"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choices: ["parenthesis", "curly brackets", "quotes", "commas"],
        answer: "quotes"
    },
];

var timerEl = document.querySelector(".timer-count");
var timerInterval
let secondsRemaining= 75



function setTimer() {
    timerInterval = setInterval(function() {
        secondsRemaining--;
        console.log(secondsRemaining)
        timerEl.textContent = secondsRemaining + "seconds left.";
        if (secondsRemaining === 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Sorry you ran out of time!";
        }
    }, 1000);
}

let userAnswerEl = document.querySelector(".userAnswer");


function currentQuestion() {
    userAnswerEl.innerHTML = ""
    var questionOnScreen = questions[presentedQuestion];
    console.log(questionOnScreen)
    var questionPrompt = document.querySelector("#askedQuestion");
    questionPrompt.textContent = questionOnScreen.question
    for(var i =0; i < questionOnScreen.choices.length; i ++) {
        let choice = questionOnScreen.choices[i];
       
        var liEl = document.createElement('li')
        var correctButton = document.createElement("button");
        correctButton.setAttribute("class", "correctButton");
        correctButton.setAttribute("value", choice);
        console.log(choice)
        correctButton.innerHTML = i + 1 + "." + choice
        correctButton.addEventListener('click', response)
        liEl.append(correctButton)
        userAnswerEl.appendChild(liEl);
    }
}
// unsure but i think i need an eventlistener for this function below
function response(event) {
    var responseEl = event.target
    console.log(responseEl)
    if (!responseEl.matches(".correctButton")) {
        return
    }
    if (responseEl.value !== questions[presentedQuestion].answer) {
        secondsRemaining -= 10;
        if (secondsRemaining < 0) {
            secondsRemaining = 0
        }
        document.querySelector('#input').textContent = "Incorrect, please try again"
    }
    else {
        document.querySelector("#input").textContent = "Good Job! That is correct!"
    }
    document.querySelector("#input").removeAttribute("class")

    setTimeout(function() {
        document.querySelector("#input").setAttribute("class", "hidden")
    })
    presentedQuestion++
    
    if (secondsRemaining <= 0 || presentedQuestion===questions.length) {
        quizOver()
    }
    else {
        currentQuestion()
    }
}

// userAnswerEl.onclick = response

var personScoreEl = document.querySelector(".userScore");
var finalPage = document.querySelector("#score")

function quizOver() {
    clearInterval(timerInterval);
    finalPage.removeAttribute("class");

    personScoreEl.textContent = secondsRemaining
    qAndA.setAttribute("class", "qAndA hidden");
}

var saveBtnEl = document.querySelector(".highScoreButton");
var outcomeOfUser = document.querySelector(".score")
var highScoreList = document.querySelector(".highScoreBoard");

saveBtnEl.addEventListener('click', ()=> {
    console.log("Saved to Highscores!");
    highScoreList.remove("highScoreBoard");
    outcomeOfUser.classList.add("hidden");
    saveHighScore();
    renderSaveHighScore();
    console.log('Running saveHighScore and renderSaveHighScore function');
})

var initialEl = document.querySelector("#initial");

function saveHighScore() {
    var nameAndScore = {
        theUserInitial: initialEl.value,
        personScore: personScoreEl.textContent,
    };
    console.log("Highscore added to the board");
    console.log(nameAndScore);
    localStorage.setItem(initialEl.value, JSON.stringify(nameAndScore));
    nameAndScore.length
}

function renderSaveHighScore() {
    var priorPlayer = JSON.parse(localStorage.getItem("nameAndScore"));
    if (priorPlayer !==null) {
        document.querySelector("#initial").textContent = priorPlayer.theUserInitial;
        document.querySelector("#userScore").textContent = priorPlayer.personScore;
    } else {
        return;
    }
}

function initialize() {
    renderSaveHighScore();
    var savedInitial = document.getElementById("userInitials");
    var savedScore = document.getElementById("savedscore");
}