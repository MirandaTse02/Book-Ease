var selectedTimeSlot = null;
var selectedDate;

window.addEventListener("DOMContentLoaded", (e) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var bookingDate = year + "-" + month + "-" + day;
    document.getElementById("bookingDate").value = bookingDate;
    console.log(bookingDate);
    selectedDate = bookingDate;
    fetchtimetable();
    setAllAva();
    timetable(bookingDate);
    document.getElementById("dateHeader").innerHTML = selectedDate;
    const el = document.getElementsByTagName("input");
    if (el) {
        for (const element of Array.from(el)) {
            element.addEventListener('change', function (event) {
                event.preventDefault();
                var date = element.value;
                console.log(date);
                setAllAva();
                timetable(date);
                selectedDate = date;
                document.getElementById("dateHeader").innerHTML = selectedDate;
            })
        }
    }
});

function setAllAva() {
    const slot = document.getElementsByClassName("slot");
    for (var i = 0; i < slot.length; i++) {
        const id = slot[i].id;
        const ids = id.split(' ');
        slot[i].onclick = function() {selectTimeSlot(ids[0], ids[1]) ;};
        slot[i].innerHTML = "Available";
    }
}

function timetable(date) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/booking.php?date=' + date);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
            var response = JSON.parse(xhr.responseText);
            if(response!=null){
                const result = Array.isArray(response);
                if (!result) {
                    room = response.roomID;
                    timeslot = response.timeslot;
                    id = room + " " + timeslot;
                    var booked = document.getElementById(id);
                    booked.onclick = function() {selectTimeSlot('', '') ;};
                    booked.innerHTML = "x";
                    console.log(booked)
                } else {
                    for (var i = 0; i < response.length; i++) {
                        room = response[i].roomID;
                        timeslot = response[i].timeslot;
                        // console.log(room, timeslot);
                        id = room + " " + timeslot;
                        var booked = document.getElementById(id);
                        booked.onclick = function() {selectTimeSlot('', '') ;};
                        booked.innerHTML = "x";
                        // console.log(booked)
                    }
                }
            }
        }
    }
    xhr.send();
}

function fetchtimetable() {
    html = "<tr><th>Time slot/ Room</th><th>08:00-10:00</th><th>10:00-12:00</th><th>12:00-14:00</th><th>14:00-16:00</th><th>16:00-18:00</th> \
    <tr><td>FJ301</td>\
    <td><button class=\"slot\" id=\"FJ301 08:00-10:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"FJ301 10:00-12:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"FJ301 12:00-14:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"FJ301 14:00-16:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"FJ301 16:00-18:00\">Available</button></td></tr>\
    <tr><td>HJ202</td>\
    <td><button class=\"slot\" id=\"HJ202 08:00-10:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"HJ202 10:00-12:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"HJ202 12:00-14:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"HJ202 14:00-16:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"HJ202 16:00-18:00\">Available</button></td></tr>\
    <tr><td>N101</td>\
    <td><button class=\"slot\" id=\"N101 08:00-10:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"N101 10:00-12:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"N101 12:00-14:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"N101 14:00-16:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"N101 16:00-18:00\">Available</button></td></tr>\
    <tr><td>TU103</td>\
    <td><button class=\"slot\" id=\"TU103 08:00-10:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"TU103 10:00-12:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"TU103 12:00-14:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"TU103 14:00-16:00\">Available</button></td>\
    <td><button class=\"slot\" id=\"TU103 16:00-18:00\">Available</button></td></tr>\
    <tr><td>TU107</td>";
    html += "<td><button class=\"slot\" id=\"TU107 08:00-10:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"TU107 10:00-12:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"TU107 12:00-14:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"TU107 14:00-16:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"TU107 16:00-18:00\">Available</button></td>";
    html += "</tr>";
    html += "<tr>";
    html += " <td>V304</td>";
    html += "<td><button class=\"slot\" id=\"V304 08:00-10:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"V304 10:00-12:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"V304 12:00-14:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"V304 14:00-16:00\">Available</button></td>";
    html += "<td><button class=\"slot\" id=\"V304 16:00-18:00\">Available</button></td>";
    html += "</tr>";
    var table = document.getElementById("timetable");
    table.innerHTML = html;
}


function selectTimeSlot(room, timeSlot) {
    if (timeSlot == '' && room == '') {
        selectedTimeSlot = null;
        document.getElementById('selected').innerHTML = 'Your Selection <br><br>Time slot not available';
    } else {
        selectedTimeSlot = { room, timeSlot };
        document.getElementById('selected').innerHTML = 'Your Selection<br><br>Date: '+selectedDate+'<br>Room: '+room+'<br>Time: '+timeSlot;
    }
    console.log(selectedTimeSlot);
}

function getCookie(name) {
    var c = document.cookie;
    var prefix = name + "=";
    var begin = c.indexOf("; " + prefix);
    if (begin == -1) {
        begin = c.indexOf(prefix);
        if (begin != 0) return null;
    }

    return decodeURI(c.substring(begin + prefix.length));
}


function submitBooking() {
    if (selectedTimeSlot == null) {
        alert('Please select an available time slot.');
    } else{
        var userID = getCookie("userID");
        const xhr = new XMLHttpRequest();
        // Configure the request
        xhr.open('POST', '../php/booking.php?date='+selectedDate);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        const { room, timeSlot } = selectedTimeSlot;
        
        // Set up a callback function to handle the response
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                var bookingID = xhr.responseText;
                var input = confirm(`${selectedDate} Time slot ${timeSlot} for room ${room} booked successfully. \n\nGo to My Record to check for the booking QR code.`);
                if (input != true) {
                    cancelBooking(bookingID);
                }
                else {
                    setAllAva();
                    timetable(selectedDate);
                }
            }
        };
        
        // Send the request with some data
        const data = 'userID=' + userID + '&room=' + room + '&timeSlot=' + timeSlot;
        console.log(data);
        // change date to call update table
        document.getElementById("bookingDate").value = selectedDate;
        xhr.send(data);
    }
    
}

function cancelBooking(booking) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '../php/booking.php?bookingID='+booking, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.XMLHttpRequest);
            console.log("\n delete: "+xhr.responseText);
        }
    }
    xhr.send();
}