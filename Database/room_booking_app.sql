-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-04-20 15:08:28
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `room_booking_app`
--

-- --------------------------------------------------------

--
-- 資料表結構 `booking`
--

CREATE TABLE `booking` (
  `bookingID` int(11) NOT NULL,
  `roomID` varchar(10) DEFAULT NULL,
  `bookDate` date DEFAULT NULL,
  `timeslot` varchar(20) DEFAULT NULL,
  `QRcodeID` int(11) DEFAULT NULL,
  `userID` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `booking`
--

INSERT INTO `booking` (`bookingID`, `roomID`, `bookDate`, `timeslot`, `QRcodeID`, `userID`) VALUES
(1, 'FJ301', '2024-04-09', '12:00-14:00', 1, 't1_alice'),
(2, 'V311', '2024-03-12', '10:00-12:00', 2, 's1_ben'),
(3, 'HJ202', '2024-04-21', '08:00-10:00', 3, 't1_alice'),
(4, 'HJ202', '2024-04-20', '08:00-10:00', 4, 't1_alice');

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `categoryID` varchar(2) NOT NULL,
  `name` varchar(30) NOT NULL,
  `access` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`categoryID`, `name`, `access`) VALUES
('CL', 'Classrooms', 'all'),
('LT', 'Lecture Theatres', 'staff');

-- --------------------------------------------------------

--
-- 資料表結構 `qrcode`
--

CREATE TABLE `qrcode` (
  `codeID` int(11) NOT NULL,
  `bookingID` int(11) DEFAULT NULL,
  `pic` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `qrcode`
--

INSERT INTO `qrcode` (`codeID`, `bookingID`, `pic`) VALUES
(1, 1, '001_FJ301_user1.png'),
(2, 2, '002_V311_user2.png'),
(3, 3, '6623bbd9b31aa_HJ202_user_t1_alice.png'),
(4, 4, '6623bd4794bfb_HJ202_user_t1_alice.png');

-- --------------------------------------------------------

--
-- 資料表結構 `room`
--

CREATE TABLE `room` (
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
-- 傾印資料表的資料 `room`
--

INSERT INTO `room` (`roomID`, `name`, `pic`, `categoryID`, `location`, `capacity`, `equipment`, `software`) VALUES
('FJ301', 'Winnie Ko Pui Shuen Lecture Theatre 高佩璇演講廳', 'FJ301_pic.jpeg', 'LT', '3/F, Wing FJ, Chan Tai Ho Building 陳大河樓', 139, 'Teaching PC, 1 Projector, Touch Screen Monitor, Ceiling Camera, Wired Handheld Microphones, Wireless Handheld Microphones, Wireless Body Pack Microphones', 'Zoom, MS Teams'),
('HJ202', 'HJ202', 'HJ202_pic.jpeg', 'CL', 'P/F, Wing HJ, Stanley Ho Building 何鴻燊樓', 170, 'Teaching PC, 3 Projectors, Ceiling Camera, Ceiling Microphone, Wired Handheld Microphones, Wireless Handheld Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams'),
('N101', 'N101', 'N101_pic.jpeg', 'CL', '1/F, Block N (pass Chan Sui Kau and Chan Lam Moon Chun Square 陳瑞球林滿珍伉儷廣場 / MN Square)', 48, 'Teaching PC, Touch Screen Monitor, Ceiling Camera, Ceiling Microphone, Wired Handheld Microphones, Wireless Handheld Microphones, Flexiable Monitor / Webcam Arm, 6 Wall mounted LCD displays', 'Zoom, MS Teams'),
('TU103', 'Wong\'s International Lecture Theatre 王氏國際演講廳', 'TU103_pic.jpeg', 'LT', '1/F, Wing TU, Yip Kit Chuen Building 葉傑全樓', 131, 'Teaching PC, 2 Projectors, Touch Screen Monitor, Ceiling Camera, Wired Handheld Microphones, Wireless Handheld Microphones, Wireless Body Pack Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams'),
('TU107', 'Lu Guan Qiu Lecture Theatre 魯冠球演講廳', 'TU107_pic.jpeg', 'LT', '1/F, Wing TU, Yip Kit Chuen Building 葉傑全樓', 168, 'Teaching PC, 3 Projectors, Touch Screen Monitor, Ceiling Camera, Wired Handheld Microphones, Wireless Handheld Microphones, Wireless Body Pack Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams'),
('V304', 'V304', 'V304_pic.jpeg', 'CL', '3/F, Block V, Jockey Club Innovation Tower 賽馬會創新樓', 26, 'Teaching PC, 1 Projector, Touch Screen Monitor, Ceiling Camera, Ceiling Microphone, Wired Handheld Microphones, Wireless Body Pack Microphones, Flexiable Monitor / Webcam Arm', 'Zoom, MS Teams');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `userID` varchar(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`userID`, `name`, `password`, `role`) VALUES
('s1_ben', 'Ben Cheng', 'ben', 'student'),
('s2_clare', 'Clare Tam', 'clare', 'student'),
('t1_alice', 'Alice Lee', 'alice', 'staff');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingID`),
  ADD KEY `roomID` (`roomID`),
  ADD KEY `userID` (`userID`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- 資料表索引 `qrcode`
--
ALTER TABLE `qrcode`
  ADD PRIMARY KEY (`codeID`),
  ADD KEY `bookingID` (`bookingID`) USING BTREE;

--
-- 資料表索引 `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`roomID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
