const seatContainer = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
let cost = document.getElementById('cost');
const movieName = document.getElementById('movie');
const price = document.getElementsByClassName('cost');
let ticketPrice = +movieName.value;

populateUI();

function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    let selectedIndex = [...selectedSeats].map(seat =>  [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedIndex));
    
    let seatCount = selectedSeats.length;
    count.innerText = seatCount;
    cost.innerText = ticketPrice*seatCount;
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

function populateUI(){

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));  
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const movieIndex = localStorage.getItem('movieIndex');

    if(movieIndex !== null) {
        movieName.selectedIndex = movieIndex;
    }

    let moviePrice = localStorage.getItem('moviePrice');
    if(moviePrice!== null) {
        cost.innerText = localStorage.getItem('moviePrice') * selectedSeats.length;
        count.innerText = selectedSeats.length;
    }

}

movieName.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedSeats();
});

seatContainer.addEventListener('click', (e) => {
   if( e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    updateSelectedSeats();
   }
})