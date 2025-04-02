let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let bookings = [];   // Array to store booking details
try {
    bookings = JSON.parse(localStorage.getItem("bookings")) || [];
} catch (error) {
    console.error("Error loading bookings from the localStorage:", error); // Logs any issues with retrieving bookings
    alert("There was an issue loading your bookings. Please try again after some time.");
}

let selectedDate = null;   //var for highlighted date wehn user selects it

const calendarBody = document.getElementById("calendar-body");
const currentMonthElement = document.getElementById("current-month");
const eventModal = document.getElementById("event-modal");
const closeModalButton = document.querySelector(".close-btn");
const saveEventButton = document.getElementById("save-event");
const clearEventButton = document.getElementById("clear-event");

// calendar dates
function generateCalendar(month, year) {
    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarBody.innerHTML = "";  // Clearing previous dates and table

    // Set the current month and year in the header
    currentMonthElement.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    // Creating Rows for calendar weeks
    let row = document.createElement("tr");

    // Filling with empty cells until the first day of month
    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
    }

    // Creating calendar days
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        cell.textContent = day;
        row.appendChild(cell);

        if (selectedDate && selectedDate.day === day && selectedDate.month === month && selectedDate.year === year) {
            cell.classList.add("highlighted-date");
        }

        // Add date click to each cell
        cell.addEventListener("click", function () {
            dateClick(cell, day, month, year);
        });

        loadCalendarBookings(cell, day, month, year);
        
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }

    const remainingCells = 7 - row.children.length; // Calculate remaining cells to complete the week
    for (let i = 0; i < remainingCells; i++) {
        let emptyCell = document.createElement("td");
        row.appendChild(emptyCell);

        if (row.children.length > 0) {
            calendarBody.appendChild(row);
        }
    }
}

function loadCalendarBookings(cell , day, month, year) { 
    bookings.forEach(booking => {
        const [eventDay, eventMonth, eventYear] = booking.date.split('/').map(Number);
        if (eventDay === day && eventMonth - 1 === month && eventYear === year) {
            cell.style.backgroundColor = booking.color;
            cell.title = `${booking.name}`; // Show event name as a tooltip when hovered

            cell.addEventListener("click", function () {
                if (confirm(`Are you sure you want to delete this booking on: ${booking.date}?\nbooking name: ${booking.name}\nbooking Reason: ${booking.reason}`)) {
                    try {
                        bookings = bookings.filter(b => b !== booking);   // Remove the selected booking from the array and update localStorage
                        if (bookings.length === 0) {
                            alert("No bookings to delete.");
                        }
                        localStorage.setItem("bookings", JSON.stringify(bookings)); // updated bookings
                        generateCalendar(currentMonth, currentYear); 
                    } catch (error) {
                        console.error("Error deleting booking:", error);
                        alert("An error occurred while deleting the booking. Please try again after some time.");
                    }
                }
            });
        }
    });
}


function dateClick(cell, day , month , year) {
    clearForm();   // Clear the previous form data
    eventModal.style.display = "flex";  //so the event form pops up

    if (selectedDate){
        selectedDate.classList.remove("highlighted-date");
    }  

    cell.classList.add("highlighted-date");
    selectedDate = { cell, day, month, year }; // Create a new object for the selected date
};

function saveEvent(event){
    event.preventDefault();

    const eventName = document.getElementById("event-name").value;
    const eventReason = document.getElementById("event-reason").value || "";
    const eventColor = document.getElementById("event-color").value;
    const eventDescription = document.getElementById("event-description").value || "";
    const eventLink = document.getElementById("event-link").value || "";

    // Creating new event object
    const newEvent = {
        date: `${selectedDate.day}/${selectedDate.month + 1}/${selectedDate.year}`,
        name: eventName,
        reason: eventReason,
        color: eventColor,
        description: eventDescription,
        link: eventLink
    };

    if (eventName === "") {
        alert("Event name is required!");
        return;  // Ensure event name is provided before saving
    }

    // Save the event details to array and bookings array to local storage
    bookings.push(newEvent);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Closing the modal form
    eventModal.style.display = "none";
    generateCalendar(currentMonth, currentYear);

}

function clearForm(){
    document.getElementById("event-form").reset();  // Reset form fields to default values
    selectedDate = null;
    const cells = document.querySelectorAll("#calendar-body td");
    cells.forEach(cell => 
        cell.classList.remove("highlighted-date")
    );
}

saveEventButton.addEventListener("click", saveEvent);
clearEventButton.addEventListener("click", function () {
    clearForm();
});

//for the close button in input form modal X
closeModalButton.addEventListener("click", function () {
    clearForm();
    eventModal.style.display = "none"; // Closeing the modal
});

// Navigate to the previous month
document.getElementById("prev-month").addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;         
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

// Navigate to the next month
document.getElementById("next-month").addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;          
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});
generateCalendar(currentMonth, currentYear);



