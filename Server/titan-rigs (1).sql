CREATE DATABASE  IF NOT EXISTS `titan_rigs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `titan_rigs`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: titan_rigs
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `category` enum('Monitors','Keyboards','Mouse','Headphones','Mousemat','Cables') DEFAULT NULL,
  `description` text,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') DEFAULT 'NO',
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (1,'Dell UltraSharp U2723QE','Dell','Monitors','27-inch 4K IPS monitor with HDR support',700,'2023-01-15','NO',20),(2,'Asus ProArt PA32UCX','Asus','Monitors','32-inch 4K HDR professional monitor',2000,'2022-05-10','FO',5),(3,'Samsung Odyssey G9','Samsung','Monitors','49-inch QHD ultra-wide curved gaming monitor',1500,'2023-03-20','NO',8),(4,'LG UltraGear 34GN850','LG','Monitors','34-inch QHD curved gaming monitor with 1ms response',1200,'2022-10-18','CO',12),(5,'Acer Predator X27','Acer','Monitors','27-inch 4K gaming monitor with G-Sync',1800,'2023-02-14','NO',10),(6,'Corsair K95 RGB Platinum','Corsair','Keyboards','RGB mechanical gaming keyboard with macro keys',200,'2022-07-15','NO',30),(7,'Razer BlackWidow V3','Razer','Keyboards','RGB mechanical gaming keyboard with green switches',150,'2023-02-10','FO',25),(8,'Logitech MX Keys','Logitech','Keyboards','Wireless keyboard with backlit keys',100,'2022-09-20','NO',40),(9,'Sony WH-1000XM5','Sony','Headphones','Noise-canceling wireless over-ear headphones',350,'2023-02-01','NO',15),(10,'Bose QuietComfort 45','Bose','Headphones','Wireless headphones with exceptional noise cancelation',400,'2022-09-20','FO',10),(11,'Razer DeathAdder V3 Pro','Razer','Mouse','Wireless gaming mouse with ergonomic design',150,'2023-01-25','NO',20),(12,'Logitech G Pro X Superlight','Logitech','Mouse','Lightweight wireless gaming mouse',200,'2022-12-15','FO',15),(13,'SteelSeries QcK Prism','SteelSeries','Mousemat','RGB extended gaming mousemat with customizable lighting',50,'2023-05-20','NO',35);
/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aio`
--

DROP TABLE IF EXISTS `aio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `len` varchar(45) NOT NULL,
  `color` varchar(45) DEFAULT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int NOT NULL DEFAULT '0',
  `socket` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aio`
--

