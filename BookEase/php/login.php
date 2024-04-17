<?php

    // Database configuration
    $host = 'localhost';
    $dbName = 'room_booking_app';
    $username = 'root';
    $DBpassword = '';

    $dsn = "mysql:host=$host;dbname=$dbName;";

    try {
        $pdo = new PDO($dsn, $username, $DBpassword);
    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }

    $userID = $_POST['id'];
    $loginPass = $_POST['password'];

    global $pdo;
    $stmt = $pdo->prepare('SELECT * FROM User WHERE id = ? and password = ?');
    $stmt->execute(['userID', 'loginPass']);
    $result = $stmt->fetchAll();
    
    if ($result->num_rows > 0) {
        echo "Login success";
        header("Location:../Page/home.html");
    }
    else {
        echo "Invalid username or password";
    }
    $conn->close();
?>