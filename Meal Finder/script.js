const mealInput = document.getElementById("meal-find"),
  mealInfo = document.getElementById("meal-info-container"),
  singleMeal = document.getElementById("single-meal-details"),
  search = document.getElementById("search"),
  randomMealBtn = document.getElementById("random-meal-btn"),
  submenu = document.getElementById("submenu"),
  categoryLi = document.getElementsByClassName("categoryli"),
  searchResults = document.getElementById("search-results");

function mealfind(meals) {
  const response = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`
  ).then((res) => res.json());

  return response;
}

//Meal to Search
function searchMeal() {
  const mealToSearch = mealInput.value;
  mealInfo.innerHTML = "";
  singleMeal.innerHTML = "";
  mealfind(mealToSearch).then((data) => {
    if (data.meals) {
      searchResults.innerText = `Showing search result for ${mealToSearch}`;
      data.meals.forEach((item) => {
        const spanEl = document.createElement("span");
        const imgEl = document.createElement("img");
        const divEl = document.createElement("div");
        divEl.className = "meal-box";
        divEl.setAttribute("data-mealID", `${item.idMeal}`);
        spanEl.className = "meal-name";
        imgEl.className = "meal-img";
        imgEl.src = item.strMealThumb;
        spanEl.innerText = item.strMeal;
        divEl.append(imgEl, spanEl);
        mealInfo.appendChild(divEl);
      });
    } else {
      searchResults.innerText = `Nothing found for '${mealToSearch}'`;
    }
  });
}

//fetching all meal categories
function categoryGenerator() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {
      data.categories.map((item) => {
        return item.strCategory;
      });

      submenu.innerHTML = data.categories
        .map(
          (item) =>
            `<li class="categoryli" data-idCategory = "${item.idCategory}">${item.strCategory}</li>`
        )
        .join("");
    });
}

// MEAL BY CATEGORY
function mealByCategory(e) {
  singleMeal.innerHTML = "";
  mealInfo.innerHTML = "";

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.innerText}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.meals) {
        searchResults.innerText = `Showing search result for ${e.target.innerText}`;
        data.meals.forEach((item) => {
          const spanEl = document.createElement("span");
          const imgEl = document.createElement("img");
          const divEl = document.createElement("div");
          divEl.className = "meal-box";
          divEl.setAttribute("data-mealID", `${item.idMeal}`);
          spanEl.className = "meal-name";
          imgEl.className = "meal-img";
          imgEl.src = item.strMealThumb;
          spanEl.innerText = item.strMeal;
          divEl.append(imgEl, spanEl);
          mealInfo.appendChild(divEl);
        });
      } else {
        searchResults.innerText = `Nothing found for '${mealToSearch}'`;
      }
    });
}

//Fetch email by Id
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//Fetch Random Meal from API
function randomMealGenerator() {
  //Clear meals and Heading
  searchResults.innerHTML = "";
  mealInfo.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeal.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>Meal Category - ${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `Meal's likely Area - ${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>`;
}

// Event listeners
search.addEventListener("click", searchMeal);
randomMealBtn.addEventListener("click", randomMealGenerator);
submenu.addEventListener("click", mealByCategory);

mealInfo.addEventListener("click", (e) => {
  const chosenMealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-box");
    } else {
      return false;
    }
  });

  if (chosenMealInfo) {
    const mealID = chosenMealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

// Initializing Categories
categoryGenerator();
