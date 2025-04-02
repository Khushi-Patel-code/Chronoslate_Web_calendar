# Chronoslate_Web_calendar
ChronoSlate is a web-based interactive calendar designed to help users manage their schedules and events effectively. With features like event booking, event colour selection, navigation between previous and next months, event deletion, and local storage for persistence, ChronoSlate offers the users with a seamless user experience for organizing their events with all the necessary information such as event name, reason, colour, notes, links all at one place.

## Features
- **Month Navigration:** Navigate through months using "Previous" and "Next" buttons.
- **Event Booking:** Click on a date to open a modal form and add event details such as event name, reason, colour, notes, and a link.
- **Event Highlighting:** Booked dates are visually marked with the selected colour.
- **Event Storage:** Event data is stored locally in the browser using localStorage.
- **Event Deletion:** Click a booked date to view and delete an event with a confirmation.
- **Vibrant colours:** Used to attract users and encourage engagement with the website by providing a visually appealing interface.

## Technologies Used
- **HTML:** Provides the structure for the calendar and form.
- **CSS**: Used for styling, with fonts like *Roboto Slab* and *Playfair Display*.  
- **JavaScript**: Implements calendar generation, event handling, and localStorage interactions.

## How to Use
1. **View the Calendar**: The calendar displays the current month by default.
2. **Navigate Months**: Use the "Previous Month" and "Next Month" buttons to change months or years.
3. **Book an Event**:
   - Click on a date to open the event form.
   - Fill in the details (event name is required).
   - Select a colour and optionally add a reason, notes, or a link. (If no colour is selected then default colour is applied)
   - Click "Save Event" to successfully book the date.
   - Click "Clear Event" to reset the form to blank fields.
4. **View Bookings**:
   - Hover over booked dates to see event names.
   - Click on a booked date to delete the event with a confirmation prompt.

## LocalStorage

- **Persistence**: Bookings are stored in `localStorage` to retain data across sessions.
- **Data Format**: Each booking includes date, name, reason, color, description, and link.

## Live Demo

Live Demo of the web calendar can be found at https://khushi-patel-code.github.io/Chronoslate_Web_calendar/ 


