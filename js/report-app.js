let parentElement = document.getElementById('report');

let tableHeaders = ['Name', 'Date', 'Number of Guests', 'Meats', 'Tortillas'];

console.log(tableHeaders);
function Reservation(name, date, guests, meats, tortillas) {
    this.name = name;
    this.date = date;
    this.guests = guests;
    this.meats = meats;
    this.tortillas = tortillas;
}

let bryan = new Reservation('Bryan Garduno', '05/18/1996', 50, 'chicken', 'corn');

console.log(bryan);


let table = document.createElement('table');
table.className = 'table';
parentElement.appendChild(table);

let thead = document.createElement('thead');
thead.className = 'table__head';
thead.style.display = 'none';
table.appendChild(thead);


let headRow = document.createElement('tr');
headRow.className = 'table__row';
thead.appendChild(headRow);


// Function to add new data to table:

let tbody = document.createElement('tbody');
table.appendChild(tbody);
tbody.className = 'table__body';

Reservation.prototype.addData = function () {
    for (let i = 0; i < tableHeaders.length; i++) {
        let headCell = document.createElement('th');
        headRow.appendChild(headCell);
        headCell.className = 'table__cell';
        headCell.textContent = tableHeaders[i];
    }

    let bodyRow = document.createElement('tr');
    bodyRow.className = 'table__row';
    tbody.appendChild(bodyRow);

    let bodyName = document.createElement('td');
    bodyName.className = 'table__cell';
    bodyRow.appendChild(bodyName);
    bodyName.textContent = this.name;

    let bodyDate = document.createElement('td');
    bodyDate.className = 'table__cell';
    bodyRow.appendChild(bodyDate);
    bodyDate.textContent = this.date;

    let bodyGuests = document.createElement('td');
    bodyGuests.className = 'table__cell';
    bodyRow.appendChild(bodyGuests);
    bodyGuests.textContent = this.guests;

    let bodyMeats = document.createElement('td');
    bodyMeats.className = 'table__cell';
    bodyRow.appendChild(bodyMeats);
    bodyMeats.textContent = this.meats;

    let bodyTortillas = document.createElement('td');
    bodyTortillas.className = 'table__cell';
    bodyRow.appendChild(bodyTortillas);
    bodyTortillas.textContent = this.tortillas;


}


// Event Listener

let noDataMessage = document.createElement('p');
noDataMessage.className = 'reports__message';
noDataMessage.textContent = 'NO RESERVATIONS TO DISPLAY';
parentElement.appendChild(noDataMessage);


function displayReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    if (reservations.length === 0) {
        thead.style.display = 'none';
    } else {
        noDataMessage.style.display = 'none';
        thead.style.display = 'table-header-group';
    }

    for (let reservation of reservations) {
        let r = new Reservation(reservation.name, reservation.date, reservation.guests, reservation.meats, reservation.tortillas);
        r.addData();
    }
}



displayReservations();

let resetButton = document.createElement('button');
resetButton.className = 'report__button-reset';
parentElement.appendChild(resetButton);
resetButton.setAttribute('type', 'reset');
resetButton.textContent = 'Reset';


function clearTable() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    localStorage.removeItem('reservations');
    displayReservations();
}


resetButton.addEventListener('click', clearTable);
