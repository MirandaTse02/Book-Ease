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

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            getCalendar();
            break;
        case 'POST':
            addNewBooking();
            break;
        case 'DELETE':
            cancelBooking();
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            break;
    }

    function getCalendar() {
        global $conn, $selectDate;
        $selectDate = $_GET['date'];
        $stmt = $conn->prepare('SELECT * FROM Booking where bookDate=?');
        $stmt->bind_param("s", $selectDate);
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
        global $conn, $selectDate;
        $selectDate = $_GET['date'];
        try {
            $userID = $_POST['userID'];
            $roomID = $_POST['room'];
            $time = $_POST['timeSlot'];

            // get the new bookingID and store in $bookNum
            $stmt = $conn->prepare('SELECT COUNT(bookingID) as count FROM Booking');
            $stmt->execute();
            $result = $stmt->get_result();
            $bookNum = $result->fetch_assoc();
            $bookNum = $bookNum['count']+1;

            // call API to generate QRcode and return the codeID
            $codeID = generateQRcode($userID, $roomID, $selectDate, $time, $bookNum);

            // insert new booking record to DB
            $stmt = $conn->prepare('INSERT INTO booking (bookingID, roomID, bookDate, timeslot, userID, QRcodeID) VALUES (?, ?, ?, ?, ?, ?)'); // add into items table
            $stmt->execute([$bookNum, $roomID, $selectDate, $time, $userID, $codeID]);
            http_response_code(200);
            echo $bookNum;
        } catch (Exception $e) {
            echo 'Message: ' .$e->getMessage() . " Note: fail insert new record";
        }
    }


    function generateQRcode($userID, $roomID, $date, $time, $num) {
        global $conn;
        $content = "UserID: " . $userID . "\nRoomID: " . $roomID. "\nDate: " . $date . "\nTime: " . $time;
        $apiUrl = "https://api.qrserver.com/v1/create-qr-code/?data=".$content."&size=200x200";
        $folderPath = '../php/pics/QRcode/';

        // Make the API request and retrieve the image data
        $imageData = file_get_contents($apiUrl);

        if ($imageData !== false) {
            // Generate a unique filename for the image
            $filename = uniqid()."_".$roomID.'_user_' .$userID. '.png';
            // Save the image to the specified folder
            $filePath = $folderPath . $filename;
            $result = file_put_contents($filePath, $imageData);
            if ($result !== false) {
                // echo "Image saved successfully.";

                // get the new QRcodeID
                $stmt = $conn->prepare('SELECT COUNT(codeID) as count FROM QRcode');
                $stmt->execute();
                $result = $stmt->get_result();
                $codeNum = $result->fetch_assoc();
                $codeNum = $codeNum['count']+1;

                // insert QRcode to DB
                $stmt = $conn->prepare('INSERT INTO QRcode (codeID, bookingID, pic) VALUES (?, ?, ?)'); // add into items table
                $stmt->execute([$codeNum, $num, $filename]);
                return $codeNum;

            } else {
                echo "Failed to save the image. please check if ../php/pics/QRcode has full access";
            }
        } else {
            echo "Failed to retrieve the image data from the API.";
        }
        
    }

    function cancelBooking() {
        global $conn;
        $id = $_GET['bookingID'];
        if (empty($id)) {
            http_response_code(400);
            echo "bad request";
        }
        echo $id;
        $stmt = $conn->prepare('DELETE FROM Booking WHERE bookingID = ?');
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $stmt = $conn->prepare('DELETE FROM QRcode WHERE bookingID = ?');
        $stmt->bind_param("s", $id);
        $stmt->execute();

        // $stmt->execute([$id]);

        http_response_code(200);
        echo "Booking cancelled.";
    }

?>
