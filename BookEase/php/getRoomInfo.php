<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $roomID = $_GET['roomName'];

    $host = 'localhost';
    $dbName = 'room_booking_app';
    $username = 'root';
    $DBpassword = '';
    
    $conn = new mysqli($host, $username, $DBpassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare('SELECT * from Room where roomID = ?');
    $stmt->bind_param("s", $roomID);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
    else {
        echo "fail to get room" + $roomID;
    }
?>