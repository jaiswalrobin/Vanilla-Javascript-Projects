const main = document.getElementById("main"),
  addUserBtn = document.getElementById("add-user"),
  doubleBtn = document.getElementById("double"),
  millioniareBtn = document.getElementById("show-millionaires"),
  sortBtn = document.getElementById("sort"),
  totalWealthBtn = document.getElementById("total-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
//Fetch Random user and their wealth || .then Version
function getRandomUser() {
  const res = fetch("https://randomuser.me/api")
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      return res.json();
    })
    .then((datajson) => {
      const user = datajson.results[0];
      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
      };
      addData(newUser);
    })
    .catch((err) => console.log(err.message));
}

//Adding New User to data array
function addData(newUser) {
  data.push(newUser);
  updateDOM();
}
//Update DOM
function updateDOM(defaultData = data) {
  //Clearing main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  defaultData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//formatting Number as currency string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//Doubling Money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sorting the Users with highest money
function sortByRichest() {
  console.log(data);
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Showing Only Millioniares
function showMillioniare() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

//Calculating total wealth
function totalWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const weathEl = document.createElement("div");
  weathEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(weathEl);
}

//Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
millioniareBtn.addEventListener("click", showMillioniare);
totalWealthBtn.addEventListener("click", totalWealth);
