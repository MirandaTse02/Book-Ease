function getCookie(name) {
    var c = document.cookie;
    var prefix = name + "=";
    var begin = c.indexOf("; "+prefix);
    if (begin == -1) {
        begin = c.indexOf(prefix);
        if (begin != 0) return null;
    }
    
    return decodeURI(c.substring(begin+prefix.length));
}

function cookieExist() {
    // if no cookie, i.e. not login, redirect to login.html
    var exist = getCookie("userID");
    
    if (exist == null) {
        // go to login.html
	    location.replace("login.html");
    }
}

cookieExist();
