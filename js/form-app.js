function Reservation(name, date, guests, meats, tortillas) {
    this.name = name;
    this.date = date;
    this.guests = guests;
    this.meats = meats;
    this.tortillas = tortillas;
}

const form = document.querySelector('form');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    function formatDate(date) {
        const d = new Date(date);
        const day = ('0' + d.getDate()).slice(-2);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();

        return month + '/' + day + '/' + year;
    }


    const reserveName = document.getElementById('full-name').value;

    const eventDate = document.getElementById('date').value;
    const reserveDate = formatDate(eventDate);
    const reserveGuests = document.getElementById('guest-number').value;
    const reserveMeats = document.getElementById('meats').value;
    const reserveTortillas = document.getElementById('tortillas').value;

    const newReservation = new Reservation(reserveName, reserveDate, reserveGuests, reserveMeats, reserveTortillas);


    // Retrieve the current list of reservations from localStorage, or set it to an empty array if it does not exist.
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Add the new reservation object to the list of reservations.
    reservations.push(newReservation);

    // Convert the list of reservations to a JSON string and store it in the browser's localStorage.
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Reset the form inputs after the submission has been processed.
    event.target.reset();

}
