const wordEl = document.getElementById("word"),
  wrongLettersEl = document.getElementById("wrong-letters"),
  playAgainBtn = document.getElementById("play-button"),
  popup = document.getElementById("popup-container"),
  notification = document.getElementById("notification-container"),
  finalMessage = document.getElementById("final-message"),
  figurePart = document.querySelectorAll(".figure-part");
const winAudio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3"
);
const goodAudio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3"
);
const badAudio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3"
);
const looseAudio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3"
);
const words = ["app", "application", "javascript", "magic"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show Hidden Word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `
            <span class="letters">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>`
    )
    .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    winAudio.play();
    finalMessage.innerText = "Congratulations! You Won!🎊";
    popup.style.display = "flex";
  }
}

// update the wrong letters
function updateWrongLetters() {
  //Display Wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  //Display parts
  figurePart.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check If lost
  if (wrongLetters.length === figurePart.length) {
    looseAudio.play();
    finalMessage.innerText = "You Lost";
    popup.style.display = "flex";
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// keydown letter press
window.addEventListener("keydown", (e) => {
  const letter = e.key;
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      goodAudio.play();
      goodAudio.currentTime = 0;
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      badAudio.play();
      updateWrongLetters();
    } else {
      showNotification();
    }
  }
});

//Restart Game and Play again
playAgainBtn.addEventListener("click", () => {
  //Pausing Winning Audio
  winAudio.pause();
  //Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup.style.display = "none";
});

displayWord();
