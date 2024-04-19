window.onload = function() {
    var roomName = localStorage.getItem("Room");
    var room = document.getElementById("roomName");
    
    room.innerText = roomName;

    localStorage.setItem("Room", null);
}

// get room info from db
function getRoomInfo() {
    var roomName = localStorage.getItem("Room");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/getRoomInfo.php?roomName='+roomName);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // response json
			var response = JSON.parse(xhr.responseText);

            var name = response.name;
            var pic = response.pic;
            var cap = response.capacity;
            var loc = response.location;
            var equip = response.equipment;
            var sw = response.software;


            var divInfo = document.getElementById("info");
            var divPhoto = document.getElementById("photo");
            
            // append info
            // room photo
            var roomImg = document.createElement("img");
            roomImg.src = "../php/pics/" + pic; // check php/ json
            roomImg.alt = "room photo";
            roomImg.id = "roomPhoto";
            divPhoto.appendChild(roomImg);

            // Name
            var roomName = document.createElement("p");
            roomName.id = "name";
            roomName.className = "info";
            roomName.innerHTML = "Name: " + name;
            divInfo.appendChild(roomName);

            // location
            var location = document.createElement("p");
            location.id = "location";
            location.className = "info";
            location.innerHTML = "Location: " + loc; // check php/ json
            divInfo.appendChild(location);

            // capacity
            var capacity = document.createElement("p");
            capacity.id = "capacity";
            capacity.className = "info";
            capacity.innerHTML = "Capacity: " + cap; // check php/ json
            divInfo.appendChild(capacity);

            // Equipment
            var equipText = document.createElement("p");
            equipText.className = "info";
            equipText.innerHTML = "Equipment: " + equip;
            divInfo.appendChild(equipText);

            // software
            var software = document.createElement("p");
            software.className = "info";
            software.innerHTML = "Software: " +sw;
            divInfo.appendChild(software);

            // var equipmentList = document.createElement("ul");
            // equipmentList.id = "equip";
            // equipmentList.className = "info";
            // response.equipment.forEach(function(equip) {
            //     var li = document.createElement("li");
            //     li.innerHTML = equip.name;
            //     equipmentList.appendChild(li);
            // });
            // divInfo.appendChild(equipmentList);
        }
    }

    xhr.send();
}

getRoomInfo();