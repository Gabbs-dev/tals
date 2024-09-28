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

-- Volcando estructura para tabla tals.api_evento
CREATE TABLE IF NOT EXISTS `api_evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_evento` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.api_evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.api_usuario
CREATE TABLE IF NOT EXISTS `api_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.api_usuario: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.auth_group
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.auth_group: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.auth_group_permissions
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.auth_group_permissions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.auth_permission
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.auth_permission: ~108 rows (aproximadamente)
INSERT IGNORE INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add log entry', 1, 'add_logentry'),
	(2, 'Can change log entry', 1, 'change_logentry'),
	(3, 'Can delete log entry', 1, 'delete_logentry'),
	(4, 'Can view log entry', 1, 'view_logentry'),
	(5, 'Can add permission', 2, 'add_permission'),
	(6, 'Can change permission', 2, 'change_permission'),
	(7, 'Can delete permission', 2, 'delete_permission'),
	(8, 'Can view permission', 2, 'view_permission'),
	(9, 'Can add group', 3, 'add_group'),
	(10, 'Can change group', 3, 'change_group'),
	(11, 'Can delete group', 3, 'delete_group'),
	(12, 'Can view group', 3, 'view_group'),
	(13, 'Can add user', 4, 'add_user'),
	(14, 'Can change user', 4, 'change_user'),
	(15, 'Can delete user', 4, 'delete_user'),
	(16, 'Can view user', 4, 'view_user'),
	(17, 'Can add content type', 5, 'add_contenttype'),
	(18, 'Can change content type', 5, 'change_contenttype'),
	(19, 'Can delete content type', 5, 'delete_contenttype'),
	(20, 'Can view content type', 5, 'view_contenttype'),
	(21, 'Can add session', 6, 'add_session'),
	(22, 'Can change session', 6, 'change_session'),
	(23, 'Can delete session', 6, 'delete_session'),
	(24, 'Can view session', 6, 'view_session'),
	(25, 'Can add usuario', 7, 'add_usuario'),
	(26, 'Can change usuario', 7, 'change_usuario'),
	(27, 'Can delete usuario', 7, 'delete_usuario'),
	(28, 'Can view usuario', 7, 'view_usuario'),
	(29, 'Can add evento', 8, 'add_evento'),
	(30, 'Can change evento', 8, 'change_evento'),
	(31, 'Can delete evento', 8, 'delete_evento'),
	(32, 'Can view evento', 8, 'view_evento'),
	(33, 'Can add camaras', 9, 'add_camaras'),
	(34, 'Can change camaras', 9, 'change_camaras'),
	(35, 'Can delete camaras', 9, 'delete_camaras'),
	(36, 'Can view camaras', 9, 'view_camaras'),
	(37, 'Can add camaras has evento', 10, 'add_camarashasevento'),
	(38, 'Can change camaras has evento', 10, 'change_camarashasevento'),
	(39, 'Can delete camaras has evento', 10, 'delete_camarashasevento'),
	(40, 'Can view camaras has evento', 10, 'view_camarashasevento'),
	(41, 'Can add luminaria', 11, 'add_luminaria'),
	(42, 'Can change luminaria', 11, 'change_luminaria'),
	(43, 'Can delete luminaria', 11, 'delete_luminaria'),
	(44, 'Can view luminaria', 11, 'view_luminaria'),
	(45, 'Can add luminaria has evento', 12, 'add_luminariahasevento'),
	(46, 'Can change luminaria has evento', 12, 'change_luminariahasevento'),
	(47, 'Can delete luminaria has evento', 12, 'delete_luminariahasevento'),
	(48, 'Can view luminaria has evento', 12, 'view_luminariahasevento'),
	(49, 'Can add monitorero servicio', 13, 'add_monitoreroservicio'),
	(50, 'Can change monitorero servicio', 13, 'change_monitoreroservicio'),
	(51, 'Can delete monitorero servicio', 13, 'delete_monitoreroservicio'),
	(52, 'Can view monitorero servicio', 13, 'view_monitoreroservicio'),
	(53, 'Can add monitorero servicio has luminaria', 14, 'add_monitoreroserviciohasluminaria'),
	(54, 'Can change monitorero servicio has luminaria', 14, 'change_monitoreroserviciohasluminaria'),
	(55, 'Can delete monitorero servicio has luminaria', 14, 'delete_monitoreroserviciohasluminaria'),
	(56, 'Can view monitorero servicio has luminaria', 14, 'view_monitoreroserviciohasluminaria'),
	(57, 'Can add monitorero servicio has regado', 15, 'add_monitoreroserviciohasregado'),
	(58, 'Can change monitorero servicio has regado', 15, 'change_monitoreroserviciohasregado'),
	(59, 'Can delete monitorero servicio has regado', 15, 'delete_monitoreroserviciohasregado'),
	(60, 'Can view monitorero servicio has regado', 15, 'view_monitoreroserviciohasregado'),
	(61, 'Can add monitorero servicio has sensor movimiento', 16, 'add_monitoreroserviciohassensormovimiento'),
	(62, 'Can change monitorero servicio has sensor movimiento', 16, 'change_monitoreroserviciohassensormovimiento'),
	(63, 'Can delete monitorero servicio has sensor movimiento', 16, 'delete_monitoreroserviciohassensormovimiento'),
	(64, 'Can view monitorero servicio has sensor movimiento', 16, 'view_monitoreroserviciohassensormovimiento'),
	(65, 'Can add monitorero servicio has tanque agua', 17, 'add_monitoreroserviciohastanqueagua'),
	(66, 'Can change monitorero servicio has tanque agua', 17, 'change_monitoreroserviciohastanqueagua'),
	(67, 'Can delete monitorero servicio has tanque agua', 17, 'delete_monitoreroserviciohastanqueagua'),
	(68, 'Can view monitorero servicio has tanque agua', 17, 'view_monitoreroserviciohastanqueagua'),
	(69, 'Can add monitorero servicio has termostato', 18, 'add_monitoreroserviciohastermostato'),
	(70, 'Can change monitorero servicio has termostato', 18, 'change_monitoreroserviciohastermostato'),
	(71, 'Can delete monitorero servicio has termostato', 18, 'delete_monitoreroserviciohastermostato'),
	(72, 'Can view monitorero servicio has termostato', 18, 'view_monitoreroserviciohastermostato'),
	(73, 'Can add regado', 19, 'add_regado'),
	(74, 'Can change regado', 19, 'change_regado'),
	(75, 'Can delete regado', 19, 'delete_regado'),
	(76, 'Can view regado', 19, 'view_regado'),
	(77, 'Can add regado has evento', 20, 'add_regadohasevento'),
	(78, 'Can change regado has evento', 20, 'change_regadohasevento'),
	(79, 'Can delete regado has evento', 20, 'delete_regadohasevento'),
	(80, 'Can view regado has evento', 20, 'view_regadohasevento'),
	(81, 'Can add sensor movimiento', 21, 'add_sensormovimiento'),
	(82, 'Can change sensor movimiento', 21, 'change_sensormovimiento'),
	(83, 'Can delete sensor movimiento', 21, 'delete_sensormovimiento'),
	(84, 'Can view sensor movimiento', 21, 'view_sensormovimiento'),
	(85, 'Can add sensor movimiento has evento', 22, 'add_sensormovimientohasevento'),
	(86, 'Can change sensor movimiento has evento', 22, 'change_sensormovimientohasevento'),
	(87, 'Can delete sensor movimiento has evento', 22, 'delete_sensormovimientohasevento'),
	(88, 'Can view sensor movimiento has evento', 22, 'view_sensormovimientohasevento'),
	(89, 'Can add tanque agua', 23, 'add_tanqueagua'),
	(90, 'Can change tanque agua', 23, 'change_tanqueagua'),
	(91, 'Can delete tanque agua', 23, 'delete_tanqueagua'),
	(92, 'Can view tanque agua', 23, 'view_tanqueagua'),
	(93, 'Can add tanque agua has evento', 24, 'add_tanqueaguahasevento'),
	(94, 'Can change tanque agua has evento', 24, 'change_tanqueaguahasevento'),
	(95, 'Can delete tanque agua has evento', 24, 'delete_tanqueaguahasevento'),
	(96, 'Can view tanque agua has evento', 24, 'view_tanqueaguahasevento'),
	(97, 'Can add termostato', 25, 'add_termostato'),
	(98, 'Can change termostato', 25, 'change_termostato'),
	(99, 'Can delete termostato', 25, 'delete_termostato'),
	(100, 'Can view termostato', 25, 'view_termostato'),
	(101, 'Can add termostato has evento', 26, 'add_termostatohasevento'),
	(102, 'Can change termostato has evento', 26, 'change_termostatohasevento'),
	(103, 'Can delete termostato has evento', 26, 'delete_termostatohasevento'),
	(104, 'Can view termostato has evento', 26, 'view_termostatohasevento'),
	(105, 'Can add monitoreo servicio has camaras', 27, 'add_monitoreoserviciohascamaras'),
	(106, 'Can change monitoreo servicio has camaras', 27, 'change_monitoreoserviciohascamaras'),
	(107, 'Can delete monitoreo servicio has camaras', 27, 'delete_monitoreoserviciohascamaras'),
	(108, 'Can view monitoreo servicio has camaras', 27, 'view_monitoreoserviciohascamaras');

-- Volcando estructura para tabla tals.auth_user
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.auth_user: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.auth_user_groups
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.auth_user_groups: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.auth_user_user_permissions
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.auth_user_user_permissions: ~0 rows (aproximadamente)

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.camaras: ~1 rows (aproximadamente)
INSERT IGNORE INTO `camaras` (`id`, `ubicacion`, `estado`, `posicion_x_inicio`, `posicion_x_cierre`, `posicion_y_inicio`, `posicion_y_cierre`) VALUES
	(1, 'Sala principal', 'activo', 20, 70, 45, 45);

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

-- Volcando datos para la tabla tals.camaras_has_evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.django_admin_log
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.django_admin_log: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.django_content_type
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.django_content_type: ~27 rows (aproximadamente)
INSERT IGNORE INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
	(1, 'admin', 'logentry'),
	(9, 'api', 'camaras'),
	(10, 'api', 'camarashasevento'),
	(8, 'api', 'evento'),
	(11, 'api', 'luminaria'),
	(12, 'api', 'luminariahasevento'),
	(27, 'api', 'monitoreoserviciohascamaras'),
	(13, 'api', 'monitoreroservicio'),
	(14, 'api', 'monitoreroserviciohasluminaria'),
	(15, 'api', 'monitoreroserviciohasregado'),
	(16, 'api', 'monitoreroserviciohassensormovimiento'),
	(17, 'api', 'monitoreroserviciohastanqueagua'),
	(18, 'api', 'monitoreroserviciohastermostato'),
	(19, 'api', 'regado'),
	(20, 'api', 'regadohasevento'),
	(21, 'api', 'sensormovimiento'),
	(22, 'api', 'sensormovimientohasevento'),
	(23, 'api', 'tanqueagua'),
	(24, 'api', 'tanqueaguahasevento'),
	(25, 'api', 'termostato'),
	(26, 'api', 'termostatohasevento'),
	(7, 'api', 'usuario'),
	(3, 'auth', 'group'),
	(2, 'auth', 'permission'),
	(4, 'auth', 'user'),
	(5, 'contenttypes', 'contenttype'),
	(6, 'sessions', 'session');

-- Volcando estructura para tabla tals.django_migrations
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.django_migrations: ~24 rows (aproximadamente)
INSERT IGNORE INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
	(1, 'contenttypes', '0001_initial', '2024-09-22 12:33:23.635196'),
	(2, 'auth', '0001_initial', '2024-09-22 12:33:50.755547'),
	(3, 'admin', '0001_initial', '2024-09-22 12:33:56.921639'),
	(4, 'admin', '0002_logentry_remove_auto_add', '2024-09-22 12:33:57.101765'),
	(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-09-22 12:33:57.309898'),
	(6, 'api', '0001_initial', '2024-09-22 12:33:59.071223'),
	(7, 'api', '0002_alter_usuario_id', '2024-09-22 12:34:00.686294'),
	(8, 'api', '0003_evento', '2024-09-22 12:34:01.860074'),
	(9, 'api', '0004_camaras_camarashasevento_luminaria_and_more', '2024-09-22 12:34:02.087226'),
	(10, 'api', '0005_alter_evento_table_alter_usuario_table', '2024-09-22 12:34:02.425459'),
	(11, 'api', '0006_monitoreoserviciohascamaras_and_more', '2024-09-22 12:34:02.700639'),
	(12, 'contenttypes', '0002_remove_content_type_name', '2024-09-22 12:34:05.671667'),
	(13, 'auth', '0002_alter_permission_name_max_length', '2024-09-22 12:34:08.091278'),
	(14, 'auth', '0003_alter_user_email_max_length', '2024-09-22 12:34:10.730035'),
	(15, 'auth', '0004_alter_user_username_opts', '2024-09-22 12:34:10.824095'),
	(16, 'auth', '0005_alter_user_last_login_null', '2024-09-22 12:34:13.549910'),
	(17, 'auth', '0006_require_contenttypes_0002', '2024-09-22 12:34:13.650980'),
	(18, 'auth', '0007_alter_validators_add_error_messages', '2024-09-22 12:34:13.791077'),
	(19, 'auth', '0008_alter_user_username_max_length', '2024-09-22 12:34:16.738041'),
	(20, 'auth', '0009_alter_user_last_name_max_length', '2024-09-22 12:34:19.153669'),
	(21, 'auth', '0010_alter_group_name_max_length', '2024-09-22 12:34:22.044601'),
	(22, 'auth', '0011_update_proxy_permissions', '2024-09-22 12:34:22.302769'),
	(23, 'auth', '0012_alter_user_first_name_max_length', '2024-09-22 12:34:24.981552'),
	(24, 'sessions', '0001_initial', '2024-09-22 12:34:27.668348');

-- Volcando estructura para tabla tals.django_session
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.django_session: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.evento
CREATE TABLE IF NOT EXISTS `evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_evento` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.luminaria
CREATE TABLE IF NOT EXISTS `luminaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `luz1` int DEFAULT NULL,
  `luz2` int DEFAULT NULL,
  `auto_encendido` time DEFAULT NULL,
  `auto_apagado` time DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.luminaria: ~70 rows (aproximadamente)
