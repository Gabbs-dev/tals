-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.39 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tals
CREATE DATABASE IF NOT EXISTS `tals` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tals`;

-- Volcando estructura para tabla tals.camaras
CREATE TABLE IF NOT EXISTS `camaras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ubicacion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `posicion_x_inicio` float DEFAULT NULL,
  `posicion_x_cierre` float DEFAULT NULL,
  `posicion_y_inicio` float DEFAULT NULL,
  `posicion_y_cierre` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.camaras_has_evento
CREATE TABLE IF NOT EXISTS `camaras_has_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `camaras_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`id`,`camaras_id`,`evento_id`),
  KEY `fk_camaras_has_evento_evento1_idx` (`evento_id`),
  KEY `fk_camaras_has_evento_camaras_idx` (`camaras_id`),
  CONSTRAINT `fk_camaras_has_evento_camaras` FOREIGN KEY (`camaras_id`) REFERENCES `camaras` (`id`),
  CONSTRAINT `fk_camaras_has_evento_evento1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.evento
CREATE TABLE IF NOT EXISTS `evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_evento` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.luminaria
CREATE TABLE IF NOT EXISTS `luminaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `luz1` int DEFAULT NULL,
  `luz2` int DEFAULT NULL,
  `luz3` int DEFAULT NULL,
  `luz4` int DEFAULT NULL,
  `luz5` int DEFAULT NULL,
  `luz6` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4655 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.luminaria_has_evento
CREATE TABLE IF NOT EXISTS `luminaria_has_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `luminaria_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`id`,`luminaria_id`,`evento_id`),
  KEY `fk_luminaria_has_evento_evento1_idx` (`evento_id`),
  KEY `fk_luminaria_has_evento_luminaria1_idx` (`luminaria_id`),
  CONSTRAINT `fk_luminaria_has_evento_evento1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `fk_luminaria_has_evento_luminaria1` FOREIGN KEY (`luminaria_id`) REFERENCES `luminaria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitoreo_servicio_has_camaras
