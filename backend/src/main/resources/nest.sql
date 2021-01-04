/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.29-log : Database - nest
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `nest`;

/*Table structure for table `collection` */

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'https://cdn.siques.cn/public/default/project.e215b7dd.png',
  `type` enum('doc','note','video','tfNews') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `collection_doc` */

DROP TABLE IF EXISTS `collection_doc`;

CREATE TABLE `collection_doc` (
  `collectionId` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  PRIMARY KEY (`collectionId`,`docId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `liked` int(11) NOT NULL DEFAULT '0',
  `is_read` tinyint(4) NOT NULL DEFAULT '0',
  `is_adopt` tinyint(4) DEFAULT '0',
  `type` enum('answer','comment') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'comment',
  `postId` int(11) NOT NULL,
  `ownerUidId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `browser` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  KEY `FK_49a1638d537bd2d29b1c68f3812` (`ownerUidId`),
  KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `doc` */

DROP TABLE IF EXISTS `doc`;

CREATE TABLE `doc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` bigint(11) NOT NULL DEFAULT '0',
  `parentIds` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0,',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '未命名文档',
  `body` longtext COLLATE utf8mb4_unicode_ci,
  `alias` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `counts` int(11) NOT NULL DEFAULT '0',
  `type` enum('doc','note','video','tfNews') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` longtext COLLATE utf8mb4_unicode_ci,
  `sort` decimal(10,0) DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `isPublished` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=530 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `doc_history` */

DROP TABLE IF EXISTS `doc_history`;

CREATE TABLE `doc_history` (
  `id` int(11) NOT NULL DEFAULT '0',
  `parentId` bigint(11) NOT NULL DEFAULT '0',
  `parentIds` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0,',
  `versionId` bigint(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '未命名文档',
  `body` longtext COLLATE utf8mb4_unicode_ci,
  `alias` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `counts` int(11) NOT NULL DEFAULT '0',
  `type` enum('doc','note','video','tfNews') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` longtext COLLATE utf8mb4_unicode_ci,
  `sort` decimal(10,0) DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `isPublished` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`updated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `tag` */

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '$2a$10$0BcChWbrRL3YbXY2i.khSeuNtEgiUT5Sh.GUVNohkkZqZPFSjUHmK',
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `user_collection` */

DROP TABLE IF EXISTS `user_collection`;

CREATE TABLE `user_collection` (
  `userId` int(11) NOT NULL,
  `collectionId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`collectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `video` */

DROP TABLE IF EXISTS `video`;

CREATE TABLE `video` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '文件名',
  `ext` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '扩展名',
  `description` longtext COLLATE utf8mb4_unicode_ci COMMENT '描述',
  `url` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '原始链接',
  `statu` tinyint(4) NOT NULL COMMENT '采集状态',
  `last_update_time` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `del_flag` int(4) DEFAULT '0' COMMENT '是否删除  -1：已删除  0：正常',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '数据创建时间',
  `upload_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '文件上传日期',
  `oss_url` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT 'oss地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1086 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* Procedure structure for procedure `test` */

/*!50003 DROP PROCEDURE IF EXISTS  `test` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `test`()
BEGIN
	DECLARE flag INT DEFAULT 0;
	DECLARE idd int(11);
	DECLARE idList CURSOR FOR (SELECT id FROM nest.doc WHERE `type`='post');
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET flag = 1;
	OPEN idList;
		
		FETCH idList INTO idd;
		
		 WHILE flag != 1 DO
	             
		     INSERT INTO collection_doc VALUES (1,idd);
		     FETCH idList INTO idd;	
		 END WHILE;
        CLOSE idList;
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
