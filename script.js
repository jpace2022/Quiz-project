// build coding quiz
// create variable
// the quiz needs to be timed
// the quiz needs to be multipel choice
// app will run in browser 
// will need to click start button to begin game
// timer will start
// when timer starts user is presented with question
// after question is answered user is promted with next questions
// if question is answered incorrectly time is subtracted from clock
// all questions need to be answered or the timer reached 0
// game ends once all questiosn are asnwered or timer runs out
// once game is over user is able to save initials and score
var intro = document.querySelector("#intro")
var start = document.querySelector("#start")
var titlePage = document.querySelector("#title-page")

var question = document.querySelector("#question")
var questionAsked = document.querySelector("#question-asked")

var answerButton = document.querySelectorAll(".answers")
var answer1 = document.querySelector("#answer1")
var answer2 = document.querySelector("#answer2")
var answer3 = document.querySelector("#answer3")

var linecheck = document.querySelector("#linecheck")
var score = document.querySelector("#submit")
var overallScore = document.querySelector("#overall score")
var initials = document.querySelector("#Intials")

var buttonSubmit = document.querySelector("#button-submit")
var highscore = document.querySelector("#highscore")
var scoreTracker = document.querySelector("#score-tracker")
var complete = document.querySelector("#complete")

var backButton = document.querySelector("#back-button")
var clearButton = document.querySelector("#clear-button")
var timer = document.getElementById("timer")
var timeRemaining = 60;

var numberQuestions = 0;
var overallScore = 0;
var count = 1;

var questions = [
    {
    question: "Where did snowboarding first appear?"
    answers: ["a. United States", "b. Austria", "c. Norway"]
    answer: "a"
    },
    {
    question: "When was snopwboarding developed?"
    answers: ["a. 1970s", "b. 1990s", "c. 1960s"]
    answer: "c"
    },
    {
    question: "When did snowboarding become a winter olympic sport?"
    answers: ["a. 1998", "b. 1994", "c. 1990"]
    answer: "b"
    },
    {
    question: "Who invented snowboarding?"
    answers: ["a. Sherman Poppen", "b. Tom Sins", "c. Jame Burton"]
    answer: "a"
    },
    {
    question: "What was the first name given to snowboarding?"
    answers: ["a. snowsliding", "b. Snurfing", "c. Snurfall"]
    answer: "b"
    },
    {
    question: "When was the first snowboarding competition organized?"
    answers: ["a. Feb 1968", "b. Feb 1969", "c. March 1968"]
    answer: "a"
    },
    {
    uestion: "What is the name of the first manufacturer of snowboards?"
    answers: ["a. Burton Snowboards", "b. Brunswick Corporation", "c. Poppen Snowboards"]
    answer: "b"
    },
    {
    question: "When was the first USA National Snowboard race held?"
    answers: ["a. 1981", "b. 1980", "c. 1982"]
    answer: "c"
    },
    {
    question: "Who won the first olympic gold medal for Woman's snowboarding?"
    answers: ["a. Karine Ruby", "b. Travis Rice", "c. Torstein Horgmo"]
    answer: "a"
    },
    {
    question: "Who won the first olympic gold medal for Man's snowboarding?"
    answers: ["a. Torah Bright", "b. Ross Rebagliati", "c. Hannah Teter"]
    answer: "b"
    },
]

function countdown() {
    var timeSpan = setInterval(function() {
        timeRemaining--;
        timer.textContent = "Time Remaining: " + timeRemaining;
        if (timer < = 0){
            clearInterval(timeSpan);
            timer.textContent = "Times up!";
            complete.textContent = "Times up!";
            gameOver();
       
        } else if (count > = questions.length +1) {
            clearInterval(timeSpan)
            gameOver();
        }

    }, 1000);
}

function beginQuiz (){
    titlePage.style.display = "none";
    question.style.display = "block";
    numberQuestions = 0;
    countdown();
    questionShown(numberQuestions)
}

function questionShown (n) {
    questionAsked.textContent = questions[n].question:
    answer1.textContent = questions[n].answers[0];
    answer2.textContent = questions[n].answers[1];
    answer3.textContent = questions[n].answers[2];
    numberQuestions = n;
}

function answerCheck(event) {
    event.prevenDefault();
    linecheck.style.display = "block";
    setTimeout(function (){
        linecheck.style.display = "none";

    }, 1000);
}

if (questions[numberQuestions].answer == event.target.value) {
    linecheck.textContent = "Right!";
    overallScore = overallScore + 1;

} else {
    timeRemaining = timeRemaining - 10;
    linecheck.textContent = "Wrong. The answer is " +questions[numberQuestions].answer + ".";
}
if (numberQuestions < questions.length -1) {
    questionShown(numberQuestions +1);
    } else {
        gameOver();
    }
    count++;
}

function gameOver() {
    questions.style.display = "none";
    score.style.display = "block";
    console.log(score);
    overallScore.textContent = "Final score "+ overallScore;
    timer.style.display ="none";
};

function saveScore (){
    var scoreList =localStorage.getItem("scorelist");
    if (scoreList !== null) {
        newList = JSON.parse(scoreList);
    } else {
        newList = [];
    }
    return newList;
};

function displayScore (){
    scoreTracker.innerHTML = "";
    scoreTracker.style.display = "block";
    var topScore = sort();
    var topThree = topScore.slice(0,3);
    for (var i =0; i < topThree.length; i++) {
        var item = topThree[i];
        var li = document.createElement("li");
        li.textContent = item.user + "_" + item.score;
        li.setAttribute("data-index", i);
        scoreTracker.appendChild(li);
    }
};

function sort() {
    var scrambedList = getScore();
    if (getScore == null) {
        return;
    } else {
        scrambedList.sort(function(a,b){
            return b.score - a.score;
        })
        return scrambedList;
    }};

    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("Score list", JSON.stringify(addedList));
    };

function saveScore () {
    var scoreItem = {
        user: userInitial.value
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

start.addEventListener("click", startQuiz);

answerButton.forEach(function(click)
click.addEventListener("click", answerCheck);
});

buttonSubmit.addEventListener("click", function(event){
    event.preventDefault();
    score.style.display = "none";
    titlePage.style.display = "none";
    highscore.style.display = "block";
    question.style.display = "none";
    saveScore();
})

scoreTracker.addEventListener("click", function(event){
    event.preventDefault();
    score.style.display = "none"
    titlePage.style.display = "none"
    topScore.style.display = "none"
    questions.style.display = "none"
    renderScore();
});

backButton.addEventListener("click", function(event){
    event.preventDefault();
    score.style.display = "none";
    titlePage.style.display = "block";
    highscore.style.display = "none";
    questions.style.display = "none"
    location.reload();
});

clearButton.addEventListener("click", function (event){
    event.preventDefault(;
        localStorage.clear();
        renderScore();
})