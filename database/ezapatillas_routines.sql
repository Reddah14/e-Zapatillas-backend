-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: ezapatillas
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Temporary view structure for view `getzapatillascustomer`
--

DROP TABLE IF EXISTS `getzapatillascustomer`;
/*!50001 DROP VIEW IF EXISTS `getzapatillascustomer`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `getzapatillascustomer` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `descripcion`,
 1 AS `idCategoria`,
 1 AS `precio`,
 1 AS `idMarca`,
 1 AS `idColor`,
 1 AS `Imagen`,
 1 AS `Activo`,
 1 AS `Marca`,
 1 AS `Categoria`,
 1 AS `Color`,
 1 AS `esMujer`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `getzapatillascustomer`
--

/*!50001 DROP VIEW IF EXISTS `getzapatillascustomer`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `getzapatillascustomer` AS select `art`.`id` AS `id`,`art`.`nombre` AS `nombre`,`art`.`descripcion` AS `descripcion`,`art`.`idCategoria` AS `idCategoria`,`art`.`precio` AS `precio`,`art`.`idMarca` AS `idMarca`,`art`.`idColor` AS `idColor`,`art`.`Imagen` AS `Imagen`,`art`.`Activo` AS `Activo`,`marc`.`nombre` AS `Marca`,`cat`.`nombre` AS `Categoria`,`col`.`nombre` AS `Color`,`art`.`esMujer` AS `esMujer` from (((`articulo` `art` join `marcas` `marc` on((`art`.`idMarca` = `marc`.`id`))) join `categorias` `cat` on((`art`.`idCategoria` = `cat`.`id`))) join `colores` `col` on((`art`.`idColor` = `col`.`id`))) where (`art`.`Activo` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-19 14:04:03
