function login() {
    // get username
	var userid = document.getElementById('id');
    
    // get password 
	var pw = document.getElementById('password');
    
    // php request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php?id=' + userid);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.cookie = "userID="+userid;
        }
    }
    xhr.send('password='+pw);
    
}
