<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $searchCate = $_GET['category'];

    $host = 'localhost';
    $dbName = 'room_booking_app';
    $username = 'root';
    $DBpassword = '';
    
    $conn = new mysqli($host, $username, $DBpassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            getCalendar();
            break;
        case 'POST':
            addNewBooking();
            break;
    }

    function getCalendar() {
        $stmt = $conn->prepare('SELECT * FROM Booking');
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 1) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($rows);
        } else {
            $row = $result->fetch_assoc();
            echo json_encode($row);
        }
    }

    function addNewBooking() {
        $userID = $_POST['userID'];
        $roomID = $_POST['room'];
        $date = $_POST['date'];
        $time = $_POST['timeSlot'];
        $stmt = $pdo->prepare('INSERT INTO Booking (roomID, date, timeslot, userID) VALUES (?)'); // add into items table
        $stmt->execute([$roomID, $data, $time, $userID]);
        // QR code generating
        http_response_code(201);
    }

?>
