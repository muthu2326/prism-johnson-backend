-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: prismjohnson
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (2,'service_article','Video','hhtp://video/1','Planning','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','eng',NULL,'2020-11-06 15:34:20','2020-11-06 15:34:20');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (1,'Image','Product','jjjj','https:///img',NULL,'eng',NULL,NULL),(2,'Image','Product','jjjj','https:///img',NULL,'eng','2020-11-06 15:24:12','2020-11-06 15:24:12');
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (9,'ALLAHABAD','eng','35bf-82a-ALLAH',11,'2020-11-12 04:08:22','2020-11-12 04:08:22'),(10,'JAUNPUR','eng','7f0b-bec-JAUNP',11,'2020-11-12 04:08:30','2020-11-12 04:08:30'),(11,'SONEBHADRA','eng','cc68-1b4-SONEB',11,'2020-11-12 04:08:37','2020-11-12 04:08:37'),(12,'AZAMGARH','eng','b2af-a75-AZAMG',11,'2020-11-12 04:08:45','2020-11-12 04:08:45'),(14,'KARERA','eng','6f10-179-KARER',2,'2020-11-12 04:09:11','2020-11-12 04:09:11'),(15,'GAYA','eng','1adf-273-GAYA',12,'2020-11-12 04:10:44','2020-11-12 04:10:44'),(16,'BEGUSARAI','eng','3571-b54-BEGUS',12,'2020-11-12 04:18:31','2020-11-12 04:18:31'),(17,'KHAGARIA','eng','c724-cb0-KHAGA',12,'2020-11-12 04:18:40','2020-11-12 04:18:40'),(18,'DARBHANGA','eng','f23a-d33-DARBH',12,'2020-11-12 04:18:46','2020-11-12 04:18:46'),(19,'MADHUBANI','eng','b236-c26-MADHU',12,'2020-11-12 04:18:52','2020-11-12 04:18:52'),(20,'SEONI','eng','6e01-b72-SEONI',2,'2020-11-12 04:21:20','2020-11-12 04:21:20'),(21,'BALAGHAT','eng','e665-11b-BALAG',2,'2020-11-12 04:21:27','2020-11-12 04:21:27'),(22,'MANDLA','eng','a482-a2e-MANDL',2,'2020-11-12 04:21:36','2020-11-12 04:21:36'),(23,'DINDORI','eng','0bff-ad4-DINDO',2,'2020-11-12 04:21:45','2020-11-12 04:21:45'),(24,'CHHATARPUR','eng','4339-c58-CHHAT',2,'2020-11-12 04:21:57','2020-11-12 04:21:57'),(25,'TIKAMGARH','eng','72e0-5c6-TIKAM',2,'2020-11-12 04:22:03','2020-11-12 04:22:03');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,'T2','intro','Image','http://img1','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','XX street, 2nd Main Banglore','prism@contact.com','1800-111-233','eng',NULL,NULL,NULL,NULL,NULL),(2,'T1','intro','Image','http://img1',NULL,'XX street, 2nd Main Banglore','prism@contact.com','1800-111-233','eng',NULL,NULL,NULL,NULL,NULL),(3,'T1','intro','Image','http://img1','हिंदी टायपिंग','XX street, 2nd Main Banglore','prism@contact.com','1800-111-233','eng',NULL,NULL,NULL,NULL,NULL),(4,'T1','intro','Image','http://img1','हिंदी टायपिंग','XX street, 2nd Main Banglore','prism@contact.com','1800-111-233','eng',NULL,'2020-11-06 15:23:52','2020-11-06 15:23:52',NULL,NULL);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealer`
--

DROP TABLE IF EXISTS `dealer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `region` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `branch` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `territory` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `dealer_code` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `name` text CHARACTER SET utf8,
  `pincode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `address` text CHARACTER SET utf8,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `reset_pasword_link_sent` tinyint(4) DEFAULT '0',
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `contact_no` varchar(100) DEFAULT NULL,
  `state` varchar(200) DEFAULT NULL,
  `cities` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dealer_code_UNIQUE` (`dealer_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer`
--

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;
INSERT INTO `dealer` VALUES (1,'ALBD','ALLAHABAD','ALLAHABAD CITY','002D000029','JAI SHAKTI TRADERS','211001','JAYANTIPUR SULEMSARAI, ALLAHABAD , ALLAHABAD','jaishaktigpcd.prism@gmail.com','$2b$10$rSGrDNZkalzCS62MavZC0ucqpvpV97jCQhViYD1/sGmQpYUeRg0Ii',0,'en','2b5e-bcb7-4','2020-11-12 00:53:10','2020-11-12 00:53:10','9415644024','UP','ALLAHABAD'),(2,'ALBD','JAUNPUR','JAUNPUR 1','090D000016','PRAKASH BUILDING MATERIAL','222002','VAN VIHAR ROAD. BHUPAT, JAUNPUR , JAUNPUR','prakashbuildingmaterial16@gmail.com','$2b$10$0llQ.1/b5s8QAS9.zwSKLOGa.riz1t4ubCFvDPsKf5ZwYiPoP0Okq',0,'en','f204-88bd-4','2020-11-12 00:55:37','2020-11-12 00:55:37','9415891346','UP','JAUNPUR'),(3,'ALBD','JAUNPUR','JAUNPUR 1','090D000004','JAISHWAL CEMENT AGENCY','222137','GOPALPUR, MARIYAHU, JAUNPUR , JAUNPUR','jaiswalcementag04@gmail.com','$2b$10$pGoConG6z66NhtuevNOd6O.6SZu6VAcAdZOSX42LzFlNvg68tI/JK',0,'en','0cee-99c3-4','2020-11-12 00:56:55','2020-11-12 00:56:55','9793379837','UP','JAUNPUR'),(4,'ALBD','MIRZAPUR','ANPARA','019D000033','NEW PANDEY ENTERPRISES','231205','Agarwal Market, Main Road Chopan, S , SONEBHADRA','newpandeye@gmail.com','$2b$10$4CJ1zBiEd7/T2/YigFrocOw8KKnhqjmoTMvlAVhpIyEDFen1aiM/S',0,'en','da0b-210c-4','2020-11-12 00:58:26','2020-11-12 00:58:26','9415264437','UP','SONEBHADRA'),(5,'BIHAR I','DEHRI','GAYA','037D000145','M.A.TRADERS','823001','GHUGHRITAND, CIVIL LINE GAYA , GAYA','newpandeye@gmail.com','$2b$10$rJ1QuG/o1PDe2vuxE6OQA.rSlZPpJfLJOi.50lWhq1JeXDnHAN0YG',0,'en','1fb9-d06b-4','2020-11-12 01:03:54','2020-11-12 01:03:54','9934463069','BIHAR','GAYA'),(6,'BIHAR I','DEHRI','GAYA','037D000224','MATA TRADERS','805130','DARIYAPUR, NIMCHAKBATHANI, DARIYAPU , GAYA','MAMATATRADER@GMAIL.COM','$2b$10$eYPJtZqE.c.v5liznmfvSOPa2QGoS/wBz9ViQPO1TIcLKD6OCyzNS',0,'en','b4f9-20e3-4','2020-11-12 01:04:52','2020-11-12 01:04:52','9931922443','BIHAR','GAYA'),(8,'GWLR','GWALIOR','SHIVPURI + SHEOPUR','123D000005','SURESH BANDHU','473660','BEEJ BHANDAR ROAD , KARERA','navankur.sunny@gmail.com','$2b$10$Kfjt4/OUxMpjG7JXavsOS.a2vUO5P0Kf2geoH0QO1NV/pL5MQQ8PC',0,'en','2c84-4b10-4','2020-11-12 01:08:29','2020-11-12 01:08:29','9425765588','MP','KARERA'),(9,'VRNS','AZAMGARH','AZAMGARH','014D000142','ATHAR IRON STORES','276121','BILARIYAGANJ, SAGRIAZAMGARHAZAMGARH , AZAMGARH','mohatahar84@yahoo.in','$2b$10$8CEev7mpYAJ92T1JtSYYiOveOgaXxBaqxKwSnFvu2h8Wd7oE4h7Iq',0,'en','5c45-fa4f-4','2020-11-12 01:10:18','2020-11-12 01:10:18','9415839034','UP','AZAMGARH'),(10,'VRNS','AZAMGARH','AZAMGARH','014D000148','JAISWAL CEMENT','276137','MAHARAJGANJ, AZAMGARH , AZAMGARH','adarshjaiswal17@gmail.com','$2b$10$f9VjSdOVE5s0S3wEGhhpLelMdL5bctgjfYRyjbGHQtjlVzIS6a2ae',0,'en','d0ed-9a7c-4','2020-11-12 01:11:11','2020-11-12 01:11:11','9919100491','UP','AZAMGARH');
/*!40000 ALTER TABLE `dealer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` varchar(200) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `productcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `dealer_id` int(11) DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `mobile` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `stage_of_construction` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `state` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `city` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `pincode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `address` text CHARACTER SET utf8,
  `site_address` text CHARACTER SET utf8,
  `status` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `status_description` text CHARACTER SET utf8,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_by_role` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `product_name` text,
  PRIMARY KEY (`id`),
  KEY `fk_order_product_id_idx` (`product_id`),
  KEY `fk_order__dealer_id_idx` (`dealer_id`),
  KEY `fk_orders_user_id_idx` (`user_id`),
  CONSTRAINT `fk_order__dealer_id` FOREIGN KEY (`dealer_id`) REFERENCES `dealer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('033666273452',5,'PC0015844',NULL,'Nirmal CM','nn@gmail.com','987654321',20,0,33,'Brick Work/RCC Wall','MP','SEONI','670107','Kudakkalam, Eranholi, Thalassery\nREVIERA','test addres','Submitted',NULL,'en','d5d4-567-nn@gm','2020-11-12 06:22:08','2020-11-12 06:22:08',NULL,NULL,'Prism Champion Cement'),('059126107357',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Cancelled','soory!','en','7990-16b-ram@g','2020-11-11 06:22:53','2020-11-11 15:25:11',NULL,NULL,NULL),('153788937680',9,'PC0214398',NULL,'Yogendra Shukla','yogendra12@gmail.com','7736365275',20,0,33,'Brick Work/RCC Wall','BIHAR','GAYA','804404','Arcade building, Gaya Town C. D. Block, Gaya, Bihar','Gaya Town C. D. Block, Gaya, Bihar','Submitted',NULL,'en','fb95-b60-yogen','2020-11-12 06:42:28','2020-11-12 06:42:28',NULL,NULL,'Prism Champion Duratech Cement'),('215918015116',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Completed','happy','en','1129-685-ram@g','2020-11-11 06:22:56','2020-11-11 15:25:27',NULL,NULL,NULL),('356656131815',10,'PC4497679',NULL,'Rahil','rahil@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Assigned',NULL,'en','408e-fb7-rahil','2020-11-12 05:37:03','2020-11-12 05:38:11',NULL,NULL,NULL),('386757982859',5,'PC0015844',NULL,'Kuldeep Singh','kuldeepsingh@gmail.com','987654321',25,0,33,'Excavation','MP','DINDORI','481879','Postmaster, Ajawar B.O, Dindori, Madhya Pradesh, India (IN)','Ajawar Post office, Dindori, Madhya Pradesh','Submitted',NULL,'en','a0e5-9c7-kulde','2020-11-12 06:34:04','2020-11-12 06:34:04',NULL,NULL,'Prism Champion Cement'),('404299368961',5,'P10001',2,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Completed','happy','en','61ce-f5c-ram@g','2020-11-11 06:22:51','2020-11-12 05:57:43',NULL,NULL,NULL),('496499090562',5,'PC0015844',NULL,'Nirmal CM','nn@gmail.com','987654321',20,0,33,'Brick Work/RCC Wall','MP','SEONI','670107','Kudakkalam, Eranholi, Thalassery\nREVIERA','jfhfhfjkd','Submitted',NULL,'en','b593-835-nn@gm','2020-11-12 06:01:48','2020-11-12 06:01:48',NULL,NULL,NULL),('517715980584',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','d561-2bd-ram@g','2020-11-11 07:01:09','2020-11-11 07:01:09',NULL,NULL,NULL),('753237448416',9,'PC0214398',1,'Nirmal CM','nn@gmail.com','987654321',20,0,33,'Brick Work/RCC Wall','UP','ALLAHABAD','670107','Kudakkalam, Eranholi, Thalassery\nREVIERA','ggumkiik','Assigned',NULL,'en','2893-11d-nn@gm','2020-11-12 06:05:39','2020-11-12 06:12:05',NULL,NULL,NULL),('824190068269',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','1742-61e-ram@g','2020-11-11 06:22:55','2020-11-11 06:22:55',NULL,NULL,NULL),('977464502229',NULL,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','c49e-d7f-ram@g','2020-11-11 06:14:21','2020-11-11 06:14:21',NULL,NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

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
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL,
  `csv_file_name` text,
  `features` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (5,'PC0015844','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_3.png','Prism Champion Cement','Prism Johnson Limited produces special blend of Portland Pozzolana Cement and markets it under the popular brand name “Champion”..',NULL,'en','8c47-37f-PC0015844','2020-11-12 04:27:40','2020-11-12 04:27:58',NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"This Cement is a finely-ground blend of high-quality clinker and carefully selected reactive silica-processed fly-ash\"}, {\"id\": 2, \"value\": \"In fact, selecting the right ingredients and blending them uniformly and intimately is what gives the cement a high level of initial and 28 days strength.\"}, {\"id\": 3, \"value\": \"It is the most commonly used cement for a wide range of applications. These applications cover ordinary standard, high strength concrete, masonry, plastering works and structural applications.\"}]'),(6,'PC0015844','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_3.png','प्रिज्म चैंपियन सीमेंट','प्रिज्म जॉनसन लिमिटेड प्रसिद्द ब्रांड प्रिज्म चैंपियन के अंतर्गत पोर्टलैंड पोजोलाना सीमेंट बनाता है.',NULL,'hi','8c47-37f-PC0015844','2020-11-12 04:27:40','2020-11-12 04:27:58',NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"यह बहुत ही महीन पीसा हुआ सीमेंट उच्च क्वालिटी के क्लिंकर के साथ उच्च तकनीक द्वारा चुनी हुयी सिलिका के सम्मिश्रण से बनता है.सही सामग्रियों का चुनाव एवं उन्नत तरीके से बनाया हुआ सीमेंट शुरूआती समय में तथा २८ दिन में उच्च ताकत देता है.\"}, {\"id\": 2, \"value\": \"यह सीमेंट हर प्रकार के निर्माण कार्यों में उपयोगी है. इस सीमेंट को सामान्य कार्य के लिए, उच्च ताकत कि कंक्रीट बनाने में, चुनाई, प्लास्टर तथा ढांचा बनाने जैसे कार्यों में उपयोगी है.\"}]'),(7,'PC6811178','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_2.png','Prism Champion Plus Cement','This environment friendly cement made by using Innovative technique, is created with the help of high tensile strength grade 53 clinker along with high quality processed fly ash.',NULL,'en','464b-c35-PC6811178','2020-11-12 04:27:40','2020-11-12 04:27:58',NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"Champion Plus which offers higher one-day strength. Prism Champion Plus Cement offers higher comprehensive strength, which helps in longer lasting construction.\"}, {\"id\": 2, \"value\": \"This cement comes with an attractive LPP packaging. Known for its high strength, high performance and consistent quality, this cement caters to the needs of all its major customer segments\"}]'),(8,'PC6811178','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_2.png','प्रिज्म चैंपियन प्लस सीमेंट','यह वातावरण के अनुकूलित सीमेंट उच्च क्वालिटी के क्लिंकर एवं प्रोसेस्ड फ्लाई ऐश (सिलिका) के सम्मिश्रण से बना है.',NULL,'hi','464b-c35-PC6811178','2020-11-12 04:27:40','2020-11-12 04:27:58',NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"परसिम चैंपियन प्लस सीमेंट से बहुत ज़्यादा १ दिन  तथा २८ दिन कि ताकत प्राप्त होती है जो हमारे निर्माण को दीर्घायु बनाता है.\"}, {\"id\": 2, \"value\": \"यह सीमेंट आकर्षक LPP पैकिंग में आता है. उच्च ताकत, ज़्यादा क्षमता तथा हमेश एक जैसी क्वालिटी इस सीमेंट को हर प्रकार के निर्माण के लिए उपयोगी बनाता है.\"}]'),(9,'PC0214398','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_1.png','Prism Champion Duratech Cement','When the need is for highly durable cement, then the ideal choice will be Prism Champion Duratech Cement. This high-performance versatile cement has different, unique advantages in it and is equally suited for low, medium and heavy-duty applications like Slabs, Columns, Beams, Foundations, Masonry, Plaster and all types of RCC and Pre-cast work.',NULL,'en','3694-a40-PC0214398','2020-11-12 04:27:40','2020-11-12 04:27:58',NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"Duratech Cement not only reduces the incidence of lime leaching from concrete and mortar but also results in refined pore structure, reduced permeability and long term strength gain.\"}, {\"id\": 2, \"value\": \"These attributes make the construction strong, compact, impermeable and resistant to chemical attacks.\"}]'),(10,'PC0214398','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_1.png','प्रिज्म चैंपियन duratech सीमेंट','बहुत ज़्यादा टिकाऊ सीमेंट कि आवश्यकता होते ही प्रिज्म चैंपियन duratech सीमेंट का नाम आता है. अपनी ख़ास खूबियों के साथ यह सीमेंट निम्न, माध्यम एवं उच्च क्षमता के निर्माण जैसे ढलाई, कॉलम, बीम, नींव, चुनाई, प्लास्टर, सभी प्रकार के RCC तथा प्री कास्ट कार्यों के लिए उपयोगी है.',NULL,'hi','3694-a40-PC0214398','2020-11-12 04:27:40','2020-11-12 04:27:58',NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"प्रिज्म चैंपियन duratech सीमेंट से कंक्रीट और मसाले से शोरा निकलना, सीपेज, पानी के रिसाव इत्यादि समस्याओं में बहुत कमी आती है\"}]');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

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
  `region` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `state` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `territory` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `price` float DEFAULT NULL,
  `pincode` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `city` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_product_mrp_list_product_id_idx` (`product_id`),
  CONSTRAINT `fk_product_mrp_list_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_mrp_list`
--

LOCK TABLES `product_mrp_list` WRITE;
/*!40000 ALTER TABLE `product_mrp_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_mrp_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quries`
--

DROP TABLE IF EXISTS `quries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quries` (
  `id` varchar(200) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `category` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `stage_of_construction` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `address` text,
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
  `product_name` varchar(200) DEFAULT NULL,
  `productcode` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_product_id_idx` (`product_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quries`
--

LOCK TABLES `quries` WRITE;
/*!40000 ALTER TABLE `quries` DISABLE KEYS */;
INSERT INTO `quries` VALUES ('094458035617',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning',NULL,'Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','6cd2-9aa-ram4@','2020-11-09 11:36:11','2020-11-09 11:36:11','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('121249699806',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','Assigned',NULL,'en','653f-bd3-ram4@','2020-11-09 13:40:01','2020-11-11 09:45:10','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('279106545913',31,'contact_us','Jai contact','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','22fd-5bc-ram4@','2020-11-11 09:57:16','2020-11-11 09:57:16','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('283530487381',31,'contact_us','Jai second','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore','671323','2020-11-21','Lorem ipsum','Completed','ok completed','en','c5af-353-ram4@','2020-11-11 11:52:57','2020-11-11 12:01:53','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('514039872511',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','c158-6fa-ram4@','2020-11-09 13:20:36','2020-11-09 13:20:36','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('706112041546',31,'contact_us','Jai contact','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','Cancelled','sorry!','en','6a8e-071-ram4@','2020-11-11 11:42:49','2020-11-11 12:49:51','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('719591468092',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','a729-8d7-ram4@','2020-11-09 13:31:21','2020-11-09 13:31:21','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('786514201378',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','Assigned',NULL,'en','43aa-5e6-ram4@','2020-11-11 11:46:46','2020-11-11 12:47:27','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('805966386889',31,'ask_expert','nikalejitesh@gmail.com','nikalejitesh@gmail.com','Cement',NULL,'Planning','301, Monam Heights\nNarayan Nagar Road, Titwala','Karnataka','Bangalore',NULL,'2020-11-12','test','submitted',NULL,'en','cab4-2ef-nikal','2020-11-11 10:51:41','2020-11-11 10:51:41','09820969738','12:00 - 01:00 PM','Champion Plus Cement','P10002'),('876722386410',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','666b-352-ram4@','2020-11-09 12:59:00','2020-11-09 12:59:00','1234567890','10 AM - 11 AM','Cememt duratech','P10002');
/*!40000 ALTER TABLE `quries` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

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
  `cities_list` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (2,'MP','eng','85df-561-MP','2020-11-09 12:18:37','2020-11-09 12:18:37',NULL),(11,'UP','eng','9e33-813-UP','2020-11-12 04:07:36','2020-11-12 04:07:36',NULL),(12,'BIHAR','eng','5c91-b76-BIHAR','2020-11-12 04:10:34','2020-11-12 04:10:34',NULL);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `sub_description`
--

LOCK TABLES `sub_description` WRITE;
/*!40000 ALTER TABLE `sub_description` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_description` ENABLE KEYS */;
UNLOCK TABLES;

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
  `stage_of_construction` varchar(200) DEFAULT NULL,
  `role` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `slug` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lang` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` text CHARACTER SET utf8,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (31,'Jai','jai@gmail.com',0,'XXX 1st main punjab','12344555','560026',NULL,'user','6c92-817-eng','eng',1,'2','2020-11-09 08:38:11','2020-11-09 08:38:11','$2b$10$OvX3vbdiWAYhN0CO/9ku9u7CqScZph78Ut2fPVnBWHjdLYEbdOSxe'),(32,'Jitesh Nikale','nikalejitesh@gmail.com',0,'301, Monam Heights\nNarayan Nagar Road, Titwala','09820969738','421605',NULL,'user','2dab-2b2-nikal','en',3,'[null]','2020-11-11 11:26:11','2020-11-11 11:26:11','$2b$10$PKcbjCJ0EQgRK9jPubaZUeq3WXpcxgGNykKNKbooRzqJuYuYcMm1C'),(33,'Nirmal CM','nn@gmail.com',0,'Kudakkalam, Eranholi, Thalassery\nREVIERA','987654321','670107','Brick Work/RCC Wall','user','9bc5-11d-nn@gm','en',3,'[2]','2020-11-11 13:26:47','2020-11-11 13:26:47','$2b$10$oWiabjcmkRReceMARRL5Tee2wx0S9nLg5yjlDmtuggOM5sMH.QhpK'),(34,'react developer','react.dev@gmail.com',0,'This may be my address','981234765','665544','Flooring','user','50a6-2a8-react','en',3,'[4]','2020-11-12 02:28:34','2020-11-12 02:28:34','$2b$10$qOleZd4g7Tj.d7CjK7MeXOF4PJIsNLJxCtyTrCAxPvkgLhIMGkjEW'),(37,'Admin','admin@gmail.com',0,'XXX 1st main bihar','12345678','230041',NULL,'admin','7ccd-9b5-admin','eng',12,'GAYA','2020-11-12 06:49:32','2020-11-12 06:49:32','$2b$10$3I5/tcelJtbGQA7GMB5csuG2rzMNv8ymu/W7KZNsnlN16nJCMBjCW'),(38,'TTE','admin@gmail.com',0,'XXX 1st main bihar','12345678','230041',NULL,'tte','269c-cb3-admin','eng',12,'GAYA','2020-11-12 06:50:03','2020-11-12 06:50:03','$2b$10$sOPitnYrp3LZSU2kqhHRf.32BMQhsTabiPgyQ38KFOjcdl5VrtYDq'),(39,'TTE','dealer1@gmail.com',0,'XXX 1st main bihar','12345678','851111',NULL,'tte','086c-1e4-deale','eng',12,'BEGUSARAI','2020-11-12 06:51:56','2020-11-12 06:51:56','$2b$10$bWgWenv8Rs0Tt/.hOaf90uN42H5CZMs0UvKb4UJiWliDAs8o0Rm2a'),(40,'TTE','dealer2@gmail.com',0,'XXX 1st main bihar','12345678','848202',NULL,'tte','c19c-ba2-deale','eng',12,'BEGUSARAI','2020-11-12 06:52:25','2020-11-12 06:52:25','$2b$10$eHOT6YjwnKqVjS/t6XkD4OdvvNYk51zlu515x9DnFJnzaSuvVWdnK'),(41,'Nirmal','nirmal@gmail.com',0,'XXX 1st main punjab','12344555','560026',NULL,'admin','ac94-021-nirma','eng',1,'[1, 2, 3]','2020-11-12 08:09:13','2020-11-12 08:09:13','$2b$10$E5hRDYWfBVpzBDHcc3GN/OVsW8Nj7IKV7C0xp2b//DBKDSP03xE0C');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-12  9:52:05
