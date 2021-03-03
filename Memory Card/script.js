const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");
const deleteBtn = document.getElementById("delete-btn");

//Keeping Track Of current Card
let currentActiveCard = 0;

//Storing DOM Cards
const cardsEl = [];

//Storing Cards data
const cardsData = getCardsData();

//Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
  if (cardsEl.length < 1 || addContainer.classList.contains("show")) {
    deleteBtn.classList.add("hide");
  }
}

function getId() {
  return Math.floor(Math.random() * 100000);
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
          
    </div>
    `;
  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  //Add cards to DOM
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

//Add Card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

//Delete Card Functionality

function deleteCard(e) {
  console.log(e);
  const cardContainer = e.path.find((item) => item.id === "cards-container")
    .children;
  const ActiveCardFound = Array.from(cardContainer).find((item) => {
    return item.classList.contains("active");
  });
  const finalCard = ActiveCardFound.children[0].children[0].innerText;
  const cardsArr = JSON.parse(localStorage.getItem("cards")).filter((item) => {
    return item.question !== finalCard;
  });

  setCardsData(cardsArr);
  console.log(cardsArr);
  if (cardsArr.length < 1 || addContainer.classList.contains("show")) {
    deleteBtn.classList.add("hide");
  }
  e.stopPropagation();
}

//Event listeners

//Next button functionality
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

//Previous button functionality
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

//show add container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

//Adding New Card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  const ID = getId();

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer, ID };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//Clear Cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

//Delete Button Listener
deleteBtn.addEventListener("click", deleteCard);
