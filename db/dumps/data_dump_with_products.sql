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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (2,'Bangalore','eng','06ca-e39-Banga',3,'2020-11-09 12:34:08','2020-11-09 12:34:08'),(3,'Mysore','eng','c195-603-Mysor',3,'2020-11-09 12:34:19','2020-11-09 12:34:19'),(4,'Mangalore','eng','383d-e2a-Manga',3,'2020-11-09 12:34:32','2020-11-09 12:34:32'),(5,'Begusarai','eng','6feb-9d3-Begus',5,'2020-11-09 12:34:53','2020-11-09 12:34:53'),(6,'Khagaria','eng','61a3-ff8-Khaga',5,'2020-11-09 12:35:04','2020-11-09 12:35:04'),(7,'Muzaffarpur','eng','1de8-99a-Muzaf',5,'2020-11-09 12:35:27','2020-11-09 12:35:27'),(8,'Sitamarhi','eng','929b-3d9-Sitam',5,'2020-11-09 12:35:37','2020-11-09 12:35:37');
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
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `contact_no` varchar(100) DEFAULT NULL,
  `cities` json DEFAULT NULL,
  `state` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dealer_code_UNIQUE` (`dealer_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer`
--

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;
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
INSERT INTO `orders` VALUES ('059126107357',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','7990-16b-ram@g','2020-11-11 06:22:53','2020-11-11 06:22:53',NULL,NULL),('215918015116',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','1129-685-ram@g','2020-11-11 06:22:56','2020-11-11 06:22:56',NULL,NULL),('404299368961',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','61ce-f5c-ram@g','2020-11-11 06:22:51','2020-11-11 06:22:51',NULL,NULL),('517715980584',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','d561-2bd-ram@g','2020-11-11 07:01:09','2020-11-11 07:01:09',NULL,NULL),('824190068269',5,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','1742-61e-ram@g','2020-11-11 06:22:55','2020-11-11 06:22:55',NULL,NULL),('977464502229',NULL,'P10001',NULL,'Ram','ram@gmail.com','1234567890',2,700,31,'Planning','Karnataka','Bangalore','560021','Malleshwaram Bangalore','Malleshwaram Bangalore','Submited',NULL,'en','c49e-d7f-ram@g','2020-11-11 06:14:21','2020-11-11 06:14:21',NULL,NULL);
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
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
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
INSERT INTO `product` VALUES (5,'PC0015844','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_3.png','Prism Champion Cement','Prism Johnson Limited produces special blend of Portland Pozzolana Cement and markets it under the popular brand name “Champion”..',NULL,'en','8c47-37f-PC0015844',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"This Cement is a finely-ground blend of high-quality clinker and carefully selected reactive silica-processed fly-ash\"}, {\"id\": 2, \"value\": \"In fact, selecting the right ingredients and blending them uniformly and intimately is what gives the cement a high level of initial and 28 days strength.\"}, {\"id\": 3, \"value\": \"It is the most commonly used cement for a wide range of applications. These applications cover ordinary standard, high strength concrete, masonry, plastering works and structural applications.\"}]'),(6,'PC0015844','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_3.png','प्रिज्म चैंपियन सीमेंट','प्रिज्म जॉनसन लिमिटेड प्रसिद्द ब्रांड प्रिज्म चैंपियन के अंतर्गत पोर्टलैंड पोजोलाना सीमेंट बनाता है.',NULL,'hi','8c47-37f-PC0015844',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"यह बहुत ही महीन पीसा हुआ सीमेंट उच्च क्वालिटी के क्लिंकर के साथ उच्च तकनीक द्वारा चुनी हुयी सिलिका के सम्मिश्रण से बनता है.सही सामग्रियों का चुनाव एवं उन्नत तरीके से बनाया हुआ सीमेंट शुरूआती समय में तथा २८ दिन में उच्च ताकत देता है.\"}, {\"id\": 2, \"value\": \"यह सीमेंट हर प्रकार के निर्माण कार्यों में उपयोगी है. इस सीमेंट को सामान्य कार्य के लिए, उच्च ताकत कि कंक्रीट बनाने में, चुनाई, प्लास्टर तथा ढांचा बनाने जैसे कार्यों में उपयोगी है.\"}]'),(7,'PC6811178','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_2.png','Prism Champion Plus Cement','This environment friendly cement made by using Innovative technique, is created with the help of high tensile strength grade 53 clinker along with high quality processed fly ash.',NULL,'en','464b-c35-PC6811178',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"Champion Plus which offers higher one-day strength. Prism Champion Plus Cement offers higher comprehensive strength, which helps in longer lasting construction.\"}, {\"id\": 2, \"value\": \"This cement comes with an attractive LPP packaging. Known for its high strength, high performance and consistent quality, this cement caters to the needs of all its major customer segments\"}]'),(8,'PC6811178','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_2.png','प्रिज्म चैंपियन प्लस सीमेंट','यह वातावरण के अनुकूलित सीमेंट उच्च क्वालिटी के क्लिंकर एवं प्रोसेस्ड फ्लाई ऐश (सिलिका) के सम्मिश्रण से बना है.',NULL,'hi','464b-c35-PC6811178',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"परसिम चैंपियन प्लस सीमेंट से बहुत ज़्यादा १ दिन  तथा २८ दिन कि ताकत प्राप्त होती है जो हमारे निर्माण को दीर्घायु बनाता है.\"}, {\"id\": 2, \"value\": \"यह सीमेंट आकर्षक LPP पैकिंग में आता है. उच्च ताकत, ज़्यादा क्षमता तथा हमेश एक जैसी क्वालिटी इस सीमेंट को हर प्रकार के निर्माण के लिए उपयोगी बनाता है.\"}]'),(9,'PC0214398','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_1.png','Prism Champion Duratech Cement','When the need is for highly durable cement, then the ideal choice will be Prism Champion Duratech Cement. This high-performance versatile cement has different, unique advantages in it and is equally suited for low, medium and heavy-duty applications like Slabs, Columns, Beams, Foundations, Masonry, Plaster and all types of RCC and Pre-cast work.',NULL,'en','3694-a40-PC0214398',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"Duratech Cement not only reduces the incidence of lime leaching from concrete and mortar but also results in refined pore structure, reduced permeability and long term strength gain.\"}, {\"id\": 2, \"value\": \"These attributes make the construction strong, compact, impermeable and resistant to chemical attacks.\"}]'),(10,'PC0214398','image','https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/cement_1.png','प्रिज्म चैंपियन duratech सीमेंट','बहुत ज़्यादा टिकाऊ सीमेंट कि आवश्यकता होते ही प्रिज्म चैंपियन duratech सीमेंट का नाम आता है. अपनी ख़ास खूबियों के साथ यह सीमेंट निम्न, माध्यम एवं उच्च क्षमता के निर्माण जैसे ढलाई, कॉलम, बीम, नींव, चुनाई, प्लास्टर, सभी प्रकार के RCC तथा प्री कास्ट कार्यों के लिए उपयोगी है.',NULL,'hi','3694-a40-PC0214398',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"value\": \"प्रिज्म चैंपियन duratech सीमेंट से कंक्रीट और मसाले से शोरा निकलना, सीपेज, पानी के रिसाव इत्यादि समस्याओं में बहुत कमी आती है\"}]');
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
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
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
INSERT INTO `quries` VALUES ('094458035617',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning',NULL,'Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','6cd2-9aa-ram4@','2020-11-09 11:36:11','2020-11-09 11:36:11','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('121249699806',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','Assigned',NULL,'en','653f-bd3-ram4@','2020-11-09 13:40:01','2020-11-11 09:45:10','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('279106545913',31,'contact_us','Jai contact','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','22fd-5bc-ram4@','2020-11-11 09:57:16','2020-11-11 09:57:16','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('514039872511',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','c158-6fa-ram4@','2020-11-09 13:20:36','2020-11-09 13:20:36','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('719591468092',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','a729-8d7-ram4@','2020-11-09 13:31:21','2020-11-09 13:31:21','1234567890','10 AM - 11 AM','Cememt duratech','P10002'),('876722386410',31,'ask_expert','Jai','ram4@gmail.com','Cements',NULL,'Planning','Sriram puram bangalore','Karnataka','Bangalore',NULL,'2020-11-21','Lorem ipsum','submitted',NULL,'en','666b-352-ram4@','2020-11-09 12:59:00','2020-11-09 12:59:00','1234567890','10 AM - 11 AM','Cememt duratech','P10002');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (2,'MP','eng','85df-561-MP','2020-11-09 12:18:37','2020-11-09 12:18:37',NULL),(3,'Karnataka','eng','e285-b9a-Karna','2020-11-09 12:18:48','2020-11-09 12:18:48',NULL),(4,'Pune','eng','c686-79b-Pune','2020-11-09 12:18:54','2020-11-09 12:18:54',NULL),(5,'Bihar','eng','3f4f-258-Bihar','2020-11-09 12:20:43','2020-11-09 12:20:43',NULL),(6,'UP','eng','37b2-d93-UP','2020-11-09 12:21:36','2020-11-09 12:21:36',NULL),(7,'Mumbai','eng','0691-17a-Mumba','2020-11-09 12:21:46','2020-11-09 12:21:46',NULL),(8,'Maharastra','eng','c8c4-0a6-Mahar','2020-11-11 03:20:34','2020-11-11 03:20:34',NULL),(9,'Maharastra','eng','1e75-5df-Mahar','2020-11-11 03:21:14','2020-11-11 03:21:14',NULL),(10,'Maharastra','eng','e45a-e2e-Mahar','2020-11-11 03:25:17','2020-11-11 03:25:17','[{\"id\": 1, \"lang\": \"eng\", \"name\": \"Sitamarhi\", \"slug\": \"fbc4-733-Sitam\", \"created\": \"2020-11-09T12:50:52.000Z\", \"updated\": \"2020-11-09T12:50:52.000Z\", \"state_id\": 2}, {\"id\": 2, \"lang\": \"eng\", \"name\": \"Muzaffarpur\", \"slug\": \"8ab8-dc2-Muzaf\", \"created\": \"2020-11-09T12:51:05.000Z\", \"updated\": \"2020-11-09T12:51:05.000Z\", \"state_id\": 2}]');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (31,'Jai','jai@gmail.com',0,'XXX 1st main punjab','12344555','560026',NULL,'user','6c92-817-eng','eng',1,'2','2020-11-09 08:38:11','2020-11-09 08:38:11','$2b$10$OvX3vbdiWAYhN0CO/9ku9u7CqScZph78Ut2fPVnBWHjdLYEbdOSxe');
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

-- Dump completed on 2020-11-11  9:59:36
