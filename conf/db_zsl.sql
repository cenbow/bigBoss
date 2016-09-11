/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : db_zsl

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2016-09-11 09:39:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '张三', '总经理', '1389871234', '1', '5', '001', '1', 'MEIYOU', '1', '2016-08-13 21:41:41', '1', 'MEIYOU', 'admin', '123456');
INSERT INTO `account` VALUES ('27', '陆燕', '', '', '5', 'BIG BOSS 集团股份有限公司', 'BB集团', '3', '普通用户', '1', '2016-09-10 16:49:27', '1', '', 'luyan', '123456');

-- ----------------------------
-- Table structure for `category`
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('14', '一季度报告', '1', '0', '1', null, '2016-09-08 17:13:13', null, null, '1');
INSERT INTO `category` VALUES ('15', '三季度报告', '1', '0', '1', null, '2016-09-08 17:13:25', null, null, '1');
INSERT INTO `category` VALUES ('16', '半年度报告', '1', '0', '1', null, '2016-09-08 17:13:34', null, null, '1');
INSERT INTO `category` VALUES ('17', '全年度报告', '1', '0', '1', null, '2016-09-09 16:43:31', null, null, '1');
INSERT INTO `category` VALUES ('18', '核查报告', '1', '0', '1', null, '2016-09-09 16:45:04', null, null, '1');
INSERT INTO `category` VALUES ('19', '股东会', '1', '0', '1', null, '2016-09-09 16:45:04', null, null, '1');
INSERT INTO `category` VALUES ('20', '董事会', '1', '0', '1', null, '2016-09-09 16:45:04', null, null, '1');
INSERT INTO `category` VALUES ('21', '监事会', '1', '0', '1', null, '2016-09-09 16:45:04', null, null, '1');
INSERT INTO `category` VALUES ('22', '重大事项', '1', '0', '1', null, '2016-09-09 16:45:04', null, null, '1');
INSERT INTO `category` VALUES ('23', '其他', '1', '0', '1', null, '2016-09-09 16:45:04', null, null, '1');
INSERT INTO `category` VALUES ('24', '审计', '2', '0', '1', null, '2016-09-09 16:46:45', null, null, '1');
INSERT INTO `category` VALUES ('25', '税务', '2', '0', '1', null, '2016-09-09 16:46:45', null, null, '1');
INSERT INTO `category` VALUES ('26', '会计准则', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('27', '并购重组', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('28', 'IPO', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('29', '三板', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('30', '房地产业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('31', '建筑业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('32', '交通运输、仓储和邮政业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('33', '教育', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('34', '农、林、牧、渔业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('35', '批发和零售业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('36', '文化、体育和娱乐业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('37', '信息传输、软件和信息技术服务业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('38', '制造业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('39', '租赁和商务服务业', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('40', '其他', '2', '24', '1', null, '2016-09-09 16:48:16', null, null, '2');
INSERT INTO `category` VALUES ('41', '增值税', '2', '25', '1', null, '2016-09-09 16:59:03', null, null, '2');
INSERT INTO `category` VALUES ('42', '企业所得税', '2', '25', '1', null, '2016-09-09 16:59:03', null, null, '2');
INSERT INTO `category` VALUES ('43', '个人所得税', '2', '25', '1', null, '2016-09-09 16:59:03', null, null, '2');
INSERT INTO `category` VALUES ('44', '财产税', '2', '25', '1', null, '2016-09-09 16:59:03', null, null, '2');
INSERT INTO `category` VALUES ('45', '行为税', '2', '25', '1', null, '2016-09-09 16:59:03', null, null, '2');
INSERT INTO `category` VALUES ('46', '国际税收', '2', '25', '1', null, '2016-09-09 16:59:03', null, null, '2');
INSERT INTO `category` VALUES ('47', '行业资讯', '3', '0', '1', null, '2016-09-09 17:25:01', null, null, '1');
INSERT INTO `category` VALUES ('48', '新闻资讯', '3', '0', '1', null, '2016-09-09 17:25:01', null, null, '1');
INSERT INTO `category` VALUES ('49', '时事评论', '3', '0', '1', null, '2016-09-09 17:25:01', null, null, '1');
INSERT INTO `category` VALUES ('50', '其他', '2', '25', '1', null, '2016-09-11 01:04:14', null, null, '2');

-- ----------------------------
-- Table structure for `column`
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
-- Table structure for `company`
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('5', 'BIG BOSS 集团股份有限公司', 'BB集团', '', '', '', '', null, '2016-09-09 23:31:36', '1', '2016-09-11 01:11:53', '', null, null);
INSERT INTO `company` VALUES ('6', 'BIG STAR普通合伙企业', 'BS公司', '', '', '', '', null, '2016-09-09 23:33:23', '1', '2016-09-10 21:49:27', '', null, null);
INSERT INTO `company` VALUES ('7', 'BIG TALENT公司', 'BT公司', '', '', '', '', null, '2016-09-09 23:33:39', '1', '2016-09-10 21:49:31', '', null, null);
INSERT INTO `company` VALUES ('8', '缤果酒业股份有限公司', 'BG公司', '', '', '', '', null, '2016-09-09 23:33:54', '1', '2016-09-10 21:49:34', '', null, null);
INSERT INTO `company` VALUES ('9', '杭州博爱化工有限公司', 'BL公司', '', '', '', '', null, '2016-09-09 23:34:12', '1', '2016-09-10 21:49:37', '', null, null);
INSERT INTO `company` VALUES ('10', 'BIG PRINCE动漫有限公司', 'BP公司', '', '', '', '', null, '2016-09-09 23:36:36', '1', '2016-09-10 21:49:46', '', null, null);
INSERT INTO `company` VALUES ('11', '星未来教育发展有限公司', 'BF公司', '', '', '', '', null, '2016-09-09 23:37:44', '1', '2016-09-10 21:49:51', '', null, null);
INSERT INTO `company` VALUES ('12', '浙江康乐农业有限责任公司', 'BH公司', '', '', '', '', null, '2016-09-09 23:38:35', '1', '2016-09-10 21:49:55', '', null, null);

-- ----------------------------
-- Table structure for `information`
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL COMMENT '信息标题',
  `LEVEL_ONE` int(11) DEFAULT NULL,
  `LEVEL_TWO` int(11) DEFAULT NULL,
  `PUBLISH_DATE` datetime DEFAULT NULL,
  `STATUS` int(11) DEFAULT NULL,
  `TOP_STATUS` int(11) DEFAULT NULL,
  `CREATE_BY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_BY` int(11) DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `COMPANY_ID` int(11) DEFAULT NULL,
  `COLUMN_ID` int(11) DEFAULT NULL,
  `TEXT` varchar(255) DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL COMMENT 'pdf保存地址(现在是文件名)',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES ('3', 'BIG BOSS CMS系统试运营', null, '0', '2016-09-10 16:33:50', '1', '0', '1', '2016-09-10 16:33:50', null, null, '5', '4', '请大家多方面测试后提交问题。', null);
INSERT INTO `information` VALUES ('4', '第一次股东大会', '19', '0', '2016-09-10 16:37:52', '1', '0', '1', '2016-09-10 16:37:52', null, null, '5', '1', '', null);
INSERT INTO `information` VALUES ('5', '第一次董事会', '20', '0', '2016-09-10 16:41:46', '1', '0', '1', '2016-09-10 16:41:46', null, null, '5', '1', '', null);
INSERT INTO `information` VALUES ('6', '财政部就《企业会计准则第37号——金融工具列报（修订）》征求意见', '24', '26', '2016-09-10 16:45:28', '1', '0', '1', '2016-09-10 16:45:28', '1', '2016-09-10 16:47:21', '5', '2', '如题', null);
INSERT INTO `information` VALUES ('7', '[9月9日海口晚报]钢铁价格下调 销量不佳', '47', '0', '2016-09-10 16:46:56', '1', '0', '1', '2016-09-10 16:46:56', null, null, '5', '3', 'RT', null);

-- ----------------------------
-- Table structure for `role`
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
-- Table structure for `user`
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
