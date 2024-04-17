window.addEventListener("DOMContentLoaded", (e) => {
    const el = document.getElementsByTagName("form");
    if (el) {
        // event listener form on submit
        for (const element of Array.from(el)) {
            // add event listener to form submit
            element.addEventListener('submit', (event) => {
                event.preventDefault(); // prevent form from submitting
            
                const userid = document.querySelector('#id').value;
                const pw = document.querySelector('#password').value;
            
                // delete late
                // document.cookie = "userID="+userid;
                // location.replace("home.html");
                
                // php request
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '../php/login.php?id=' + userid);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        document.cookie = "userID="+userid;
                        var response = xhr.responseText;
                        if(response === "login success")
                            // go to home.html
                            location.replace("home.html");
                        else {
                            console.log(response);
                        }
                    }
                }
                xhr.send("password=" + pw);
            });
        }
    }
  });
