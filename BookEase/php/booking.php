<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $selectDate = $_GET['date'];

    $host = 'localhost';
    $dbName = 'room_booking_app';
    $DBusername = 'root';
    $DBpassword = '';
    
    $conn = new mysqli($host, $DBusername, $DBpassword, $dbName);
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
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            break;
    }

    function getCalendar() {
        global $conn, $selectDate;
        $stmt = $conn->prepare('SELECT * FROM Booking where bookDate=?');
        $stmt->bind_param("s", $selectDate);
        $stmt->execute();
        $result = $stmt->get_result();
        global $totalRecord;
        $totalRecord = $result->num_rows;
        if ($result->num_rows > 1) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($rows);
        } else {
            $row = $result->fetch_assoc();
            echo json_encode($row);
        }
    }

    function addNewBooking() {
        global $conn, $selectDate, $totalRecord;
        try {
            $userID = $_POST['userID'];
            $roomID = $_POST['room'];
            $time = $_POST['timeSlot'];
            generateQRcode($userID, $roomID, $selectDate, $time);
            $stmt = $conn->prepare('INSERT INTO booking (roomID, bookDate, timeslot, userID, QRcodeID) VALUES (?, ?, ?, ?, ?)'); // add into items table
            $stmt->execute([$roomID, $selectDate, $time, $userID, $totalRecord+1]);

            http_response_code(200);
        } catch (Exception $e) {
            echo 'Message: ' .$e->getMessage() . "Note: fail insert new record";
        }
    }

    function generateQRcode($userID, $roomID, $date, $time) {
        global $conn, $totalRecord;
        $content = "UserID: " . $userID . "\nRoomID: " . $roomID. "\nDate: " . $date. "\nTime: " . $time;
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
            echo $result;

            if ($result !== false) {
                echo "Image saved successfully.";
                $stmt = $conn->prepare('INSERT INTO qrcode (bookingID, pic) VALUES (?, ?)'); // add into items table
                $stmt->execute([$totalRecord+1, $filename]);
                echo "yes3";
            } else {
                echo "Failed to save the image.";
            }
        } else {
            echo "Failed to retrieve the image data from the API.";
        }

    }


?>
