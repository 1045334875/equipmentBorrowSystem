/*
Navicat MySQL Data Transfer

<<<<<<< HEAD
Source Server         : test
Source Server Version : 80022
=======
Source Server         : bdz
Source Server Version : 80017
>>>>>>> main
Source Host           : localhost:3306
Source Database       : equipmentborrowingsystem

Target Server Type    : MYSQL
<<<<<<< HEAD
Target Server Version : 80022
File Encoding         : 65001

Date: 2021-02-08 23:49:02
=======
Target Server Version : 80017
File Encoding         : 65001

Date: 2021-02-13 16:30:30
>>>>>>> main
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
<<<<<<< HEAD
  `id` int DEFAULT NULL
=======
  `id` varchar(31) DEFAULT NULL
>>>>>>> main
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for borrow_apply
-- ----------------------------
DROP TABLE IF EXISTS `borrow_apply`;
CREATE TABLE `borrow_apply` (
<<<<<<< HEAD
  `id` int NOT NULL AUTO_INCREMENT,
  `stuID` int DEFAULT NULL,
  `startTime` bigint DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contactInfo` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `returnTime` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
=======
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipmentID` int(11) DEFAULT NULL,
  `stuID` varchar(31) DEFAULT NULL,
  `startTime` bigint(20) DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contactInfo` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `returnTime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> main

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
<<<<<<< HEAD
  `equipmentID` int DEFAULT NULL,
  `equipmentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `equipmentPicture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longestBorrowTime` bigint DEFAULT NULL,
  `isCamera` tinyint DEFAULT NULL,
  `state` tinyint DEFAULT NULL
=======
  `equipmentID` int(11) DEFAULT NULL,
  `equipmentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `equipmentPicture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longestBorrowTime` bigint(20) DEFAULT NULL,
  `isCamera` tinyint(4) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL
>>>>>>> main
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for id_equipment
-- ----------------------------
DROP TABLE IF EXISTS `id_equipment`;
CREATE TABLE `id_equipment` (
<<<<<<< HEAD
  `equipmentID` int NOT NULL AUTO_INCREMENT,
=======
  `equipmentID` int(11) NOT NULL AUTO_INCREMENT,
>>>>>>> main
  `equipmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`equipmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
