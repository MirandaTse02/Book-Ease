<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $cateID = $_GET['category'];

    $host = 'localhost';
    $dbName = 'room_booking_app';
    $DBusername = 'root';
    $DBpassword = '';
    
    $conn = new mysqli($host, $DBusername, $DBpassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($cateID==="all")
        $stmt = $conn->prepare('SELECT * from Room');
    else {
        $stmt = $conn->prepare('SELECT * from Room where categoryID = ?');
        $stmt->bind_param("s", $cateID);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 1) {
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($rows);
    } else {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
    mysqli_close($conn);
    exit;
?>