const main = document.querySelector("main"),
  voicesSelect = document.querySelector("#voices"),
  textarea = document.querySelector("#text"),
  readBtn = document.querySelector("#read"),
  toggleBtn = document.getElementById("toggle"),
  closeBtn = document.querySelector("#close");

const data = [
  {
    image: "./img/drink.jpg",
    text: " I'm thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

//Create a Text Box
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>`;
  //speak Event

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    //Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

//Init speech synth
const message = new SpeechSynthesisUtterance();

//Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

//set text
function setTextMessage(text) {
  message.text = text;
}
//Speak text
function speakText() {
  speechSynthesis.speak(message);
}

//Set Voice
function setVoice(e) {
  message.voice = voices.find(
    (voice) => voice.name + " " + voice.lang === e.target.value
  );
}

//Event listeners
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

voicesSelect.addEventListener("change", setVoice);

//Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

//Voices Changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

getVoices();