INSERT IGNORE INTO `luminaria` (`id`, `luz1`, `luz2`, `auto_encendido`, `auto_apagado`, `date`) VALUES
	(1, 0, 0, NULL, NULL, '2024-09-22 17:11:26'),
	(2, 0, 0, NULL, NULL, '2024-09-22 17:11:27'),
	(3, 0, 0, NULL, NULL, '2024-09-22 17:11:29'),
	(4, 0, 0, NULL, NULL, '2024-09-22 17:11:31'),
	(5, 0, 0, NULL, NULL, '2024-09-22 17:11:33'),
	(6, 0, 0, NULL, NULL, '2024-09-22 17:11:37'),
	(7, 0, 0, NULL, NULL, '2024-09-22 17:11:40'),
	(8, 0, 0, NULL, NULL, '2024-09-22 17:11:44'),
	(9, 0, 0, NULL, NULL, '2024-09-22 17:11:46'),
	(10, 0, 0, NULL, NULL, '2024-09-22 17:11:49'),
	(11, 0, 0, NULL, NULL, '2024-09-22 17:11:52'),
	(12, 0, 0, NULL, NULL, '2024-09-22 17:11:55'),
	(13, 0, 0, NULL, NULL, '2024-09-22 17:11:59'),
	(14, 0, 0, NULL, NULL, '2024-09-22 17:12:03'),
	(15, 0, 0, NULL, NULL, '2024-09-22 17:12:06'),
	(16, 0, 0, NULL, NULL, '2024-09-22 17:12:08'),
	(17, 0, 0, NULL, NULL, '2024-09-22 17:12:11'),
	(18, 0, 0, NULL, NULL, '2024-09-22 17:12:13'),
	(19, 0, 0, NULL, NULL, '2024-09-22 17:12:15'),
	(20, 0, 0, NULL, NULL, '2024-09-22 17:12:16'),
	(21, 0, 0, NULL, NULL, '2024-09-22 17:12:18'),
	(22, 0, 0, NULL, NULL, '2024-09-22 17:12:21'),
	(23, 0, 0, NULL, NULL, '2024-09-22 17:12:26'),
	(24, 0, 0, NULL, NULL, '2024-09-22 17:12:28'),
	(25, 0, 0, NULL, NULL, '2024-09-22 17:12:30'),
	(26, 0, 0, NULL, NULL, '2024-09-22 17:12:32'),
	(27, 0, 0, NULL, NULL, '2024-09-22 17:12:34'),
	(28, 0, 0, NULL, NULL, '2024-09-22 17:12:35'),
	(29, 0, 0, NULL, NULL, '2024-09-22 17:12:37'),
	(30, 0, 0, NULL, NULL, '2024-09-22 17:12:39'),
	(31, 0, 0, NULL, NULL, '2024-09-22 17:12:41'),
	(32, 0, 0, NULL, NULL, '2024-09-22 17:12:42'),
	(33, 0, 0, NULL, NULL, '2024-09-22 17:12:43'),
	(34, 0, 0, NULL, NULL, '2024-09-22 17:12:45'),
	(35, 0, 0, NULL, NULL, '2024-09-22 17:12:46'),
	(36, 0, 0, NULL, NULL, '2024-09-22 17:12:48'),
	(37, 0, 0, NULL, NULL, '2024-09-22 17:12:49'),
	(38, 0, 0, NULL, NULL, '2024-09-22 17:12:51'),
	(39, 0, 0, NULL, NULL, '2024-09-22 17:12:52'),
	(40, 0, 0, NULL, NULL, '2024-09-22 17:12:53'),
	(41, 0, 0, NULL, NULL, '2024-09-22 17:12:55'),
	(42, 0, 0, NULL, NULL, '2024-09-22 17:12:57'),
	(43, 0, 0, NULL, NULL, '2024-09-22 17:12:58'),
	(44, 0, 0, NULL, NULL, '2024-09-22 17:13:00'),
	(45, 0, 0, NULL, NULL, '2024-09-22 17:13:01'),
	(46, 0, 0, NULL, NULL, '2024-09-22 17:13:02'),
	(47, 0, 0, NULL, NULL, '2024-09-22 17:13:04'),
	(48, 0, 0, NULL, NULL, '2024-09-22 17:13:05'),
	(49, 0, 0, NULL, NULL, '2024-09-22 17:13:06'),
	(50, 0, 0, NULL, NULL, '2024-09-22 17:13:08'),
	(51, 0, 0, NULL, NULL, '2024-09-22 17:13:10'),
	(52, 0, 0, NULL, NULL, '2024-09-22 17:13:11'),
	(53, 0, 0, NULL, NULL, '2024-09-22 17:13:13'),
	(54, 0, 0, NULL, NULL, '2024-09-22 17:13:15'),
	(55, 0, 0, NULL, NULL, '2024-09-22 17:13:17'),
	(56, 0, 0, NULL, NULL, '2024-09-22 17:13:18'),
	(57, 0, 0, NULL, NULL, '2024-09-22 17:13:19'),
	(58, 0, 0, NULL, NULL, '2024-09-22 17:13:20'),
	(59, 0, 0, NULL, NULL, '2024-09-22 17:13:22'),
	(60, 0, 0, NULL, NULL, '2024-09-22 17:13:23'),
	(61, 0, 0, NULL, NULL, '2024-09-22 17:13:24'),
	(62, 0, 0, NULL, NULL, '2024-09-22 17:13:25'),
	(63, 0, 0, NULL, NULL, '2024-09-22 17:13:26'),
	(64, 0, 0, NULL, NULL, '2024-09-22 17:13:27'),
	(65, 0, 0, NULL, NULL, '2024-09-22 17:13:30'),
	(66, 0, 0, NULL, NULL, '2024-09-22 17:13:33'),
	(67, 0, 0, NULL, NULL, '2024-09-22 17:13:38'),
	(68, 0, 0, NULL, NULL, '2024-09-22 17:13:42'),
	(69, 0, 0, NULL, NULL, '2024-09-22 17:13:44'),
	(70, 0, 0, NULL, NULL, '2024-09-22 17:13:47');

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

