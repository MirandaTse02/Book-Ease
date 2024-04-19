let selectedTimeSlot = null;

function updateTable(date){
    var userid = getCookie("userID");
    var row="<tr><th>Time slot/ Room</th><th>8:00-10:00</th><th>10:00-12:00</th><th>12:00-14:00</th><th>14:00-16:00</th><th>16:00-18:00</th></tr>";
    document.getElementById("timetable").innerHTML = row; //got error maybe, test again
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/booking.php?date='+date);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
            let room = "TU101,FJ301,BC302,DE403,EF311";
            let roomarray = room.split(',');
            var response = JSON.parse(xhr.responseText);
            for(var i=0;i<5;i++){
                var availableTimeSlotArray=checkTimeSlot(roomarray[i],response);
                row += "<tr>"+"<td>"+roomarray[i]+"</td>" ;
                for(var j=0;j<6;j++){
                    if (availableTimeSlotArray.every(el => typeof el === 'number') && availableTimeSlotArray.includes(j)) {
                        row=row+"<td>" + "<button onclick=\"selectTimeSlot('FJ301', '8:00-10:00')\">Available</button> "+ "</td>";
                    } 
                    else {
                        row=row+"<td>"+"<button onclick=\"selectTimeSlot('', '')\">X</button>"+"</td>";
                    }
                }
                row=row+"</tr>";
                document.getElementById("timetable").innerHTML += row;
                
            }
        }
    }
    xhr.send();

}

function checkTimeSlot(room,response){
    let timeslot="8:00-10:00,10:00-1200,12:00-1400,14:00-16:00,16:00-18:00";
    let timeslotarray = timeslot.split(',');
    let availableTimeSlot=[];
    for(var i=0;i<5;i++){
        if (response.toLowerCase().includes((room+timeslot[i]).toLowerCase())){
            availableTimeSlot=availableTimeSlot.push(i);
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