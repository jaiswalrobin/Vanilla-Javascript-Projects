const balance = document.getElementById("actual-balance"),
  incomeCame = document.getElementById("income-came"),
  incomeGone = document.getElementById("income-gone"),
  transactionType = document.getElementById("transaction-type"),
  transactionDetail = document.getElementById("transaction-box"),
  transactionAmount = document.getElementById("transaction-value"),
  transactionBtn = document.getElementById("transaction-btn"),
  updateBtn = document.getElementById("update-btn");

const localStoragetransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStoragetransactions : [];

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (
    transactionDetail.value.trim() === "" ||
    transactionAmount.value.trim() == ""
  ) {
    alert("Please add text and the amount.");
  } else {
    const transaction = {
      id: generateID(),
      text: transactionDetail.value,
      amount: +transactionAmount.value,
    };
    transactions.push(transaction);
    getAmountandText(transaction);
    updateValues();
    updateLocalStorage();
    transactionDetail.value = "";
    transactionAmount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 10000);
}

// Add transaction to DOM list
function getAmountandText(transaction) {
  // Get Sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("div");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  
  
    <p class="transaction ">${transaction.text} </p>
    <p class="transaction">${sign}${Math.abs(transaction.amount)} </p>
    `;
  transactionType.appendChild(item);
}

//Update balance , income and expense
function updateValues() {
  incomeCame.innerText = "";
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);
  incomeGone.innerText = `$${expense}`;
  balance.innerText = "$" + total;
  incomeCame.innerText = "$" + income;
}

//Remove Transaction By ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// //Edit transaction
// function editTransaction(id) {
//   const transactionEdit = transactions.filter((transaction) =>
//     transaction.id === id ? transaction.text : ""
//   );
//   // console.log(transactions, transactionEdit);
//   transactionDetail.value = transactionEdit[0].text;
//   transactionAmount.value = transactionEdit[0].amount;
//   updateTransaction(id);
// }

// Update local transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init App
function init() {
  transactionType.innerHTML = "";
  transactions.forEach(getAmountandText);
  updateValues();
}
init();
//Event listeners
transactionBtn.addEventListener("click", addTransaction);
