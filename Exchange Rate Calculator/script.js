const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  async function fetchRate() {
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${currency_one}`
    );
    if (!response.ok) {
      const message = `We don't support this right now, kindly check later`;
      throw new Error(message);
    }
    return await response.json();
  }

  fetchRate()
    .then((data) => {
      const rate = data.rates[currency_two];
      if (rate === undefined) {
        throw new Error("We don't support this right now, kindly check later");
      }
      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    })

    .catch((error) => (rateElement.innerText = `${error.message}`));
}

// Event listeners setup
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});
