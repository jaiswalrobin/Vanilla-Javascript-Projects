const form = document.getElementById("form"),
  search = document.getElementById("search"),
  result = document.getElementById("result"),
  more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//search by song name or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

//Get lyrics
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>
  `;
  more.innerHTML = "";
}

//Show Data in the DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
    ${data.data
      .map(
        (song) => `
    <li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
    </li>`
      )
      .join("")}
    </ul>
    `;
  if (data.prev || data.next) {
    more.innerHTML = `
          ${
            data.prev
              ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
              : ""
          }
          ${
            data.next
              ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
              : ""
          }
        `;
  } else {
    more.innerHTML = "";
  }
}

//Getting More Songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

//Get Lyrics buuton click
result.addEventListener("click", (e) => {
  const clickeEl = e.target;
  if (clickeEl.tagName === "BUTTON") {
    const artist = clickeEl.getAttribute("data-artist");
    const songTitle = clickeEl.getAttribute("data-songTitle");

    getLyrics(artist, songTitle);
  }
});

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("please type something to search");
  } else {
    searchSongs(searchTerm);
  }
});