-- Volcando datos para la tabla tals.luminaria_has_evento: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.monitoreo_servicio_has_camaras: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.monitorero_servicio: ~1 rows (aproximadamente)
INSERT IGNORE INTO `monitorero_servicio` (`id`, `usuario_id`, `estado`, `tipo_servicio`) VALUES
	(1, 1, 'activo', 'Camaras');

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

-- Volcando datos para la tabla tals.monitorero_servicio_has_luminaria: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.monitorero_servicio_has_regado: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.monitorero_servicio_has_sensor_movimiento: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.monitorero_servicio_has_tanque_agua: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.monitorero_servicio_has_termostato: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.regado
CREATE TABLE IF NOT EXISTS `regado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) DEFAULT NULL,
  `nivel_humedad` int DEFAULT NULL,
  `auto_riego_inicio` time DEFAULT NULL,
  `auto_riego_cierre` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.regado: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla tals.regado_has_evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.sensor_movimiento
CREATE TABLE IF NOT EXISTS `sensor_movimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.sensor_movimiento: ~71 rows (aproximadamente)
INSERT IGNORE INTO `sensor_movimiento` (`id`, `estado`, `date`) VALUES
	(1, 0, '2024-09-22 17:11:25'),
	(2, 0, '2024-09-22 17:11:27'),
	(3, 0, '2024-09-22 17:11:27'),
	(4, 0, '2024-09-22 17:11:30'),
	(5, 0, '2024-09-22 17:11:32'),
	(6, 0, '2024-09-22 17:11:35'),
	(7, 0, '2024-09-22 17:11:39'),
	(8, 0, '2024-09-22 17:11:42'),
	(9, 0, '2024-09-22 17:11:45'),
	(10, 0, '2024-09-22 17:11:47'),
	(11, 0, '2024-09-22 17:11:50'),
	(12, 0, '2024-09-22 17:11:53'),
	(13, 0, '2024-09-22 17:11:57'),
	(14, 0, '2024-09-22 17:12:01'),
	(15, 0, '2024-09-22 17:12:04'),
	(16, 0, '2024-09-22 17:12:07'),
	(17, 0, '2024-09-22 17:12:09'),
	(18, 0, '2024-09-22 17:12:12'),
	(19, 0, '2024-09-22 17:12:14'),
	(20, 0, '2024-09-22 17:12:15'),
	(21, 0, '2024-09-22 17:12:17'),
	(22, 0, '2024-09-22 17:12:19'),
	(23, 0, '2024-09-22 17:12:23'),
	(24, 0, '2024-09-22 17:12:27'),
	(25, 0, '2024-09-22 17:12:29'),
	(26, 0, '2024-09-22 17:12:31'),
	(27, 0, '2024-09-22 17:12:33'),
	(28, 0, '2024-09-22 17:12:34'),
	(29, 0, '2024-09-22 17:12:36'),
	(30, 0, '2024-09-22 17:12:38'),
	(31, 0, '2024-09-22 17:12:40'),
	(32, 0, '2024-09-22 17:12:41'),
	(33, 0, '2024-09-22 17:12:43'),
	(34, 0, '2024-09-22 17:12:44'),
	(35, 0, '2024-09-22 17:12:46'),
	(36, 0, '2024-09-22 17:12:47'),
	(37, 0, '2024-09-22 17:12:49'),
	(38, 0, '2024-09-22 17:12:50'),
	(39, 0, '2024-09-22 17:12:51'),
	(40, 0, '2024-09-22 17:12:53'),
	(41, 0, '2024-09-22 17:12:54'),
	(42, 0, '2024-09-22 17:12:56'),
	(43, 0, '2024-09-22 17:12:58'),
	(44, 0, '2024-09-22 17:12:59'),
	(45, 0, '2024-09-22 17:13:00'),
	(46, 0, '2024-09-22 17:13:02'),
	(47, 0, '2024-09-22 17:13:03'),
	(48, 0, '2024-09-22 17:13:04'),
	(49, 0, '2024-09-22 17:13:06'),
	(50, 0, '2024-09-22 17:13:07'),
	(51, 0, '2024-09-22 17:13:09'),
	(52, 0, '2024-09-22 17:13:11'),
	(53, 0, '2024-09-22 17:13:12'),
	(54, 0, '2024-09-22 17:13:14'),
	(55, 0, '2024-09-22 17:13:16'),
	(56, 0, '2024-09-22 17:13:17'),
	(57, 0, '2024-09-22 17:13:18'),
	(58, 0, '2024-09-22 17:13:20'),
	(59, 0, '2024-09-22 17:13:21'),
	(60, 0, '2024-09-22 17:13:22'),
	(61, 0, '2024-09-22 17:13:23'),
	(62, 0, '2024-09-22 17:13:24'),
	(63, 0, '2024-09-22 17:13:26'),
	(64, 0, '2024-09-22 17:13:27'),
	(65, 0, '2024-09-22 17:13:29'),
	(66, 0, '2024-09-22 17:13:31'),
	(67, 0, '2024-09-22 17:13:36'),
	(68, 0, '2024-09-22 17:13:40'),
	(69, 0, '2024-09-22 17:13:43'),
	(70, 0, '2024-09-22 17:13:45'),
	(71, 0, '2024-09-22 17:13:49');

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

