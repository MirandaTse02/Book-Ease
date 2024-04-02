function info(room) {
    localStorage.setItem("Room", room);
    window.open("../Page/roomInfo.html", "_self")
}

// fetch and display all room
function fetchRoom() {
    
}

// event listener category on change
document.getElementById('select').addEventListener('change', function(event) {
    event.preventDefault();

    var cate = document.getElementById('select').value;
    alter(cate);

    var xhr = new XMLHttpRequest();
});
