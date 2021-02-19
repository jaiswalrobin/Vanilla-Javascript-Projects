const schoolInfo = document.getElementById("school-info-container"),
  searchBtn = document.getElementById("search-btn"),
  navbtn = document.getElementById("ham-nav"),
  search = document.getElementById("search"),
  sideNav = document.getElementById("side-navbar-mob"),
  filterBtn = document.getElementById("filter-btn"),
  filterNav = document.getElementById("filter-side-navbar"),
  filterItem = document.getElementsByClassName("filter-item"),
  matchList = document.getElementById("match-list"),
  byRelevance = document.getElementById("by-relevance"),
  byRating = document.getElementById("by-rating"),
  byFees = document.getElementById("by-fees"),
  byCity = document.getElementsByClassName("by-city")[0],
  byArea = document.getElementsByClassName("by-area")[0],
  byBoard = document.getElementsByClassName("by-board")[0];

//Dummy School Info Array
const SchoolInfoArr = [
  {
    name: "Himmadri Public School",
    img:
      "https://images.unsplash.com/photo-1610028490235-037dedfc3f7c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2Nob29sJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Delhi",
    area: "Bahadurgarh",
    board: "CBSE",
    relevance: 3,
    rating: "3",
    fees: "30000",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "Gagan Public School",
    img:
      "https://images.unsplash.com/photo-1593275282431-b80fb5d76df9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Delhi",
    area: "Bahadurgarh",
    board: "CBSE",
    relevance: 3,
    rating: "2",
    fees: "20000",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "MPSS Public School",
    img:
      "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8c2Nob29sJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Delhi",
    board: "ICSE",
    area: "Bahadurgarh",
    relevance: 2,
    rating: "5",
    fees: "60000",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "SMM Public School",
    img:
      "https://images.unsplash.com/photo-1549455905-7692efd12860?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Bangalore",
    board: "ICSE",
    relevance: 1,
    rating: "1",
    fees: "5000",
    area: "Cook Town",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "Somnath Public School",
    img:
      "https://images.unsplash.com/photo-1549455905-7692efd12860?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Mumbai",
    board: "ICSE",
    relevance: 5,
    rating: "4",
    fees: "45000",
    area: "Dharavi",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "Ryan International Public School",
    img:
      "https://images.unsplash.com/photo-1549455905-7692efd12860?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Goa",
    board: "ICSE",
    relevance: 6,
    rating: "5",
    fees: "100000",
    area: "St. Petere's",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "N.K Bagrodia Public School",
    img:
      "https://images.unsplash.com/photo-1549455905-7692efd12860?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Kolkata",
    board: "ICSE",
    relevance: 7,
    rating: "5",
    fees: "90000",
    area: "Dharavi",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor itaque iure dolorum illo molestias voluptas libero tempora pariatur explicabo mollitia!",
  },
  {
    name: "St. Xavier's Public School",
    img:
      "https://images.unsplash.com/photo-1549455905-7692efd12860?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60",
    city: "Mumbai",
    board: "ICSE",
    relevance: 8,
    rating: "5",
    fees: "85000",
    area: "Worli",
    desc:
      "St. Xavier's School is a Christian Minority school under the management of the Society of Jesus, an international Christian Religious Order. The school is affiliated to the (CBSE).",
  },
];

function startApp(SchoolInfoArr) {
  const schoolHtml = SchoolInfoArr.map(
    (filterNav) => `
 <div class="card" style="width: 25rem;">
  <img class="card-img-top" src="${filterNav.img}" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">${filterNav.name}</h4>
    <h5 class="card-subtitle">${filterNav.city}<small style="margin-left: 3px">(Area : ${filterNav.area})</small></h5>
    <p class="card-text">${filterNav.desc}</p>
   
  </div>
</div>
 `
  ).join("");
  schoolInfo.innerHTML = schoolHtml;
}
startApp(SchoolInfoArr);
function searchStates(text) {
  let matchedResult = SchoolInfoArr.filter((school) => {
    const regex = new RegExp(`^${text}`, "gi");
    return school.name.match(regex);
  });
  if (text.length === 0) {
    matchedResult = [];
    matchList.innerHTML = "";
  }
  if (search.value.length === 0) {
    startApp(SchoolInfoArr);
  }

  outputHtml(matchedResult);
}

