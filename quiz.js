const questions = [

    {
        question: "What is the capital of India?",

        options: [
            "Mumbai",
            "Delhi",
            "Chennai",
            "Hyderabad"
        ],

        answer: "Delhi"
    },

    {
        question: "Which language is used to style HTML?",

        options: [
            "JavaScript",
            "Python",
            "CSS",
            "Java"
        ],

        answer: "CSS"
    },

    {
        question: "Which language is used to add functionality to a webpage?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: "JavaScript"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",

        options: [
            "var",
            "int",
            "string",
            "define"
        ],

        answer: "var"
    },

    {
        question: "Which method adds an element to the end of an array?",

        options: [
            "push()",
            "pop()",
            "shift()",
            "slice()"
        ],

        answer: "push()"
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("score").textContent =
        `Score: ${score}`;

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option) {

        const button = document.createElement("button");

        button.classList.add("option");

        button.textContent = option;

        button.onclick = function() {

            selectAnswer(button);

        };

        optionsContainer.appendChild(button);

    });
}


function selectAnswer(button) {

    if (answered) {
        return;
    }

    answered = true;

    const selectedAnswer = button.textContent;

    const correctAnswer =
        questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(function(option) {

        if (option.textContent === correctAnswer) {

            option.classList.add("correct");

        }

    });


    if (selectedAnswer === correctAnswer) {

        score++;

        document.getElementById("score").textContent =
            `Score: ${score}`;

    } else {

        button.classList.add("wrong");

    }
}


function nextQuestion() {

    if (!answered) {

        alert("Please select an answer!");

        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }
}


function showResult() {

    document.getElementById("question").textContent =
        "Quiz Completed! 🎉";

    document.getElementById("options").innerHTML = "";

    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("questionNumber").textContent =
        "Finished";

    document.getElementById("result").textContent =
        `Your final score is ${score} / ${questions.length}`;
}


loadQuestion();