const questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which language runs in a web browser?", options: ["JavaScript", "Python", "C++"], answer: "JavaScript" },
   
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 1200; // 20 minutes

function loadQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById("question-container").innerText = q.question;
    document.getElementById("options-container").innerHTML = q.options.map(opt => 
        `<input type="radio" name="answer" id="${opt}" value="${opt}">
         <label for="${opt}">${opt}</label>`
    ).join("");
}

document.getElementById("next-btn").addEventListener("click", () => {
    let selected = document.querySelector("input[name='answer']:checked");
    if (selected && selected.value === questions[currentQuestionIndex].answer) score++;
    if (++currentQuestionIndex < questions.length) loadQuestion();
    else { localStorage.setItem("quizScore", score); window.location.href = "result.html"; }
});

loadQuestion();

// ⏳ Timer Functionality
function startTimer() {
    let timeElement = document.getElementById("time");
    let interval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        timeElement.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timer-- <= 0) {
            clearInterval(interval);
            localStorage.setItem("quizScore", score);
            window.location.href = "result.html"; 
        }
    }, 1000);
}
startTimer();
