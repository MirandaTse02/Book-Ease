let selectedTimeSlot = null;

window.addEventListener("DOMContentLoaded", (e) => {
    const el = document.getElementsByTagName("input");
    if (el) {
        for (const element of Array.from(el)) {
            element.addEventListener('change', function (event) {
                event.preventDefault();
                alert("daskljfhaksdhf");
                var date = element.value;
                var row = "<tr><th>Time slot/ Room</th><th>8:00-10:00</th><th>10:00-12:00</th><th>12:00-14:00</th><th>14:00-16:00</th><th>16:00-18:00</th></tr>";
                var table=document.getElementById("timetable");
                table.innerHTML = row;
                fecthtimetable();
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'booking.php?date='+date);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        // response json
                        let room = "TU101,FJ301,BC302,DE403,EF311";
                        let roomarray = room.split(',');
                        var response = JSON.parse(xhr.responseText);
                        for (var i = 0; i < 5; i++) {
                            var availableTimeSlotArray = checkTimeSlot(roomarray[i], response);
                            row += "<tr>" + "<td>" + roomarray[i] + "</td>";
                            for (var j = 0; j < 6; j++) {
                                if (availableTimeSlotArray.every(el => typeof el === 'number') && availableTimeSlotArray.includes(j)) {
                                    row = row + "<td>" + "<button onclick=\"selectTimeSlot('FJ301', '8:00-10:00')\">Available</button> " + "</td>";
                                }
                                else {
                                    row = row + "<td>" + "<button onclick=\"selectTimeSlot('', '')\">X</button>" + "</td>";
                                }
                            }
                            row = row + "</tr>";
                            document.getElementById("timetable").innerHTML += row;

                        }
                    }
                    xhr.send();
                }
            })
        }
    }


});

function fecthtimetable(){
    html="<table id=\"timetable\"> <tr><th>Time slot/ Room</th><th>8:00-10:00</th><th>10:00-12:00</th><th>12:00-14:00</th><th>14:00-16:00</th><th>16:00-18:00</th> </tr><tr><td>FJ301</td><td><button id=\"FJ301 8:00-10:00\" onclick=\"selectTimeSlot('FJ301', '8:00-10:00')\">Available</button></td><td><button id=\"FJ301 10:00-12:00\" onclick=\"selectTimeSlot('FJ301', '10:00-12:00')\">Available</button></td><td><button id=\"FJ301 12:00-14:00\" onclick=\"selectTimeSlot('FJ301', '12:00-14:00')\">Available</button></td><td><button id=\"FJ301 14:00-16:00\" onclick=\"selectTimeSlot('FJ301', '14:00-16:00')\">Available</button></td><td><button id=\"FJ301 16:00-18:00\" onclick=\"selectTimeSlot('FJ301', '16:00-18:00')\">Available</button></td></tr><tr><td>HJ202</td><td><button id=\"HJ202 8:00-10:00\" onclick=\"selectTimeSlot('HJ202', '8:00-10:00')\">Available</button></td><td><button id=\"HJ202 10:00-12:00\" onclick=\"selectTimeSlot('HJ202', '10:00-12:00')\">Available</button></td><td><button id=\"HJ202 12:00-14:00\" onclick=\"selectTimeSlot('HJ202', '12:00-14:00')\">Available</button></td><td><button id=\"HJ202 14:00-16:00\" onclick=\"selectTimeSlot('HJ202', '14:00-16:00')\">Available</button></td><td><button id=\"HJ202 16:00-18:00\" onclick=\"selectTimeSlot('HJ202', '16:00-18:00')\">Available</button></td></tr><tr><td>N101</td><td><button id=\"N101 8:00-10:00\" onclick=\"selectTimeSlot('N101', '8:00-10:00')\">Available</button></td><td><button id=\"N101 10:00-12:00\" onclick=\"selectTimeSlot('N101', '10:00-12:00')\">Available</button></td><td><button id=\"N101 12:00-14:00\" onclick=\"selectTimeSlot('N101', '12:00-14:00')\">Available</button></td><td><button id=\"N101 14:00-16:00\" onclick=\"selectTimeSlot('N101', '14:00-16:00')\">Available</button></td><td><button id=\"N101 16:00-18:00\" onclick=\"selectTimeSlot('N101', '16:00-18:00')\">Available</button></td></tr><tr><td>TU103</td><td><button id=\"TU103 8:00-10:00\" onclick=\"selectTimeSlot('TU103', '8:00-10:00')\">Available</button></td><td><button id=\"TU103 10:00-12:00\" onclick=\"selectTimeSlot('TU103', '10:00-12:00')\">Available</button></td><td><button id=\"TU103 12:00-14:00\" onclick=\"selectTimeSlot('TU103', '12:00-14:00')\">Available</button></td><td><button id=\"TU103 14:00-16:00\" onclick=\"selectTimeSlot('TU103', '14:00-16:00')\">Available</button></td><td><button id=\"TU103 16:00-18:00\" onclick=\"selectTimeSlot('TU103', '16:00-18:00')\">Available</button></td></tr><tr><td>TU107</td>"
    html+="<td><button id=\"TU107 8:00-10:00\" onclick=\"selectTimeSlot('TU107', '8:00-10:00')\">Available</button></td>"
    html+="<td><button id=\"TU107 10:00-12:00\" onclick=\"selectTimeSlot('TU107', '10:00-12:00')\">Available</button></td>"
    html+="<td><button id=\"TU107 12:00-14:00\" onclick=\"selectTimeSlot('TU107', '12:00-14:00')\">Available</button></td>"
    html+="<td><button id=\"TU107 14:00-16:00\" onclick=\"selectTimeSlot('TU107', '14:00-16:00')\">Available</button></td>"
    html+="<td><button id=\"TU107 16:00-18:00\"onclick=\"selectTimeSlot('TU107', '16:00-18:00')\">Available</button></td>"
    html+="</tr>"
    html+="<tr>"
    html+=" <td>V311</td>"
    html+="<td><button id=\"V311 8:00-10:00\" onclick=\"selectTimeSlot('V311', '8:00-10:00')\">Available</button></td>"
    html+="<td><button id=\"V311 10:00-12:00\" onclick=\"selectTimeSlot('V311', '10:00-12:00')\">Available</button></td>"
    html+="<td><button id=\"V311 12:00-14:00\" onclick=\"selectTimeSlot('V311', '12:00-14:00')\">Available</button></td>"
    html+="<td><button id=\"V311 14:00-16:00\" onclick=\"selectTimeSlot('V311', '14:00-16:00')\">Available</button></td>"
    html+="<td><button id=\"V311 16:00-18:00\" onclick=\"selectTimeSlot('V311', '16:00-18:00')\">Available</button></td>"
    html+="</tr>"
    html+="</table>"
    var table=document.getElementById("timetable");
    table.innerHTML=html;
}

function checkTimeSlot(room, response) {
        let timeslot = "8:00-10:00,10:00-1200,12:00-1400,14:00-16:00,16:00-18:00";
        let timeslotarray = timeslot.split(',');
        let availableTimeSlot = [];
        for (var i = 0; i < 5; i++) {
            if (response.toLowerCase().includes((room + timeslot[i]).toLowerCase())) {
                availableTimeSlot = availableTimeSlot.push(i);
            }
        }
        return availableTimeSlot;

    }

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