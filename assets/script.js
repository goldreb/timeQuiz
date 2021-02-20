var questions = [
    {
        q: "What does HTML stands for?",
        c: ["Hypertext Markup Language", "Hyperlinks and Text Markup Language", "Home tool Markdown Language", "None of the above"],
        a: "Hypertext Markup Language"

    },

    {
        q: "What does C in CSS stands for?",
        c: ["Cascading", "Combined", "Concepts", "Contract"],
        a: "Cascading"
    },

    {
        q: "Arrays in Javascript can be used to store _________.",
        c: ["strings and number", "other arrays", "Booleans", "all of the above"],
        a: "all of the above"
    },

    {
        q: "In Javascript, what element is used to store and manipulate text?",
        c: ["Conditional Statements", "Variable", "Declaration", "Function"],
        a: "Function"
    },
    {
        q: 'A very useful tool used during development and debugging for printing content to be debugger is:',
        c: ['javascript', 'terminal/bash', 'for loops', 'console.log'],
        a: 'console.log'
    },
]



var currentQuestion = 0;
var time = questions.length * 15;

//  variables to DOM objects
var titleEl = document.querySelector('#title');
var answerEl = document.querySelector('#question-answer');
var questionEl = document.querySelector('#questions');
var pageContentEl = document.querySelector('#page-content');
var choicesEl = document.querySelector('#choices');
var timerEl = document.querySelector('#time');
var userScoreEl = document.querySelector('#user-score');
var retryEl = document.querySelector('#try-again');

// quiz timer 
function quizTimer() {
    timer = setInterval(function () {
        timerEl.innerHTML = time--;
    }, 1000);
};

var titlePage = function () {

    timerEl.innerHTML = time;



    var openingTitle = document.createElement('h2');
    openingTitle.textContent = 'Coding Questions';
    titleEl.appendChild(openingTitle);

    var openingText = document.createElement('p');
    openingText.innerHTML = 'Answer the following questions within the time limit.';
    titleEl.appendChild(openingText);


    var startButton = document.createElement('button');
    startButton.className = 'btn start-button';
    startButton.textContent = 'Start Quiz';
    titleEl.appendChild(startButton);
};

var taskButtonHandler = function (event) {
    var targetEl = event.target;

    if (targetEl.matches('.start-button')) {
        startQuiz();
    }

    else if (targetEl.matches('.submit-button')) {
        submitScore();
    }

    else if (targetEl.matches('.return-button')) {
        window.location.href = "index.html";
    }
};
var startQuiz = function () {

    welcomePageEl = document.getElementById('title');
    welcomePageEl.setAttribute('class', 'hide');

    time--;
    quizTimer();

    pullQuestion();
};

function pullQuestion() {
    0
    if (time <= 0) {
        endQuiz();
    }
    else {
        var question = questions[currentQuestion];
        questionEl.textContent = question.q;


        choicesEl.innerHTML = '';


        question.c.forEach(function (c, i) {

            var choiceBtn = document.createElement('button');
            choiceBtn.setAttribute('class', 'choices');
            choiceBtn.setAttribute('value', c);
            choiceBtn.textContent = i + 1 + '. ' + c;
            choicesEl.appendChild(choiceBtn);

            choiceBtn.onclick = selectAnswer;
        });
    }
};

function selectAnswer() { //check

    if (this.value === questions[currentQuestion].a) {
        answerEl.className = 'response';
        answerEl.textContent = 'Correct!';
    }

    else {
        answerEl.className = 'response';
        answerEl.textContent = 'Wrong!';

        time -= 10;
        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
    }


    setTimeout(function () {
        answerEl.setAttribute('class', 'hide');
    }, 1000);

    currentQuestion++;


    if (currentQuestion === questions.length) {
        endQuiz();
    }
    else {
        pullQuestion();
    }
};

function userScore() {

    allDoneEl = document.createElement('h2');
    allDoneEl.textContent = 'All Done!';
    userScoreEl.appendChild(allDoneEl);


    finalScoreEl = document.createElement('h3');
    finalScoreEl.textContent = 'Your final score is ' + time + '.';
    userScoreEl.appendChild(finalScoreEl);


    initialDivEl = document.createElement('div');
    initialDivEl.className = 'submit-form';
    userInEl = document.createElement('h3');
    userInEl.textContent = 'Enter initials:';
    initialDivEl.appendChild(userInEl);
    usersInitialsEl = document.createElement('input');
    usersInitialsEl.type = 'text';
    usersInitialsEl.className = 'user-input';
    initialDivEl.appendChild(usersInitialsEl);
    submitEl = document.createElement('button');
    submitEl.className = 'btn submit-button';
    submitEl.textContent = 'Submit';
    initialDivEl.appendChild(submitEl);
    userScoreEl.appendChild(initialDivEl);
};

function endQuiz() { 

    clearInterval(timer);
    timerEl.textContent = time;


    questionEl.textContent = '';
    choicesEl.innerHTML = '';

    if (time > 0) {
        userScore();
    }
    else {

        youLoseEl = document.createElement('div');
        youLoseEl.className = 'loss-div'
        tryAgainEl = document.createElement('h3');
        tryAgainEl.textContent = 'Please Try Again';
        youLoseEl.appendChild(tryAgainEl);
        goBackEl = document.createElement('button');
        goBackEl.textContent = 'Go Back';
        goBackEl.className = 'btn return-button';
        youLoseEl.appendChild(goBackEl);
        retryEl.appendChild(youLoseEl);
    }
};

function submitScore() {

    var initials = usersInitialsEl.value;


    if (initials === '') {
        alert(' Enter Your Initials')
    }

    else {

        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];


        var newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));


        window.location.href = "score.html"; //goes to different html page
    }
};

titlePage();

// addEventlistner
pageContentEl.addEventListener('click', taskButtonHandler);


