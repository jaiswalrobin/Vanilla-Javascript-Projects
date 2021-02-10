const container = document.querySelector('.container'),
      seats = document.querySelectorAll('.row .seat:not(.occupied)'),
      count = document.getElementById('count'),
      total = document.getElementById('total'),
      movieSelect = document.getElementById('movie');


var  ticketPrice = +movieSelect.value;

// Get data from local storage and populate UI
populateUI();

//Save Selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}




// Update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //saving to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * selectedMoviePrice;
}


//Movie Select Event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
   setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//Get data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Seat click Event
container.addEventListener('click', e =>{
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected')
    }
    updateSelectedCount();
});

// initial count and total set
updateSelectedCount();