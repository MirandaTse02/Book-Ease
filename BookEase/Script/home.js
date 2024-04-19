function boldTitle(id) {
    var search = document.getElementById('search');
    var booking = document.getElementById('booking');
    var myrecord = document.getElementById('myrecord');

    var target = document.getElementById(id)

    search.style.fontWeight = '';
    booking.style.fontWeight = '';
    myrecord.style.fontWeight = '';

    target.style.fontWeight = "bold";
}

function getCookieUserName(name) {
    var c = document.cookie;
    var prefix = name + "=";
    var begin = c.indexOf("; "+prefix);
    if (begin == -1) {
        begin = c.indexOf(prefix);
        if (begin != 0) return null;
    }
    
    return decodeURI(c.substring(begin + prefix.length));;
}


window.onload = function() {
    var userid = getCookieUserName("userID");
    var xhr = new XMLHttpRequest();
    alert(userid);
    xhr.open('GET', '../php/home.php?id='+userid);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            var msg = document.getElementById("welcome_msg");
            msg.innerHTML = "Welcome! "+response.name;
        }
    }
    xhr.send();
}