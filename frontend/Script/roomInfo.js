window.onload = function() {
    var roomName = localStorage.getItem("Room");
    var room = document.getElementById("roomName");
    
    room.innerText = roomName;
}

// get room info from db
function getRoomInfo() {
    var roomName = localStorage.getItem("Room");
    
    var xhr = nee XMLHttpRequest();
    xhr.open('GET', 'getRoomInfo.php?roomName='+roomName);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
			var response = JSON.parse(xhr.responseText);
            
            // append info
        }
    }
}

getRoomInfo();