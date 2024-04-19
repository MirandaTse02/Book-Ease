let selectedTimeSlot = null;

window.addEventListener("DOMContentLoaded", (e) => {
    const el = document.getElementsByTagName("input");
    if (el) {
        for (const element of Array.from(el)) {
            element.addEventListener('change', function (event) {
                event.preventDefault();
                var date = element.value;
                fecthtimetable();
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '../php/booking.php?date=' + date);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        // response json
                        var response = JSON.parse(xhr.responseText);
                        console.log(Object.keys(response).length);
                        console.log(typeof response);
                        if(response.length!=0){
                            if(response.length==1){
                                room = response["roomID"]
                                timeslot = response["timeslot"]
                                console.log(room,timeslot);
                                id=room+" "+timeslot;
                                console.log(id);
                                var booked=document.getElementById(id);
                                booked.innerHTML ="<td>" + "<button id=\""+id+"\" onclick=\"selectTimeSlot('', '')\">X</button>" + "</td>";
                                console.log(booked)
                            }else{
                        for(var i=0;i<response.length;i++){
                            room = response[i]["roomID"]
                            timeslot = response[i]["timeslot"]
                            console.log(room,timeslot);
                            id=room+" "+timeslot;
                            var booked=document.getElementById(id);
                            booked.innerHTML ="<td>" + "<button id=\""+id+"\" onclick=\"selectTimeSlot('', '')\">X</button>" + "</td>";
                            console.log(booked)
                        }}
                    }
                    }               
                }
                xhr.send();
            })
        }
    }


});

function fecthtimetable() {
    html = "<table id=\"timetable\"> <tr><th>Time slot/ Room</th><th>8:00-10:00</th><th>10:00-12:00</th><th>12:00-14:00</th><th>14:00-16:00</th><th>16:00-18:00</th> </tr><tr><td>FJ301</td><td><button id=\"FJ301 8:00-10:00\" onclick=\"selectTimeSlot('FJ301', '8:00-10:00')\">Available</button></td><td><button id=\"FJ301 10:00-12:00\" onclick=\"selectTimeSlot('FJ301', '10:00-12:00')\">Available</button></td><td><button id=\"FJ301 12:00-14:00\" onclick=\"selectTimeSlot('FJ301', '12:00-14:00')\">Available</button></td><td><button id=\"FJ301 14:00-16:00\" onclick=\"selectTimeSlot('FJ301', '14:00-16:00')\">Available</button></td><td><button id=\"FJ301 16:00-18:00\" onclick=\"selectTimeSlot('FJ301', '16:00-18:00')\">Available</button></td></tr><tr><td>HJ202</td><td><button id=\"HJ202 8:00-10:00\" onclick=\"selectTimeSlot('HJ202', '8:00-10:00')\">Available</button></td><td><button id=\"HJ202 10:00-12:00\" onclick=\"selectTimeSlot('HJ202', '10:00-12:00')\">Available</button></td><td><button id=\"HJ202 12:00-14:00\" onclick=\"selectTimeSlot('HJ202', '12:00-14:00')\">Available</button></td><td><button id=\"HJ202 14:00-16:00\" onclick=\"selectTimeSlot('HJ202', '14:00-16:00')\">Available</button></td><td><button id=\"HJ202 16:00-18:00\" onclick=\"selectTimeSlot('HJ202', '16:00-18:00')\">Available</button></td></tr><tr><td>N101</td><td><button id=\"N101 8:00-10:00\" onclick=\"selectTimeSlot('N101', '8:00-10:00')\">Available</button></td><td><button id=\"N101 10:00-12:00\" onclick=\"selectTimeSlot('N101', '10:00-12:00')\">Available</button></td><td><button id=\"N101 12:00-14:00\" onclick=\"selectTimeSlot('N101', '12:00-14:00')\">Available</button></td><td><button id=\"N101 14:00-16:00\" onclick=\"selectTimeSlot('N101', '14:00-16:00')\">Available</button></td><td><button id=\"N101 16:00-18:00\" onclick=\"selectTimeSlot('N101', '16:00-18:00')\">Available</button></td></tr><tr><td>TU103</td><td><button id=\"TU103 8:00-10:00\" onclick=\"selectTimeSlot('TU103', '8:00-10:00')\">Available</button></td><td><button id=\"TU103 10:00-12:00\" onclick=\"selectTimeSlot('TU103', '10:00-12:00')\">Available</button></td><td><button id=\"TU103 12:00-14:00\" onclick=\"selectTimeSlot('TU103', '12:00-14:00')\">Available</button></td><td><button id=\"TU103 14:00-16:00\" onclick=\"selectTimeSlot('TU103', '14:00-16:00')\">Available</button></td><td><button id=\"TU103 16:00-18:00\" onclick=\"selectTimeSlot('TU103', '16:00-18:00')\">Available</button></td></tr><tr><td>TU107</td>"
    html += "<td><button id=\"TU107 8:00-10:00\" onclick=\"selectTimeSlot('TU107', '8:00-10:00')\">Available</button></td>"
    html += "<td><button id=\"TU107 10:00-12:00\" onclick=\"selectTimeSlot('TU107', '10:00-12:00')\">Available</button></td>"
    html += "<td><button id=\"TU107 12:00-14:00\" onclick=\"selectTimeSlot('TU107', '12:00-14:00')\">Available</button></td>"
    html += "<td><button id=\"TU107 14:00-16:00\" onclick=\"selectTimeSlot('TU107', '14:00-16:00')\">Available</button></td>"
    html += "<td><button id=\"TU107 16:00-18:00\"onclick=\"selectTimeSlot('TU107', '16:00-18:00')\">Available</button></td>"
    html += "</tr>"
    html += "<tr>"
    html += " <td>V311</td>"
    html += "<td><button id=\"V311 8:00-10:00\" onclick=\"selectTimeSlot('V311', '8:00-10:00')\">Available</button></td>"
    html += "<td><button id=\"V311 10:00-12:00\" onclick=\"selectTimeSlot('V311', '10:00-12:00')\">Available</button></td>"
    html += "<td><button id=\"V311 12:00-14:00\" onclick=\"selectTimeSlot('V311', '12:00-14:00')\">Available</button></td>"
    html += "<td><button id=\"V311 14:00-16:00\" onclick=\"selectTimeSlot('V311', '14:00-16:00')\">Available</button></td>"
    html += "<td><button id=\"V311 16:00-18:00\" onclick=\"selectTimeSlot('V311', '16:00-18:00')\">Available</button></td>"
    html += "</tr>"
    html += "</table>"
    var table = document.getElementById("timetable");
    table.innerHTML = html;
}

