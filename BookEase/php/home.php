<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $host = 'localhost';
    $dbName = 'room_booking_app';
    $DBusername = 'root';
    $DBpassword = '';
    $conn = new mysqli($host, $DBusername, $DBpassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $userID = $_GET['id'];
    $stmt = $conn->prepare('SELECT name FROM User WHERE userID = ?');
    $stmt->bind_param("s", $userID); 
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
    else {
        echo json_encode("no name");
    }

    $stmt->close();
    $conn->close();
?>