let selectedTimeSlot = null;

function selectTimeSlot(room, timeSlot) {
    if (timeSlot === '' && room === '') {
        selectedTimeSlot = null;
    } else {
        selectedTimeSlot = { room, timeSlot };
    }
}

function submitBooking() {
    if (selectedTimeSlot === null) {
        alert('Please select an available time slot.');
    } else if (selectedTimeSlot) {
        const { room, timeSlot } = selectedTimeSlot;
        alert(`Time slot ${timeSlot} for room ${room} booked successfully.`);
    }
}