-- Volcando datos para la tabla tals.sensor_movimiento_has_evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.tanque_agua
CREATE TABLE IF NOT EXISTS `tanque_agua` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivel_agua` int DEFAULT NULL,
  `nivel_max` int DEFAULT NULL,
  `nivel_min` int DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.tanque_agua: ~71 rows (aproximadamente)
INSERT IGNORE INTO `tanque_agua` (`id`, `nivel_agua`, `nivel_max`, `nivel_min`, `date`) VALUES
	(1, 14, NULL, NULL, '2024-09-22 13:11:25'),
	(2, 14, NULL, NULL, '2024-09-22 13:11:26'),
	(3, 14, NULL, NULL, '2024-09-22 13:11:27'),
	(4, 14, NULL, NULL, '2024-09-22 13:11:29'),
	(5, 14, NULL, NULL, '2024-09-22 13:11:31'),
	(6, 14, NULL, NULL, '2024-09-22 13:11:34'),
	(7, 14, NULL, NULL, '2024-09-22 13:11:38'),
	(8, 14, NULL, NULL, '2024-09-22 13:11:41'),
	(9, 14, NULL, NULL, '2024-09-22 13:11:45'),
	(10, 14, NULL, NULL, '2024-09-22 13:11:47'),
	(11, 15, NULL, NULL, '2024-09-22 13:11:49'),
	(12, 14, NULL, NULL, '2024-09-22 13:11:52'),
	(13, 14, NULL, NULL, '2024-09-22 13:11:56'),
	(14, 14, NULL, NULL, '2024-09-22 13:12:00'),
	(15, 14, NULL, NULL, '2024-09-22 13:12:03'),
	(16, 14, NULL, NULL, '2024-09-22 13:12:07'),
	(17, 14, NULL, NULL, '2024-09-22 13:12:09'),
	(18, 14, NULL, NULL, '2024-09-22 13:12:12'),
	(19, 14, NULL, NULL, '2024-09-22 13:12:13'),
	(20, 14, NULL, NULL, '2024-09-22 13:12:15'),
	(21, 14, NULL, NULL, '2024-09-22 13:12:16'),
	(22, 14, NULL, NULL, '2024-09-22 13:12:19'),
	(23, 14, NULL, NULL, '2024-09-22 13:12:22'),
	(24, 14, NULL, NULL, '2024-09-22 13:12:27'),
	(25, 14, NULL, NULL, '2024-09-22 13:12:29'),
	(26, 14, NULL, NULL, '2024-09-22 13:12:31'),
	(27, 14, NULL, NULL, '2024-09-22 13:12:32'),
	(28, 14, NULL, NULL, '2024-09-22 13:12:34'),
	(29, 14, NULL, NULL, '2024-09-22 13:12:36'),
	(30, 14, NULL, NULL, '2024-09-22 13:12:38'),
	(31, 14, NULL, NULL, '2024-09-22 13:12:39'),
	(32, 14, NULL, NULL, '2024-09-22 13:12:41'),
	(33, 14, NULL, NULL, '2024-09-22 13:12:42'),
	(34, 14, NULL, NULL, '2024-09-22 13:12:44'),
	(35, 14, NULL, NULL, '2024-09-22 13:12:45'),
	(36, 14, NULL, NULL, '2024-09-22 13:12:47'),
	(37, 14, NULL, NULL, '2024-09-22 13:12:48'),
	(38, 14, NULL, NULL, '2024-09-22 13:12:50'),
	(39, 14, NULL, NULL, '2024-09-22 13:12:51'),
	(40, 14, NULL, NULL, '2024-09-22 13:12:52'),
	(41, 14, NULL, NULL, '2024-09-22 13:12:54'),
	(42, 14, NULL, NULL, '2024-09-22 13:12:56'),
	(43, 14, NULL, NULL, '2024-09-22 13:12:57'),
	(44, 14, NULL, NULL, '2024-09-22 13:12:59'),
	(45, 14, NULL, NULL, '2024-09-22 13:13:00'),
	(46, 14, NULL, NULL, '2024-09-22 13:13:01'),
	(47, 14, NULL, NULL, '2024-09-22 13:13:03'),
	(48, 14, NULL, NULL, '2024-09-22 13:13:04'),
	(49, 14, NULL, NULL, '2024-09-22 13:13:05'),
	(50, 14, NULL, NULL, '2024-09-22 13:13:07'),
	(51, 14, NULL, NULL, '2024-09-22 13:13:08'),
	(52, 14, NULL, NULL, '2024-09-22 13:13:10'),
	(53, 14, NULL, NULL, '2024-09-22 13:13:12'),
	(54, 14, NULL, NULL, '2024-09-22 13:13:14'),
	(55, 14, NULL, NULL, '2024-09-22 13:13:15'),
	(56, 14, NULL, NULL, '2024-09-22 13:13:17'),
	(57, 14, NULL, NULL, '2024-09-22 13:13:18'),
	(58, 14, NULL, NULL, '2024-09-22 13:13:19'),
	(59, 14, NULL, NULL, '2024-09-22 13:13:21'),
	(60, 14, NULL, NULL, '2024-09-22 13:13:22'),
	(61, 14, NULL, NULL, '2024-09-22 13:13:23'),
	(62, 14, NULL, NULL, '2024-09-22 13:13:24'),
	(63, 14, NULL, NULL, '2024-09-22 13:13:25'),
	(64, 14, NULL, NULL, '2024-09-22 13:13:26'),
	(65, 14, NULL, NULL, '2024-09-22 13:13:28'),
	(66, 14, NULL, NULL, '2024-09-22 13:13:31'),
	(67, 14, NULL, NULL, '2024-09-22 13:13:34'),
	(68, 14, NULL, NULL, '2024-09-22 13:13:39'),
	(69, 14, NULL, NULL, '2024-09-22 13:13:42'),
	(70, 14, NULL, NULL, '2024-09-22 13:13:45'),
	(71, 14, NULL, NULL, '2024-09-22 13:13:48');

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

-- Volcando datos para la tabla tals.tanque_agua_has_evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.termostato
CREATE TABLE IF NOT EXISTS `termostato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `temperatura` decimal(10,0) DEFAULT NULL,
  `humedad` int DEFAULT NULL,
  `temperatura_deseada` decimal(10,0) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.termostato: ~71 rows (aproximadamente)