/*function checkTimeSlot(room, response) {
    let timeslot = "8:00-10:00,10:00-1200,12:00-1400,14:00-16:00,16:00-18:00";
    let timeslotarray = timeslot.split(',');
    let availableTimeSlot = [];
    for (var i = 0; i < 5; i++) {
        if (response.toLowerCase().includes((room + timeslot[i]).toLowerCase())) {
            availableTimeSlot = availableTimeSlot.push(i);
        }
    }
    return availableTimeSlot;

}*/

function selectTimeSlot(room, timeSlot) {
    if (timeSlot === '' && room === '') {
        selectedTimeSlot = null;
    } else {
        selectedTimeSlot = { room, timeSlot };
    }
}
function getCookie(name) {
    var c = document.cookie;
    var prefix = name + "=";
    var begin = c.indexOf("; "+prefix);
    if (begin == -1) {
        begin = c.indexOf(prefix);
        if (begin != 0) return null;
    }
    
    return decodeURI(c.substring(begin+prefix.length));
}


function submitBooking() {
    if (selectedTimeSlot === null) {
        alert('Please select an available time slot.');
    } else if (selectedTimeSlot) {
        var userID=getCookie("userID");
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        // Configure the request
        xhr.open('POST', '../php/booking.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Set up a callback function to handle the response
        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                console.log(userID);
            } else {
                console.log('Request failed. Status code:', xhr.status);
            }
        };
        const { room, timeSlot } = selectedTimeSlot;
        // Send the request with some data
        const data = 'userID='+userID+' &room='+room+' &timeSlot='+timeSlot;
        console.log(data);
        xhr.send(data);

        
        alert(`Time slot ${timeSlot} for room ${room} booked successfully.`);
        
    }
}