// END GAME

const userName = document.getElementById("username");
const finalScore = document.getElementById("finalScore");
const savScoreBtn = document.getElementById("savScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
finalScore.innerText = mostRecentScore;

userName.addEventListener("keyup", () => {
  savScoreBtn.disabled = !userName.value;
});

saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: userName.value,
  };

  highScores.push(score);

  // sorting array in descendign order
  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  alert("save, successful");
  userName.value = "";

  window.location.assign(index.html);
};
