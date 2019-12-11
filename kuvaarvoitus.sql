-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for kuva-arvoitus
CREATE DATABASE IF NOT EXISTS `kuva-arvoitus` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `kuva-arvoitus`;

-- Dumping structure for table kuva-arvoitus.images
CREATE TABLE IF NOT EXISTS `images` (
  `img_id` int(11) NOT NULL AUTO_INCREMENT,
  `img_name` text CHARACTER SET utf8 NOT NULL,
  `img_description` text CHARACTER SET utf8 NOT NULL,
  `img_filename` text CHARACTER SET utf8 NOT NULL,
  `img_lng` double NOT NULL,
  `img_lat` double NOT NULL,
  `img_auth_id` int(11) NOT NULL,
  `img_karma` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`img_id`),
  KEY `ImageAuthKey` (`img_auth_id`),
  CONSTRAINT `ImageAuthKey` FOREIGN KEY (`img_auth_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kuva-arvoitus.images: ~0 rows (approximately)
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;

-- Dumping structure for table kuva-arvoitus.ratings
CREATE TABLE IF NOT EXISTS `ratings` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `rating_value` int(11) NOT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `RatingUserKey` (`user_id`),
  KEY `RatingImageKey` (`img_id`),
  CONSTRAINT `RatingImageKey` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RatingUserKey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kuva-arvoitus.ratings: ~0 rows (approximately)
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;

-- Dumping structure for table kuva-arvoitus.scores
CREATE TABLE IF NOT EXISTS `scores` (
  `score_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `guess_lng` double NOT NULL,
  `guess_lat` double NOT NULL,
  `guess_time_start` datetime NOT NULL,
  `guess_time_end` datetime NOT NULL,
  PRIMARY KEY (`score_id`),
  KEY `ScoreImageKey` (`img_id`),
  KEY `ScoreUserKey` (`user_id`),
  CONSTRAINT `ScoreImageKey` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ScoreUserKey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kuva-arvoitus.scores: ~0 rows (approximately)
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;

-- Dumping structure for table kuva-arvoitus.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_date` datetime NOT NULL DEFAULT current_timestamp(),
  `user_karma` int(11) NOT NULL DEFAULT 1000,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kuva-arvoitus.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
