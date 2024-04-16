window.onload = function() {
    var roomName = localStorage.getItem("Room");
    var room = document.getElementById("roomName");
    
    room.innerText = roomName;
}