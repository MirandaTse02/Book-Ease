<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $bookingID = $_GET['bookingID'];

    $host = 'localhost';
    $dbName = 'room_booking_app';
    $DBusername = 'root';
    $DBpassword = '';
    $conn = new mysqli($host, $DBusername, $DBpassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare('SELECT pic FROM QRcode WHERE bookingID = ?');
    $stmt->bind_param("s", $bookingID);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
    else {
        echo "no QRcode";
    }
?>