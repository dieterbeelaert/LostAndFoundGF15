-- phpMyAdmin SQL Dump
-- version 4.2.12deb2
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Gegenereerd op: 17 jul 2015 om 21:47
-- Serverversie: 5.6.24-0ubuntu2
-- PHP-versie: 5.6.4-4ubuntu6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `lost`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `connection`
--

CREATE TABLE IF NOT EXISTS `connection` (
  `id` varchar(120) CHARACTER SET utf8 NOT NULL,
  `user_token` int(11) NOT NULL,
  `lat` varchar(120) CHARACTER SET utf8 DEFAULT NULL,
  `lon` varchar(120) CHARACTER SET utf8 DEFAULT NULL,
  `event_lat` varchar(120) CHARACTER SET utf8 DEFAULT NULL,
  `event_lon` varchar(120) CHARACTER SET utf8 DEFAULT NULL,
  `event_name` varchar(120) CHARACTER SET utf8 DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `connection`
--

INSERT INTO `connection` (`id`, `user_token`, `lat`, `lon`, `event_lat`, `event_lon`, `event_name`, `timestamp`) VALUES
('E10hxHfK', 0, '', '', NULL, NULL, NULL, '2015-07-17 21:39:29'),
('E10hxHfK', 0, '', '', NULL, NULL, NULL, '2015-07-17 21:42:29');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
