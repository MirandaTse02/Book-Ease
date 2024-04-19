function qr(roomName) {
    var room = document.getElementById("roomName");
    room.innerText = roomName;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'qrcode.php?roomName='+roomName);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var QRCode = document.getElementById("QR");
            var QRcodeImg = document.createElement("img");
            QRcodeImg.src = response.src; // check php/ json
            QRcodeImg.alt = "QRcode";
            QRcodeImg.id = "QRcode";
            QRCode.appendChild(QRcodeImg);
        }
    }
    xhr.send();
}