LOCK TABLES `aio` WRITE;
/*!40000 ALTER TABLE `aio` DISABLE KEYS */;
INSERT INTO `aio` VALUES (1,'Cooler Master ML120L','Cooler Master','120mm','Black',79,'2022-01-15','NO',25,'[\"AM4\"]'),(2,'NZXT Kraken X53','NZXT','240mm','White',129,'2023-05-10','NO',15,'[\"AM4\", \"AM5\"]'),(3,'Corsair H100i RGB Platinum','Corsair','240mm','Black',149,'2021-08-20','NO',10,'[\"LGA 1151\"]'),(4,'Arctic Liquid Freezer II','Arctic','280mm','Black',109,'2023-01-01','NO',12,'[\"LGA 1150\"]'),(5,'DeepCool Castle 360EX','DeepCool','360mm','Black',159,'2022-07-18','NO',8,'[\"LGA 1200\"]'),(6,'Thermaltake Floe Riing','Thermaltake','240mm','RGB',139,'2021-09-25','NO',20,'[\"LGA 1700\"]'),(7,'MSI MAG CORELIQUID 240R','MSI','240mm','Black',129,'2022-04-05','NO',18,'[\"LGA 1151\"]'),(8,'EVGA CLC 120','EVGA','120mm','Black',89,'2021-12-12','NO',22,'[\"LGA 1155\"]'),(9,'Asus ROG Ryujin II 360','Asus','360mm','Black',299,'2023-02-14','NO',5,'[\"LGA 1700\"]'),(10,'Lian Li Galahad 240','Lian Li','240mm','Silver',139,'2022-06-01','NO',10,'[\"LGA 1200\"]'),(11,'Zalman Reserator5 Z24','Zalman','240mm','Black',119,'2023-03-19','NO',16,'[\"LGA 1366\"]'),(12,'SilverStone PF360','SilverStone','360mm','Black',149,'2022-11-11','NO',7,'[\"LGA 1700\"]'),(13,'Cooler Master ML240L','Cooler Master','240mm','Black',89,'2021-03-03','NO',30,'[\"LGA 1156\"]'),(14,'Corsair iCUE H150i Elite','Corsair','360mm','RGB',189,'2023-04-25','NO',6,'[\"LGA 1200\"]'),(15,'NZXT Kraken Z63','NZXT','280mm','Black',229,'2022-12-01','NO',4,'[\"AM4\", \"AM5\", \"LGA 1700\"]');
/*!40000 ALTER TABLE `aio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabinet`
--

DROP TABLE IF EXISTS `cabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cabinet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `formfactor` varchar(45) NOT NULL,
  `cabinetcol` varchar(45) NOT NULL,
  `gpulen` varchar(45) DEFAULT NULL,
  `radiatorlen` varchar(45) DEFAULT NULL,
  `color` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinet`
--

LOCK TABLES `cabinet` WRITE;
/*!40000 ALTER TABLE `cabinet` DISABLE KEYS */;
INSERT INTO `cabinet` VALUES (1,'NZXT H510','NZXT','Mid Tower','Tempered Glass','381mm','240mm','Black',89,'2023-01-15','NO',30),(2,'Cooler Master MasterBox NR600','Cooler Master','Mid Tower','Mesh','410mm','360mm','Black',79,'2023-02-20','NO',25),(3,'Corsair 4000D Airflow','Corsair','Mid Tower','Tempered Glass','360mm','360mm','White',104,'2022-11-10','NO',20),(4,'Lian Li O11 Dynamic','Lian Li','Mid Tower','Tempered Glass','450mm','360mm','Black',139,'2023-03-18','NO',15),(5,'Phanteks Eclipse P400A','Phanteks','Mid Tower','Mesh','395mm','280mm','White',89,'2022-10-05','NO',22),(6,'Thermaltake Core P3 TG','Thermaltake','Open Frame','Tempered Glass','420mm','360mm','Black',149,'2023-04-12','NO',18),(7,'Fractal Design Meshify C','Fractal Design','Mid Tower','Mesh','360mm','280mm','Black',99,'2022-08-21','NO',24),(8,'Antec DF600 FLUX','Antec','Mid Tower','Tempered Glass','405mm','360mm','Black',74,'2023-05-02','NO',27),(9,'SilverStone FARA R1','SilverStone','Mid Tower','Mesh','322mm','240mm','White',59,'2022-07-25','NO',35),(10,'Be Quiet! Pure Base 500DX','Be Quiet!','Mid Tower','Tempered Glass','369mm','360mm','Black',120,'2023-02-14','NO',19),(11,'DeepCool Matrexx 55','DeepCool','Mid Tower','Tempered Glass','370mm','280mm','Black',69,'2022-11-11','NO',32),(12,'Cooler Master HAF 700 EVO','Cooler Master','Full Tower','Tempered Glass','490mm','420mm','Black',499,'2023-01-01','NO',5),(13,'NZXT H7 Elite','NZXT','Mid Tower','Tempered Glass','400mm','360mm','Black',199,'2023-03-10','NO',10),(14,'Corsair iCUE 5000T RGB','Corsair','Mid Tower','Tempered Glass','400mm','360mm','White',349,'2023-04-15','NO',8),(15,'Lian Li Lancool II Mesh','Lian Li','Mid Tower','Mesh','384mm','360mm','Black',94,'2022-06-05','NO',25),(16,'Thermaltake Level 20 GT','Thermaltake','Full Tower','Tempered Glass','410mm','420mm','Black',299,'2023-01-20','NO',7),(17,'Fractal Design Define R6','Fractal Design','Mid Tower','Tempered Glass','440mm','360mm','White',169,'2023-02-25','NO',11),(18,'Antec NX410','Antec','Mid Tower','Tempered Glass','330mm','280mm','Black',59,'2022-09-12','NO',30),(19,'SilverStone Primera PM01','SilverStone','Mid Tower','Tempered Glass','419mm','360mm','Black',99,'2023-05-18','NO',13),(20,'Be Quiet! Silent Base 802','Be Quiet!','Mid Tower','Mesh','420mm','420mm','White',169,'2022-10-30','NO',14);
/*!40000 ALTER TABLE `cabinet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categories_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `hsn code` enum('8473','8523','8471','8504','8528','9401','3506','8518','4016','8517','8544') NOT NULL,
  PRIMARY KEY (`categories_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `description`
--

DROP TABLE IF EXISTS `description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `description` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `text_description` text,
  `image_urls` text,
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `description_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `description`
--

LOCK TABLES `description` WRITE;
/*!40000 ALTER TABLE `description` DISABLE KEYS */;
/*!40000 ALTER TABLE `description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gpu`
--

DROP TABLE IF EXISTS `gpu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gpu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `vendor` enum('AMD','nvidia') NOT NULL,
  `brand` varchar(100) NOT NULL,
  `series` varchar(45) NOT NULL,
  `memory` int NOT NULL,
  `maxtdp` int NOT NULL,
  `connector` enum('pcie','gen3') NOT NULL,
  `gpulen` decimal(5,2) DEFAULT NULL,
  `color` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gpu`
--

LOCK TABLES `gpu` WRITE;
/*!40000 ALTER TABLE `gpu` DISABLE KEYS */;
INSERT INTO `gpu` VALUES (1,'GeForce RTX 3080','nvidia','Asus','RTX 30',10,320,'pcie',12.52,'black',699,'2021-05-10','NO',0),(2,'GeForce RTX 3070','nvidia','MSI','RTX 30',8,220,'pcie',12.52,'black',499,'2021-06-15','NO',0),(3,'Radeon RX 6800','AMD','Gigabyte','RX 6000',16,250,'gen3',12.52,'black',579,'2021-07-20','NO',0),(4,'Radeon RX 6700 XT','AMD','Sapphire','RX 6000',12,230,'gen3',12.52,'black',479,'2021-08-10','NO',0),(5,'Asus ROG Strix RTX 4090 OC','nvidia','Asus','RTX 4000',24,450,'gen3',31.20,'Black',2399,'2022-10-15','NO',5),(6,'MSI Gaming GeForce RTX 4080 Ventus','nvidia','MSI','RTX 4000',16,320,'gen3',31.00,'Black',1599,'2022-11-20','NO',7),(7,'Gigabyte Aorus RTX 4070 Ti Elite','nvidia','Gigabyte','RTX 4000',12,285,'gen3',30.80,'Black',1299,'2023-01-04','NO',8),(8,'EVGA FTW3 Ultra RTX 3090 Ti','nvidia','EVGA','RTX 3000',24,450,'gen3',31.20,'Black',1999,'2022-03-29','NO',10),(9,'Zotac GeForce RTX 3080 Trinity','nvidia','Zotac','RTX 3000',10,320,'gen3',30.80,'White',799,'2021-06-15','NO',12),(10,'Sapphire Nitro+ RX 7900 XTX','AMD','Sapphire','RX 7000',24,355,'pcie',30.50,'Black',999,'2023-02-20','NO',10),(11,'PowerColor Red Devil RX 7800 XT','AMD','PowerColor','RX 7000',16,300,'pcie',30.50,'Black',849,'2023-05-18','NO',6),(12,'ASRock Phantom Gaming RX 7700','AMD','ASRock','RX 7000',12,250,'pcie',30.30,'White',699,'2023-06-15','NO',7),(13,'XFX Speedster QICK RX 7600','AMD','XFX','RX 7000',8,165,'pcie',29.50,'Black',399,'2023-03-25','NO',20),(14,'Asus TUF Gaming RTX 4060 Ti OC','nvidia','Asus','RTX 4000',8,200,'gen3',30.30,'Black',499,'2023-05-31','NO',15),(15,'MSI Suprim GeForce RTX 3070 Ti','nvidia','MSI','RTX 3000',8,290,'gen3',30.50,'Black',799,'2021-07-25','NO',18),(16,'Gigabyte Eagle RTX 3060 OC','nvidia','Gigabyte','RTX 3000',12,170,'gen3',30.10,'White',349,'2021-11-19','NO',22),(17,'EVGA XC Gaming RTX 3050','nvidia','EVGA','RTX 3000',8,130,'gen3',30.00,'Black',249,'2022-01-20','NO',25),(18,'Sapphire Pulse RX 6700 XT','AMD','Sapphire','RX 6000',12,230,'pcie',30.50,'Black',479,'2021-03-18','NO',20),(19,'PowerColor Hellhound RX 6600','AMD','PowerColor','RX 6000',8,160,'pcie',29.50,'White',379,'2022-04-10','NO',18),(20,'ASRock Challenger RX 6500 XT','AMD','ASRock','RX 6000',4,107,'pcie',28.00,'Black',199,'2022-02-15','NO',30),(21,'XFX Speedster MERC319 RX 6800 XT','AMD','XFX','RX 6000',16,300,'pcie',30.50,'Black',699,'2021-05-22','NO',12),(22,'Zotac GeForce GTX 1660 Super Twin Fan','nvidia','Zotac','GTX 1600',6,125,'gen3',27.50,'Black',229,'2020-12-10','NO',28),(23,'Asus ROG Strix GTX 1650 OC','nvidia','Asus','GTX 1600',4,75,'gen3',25.50,'Black',159,'2019-04-20','NO',40),(24,'Gigabyte Gaming GTX 1050 Ti','nvidia','Gigabyte','GTX 1000',4,75,'gen3',25.00,'Black',149,'2018-02-11','NO',35),(25,'MSI Gaming X GTX 1080 Ti','nvidia','MSI','GTX 1000',11,250,'gen3',30.50,'Black',699,'2017-07-17','NO',8),(26,'EVGA Superclocked GTX 1070','nvidia','EVGA','GTX 1000',8,150,'gen3',29.00,'White',449,'2016-08-15','NO',10),(27,'ASRock Phantom RX Vega 64','AMD','ASRock','RX Vega',8,295,'pcie',30.00,'Black',499,'2017-10-01','NO',10),(28,'Sapphire Nitro RX 590','AMD','Sapphire','RX 500',8,175,'pcie',29.00,'Black',279,'2018-11-20','NO',15),(29,'Zotac Gaming RTX 2060','nvidia','Zotac','RTX 2000',6,160,'gen3',28.50,'Black',349,'2020-01-20','NO',22),(30,'MSI Armor RX 570','AMD','MSI','RX 500',4,150,'pcie',28.50,'Black',199,'2019-04-20','NO',25),(31,'EVGA Black Edition GTX 950','nvidia','EVGA','GTX 900',2,90,'gen3',26.00,'Black',129,'2015-10-01','NO',50),(32,'Gigabyte Windforce RTX 2070 Super','nvidia','Gigabyte','RTX 2000',8,215,'gen3',30.50,'Black',599,'2019-12-01','NO',20),(33,'PowerColor Fighter RX 550','AMD','PowerColor','RX 500',4,50,'pcie',24.00,'Black',129,'2017-06-15','NO',60);
/*!40000 ALTER TABLE `gpu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motherboard`
--

DROP TABLE IF EXISTS `motherboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motherboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `chipset` varchar(45) NOT NULL,
  `socket` varchar(45) NOT NULL,
  `formfactor` varchar(45) NOT NULL,
  `ddrtype` varchar(45) NOT NULL,
  `ramslot` int NOT NULL,
  `pciegen` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `ssdinterface` set('sata','nvme','m.2') NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') DEFAULT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motherboard`
--

LOCK TABLES `motherboard` WRITE;
/*!40000 ALTER TABLE `motherboard` DISABLE KEYS */;
INSERT INTO `motherboard` VALUES (1,'Asus ROG Strix B550-F','Asus','B550','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',179,'2022-06-10','NO',20),(2,'MSI MAG B660 Tomahawk','MSI','B660','LGA 1700','ATX','DDR5',4,'PCIe 5.0','Black','sata,m.2',229,'2023-01-15','NO',15),(3,'Gigabyte Aorus X570 Elite','Gigabyte','X570','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',199,'2021-08-12','NO',12),(4,'Asrock Z690 Steel Legend','ASRock','Z690','LGA 1700','ATX','DDR5',4,'PCIe 5.0','White','sata,nvme',299,'2023-03-20','NO',10),(5,'MSI MPG Z590 Gaming Carbon','MSI','Z590','LGA 1200','ATX','DDR4',4,'PCIe 4.0','Black','sata,m.2',249,'2022-04-18','NO',18),(6,'Gigabyte B450M DS3H','Gigabyte','B450','AM4','Micro-ATX','DDR4',2,'PCIe 3.0','Black','sata,m.2',89,'2021-03-25','NO',25),(7,'Asus Prime Z590-P','Asus','Z590','LGA 1200','ATX','DDR4',4,'PCIe 4.0','White','sata,nvme,m.2',219,'2022-09-10','NO',15),(8,'MSI PRO Z690-A','MSI','Z690','LGA 1700','ATX','DDR5',4,'PCIe 5.0','Black','sata,nvme,m.2',249,'2023-02-01','NO',10),(9,'ASRock B550 Phantom Gaming','ASRock','B550','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,m.2',179,'2022-05-14','NO',20),(10,'Gigabyte Z690 Aorus Master','Gigabyte','Z690','LGA 1700','E-ATX','DDR5',4,'PCIe 5.0','Black','sata,nvme,m.2',489,'2023-04-25','NO',8),(11,'Asus TUF Gaming B660M','Asus','B660','LGA 1700','Micro-ATX','DDR5',2,'PCIe 4.0','Black','sata,m.2',149,'2023-01-10','NO',30),(12,'MSI MAG X570 TOMAHAWK','MSI','X570','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',199,'2022-07-20','NO',18),(13,'Gigabyte B560M Aorus Pro','Gigabyte','B560','LGA 1200','Micro-ATX','DDR4',2,'PCIe 4.0','Black','sata,m.2',119,'2022-11-12','NO',22),(14,'ASRock Z590 Extreme WiFi','ASRock','Z590','LGA 1200','ATX','DDR4',4,'PCIe 4.0','White','sata,nvme',189,'2022-03-05','NO',12),(15,'Asus ROG Crosshair VIII Hero','Asus','X570','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',379,'2021-09-18','NO',10),(16,'MSI MAG B550M Bazooka','MSI','B550','AM4','Micro-ATX','DDR4',2,'PCIe 3.0','Black','sata,m.2',109,'2021-05-15','NO',25),(17,'Gigabyte H510M S2H','Gigabyte','H510','LGA 1200','Micro-ATX','DDR4',2,'PCIe 3.0','Black','sata,m.2',69,'2022-08-19','NO',40),(18,'Asus Prime H470-PLUS','Asus','H470','LGA 1200','ATX','DDR4',4,'PCIe 3.0','White','sata,nvme,m.2',159,'2021-12-22','NO',15),(19,'MSI MPG Z490 Gaming Edge','MSI','Z490','LGA 1200','ATX','DDR4',4,'PCIe 4.0','Black','sata,m.2',239,'2021-07-05','NO',10),(20,'Gigabyte Aorus X470 Ultra','Gigabyte','X470','AM4','ATX','DDR4',4,'PCIe 3.0','Black','sata,nvme,m.2',169,'2020-09-15','NO',20),(21,'ASRock B365M Pro4','ASRock','B365','LGA 1151','Micro-ATX','DDR4',2,'PCIe 3.0','White','sata,m.2',99,'2021-04-10','NO',18),(22,'Asus ROG Strix Z690-E','Asus','Z690','LGA 1700','ATX','DDR5',4,'PCIe 5.0','Black','sata,nvme,m.2',449,'2023-02-15','NO',12),(23,'MSI MEG Z590 ACE','MSI','Z590','LGA 1200','E-ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',499,'2021-11-12','NO',10),(24,'Gigabyte Z490 Vision D','Gigabyte','Z490','LGA 1200','ATX','DDR4',4,'PCIe 3.0','White','sata,nvme',299,'2022-01-28','NO',12),(25,'ASRock Fatal1ty B450 Gaming K4','ASRock','B450','AM4','ATX','DDR4',4,'PCIe 3.0','Black','sata,m.2',139,'2021-06-05','NO',15),(26,'Asus Prime B550-PLUS','Asus','B550','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',159,'2022-05-10','NO',20),(27,'MSI MPG X570 Gaming Plus','MSI','X570','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',189,'2021-03-15','NO',10),(28,'Gigabyte B450 Aorus Elite','Gigabyte','B450','AM4','ATX','DDR4',4,'PCIe 3.0','Black','sata,nvme,m.2',119,'2022-04-22','NO',25),(29,'ASRock Z370 Extreme4','ASRock','Z370','LGA 1151','ATX','DDR4',4,'PCIe 3.0','Black','sata,nvme',159,'2020-09-01','NO',15),(30,'Asus TUF Gaming B450M-PLUS','Asus','B450','AM4','Micro-ATX','DDR4',2,'PCIe 3.0','Black','sata,m.2',89,'2021-01-15','NO',30),(31,'MSI MAG B550 Tomahawk','MSI','B550','AM4','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',179,'2022-06-20','NO',18),(32,'Gigabyte H410M S2H','Gigabyte','H410','LGA 1200','Micro-ATX','DDR4',2,'PCIe 3.0','Black','sata,m.2',59,'2022-09-15','NO',40),(33,'ASRock B560 Pro4','ASRock','B560','LGA 1200','ATX','DDR4',4,'PCIe 4.0','Black','sata,nvme,m.2',149,'2021-08-12','NO',20);
/*!40000 ALTER TABLE `motherboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processors`
--

DROP TABLE IF EXISTS `processors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` enum('amd','intel') NOT NULL,
  `name` varchar(100) NOT NULL,
  `model` varchar(45) NOT NULL,
  `chipset` varchar(45) NOT NULL,
  `socket` varchar(45) NOT NULL,
  `maxtdp` int NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processors`
--

LOCK TABLES `processors` WRITE;
/*!40000 ALTER TABLE `processors` DISABLE KEYS */;
INSERT INTO `processors` VALUES (1,'intel','Core i5-12600K','12600K','Z690','LGA1700',125,299,'2022-01-01','NO',0),(2,'intel','Core i7-12700K','12700K','Z690','LGA1700',190,399,'2022-01-01','NO',0),(3,'amd','Ryzen 5 5600X','5600X','B550','AM4',65,199,'2021-03-10','NO',0),(4,'amd','Ryzen 7 5800X','5800X','X570','AM4',105,299,'2021-04-15','NO',0),(9,'intel','Core i9-12900K','12900K','Z690','LGA1700',241,599,'2022-02-15','NO',10),(10,'amd','Ryzen 9 5950X','5950X','X570','AM4',105,799,'2021-01-20','NO',8),(11,'intel','Core i5-11600K','11600K','Z590','LGA1200',125,269,'2021-06-15','NO',12),(12,'amd','Ryzen 5 7600X','7600X','B650','AM5',105,299,'2023-01-01','NO',15),(13,'intel','Core i7-13700K','13700K','Z790','LGA1700',253,419,'2023-03-10','NO',7),(14,'amd','Ryzen 9 7900X','7900X','X670','AM5',170,549,'2023-02-20','NO',5),(15,'intel','Core i3-12100','12100','B660','LGA1700',60,109,'2022-07-10','NO',20),(16,'amd','Ryzen 3 3300X','3300X','B550','AM4',65,129,'2020-11-15','NO',25),(17,'intel','Core i5-13400','13400','B760','LGA1700',120,219,'2023-04-05','NO',18),(18,'amd','Ryzen 7 7700X','7700X','X670','AM5',105,399,'2023-02-25','NO',10),(19,'intel','Core i9-10900K','10900K','Z490','LGA1200',125,489,'2020-08-01','NO',9),(20,'amd','Athlon 3000G','3000G','A320','AM4',35,49,'2019-12-01','NO',30);
/*!40000 ALTER TABLE `processors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_type` enum('processors','gpu','aio','cabinet','motherboard','psu','ram','ssd') NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=554 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'aio','https://c1.neweggimages.com/productimage/nb1280/35-103-361-01.png'),(2,1,'aio','https://c1.neweggimages.com/productimage/nb1280/35-103-361-11.png'),(3,1,'aio','https://c1.neweggimages.com/productimage/nb1280/35-103-361-07.png'),(4,2,'aio','https://c1.neweggimages.com/productimage/nb1280/35-146-078-07.jpg'),(5,2,'aio','https://c1.neweggimages.com/productimage/nb1280/35-146-078-01.jpg'),(6,2,'aio','https://c1.neweggimages.com/productimage/nb1280/35-146-078-03.jpg'),(7,3,'aio','https://c1.neweggimages.com/productimage/nb1280/35-181-151-01.jpg'),(8,3,'aio','https://c1.neweggimages.com/productimage/nb1280/35-181-151-V05.jpg'),(9,3,'aio','https://c1.neweggimages.com/productimage/nb1280/35-181-151-V03.jpg'),(10,4,'aio','https://c1.neweggimages.com/productimage/nb1280/35-186-273-01.jpg'),(11,4,'aio','https://c1.neweggimages.com/productimage/nb1280/35-186-273-04.jpg'),(12,4,'aio','https://c1.neweggimages.com/productimage/nb1280/35-186-273-05.jpg'),(13,5,'aio','https://cdn.deepcool.com/public/ProductFile/DEEPCOOL/Cooling/CPULiquidCoolers/CASTLE_360EX/Gallery/608X760/01.jpg?fm=webp&q=60'),(14,5,'aio','https://cdn.deepcool.com/public/ProductFile/DEEPCOOL/Cooling/CPULiquidCoolers/CASTLE_360EX/Gallery/608X760/02.jpg?fm=webp&q=60'),(15,5,'aio','https://cdn.deepcool.com/public/ProductFile/DEEPCOOL/Cooling/CPULiquidCoolers/CASTLE_360EX/Gallery/608X760/04.jpg?fm=webp&q=60'),(16,6,'aio','https://c1.neweggimages.com/productimage/nb1280/35-106-504-V12.jpg'),(17,6,'aio','https://c1.neweggimages.com/productimage/nb1280/35-106-504-V04.jpg'),(18,6,'aio','https://c1.neweggimages.com/productimage/nb1280/35-106-504-V06.jpg'),(19,7,'aio','https://c1.neweggimages.com/productimage/nb1280/35-846-008-V01.jpg'),(20,7,'aio','https://c1.neweggimages.com/productimage/nb1280/35-846-008-V02.jpg'),(21,7,'aio','https://c1.neweggimages.com/productimage/nb1280/35-846-008-S01.jpg'),(22,8,'aio','https://images.evga.com/products/gallery/png/400-HY-CL12-RX_LG_1.png'),(23,8,'aio','https://c1.neweggimages.com/productimage/nb640/35-288-007-V01.jpg'),(24,8,'aio','https://media.ox.ee/pictures/scaled/95/fe/7/2381661_800x600_b.jpg'),(25,9,'aio','https://c1.neweggimages.com/productimage/nb1280/35-101-070-V01.jpg'),(26,9,'aio','https://c1.neweggimages.com/productimage/nb1280/35-101-070-V02.jpg'),(27,9,'aio','https://c1.neweggimages.com/productimage/nb1280/35-101-070-V04.jpg'),(28,10,'aio','https://c1.neweggimages.com/productimage/nb1280/AFSTS230713k5hLa.jpg'),(29,10,'aio','https://c1.neweggimages.com/productimage/nb1280/AFSTS2307130AUH4A43.jpg'),(30,10,'aio','https://c1.neweggimages.com/productimage/nb1280/V18MD23110212Q7GW89.jpg'),(31,11,'aio','https://c1.neweggimages.com/productimage/nb1280/ABW9S2004271fyTE.jpg'),(32,11,'aio','https://c1.neweggimages.com/productimage/nb1280/ABW9S200427n8VbE.jpg'),(33,11,'aio','https://c1.neweggimages.com/productimage/nb1280/A7RDD2012283XXN3.jpg'),(34,12,'aio','https://m.media-amazon.com/images/I/61RlQ7acgFL._SL1500_.jpg'),(35,12,'aio','https://m.media-amazon.com/images/I/61CDu9QJ2dL._SL1500_.jpg'),(36,12,'aio','https://m.media-amazon.com/images/I/71CKea3Xh7L._SL1500_.jpg'),(37,13,'aio','https://c1.neweggimages.com/productimage/nb1280/35-103-335-08.png'),(38,13,'aio','https://c1.neweggimages.com/productimage/nb1280/35-103-335-20.png'),(39,13,'aio','https://c1.neweggimages.com/productimage/nb1280/35-103-335-19.png'),(40,14,'aio','https://c1.neweggimages.com/productimage/nb1280/35-181-332-01.png'),(41,14,'aio','https://c1.neweggimages.com/productimage/nb1280/35-181-332-04.png'),(42,14,'aio','https://c1.neweggimages.com/productimage/nb1280/35-181-332-07.png'),(43,15,'aio','https://c1.neweggimages.com/productimage/nb1280/35-146-082-01.jpg'),(44,15,'aio','https://c1.neweggimages.com/productimage/nb1280/35-146-082-04.jpg'),(45,15,'aio','https://c1.neweggimages.com/productimage/nb1280/35-146-082-02.jpg'),(46,1,'cabinet','https://c1.neweggimages.com/ProductImageCompressAll1280/11-146-317-V01.jpg'),(47,1,'cabinet','https://c1.neweggimages.com/ProductImageCompressAll1280/11-146-317-V02.jpg'),(48,1,'cabinet','https://c1.neweggimages.com/ProductImageCompressAll1280/11-146-317-V80.jpg'),(49,1,'cabinet','https://c1.neweggimages.com/ProductImageCompressAll1280/11-146-317-V07.jpg'),(50,2,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-368-V36.jpg'),(51,2,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-368-V47.jpg'),(52,2,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-368-V49.jpg'),(53,2,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-368-V38.jpg'),(54,3,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-139-156-V01.jpg'),(55,3,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-139-156-V02.jpg'),(56,3,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-139-156-V07.jpg'),(57,4,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A00V_1316868107147714239f2Q7Ix4aY.jpg'),(58,4,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-112-582-V82.jpg'),(59,4,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-112-582-V81.jpg'),(60,5,'cabinet','https://m.media-amazon.com/images/I/71HlajPgsCL._AC_SL1111_.jpg'),(61,5,'cabinet','https://m.media-amazon.com/images/I/71RDuohQaTL._AC_SL1111_.jpg'),(62,5,'cabinet','https://m.media-amazon.com/images/I/71VX7+ojG6L._AC_SL1106_.jpg'),(63,5,'cabinet','https://m.media-amazon.com/images/I/71IzU9O27oL._AC_SL1500_.jpg'),(64,6,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-133-372-V27.jpg'),(65,6,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-133-372-V23.jpg'),(66,6,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-133-372-V38.jpg'),(67,6,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-133-372-V24.jpg'),(68,7,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-140-V07.jpg'),(69,7,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-140-V81.jpg'),(70,7,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-140-V02.jpg'),(71,7,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-140-V05.jpg'),(72,8,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-129-268-36.jpg'),(73,8,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-129-268-38.jpg'),(74,8,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-129-268-37.jpg'),(75,8,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-129-268-V51.jpg'),(76,9,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A62VS221123EcFAf.jpg'),(77,9,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A62VS221123vP81a.jpg'),(78,9,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A62VS221123nEmVv.jpg'),(79,10,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-0037-00071-01.jpg'),(80,10,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS200420D3smt.jpg'),(81,10,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS200420gtEAt.jpg'),(82,10,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS200420g7bI7.jpg'),(83,11,'cabinet','https://m.media-amazon.com/images/I/41-uWxtdCDL._AC_.jpg'),(84,11,'cabinet','https://m.media-amazon.com/images/I/41mZNWuX25L._AC_.jpg'),(85,11,'cabinet','https://m.media-amazon.com/images/I/41RZHP3uRzL._AC_.jpg'),(86,12,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-433-V01.jpg'),(87,12,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-433-V05.jpg'),(88,12,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-119-433-V04.jpg'),(89,13,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-146-354-06.png'),(90,13,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-146-354-03.png'),(91,13,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-146-354-09.png'),(92,14,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-139-173-V01.jpg'),(93,14,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-139-173-V03.jpg'),(94,14,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-139-173-V04.jpg'),(95,15,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000Z-00086-V06.jpg'),(96,15,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000Z-00086-V02.jpg'),(97,15,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000Z-00086-V05.jpg'),(98,15,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000Z-00086-V04.jpg'),(99,16,'cabinet','https://m.media-amazon.com/images/I/61ZqOw8jO8L._AC_SL1280_.jpg'),(100,16,'cabinet','https://m.media-amazon.com/images/I/71Ios+ncVAL._AC_SL1336_.jpg'),(101,16,'cabinet','https://m.media-amazon.com/images/I/71A9Jn0HnSL._AC_SL1288_.jpg'),(102,16,'cabinet','https://m.media-amazon.com/images/I/710-32pdPSL._AC_SL1360_.jpg'),(103,17,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-048-02.jpg'),(104,17,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-048-03.jpg'),(105,17,'cabinet','https://c1.neweggimages.com/productimage/nb1280/11-352-048-50.jpg'),(106,18,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000V-001D5-V17.jpg'),(107,18,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000V-001D5-V09.jpg'),(108,18,'cabinet','https://c1.neweggimages.com/productimage/nb1280/2AM-000V-001D5-V14.jpg'),(109,19,'cabinet','https://m.media-amazon.com/images/I/51AN0syfEzL._AC_.jpg'),(110,19,'cabinet','https://m.media-amazon.com/images/I/5145mxNcZHL._AC_.jpg'),(111,19,'cabinet','https://m.media-amazon.com/images/I/51fLTxmZJbL._AC_.jpg'),(112,20,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS201113y09Tq.jpg'),(113,20,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS201113ELHAT.jpg'),(114,20,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS201113Ln3rd.jpg'),(115,20,'cabinet','https://c1.neweggimages.com/productimage/nb1280/A68VS2011138G6is.jpg'),(116,1,'gpu','https://c1.neweggimages.com/productimage/nb1280/ADFRD2203300ZKUZHF0.jpg'),(117,1,'gpu','https://c1.neweggimages.com/productimage/nb1280/ADFRD2203300ZKUZWD1.jpg'),(118,1,'gpu','https://c1.neweggimages.com/productimage/nb1280/ADFRD2203300ZL4R901.jpg'),(119,2,'gpu','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRGip0cxtdWCcCa4_q2p0qDuzZzj61q03vFppGaJVXpya7MQsGiS87JbnulicnV940AOZISNeANUJl85gJLzRyE6RnQ1GzGfg'),(120,2,'gpu','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS8zyzzlOgkCXzCwEgChBxUuxGMuJKk_t9COKXlBlg1RP6lPrwfZZSU6GBwUNXN6CBMo4JGWVDJmk75UD070sE7BLy4NkLq'),(121,2,'gpu','https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMTj6hwgU7hMNgBmKRFswv7hbwWPwt0pyaEDZQKZt0esl_rOW3-8llst6ipmskkbnaM1NaSKYmQtrWoQb6_1q0hj8HE4Ug'),(122,3,'gpu','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQogaSTh4lXTs1M_-Ck7sdzzI8RJ0jWGPvSXIt312KMRsNSNqPCi6QFeOTPoW4Xr241r_0xxJdSsTZ7rpEPLXY7irydAog7RQ'),(123,3,'gpu','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQnspvi809UqF93lQPACtbrwFkY7dzcbYNQV0KbLkEHdSorX8Kp2NyX6yxKm-TeK8M7Z16gsetYq5ZmoHUo5_G5sqnjJ9JknQ'),(124,3,'gpu','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR2ct-RexDQjnfFxl88fEWRJmCHE8zEw3J4Hmu1jropqss2Bp0D19jHIpoAya5cWDYctXLJR_7YdZMtTH9BOAoSDsktDMw2'),(125,4,'gpu','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQogaSTh4lXTs1M_-Ck7sdzzI8RJ0jWGPvSXIt312KMRsNSNqPCi6QFeOTPoW4Xr241r_0xxJdSsTZ7rpEPLXY7irydAog7RQ'),(126,4,'gpu','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQnspvi809UqF93lQPACtbrwFkY7dzcbYNQV0KbLkEHdSorX8Kp2NyX6yxKm-TeK8M7Z16gsetYq5ZmoHUo5_G5sqnjJ9JknQ'),(127,4,'gpu','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR2ct-RexDQjnfFxl88fEWRJmCHE8zEw3J4Hmu1jropqss2Bp0D19jHIpoAya5cWDYctXLJR_7YdZMtTH9BOAoSDsktDMw2'),(128,5,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-593-V01.jpg'),(129,5,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-593-V03.jpg'),(130,5,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-593-V05.jpg'),(131,6,'gpu','https://i5.walmartimages.com/seo/MSI-Ventus-GeForce-RTX-4080-SUPER-16GB-GDDR6X-PCI-Express-4-0-Video-Card-RTX-4080-SUPER-16G-VENTUS-3X-OC_5dc5b6a9-590f-4c10-840a-8fcd65822ac5.01580801817418e72ad36a91c9692fd1.jpeg'),(132,6,'gpu','https://i5.walmartimages.com/asr/2dc13368-b612-403b-b471-2bd15be7f077.ba631dad9c77a983bc519cc19259b54d.jpeg'),(133,6,'gpu','https://i5.walmartimages.com/asr/76371559-f038-4854-8d8c-159c05ef2c77.5c20f55f951c282b07e097dd5e9f3126.jpeg'),(134,7,'gpu','https://c1.neweggimages.com/productimage/nb1280/BGFDS23072808JKUJ79.jpg'),(135,7,'gpu','https://c1.neweggimages.com/productimage/nb1280/BGFDS23072808JK5C40.jpg'),(136,7,'gpu','https://c1.neweggimages.com/productimage/nb1280/BGFDS23072808JKBE2F.jpg'),(137,8,'gpu','https://c1.neweggimages.com/ProductImageCompressAll1280/BDCAS2210240H5FWO53.jpg'),(138,8,'gpu','https://c1.neweggimages.com/ProductImageCompressAll1280/BDCAS2210240H5FVA15.jpg'),(139,8,'gpu','https://c1.neweggimages.com/ProductImageCompressAll1280/BDCAS2210240H5G7NE6.jpg'),(140,9,'gpu','https://c1.neweggimages.com/productimage/nb1280/A6V6D2211090U9IB190.jpg'),(141,9,'gpu','https://c1.neweggimages.com/productimage/nb1280/A6V6D2211090U9HS843.jpg'),(142,9,'gpu','https://c1.neweggimages.com/productimage/nb1280/A6V6D2211090U9HTX0C.jpg'),(143,10,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-428-V02.jpg'),(144,10,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-428-01.jpg'),(145,10,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-428-04.jpg'),(146,11,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-820-04.png'),(147,11,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-820-08.png'),(148,11,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-820-02.png'),(149,12,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-930-011-V01.jpg'),(150,12,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-930-011-V05.jpg'),(151,12,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-930-011-V80.jpg'),(152,13,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-879-04.jpg'),(153,13,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-879-03.jpg'),(154,13,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-879-05.jpg'),(155,13,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-879-01.jpg'),(156,14,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-648-08.png'),(157,14,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-648-07.png'),(158,14,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-648-15.png'),(159,14,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-648-29.png'),(160,15,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-665-S01.jpg'),(161,15,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-665-S03.jpg'),(162,15,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-665-S04.jpg'),(163,15,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-665-S05.jpg'),(164,16,'gpu','https://c1.neweggimages.com/productimage/nb1280/ADFRD2206141AKJDS92.jpg'),(165,16,'gpu','https://c1.neweggimages.com/productimage/nb1280/ADFRD2206141AKJJI59.jpg'),(166,16,'gpu','https://c1.neweggimages.com/productimage/nb1280/ADFRD2206141AKJQ909.jpg'),(167,17,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-555-V02.jpg'),(168,17,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-555-V80.jpg'),(169,17,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-555-V06.jpg'),(170,17,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-555-V01.jpg'),(171,18,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-400-01.jpg'),(172,18,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-400-V02.jpg'),(173,18,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-400-V05.jpg'),(174,18,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-202-400-V06.jpg'),(175,19,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-790-05.png'),(176,19,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-790-V02.jpg'),(177,19,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-790-V81.jpg'),(178,19,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-790-V03.jpg'),(179,20,'gpu','https://m.media-amazon.com/images/I/61AzTXUQJhL._AC_SL1200_.jpg'),(180,20,'gpu','https://m.media-amazon.com/images/I/61xq5IlvFEL._AC_SL1200_.jpg'),(181,21,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-848-02.jpg'),(182,21,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-848-01.jpg'),(183,21,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-150-848-V04.jpg'),(184,22,'gpu','https://c1.neweggimages.com/productimage/nb1280/1FT-000M-003U0-S08.jpg'),(185,22,'gpu','https://c1.neweggimages.com/productimage/nb1280/1FT-000M-003U0-S01.jpg'),(186,22,'gpu','https://c1.neweggimages.com/productimage/nb1280/1FT-000M-003U0-S02.jpg'),(187,23,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-445-02.jpg'),(188,23,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-445-09.jpg'),(189,23,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-126-445-10.jpg'),(190,24,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-125-914-01.jpg'),(191,24,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-125-914-03.jpg'),(192,24,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-125-914-06.jpg'),(193,25,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-250-V51.jpg'),(194,25,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-250-V52.jpg'),(195,25,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-250-V53.jpg'),(196,26,'gpu','https://c1.neweggimages.com/productimage/nb1280/V0M5_1_201705041221089034.jpg'),(197,26,'gpu','https://c1.neweggimages.com/productimage/nb1280/V0M5_1_201705041365586724.jpg'),(198,26,'gpu','https://c1.neweggimages.com/productimage/nb1280/V0M5_1_2017050440708336.jpg'),(199,27,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-224-V01.jpg'),(200,27,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-224-V02.jpg'),(201,27,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-224-V04.jpg'),(202,28,'gpu','https://m.media-amazon.com/images/I/81IUmuIst2L._AC_SL1500_.jpg'),(203,28,'gpu','https://m.media-amazon.com/images/I/813TPB9ZWzL._AC_SL1500_.jpg'),(204,29,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-500-458-V11.jpg'),(205,29,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-500-458-V04.jpg'),(206,29,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-500-458-V03.jpg'),(207,30,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-123-Z01.jpg'),(208,30,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-123-Z02.jpg'),(209,30,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-123-Z05.jpg'),(210,30,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-137-123-Z06.jpg'),(211,31,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-250-08.jpg'),(212,31,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-250-01.jpg'),(213,31,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-250-07.jpg'),(214,31,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-487-250-04.jpg'),(215,32,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-932-170-V09.jpg'),(216,32,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-932-170-V03.jpg'),(217,32,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-932-170-V02.jpg'),(218,32,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-932-170-V80.jpg'),(219,33,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-738-Z01.jpg'),(220,33,'gpu','https://c1.neweggimages.com/productimage/nb1280/ASR8S210518d6EUS.jpg'),(221,33,'gpu','https://c1.neweggimages.com/productimage/nb1280/14-131-738-Z06.jpg'),(222,1,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-311-V03.jpg'),(223,1,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-311-V01.jpg'),(224,1,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-311-V02.jpg'),(225,1,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-311-V80.jpg'),(226,2,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AJEPS23102605J6SM92.jpg'),(227,2,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AJEPS23102605J6SVE6.jpg'),(228,2,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AJEPS23102605J6N04D.jpg'),(229,3,'motherboard','https://c1.neweggimages.com/ProductImageCompressAll1280/13-145-165-V01.jpg'),(230,3,'motherboard','https://c1.neweggimages.com/ProductImageCompressAll1280/13-145-165-V03.jpg'),(231,3,'motherboard','https://c1.neweggimages.com/ProductImageCompressAll1280/13-145-165-V05.jpg'),(232,4,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-162-027-21.jpg'),(233,4,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-162-027-15.jpg'),(234,4,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-162-027-17.jpg'),(235,4,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-162-027-20.jpg'),(236,5,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011DBC6I2B.jpg'),(237,5,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011DBCAJ87.jpg'),(238,5,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011DBCAG22.jpg'),(239,5,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011DBCCSAD.jpg'),(240,6,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AZF8D210901WCW38.jpg'),(241,7,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-372-01.jpg'),(242,7,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-372-V80.jpg'),(243,7,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-372-07.jpg'),(244,7,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-372-V81.jpg'),(245,8,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011CNPZA58.jpg'),(246,8,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011CNPZ73F.jpg'),(247,8,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011CNPTQD4.jpg'),(248,8,'motherboard','https://c1.neweggimages.com/productimage/nb1280/BDUMS2206011CNPWV41.jpg'),(249,9,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-935-V05.jpg'),(250,9,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-935-V01.jpg'),(251,9,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-935-V04.jpg'),(252,9,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-935-V81.jpg'),(253,9,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-935-V02.jpg'),(254,10,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-343-05.jpg'),(255,10,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-343-V80.jpg'),(256,10,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-343-09.jpg'),(257,11,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-540-01.jpg'),(258,11,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-540-V02.jpg'),(259,11,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-540-V06.jpg'),(260,12,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-471-01.jpg'),(261,12,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-471-05.jpg'),(262,12,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-471-03.jpg'),(263,13,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-332-01.jpg'),(264,13,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-332-03.jpg'),(265,13,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-332-05.jpg'),(266,13,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-332-02.jpg'),(267,14,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-603-01.jpg'),(268,14,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-603-03.jpg'),(269,14,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-603-07.jpg'),(270,15,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-362-04.jpg'),(271,15,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-362-V06.jpg'),(272,15,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-362-V80.jpg'),(273,15,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-362-V05.jpg'),(274,16,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-329-V01.jpg'),(275,16,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-329-V05.jpg'),(276,17,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AFYUD2406140ZKYY5CD.jpg'),(277,17,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AFYUD2406140ZKZ2SF2.jpg'),(278,18,'motherboard','https://www.asus.com/media/global/products/ibbbvgpdxlzqb5kb/P_setting_xxx_0_90_end_500.png'),(279,18,'motherboard','https://www.asus.com/media/global/gallery/7r4m4ppnxelqtyik_setting_xxx_0_90_end_800.png'),(280,19,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-415-01.jpg'),(281,19,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-415-02.jpg'),(282,19,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-415-06.jpg'),(283,20,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-060-V01.jpg'),(284,20,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-060-V06.jpg'),(285,20,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-060-V07.jpg'),(286,21,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-864-V11.jpg'),(287,21,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-864-V07.jpg'),(288,21,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-864-V05.jpg'),(289,22,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-512-01.jpg'),(290,22,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-512-V04.jpg'),(291,22,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-512-V02.jpg'),(292,22,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-512-V06.jpg'),(293,23,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-459-V05.jpg'),(294,23,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-459-V08.jpg'),(295,23,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-459-V04.jpg'),(296,23,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-459-V01.jpg'),(297,24,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-191-V06.jpg'),(298,24,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-191-V80.jpg'),(299,24,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-191-V82.jpg'),(300,24,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-191-V04.jpg'),(301,25,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-758-V01.jpg'),(302,25,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-758-V05.jpg'),(303,25,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-758-V02.jpg'),(304,26,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-323-01.jpg'),(305,26,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-323-V01.jpg'),(306,26,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-323-V05.jpg'),(307,27,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-262-V06.jpg'),(308,27,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-262-V02.jpg'),(309,27,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-262-V04.jpg'),(310,28,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-085-V08.jpg'),(311,28,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-085-V05.jpg'),(312,28,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-145-085-V03.jpg'),(313,29,'motherboard','https://m.media-amazon.com/images/I/71j-aeDSoVL._AC_SL1200_.jpg'),(314,29,'motherboard','https://m.media-amazon.com/images/I/71jDIY86PQL._AC_SL1200_.jpg'),(315,29,'motherboard','https://m.media-amazon.com/images/I/71GAPKUXyvL._AC_SL1200_.jpg'),(316,30,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-314-V05.jpg'),(317,30,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-314-V01.jpg'),(318,30,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-119-314-V80.jpg'),(319,31,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-540-03.jpg'),(320,31,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-540-07.jpg'),(321,31,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-144-540-02.jpg'),(322,32,'motherboard','https://c1.neweggimages.com/productimage/nb1280/AH41D200711KY535.jpg'),(323,32,'motherboard','https://c1.neweggimages.com/productimage/nb1280/A24GD210101886LX.jpg'),(324,32,'motherboard','https://c1.neweggimages.com/productimage/nb1280/A24GD210101ZBR4T.jpg'),(325,33,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-978-01.jpg'),(326,33,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-978-03.jpg'),(327,33,'motherboard','https://c1.neweggimages.com/productimage/nb1280/13-157-978-02.jpg'),(328,1,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-347-05.jpg'),(329,1,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-347-08.jpg'),(330,2,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-343-05.jpg'),(331,2,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-343-08.jpg'),(332,3,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-666-V01.jpg'),(333,3,'processors','https://c1.neweggimages.com/productimage/nb1280/A2W0S210105phmiS.jpg'),(334,3,'processors','https://c1.neweggimages.com/productimage/nb1280/B1MBS2111150R7GNW29.jpg'),(335,4,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-665-V01.jpg'),(336,4,'processors','https://c1.neweggimages.com/productimage/nb1280/A24GS2103191AFR1.jpg'),(337,4,'processors','https://c1.neweggimages.com/productimage/nb1280/A24GS210319c3fqH.jpg'),(338,9,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-339-08.jpg'),(339,9,'processors','https://c1.neweggimages.com/itemreivewimages/reviewimg1920/75f3eec3d4b24098ae313752c226279c.jpg'),(340,10,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-663-V01.jpg'),(341,10,'processors','https://c1.neweggimages.com/productimage/nb1280/B1MBS2111150RD3JA0C.jpg'),(342,10,'processors','https://c1.neweggimages.com/productimage/nb1280/B1MBS2111150RD34P0D.jpg'),(343,11,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-235-V01.jpg'),(344,11,'processors','https://c1.neweggimages.com/productimage/nb1280/A4P0S211028AB28F.jpg'),(345,11,'processors','https://c1.neweggimages.com/productimage/nb1280/A4P0S211028FEA4A.jpg'),(346,12,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-770-02.jpg'),(347,12,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-770-03.jpg'),(348,12,'processors','https://c1.neweggimages.com/itemreivewimages/reviewimg1920/3e464c41955c3a12665ce2a8b852c7dd5e7a50b92d30c955e5974ea7bf79753c.jpg'),(349,13,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-414-V01.jpg'),(350,13,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-414-V02.jpg'),(351,13,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-414-V05.jpg'),(352,14,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-769-02.jpg'),(353,14,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-769-03.jpg'),(354,15,'processors','https://c1.neweggimages.com/productimage/nb1280/V1DSD221019199GH5B2.jpg'),(355,15,'processors','https://c1.neweggimages.com/productimage/nb1280/AKACD2310271BWARE76.jpg'),(356,15,'processors','https://c1.neweggimages.com/productimage/nb1280/A24GD2203220DB74GFD.jpg'),(357,16,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-648-S01.jpg'),(358,16,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-648-S02.jpg'),(359,17,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-430-10.jpg'),(360,17,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-430-09.jpg'),(361,18,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-768-01.jpg'),(362,18,'processors','https://c1.neweggimages.com/productimage/nb1280/19-113-768-V15.jpg'),(363,19,'processors','https://c1.neweggimages.com/productimage/nb1280/19-118-122-01.jpg'),(364,19,'processors','https://c1.neweggimages.com/productimage/nb1280/A4P0S21102839D40.jpg'),(365,20,'processors','https://c1.neweggimages.com/productimage/nb1280/AN0MS200611PyH1c.jpg'),(366,20,'processors','https://c1.neweggimages.com/productimage/nb1280/V1DS_1_201912231342181392.jpg'),(367,20,'processors','https://c1.neweggimages.com/productimage/nb1280/ABPXD21090315SYDW.jpg'),(368,1,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-335-05.png'),(369,1,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-335-11.png'),(370,1,'psu','https://c1.neweggimages.com/itemreivewimages/reviewimg1920/5f1a096d8eb4c376dc4e4addbd579fc7993e78bd423fbff832312de00490eed7.jpg'),(371,2,'psu','https://c1.neweggimages.com/productimage/nb1280/B6Y0S21122804UK8Q5A.jpg'),(372,2,'psu','https://c1.neweggimages.com/productimage/nb1280/17-438-163-Z01.jpg'),(373,2,'psu','https://c1.neweggimages.com/productimage/nb1280/17-438-163-Z07.jpg'),(374,3,'psu','https://c1.neweggimages.com/productimage/nb1280/17-151-188-V15.jpg'),(375,3,'psu','https://c1.neweggimages.com/productimage/nb1280/17-151-188-V10.jpg'),(376,3,'psu','https://c1.neweggimages.com/productimage/nb1280/17-151-188-Z01.jpg'),(377,4,'psu','https://c1.neweggimages.com/productimage/nb1280/17-171-183-V01.jpg'),(378,4,'psu','https://c1.neweggimages.com/productimage/nb1280/17-171-183-V03.jpg'),(379,4,'psu','https://c1.neweggimages.com/productimage/nb1280/17-171-183-V04.jpg'),(380,5,'psu','https://c1.neweggimages.com/productimage/nb1280/17-153-403-V03.jpg'),(381,5,'psu','https://c1.neweggimages.com/productimage/nb1280/17-153-403-V05.jpg'),(382,5,'psu','https://c1.neweggimages.com/productimage/nb1280/17-153-403-V15.jpg'),(383,6,'psu','https://c1.neweggimages.com/productimage/nb1280/AG1PD21122206H01509.jpg'),(384,6,'psu','https://c1.neweggimages.com/productimage/nb1280/A0ZXD2112310QOBR1BD.jpg'),(385,6,'psu','https://c1.neweggimages.com/productimage/nb1280/AG1PD21122206H6KG06.jpg'),(386,7,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-039-12.png'),(387,7,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-039-11.png'),(388,7,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-039-07.png'),(389,7,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-039-04.png'),(390,8,'psu','https://c1.neweggimages.com/productimage/nb1280/17-256-116-06.jpg'),(391,8,'psu','https://c1.neweggimages.com/productimage/nb1280/17-256-116-04.jpg'),(392,8,'psu','https://c1.neweggimages.com/productimage/nb1280/17-256-116-08.jpg'),(393,9,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-029-V02.jpg'),(394,9,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-029-V04.jpg'),(395,9,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-029-V06.jpg'),(396,10,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-313-04.png'),(397,10,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-313-10.png'),(398,10,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-313-09.png'),(399,10,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-313-12.png'),(400,11,'psu','https://c1.neweggimages.com/productimage/nb1280/AU5ED2212030HGJ3367.jpg'),(401,12,'psu','https://m.media-amazon.com/images/I/614bDrIa17L._AC_SL1000_.jpg'),(402,12,'psu','https://m.media-amazon.com/images/I/514zGOUrtfL._AC_SL1000_.jpg'),(403,12,'psu','https://m.media-amazon.com/images/I/61eIDlAa1uL._AC_SL1000_.jpg'),(404,13,'psu','https://c1.neweggimages.com/productimage/nb1280/17-171-162-V01.jpg'),(405,13,'psu','https://c1.neweggimages.com/productimage/nb1280/17-171-162-V03.jpg'),(406,13,'psu','https://c1.neweggimages.com/productimage/nb1280/17-171-162-V13.jpg'),(407,14,'psu','https://m.media-amazon.com/images/I/61TeTD0LaqL._AC_SL1500_.jpg'),(408,14,'psu','https://m.media-amazon.com/images/I/81h3xLVbCJL._AC_SL1500_.jpg'),(409,14,'psu','https://m.media-amazon.com/images/I/51XyFh3wr1L._AC_.jpg'),(410,15,'psu','https://c1.neweggimages.com/productimage/nb1280/17-116-036-V31.jpg'),(411,15,'psu','https://c1.neweggimages.com/productimage/nb1280/17-116-036-V80.jpg'),(412,15,'psu','https://c1.neweggimages.com/productimage/nb1280/17-116-036-V32.jpg'),(413,16,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-032-18.png'),(414,16,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-032-10.png'),(415,16,'psu','https://c1.neweggimages.com/productimage/nb1280/17-320-032-04.png'),(416,17,'psu','https://c1.neweggimages.com/productimage/nb1280/BB57D2203180J1D8Q34.jpg'),(417,17,'psu','https://c1.neweggimages.com/productimage/nb1280/BB57D2203180J1DXX68.jpg'),(418,17,'psu','https://c1.neweggimages.com/productimage/nb1280/BB57D2203180J1E6T80.jpg'),(419,18,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-032-S07.jpg'),(420,18,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-032-S01.jpg'),(421,18,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-032-S06.jpg'),(422,19,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-249-08.jpg'),(423,19,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-249-04.jpg'),(424,19,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-249-02.jpg'),(425,20,'psu','https://m.media-amazon.com/images/I/81JR4qhqzLL._AC_SL1500_.jpg'),(426,20,'psu','https://m.media-amazon.com/images/I/71M-n35DLUS._AC_SL1280_.jpg'),(427,20,'psu','https://m.media-amazon.com/images/I/61ulbshEjoL._AC_SL1280_.jpg'),(428,1,'ram','https://m.media-amazon.com/images/I/71e6YWJio-L._AC_SL1500_.jpg'),(429,1,'ram','https://m.media-amazon.com/images/I/71LxpEdxQPL._AC_SL1500_.jpg'),(430,2,'ram','https://m.media-amazon.com/images/I/71DiVTefKBL._AC_SL1500_.jpg'),(431,2,'ram','https://m.media-amazon.com/images/I/71b5hJJ+L0L._AC_SL1500_.jpg'),(432,3,'ram','https://m.media-amazon.com/images/I/71UcVYxIL9L._AC_SL1500_.jpg'),(433,3,'ram','https://m.media-amazon.com/images/I/61lgIUniVWL._AC_SL1500_.jpg'),(434,4,'ram','https://m.media-amazon.com/images/I/81ov4cFmdaL._AC_SL1500_.jpg'),(435,4,'ram','https://m.media-amazon.com/images/I/719wIr899pL._AC_SL1500_.jpg'),(436,5,'ram','https://m.media-amazon.com/images/I/61x8Gw3dGCL._AC_SL1500_.jpg'),(437,5,'ram','https://m.media-amazon.com/images/I/51TZHxnZ2XL._AC_SL1500_.jpg'),(438,6,'ram','https://m.media-amazon.com/images/I/61vCYt0GnXL._AC_SL1280_.jpg'),(439,6,'ram','https://m.media-amazon.com/images/I/61vMgXn+BOS._AC_SL1024_.jpg'),(440,7,'ram','https://m.media-amazon.com/images/I/61OdVLSeCKL._AC_SL1500_.jpg'),(441,7,'ram','https://m.media-amazon.com/images/I/71RnEp5hCOL._AC_SL1500_.jpg'),(442,8,'ram','https://m.media-amazon.com/images/I/618SEnJR1nL._AC_SL1500_.jpg'),(443,8,'ram','https://m.media-amazon.com/images/I/71Krg0lCOyL._AC_SL1500_.jpg'),(444,9,'ram','https://m.media-amazon.com/images/I/71gKWkAmh1L._AC_SL1500_.jpg'),(445,9,'ram','https://m.media-amazon.com/images/I/61eVFYEyD0L._AC_SL1428_.jpg'),(446,10,'ram','https://m.media-amazon.com/images/I/71omVv2EiKL._AC_SL1500_.jpg'),(447,10,'ram','https://m.media-amazon.com/images/I/71uUUvgI+uL._AC_SL1500_.jpg'),(448,11,'ram','https://m.media-amazon.com/images/I/81nIdn2UYtL._AC_SL1500_.jpg'),(449,11,'ram','https://m.media-amazon.com/images/I/61-8a9wIvIL._AC_SL1000_.jpg'),(450,12,'ram','https://m.media-amazon.com/images/I/51Em2BaqrIL._AC_SL1500_.jpg'),(451,12,'ram','https://m.media-amazon.com/images/I/61MTKnGRLyL._AC_SL1080_.jpg'),(452,13,'ram','https://m.media-amazon.com/images/I/61wCOVcyvFL._AC_SL1500_.jpg'),(453,13,'ram','https://m.media-amazon.com/images/I/71npb2-MK+L._AC_SL1500_.jpg'),(454,14,'ram','https://m.media-amazon.com/images/I/71w2mY6QwSL._AC_SL1280_.jpg'),(455,14,'ram','https://m.media-amazon.com/images/I/719ZQgzis1L._AC_SL1500_.jpg'),(456,15,'ram','https://m.media-amazon.com/images/I/61vRnbFBJkL._AC_SL1200_.jpg'),(457,15,'ram','https://m.media-amazon.com/images/I/61eJl9d-cXL._AC_SL1199_.jpg'),(458,16,'ram','https://m.media-amazon.com/images/I/71QYVWwXVlL._AC_SL1500_.jpg'),(459,16,'ram','https://m.media-amazon.com/images/I/81VkbwYywsL._AC_SL1500_.jpg'),(460,17,'ram','https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS_5sIdW41UPzBCSBOhkGc7GM7j7pLZlrjQeoHrPOyxiGgAjFYNxYRB33rSZnieRnMx3SV5YOdG1rMJR7D6vj5f9iY4MbMo'),(461,17,'ram','https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS3941gGohdkfgPFLj7tmb8_9Qxes3gP9tww2weN-Mw1UuppX9wXek0gkxMqzYxzVmyOiE2iJJvPQLm7gpQ-7Q7GzCXjXaeng'),(462,18,'ram','https://m.media-amazon.com/images/I/51ZjZ-lGzKL._AC_SL1024_.jpg'),(463,18,'ram','https://m.media-amazon.com/images/I/71d5x+d6+fL._AC_SL1280_.jpg'),(464,19,'ram','https://m.media-amazon.com/images/I/91wc8+M4jtL._AC_SL1500_.jpg'),(465,19,'ram','https://m.media-amazon.com/images/I/818+Snsy6FL._AC_SL1500_.jpg'),(466,20,'ram','https://m.media-amazon.com/images/I/61prAqqd8cL._AC_SL1280_.jpg'),(467,20,'ram','https://m.media-amazon.com/images/I/61tiQ8-XZUL._AC_SL1280_.jpg'),(468,21,'ram','https://m.media-amazon.com/images/I/71UcVYxIL9L._AC_SL1500_.jpg'),(469,21,'ram','https://m.media-amazon.com/images/I/612x6igXT+L._AC_SL1500_.jpg'),(470,22,'ram','https://m.media-amazon.com/images/I/71gdTnukPUL._AC_SL1500_.jpg'),(471,23,'ram','https://webapi3.adata.com/storage/product/spextrix_d50_1920x1080.jpg'),(472,23,'ram','https://webapi3.adata.com/storage/ProductImage/653/images/pi_feature_image_2.jpg'),(473,24,'ram','https://m.media-amazon.com/images/I/61fwPjPIHjL._AC_SL1080_.jpg'),(474,24,'ram','https://m.media-amazon.com/images/I/61wWaMkDsML._AC_SL1080_.jpg'),(475,25,'ram','https://m.media-amazon.com/images/I/61PP-b7FqPL._AC_SL1000_.jpg'),(476,25,'ram','https://m.media-amazon.com/images/I/510vEPk7BbL._AC_SL1000_.jpg'),(477,26,'ram','https://m.media-amazon.com/images/I/71CrmOfjDDL._AC_SL1280_.jpg'),(478,26,'ram','https://m.media-amazon.com/images/I/71ujICszgVL._AC_SL1500_.jpg'),(479,26,'ram','https://m.media-amazon.com/images/I/71kRKHT7EUL._AC_SL1500_.jpg'),(480,27,'ram','https://m.media-amazon.com/images/I/61Mc6kTOz+L._AC_SL1500_.jpg'),(481,27,'ram','https://m.media-amazon.com/images/I/61DGnrzAuTL._AC_SL1500_.jpg'),(482,28,'ram','https://m.media-amazon.com/images/I/71Hr9o4g35L._AC_SL1500_.jpg'),(483,28,'ram','https://m.media-amazon.com/images/I/91D67h-ZICL._AC_SL1500_.jpg'),(484,29,'ram','https://m.media-amazon.com/images/I/71qYFyLPy-L._AC_SL1500_.jpg'),(485,29,'ram','https://m.media-amazon.com/images/I/712ckUMCyUL._AC_SL1500_.jpg'),(486,1,'ssd','https://m.media-amazon.com/images/I/71OWtcxKgvL._AC_SL1500_.jpg'),(487,1,'ssd','https://m.media-amazon.com/images/I/61S4fCwCigL._AC_SL1500_.jpg'),(488,2,'ssd','https://m.media-amazon.com/images/I/41QwIBwanoL._AC_SL1280_.jpg'),(489,2,'ssd','https://m.media-amazon.com/images/I/514DQFyItTL._AC_SL1280_.jpg'),(490,3,'ssd','https://m.media-amazon.com/images/I/71duypVENNL._AC_SL1430_.jpg'),(491,3,'ssd','https://m.media-amazon.com/images/I/61Drzy7XIsL._AC_SL1280_.jpg'),(492,4,'ssd','https://m.media-amazon.com/images/I/71LLczLHTxL._AC_SL1500_.jpg'),(493,4,'ssd','https://m.media-amazon.com/images/I/811AdH39gsL._AC_SL1500_.jpg'),(494,5,'ssd','https://m.media-amazon.com/images/I/71OYNmVRFhL._AC_SL1500_.jpg'),(495,5,'ssd','https://m.media-amazon.com/images/I/81zE8qvJbdL._AC_SL1500_.jpg'),(496,6,'ssd','https://m.media-amazon.com/images/I/61GMc31PcvL._AC_SL1001_.jpg'),(497,6,'ssd','https://m.media-amazon.com/images/I/71N5CT6LBDL._AC_SL1001_.jpg'),(498,7,'ssd','https://m.media-amazon.com/images/I/51zhuXxYuRL._AC_SL1080_.jpg'),(499,7,'ssd','https://m.media-amazon.com/images/I/71il37kQ5CL._AC_SL1280_.jpg'),(500,8,'ssd','https://m.media-amazon.com/images/I/71NfMZKkpQL._AC_SL1500_.jpg'),(501,8,'ssd','https://m.media-amazon.com/images/I/71D6f32AiWL._AC_SL1500_.jpg'),(502,9,'ssd','https://m.media-amazon.com/images/I/61KRjbxhoZL._AC_SL1000_.jpg'),(503,9,'ssd','https://m.media-amazon.com/images/I/71SxFoQyrdL._AC_SL1500_.jpg'),(504,10,'ssd','https://m.media-amazon.com/images/I/91S1PIX+yWL._AC_SL1500_.jpg'),(505,10,'ssd','https://m.media-amazon.com/images/I/81Raz6ME5wL._AC_SL1500_.jpg'),(506,11,'ssd','https://m.media-amazon.com/images/I/61tANhen+JL._AC_SL1500_.jpg'),(507,11,'ssd','https://m.media-amazon.com/images/I/815xLzBRbkL._AC_SL1500_.jpg'),(508,11,'ssd','https://m.media-amazon.com/images/I/71fOnxx8CsL._AC_SL1500_.jpg'),(509,12,'ssd','https://m.media-amazon.com/images/I/71LLczLHTxL._AC_SL1500_.jpg'),(510,12,'ssd','https://m.media-amazon.com/images/I/81M6y7pQvGL._AC_SL1500_.jpg'),(511,12,'ssd','https://m.media-amazon.com/images/I/71B1RDITxkL._AC_SL1500_.jpg'),(512,13,'ssd','https://m.media-amazon.com/images/I/41vS+6h89ML._AC_SL1073_.jpg'),(513,13,'ssd','https://m.media-amazon.com/images/I/51KaL7G-nGL._AC_SL1080_.jpg'),(514,13,'ssd','https://m.media-amazon.com/images/I/716PJKxEYXL._AC_SL1080_.jpg'),(515,14,'ssd','https://m.media-amazon.com/images/I/716uWs+EQSL._AC_SL1500_.jpg'),(516,14,'ssd','https://m.media-amazon.com/images/I/71y16aIw3ZL._AC_SL1500_.jpg'),(517,14,'ssd','https://m.media-amazon.com/images/I/81+GJZj1n0L._AC_SL1500_.jpg'),(518,15,'ssd','https://m.media-amazon.com/images/I/71H9AiHXrUL._AC_SL1000_.jpg'),(519,15,'ssd','https://m.media-amazon.com/images/I/61yNNsnOznL._AC_SL1000_.jpg'),(520,15,'ssd','https://m.media-amazon.com/images/I/51cIREQZEXL._AC_.jpg'),(521,16,'ssd','https://m.media-amazon.com/images/I/71OWtcxKgvL._AC_SL1500_.jpg'),(522,16,'ssd','https://m.media-amazon.com/images/I/61S4fCwCigL._AC_SL1500_.jpg'),(523,16,'ssd','https://m.media-amazon.com/images/I/61pdoMU4yvL._AC_SL1500_.jpg'),(524,21,'psu','https://m.media-amazon.com/images/I/71z2ttTn6KL._AC_SL1200_.jpg'),(525,21,'psu','https://m.media-amazon.com/images/I/71fChKT1KzL._AC_SL1200_.jpg'),(526,21,'psu','https://m.media-amazon.com/images/I/71ULZ263v4L._AC_SL1200_.jpg'),(527,22,'psu','https://m.media-amazon.com/images/I/81X1hRKY6ML._AC_SL1500_.jpg'),(528,22,'psu','https://m.media-amazon.com/images/I/81pKuzebucL._AC_SL1500_.jpg'),(529,22,'psu','https://m.media-amazon.com/images/I/813j2aCwPmL._AC_SL1500_.jpg'),(530,23,'psu','https://m.media-amazon.com/images/I/719Dlu50SSL._AC_SL1440_.jpg'),(531,23,'psu','https://m.media-amazon.com/images/I/71V2vXlRtBL._AC_SL1500_.jpg'),(532,23,'psu','https://m.media-amazon.com/images/I/61S6W3JSqML._AC_SL1280_.jpg'),(533,24,'psu','https://m.media-amazon.com/images/I/519OhBFhfpL._AC_SL1000_.jpg'),(534,24,'psu','https://m.media-amazon.com/images/I/51hTZ6zmrqL._AC_SL1000_.jpg'),(535,24,'psu','https://m.media-amazon.com/images/I/61U2YBpN-yL._AC_SL1000_.jpg'),(536,25,'psu','https://m.media-amazon.com/images/I/816nmJ86sKL._AC_SL1500_.jpg'),(537,25,'psu','https://m.media-amazon.com/images/I/81aTHqlvRGL._AC_SL1500_.jpg'),(538,25,'psu','https://m.media-amazon.com/images/I/71711xWKLHL._AC_SL1500_.jpg'),(539,26,'psu','https://m.media-amazon.com/images/I/71U+6+YXyFL._AC_SL1500_.jpg'),(540,26,'psu','https://m.media-amazon.com/images/I/71aHuSNd7uL._AC_SL1500_.jpg'),(541,26,'psu','https://m.media-amazon.com/images/I/81p0RrKLWLL._AC_SL1500_.jpg'),(542,27,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-027-Z01.jpg'),(543,27,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-027-Z03.jpg'),(544,27,'psu','https://c1.neweggimages.com/productimage/nb1280/17-233-027-Z08.jpg'),(545,28,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-334-05.png'),(546,28,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-334-06.png'),(547,28,'psu','https://c1.neweggimages.com/productimage/nb1280/17-139-334-03.png'),(548,29,'psu','https://m.media-amazon.com/images/I/81z-rvLrdzL._AC_SL1500_.jpg'),(549,29,'psu','https://m.media-amazon.com/images/I/7139bZevhFS._AC_SL1280_.jpg'),(550,29,'psu','https://m.media-amazon.com/images/I/61mqcDCEHFS._AC_SL1280_.jpg'),(551,30,'psu','https://m.media-amazon.com/images/I/716xtsOgfHL._AC_SL1200_.jpg'),(552,30,'psu','https://m.media-amazon.com/images/I/61d-lAshy7L._AC_SL1200_.jpg'),(553,30,'psu','https://m.media-amazon.com/images/I/711IMUfU-CL._AC_SL1200_.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psu`
--

DROP TABLE IF EXISTS `psu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `watt` varchar(45) NOT NULL,
  `rating` enum('white','bronze','silver','gold','platinum') NOT NULL,
  `connector` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psu`
--

LOCK TABLES `psu` WRITE;
/*!40000 ALTER TABLE `psu` DISABLE KEYS */;
INSERT INTO `psu` VALUES (1,'Corsair RM750x','Corsair','750W','gold','Modular','Black',129,'2022-03-01','NO',25),(2,'EVGA SuperNOVA 650 G5','EVGA','650W','gold','Modular','Black',119,'2023-01-15','NO',20),(3,'Seasonic Focus GX-850','Seasonic','850W','gold','Modular','Black',139,'2022-05-10','NO',18),(4,'Cooler Master MWE 550','Cooler Master','550W','bronze','Non-Modular','White',59,'2021-08-20','NO',30),(5,'Thermaltake Toughpower GF1','Thermaltake','850W','gold','Modular','Black',139,'2023-06-05','NO',15),(6,'NZXT C650','NZXT','650W','gold','Semi-Modular','Black',129,'2021-07-15','NO',22),(7,'Asus ROG Strix 850G','Asus','850W','gold','Modular','Black',179,'2022-11-25','NO',12),(8,'SilverStone SX500','SilverStone','500W','silver','Non-Modular','Black',79,'2021-03-03','NO',18),(9,'Gigabyte P750GM','Gigabyte','750W','bronze','Semi-Modular','Black',109,'2023-02-14','NO',10),(10,'Corsair HX1000i','Corsair','1000W','platinum','Modular','White',229,'2023-05-01','NO',5),(11,'Seasonic Prime TX-750','Seasonic','750W','platinum','Modular','Black',199,'2022-04-20','NO',8),(12,'EVGA 500 B1','EVGA','500W','bronze','Non-Modular','Black',49,'2021-12-01','NO',35),(13,'Cooler Master V850','Cooler Master','850W','gold','Modular','Black',139,'2022-08-10','NO',16),(14,'Thermaltake Smart BM2','Thermaltake','600W','bronze','Semi-Modular','Black',69,'2023-01-01','NO',28),(15,'NZXT E850','NZXT','850W','gold','Modular','White',169,'2022-09-15','NO',7),(16,'Asus ROG Thor 1200P','Asus','1200W','platinum','Modular','Black',299,'2023-07-25','NO',3),(17,'SilverStone ET750','SilverStone','750W','gold','Semi-Modular','Black',109,'2022-06-01','NO',20),(18,'Gigabyte GP-P850GM','Gigabyte','850W','gold','Modular','Black',139,'2022-05-15','NO',18),(19,'Corsair CV450','Corsair','450W','bronze','Non-Modular','Black',39,'2021-02-10','NO',40),(20,'Seasonic Focus PX-650','Seasonic','650W','platinum','Modular','Black',169,'2023-03-01','NO',10),(21,'EVGA 750 GQ','EVGA','750W','gold','Semi-Modular','Black',99,'2021-11-20','NO',25),(22,'Cooler Master MWE Gold 650','Cooler Master','650W','gold','Modular','White',99,'2022-10-15','NO',12),(23,'Thermaltake Toughpower GX2','Thermaltake','600W','bronze','Non-Modular','Black',59,'2023-02-05','NO',30),(24,'NZXT C750','NZXT','750W','gold','Modular','Black',129,'2022-08-25','NO',22),(25,'Asus TUF Gaming 750B','Asus','750W','bronze','Non-Modular','Black',79,'2021-01-20','NO',20),(26,'SilverStone ST60F-ES230','SilverStone','600W','silver','Semi-Modular','Black',69,'2022-05-10','NO',15),(27,'Gigabyte AORUS P850W','Gigabyte','850W','gold','Modular','White',159,'2023-06-20','NO',8),(28,'Corsair RM1000x','Corsair','1000W','gold','Modular','Black',179,'2022-12-15','NO',6),(29,'Seasonic Prime GX-750','Seasonic','750W','gold','Modular','Black',139,'2023-04-05','NO',10),(30,'EVGA 450 BR','EVGA','450W','bronze','Non-Modular','Black',39,'2021-09-10','NO',25);
/*!40000 ALTER TABLE `psu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ram`
--

DROP TABLE IF EXISTS `ram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ram` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `ddrtype` varchar(45) NOT NULL,
  `capacity` varchar(45) NOT NULL,
  `sticks` int NOT NULL,
  `color` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ram`
--

LOCK TABLES `ram` WRITE;
/*!40000 ALTER TABLE `ram` DISABLE KEYS */;
INSERT INTO `ram` VALUES (1,'Corsair Vengeance RGB Pro','Corsair','CMW16GX4M2C3200C16','DDR4','16GB',2,'Black',89,'2021-05-10','NO',25),(2,'G.Skill Trident Z RGB','G.Skill','F4-3200C16D-16GTZR','DDR4','16GB',2,'RGB',99,'2021-06-15','NO',20),(3,'Kingston Fury Beast','Kingston','KF432C16BB1/16','DDR4','16GB',1,'Black',45,'2022-01-05','NO',30),(4,'TeamGroup T-Force Delta RGB','TeamGroup','TF3D416G3200HC16CDC01','DDR4','16GB',2,'White',79,'2021-09-01','NO',18),(5,'ADATA XPG Spectrix D50','ADATA','AX4U320016G16A-ST50','DDR4','16GB',2,'Silver',69,'2022-03-12','NO',22),(6,'Crucial Ballistix','Crucial','BL2K8G32C16U4B','DDR4','16GB',2,'Black',65,'2021-08-25','NO',15),(7,'Corsair Dominator Platinum','Corsair','CMT16GX4M2C3200C16','DDR4','16GB',2,'Black',129,'2022-07-01','NO',10),(8,'G.Skill Ripjaws V','G.Skill','F4-3200C16D-16GVKB','DDR4','16GB',2,'Black',55,'2022-04-10','NO',25),(9,'Kingston Fury Renegade','Kingston','KF432C16RB1/16','DDR4','16GB',1,'White',49,'2021-11-18','NO',20),(10,'TeamGroup T-Force Xtreem ARGB','TeamGroup','TF13D416G3600HC14CDC01','DDR4','16GB',2,'RGB',119,'2022-05-20','NO',8),(11,'ADATA XPG Spectrix D60G','ADATA','AX4U360016G17ST60W','DDR4','16GB',2,'RGB',79,'2022-06-01','NO',18),(12,'Crucial RAM','Crucial','CT16G4DFD832A','DDR4','16GB',1,'Black',39,'2021-02-15','NO',35),(13,'Corsair Vengeance LPX','Corsair','CMK16GX4M2A2400C16','DDR4','16GB',2,'Black',65,'2022-08-05','NO',16),(14,'G.Skill Trident Z Neo','G.Skill','F4-3600C16D-16GTZNC','DDR4','16GB',2,'RGB',119,'2023-01-01','NO',10),(15,'Kingston HyperX Predator','Kingston','HX432C16PB3K2/16','DDR4','16GB',2,'Black',75,'2021-07-25','NO',28),(16,'TeamGroup T-Force Vulcan Z','TeamGroup','TLZRD416G3600HC18JDC01','DDR4','16GB',2,'Silver',59,'2021-09-15','NO',20),(17,'ADATA XPG Hunter','ADATA','AX4U320016G16-SR10','DDR4','16GB',1,'Black',55,'2022-10-01','NO',12),(18,'Crucial Ballistix MAX','Crucial','BLM16G39C3208U4B','DDR4','16GB',1,'Black',129,'2022-11-20','NO',6),(19,'Corsair Vengeance Pro SL','Corsair','CMH16GX4M2E3200C16','DDR4','16GB',2,'White',99,'2023-03-10','NO',15),(20,'G.Skill Trident Z Royal','G.Skill','F4-3600C16D-16GTRG','DDR4','16GB',2,'Gold',149,'2022-12-15','NO',8),(21,'Kingston Fury Beast RGB','Kingston','KF436C16BBA/16','DDR4','16GB',1,'RGB',55,'2023-04-01','NO',20),(22,'TeamGroup T-Force Cardea II','TeamGroup','TF10G16G32G3200C14CDC01','DDR4','16GB',2,'Black',79,'2022-06-20','NO',18),(23,'ADATA XPG Spectrix D70G','ADATA','AX4U320016G16-SW50','DDR4','16GB',2,'RGB',89,'2023-02-15','NO',22),(24,'Crucial Basic RAM','Crucial','CT8G4DFD832A','DDR4','8GB',1,'Black',25,'2021-12-01','NO',30),(25,'Corsair Dominator Platinum RGB','Corsair','CMT32GX4M4C3200C16','DDR4','32GB',4,'Black',299,'2023-05-01','NO',5),(26,'G.Skill Ripjaws S5','G.Skill','F4-4000C16D-32GS5K','DDR4','32GB',2,'Black',239,'2023-06-15','NO',10),(27,'Kingston Fury Impact','Kingston','KF436C16IB/16','DDR4','16GB',1,'Black',55,'2021-10-25','NO',25),(28,'TeamGroup T-Force Zeus','TeamGroup','TF13D416G3200HC16JDC01','DDR4','16GB',2,'Silver',69,'2022-09-10','NO',15),(29,'ADATA XPG Lancer','ADATA','AX4U360016G16A-SW50','DDR4','16GB',2,'RGB',89,'2023-07-20','NO',12);
/*!40000 ALTER TABLE `ram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ssd`
--

DROP TABLE IF EXISTS `ssd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ssd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `pciegen` varchar(45) NOT NULL,
  `interface` enum('sata','nvme','m.2') NOT NULL,
  `capacity` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `release_date` date NOT NULL,
  `offers` enum('NO','FO','SO','CO') NOT NULL,
  `qty` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ssd`
--

LOCK TABLES `ssd` WRITE;
/*!40000 ALTER TABLE `ssd` DISABLE KEYS */;
INSERT INTO `ssd` VALUES (1,'Samsung 980 Pro','Samsung','Gen4','nvme','1TB',199,'2022-02-01','SO',0),(2,'WD Black SN850','Western Digital','Gen4','nvme','2TB',399,'2022-03-05','FO',0),(3,'Crucial MX500','Crucial','N/A','sata','1TB',99,'2022-04-10','NO',0),(4,'Seagate FireCuda 520','Seagate','Gen4','nvme','500GB',129,'2022-05-15','CO',0),(5,'Samsung 970 EVO Plus','Samsung','Gen3','nvme','1TB',129,'2022-02-15','NO',20),(6,'WD Black SN850X','Western Digital','Gen4','nvme','2TB',239,'2023-01-10','NO',15),(7,'Crucial MX500','Crucial','N/A','sata','1TB',85,'2021-11-05','NO',25),(8,'Kingston A2000','Kingston','Gen3','nvme','500GB',49,'2022-05-20','NO',30),(9,'ADATA XPG SX8200 Pro','ADATA','Gen3','nvme','1TB',99,'2021-08-15','NO',18),(10,'Samsung 870 QVO','Samsung','N/A','sata','2TB',179,'2022-09-01','NO',10),(11,'WD Blue SN570','Western Digital','Gen3','nvme','1TB',59,'2022-12-10','NO',22),(12,'Seagate FireCuda 520','Seagate','Gen4','nvme','1TB',149,'2023-03-01','NO',12),(13,'Crucial P5 Plus','Crucial','Gen4','nvme','1TB',109,'2023-06-15','NO',18),(14,'Kingston KC600','Kingston','N/A','sata','1TB',75,'2022-04-05','NO',15),(15,'ADATA SU800','ADATA','N/A','sata','512GB',49,'2021-09-12','NO',28),(16,'Samsung 980 Pro','Samsung','Gen4','nvme','2TB',249,'2023-07-01','NO',10);
/*!40000 ALTER TABLE `ssd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Abhineet','Chaudhary','admin@titanrigs.com','$2a$10$hj6tIW/ZomMhH0MD9J9ec.Z6FdNiRs7KIK6H4v1NWZIwwsm1tD58a','admin'),(2,'ABHINEET','CHAUDHARY','abhineet.official@gmail.com','$2a$10$g8VX.ihyVHlADbGDcGmZS.c0pVhnwTWKH89uFmLgQ1r2Whm9FE7pW','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-14 19:59:13


CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
