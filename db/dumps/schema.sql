-- MySQL dump 10.13  Distrib 5.7.22, for macos10.13 (x86_64)
--
-- Host: localhost    Database: prism_johnson
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_hi` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `media_type` varchar(45) DEFAULT NULL,
  `summary_en` mediumtext,
  `summary_hi` mediumtext CHARACTER SET utf8,
  `content_en` mediumtext,
  `content_hi` mediumtext CHARACTER SET utf8,
  `section_id` int(11) DEFAULT NULL,
  `section_name_en` varchar(100) DEFAULT NULL,
  `section_name_hi` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `city_master`
--

DROP TABLE IF EXISTS `city_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city_master` (
  `id` int(11) NOT NULL,
  `city_en` varchar(128) DEFAULT NULL,
  `city_hi` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `state_en` varchar(128) DEFAULT NULL,
  `state_hi` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idx_city_master_state` (`state_en`),
  KEY `idx_city_master_city` (`city_en`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dealer`
--

DROP TABLE IF EXISTS `dealer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(256) NOT NULL,
  `name_hi` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `address_en` varchar(500) DEFAULT NULL,
  `address_hi` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `alternate_phone_1` varchar(45) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lang` varchar(45) DEFAULT NULL,
  `city_id` int(11) NOT NULL,
  `pin_code` int(6) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_dealer_city_master_id_idx` (`city_id`),
  KEY `idx_dealer_pin_code` (`pin_code`),
  CONSTRAINT `fk_dealer_city_id` FOREIGN KEY (`city_id`) REFERENCES `city_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `media_type` varchar(45) NOT NULL,
  `title` varchar(256) DEFAULT NULL,
  `media_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_gallery_media_type` (`media_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hindi_text_poc`
--

DROP TABLE IF EXISTS `hindi_text_poc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hindi_text_poc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `testimonial`
--

DROP TABLE IF EXISTS `testimonial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(256) NOT NULL,
  `customer_email` varchar(256) DEFAULT NULL,
  `customer_phone` varchar(45) DEFAULT NULL,
  `description` varchar(2048) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_user_city_master_id_idx` (`city_id`),
  CONSTRAINT `fk_user_city_id` FOREIGN KEY (`city_id`) REFERENCES `city_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-23 13:45:24
