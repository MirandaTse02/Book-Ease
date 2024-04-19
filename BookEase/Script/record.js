function getCookie(name) {
    var c = document.cookie;
    var prefix = name + "=";
    var begin = c.indexOf("; "+prefix);
    if (begin == -1) {
        begin = c.indexOf(prefix);
        if (begin != 0) return null;
    }
    
    return decodeURI(c.substring(begin + prefix.length));
}

function getRecord() {
    var userid = getCookie("userID");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/getRecord.php?userID='+userid);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
			var response = JSON.parse(xhr.responseText);
             // Generate table rows
             var record = document.getElementById("record");
             record.innerHTML ="<tr><th>Room</th><th>Date</th><th>Time</th><th>QR Code</th></tr>";
             var count = Object.keys(response).length;
             if (count == 7) {
                var row = "<tr>" +
                     "<td>" + response.roomID + "</td>" +
                     "<td>" + response.bookDate + "</td>" +
                     "<td>" + response.timeslot + "</td>" +
                     "<td><a onclick='qr(" + response.bookingID +")' href='qrcode.html'>Show QR Code</a></td>" +
                     "</tr>";

                  document.getElementById("record").innerHTML += row;
             } else {
                for (var i = 0; i < count; i++) {
                    var row = "<tr>" +
                     "<td>" + response[i].roomID + "</td>" +
                     "<td>" + response[i].bookDate + "</td>" +
                     "<td>" + response[i].timeslot + "</td>" +
                     "<td><a onclick='qr(" + response[i].bookingID + ")' href='qrcode.html'>Show QR Code</a></td>" +
                     "</tr>";

                  document.getElementById("record").innerHTML += row;
                }
             }
                   
        }
    }
    xhr.send();
}

function qr(bookingID) {
    localStorage.setItem("BookingID", bookingID);
}

getRecord();