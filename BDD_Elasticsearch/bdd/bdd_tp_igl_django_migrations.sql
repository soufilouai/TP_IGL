-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bdd_tp_igl
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-01-07 21:10:24.705467'),(2,'contenttypes','0002_remove_content_type_name','2024-01-07 21:10:24.839109'),(3,'auth','0001_initial','2024-01-07 21:10:25.438507'),(4,'auth','0002_alter_permission_name_max_length','2024-01-07 21:10:25.598079'),(5,'auth','0003_alter_user_email_max_length','2024-01-07 21:10:25.607056'),(6,'auth','0004_alter_user_username_opts','2024-01-07 21:10:25.617028'),(7,'auth','0005_alter_user_last_login_null','2024-01-07 21:10:25.638971'),(8,'auth','0006_require_contenttypes_0002','2024-01-07 21:10:25.642959'),(9,'auth','0007_alter_validators_add_error_messages','2024-01-07 21:10:25.660911'),(10,'auth','0008_alter_user_username_max_length','2024-01-07 21:10:25.671944'),(11,'auth','0009_alter_user_last_name_max_length','2024-01-07 21:10:25.681855'),(12,'auth','0010_alter_group_name_max_length','2024-01-07 21:10:25.712781'),(13,'auth','0011_update_proxy_permissions','2024-01-07 21:10:25.720752'),(14,'auth','0012_alter_user_first_name_max_length','2024-01-07 21:10:25.732718'),(15,'articles','0001_initial','2024-01-07 21:10:25.778597'),(16,'users','0001_initial','2024-01-07 21:10:26.476729'),(17,'admin','0001_initial','2024-01-07 21:10:26.694147'),(18,'admin','0002_logentry_remove_auto_add','2024-01-07 21:10:26.709107'),(19,'admin','0003_logentry_add_action_flag_choices','2024-01-07 21:10:26.724068'),(20,'articles','0002_author_article_author','2024-01-07 21:10:27.121006'),(21,'articles','0003_alter_article_author','2024-01-07 21:10:27.137959'),(22,'authtoken','0001_initial','2024-01-07 21:10:27.593739'),(23,'authtoken','0002_auto_20160226_1747','2024-01-07 21:10:27.651586'),(24,'authtoken','0003_tokenproxy','2024-01-07 21:10:27.656580'),(25,'sessions','0001_initial','2024-01-07 21:10:27.747330'),(26,'users','0002_alter_customuser_managers','2024-01-07 21:10:27.763286'),(27,'users','0003_alter_customuser_username','2024-01-07 21:10:27.830109'),(28,'users','0004_alter_customuser_managers','2024-01-07 21:10:27.844078'),(29,'users','0005_customuser_is_staff_alter_customuser_is_superuser','2024-01-07 21:10:27.956768'),(30,'users','0006_alter_customuser_favorite_articles','2024-01-07 21:10:27.974721'),(31,'users','0007_remove_customuser_is_admin','2024-01-07 21:10:28.042540'),(32,'users','0008_alter_customuser_groups_and_more','2024-01-07 21:10:28.070465'),(33,'articles','0004_alter_article_content','2024-02-01 20:07:16.997720'),(34,'articles','0005_alter_article_content','2024-02-01 23:16:44.785740'),(35,'articles','0006_alter_article_date','2024-02-01 23:16:44.799757'),(36,'articles','0007_alter_article_content','2024-02-01 23:16:44.846420');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-03  4:13:17
