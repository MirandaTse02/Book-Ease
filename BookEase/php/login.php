<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    // Database configuration
    $host = 'localhost';
    $dbName = 'room_booking_app';
    $DBusername = 'root';
    $DBpassword = '';

    try {
        $conn = new mysqli($host, $DBusername, $DBpassword, $dbName);
        if ($conn->connect_errno) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }

    $userID = $_GET['id'];
    $loginPass = $_POST['password'];

    $stmt = $conn->prepare('SELECT password FROM User WHERE userID = ?');
    $stmt->bind_param("s", $userID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (strcmp($row['password'], $loginPass)==0) {
            echo "login success";
        }
    }
    else {
        echo "Invalid username or password";
    }

    $stmt->close();
    $conn->close();
?>