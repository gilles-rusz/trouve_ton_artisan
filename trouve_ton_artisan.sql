-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 29 mai 2025 à 09:39
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `trouve_ton_artisan`
--

-- --------------------------------------------------------

--
-- Structure de la table `artisans`
--

DROP TABLE IF EXISTS `artisans`;
CREATE TABLE IF NOT EXISTS `artisans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `note` float NOT NULL DEFAULT '0',
  `ville` varchar(255) NOT NULL,
  `a_propos` text,
  `email` varchar(255) NOT NULL,
  `site_web` varchar(255) DEFAULT NULL,
  `specialiteId` int NOT NULL,
  `top` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `specialiteId` (`specialiteId`)
) ;

--
-- Déchargement des données de la table `artisans`
--

INSERT INTO `artisans` (`id`, `nom`, `note`, `ville`, `a_propos`, `email`, `site_web`, `specialiteId`, `top`) VALUES
(1, 'Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'aupainchaud@hotmail.com', '', 0, 0),
(2, 'Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'boucherie.dumond@gmail.com', NULL, 0, 0),
(3, 'Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'aupainchaud@hotmail.com', NULL, 0, 0),
(4, 'Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 0, 0),
(5, 'Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0, 0),
(6, 'Orville Salmons', 5, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'o-salmons@live.com', NULL, 0, 0),
(7, 'Mont Blanc Eléctricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0, 0),
(8, 'Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0, 0),
(9, 'Vallis Bellemare', 4, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0, 0),
(10, 'Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'claude.quinn@gmail.com', NULL, 0, 0),
(11, 'Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0, 0),
(12, 'Ernest Carignan', 5, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'e-carigan@hotmail.com', NULL, 0, 0),
(13, 'Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'r.charbonneau@gmail.com', NULL, 0, 0),
(14, 'Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0, 0),
(15, 'C\'est sup\'hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'sup-hair@gmail.com', 'https://sup-hair.fr', 0, 0),
(16, 'Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0, 0),
(17, 'Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'v-laredoute@gmail.com', NULL, 0, 0),
(18, 'CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0, 0),
(19, 'Artisan Bâtiment Exemple', 4.5, 'Paris', NULL, 'contact@example.com', NULL, 2, 0),
(20, 'Jean Chauffe', 4.5, 'Paris', NULL, 'jean.chauffe@example.com', NULL, 5, 0),
(21, 'Luc Electric', 4.7, 'Lyon', NULL, 'luc.electric@example.com', NULL, 6, 0),
(22, 'Paul Menuis', 4.6, 'Marseille', NULL, 'paul.menuis@example.com', NULL, 7, 0),
(23, 'Sophie Plomb', 4.9, 'Bordeaux', NULL, 'sophie.plomb@example.com', NULL, 8, 0),
(24, 'Alex Boucher', 4.2, 'Paris', NULL, 'alex.boucher@example.com', NULL, 1, 0),
(25, 'Bruno Boulanger', 4.5, 'Lyon', NULL, 'bruno.boulanger@example.com', NULL, 2, 0),
(26, 'Chloé Chocolatier', 4.8, 'Marseille', NULL, 'chloe.chocolatier@example.com', NULL, 3, 0),
(27, 'Diane Traiteur', 4.6, 'Toulouse', NULL, 'diane.traiteur@example.com', NULL, 4, 0),
(28, 'Eric Chauffagiste', 4.3, 'Nantes', NULL, 'eric.chauffagiste@example.com', NULL, 5, 0),
(29, 'Fanny Electricien', 4.7, 'Bordeaux', NULL, 'fanny.electricien@example.com', NULL, 6, 0),
(30, 'Gilles Menuisier', 4.5, 'Nice', NULL, 'gilles.menuisier@example.com', NULL, 7, 0),
(31, 'Hugo Plombier', 4.9, 'Strasbourg', NULL, 'hugo.plombier@example.com', NULL, 8, 0),
(32, 'Isabelle Bijoutier', 4.4, 'Lille', NULL, 'isabelle.bijoutier@example.com', NULL, 9, 0),
(33, 'Julien Couturier', 4.3, 'Rennes', NULL, 'julien.couturier@example.com', NULL, 10, 0),
(34, 'Karim Ferronier', 4.6, 'Grenoble', NULL, 'karim.ferronier@example.com', NULL, 11, 0),
(35, 'Laura Coiffeur', 4.5, 'Reims', NULL, 'laura.coiffeur@example.com', NULL, 12, 0),
(36, 'Maxime Fleuriste', 4.7, 'Dijon', NULL, 'maxime.fleuriste@example.com', NULL, 13, 0),
(37, 'Nina Toiletteur', 4.6, 'Angers', NULL, 'nina.toiletteur@example.com', NULL, 14, 0),
(38, 'Oscar Webdesign', 4.8, 'Tours', NULL, 'oscar.webdesign@example.com', NULL, 15, 0);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`),
  UNIQUE KEY `nom_2` (`nom`),
  UNIQUE KEY `nom_3` (`nom`),
  UNIQUE KEY `nom_4` (`nom`),
  UNIQUE KEY `nom_5` (`nom`),
  UNIQUE KEY `nom_6` (`nom`),
  UNIQUE KEY `nom_7` (`nom`),
  UNIQUE KEY `nom_8` (`nom`),
  UNIQUE KEY `nom_9` (`nom`),
  UNIQUE KEY `nom_10` (`nom`),
  UNIQUE KEY `nom_11` (`nom`),
  UNIQUE KEY `nom_12` (`nom`),
  UNIQUE KEY `nom_13` (`nom`),
  UNIQUE KEY `nom_14` (`nom`),
  UNIQUE KEY `nom_15` (`nom`),
  UNIQUE KEY `nom_16` (`nom`),
  UNIQUE KEY `nom_17` (`nom`),
  UNIQUE KEY `nom_18` (`nom`),
  UNIQUE KEY `nom_19` (`nom`),
  UNIQUE KEY `nom_20` (`nom`),
  UNIQUE KEY `nom_21` (`nom`),
  UNIQUE KEY `nom_22` (`nom`),
  UNIQUE KEY `nom_23` (`nom`),
  UNIQUE KEY `nom_24` (`nom`),
  UNIQUE KEY `nom_25` (`nom`),
  UNIQUE KEY `nom_26` (`nom`),
  UNIQUE KEY `nom_27` (`nom`),
  UNIQUE KEY `nom_28` (`nom`),
  UNIQUE KEY `nom_29` (`nom`),
  UNIQUE KEY `nom_30` (`nom`),
  UNIQUE KEY `nom_31` (`nom`),
  UNIQUE KEY `nom_32` (`nom`),
  UNIQUE KEY `nom_33` (`nom`),
  UNIQUE KEY `nom_34` (`nom`),
  UNIQUE KEY `nom_35` (`nom`),
  UNIQUE KEY `nom_36` (`nom`),
  UNIQUE KEY `nom_37` (`nom`),
  UNIQUE KEY `nom_38` (`nom`),
  UNIQUE KEY `nom_39` (`nom`),
  UNIQUE KEY `nom_40` (`nom`),
  UNIQUE KEY `nom_41` (`nom`),
  UNIQUE KEY `nom_42` (`nom`),
  UNIQUE KEY `nom_43` (`nom`),
  UNIQUE KEY `nom_44` (`nom`),
  UNIQUE KEY `nom_45` (`nom`),
  UNIQUE KEY `nom_46` (`nom`),
  UNIQUE KEY `nom_47` (`nom`),
  UNIQUE KEY `nom_48` (`nom`),
  UNIQUE KEY `nom_49` (`nom`),
  UNIQUE KEY `nom_50` (`nom`),
  UNIQUE KEY `nom_51` (`nom`),
  UNIQUE KEY `nom_52` (`nom`),
  UNIQUE KEY `nom_53` (`nom`),
  UNIQUE KEY `nom_54` (`nom`),
  UNIQUE KEY `nom_55` (`nom`),
  UNIQUE KEY `nom_56` (`nom`),
  UNIQUE KEY `nom_57` (`nom`),
  UNIQUE KEY `nom_58` (`nom`),
  UNIQUE KEY `nom_59` (`nom`),
  UNIQUE KEY `nom_60` (`nom`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`) VALUES
(1, 'Alimentation'),
(2, 'Bâtiment'),
(3, 'Fabrication'),
(4, 'Services');

-- --------------------------------------------------------

--
-- Structure de la table `specialites`
--

DROP TABLE IF EXISTS `specialites`;
CREATE TABLE IF NOT EXISTS `specialites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `categorieId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`),
  UNIQUE KEY `specialites_nom_categorie_id` (`nom`,`categorieId`),
  KEY `categorieId` (`categorieId`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `specialites`
--

INSERT INTO `specialites` (`id`, `nom`, `categorieId`) VALUES
(1, 'Boucher', 1),
(2, 'Boulanger', 1),
(3, 'Chocolatier', 1),
(4, 'Traiteur', 1),
(5, 'Chauffagiste', 2),
(6, 'Electricien', 2),
(7, 'Menuisier', 2),
(8, 'Plombier', 2),
(9, 'Bijoutier', 3),
(10, 'Couturier', 3),
(11, 'Ferronier', 3),
(12, 'Coiffeur', 4),
(13, 'Fleuriste', 4),
(14, 'Toiletteur', 4),
(15, 'Webdesign', 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
