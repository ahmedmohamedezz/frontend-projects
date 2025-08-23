// DOM Elements
// Start screen
const startScreenEl = document.getElementById("start-screen");
const startBtnEl = document.getElementById("start-btn");

// Quiz screen
const quizScreenEl = document.getElementById("quiz-screen");
const quizQuestionTextEl = document.getElementById("question-text");
const quizCurrentQuestionEl = document.getElementById("current-question");
const quizTotalQuestionsEl = document.getElementById("total-questions");
const quizScoreEl = document.getElementById("score");
const quizAnswersContainerEl = document.getElementById("answers-container");
const quizProgressBarEl = document.getElementById("progress");

// Result screen
const resultScreenEl = document.getElementById("result-screen");
const resultFinalScoreEl = document.getElementById("final-score");
const resultMaxScoreEl = document.getElementById("max-score");
const resultMessageEl = document.getElementById("result-message");
const resultRestartBtnEl = document.getElementById("restart-btn");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Vars initialization
let currentQuestionIndex = 0;
let score = 0;
let answersDisablesd = false; // avoid double-clicking the same Q

const TOTAL_QUESTIONS = quizQuestions.length;
quizTotalQuestionsEl.textContent = TOTAL_QUESTIONS;
resultMaxScoreEl.textContent = TOTAL_QUESTIONS;

// Event listeners
startBtnEl.addEventListener("click", startQuiz);
resultRestartBtnEl.addEventListener("click", restartQuiz);

function startQuiz() {
  // change the screen
  startScreenEl.classList.remove("active");
  quizScreenEl.classList.add("active");

  // set the current, total questions count
  currentQuestionIndex = 0;
  score = 0;
  quizScoreEl.textContent = score;

  // start quiz (show questions)
  showQuestion();
}

function showQuestion() {
  answersDisablesd = false;
  quizCurrentQuestionEl.textContent = currentQuestionIndex + 1;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const progressPercent = (currentQuestionIndex / TOTAL_QUESTIONS) * 100;
  quizProgressBarEl.style.width = progressPercent + "%";

  quizQuestionTextEl.textContent = currentQuestion.question;
  quizAnswersContainerEl.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    // button custom property
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    quizAnswersContainerEl.appendChild(button);
  });
}

function selectAnswer(event) {
  // don't answer more than once
  if (answersDisablesd) return;

  answersDisablesd = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++;
    quizScoreEl.textContent = score;
  }

  // we can't directly treat 'quizAnswersContainerEl.children' as an array
  Array.from(quizAnswersContainerEl.children).forEach((button) => {
    // display the correct answer in both cases (correct/incorrect)
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      // only if incorrect answer has been selected
      button.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;

    // is there are more questions in the quiz ?
    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  // change the screen
  quizScreenEl.classList.remove("active");
  resultScreenEl.classList.add("active");

  resultFinalScoreEl.textContent = score;
  const percentage = (score / TOTAL_QUESTIONS) * 100;
  resultMessageEl.textContent = getResultMessage(percentage);
}

function getResultMessage(percentage) {
  let statement = "";
  if (percentage === 100) {
    statement = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    statement = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    statement = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    statement = "Not bad! Try again to improve!";
  } else {
    statement = "Keep studying! You'll get better!";
  }

  return statement;
}

function restartQuiz() {
  resultScreenEl.classList.remove("active");

  startQuiz();
}
