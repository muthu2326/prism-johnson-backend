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
-- Dumping data for table `city_master`
--

LOCK TABLES `city_master` WRITE;
/*!40000 ALTER TABLE `city_master` DISABLE KEYS */;
INSERT INTO `city_master` VALUES (1,'Araria','Bihar'),(2,'Arrah','Bihar'),(3,'Aurangabad','Bihar'),(4,'Aron','Madhya Pradesh'),(5,'Achhroni','Madhya Pradesh'),(6,'Amayan','Madhya Pradesh');
/*!40000 ALTER TABLE `city_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dealer`
--

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;
INSERT INTO `dealer` VALUES (1,'Shweta Traders','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,NULL,'2020-08-25 07:05:00',NULL),(2,'Shweta Traders-2','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,NULL,'2020-08-25 07:07:20',NULL),(3,'Shweta Traders-3','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,NULL,'2020-08-25 08:01:16',NULL),(4,'Shweta Traders-4','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,NULL,'2020-08-25 08:03:02',NULL),(5,'Shweta Traders-5','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,NULL,'2020-08-25 08:33:50',NULL),(6,'Shweta Traders-6','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','0.77237467624','4','12.8723647',NULL,4,NULL,'2020-08-25 08:37:07',NULL),(7,'Shweta Traders-6','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','0.77237467624',NULL,'12.8723647',NULL,4,NULL,'2020-08-25 08:37:45',NULL),(8,'Shweta Traders-7','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,'12.8723647','0.77237467624',4,NULL,'2020-08-25 08:38:59',NULL),(9,'Shweta Traders-7','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395','9425022396','12.8723647','0.77237467624',4,NULL,'2020-08-25 08:40:51',NULL);
/*!40000 ALTER TABLE `dealer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `testimonial`
--

LOCK TABLES `testimonial` WRITE;
/*!40000 ALTER TABLE `testimonial` DISABLE KEYS */;
/*!40000 ALTER TABLE `testimonial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
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

-- Dump completed on 2020-08-25 15:46:36
