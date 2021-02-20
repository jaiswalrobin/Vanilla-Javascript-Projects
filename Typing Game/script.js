const word = document.getElementById("word"),
  text = document.getElementById("text"),
  scoreEl = document.getElementById("score"),
  timeEl = document.getElementById("time"),
  endgameEl = document.getElementById("end-game-container"),
  settingsBtn = document.getElementById("settings-btn"),
  startBtn = document.getElementsByClassName("start-btn")[0],
  difficultyContainer = document.getElementsByClassName(
    "difficulty-container"
  )[0],
  settingsForm = document.getElementById("settings-form"),
  difficultySelect = document.getElementById("difficulty");

const words = [
  "ACCOUNT",
  "ACCURATE",
  "ACRES",
  "ACROSS",
  "ACT",
  "ACTION",
  "ACTIVE",
  "ACTIVITY",
  "ACTUAL",
  "ACTUALLY",
  "ADD",
  "ADDITION",
  "ADDITIONAL",
  "ADJECTIVE",
  "ADULT",
  "ADVENTURE",
  "ADVICE",
  "AFFECT",
  "AFRAID",
  "AFTER",
  "AFTERNOON",
  "AGAIN",
  "AGAINST",
  "AGE",
  "AGO",
  "AGREE",
  "AHEAD",
  "AID",
  "AIR",
  "AIRPLANE",
  "ALIKE",
  "ALIVE",
  "ALL",
  "ALLOW",
  "ALMOST",
  "ALONE",
  "ALONG",
  "ALOUD",
  "ALPHABET",
  "ALREADY",
  "ALSO",
  "ALTHOUGH",
  "AM",
  "AMONG",
  "AMOUNT",
  "ANCIENT",
  "ANGLE",
  "ANGRY",
  "ANIMAL",
  "ANNOUNCED",
  "ANOTHER",
  "ANSWER",
  "ANTS",
  "ANY",
  "ANYBODY",
  "ANYONE",
  "ANYTHING",
  "ANYWAY",
  "ANYWHERE",
  "APART",
  "APARTMENT",
  "APPEARANCE",
  "APPLE",
  "APPLIED",
  "APPROPRIATE",
  "ARE",
  "AREA",
  "ARM",
  "ARMY",
  "AROUND",
  "ARRANGE",
  "ARRANGEMENT",
  "ARRIVE",
  "ARROW",
  "ART",
  "ARTICLE",
  "AS",
  "ASIDE",
  "ASK",
  "ASLEEP",
  "AT",
  "ATE",
  "ATMOSPHERE",
  "ATOM",
  "ATOMIC",
  "ATTACHED",
  "ATTACK",
  "ATTEMPT",
];

//Init word
let randomWord;

//init Score
let score = 0;

//init Time
let time = 10;

//setting initial difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//setting difficulty value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Focus on input element on starting app
text.focus();

// Start countdown

//Get Random Word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Update time
function updateTime(timeInterval) {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //endgame
    gameOver();
  }
}

//Update Score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}
addWordToDOM();

//START GAME FUNCTION
function startGame() {
  //   setTimeout(setInterval(updateTime, 1000), 1000);
  const timeInterval = setInterval(updateTime, 1000);
  updateTime(timeInterval);
}

//Game Over Show End-Game
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}
//Event listeners

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText.toUpperCase() === randomWord) {
    addWordToDOM();
    updateScore();
    //clear text
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "hard") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//settings btn Click
settingsBtn.addEventListener("click", () => {
  difficultyContainer.classList.toggle("hide");
});

//Difficulty Select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Starting game
startBtn.addEventListener("click", () => {
  const goodSound = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3"
  );
  goodSound.play();
  setTimeout(startGame, 1000);
});