//Matched Result Output in HTML as a search result
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1 autosuggest">
        <h4><a href="#" >${match.name}</a> (${match.board}) <span 
        class="text-primary">${match.area}
        </span></h4>
        <small class="school-desc">${match.desc}</small>
        </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

let isMouseDown = false;

// navbar toggle
function navStart(e) {
  if (e.target.id === "filter-btn") {
    filterNav.classList.toggle("toggle");
    filterNav.focus();
  } else {
    // sideNav.focus();
    sideNav.classList.toggle("toggle");
  }
}

//closing side navabr on outside click
function closeNav(e) {
  if (!isMouseDown) {
    filterNav.classList.remove("toggle");
  }
}

//Setting Initial Filter options
function filterOptions() {
  const schoolcity = [...new Set(SchoolInfoArr.map((item) => item.city))];
  const schoolArea = [...new Set(SchoolInfoArr.map((item) => item.area))];
  const schoolBoard = [...new Set(SchoolInfoArr.map((item) => item.board))];

  const schoolByCity = schoolcity
    .map(
      (item) => `
        <a class="dropdown-item filter-item">${item}</a>
  `
    )
    .join("");
  byCity.innerHTML = schoolByCity;
  const schoolByArea = schoolArea
    .map(
      (item) => `
  <a class="dropdown-item filter-item">${item}</a>
  `
    )
    .join("");
  byArea.innerHTML = schoolByArea;
  const schoolByBoard = schoolBoard
    .map(
      (item) => `
  <a class="dropdown-item filter-item">${item}</a>
  `
    )
    .join("");
  byBoard.innerHTML = schoolByBoard;
}
filterOptions();

//search School based on name
function searchSchool() {
  let matchedResult = SchoolInfoArr.filter((school) => {
    const regex = new RegExp(`^${search.value}`, "gi");
    return school.name.match(regex);
  });
  startApp(matchedResult);
}

// Search School By Filter
function searchByFilter(e) {
  const toSearch = e.target.innerText;
  if (e.target.parentNode.classList.contains("by-city")) {
    const filterResult = SchoolInfoArr.filter(
      (item) => item.city.toLowerCase() === toSearch.toLowerCase()
    );
    startApp(filterResult);
    return function mem() {
      return filterResult;
    };
  } else if (e.target.parentNode.classList.contains("by-area")) {
    const filterResult = SchoolInfoArr.filter(
      (item) => item.area.toLowerCase() === toSearch.toLowerCase()
    );
    console.log(filterResult);
    startApp(filterResult);
  } else {
    const filterResult = SchoolInfoArr.filter(
      (item) => item.board.toLowerCase() === toSearch.toLowerCase()
    );
    startApp(filterResult);
  }
}

//Search School By Sort
function sortSchool(e) {
  const originalArrCopy = [...SchoolInfoArr];
  if (e.target.innerText.toLowerCase() === "by relevance") {
    const relevanceArr = originalArrCopy.sort(
      (a, b) => b.relevance - a.relevance
    );
    startApp(relevanceArr);
  } else if (e.target.innerText.toLowerCase() === "by rating") {
    const relevanceArr = originalArrCopy.sort((a, b) => b.rating - a.rating);
    startApp(relevanceArr);
  } else {
    const relevanceArr = originalArrCopy.sort((a, b) => b.fees - a.fees);
    startApp(relevanceArr);
  }
}

//Event listeners
search.addEventListener("input", () => searchStates(search.value));
navbtn.addEventListener("click", navStart);
filterBtn.addEventListener("click", navStart);
filterNav.addEventListener("blur", closeNav, true);
searchBtn.addEventListener("click", searchSchool);
byRating.addEventListener("click", sortSchool);
byRelevance.addEventListener("click", sortSchool);
byFees.addEventListener("click", sortSchool);

filterNav.addEventListener("mousedown", () => {
  isMouseDown = true;
});
filterNav.addEventListener("mouseup", () => {
  isMouseDown = false;
});
filterNav.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

//Dropdown items inside filter
[...filterItem].forEach((item) => {
  item.addEventListener("click", searchByFilter);
});
