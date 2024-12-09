const questions = [
    {
        question: "Which of the following tags is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<nav>"],
        answer: 1
    },
    {
        question: "Which HTML attribute is used to specify an alternative text for an image?",
        options: ["alt", "src", "title", "href"],
        answer: 0
    },
    {
        question: "Which tag is used to define a table header in HTML?",
        options: ["<thead>", "<header>", "<th>", "<td>"],
        answer: 2
    },
    {
        question: "Which property is used to change the background color?",
        options: ["color", "background-color", "bgcolor", "background"],
        answer: 1
    },
    {
        question: "How can you make text bold using CSS?",
        options: ["font-weight: bold;", "text-decoration: bold;", "font-style: bold;", "style: bold;"],
        answer: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "color", "text-color", "foreground-color"],
        answer: 1
    },
    {
        question: "Which of the following is the correct way to write a JavaScript array?",
        options: ['var arr = "1, 2, 3, 4";', "var arr = (1, 2, 3, 4);", "var arr = [1, 2, 3, 4];", "var arr = {1, 2, 3, 4};"],
        answer: 2
    },
    {
        question: "Which method is used to print a message in the console?",
        options: ["console.print()", "console.log()", "console.write()", "console.output()"],
        answer: 1
    },
    {
        question: "What is the output of 2 + '2' in JavaScript?",
        options: ["22", "4", "NaN", "Error"],
        answer: 0
    },
    {
        question: "Which function is used to parse a string to an integer in JavaScript?",
        options: ["int()", "parseInt()", "parse()", "Number()"],
        answer: 1
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsBox = document.getElementById("options-box");
const nextButton = document.getElementById("next-button");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsBox.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsBox.appendChild(button);
    });

    
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsBox.getElementsByTagName("button");

    if (selectedIndex === currentQuestion.answer) {
        buttons[selectedIndex].classList.add("correct");
        score++;
    } else {
        buttons[selectedIndex].classList.add("incorrect");
        buttons[currentQuestion.answer].classList.add("correct");
    }

    for (const button of buttons) {
        button.disabled = true;
    }

    nextButton.classList.add("show");
    scoreEl.textContent = `Score: ${score}`;
}

nextButton.addEventListener("click", () => {
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        progressEl.textContent = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
    } else {
        showEndScreen();
    }
    nextButton.classList.remove("show");
});

function showEndScreen() {
    document.getElementById("quiz-box").classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
}

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    progressEl.textContent = `Question: 1 / ${questions.length}`;
    endScreen.classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestion();
});

loadQuestion();
