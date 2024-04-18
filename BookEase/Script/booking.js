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

// function generateQR(room, timeSlot) {
//     var content = "UserID: "+user+"\nRoomID: "+room+"\nDate: "+date+"\nTime: "+timeSlot;
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://api.qrserver.com/v1/create-qr-code/?data="+content+"&size=200x200", true);
//     xhr.responseType = 'blob'; // Set the response type as 'blob' to handle binary data
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             QR = xhr.responseText;
//             var imageURL = URL.createObjectURL(QR);
//             var imgElement = document.createElement('img');
//             imgElement.src = imageURL;

//             // Append the image to a container in the DOM
//             var container = document.getElementById('imageContainer');
//             container.appendChild(imgElement);
//         }
//     }
// }