CREATE TABLE IF NOT EXISTS `monitoreo_servicio_has_camaras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monitorero_servicio_id` int NOT NULL,
  `monitorero_servicio_usuario_id` int NOT NULL,
  `camaras_id` int NOT NULL,
  PRIMARY KEY (`id`,`monitorero_servicio_id`,`monitorero_servicio_usuario_id`,`camaras_id`),
  KEY `fk_monitorero_servicio_has_camaras_camaras1_idx` (`camaras_id`),
  KEY `fk_monitorero_servicio_has_camaras_monitorero_servicio1_idx` (`monitorero_servicio_id`,`monitorero_servicio_usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_camaras_camaras1` FOREIGN KEY (`camaras_id`) REFERENCES `camaras` (`id`),
  CONSTRAINT `fk_monitorero_servicio_has_camaras_monitorero_servicio1` FOREIGN KEY (`monitorero_servicio_id`, `monitorero_servicio_usuario_id`) REFERENCES `monitorero_servicio` (`id`, `usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitorero_servicio
CREATE TABLE IF NOT EXISTS `monitorero_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tipo_servicio` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`usuario_id`),
  UNIQUE KEY `usuario_id_UNIQUE` (`usuario_id`),
  KEY `fk_monitorero_servicio_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitorero_servicio_has_luminaria
CREATE TABLE IF NOT EXISTS `monitorero_servicio_has_luminaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monitorero_servicio_id` int NOT NULL,
  `monitorero_servicio_usuario_id` int NOT NULL,
  `luminaria_id` int NOT NULL,
  PRIMARY KEY (`id`,`monitorero_servicio_id`,`monitorero_servicio_usuario_id`,`luminaria_id`),
  KEY `fk_monitorero_servicio_has_luminaria_luminaria1_idx` (`luminaria_id`),
  KEY `fk_monitorero_servicio_has_luminaria_monitorero_servicio1_idx` (`monitorero_servicio_id`,`monitorero_servicio_usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_luminaria_luminaria1` FOREIGN KEY (`luminaria_id`) REFERENCES `luminaria` (`id`),
  CONSTRAINT `fk_monitorero_servicio_has_luminaria_monitorero_servicio1` FOREIGN KEY (`monitorero_servicio_id`, `monitorero_servicio_usuario_id`) REFERENCES `monitorero_servicio` (`id`, `usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitorero_servicio_has_regado
CREATE TABLE IF NOT EXISTS `monitorero_servicio_has_regado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monitorero_servicio_id` int NOT NULL,
  `monitorero_servicio_usuario_id` int NOT NULL,
  `regado_id` int NOT NULL,
  PRIMARY KEY (`id`,`monitorero_servicio_id`,`monitorero_servicio_usuario_id`,`regado_id`),
  KEY `fk_monitorero_servicio_has_regado_regado1_idx` (`regado_id`),
  KEY `fk_monitorero_servicio_has_regado_monitorero_servicio1_idx` (`monitorero_servicio_id`,`monitorero_servicio_usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_regado_monitorero_servicio1` FOREIGN KEY (`monitorero_servicio_id`, `monitorero_servicio_usuario_id`) REFERENCES `monitorero_servicio` (`id`, `usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_regado_regado1` FOREIGN KEY (`regado_id`) REFERENCES `regado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitorero_servicio_has_sensor_movimiento
CREATE TABLE IF NOT EXISTS `monitorero_servicio_has_sensor_movimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monitorero_servicio_id` int NOT NULL,
  `monitorero_servicio_usuario_id` int NOT NULL,
  `sensor_movimiento_id` int NOT NULL,
  PRIMARY KEY (`id`,`monitorero_servicio_id`,`monitorero_servicio_usuario_id`,`sensor_movimiento_id`),
  KEY `fk_monitorero_servicio_has_sensor_movimiento_sensor_movimie_idx` (`sensor_movimiento_id`),
  KEY `fk_monitorero_servicio_has_sensor_movimiento_monitorero_ser_idx` (`monitorero_servicio_id`,`monitorero_servicio_usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_sensor_movimiento_monitorero_servi1` FOREIGN KEY (`monitorero_servicio_id`, `monitorero_servicio_usuario_id`) REFERENCES `monitorero_servicio` (`id`, `usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_sensor_movimiento_sensor_movimiento1` FOREIGN KEY (`sensor_movimiento_id`) REFERENCES `sensor_movimiento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitorero_servicio_has_tanque_agua
CREATE TABLE IF NOT EXISTS `monitorero_servicio_has_tanque_agua` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monitorero_servicio_id` int NOT NULL,
  `monitorero_servicio_usuario_id` int NOT NULL,
  `tanque_agua_id` int NOT NULL,
  PRIMARY KEY (`id`,`monitorero_servicio_id`,`monitorero_servicio_usuario_id`,`tanque_agua_id`),
  KEY `fk_monitorero_servicio_has_tanque_agua_tanque_agua1_idx` (`tanque_agua_id`),
  KEY `fk_monitorero_servicio_has_tanque_agua_monitorero_servicio1_idx` (`monitorero_servicio_id`,`monitorero_servicio_usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_tanque_agua_monitorero_servicio1` FOREIGN KEY (`monitorero_servicio_id`, `monitorero_servicio_usuario_id`) REFERENCES `monitorero_servicio` (`id`, `usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_tanque_agua_tanque_agua1` FOREIGN KEY (`tanque_agua_id`) REFERENCES `tanque_agua` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.monitorero_servicio_has_termostato
CREATE TABLE IF NOT EXISTS `monitorero_servicio_has_termostato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `monitorero_servicio_id` int NOT NULL,
  `monitorero_servicio_usuario_id` int NOT NULL,
  `termostato_id` int NOT NULL,
  PRIMARY KEY (`id`,`monitorero_servicio_id`,`monitorero_servicio_usuario_id`,`termostato_id`),
  KEY `fk_monitorero_servicio_has_termostato_termostato1_idx` (`termostato_id`),
  KEY `fk_monitorero_servicio_has_termostato_monitorero_servicio1_idx` (`monitorero_servicio_id`,`monitorero_servicio_usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_termostato_monitorero_servicio1` FOREIGN KEY (`monitorero_servicio_id`, `monitorero_servicio_usuario_id`) REFERENCES `monitorero_servicio` (`id`, `usuario_id`),
  CONSTRAINT `fk_monitorero_servicio_has_termostato_termostato1` FOREIGN KEY (`termostato_id`) REFERENCES `termostato` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.regado
CREATE TABLE IF NOT EXISTS `regado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) DEFAULT NULL,
  `nivel_humedad` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.regado_has_evento
CREATE TABLE IF NOT EXISTS `regado_has_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regado_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`id`,`regado_id`,`evento_id`),
  KEY `fk_regado_has_evento_evento1_idx` (`evento_id`),
  KEY `fk_regado_has_evento_regado1_idx` (`regado_id`),
  CONSTRAINT `fk_regado_has_evento_evento1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `fk_regado_has_evento_regado1` FOREIGN KEY (`regado_id`) REFERENCES `regado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.sensor_movimiento
CREATE TABLE IF NOT EXISTS `sensor_movimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4655 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.sensor_movimiento_has_evento
CREATE TABLE IF NOT EXISTS `sensor_movimiento_has_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sensor_movimiento_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`id`,`sensor_movimiento_id`,`evento_id`),
  KEY `fk_sensor_movimiento_has_evento_evento1_idx` (`evento_id`),
  KEY `fk_sensor_movimiento_has_evento_sensor_movimiento1_idx` (`sensor_movimiento_id`),
  CONSTRAINT `fk_sensor_movimiento_has_evento_evento1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `fk_sensor_movimiento_has_evento_sensor_movimiento1` FOREIGN KEY (`sensor_movimiento_id`) REFERENCES `sensor_movimiento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.tanque_agua
CREATE TABLE IF NOT EXISTS `tanque_agua` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivel_agua` int DEFAULT NULL,
  `nivel_max` int DEFAULT NULL,
  `nivel_min` int DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4655 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.tanque_agua_has_evento
CREATE TABLE IF NOT EXISTS `tanque_agua_has_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tanque_agua_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`id`,`tanque_agua_id`,`evento_id`),
  KEY `fk_tanque_agua_has_evento_evento1_idx` (`evento_id`),
  KEY `fk_tanque_agua_has_evento_tanque_agua1_idx` (`tanque_agua_id`),
  CONSTRAINT `fk_tanque_agua_has_evento_evento1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `fk_tanque_agua_has_evento_tanque_agua1` FOREIGN KEY (`tanque_agua_id`) REFERENCES `tanque_agua` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.tanque_agua_niveles
CREATE TABLE IF NOT EXISTS `tanque_agua_niveles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivel_maximo` int DEFAULT NULL,
  `nivel_minimo` int DEFAULT NULL,
  `altura` float DEFAULT NULL,
  `diametro` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.temporizador_luminaria
CREATE TABLE IF NOT EXISTS `temporizador_luminaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dispositivo` varchar(50) DEFAULT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_cierre` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.temporizador_regado
CREATE TABLE IF NOT EXISTS `temporizador_regado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dispositivo` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_cierre` time DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.termostato
CREATE TABLE IF NOT EXISTS `termostato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `temperatura` decimal(20,2) DEFAULT NULL,
  `humedad` int DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4655 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.termostato_has_evento
CREATE TABLE IF NOT EXISTS `termostato_has_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `termostato_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`id`,`termostato_id`,`evento_id`),
  KEY `fk_termostato_has_evento_evento1_idx` (`evento_id`),
  KEY `fk_termostato_has_evento_termostato1_idx` (`termostato_id`),
  CONSTRAINT `fk_termostato_has_evento_evento1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `fk_termostato_has_evento_termostato1` FOREIGN KEY (`termostato_id`) REFERENCES `termostato` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.termostato_niveles
CREATE TABLE IF NOT EXISTS `termostato_niveles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dispositivo` varchar(50) DEFAULT NULL,
  `temperatura_deseada` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tals.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
