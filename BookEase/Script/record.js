function getRoomInfo() {
    var userid = getCookie("userID");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getRoomInfo.php?userID='+userid);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
			var response = JSON.parse(xhr.responseText);
             // Generate table rows
             document.getElementById("record").innerHTML ="<tr><th>Room</th><th>Date</th><th>Time</th><th>QR Code</th></tr>"
                   for (var i = 0; i < response.length; i++) {
                           var row = "<tr>" +
                            "<td>" + response[i].roomName + "</td>" +
                            "<td>" + response[i].date + "</td>" +
                            "<td>" + response[i].time + "</td>" +
                            "<td><a onclick='qr(" + response[i].roomName + ")' href='qrcode.html'>Show QR Code</a></td>" +
                            "</tr>";
    
                         document.getElementById("record").innerHTML += row;
                       }
        }
    }
    xhr.send();
}