/*
Navicat MySQL Data Transfer

Source Server         : mysql-localhost
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : db_zsl

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2016-08-22 17:47:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '信息标题',
  `LEVEL_ONE` int(11) DEFAULT NULL,
  `LEVEL_TWO` int(11) DEFAULT NULL,
  `PUBLISH_DATE` datetime DEFAULT NULL,
  `STATUS` int(11) DEFAULT NULL,
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_BY` int(11) DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `COMPANY_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES ('1', '放假', '1', '2', '2016-08-22 17:19:10', '1', '1', '2016-08-22 17:19:14', null, null, '1');
