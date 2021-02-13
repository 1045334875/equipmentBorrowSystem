/*
Navicat MySQL Data Transfer

Source Server         : bdz
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : equipmentborrowingsystem

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2021-02-13 16:30:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` varchar(31) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for borrow_apply
-- ----------------------------
DROP TABLE IF EXISTS `borrow_apply`;
CREATE TABLE `borrow_apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipmentID` int(11) DEFAULT NULL,
  `stuID` varchar(31) DEFAULT NULL,
  `startTime` bigint(20) DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contactInfo` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `returnTime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `equipmentID` int(11) DEFAULT NULL,
  `equipmentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `equipmentPicture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longestBorrowTime` bigint(20) DEFAULT NULL,
  `isCamera` tinyint(4) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for id_equipment
-- ----------------------------
DROP TABLE IF EXISTS `id_equipment`;
CREATE TABLE `id_equipment` (
  `equipmentID` int(11) NOT NULL AUTO_INCREMENT,
  `equipmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`equipmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
