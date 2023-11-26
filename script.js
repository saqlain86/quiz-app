var quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'London', 'Madrid'],
        correctAnswer: 'Paris' 
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Mars'
    },
    {
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale'
    }
];

let currentQuestion = 0;
let score = 0;
let timer;

var questionElement = document.getElementById('question');
var optionsContainer = document.getElementById('options-container');
var nextButton = document.getElementById('next-button');
var timerElement = document.getElementById('time');
var resultContainer = document.getElementById('result-container');
var resultMessageElement = document.getElementById('result-message');
var scoreElement = document.getElementById('score');

function loadQuestion() {
    var currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;

    optionsContainer.innerHTML = '';
    currentQuizData.options.forEach((option) => {
       var button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function startTimer(duration) {
    let seconds = duration;
    timer = setInterval(function () {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;

        timerElement.innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

        if (--seconds < 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function checkAnswer(answer) {
    var currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.correctAnswer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    resultMessageElement.innerText = `You scored ${score} out of ${quizData.length} questions.`;
    scoreElement.innerText = `Score: ${score}/${quizData.length}`;
    resultContainer.style.display = 'flex';
    document.getElementById('quiz-container').style.display = 'none';
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Initial load
loadQuestion();
startTimer(120); // 2 minutes
