-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 17, 2024 at 11:23 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `room_booking_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `bookingID` int(11) NOT NULL,
  `roomID` varchar(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `timeslot` varchar(10) DEFAULT NULL,
  `QRcodeID` int(11) DEFAULT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `categoryID` varchar(2) NOT NULL,
  `name` varchar(30) NOT NULL,
  `access` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`categoryID`, `name`, `access`) VALUES
('CL', 'Classrooms', 'all'),
('LT', 'Lecture Theatres', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `QRcode`
--

CREATE TABLE `QRcode` (
  `codeID` int(11) NOT NULL,
  `bookingID` int(11) DEFAULT NULL,
  `pic` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `Room` (
  `roomID` varchar(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `pic` varchar(100) DEFAULT NULL,
  `categoryID` varchar(2) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `equipment` varchar(200) DEFAULT NULL,
  `software` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Room`
--

INSERT INTO `Room` (`roomID`, `name`, `pic`, `categoryID`, `location`, `capacity`, `equipment`, `software`) VALUES
('FJ301', 'Winnie Ko Pui Shuen Lecture Theatre\r\n高佩璇演講廳', 'FJ301_pic.jpeg', 'LT', '3/F, Wing FJ, Chan Tai Ho Building 陳大河樓', 139, 'Teaching PC, 1 Projector, Touch Screen Monitor, Ceiling Camera, Wired Handheld Microphones, Wireless Handheld Microphones, Wireless Body Pack Microphones', 'Zoom, MS Teams'),
('HJ202', '', 'HJ202_pic.jpeg', 'CL', 'P/F, Wing HJ, Stanley Ho Building 何鴻燊樓', 170, 'Teaching PC, 3 Projectors, Ceiling Camera, Ceiling Microphone, Wired Handheld Microphones, Wireless Handheld Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams'),
('N101', '', 'N101_pic.jpeg', 'CL', '1/F, Block N (pass Chan Sui Kau and Chan Lam Moon Chun Square 陳瑞球林滿珍伉儷廣場 / MN Square)', 48, 'Teaching PC, Touch Screen Monitor, Ceiling Camera, Ceiling Microphone, Wired Handheld Microphones, Wireless Handheld Microphones, Flexiable Monitor / Webcam Arm, 6 Wall mounted LCD displays', 'Zoom, MS Teams'),
('TU103', "Wong\'s International Lecture Theatre\r\n王氏國際演講廳", 'TU103_pic.jpeg', 'LT', '1/F, Wing TU, Yip Kit Chuen Building 葉傑全樓', 131, 'Teaching PC, 2 Projectors, Touch Screen Monitor, Ceiling Camera, Wired Handheld Microphones, Wireless Handheld Microphones, Wireless Body Pack Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams'),
('TU107', 'Lu Guan Qiu Lecture Theatre\r\n魯冠球演講廳', 'TU107_pic.jpeg', 'LT', '1/F, Wing TU, Yip Kit Chuen Building 葉傑全樓', 168, 'Teaching PC, 3 Projectors, Touch Screen Monitor, Ceiling Camera, Wired Handheld Microphones, Wireless Handheld Microphones, Wireless Body Pack Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams'),
('V311', '', 'V311_pic.jpeg', 'CL', '3/F, Block V, Jockey Club Innovation Tower 賽馬會創新樓', 18, 'Teaching PC, 1 Projector, Touch Screen Monitor, Ceiling Camera, Ceiling Microphone, Wired Handheld Microphones, Wireless Body Pack Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `ID` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`ID`, `username`, `password`, `role`) VALUES
(1, 'alice', 'alice', 'staff'),
(2, 'ben', 'ben', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`bookingID`),
  ADD KEY `roomID` (`roomID`),
  ADD KEY `QRcodeID` (`QRcodeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `QRcode`
--
ALTER TABLE `QRcode`
  ADD PRIMARY KEY (`codeID`),
  ADD KEY `bookingID` (`bookingID`) USING BTREE;

--
-- Indexes for table `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`roomID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Booking`
--
ALTER TABLE `Booking`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Booking`
--
ALTER TABLE `Booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `Room` (`roomID`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`QRcodeID`) REFERENCES `QRcode` (`codeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `User` (`ID`);

--
-- Constraints for table `QRcode`
--
ALTER TABLE `QRcode`
  ADD CONSTRAINT `qrcode_ibfk_1` FOREIGN KEY (`bookingID`) REFERENCES `Booking` (`bookingID`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `Room`
--
ALTER TABLE `Room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `Category` (`categoryID`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
