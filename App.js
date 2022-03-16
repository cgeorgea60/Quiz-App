let questions = [];
// SELECT ELEMENTS
const question = document.getElementById("question");
const options = document.querySelectorAll(".option-text");
const marks = document.querySelector(".marks");
const progressBar = document.querySelector(".progressbarfull");
const btn = document.querySelector(".btn");
const mine = document.getElementById("mine");
const loader = document.getElementById("loader");
const game = document.querySelector(".quiz-container");

// VARIABLES
let score = 0;
let totalScore = 0;
let acceptingAnswers = false;
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

//CONSTANTS
const MAX_QUESTIONS = 20;
const BONUS_MARKS = 5;

const url =
  "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    questions = data.results.map((laodedQuestion) => {
      const formattedQuestions = {
        question: laodedQuestion.question,
      };
      // FORMATING QUESTION TO MY SPECIFICATION
      answerChoices = [...laodedQuestion.incorrect_answers];
      formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestions.answer - 1,
        0,
        laodedQuestion.correct_answer
      );
      answerChoices.forEach((option, index) => {
        formattedQuestions["option" + (index + 1)] = option;
      });
      return formattedQuestions;
    });

    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

startGame = () => {
  score = 0;
  questionCounter = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  //console.log(questions);
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", totalScore); // SAVE SCORE IN LOCALSTORAGE
    return window.location.assign("end.html"); //Go to end page
  }
  questionCounter++;
  mine.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}% `;

  questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  options.forEach((option, index) => {
    const letters = ["A", "B", "C", "D"];
    const number = option.dataset["number"];
    option.innerHTML = `${letters[index]}.            ${
      currentQuestion["option" + number]
    }`;
  });
  availableQuestions.splice(questionIndex, 1); //REMOVES ANSWERED QUESTION FROM POOL

  acceptingAnswers = true;
};
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedOption = e.target;
    selectedOption.classList.add("selected");
    setTimeout(() => {
      selectedOption.classList.remove("selected");
    }, 3000);
    //console.log(selectedOption);
    const selectedAnswer = selectedOption.dataset["number"];
    if (selectedAnswer == currentQuestion.answer) {
      score++;
      marks.innerHTML = `Score: ${score}`;
      totalScore = score * BONUS_MARKS;
    }
  });
});

btn.addEventListener("click", getNewQuestion);