INSERT IGNORE INTO `termostato` (`id`, `temperatura`, `humedad`, `temperatura_deseada`, `date`) VALUES
	(1, 26, 73, NULL, '2024-09-22 13:11:26'),
	(2, 26, 74, NULL, '2024-09-22 13:11:27'),
	(3, 26, 73, NULL, '2024-09-22 13:11:28'),
	(4, 26, 73, NULL, '2024-09-22 13:11:30'),
	(5, 26, 73, NULL, '2024-09-22 13:11:33'),
	(6, 26, 73, NULL, '2024-09-22 13:11:36'),
	(7, 26, 73, NULL, '2024-09-22 13:11:40'),
	(8, 26, 73, NULL, '2024-09-22 13:11:43'),
	(9, 26, 73, NULL, '2024-09-22 13:11:46'),
	(10, 26, 73, NULL, '2024-09-22 13:11:48'),
	(11, 26, 73, NULL, '2024-09-22 13:11:51'),
	(12, 26, 73, NULL, '2024-09-22 13:11:53'),
	(13, 26, 73, NULL, '2024-09-22 13:11:58'),
	(14, 26, 73, NULL, '2024-09-22 13:12:02'),
	(15, 26, 73, NULL, '2024-09-22 13:12:05'),
	(16, 26, 73, NULL, '2024-09-22 13:12:08'),
	(17, 26, 73, NULL, '2024-09-22 13:12:10'),
	(18, 26, 73, NULL, '2024-09-22 13:12:13'),
	(19, 26, 73, NULL, '2024-09-22 13:12:14'),
	(20, 26, 73, NULL, '2024-09-22 13:12:16'),
	(21, 26, 73, NULL, '2024-09-22 13:12:18'),
	(22, 27, 73, NULL, '2024-09-22 13:12:20'),
	(23, 26, 73, NULL, '2024-09-22 13:12:25'),
	(24, 26, 73, NULL, '2024-09-22 13:12:28'),
	(25, 26, 73, NULL, '2024-09-22 13:12:30'),
	(26, 26, 73, NULL, '2024-09-22 13:12:32'),
	(27, 26, 73, NULL, '2024-09-22 13:12:33'),
	(28, 26, 73, NULL, '2024-09-22 13:12:35'),
	(29, 26, 73, NULL, '2024-09-22 13:12:37'),
	(30, 26, 73, NULL, '2024-09-22 13:12:39'),
	(31, 26, 73, NULL, '2024-09-22 13:12:40'),
	(32, 26, 73, NULL, '2024-09-22 13:12:42'),
	(33, 26, 73, NULL, '2024-09-22 13:12:43'),
	(34, 26, 73, NULL, '2024-09-22 13:12:44'),
	(35, 26, 73, NULL, '2024-09-22 13:12:46'),
	(36, 26, 73, NULL, '2024-09-22 13:12:48'),
	(37, 26, 73, NULL, '2024-09-22 13:12:49'),
	(38, 26, 73, NULL, '2024-09-22 13:12:50'),
	(39, 26, 73, NULL, '2024-09-22 13:12:52'),
	(40, 26, 73, NULL, '2024-09-22 13:12:53'),
	(41, 26, 73, NULL, '2024-09-22 13:12:55'),
	(42, 26, 73, NULL, '2024-09-22 13:12:57'),
	(43, 26, 73, NULL, '2024-09-22 13:12:58'),
	(44, 26, 73, NULL, '2024-09-22 13:12:59'),
	(45, 26, 73, NULL, '2024-09-22 13:13:01'),
	(46, 26, 73, NULL, '2024-09-22 13:13:02'),
	(47, 26, 73, NULL, '2024-09-22 13:13:03'),
	(48, 26, 73, NULL, '2024-09-22 13:13:05'),
	(49, 26, 73, NULL, '2024-09-22 13:13:06'),
	(50, 26, 73, NULL, '2024-09-22 13:13:07'),
	(51, 26, 73, NULL, '2024-09-22 13:13:09'),
	(52, 26, 73, NULL, '2024-09-22 13:13:11'),
	(53, 26, 73, NULL, '2024-09-22 13:13:13'),
	(54, 27, 73, NULL, '2024-09-22 13:13:14'),
	(55, 26, 73, NULL, '2024-09-22 13:13:16'),
	(56, 26, 73, NULL, '2024-09-22 13:13:17'),
	(57, 26, 73, NULL, '2024-09-22 13:13:19'),
	(58, 26, 73, NULL, '2024-09-22 13:13:20'),
	(59, 26, 73, NULL, '2024-09-22 13:13:21'),
	(60, 26, 73, NULL, '2024-09-22 13:13:22'),
	(61, 26, 73, NULL, '2024-09-22 13:13:23'),
	(62, 26, 73, NULL, '2024-09-22 13:13:25'),
	(63, 26, 73, NULL, '2024-09-22 13:13:26'),
	(64, 26, 73, NULL, '2024-09-22 13:13:27'),
	(65, 26, 73, NULL, '2024-09-22 13:13:29'),
	(66, 26, 73, NULL, '2024-09-22 13:13:32'),
	(67, 26, 73, NULL, '2024-09-22 13:13:37'),
	(68, 26, 73, NULL, '2024-09-22 13:13:41'),
	(69, 26, 73, NULL, '2024-09-22 13:13:43'),
	(70, 26, 73, NULL, '2024-09-22 13:13:46'),
	(71, 26, 73, NULL, '2024-09-22 13:13:50');

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

-- Volcando datos para la tabla tals.termostato_has_evento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tals.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla tals.usuario: ~1 rows (aproximadamente)
INSERT IGNORE INTO `usuario` (`id`, `nombre`, `email`, `password`) VALUES
	(1, 'gabbs', 'admin@mail.com', '12345');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
