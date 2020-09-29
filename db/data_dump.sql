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
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'New Direction: PRISM JOHNSON LIMITED','https://www.youtube.com/watch?v=whvihpvXOiI','video','Look at this video to know more about Prism\'s service','<div style=\'width: 100%;\'> <div class=\'article-banner\'> <img width=\'100%\' height=\'auto\' src=\'http://prism-johnson.digiapt.com/images/article-banner.png\' alt=\'Article Banner\'> </div> <div class=\'article-title\' style=\'padding: 22px 16px 14px 16px; font-size: 18px; font-weight: bold; background-color: #F2F2F2;\' >New Direction: PRISM JOHNSON LIMITED </div> <div class=\'article-descriptions\' style=\'font-weight: Regular; padding: 14px 16px 8px 16px; font-size: 12px; line-height: 24px;\'> <p class=\'article-desc-1\'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> <p class=\'article-desc-2\'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> </div> <div class=\'hindi-banner\' style=\'margin: auto 16px;\'>  <div style=\'padding: 16px 12px; background-color: #F2F2F2;\'> <img width=\'100%\' src=\'http://prism-johnson.digiapt.com/images/article-image-hi.png\' alt=\'Hindi Slogan\'> </div> </div>',1,'Budget'),(2,'Prism Products','https://www.prismcement.com/images/product-banner.jpg','image','Prism offers a range of products for variety of construction applications from foundation to finish','<div style=\'width: 100%;\'> <div class=\'article-banner\'> <img width=\'100%\' height=\'auto\' src=\'http://prism-johnson.digiapt.com/images/article-banner.png\' alt=\'Article Banner\'> </div> <div class=\'article-title\' style=\'padding: 22px 16px 14px 16px; font-size: 18px; font-weight: bold; background-color: #F2F2F2;\' >Prism Products </div> <div class=\'article-descriptions\' style=\'font-weight: Regular; padding: 14px 16px 8px 16px; font-size: 12px; line-height: 24px;\'> <p class=\'article-desc-1\'>2-1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> <p class=\'article-desc-2\'>2.2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> </div> <div class=\'hindi-banner\' style=\'margin: auto 16px;\'>  <div style=\'padding: 16px 12px; background-color: #F2F2F2;\'> <img width=\'100%\' src=\'http://prism-johnson.digiapt.com/images/article-image-hi.png\' alt=\'Hindi Slogan\'> </div> </div>',2,'Purchasing/Identifying a plot');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `dealer` VALUES (3,'Shweta Traders-3','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,473665,'2020-08-25 08:01:16',NULL),(4,'Shweta Traders-4','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,473665,'2020-08-25 08:03:02',NULL),(5,'Shweta Traders-5','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,NULL,NULL,4,473665,'2020-08-25 08:33:50',NULL),(6,'Shiv Traders 6-1-1','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9771391953','882527409','12.8723647','0.77237467624',4,847451,'2020-08-25 08:37:07',NULL),(7,'Shweta Traders-6','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','0.77237467624',NULL,'12.8723647',NULL,4,473665,'2020-08-25 08:37:45',NULL),(8,'Shweta Traders-7','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395',NULL,'12.8723647','0.77237467624',4,473665,'2020-08-25 08:38:59',NULL),(9,'Shweta Traders-7','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395','9425022396','12.8723647','0.77237467624',4,473665,'2020-08-25 08:40:51',NULL),(10,'Shweta Traders-8','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022395','9425022396','12.8723647','0.77237467624',4,473666,'2020-08-25 10:23:36',NULL),(11,'Shiv Traders - 91','Kunauli Bazar, Suttar Pradeshaul - 847451','9425022312','9425022313','12.8723647','0.77237467624',4,847451,'2020-08-25 13:49:56',NULL),(12,'Shweta Traders-9','Road Infront Of Vardhman Comadhya Pradeshlex,si,guna - 473101','9425022312','9425022313',NULL,NULL,4,473666,'2020-08-27 00:50:24',NULL);
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
INSERT INTO `user` VALUES (3,'Mano','manoj@digiapt.com','9898989898',4,'2020-08-26 07:18:38',NULL),(7,'Manoj','manoj1@digiapt.com','9898989898',4,'2020-08-26 07:25:15',NULL);
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

-- Dump completed on 2020-09-29 16:09:38
