/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 80022
Source Host           : localhost:3306
Source Database       : equipmentborrowingsystem

Target Server Type    : MYSQL
Target Server Version : 80022
File Encoding         : 65001

Date: 2021-02-08 23:49:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for borrow_apply
-- ----------------------------
DROP TABLE IF EXISTS `borrow_apply`;
CREATE TABLE `borrow_apply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stuID` int DEFAULT NULL,
  `startTime` bigint DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contactInfo` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `returnTime` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `equipmentID` int DEFAULT NULL,
  `equipmentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `equipmentPicture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longestBorrowTime` bigint DEFAULT NULL,
  `isCamera` tinyint DEFAULT NULL,
  `state` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for id_equipment
-- ----------------------------
DROP TABLE IF EXISTS `id_equipment`;
CREATE TABLE `id_equipment` (
  `equipmentID` int NOT NULL AUTO_INCREMENT,
  `equipmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`equipmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
