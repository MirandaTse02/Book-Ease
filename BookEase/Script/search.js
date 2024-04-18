function info(room) {
    localStorage.setItem("Room", room);
}

// fetch and display all room
function fetchRoom() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/searchRoomCate.php?category=none'); // php may change
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
            var response = JSON.parse(xhr.responseText);
            var lecRoomList = document.getElementById('LT');
            var classRoomList = document.getElementById('CL');
            
            response.forEach(function(room) {
                // show room by category
                // if cate == lec, lecRoomList append child <div class="room"> ...
                // cate == classrom, classRoomList append child <div class="room"> ...
                var roomID = room.roomID;
                var roomPic = room.pic;
                var name = room.name;

                var roomDiv = document.createElement("div");
                roomDiv.className = "room";

                var roomImg = document.createElement("img");
                roomImg.src = "../php/pics/" +roomPic;
                roomImg.alt = name; 
                roomDiv.appendChild(roomImg);
    
                var roomName = document.createElement("p");
                roomName.innerHTML = roomID; 
                roomDiv.appendChild(roomName);
    
                var viewRoom = document.createElement("a");
                viewRoom.className = "viewRoom";
                viewRoom.innerHTML = "View Room";
                viewRoom.href = "roomInfo.html";
                viewRoom.onclick = function() {info(roomID)};
                roomDiv.appendChild(viewRoom);

                if (room.categoryID == "LT") {
                    lecRoomList.appendChild(roomDiv);
                }
                alert(room.categoryID);
                if (room.categoryID == "CL") {
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
                if (cate == "all") {
                    fetchRoom();
                    return null;
                }
                var roomList = document.getElementById('roomList');
                roomList.innerHTML = "";

                // append category div
                var cateDiv = document.createElement("div");
                cateDiv.id = cate;
                roomList.appendChild(cateDiv);

                // append title
                var title = document.createElement("h2");
                if (cate == "LT") {
                    title.innerHTML = "Lecture Theatres";
                } else {
                    title.innerHTML = "Classroom";
                }
                cateDiv.appendChild(title);
    
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '../php/searchRoomCate.php?category=' + cate); // php may change
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        // response json
                        var response = JSON.parse(xhr.responseText);
    
                        // for each response, if cate match, append
                        response.forEach((room) => {
                            if (room.categoryID == cate) {
                                var roomID = room.roomID;
                                var roomPic = room.pic;
                                var name = room.name;

                                var roomDiv = document.createElement("div");
                                roomDiv.className = "room";

                                var roomImg = document.createElement("img");
                                roomImg.src = "../php/pics/" +roomPic;
                                roomImg.alt = name;
                                roomDiv.appendChild(roomImg);
    
                                var roomName = document.createElement("p");
                                roomName.innerHTML = roomID;
                                roomDiv.appendChild(roomName);
    
                                var viewRoom = document.createElement("a");
                                viewRoom.className = "viewRoom";
                                viewRoom.innerHTML = "View Room";
                                viewRoom.href = "roomInfo.html";
                                viewRoom.onclick = function() {info(roomID)};
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