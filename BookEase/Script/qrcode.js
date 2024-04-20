function qr() {
    var bookingID = localStorage.getItem("BookingID");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/getQRcode.php?bookingID='+bookingID);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            setImg(response.pic);
            
        }
    }
    xhr.send();
}

function setImg(pic) {
    var QRCode = document.getElementById("qr");
    var QRcodeImg = document.createElement("img");
    // var room = document.getElementById("roomName");
    // room.innerText = roomName;
    QRcodeImg.src = '../php/pics/QRcode/'+ pic; // check php/ json
    QRcodeImg.alt = "QRcode failed to load";
    QRcodeImg.id = "QRcode";
    QRCode.appendChild(QRcodeImg);
}

qr();