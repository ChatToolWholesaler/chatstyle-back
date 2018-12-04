/*
Navicat MySQL Data Transfer

Source Server         : mytest
Source Server Version : 50642
Source Host           : localhost:3306
Source Database       : nodejs

Target Server Type    : MYSQL
Target Server Version : 50642
File Encoding         : 65001

Date: 2018-12-03 17:33:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;



-- ----------------------------
-- Table structure for user
-- ----------------------------

-- DROP TABLE IF EXISTS `user`;
-- CREATE TABLE `user` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `username` varchar(22) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `password` varchar(22) NOT NULL DEFAULT '' COMMENT '密码',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

BEGIN;

INSERT INTO `user` VALUES (4, 'Bob', '22', '2018-08-27 21:40:17', '2018-08-27 21:40:17','1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
