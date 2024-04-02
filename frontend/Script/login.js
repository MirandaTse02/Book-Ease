function login() {
    // get username
	var username = document.getElementById('id');
    
    // get password 
	var pw = document.getElementById('password');
    
    // php request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.cookie = "username="+username;
        }
    }
    xhr.send('username='+username+'&password='+pw);
    
}