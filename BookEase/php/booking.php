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
        global $totalRecord = $result->num_rows;
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
        generateQRcode();
        $stmt = $conn->prepare('INSERT INTO Booking (roomID, date, timeslot, userID, QRcodeID) VALUES (?)'); // add into items table
        $stmt->execute([$roomID, $data, $time, $userID, $totalRecord+1]);
        http_response_code(200);
    }

    function generateQRcode() {
        $content = "UserID: " . $userID+"\nRoomID: " . $roomID+"\nDate: " . $data+"\nTime: " . $time;
        $apiUrl = "https://api.qrserver.com/v1/create-qr-code/?data=".$content."&size=200x200";
        $folderPath = '../php/pics/QRcode/';

        // Make the API request and retrieve the image data
        $imageData = file_get_contents($apiUrl);

        if ($imageData !== false) {
            // Generate a unique filename for the image
            $filename = uniqid()."_".$roomID.'_user' .$userID. '.png';
            // Save the image to the specified folder
            $filePath = $folderPath . $filename;
            $result = file_put_contents($filePath, $imageData);
            if ($result !== false) {
                echo "Image saved successfully.";
                $stmt = $conn->prepare('INSERT INTO QRcode (codeID, bookingID, pic) VALUES (?)'); // add into items table
                $stmt->execute([$totalRecord+1, $totalRecord+1, $filename]);
            } else {
                echo "Failed to save the image.";
            }
        } else {
            echo "Failed to retrieve the image data from the API.";
        }

    }


?>
