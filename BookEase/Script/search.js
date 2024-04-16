function info(room) {
    localStorage.setItem("Room", room);
    window.open("../Page/roomInfo.html", "_self")
}

// fetch and display all room
function fetchRoom() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getRoom.php?category=none'); // php may change
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
            var response = JSON.parse(xhr.responseText);
            var lecRoomList = document.getElementById('lecture');
            var classRoomList = document.getElementById('classroom');
            
            response.forEach(function(room) {
                // show room by category
                // if cate == lec, lecRoomList append child <div class="room"> ...
                // cate == classrom, classRoomList append child <div class="room"> ...
                var roomDiv = document.createElement("div");
                roomDiv.className = "room";

                var roomImg = document.createElement("img");
                roomImg.src = room.src // check php/ json
                roomImg.alt = room.name // check php/ json
                roomDiv.appendChild(roomImg);
    
                var roomName = document.createElement("p");
                roomName.innerHTML = room.name // check php/ json
                roomDiv.appendChild(roomName)
    
                var viewRoom = document.createElement("p");
                viewRoom.className = "viewRoom";
                viewRoom.innerHTML = "View Room";
                viewRoom.onclick = info(room.name); // check php/ json
                roomDiv.appendChild(viewRoom);

                if (room.cate == "lecture") {
                    lecRoomList.appendChild(roomDiv);
                } else {
                    classRoomList.appendChild(roomDiv);
                }
            });
        }
    };
    xhr.send();
}

window.addEventListener("DOMContentLoaded", (e) => {
    const el = document.getElementsByTagName("select");
    if (el) {
        // event listener category on change
        for (const element of Array.from(el)) {
            element.addEventListener('change', function(event) {
                event.preventDefault();
    
                var cate = element.value;
                var roomList = document.getElementById('roomList');
                roomList.innerHTML = "";

                // append category div
                var cateDiv = document.createElement("div");
                cateDiv.id = cate;
                roomList.appendChild(cateDiv);

                // append title
                var title = document.createElement("h2");
                if (cate == "lecture") {
                    title.innerHTML = "Lecture Theatres";
                } else {
                    title.innerHTML = "Classroom";
                }
                cateDiv.appendChild(title);
    
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'getRoom.php?category=' + cate); // php may change
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        // response json
                        var response = JSON.parse(xhr.responseText);
    
                        // for each response, if cate match, append
                        response.forEach((room) => {
                            if (room.cate == cate) { // check php/ json
                                var roomDiv = document.createElement("div");
                                roomDiv.className = "room";

                                var roomImg = document.createElement("img");
                                roomImg.src = room.src // check php/ json
                                roomImg.alt = room.name // check php/ json
                                roomDiv.appendChild(roomImg);
    
                                var roomName = document.createElement("p");
                                roomName.innerHTML = room.name // check php/ json
                                roomDiv.appendChild(roomName)
    
                                var viewRoom = document.createElement("p");
                                viewRoom.className = "viewRoom";
                                viewRoom.innerHTML = "View Room";
                                viewRoom.onclick = info(room.name); // check php/ json
                                roomDiv.appendChild(viewRoom);
    
                                cateDiv.appendChild(roomDiv);
                            }
                        });
                    }
                };
                xhr.send();
            });
        }
    }
});

fetchRoom();