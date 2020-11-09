-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: prism_johnson
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.18.04.1

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `media_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `media_url` text CHARACTER SET utf8,
  `title` text CHARACTER SET utf8,
  `short_description` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `media_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `title` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `media_url` text CHARACTER SET utf8,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_state_id_idx` (`state_id`),
  CONSTRAINT `fk_state_id` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `media_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `media_url` text CHARACTER SET utf8,
  `griha_nirman_description` text CHARACTER SET utf8,
  `contact_address` text CHARACTER SET utf8,
  `contact_email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `contact_toll_free_number` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credentials`
--

DROP TABLE IF EXISTS `credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `field_name` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `value` text CHARACTER SET utf8,
  PRIMARY KEY (`id`)
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
  `state_id` int(11) DEFAULT NULL,
  `region` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `branch` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `territory` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `dealer_code` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `name` text CHARACTER SET utf8,
  `pincode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `address` text CHARACTER SET utf8,
  `city_id` int(11) DEFAULT NULL,
  `contact_no` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `reset_pasword_link_sent` tinyint(4) DEFAULT '0',
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dealer_code_UNIQUE` (`dealer_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `productcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `dealer_id` int(11) DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `mobile` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `stage_of_construction` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `state` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `city` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `pincode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `user_address` text CHARACTER SET utf8,
  `delivery_address` text CHARACTER SET utf8,
  `status` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `status_description` text CHARACTER SET utf8,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_by_role` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_product_id_idx` (`product_id`),
  KEY `fk_order__dealer_id_idx` (`dealer_id`),
  CONSTRAINT `fk_order__dealer_id` FOREIGN KEY (`dealer_id`) REFERENCES `dealer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `media_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `media_url` text CHARACTER SET utf8,
  `title` text CHARACTER SET utf8,
  `short_description` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_mrp_list`
--

DROP TABLE IF EXISTS `product_mrp_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_mrp_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `productcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `branch` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `state` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `territory` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `price` float DEFAULT NULL,
  `city` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_mrp_list_product_id_idx` (`product_id`),
  CONSTRAINT `fk_product_mrp_list_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quries`
--

DROP TABLE IF EXISTS `quries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `category` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `productcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `stage_of_construction` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `state` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `city` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `pincode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `preferred_date` date DEFAULT NULL,
  `description` text CHARACTER SET utf8,
  `status` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `status_description` text CHARACTER SET utf8,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `preferred_time` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_product_id_idx` (`product_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `media_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `media_url` text CHARACTER SET utf8,
  `sub_title` text CHARACTER SET utf8,
  `sub_description` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_article_id_idx` (`article_id`),
  CONSTRAINT `fk_article_id` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sub_description`
--

DROP TABLE IF EXISTS `sub_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_description` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `value` text CHARACTER SET utf8,
  `section_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `productcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sub_content_id_idx` (`content_id`),
  KEY `fk_sub_product_id_idx` (`product_id`),
  KEY `fk_sub_section_id_idx` (`section_id`),
  CONSTRAINT `fk_sub_content_id` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sub_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sub_section_id` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `reset_pasword_link_sent` tinyint(4) DEFAULT '0',
  `address` text CHARACTER SET utf8,
  `mobile` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `pincode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `stage_of_planning` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `role` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` text CHARACTER SET utf8,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-09 11:56:39
