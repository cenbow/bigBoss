/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50171
Source Host           : localhost:3306
Source Database       : db_zsl

Target Server Type    : MYSQL
Target Server Version : 50171
File Encoding         : 65001

Date: 2016-08-25 01:17:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) DEFAULT NULL,
  `POST` varchar(255) DEFAULT NULL COMMENT '职务',
  `PHONE_NUM` varchar(100) DEFAULT NULL,
  `COMPANY_ID` int(11) DEFAULT NULL,
  `COMPANY_NAME` varchar(255) DEFAULT NULL,
  `COMPANY_CODE` varchar(50) DEFAULT NULL,
  `ROLE_ID` int(11) DEFAULT NULL,
  `ROLE_NAME` varchar(100) DEFAULT NULL,
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `STATUS` int(11) DEFAULT '1' COMMENT '0未启用，1启用',
  `REMARK` varchar(255) DEFAULT NULL,
  `USER_NAME` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '张三12213', '职务', '1389871234', '1', '智康信息科技', '000001', '2', '普通管理员', '1', '2016-08-13 21:41:41', '1', 'MEIYOU', 'admin1', '1234563');
INSERT INTO `account` VALUES ('7', 'sdasd', 'sadasd', '18566254455', '2', null, '0002', '3', null, null, null, null, null, 'asdasdsd', '123123123');
INSERT INTO `account` VALUES ('9', 'hangsd', 'asdasd', '18502554655', '2', '', '0002', '2', '0002', null, null, null, null, '23123', '123123213');
INSERT INTO `account` VALUES ('11', 'aslkjdkldasj ', 'asdasdas', '18522223333', '1', '智康信息科技', '0001', '2', '普通管理员', null, null, null, null, '5461564654', '32135135');
INSERT INTO `account` VALUES ('12', '3123', '123123', '18566554456', '2', '苹果公司', '0002', '3', '普通用户', '1', '2016-08-14 16:25:57', '1', '4213', '123asdasd', '123123123');
INSERT INTO `account` VALUES ('13', 'sadsadsa', '1213545', '18500255514', '2', '苹果公司', '0002', '3', '普通用户', '1', '2016-08-14 16:27:27', '1', '1231232132', '12312312', '123123123');
INSERT INTO `account` VALUES ('14', '1111111', '1111111', '18500554455', '1', '智康信息科技', '0001', '2', '普通管理员', '1', '2016-08-14 16:29:44', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('15', '1111111', '1111111', '18500554455', '1', '智康信息科技', '0001', '2', '普通管理员', '1', '2016-08-14 16:29:53', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('16', '1111111', '1111111', '18500554455', '1', '智康信息科技', '0001', '3', '普通用户', '1', '2016-08-14 16:29:58', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('17', '1111111', '1111111', '18500554455', '1', '智康信息科技', '0001', '2', '普通管理员', '1', '2016-08-14 16:30:02', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('18', '1111111', '1111111', '18500554455', '2', '苹果公司', '0002', '2', '普通管理员', '1', '2016-08-14 16:30:04', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('19', '1111111', 'dasdasdasdasd', '18500554455', '2', '苹果公司', '0002', '2', '普通管理员', '1', '2016-08-14 16:30:07', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('20', '111111123adsdas1', 'dasdasdasdasd', '18500554455', '2', '苹果公司', '0002', '2', '普通管理员', '1', '2016-08-14 16:30:11', '1', 'sadasdasdasd', '12312312', '331231231');
INSERT INTO `account` VALUES ('21', '111111123adsdas1', 'dasdasdasdasd', '18500554455', '2', '苹果公司', '0002', '2', '普通管理员', '1', '2016-08-14 16:30:14', '1', 'sadasdasdasd', 'asdasasd', '331231231');
INSERT INTO `account` VALUES ('22', '111111123adsdas1', 'dasdasdasdasd', '18500554455', '2', '苹果公司', '0002', '2', '普通管理员', '1', '2016-08-14 16:30:40', '1', 'sadasdasdasd', 'asdasasd', '331231231');
INSERT INTO `account` VALUES ('23', '312312', '123123', '18525544466', '2', '苹果公司', '0002', '3', '普通用户', '1', '2016-08-14 16:32:37', '1', '123123123', '123123', '123123');
INSERT INTO `account` VALUES ('24', '456465', 'asdasd', '18522664455', '1', '智康信息科技', '0001', '2', '普通管理员', '1', '2016-08-14 16:33:54', '1', '123123213', '12312', '123123');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL COMMENT '分类名称',
  `COLUMN_ID` int(11) DEFAULT NULL COMMENT '所属栏目ID',
  `UP_CLASS_ID` int(11) DEFAULT NULL COMMENT '上级分类ID',
  `STATUS` int(11) DEFAULT NULL COMMENT '1是启用，0不启用',
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_BY` int(11) DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `LEAF` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '一级分类1', '1', '6', '1', '1', null, null, null, '2');
INSERT INTO `category` VALUES ('2', '二级分类', '1', '12', '0', '1', null, null, null, '2');
INSERT INTO `category` VALUES ('4', '22222', '2', '0', '1', null, '2016-08-16 23:14:45', null, null, '1');
INSERT INTO `category` VALUES ('5', '123', '1', '3', '1', null, '2016-08-16 23:14:58', null, null, '2');
INSERT INTO `category` VALUES ('6', 'aaa', '1', '0', '0', null, '2016-08-16 23:15:06', null, null, '1');
INSERT INTO `category` VALUES ('7', 'sc', '3', '0', '0', null, '2016-08-16 23:15:18', null, null, '1');
INSERT INTO `category` VALUES ('8', 'fenlei', '2', '4', '1', '1', '2016-08-17 22:10:47', null, null, '2');
INSERT INTO `category` VALUES ('9', 'fenlei1', '2', '4', '1', '1', '2016-08-17 22:10:52', null, null, '2');
INSERT INTO `category` VALUES ('10', 'fenlei', '3', '0', '0', '1', '2016-08-17 22:11:50', null, null, '1');
INSERT INTO `category` VALUES ('11', 'wahahah', '4', '0', '1', '1', '2016-08-17 23:58:57', null, null, '1');
INSERT INTO `category` VALUES ('12', '呜呜呜呜呜呜', '1', '0', '1', '1', '2016-08-19 23:51:52', null, null, '1');
INSERT INTO `category` VALUES ('13', '新增分类22', '1', '6', '0', '1', '2016-08-20 00:43:21', null, null, '2');

-- ----------------------------
-- Table structure for column
-- ----------------------------
DROP TABLE IF EXISTS `column`;
CREATE TABLE `column` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `COLUMN_CODE` varchar(100) DEFAULT NULL,
  `COLUMN_NAME` varchar(100) DEFAULT NULL COMMENT '栏目表',
  `COMPANY_ID` int(11) DEFAULT NULL,
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of column
-- ----------------------------
INSERT INTO `column` VALUES ('1', '0001', '信息披露', null, null, null);
INSERT INTO `column` VALUES ('2', '0002', '学习园地', null, null, null);
INSERT INTO `column` VALUES ('3', '0003', '市场咨询', null, null, null);
INSERT INTO `column` VALUES ('4', '0004', '通知公告', null, null, null);

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) NOT NULL COMMENT '公司名称',
  `CODE` varchar(100) DEFAULT NULL COMMENT '公司代码',
  `SHORT_NAME` varchar(255) DEFAULT NULL COMMENT '简称',
  `INTRODUCE` varchar(255) DEFAULT NULL COMMENT '介绍',
  `ADDRESS` varchar(255) DEFAULT NULL COMMENT '地址',
  `PHONE` varchar(100) DEFAULT NULL COMMENT '电话',
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_BY` int(11) DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `REMARK` varchar(255) DEFAULT NULL COMMENT '备注',
  `RESERVE1` varchar(100) DEFAULT NULL,
  `RESERVE2` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('1', '智康信息科技', '0001', '智康', '医疗公司', '计量大厦', '18987221322', '1', '2016-08-14 01:50:44', null, null, '123123', null, null);
INSERT INTO `company` VALUES ('2', '苹果公司', '0002', '苹果', 'iphone', '美国', '0322-12334223', '1', '2016-08-14 01:51:50', null, null, null, null, null);
INSERT INTO `company` VALUES ('3', '智康二号', '000432', '智康2', '2222', '123123', '18502335456', '1', '2016-08-14 20:36:32', null, null, null, null, null);
INSERT INTO `company` VALUES ('4', 'company', '123123caed', 'zhang', 'jklhasjkjkl', 'asdas', '18515445214', '1', '2016-08-15 21:43:22', null, null, '3123123123', null, null);

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL COMMENT '信息标题',
  `LEVEL_ONE` int(11) DEFAULT NULL,
  `LEVEL_TWO` int(11) DEFAULT NULL,
  `PUBLISH_DATE` datetime DEFAULT NULL,
  `STATUS` int(11) DEFAULT NULL,
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_BY` int(11) DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `COMPANY_ID` int(11) DEFAULT NULL,
  `COLUMN_ID` int(11) DEFAULT NULL,
  `TEXT` varchar(255) DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL COMMENT 'pdf保存地址(现在是文件名)',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES ('1', '放假', '6', '1', '2016-08-22 17:19:10', '1', '1', '2016-08-22 17:19:14', null, null, '1', '1', null, null);
INSERT INTO `information` VALUES ('2', '123', '1', '1', '2016-08-25 00:57:00', '1', '1', '2016-08-25 00:57:00', '1', null, '1', '1', '1', '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLE_CODE` varchar(255) DEFAULT NULL,
  `ROLE_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'ROOT', '超级管理员');
INSERT INTO `role` VALUES ('2', 'ADMINISTRATOR', '普通管理员');
INSERT INTO `role` VALUES ('3', 'NORMAL', '普通用户');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `COMPANY_ID` int(11) NOT NULL COMMENT '公司ID',
  `MOBILE` varchar(20) DEFAULT NULL COMMENT '手机号',
  `NAME` varchar(30) DEFAULT NULL COMMENT '用户名(用于显示)',
  `LOGIN` varchar(30) DEFAULT NULL COMMENT '登录名称',
  `LOWER_LOGIN` varchar(30) DEFAULT NULL COMMENT '登录名称小写',
  `EMAIL` varchar(100) DEFAULT NULL COMMENT '邮箱名',
  `LOWER_EMAIL` varchar(100) DEFAULT NULL COMMENT '邮箱名小写',
  `PASSWORD` char(102) DEFAULT NULL COMMENT '密码散列',
  `MEMO` varchar(255) DEFAULT NULL COMMENT '备注',
  `EMAIL_VERIFIED` char(1) NOT NULL DEFAULT 'N' COMMENT '邮箱验证',
  `MOBILE_VERIFIED` char(1) NOT NULL DEFAULT 'N' COMMENT '手机验证',
  `LAST_LOGIN_DATE` datetime DEFAULT NULL COMMENT '最近登录时间',
  `LOCKED` char(1) NOT NULL DEFAULT 'N' COMMENT '是否锁定',
  `LAST_LOCK_DATE` datetime DEFAULT NULL COMMENT '最后锁定时间',
  `BRANCH_ID` int(11) DEFAULT NULL COMMENT '分部ID',
  `DEPT_ID` int(11) DEFAULT NULL COMMENT '部门ID',
  `POSITION_ID` int(11) DEFAULT NULL COMMENT '职位ID',
  `IS_ADMIN` char(1) NOT NULL DEFAULT 'N' COMMENT '是否管理员(根据所属公司授权的模块获取所有权限)',
  `IS_DELETED` char(1) NOT NULL DEFAULT 'N' COMMENT '是否删除',
  `CREATE_BY` int(11) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建日期',
  `UPDATE_BY` int(11) DEFAULT NULL COMMENT '更新人',
  `UPDATE_DATE` datetime DEFAULT NULL COMMENT '最近更新时间',
  PRIMARY KEY (`ID`),
  KEY `USER_IDX1` (`COMPANY_ID`,`MOBILE`),
  KEY `USER_IDX2` (`COMPANY_ID`,`LOWER_LOGIN`),
  KEY `USER_IDX3` (`COMPANY_ID`,`LOWER_EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2323', '232', '32323', '2323', '23', '323', null, null, null, 'N', 'N', null, 'N', null, null, null, null, 'N', 'N', null, null, null, null);
