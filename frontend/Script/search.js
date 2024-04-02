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
            lecRoomList.innerHTML = '<h2>Lecture Theatres</h2>';
            classRoomList.innerHTML = '<h2>Classroom</h2>';
            
            response.forEach(function(room) {
                // show room by category
                // if cate == lec, lecRoomList append child <div class="room"> ...
                // cate == classrom, classRoomList append child <div class="room"> ...
            });
        }
    };
    xhr.send();
}

// event listener category on change
document.getElementById('select').addEventListener('change', function(event) {
    event.preventDefault();

    var cate = document.getElementById('select').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getRoom.php?category=' + cate); // php may change
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
            var response = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
});
