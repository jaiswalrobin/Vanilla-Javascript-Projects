const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const songUpdate = document.getElementById("song-update");
const songEnd = document.getElementById("song-end");

// song titles
const songs = ["hey", "summer", "ukulele"];

// keeping track of song
let songIndex = 2;

//Initially load song details int DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `../Music Player/music/${song}.mp3`;
  cover.src = `../Music Player/images/${song}.jpg`;
}

//Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//Pause the Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

//Previous Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Update song

//Event listeners

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Get minutes
  let minute = Math.floor(currentTime / 60);
  if (minute < 10) {
    minute = "0" + String(minute);
  }
  // Get Seconds
  let seconds = Math.floor(currentTime) - minute * 60;
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }

  if (isNaN(minute) || isNaN(seconds) || isNaN(duration)) {
    songUpdate.innertext = "--:--";
    songEnd.innerText = "--:--";
  } else {
    songUpdate.innerText = `${minute}:${seconds}`;

    // Total Song Duration
    if (duration / 60 < 10) {
      let totalduration = "0" + Math.floor(duration / 60);
      songEnd.innerText = `${totalduration}:${Math.round(duration % 60)}`;
    } else {
      songEnd.innerText = `${Math.floor(duration / 60)}:${Math.round(
        duration % 60
      )}`;
    }
  }
}

//Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//Time update of song
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

//Song ends
audio.addEventListener("ended", nextSong);
