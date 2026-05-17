-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2026 at 09:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pin rwanda`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `position` enum('header','sidebar','between_posts','footer','top') DEFAULT 'sidebar',
  `type` enum('banner','video','sponsored') DEFAULT 'banner',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `clicks` int(11) DEFAULT 0,
  `impressions` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `title`, `image_url`, `video_url`, `link`, `position`, `type`, `start_date`, `end_date`, `clicks`, `impressions`, `is_active`, `created_at`) VALUES
(2, 'PIN RWANDA Advertisement', 'https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&w=1200&h=200&fit=crop', NULL, 'https://pinrwanda.com', 'header', '', NULL, NULL, 1, 0, 1, '2026-05-17 11:41:36');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author_name` varchar(100) DEFAULT 'Anonymous',
  `author_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `video_id`, `content`, `user_id`, `created_at`, `author_name`, `author_email`) VALUES
(1, NULL, 196, 'it is amazing\n', 1, '2026-05-11 10:04:07', 'Anonymous', NULL),
(3, NULL, 207, 'hy', NULL, '2026-05-11 12:15:10', 'Anonymous', NULL),
(4, NULL, 207, 'hello', NULL, '2026-05-11 12:15:25', 'Anonymous', NULL),
(5, NULL, 207, 'this is great\n', NULL, '2026-05-11 12:15:33', 'Anonymous', NULL),
(6, NULL, 207, 'he is the greatest', NULL, '2026-05-11 12:18:47', 'Anonymous', NULL),
(7, NULL, 207, 'hy hello hiii', NULL, '2026-05-11 12:19:01', 'Anonymous', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`) VALUES
(1, 'mugisha willy rukundo', 'mrukundo365@gmail.com', 'nothing', 'pin rwanda we love you so muchhhh', 1, '2026-05-12 19:53:14');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `donor_email` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `message` text DEFAULT NULL,
  `is_anonymous` tinyint(1) DEFAULT 0,
  `status` enum('pending','completed','failed') DEFAULT 'completed',
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donation_goals`
--

CREATE TABLE `donation_goals` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `target_amount` decimal(10,2) NOT NULL,
  `current_amount` decimal(10,2) DEFAULT 0.00,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `video_id`, `user_id`, `created_at`) VALUES
(1, NULL, 196, 1, '2026-05-11 10:03:57');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_codes`
--

CREATE TABLE `password_reset_codes` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  `attempts` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_reset_codes`
--

INSERT INTO `password_reset_codes` (`id`, `email`, `code`, `expires_at`, `used`, `attempts`, `created_at`) VALUES
(1, 'mrukundo365@gmail.com', '403511', '2026-05-13 12:14:41', 1, 0, '2026-05-13 09:59:41');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `is_sponsored` tinyint(1) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sponsorships`
--

CREATE TABLE `sponsorships` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `contact_person` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `sponsorship_type` enum('bronze','silver','gold','platinum') DEFAULT 'bronze',
  `amount` decimal(10,2) DEFAULT NULL,
  `duration_months` int(11) DEFAULT 1,
  `message` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist`
--

CREATE TABLE `token_blacklist` (
  `id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_blacklist`
--

INSERT INTO `token_blacklist` (`id`, `token`, `expires_at`, `created_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODQ4NTExOCwiZXhwIjoxNzc5MDg5OTE4fQ.5qm3dCZNstPmAcSGr68z3hO1kg6ph7acA8RlhmNddI0', '2026-05-18 09:38:38', '2026-05-11 07:48:20'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODQ5MTAzMywiZXhwIjoxNzc5MDk1ODMzfQ.ydlbetEbpFtYqL917z1bVJqwKzdfCpWGMWs_RzJ_91A', '2026-05-18 11:17:13', '2026-05-11 10:20:21'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODQ5NDkyOSwiZXhwIjoxNzc5MDk5NzI5fQ._a24V2JcAYlQUmDQ3mfvRMLD4_lxGU_yBu9kEL-Houo', '2026-05-18 12:22:09', '2026-05-11 10:29:52'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODU2NzY4OCwiZXhwIjoxNzc5MTcyNDg4fQ.YH1eJvwvG7OlmZbZ7V2bR-eDuGDn9CytpESeQn-9mF0', '2026-05-19 08:34:48', '2026-05-12 06:35:35'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODU3MzI3MywiZXhwIjoxNzc5MTc4MDczfQ.IXkUIRWs5WmYN4n3wRpBKmRmKNikRbPZJiVGWEanciA', '2026-05-19 10:07:53', '2026-05-12 08:08:15'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODY1Mzc0MiwiZXhwIjoxNzc5MjU4NTQyfQ.kbxsxDCACIXq8G5VD_tenbXfcDHDc_jVSaHIfa8MbNg', '2026-05-20 08:29:02', '2026-05-13 09:23:45'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODY2NzMwNSwiZXhwIjoxNzc5MjcyMTA1fQ.PNywUlsjXmG9CQMuGf3n9hjYI4HHS2iMDA85VZjs5c8', '2026-05-20 12:15:05', '2026-05-13 12:29:18'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODY3NTM2MSwiZXhwIjoxNzc5MjgwMTYxfQ.CPXeYmNFU7nP7xVBONzPIjm02a6zFnqlOToZx4kLibc', '2026-05-20 14:29:21', '2026-05-13 14:36:19'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODkzODkyOSwiZXhwIjoxNzc5NTQzNzI5fQ.Q9b_xeAbjPw4I2ajT7nP8esqsdeD-vA12XTxfNaiqFA', '2026-05-23 15:42:09', '2026-05-16 13:53:07'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODkzODkyOSwiZXhwIjoxNzc5NTQzNzI5fQ.Q9b_xeAbjPw4I2ajT7nP8esqsdeD-vA12XTxfNaiqFA', '2026-05-23 15:42:09', '2026-05-16 13:53:07'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODkzOTY5NywiZXhwIjoxNzc5NTQ0NDk3fQ.3-GZiqF65cyTy70OQBK0agNMFYrwdQgP3utZHGcfeIw', '2026-05-23 15:54:57', '2026-05-16 14:10:57'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODk0MDY2NiwiZXhwIjoxNzc5NTQ1NDY2fQ.GyLzf4X2tUsKOY1--G3M6EbgwTqZPlMM9fcxDj8d2Xk', '2026-05-23 16:11:06', '2026-05-16 14:22:58'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODk0MTM4OCwiZXhwIjoxNzc5NTQ2MTg4fQ.XoLKlSxZbl9WBMH2S0LTwCTW7PXR5oKwMzEYkdH8aAI', '2026-05-23 16:23:08', '2026-05-17 06:34:02'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODk5OTY0NywiZXhwIjoxNzc5NjA0NDQ3fQ.hbi8z9vXUyNbjKwUPajx7cmN8LWpSkZIaIWdU4xMjK0', '2026-05-24 08:34:07', '2026-05-17 06:34:32'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODk5OTY5NywiZXhwIjoxNzc5NjA0NDk3fQ.8Iq38kytMEqoUp9BpgsCtfCehVSI1s2TNoCLcDpRaIw', '2026-05-24 08:34:57', '2026-05-17 06:36:40'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3OTAwMDg5NSwiZXhwIjoxNzc5NjA1Njk1fQ.5c2qbK6jxMPARB2jTUQu3iLC_BOJUFNdqWBDUM56a0s', '2026-05-24 08:54:55', '2026-05-17 11:24:40'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3OTAxNzA4NSwiZXhwIjoxNzc5NjIxODg1fQ.yds9BYXs5foszLg_82Q8wtR7J4RnuF2j1sfwFcuJk08', '2026-05-24 13:24:45', '2026-05-17 12:45:44'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWw1NWR1c2hpbXVtdXJlbnlpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3OTAzNzYxNSwiZXhwIjoxNzc5NjQyNDE1fQ.ge0Dw93FOEUIlYyN2AlZ5D3rVv7Fp-JOrHLmE2Oni34', '2026-05-24 19:06:55', '2026-05-17 19:08:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `role` enum('admin') DEFAULT 'admin',
  `has_changed_credentials` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`, `bio`, `role`, `has_changed_credentials`, `created_at`) VALUES
(1, 'Daniel DUSHIMUMUREMYI', 'daniel55dushimumurenyi@gmail.com', '$2b$10$Hcfpf1QQ308b.w5SG7LjIOsKmZi91wwlsLEfWAT5a7KZBlcuwN9Iq', NULL, NULL, 'admin', 1, '2026-05-10 17:50:24');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `youtube_video_id` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `type` enum('upload','youtube','embed') DEFAULT 'upload',
  `category` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `is_live` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `description`, `video_url`, `youtube_video_id`, `thumbnail`, `type`, `category`, `views`, `is_live`, `created_at`) VALUES
(1, 'MBEGA AGAHINDA😭 UWAKORAGA MURI SACCO  ARI MU BISHWE N&#39;IBIROMBE UNDI BAMUTEMERAMO NYUMA ARAPFA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', 'youtube', 'general', 172, 0, '2026-05-09 04:10:22'),
(2, 'IKISHE KARASIRA AIMABLE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=4WIRg1FDzfw', '4WIRg1FDzfw', 'https://i.ytimg.com/vi/4WIRg1FDzfw/hqdefault.jpg', 'youtube', 'general', 66, 0, '2026-05-09 04:10:23'),
(3, '😭😭😭😭SIDA IBAKOZEHO', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=D-J7GaO-aKU', 'D-J7GaO-aKU', 'https://i.ytimg.com/vi/D-J7GaO-aKU/hqdefault.jpg', 'youtube', 'general', 48, 0, '2026-05-09 04:10:23'),
(4, 'TUJYANE KU GISOZI MU MUNEZERO GUSA GUSA WA CLAUCY RESTO-BAR', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=sQz6tNZlKsc', 'sQz6tNZlKsc', 'https://i.ytimg.com/vi/sQz6tNZlKsc/hqdefault.jpg', 'youtube', 'general', 77, 0, '2026-05-09 04:10:23'),
(5, 'INKURU MBI KURI PASTOR UFUNZE + BA GITIFU 3 B&#39;IMIRENGE BAFUNZE + DC CLEMENT + DJIHAD MU RUKIKO LE 4', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=fi3oaKMNoeI', 'fi3oaKMNoeI', 'https://i.ytimg.com/vi/fi3oaKMNoeI/hqdefault.jpg', 'youtube', 'general', 140, 0, '2026-05-09 04:10:23'),
(6, 'IBYO MUTUMVISE KURI DOSIYE YA DC CLEMENT// UMVA AKAGA N&#39;AMAHIRWE BIMUTEGEREJE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=fgIFmYqzNqM', 'fgIFmYqzNqM', 'https://i.ytimg.com/vi/fgIFmYqzNqM/hqdefault.jpg', 'youtube', 'general', 132, 0, '2026-05-09 04:10:23'),
(7, 'UBWUMVIKANE BUKE BW&#39;ABAKIRE 2 BUHURIYE HE N&#39;ICYAHA CY&#39;UBUGOME GISHINJWA ABO MURI COMAR?// MUHANGA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=lP9uDLH_agI', 'lP9uDLH_agI', 'https://i.ytimg.com/vi/lP9uDLH_agI/hqdefault.jpg', 'youtube', 'general', 189, 0, '2026-05-09 04:10:24'),
(8, 'ABABYEYI N&#39;ABAVANDIMWE BE BARENGA 10 BARISHWE ASIGARA WENYINE //UBUHAMYA BUBABAJE BW&#39;UWAROKOTSE', 'kwibuka32/ Rukoma-Kamonyi: Ubuhamya bw\'uwarokotse jenoside yakorewe Abatutsi yatanze le 19/04/2026.', 'https://www.youtube.com/watch?v=XJ9fojbjw3Y', 'XJ9fojbjw3Y', 'https://i.ytimg.com/vi/XJ9fojbjw3Y/hqdefault.jpg', 'youtube', 'general', 112, 0, '2026-05-09 04:10:24'),
(9, 'ABATUTSI BICIWE I RUKOMA -KAMONYI BANAJUGUNYWE MU BIROMBYE BY&#39;AMABUYEUBUTUMWA BWA V-MAYOR Josee', 'kwibuka32 : Ubutumwa Vice Mayor UWIRINGIRA Marie Josee yatanze le 19/04/2026.', 'https://www.youtube.com/watch?v=zV7NfY6PA_I', 'zV7NfY6PA_I', 'https://i.ytimg.com/vi/zV7NfY6PA_I/hqdefault.jpg', 'youtube', 'general', 49, 0, '2026-05-09 04:10:24'),
(10, 'MUHANGA: HARI ABAFITE UBWOBA KO BASHOBORA KWICWA N’AMAZI YA KOMPANYI Y’UMUSHINWA //', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=AjBx5nVThas', 'AjBx5nVThas', 'https://i.ytimg.com/vi/AjBx5nVThas/hqdefault.jpg', 'youtube', 'general', 446, 0, '2026-05-09 04:10:24'),
(11, 'VIDEO: KAREKEZI YAKUBITIYE URUSHYI MBONYUMUTWA MU RUHANGO RWUMVIKANIRA I MUHANGA KOKO?', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=hAF4kdGN3Ys', 'hAF4kdGN3Ys', 'https://i.ytimg.com/vi/hAF4kdGN3Ys/hqdefault.jpg', 'youtube', 'general', 194, 0, '2026-05-09 04:10:25'),
(12, 'KIYUMBA-MUHANGA/KWIBUKA 32: ABAROKOTSE JENOSIDE YAKOREWE ABATUTSI BASHIMIYE INKOTANYI CYANE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=0bRQPcblBok', '0bRQPcblBok', 'https://i.ytimg.com/vi/0bRQPcblBok/hqdefault.jpg', 'youtube', 'general', 362, 0, '2026-05-09 04:10:25'),
(13, 'BARABARASHE, BARABATEMA,BARABATWIKA/ UBUHAMYA BW&#39;UWAROKOKEYE NGORORERO KU BUGOME BW&#39;ABAJENOSIDERE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=_63tNWl49VE', '_63tNWl49VE', 'https://i.ytimg.com/vi/_63tNWl49VE/hqdefault.jpg', 'youtube', 'general', 66, 0, '2026-05-09 04:10:25'),
(14, '#KWIBUKA32: UBUTUMWA BWA MINISITIRI W&#39;INTEMBE // UMURENGE WA NGORORERO', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=maV_oKmHGjg', 'maV_oKmHGjg', 'https://i.ytimg.com/vi/maV_oKmHGjg/hqdefault.jpg', 'youtube', 'general', 187, 0, '2026-05-09 04:10:25'),
(15, 'MINISITIRI W&#39;INTEBE  KU KIBAZO CY&#39;AKARERE KA NGORORERO KARI MU TWA NYUMA MU BUMWE N&#39;UBWIYUNGE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=yOGc0V8k864', 'yOGc0V8k864', 'https://i.ytimg.com/vi/yOGc0V8k864/hqdefault.jpg', 'youtube', 'general', 214, 0, '2026-05-09 04:10:25'),
(16, 'UMUSORE YIROSHYE MURI NYABARONGO ARABURA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=rIrHDvB8G20', 'rIrHDvB8G20', 'https://i.ytimg.com/vi/rIrHDvB8G20/hqdefault.jpg', 'youtube', 'general', 4731, 0, '2026-05-09 04:10:26'),
(17, 'INDAHIRO YA PEREZIDA W&#39;URUGAGA RW&#39;ABIKORERA I MUHANGA WINJIYE MU NAMA NJYANAMA Y&#39;AKARERE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=pfBuwX-2Cf0', 'pfBuwX-2Cf0', 'https://i.ytimg.com/vi/pfBuwX-2Cf0/hqdefault.jpg', 'youtube', 'general', 268, 0, '2026-05-09 04:10:26'),
(18, '#KWIBUKA32: MU RUHANGO HAZASHYINGURWA MU CYUBAHIRO IMIBIRI IRENGA 100//IKIGANIRO NA MEYA WA RUHANGO', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=IO7WyHGEv3o', 'IO7WyHGEv3o', 'https://i.ytimg.com/vi/IO7WyHGEv3o/hqdefault.jpg', 'youtube', 'general', 310, 0, '2026-05-09 04:10:26'),
(19, 'ITERABWOBA RIKOREWE  UMUNYAMAKURU WAVUZE UBUJURA BWAKOREWE MURI EQUITY / UMUGORE AMUKANGISHIJE RIB🤔', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=f4sh93yLrOw', 'f4sh93yLrOw', 'https://i.ytimg.com/vi/f4sh93yLrOw/hqdefault.jpg', 'youtube', 'general', 734, 0, '2026-05-09 04:10:26'),
(20, 'IMPANUKA IBABAJE CYANE😭 IKAMYO YISHE UMUGABO// ABATURAGE BAGIRIYE INAMA ABASHOFERI', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=ZqrgfDIoTJw', 'ZqrgfDIoTJw', 'https://i.ytimg.com/vi/ZqrgfDIoTJw/hqdefault.jpg', 'youtube', 'general', 6659, 0, '2026-05-09 04:10:26'),
(21, 'NGORORERO: UMWENYA WABAYE IMARI ISHYUSHYE// URUGANDA RWENGA AKARUHURA RURABAKIJIJIE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=D4YlIdK2Fvw', 'D4YlIdK2Fvw', 'https://i.ytimg.com/vi/D4YlIdK2Fvw/hqdefault.jpg', 'youtube', 'general', 214, 0, '2026-05-09 04:10:27'),
(22, '😭😭NI AGAHINDA, IKIROMBE KISHE UMUGORE WASIZE URUHINJA MU NZU NIJORO ASHAKAGA AMABUYE Y&#39;AGACIRO', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=Hg8J1h1YGWc', 'Hg8J1h1YGWc', 'https://i.ytimg.com/vi/Hg8J1h1YGWc/hqdefault.jpg', 'youtube', 'general', 385, 0, '2026-05-09 04:10:27'),
(23, 'IBYA GITIFU W&#39;UMURENGE UFUNZE+ IBY&#39;ABASOBANUZWA  AHO BAKUYE IMITUNGO BYARANGIYE BITE?', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=qilSRtoGVIw', 'qilSRtoGVIw', 'https://i.ytimg.com/vi/qilSRtoGVIw/hqdefault.jpg', 'youtube', 'general', 670, 0, '2026-05-09 04:10:27'),
(24, '🤔 UMUKIRE WARI UFUNGIYE MAGERAGERE BAMWIBYE MILIYONI 180+ MURI EQUITY /ABAKOZI BA BANKI BARAFUNGWA?', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=RkPp7Iden-s', 'RkPp7Iden-s', 'https://i.ytimg.com/vi/RkPp7Iden-s/hqdefault.jpg', 'youtube', 'general', 1664, 0, '2026-05-09 04:10:27'),
(25, 'IMPAPURO MPESHA MWENDA SI IZ&#39;ABAKIRE GUSA  AHUBWO ZIRAKIZA // IKIGANIRO', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=PXWwjcz1HHY', 'PXWwjcz1HHY', 'https://i.ytimg.com/vi/PXWwjcz1HHY/hqdefault.jpg', 'youtube', 'general', 394, 0, '2026-05-09 04:10:28'),
(26, 'IKAZE MURI CLAUCY // KIGALI-GISOZI', 'PIN RWANDA-Where Nothing is Hidden Video &Audio: Produced by PIN Media Rwanda Ltd//0789651100.', 'https://www.youtube.com/watch?v=jWtCvlFokuY', 'jWtCvlFokuY', 'https://i.ytimg.com/vi/jWtCvlFokuY/hqdefault.jpg', 'youtube', 'general', 275, 0, '2026-05-09 04:10:28'),
(27, '💔IMPANUKA IKOMEYE: HOWO YISHE ABASORE BANE // VIDEO LE 28/03/2026', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=xIXXzAsopOs', 'xIXXzAsopOs', 'https://i.ytimg.com/vi/xIXXzAsopOs/hqdefault.jpg', 'youtube', 'general', 13949, 0, '2026-05-09 04:10:28'),
(28, 'VIDEO: UMVA IBYO PEREZIDA MUSHYA WA PSF MU NTARA Y&#39;AMAJYEPFO ASEZERANYIJE ABIKORERA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=WsMDD6_6h_k', 'WsMDD6_6h_k', 'https://i.ytimg.com/vi/WsMDD6_6h_k/hqdefault.jpg', 'youtube', 'general', 186, 0, '2026-05-09 04:10:28'),
(29, '💔😭NINDE WISHE UYU MUKECURU W&#39;IMYAKA 88?😭', 'PIN RWANDA IS OFFICIAL YOUTUBE CHANNEL OF PIN MEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=V7c8hAqCxJI', 'V7c8hAqCxJI', 'https://i.ytimg.com/vi/V7c8hAqCxJI/hqdefault.jpg', 'youtube', 'general', 498, 0, '2026-05-09 04:10:28'),
(30, 'VIDEO: 😭HOWO IGUYE MURI NYABARONGO IRARENGERWA IRIMO UMUSHOFERI/UBUTUMWA BWA POLISI IRI KUMUSHAKISHA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=u9afWZd7JC4', 'u9afWZd7JC4', 'https://i.ytimg.com/vi/u9afWZd7JC4/hqdefault.jpg', 'youtube', 'general', 123654, 0, '2026-05-09 04:10:29'),
(31, 'VIDEO: NYABARONGO YAFUNZE UMUHANDA HAMERA NK&#39;IKIYAGA/ NGORORERO Le 23/03/2026', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=l7LBtUaf8gg', 'l7LBtUaf8gg', 'https://i.ytimg.com/vi/l7LBtUaf8gg/hqdefault.jpg', 'youtube', 'general', 32065, 0, '2026-05-09 04:10:29'),
(32, 'UMVA INDI NDIRIMBO YA G TAF AGIYE GUSOHORA// AYITANGARIJE MURI CLAUCY KU GISOZI', 'PIN RWANDA-Where Nothing is Hidden @Gtaff_official.', 'https://www.youtube.com/watch?v=1SsOpy1f6Jk', '1SsOpy1f6Jk', 'https://i.ytimg.com/vi/1SsOpy1f6Jk/hqdefault.jpg', 'youtube', 'general', 263, 0, '2026-05-09 04:10:29'),
(33, 'MUHANGA:  BISHIMIYE IMIGOZI Y&#39;IBIJUMBA BIVAMO AMANDAZI NA BISWI AKARERE KABAHAYE KU NKUNGA YA IMC', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=_UKMhL8eBXM', '_UKMhL8eBXM', 'https://i.ytimg.com/vi/_UKMhL8eBXM/hqdefault.jpg', 'youtube', 'general', 735, 0, '2026-05-09 04:10:29'),
(34, 'Abahebyi: Barebana n&#39;urupfu buri munsi/ Kuki badatinya na  MUNSAD  irindisha imbunda? Bakorera nde?', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=c9hqr2g7AWM', 'c9hqr2g7AWM', 'https://i.ytimg.com/vi/c9hqr2g7AWM/hqdefault.jpg', 'youtube', 'general', 1005, 0, '2026-05-09 04:10:29'),
(35, 'INKURU ITANGAJE Y&#39;UMUCUKUZI W&#39;AMABUYE WAGIYE MU RUKIKO KUBURANA KANDI NTA WIGEZE AMUREGA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=y9IkjaZkROg', 'y9IkjaZkROg', 'https://i.ytimg.com/vi/y9IkjaZkROg/hqdefault.jpg', 'youtube', 'general', 289, 0, '2026-05-09 04:10:30'),
(36, 'NGORORERO: ABACENGEZI BATEYE ISHURI RY&#39;INYANGE MU 1997/UMUKINO UGARAGAZA UBUGOME BWABO', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=HJ17mQehqqo', 'HJ17mQehqqo', 'https://i.ytimg.com/vi/HJ17mQehqqo/hqdefault.jpg', 'youtube', 'general', 1503, 0, '2026-05-09 04:10:30'),
(37, '😭NASANZE ARI GUSAMBANYA IHENE YANGE/ MBEGA AMAHANO🤔IHENE YARABABAYE CYANE /UMUSORE USAMBANYA IHENE!😭', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=hys6N1cA7SU', 'hys6N1cA7SU', 'https://i.ytimg.com/vi/hys6N1cA7SU/hqdefault.jpg', 'youtube', 'general', 2870, 0, '2026-05-09 04:10:30'),
(38, 'TUJYANE MU RUBANZA RW&#39;ABACUKUZI BABAZWA AHO BAKUYE IMITUNGO YA MILIYONI 700 ZIRENGA //#COMAR', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=oNZ5rmUhEkI', 'oNZ5rmUhEkI', 'https://i.ytimg.com/vi/oNZ5rmUhEkI/hqdefault.jpg', 'youtube', 'general', 547, 0, '2026-05-09 04:10:30'),
(39, 'WATANZWE🏋️MBEGA ABANTU BEZA MURI SIPORO // CLAUCY FITNESS GYM KU GISOZI IBICIRO NI NK&#39;UBUNTU.', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=PoS_QnBcRZc', 'PoS_QnBcRZc', 'https://i.ytimg.com/vi/PoS_QnBcRZc/hqdefault.jpg', 'youtube', 'general', 428, 0, '2026-05-09 04:10:30'),
(40, '💔Batanu bapfiiriye  mu Manga mu Masaha 24 gusa/Nihadashyirwa uburinzi harajyamo abandi.', '', 'https://www.youtube.com/watch?v=znDMfCq2e3g', 'znDMfCq2e3g', 'https://i.ytimg.com/vi/znDMfCq2e3g/hqdefault.jpg', 'youtube', 'general', 7457, 0, '2026-05-09 04:10:31'),
(41, '🚨 BATANU BIGENZE NABI//GUSOMA  URUBANZA RW&#39;ABAKOZI BA LETA N&#39;ABACUKUZI', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=-X_RAkFJYN0', '-X_RAkFJYN0', 'https://i.ytimg.com/vi/-X_RAkFJYN0/hqdefault.jpg', 'youtube', 'general', 579, 0, '2026-05-09 04:10:31'),
(42, '💔😭GUSHYINGURA WA MUGORE WICIWE KURI 40 MURI GHETTO HABUZE UMURYANGO WE ABATURANYI BARATABARA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=N034Of_K6_8', 'N034Of_K6_8', 'https://i.ytimg.com/vi/N034Of_K6_8/hqdefault.jpg', 'youtube', 'general', 2406, 0, '2026-05-09 04:10:31'),
(43, '💔YISHE ABANTU 3 ABATA MU CYOBO / IBISA N&#39;IBI BYAKOZWE NA KAZUNGU, RIB YAMUFUNGANYE N&#39;UMUFATANYACYAHA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=RXsuzofN__8', 'RXsuzofN__8', 'https://i.ytimg.com/vi/RXsuzofN__8/hqdefault.jpg', 'youtube', 'general', 418, 0, '2026-05-09 04:10:31'),
(44, 'UMVA INDIRIMBO YA G-TAFF  IKENEWE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=U4vAJL2Y1XI', 'U4vAJL2Y1XI', 'https://i.ytimg.com/vi/U4vAJL2Y1XI/hqdefault.jpg', 'youtube', 'general', 184, 0, '2026-05-09 04:10:31'),
(45, 'ABA BASAMBANYIJE ABAKOBWA BARENGA 6 // IYO RIB ITABAFATA BARI GUGUHINDUKA ABICANYI// DANIEL OPINION', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=Qk7tVTlpJy8', 'Qk7tVTlpJy8', 'https://i.ytimg.com/vi/Qk7tVTlpJy8/hqdefault.jpg', 'youtube', 'general', 227, 0, '2026-05-09 04:10:32'),
(46, '😭 YAMWISHE NABI// OPERATION YO GUFATA UMUGABO UKEKWAHO KWICA ABARENZE UMWE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=LI4fbAnNOpQ', 'LI4fbAnNOpQ', 'https://i.ytimg.com/vi/LI4fbAnNOpQ/hqdefault.jpg', 'youtube', 'general', 300, 0, '2026-05-09 04:10:32'),
(47, 'Ruhango/ Mbuye: Umugezi uhitanye umugore', '', 'https://www.youtube.com/watch?v=7usFssgVtNc', '7usFssgVtNc', 'https://i.ytimg.com/vi/7usFssgVtNc/hqdefault.jpg', 'youtube', 'general', 62, 0, '2026-05-09 04:10:32'),
(48, '😭😭Ni agahinda💔💔// Umugezi urahemutse.', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=EGUG4bfC13A', 'EGUG4bfC13A', 'https://i.ytimg.com/vi/EGUG4bfC13A/hqdefault.jpg', 'youtube', 'general', 876, 0, '2026-05-09 04:10:32'),
(49, 'umukobwa wabyaye impanga z&#39;abana batatu b&#39;abahungu', '', 'https://www.youtube.com/watch?v=eP42xUiJw0Q', 'eP42xUiJw0Q', 'https://i.ytimg.com/vi/eP42xUiJw0Q/hqdefault.jpg', 'youtube', 'general', 111, 0, '2026-05-09 04:10:33'),
(50, 'Umukobwa w&#39;imyaka 20 yabyaye impanga z&#39;abana batatu. Ikiganiro cyose kuri PIN RWANDA', '', 'https://www.youtube.com/watch?v=STL3WbuYh7M', 'STL3WbuYh7M', 'https://i.ytimg.com/vi/STL3WbuYh7M/hqdefault.jpg', 'youtube', 'general', 55, 0, '2026-05-09 04:10:33'),
(51, 'YANTEYE INDA Y&#39;IMPANGA ESHATU ARAMBOROKA/ UMUKOBWA W&#39;IMYAKA 20 WABYAYE IMPANGA Z&#39;ABANA 3 B&#39;ABAHUNGU', 'PIN RWANDA Ushaka kuduha amakuru cyangwa inyunganizi wahamagara cyangwa ukandikira 0789651100 Daniel ...', 'https://www.youtube.com/watch?v=apIkSTmGqtg', 'apIkSTmGqtg', 'https://i.ytimg.com/vi/apIkSTmGqtg/hqdefault.jpg', 'youtube', 'general', 1636, 0, '2026-05-09 04:10:33'),
(52, 'AMAKURU MEZA KU BASURA KWA YEZU NYIRIMPUHWE MU RUHANGO', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=NS9gEkPQ6fo', 'NS9gEkPQ6fo', 'https://i.ytimg.com/vi/NS9gEkPQ6fo/hqdefault.jpg', 'youtube', 'general', 199, 0, '2026-05-09 04:10:34'),
(53, 'RUHANGO: ABACURUZI BAKUMBUYE ISENGESHO RYO KWA YEZU NYIRIMPUHWE', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=zFllklzbV8g', 'zFllklzbV8g', 'https://i.ytimg.com/vi/zFllklzbV8g/hqdefault.jpg', 'youtube', 'general', 262, 0, '2026-05-09 04:10:34'),
(54, 'Claude arakubagana🤣', '', 'https://www.youtube.com/watch?v=b44UAm4Zgwc', 'b44UAm4Zgwc', 'https://i.ytimg.com/vi/b44UAm4Zgwc/hqdefault.jpg', 'youtube', 'general', 78, 0, '2026-05-09 04:10:34'),
(55, 'VIDEO: Afatiye umugabo ku mukobwa we// Se wa wa mukobwa ushinjwa kurya amafaranga y&#39;umusambanyi.', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=tFVsAdseDDc', 'tFVsAdseDDc', 'https://i.ytimg.com/vi/tFVsAdseDDc/hqdefault.jpg', 'youtube', 'general', 457, 0, '2026-05-09 04:10:34'),
(56, 'BYOSE ARABIVUZE 🤔🤔WA MUKOBWA USHINJWA  KURYA AMAFARANGA Y&#39;UMUGABO  USAMBANA TWAGANIRIYE', 'PIN RWANDA - DANIEL DUSHIMUMUREMYI.', 'https://www.youtube.com/watch?v=wuYubiFG4Jk', 'wuYubiFG4Jk', 'https://i.ytimg.com/vi/wuYubiFG4Jk/hqdefault.jpg', 'youtube', 'general', 2466, 0, '2026-05-09 04:10:34'),
(57, 'Umugabo Ari kwishyuza amafaranga yahaye umukobwa ngo basambane', '', 'https://www.youtube.com/watch?v=MRaMYKT5dNM', 'MRaMYKT5dNM', 'https://i.ytimg.com/vi/MRaMYKT5dNM/hqdefault.jpg', 'youtube', 'general', 65, 0, '2026-05-09 04:10:35'),
(58, 'YAGIYE GUSAMBANA BIRANGA  NYUMA AJYA KUREGA UMUKOBWA', 'PIN RWANDA/DANIEL DUSHIMUMUREMYI 0789651100.', 'https://www.youtube.com/watch?v=hLyYgOjVDhw', 'hLyYgOjVDhw', 'https://i.ytimg.com/vi/hLyYgOjVDhw/hqdefault.jpg', 'youtube', 'general', 1082, 0, '2026-05-09 04:10:35'),
(59, 'IMYANZURO Y&#39;URUBANZA RW&#39;ABACUKUZI B&#39;AMABIYE Y&#39;AGACIRO N&#39;ABAKOZI BA LEYA YAHEZE HE? ', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=ze0SFdPxG9w', 'ze0SFdPxG9w', 'https://i.ytimg.com/vi/ze0SFdPxG9w/hqdefault.jpg', 'youtube', 'general', 492, 0, '2026-05-09 04:10:35'),
(60, 'Abagabo barwaniye umugore', '', 'https://www.youtube.com/watch?v=dKMeTEOUzCM', 'dKMeTEOUzCM', 'https://i.ytimg.com/vi/dKMeTEOUzCM/hqdefault.jpg', 'youtube', 'general', 32, 0, '2026-05-09 04:10:35'),
(61, 'Uy mugore ukubitagura umugabo we ari kumuziza iki?', '', 'https://www.youtube.com/watch?v=maJM0sb_RDU', 'maJM0sb_RDU', 'https://i.ytimg.com/vi/maJM0sb_RDU/hqdefault.jpg', 'youtube', 'general', 89, 0, '2026-05-09 04:10:36'),
(62, 'WA MUGORE WAKUBISE UMUBO YAGEZE MURI RIB  NGO  YAFUNZWE?', 'PIN RWANDA-WHERE NOTHING IS HIDDEN.', 'https://www.youtube.com/watch?v=4__9TfxtFEI', '4__9TfxtFEI', 'https://i.ytimg.com/vi/4__9TfxtFEI/hqdefault.jpg', 'youtube', 'general', 235, 0, '2026-05-09 04:10:36'),
(63, 'ABAGABO BARWANYE INKUNDURA BAPFA UMUGORE BASHAKAGA GUSAMBANA NAWE /SWA3', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=AHBfy4cNK48', 'AHBfy4cNK48', 'https://i.ytimg.com/vi/AHBfy4cNK48/hqdefault.jpg', 'youtube', 'general', 601, 0, '2026-05-09 04:10:36'),
(64, 'Umugore abangamiwe  n&#39;urusaku rw&#39;imibonano mpuzabitsina y&#39;abaturanyi be/ Muhanga- Shyogwe- Mubuga', '', 'https://www.youtube.com/watch?v=FANOgwfY_x4', 'FANOgwfY_x4', 'https://i.ytimg.com/vi/FANOgwfY_x4/hqdefault.jpg', 'youtube', 'general', 2771, 0, '2026-05-09 04:10:36'),
(65, '🙆BARASAMBANA  BAGASAKUZA// UMUGORE YAHUNZE URUSAKU RUTERWA N&#39;IMIBONANO MPUZABITSINA Y&#39;ABATURANYI BE', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=pjdVw69xzMU', 'pjdVw69xzMU', 'https://i.ytimg.com/vi/pjdVw69xzMU/hqdefault.jpg', 'youtube', 'general', 32910, 0, '2026-05-09 04:10:36'),
(66, 'Bruce Melodie Imbere ya H.E Paul Kagame// Asante leta kwemera Monetization y&#39;imbuga nkoranyambaga.', '', 'https://www.youtube.com/watch?v=k5LExeeOWXg', 'k5LExeeOWXg', 'https://i.ytimg.com/vi/k5LExeeOWXg/hqdefault.jpg', 'youtube', 'general', 69, 0, '2026-05-09 04:10:37'),
(67, 'WOW👍H.E PAUL KAGAME AGARUTSE KU BYIFUZO BYA BRUCE MELODIE NA SCOVIA/ BATABARIJE ABAKORESHA IMBUGA..', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=ZW7W7ZIYbLs', 'ZW7W7ZIYbLs', 'https://i.ytimg.com/vi/ZW7W7ZIYbLs/hqdefault.jpg', 'youtube', 'general', 180, 0, '2026-05-09 04:10:37'),
(68, 'BRUCE MELODIE ASABYE IKINTU GIKOMEYE H.E PAUL KAGAME// GISUBIJWE ABAKORESHA IMBUGA BABA ABAKIRE', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=cGC96ARvOfg', 'cGC96ARvOfg', 'https://i.ytimg.com/vi/cGC96ARvOfg/hqdefault.jpg', 'youtube', 'general', 215, 0, '2026-05-09 04:10:37'),
(69, 'INKURU MBI NONAHA💔 MUCOMA YICISHIJE ICYUMA UMUGABO// YAKIBAGISHAGA IHENE😭😭😭// MUHANGA-KIYUMBA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=NKK0iqoPVlc', 'NKK0iqoPVlc', 'https://i.ytimg.com/vi/NKK0iqoPVlc/hqdefault.jpg', 'youtube', 'general', 405, 0, '2026-05-09 04:10:38'),
(70, 'Rungo: Batatu banyweye inzoga barahuma nyuma barapfa.', '', 'https://www.youtube.com/watch?v=PhkoGdoiNfY', 'PhkoGdoiNfY', 'https://i.ytimg.com/vi/PhkoGdoiNfY/hqdefault.jpg', 'youtube', 'general', 323, 0, '2026-05-09 04:10:38'),
(71, 'RWANDA: ABANTU 28 BAMAZE KWICWA N&#39;INZOGA MU MINSI 10// IYI NKURU YAKOZWE HAMAZE GUPFA 4 MU RUHANGO', 'PIN MEDIA RWANDA LTD . Ushaka kuduha amakuru watwandikira cyangwa ukaduhamagara kuri 0789651100.', 'https://www.youtube.com/watch?v=w4_q6WT57zg', 'w4_q6WT57zg', 'https://i.ytimg.com/vi/w4_q6WT57zg/hqdefault.jpg', 'youtube', 'general', 756, 0, '2026-05-09 04:10:38'),
(72, 'Aha niho haba amacumbi meza , i Muhanga', '', 'https://www.youtube.com/watch?v=0YHEzODXXp4', '0YHEzODXXp4', 'https://i.ytimg.com/vi/0YHEzODXXp4/hqdefault.jpg', 'youtube', 'general', 62, 0, '2026-05-09 04:10:38'),
(73, 'CLAUCY niyo BAR nziza yo gusohokeramo, Iri ku Gisozi ruguru ya ULK', '', 'https://www.youtube.com/watch?v=3FYAfDblw5A', '3FYAfDblw5A', 'https://i.ytimg.com/vi/3FYAfDblw5A/hqdefault.jpg', 'youtube', 'general', 174, 0, '2026-05-09 04:10:38'),
(74, 'umukecuru ahawe Gatanya arababara cyane', '', 'https://www.youtube.com/watch?v=W6Ntw3qlUnI', 'W6Ntw3qlUnI', 'https://i.ytimg.com/vi/W6Ntw3qlUnI/hqdefault.jpg', 'youtube', 'general', 112, 0, '2026-05-09 04:10:39'),
(75, 'SHWAGARABAGARA /SHWA KURI PIN RWANDA', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=zmt8iFNSDI8', 'zmt8iFNSDI8', 'https://i.ytimg.com/vi/zmt8iFNSDI8/hqdefault.jpg', 'youtube', 'general', 83, 0, '2026-05-09 04:10:39'),
(76, 'SHWAGARABAGARA #mamaurwagasabotv #chitamagictv #inyarwanda #afrimaxtv #mieempire #maxtv', '', 'https://www.youtube.com/watch?v=df1fGtZorQY', 'df1fGtZorQY', 'https://i.ytimg.com/vi/df1fGtZorQY/hqdefault.jpg', 'youtube', 'general', 189, 0, '2026-05-09 04:10:39'),
(77, 'SHWA1: UBUKWE BUHAGARARE// UMUKECURU NTASHAKA KO UMUSAZA ARONGORA UMUGORE MUTO/ ABANA NABO BABIJEMO', 'PIN RWANDA Tel: 0789651100.', 'https://www.youtube.com/watch?v=vkW2ICAYBWk', 'vkW2ICAYBWk', 'https://i.ytimg.com/vi/vkW2ICAYBWk/hqdefault.jpg', 'youtube', 'general', 645, 0, '2026-05-09 04:10:39'),
(78, 'Umugore yanyimye ibintu ku munsi w&#39;ubukwe🤣🤣🤣', '', 'https://www.youtube.com/watch?v=FZJE5PA-rd0', 'FZJE5PA-rd0', 'https://i.ytimg.com/vi/FZJE5PA-rd0/hqdefault.jpg', 'youtube', 'general', 68, 0, '2026-05-09 04:10:40'),
(79, 'Abanyweye Divayi mu bukwe yari abakozeho/ NYANZA / Busasamana/Gahondo.', '', 'https://www.youtube.com/watch?v=z5JumAcwsNE', 'z5JumAcwsNE', 'https://i.ytimg.com/vi/z5JumAcwsNE/hqdefault.jpg', 'youtube', 'general', 297, 0, '2026-05-09 04:10:40'),
(80, 'Ninde watemye intoki z&#39;uyu mwana?', '', 'https://www.youtube.com/watch?v=OmyJz9PywcQ', 'OmyJz9PywcQ', 'https://i.ytimg.com/vi/OmyJz9PywcQ/hqdefault.jpg', 'youtube', 'general', 43, 0, '2026-05-09 04:10:40'),
(81, 'PIN RWANDA -Where Nothing is Hidden', '', 'https://www.youtube.com/watch?v=23szL2AyyU4', '23szL2AyyU4', 'https://i.ytimg.com/vi/23szL2AyyU4/hqdefault.jpg', 'youtube', 'general', 132, 0, '2026-05-09 04:10:40'),
(82, 'PIN RWANDA', '', 'https://www.youtube.com/watch?v=f8dPvGWyAa0', 'f8dPvGWyAa0', 'https://i.ytimg.com/vi/f8dPvGWyAa0/hqdefault.jpg', 'youtube', 'general', 80, 0, '2026-05-09 04:10:40'),
(83, 'YAPFUYE NYUMA YO GUKUBITWA😭 NI UMUNSI APR IKINA NA RAYON SPORT/UBUHAMYA BW&#39;ABASHINJA SHUMBUSHO KWICA', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=sWEJNk2Aoy4', 'sWEJNk2Aoy4', 'https://i.ytimg.com/vi/sWEJNk2Aoy4/hqdefault.jpg', 'youtube', 'general', 373, 0, '2026-05-09 04:10:41'),
(84, 'BITEYE AGAHINDA😭MUNYAKAZI ARASHINJWA GUTEMA INTOKI Z&#39;UMWANA AKORESHEJE UMUPANGA/ UMVA UKO BYAGENZE', 'PIN RWANDA - Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=8bu6gpMobQA', '8bu6gpMobQA', 'https://i.ytimg.com/vi/8bu6gpMobQA/hqdefault.jpg', 'youtube', 'general', 11457, 0, '2026-05-09 04:10:41'),
(85, 'AMAKURU AGENEWE ABABIKA AMAFARANGA MU NZU BOSE, POLISI YAFASHE ABIBYE AMAMILIYONI', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=vJcIgHQ8GNU', 'vJcIgHQ8GNU', 'https://i.ytimg.com/vi/vJcIgHQ8GNU/hqdefault.jpg', 'youtube', 'general', 465, 0, '2026-05-09 04:10:41'),
(86, 'ABANTU 14 BANYWEYE URUYAMA MU BUKWE BARAREMBA', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=bWD9GCR4aus', 'bWD9GCR4aus', 'https://i.ytimg.com/vi/bWD9GCR4aus/hqdefault.jpg', 'youtube', 'general', 460, 0, '2026-05-09 04:10:41'),
(87, 'IMBERE MU RUGANDA RUTANGAJE RW&#39;AMABUYE Y&#39;AG ACIRO I NYANZA/ RWANDA/ RUHA AMAHIRWE AB&#39;IGITSINA GORE', 'PIN MEDIA RWANDA LTD Ukeneye ubuyobozi bwa PINMEDIA RWANDA LTD Wabuhamagara cyangwa ukabwandikira kuri ...', 'https://www.youtube.com/watch?v=qPPYbcR4rR8', 'qPPYbcR4rR8', 'https://i.ytimg.com/vi/qPPYbcR4rR8/hqdefault.jpg', 'youtube', 'general', 186, 0, '2026-05-09 04:10:42'),
(88, 'LIVE: BIRATANGAJE//UMWUMBATI UMWE UTERURWA N&#39;ABAGABO BANE/ MENYA UKO WAHINGA IMYUMBATI UKABA UMUKIRE', 'PIN RWANDA- Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=iVwNF8xi-Yo', 'iVwNF8xi-Yo', 'https://i.ytimg.com/vi/iVwNF8xi-Yo/hqdefault.jpg', 'youtube', 'general', 410, 0, '2026-05-09 04:10:42'),
(89, 'IMYUMBATI ITANGAJE', 'PIN MEDIA RWANDA LTD Ukeneye ubuyobozi bwa PINMEDIA RWANDA LTD Wabuhamagara cyangwa ukabwandikira kuri ...', 'https://www.youtube.com/watch?v=ZwBcNtJZVXU', 'ZwBcNtJZVXU', 'https://i.ytimg.com/vi/ZwBcNtJZVXU/hqdefault.jpg', 'youtube', 'general', 4943, 0, '2026-05-09 04:10:42'),
(90, 'TUJYANE MU RUGANDA  RUHA AKAZI ABAGORE N&#39; ABAKOBWA CYANE MU MABUYE Y&#39;AGACIRO// HAVILA MINES Ltd', 'PIN MEDIA RWANDA LTD Ukeneye ubuyobozi bwa PINMEDIA RWANDA LTD Wabuhamagara cyangwa ukabwandikira kuri ...', 'https://www.youtube.com/watch?v=KtfkaITep8A', 'KtfkaITep8A', 'https://i.ytimg.com/vi/KtfkaITep8A/hqdefault.jpg', 'youtube', 'general', 1427, 0, '2026-05-09 04:10:42'),
(91, 'KAMONYI : DORE UKO RWANDA TRINITY MINERALS YAROKOYE ABAHEBYI// YABAHAYE AKAZI', 'PIN MEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=ItWJQCZpZ2o', 'ItWJQCZpZ2o', 'https://i.ytimg.com/vi/ItWJQCZpZ2o/hqdefault.jpg', 'youtube', 'general', 379, 0, '2026-05-09 04:10:42'),
(92, 'RUHANG0: YIBYE INKOKO BARAMWICA', '', 'https://www.youtube.com/watch?v=AL2TR_uMMcw', 'AL2TR_uMMcw', 'https://i.ytimg.com/vi/AL2TR_uMMcw/hqdefault.jpg', 'youtube', 'general', 451, 0, '2026-05-09 04:10:43'),
(93, 'RWANDA:  IBIROMBE BY&#39;AMABUYE Y&#39;AGACIRO BIKIZA ABABITURIYE? // UBUHAMYA BW&#39;ABATURANYE NA IMC &amp;COMAR', 'PIN MEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=5otZfK3zv54', '5otZfK3zv54', 'https://i.ytimg.com/vi/5otZfK3zv54/hqdefault.jpg', 'youtube', 'general', 436, 0, '2026-05-09 04:10:43'),
(94, 'RUHANGO: YOSIYA BARAMWISHE// RIB IRI MU IPEREREZA', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=LQ9N1g_Klrw', 'LQ9N1g_Klrw', 'https://i.ytimg.com/vi/LQ9N1g_Klrw/hqdefault.jpg', 'youtube', 'general', 423, 0, '2026-05-09 04:10:43'),
(95, 'Amakuru yihutirwa ku banywa agasembuye //Uruganda rwenga GUBWANEZA rurafunzwe /Inzoga barazimennye', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=vmW49_kv25U', 'vmW49_kv25U', 'https://i.ytimg.com/vi/vmW49_kv25U/hqdefault.jpg', 'youtube', 'general', 1190, 0, '2026-05-09 04:10:43'),
(96, 'TUJYANE MU RUBANZA RW&#39;UMWARIMU WA UR Dr. MUGERWA// MU BUJURIRE BW&#39;IGIFUNGO CY&#39;IMINSI 30 Y&#39;AGATEGANYO', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=RoArbCGaQC0', 'RoArbCGaQC0', 'https://i.ytimg.com/vi/RoArbCGaQC0/hqdefault.jpg', 'youtube', 'general', 126, 0, '2026-05-09 04:10:44'),
(97, 'MEYA WA KAYONZA BARAMWIRUKANYE/  YAHISHE AMAKURU Y&#39;INZARA  Y&#39;ABATURAGE', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=01MpAMDNUtw', '01MpAMDNUtw', 'https://i.ytimg.com/vi/01MpAMDNUtw/hqdefault.jpg', 'youtube', 'general', 999, 0, '2026-05-09 04:10:44'),
(98, 'GAKENKE: ABANTU BARINDWI BAPFIRIYE MU KIROMBE', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=eJ84zpYkBPc', 'eJ84zpYkBPc', 'https://i.ytimg.com/vi/eJ84zpYkBPc/hqdefault.jpg', 'youtube', 'general', 216, 0, '2026-05-09 04:10:44'),
(99, 'DJIHAD ,DORE IBIREGO 9 BYOSE  KURI WE // AMASHUSHO  YA YAMPANO N&#39;ABANDI BAMUREZE', 'mamaurwagasabotv #scovia #maxtv #mieempire #afrimaxtv #chitamagictv #inyarwanda.', 'https://www.youtube.com/watch?v=tyVGikMx3BM', 'tyVGikMx3BM', 'https://i.ytimg.com/vi/tyVGikMx3BM/hqdefault.jpg', 'youtube', 'general', 117, 0, '2026-05-09 04:10:44'),
(100, 'Ruhango:Hari ababuriye irengero Me Nyandwi Bernard/ Perezida wa Ibuka akaba n&#39;umuhesha w&#39;inkiko', 'PINMEDIA RWANDA LTD #mamaurwagasabotv #igihekulture #mieempire #scovia ​', 'https://www.youtube.com/watch?v=kQBLsjBLqfY', 'kQBLsjBLqfY', 'https://i.ytimg.com/vi/kQBLsjBLqfY/hqdefault.jpg', 'youtube', 'general', 272, 0, '2026-05-09 04:10:44'),
(101, 'IGISUBIZO CYA HON. MUSA FAZIL KU WASABYE GUFUNGURA INSEGERO //ICYO AVUGA KU BWINSHI BWAZO//MUHANGA', 'Muhanga-Nyamabuye: Ubwo abaturage bagezaga ibibazo ku badepite bari kureba ibikorwa by\'iterambere, umuturage yasabye ...', 'https://www.youtube.com/watch?v=4VTUIthHu-A', '4VTUIthHu-A', 'https://i.ytimg.com/vi/4VTUIthHu-A/hqdefault.jpg', 'youtube', 'general', 123, 0, '2026-05-09 04:10:45'),
(102, 'VISA; AKAZI N&#39;ANDI MAYERI ABACURUZA ABANTU BAKORESHA // UMUSHINJACYAHA ABISOBANURIYE ABATURAGE', 'Ruhango-Kabagar, i le 25/11/2025, Mu bukangurambaga bw\'iminsi 16 bwo kurwanya ihohoterwa rishingiye ku gitsina ...', 'https://www.youtube.com/watch?v=qkBOfxkR6ec', 'qkBOfxkR6ec', 'https://i.ytimg.com/vi/qkBOfxkR6ec/hqdefault.jpg', 'youtube', 'general', 145, 0, '2026-05-09 04:10:45'),
(103, 'RUHANGO: ABANYESHURI 10 B&#39;ABAKOBWA BOHEREJWE MU BITARO// ANIMATRICES   NA ANIMATEUR BARAFUNGWA', 'Mu ishuri rya Gitisi TSS riherereye mu murenge wa Bweramana w\'akarere ka Ruhango, niho habereye urwo rugomo rw\'abarenzi ...', 'https://www.youtube.com/watch?v=3VvAyCywyYo', '3VvAyCywyYo', 'https://i.ytimg.com/vi/3VvAyCywyYo/hqdefault.jpg', 'youtube', 'general', 480, 0, '2026-05-09 04:10:46'),
(104, 'AKAZI K&#39;ABARENGA 600; IMIHANDA; IMODOKA ZITANGIZA IBIDUKIKI N&#39;IBINDI ITENGO MINING IZANIYE ABATURAGE', 'PINMEDIA RWANDALTD.', 'https://www.youtube.com/watch?v=1a1ZY7hwqus', '1a1ZY7hwqus', 'https://i.ytimg.com/vi/1a1ZY7hwqus/hqdefault.jpg', 'youtube', 'general', 171, 0, '2026-05-09 04:10:46'),
(105, 'AMAZU NA RUSWA BYA MILIYARI IRENGA BIVUGWA MU RUBANZA RW&#39;ABAKOZI 3 BA LETA N&#39;ABACUKUZI//DANIEL', 'PINRWANDA MEDIA LTD.', 'https://www.youtube.com/watch?v=I__aclx-KMU', 'I__aclx-KMU', 'https://i.ytimg.com/vi/I__aclx-KMU/hqdefault.jpg', 'youtube', 'general', 442, 0, '2026-05-09 04:10:46'),
(106, '&#39;&#39;UMUGENI BIMUNANIYE GUTERA AKABARIRO ARARIRA NYUMA ARIYAHURA&quot; 😭😭ABABYEYI B&#39;UMUSORE WAPFUYE', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=dPV67p9InaE', 'dPV67p9InaE', 'https://i.ytimg.com/vi/dPV67p9InaE/hqdefault.jpg', 'youtube', 'general', 1245, 0, '2026-05-09 04:10:46'),
(107, 'AMASHUSHO Y&#39;IBITSINA SIBA // WA MUNYAMAKURU DANIEL ARAKAYE CYANE ATANZE INAMA', 'PINMEDIA RWANDA LTD #mamaurwagasabotv #igihe #scovia #chitamagictv #maxtv.', 'https://www.youtube.com/watch?v=Yrx4mHs6zEc', 'Yrx4mHs6zEc', 'https://i.ytimg.com/vi/Yrx4mHs6zEc/hqdefault.jpg', 'youtube', 'general', 97, 0, '2026-05-09 04:10:47'),
(108, 'MUSONERA WASHAKAGA KUBA UMUDEPITE/ URUKIKO RUMUHAMIJE GUKORA JENOSIDE / IGIFUNGO CY&#39;IMYAKA 20', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=rq1fUgCd1Yk', 'rq1fUgCd1Yk', 'https://i.ytimg.com/vi/rq1fUgCd1Yk/hqdefault.jpg', 'youtube', 'general', 177, 0, '2026-05-09 04:10:47'),
(109, 'UMUNYAMAKURU DANIEL ASIBISHIJE VIDEOS Z&#39;UBWAMBURE ZA YAMPANO// AMATEGEKO N&#39;IBIHANO KU BAZIKWIRAKWIZA', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=LkS0lFktH-k', 'LkS0lFktH-k', 'https://i.ytimg.com/vi/LkS0lFktH-k/hqdefault.jpg', 'youtube', 'general', 245, 0, '2026-05-09 04:10:47'),
(110, 'NYANZA: URUKIKO RUFUNZE UMWARIMU WA KAMINUZA IMINSI 30 Y&#39;AGATEGANYO/ AHO AKEKWAHO GUKORERA IBYAHA', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=7dT1N6v-QpI', '7dT1N6v-QpI', 'https://i.ytimg.com/vi/7dT1N6v-QpI/hqdefault.jpg', 'youtube', 'general', 156, 0, '2026-05-09 04:10:47'),
(111, 'URUBANZA RW&#39;UMWARIMU WA KAMINUZA Y&#39;URWANDA WAFUNZWE AZIRA AMABUYE; INDONKE N&#39;IBINDI ATEMERA', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=lEV707wu2iA', 'lEV707wu2iA', 'https://i.ytimg.com/vi/lEV707wu2iA/hqdefault.jpg', 'youtube', 'general', 260, 0, '2026-05-09 04:10:47'),
(112, 'ABAGABO 5 BAKEKWAHO KWICA UMUKECURU BAKAMUTA MU MUSARANE POLISI YABAFUNZE / NYANZA-BUSASAMANA', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=RF_7qHfGO-8', 'RF_7qHfGO-8', 'https://i.ytimg.com/vi/RF_7qHfGO-8/hqdefault.jpg', 'youtube', 'general', 302, 0, '2026-05-09 04:10:48'),
(113, 'Nyanza: Major yashimuse  ikirombe?/ Dogiteri Mugerwa ufunze yagambaniye Major Rugamba na bagenzi be?', 'PINMEDIA RWANDA LTD . Icukumbura ku bibabazo bimaze iminsi bivugwa mu birombe by\'amabuye y\'agaciro byo mu karere ka ...', 'https://www.youtube.com/watch?v=TpiqHm18p8M', 'TpiqHm18p8M', 'https://i.ytimg.com/vi/TpiqHm18p8M/hqdefault.jpg', 'youtube', 'general', 739, 0, '2026-05-09 04:10:48'),
(114, 'KAMONYI: ITSINDA RY&#39;ABITWAZAGA INTWARO GAKONDO BAKIBA, POLISI YARIFASHE/ POLISI ITANZE N&#39;UMUBURO', 'PIN MEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=JbjwNdIWhfo', 'JbjwNdIWhfo', 'https://i.ytimg.com/vi/JbjwNdIWhfo/hqdefault.jpg', 'youtube', 'general', 347, 0, '2026-05-09 04:10:48'),
(115, 'BAMWICISHIJE IFUNI BAPFA AMAFARANGA 1000/ ABAGABO BASHOREYE MUGENZI BAJYA KUMWICA BAFUNZWE', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=FsB5Z1G9uxw', 'FsB5Z1G9uxw', 'https://i.ytimg.com/vi/FsB5Z1G9uxw/hqdefault.jpg', 'youtube', 'general', 130, 0, '2026-05-09 04:10:48'),
(116, 'WA MURAMBO W&#39;UMUKINNYI W&#39;UMUNYARWANDA MUSIRIKARE, ABARUNDI BAWUHAYE UMURYANGO WE/ BARASHIMIRA LETA', 'PIN MEDIA LTD.', 'https://www.youtube.com/watch?v=gi81vdcwiso', 'gi81vdcwiso', 'https://i.ytimg.com/vi/gi81vdcwiso/hqdefault.jpg', 'youtube', 'general', 155, 0, '2026-05-09 04:10:49'),
(117, 'UMURYANGO URWANYA UBUKENE/HOPE OF FAMILY/ UFATANYIJE N&#39; AKARERE GUHEMBA ABAKURU B&#39;IMIDUGUDU/ MUHANGA', 'PIN MEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=eC64VS-QYTI', 'eC64VS-QYTI', 'https://i.ytimg.com/vi/eC64VS-QYTI/hqdefault.jpg', 'youtube', 'general', 76, 0, '2026-05-09 04:10:49'),
(118, 'ABANTU 3 BAPFIRIYE MU KIROMBE/ BARI BAGIYE KWIBA AMABUYE Y&#39;AGACIRO', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=kmivE3JfJ88', 'kmivE3JfJ88', 'https://i.ytimg.com/vi/kmivE3JfJ88/hqdefault.jpg', 'youtube', 'general', 146, 0, '2026-05-09 04:10:49'),
(119, 'POLE SANA: UMUSORE YISHE UMUKUNZI WE/ ABANA 2 B&#39;UMURYANGO UMWE BICIWE RIMWE/ UMUSORE YISHE MUKURU WE', 'PINMEDIA RWANDA LTD POLE SANA: AMAHANO YARANZE ICYUMWERU(Le13-19) 1.Rwamagana: Umusore yishe ateye ...', 'https://www.youtube.com/watch?v=9NxlM729RhI', '9NxlM729RhI', 'https://i.ytimg.com/vi/9NxlM729RhI/hqdefault.jpg', 'youtube', 'general', 153, 0, '2026-05-09 04:10:49'),
(120, 'YISHE ATEMAGUYE MUKURU WE', 'PINMEDIA RWANDA LTD Muhanga-Cyeza le 17/10/2025.', 'https://www.youtube.com/watch?v=okn_hRU1Fw4', 'okn_hRU1Fw4', 'https://i.ytimg.com/vi/okn_hRU1Fw4/hqdefault.jpg', 'youtube', 'general', 125, 0, '2026-05-09 04:10:49'),
(121, 'UMUGABO MWIZA CYANE BAMUSANZE YAPFUYE AMANITSE MU KIZIRIKO //AKOMOKA I GAKENKE - BIBEREYE I MUHANGA', 'PINMEDIA RWANDA LTD Le 11/10/2025/ MUHANGA-SHYOGWE-RULI-KARAMA Umurambo w\'umugabo bawusanze umanitse ...', 'https://www.youtube.com/watch?v=TZ6LUo9ObJ0', 'TZ6LUo9ObJ0', 'https://i.ytimg.com/vi/TZ6LUo9ObJ0/hqdefault.jpg', 'youtube', 'general', 262, 0, '2026-05-09 04:10:50'),
(122, 'RUHANGO:  😭😭😭BAMWICIYE ABANA BABIRI  URW&#39;AGASHINYAGURO UMUNSI UMWE 😭/ AKEKA ABAMUSHINJA AMAROZI', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=mLxLYCPeKkE', 'mLxLYCPeKkE', 'https://i.ytimg.com/vi/mLxLYCPeKkE/hqdefault.jpg', 'youtube', 'general', 799, 0, '2026-05-09 04:10:50'),
(123, 'NGORORERO:  UMUKIRE ASHINJA AKARERE KUMUKUBITISHA NO KUMUHOMBYA AMA MILIYONI/ IMBERE Y&#39;UMUVUNYI', 'PINMEDIA RWANDA LTD Le 13/10/2025. Ngorero kuri sitade, Umushoramari mu bucukuzi bw\'umucanga, atakambiye umuvunyi ...', 'https://www.youtube.com/watch?v=wgqLnUrlsUM', 'wgqLnUrlsUM', 'https://i.ytimg.com/vi/wgqLnUrlsUM/hqdefault.jpg', 'youtube', 'general', 273, 0, '2026-05-09 04:10:50'),
(124, 'MUHANGA: URUKUTA RW&#39;INZU RUGWIRIYE ABANTU UMWE AHITA APFA', 'PINMEDIA RWANDA LTD Le 15/10/2025, Muhanga - Nyamabuye - Nyabisindu.', 'https://www.youtube.com/watch?v=wQRj_IT8ax8', 'wQRj_IT8ax8', 'https://i.ytimg.com/vi/wQRj_IT8ax8/hqdefault.jpg', 'youtube', 'general', 946, 0, '2026-05-09 04:10:50'),
(125, 'NYAMAGABE: ABAKECURU BABYINANYE  NA MINISTER, GOVERNOR NA  MEYA &quot;TURASHIMA UBUYOBOZI BWIZA&quot;', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=ypYwgvyqUX0', 'ypYwgvyqUX0', 'https://i.ytimg.com/vi/ypYwgvyqUX0/hqdefault.jpg', 'youtube', 'general', 57, 0, '2026-05-09 04:10:50'),
(126, 'RUHANGO: UMUGORE AHINDUYE INZU ZA LETA ZARI ZISHAJE IGITANGAZA //AMATEKA YA NIVI/ AZUBAKA NA PISCINE', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=otAiiLfQ458', 'otAiiLfQ458', 'https://i.ytimg.com/vi/otAiiLfQ458/hqdefault.jpg', 'youtube', 'general', 3172, 0, '2026-05-09 04:10:51'),
(127, 'PIN RWANDA', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=XGdfyO_lJbY', 'XGdfyO_lJbY', 'https://i.ytimg.com/vi/XGdfyO_lJbY/hqdefault.jpg', 'youtube', 'general', 138, 0, '2026-05-09 04:10:51'),
(128, 'WA MUKECURU WACIYE URURIMI UMWE MU BAMUSAMBANYAGA KU NGUFU TWAGANIRIYE // POLISI YARABAFASHE 2', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=nYRdAxPs1GI', 'nYRdAxPs1GI', 'https://i.ytimg.com/vi/nYRdAxPs1GI/hqdefault.jpg', 'youtube', 'general', 1710, 0, '2026-05-09 04:10:51'),
(129, 'Ruhango: Umukobwa yahinduye Ikizu cy’Abarundi Resitora igezweho # UBUGARI CORNER/ Cyari ikizu kibi', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=VprrXTZIf54', 'VprrXTZIf54', 'https://i.ytimg.com/vi/VprrXTZIf54/hqdefault.jpg', 'youtube', 'general', 381, 0, '2026-05-09 04:10:51'),
(130, 'UBUHAMYA BW&#39;UMUGORE WAROKOTSE URUPFU/ UMUGABO ASHAKA KUNYICANA.... /ARI GUTABAZA', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=Z4byPRW2uWw', 'Z4byPRW2uWw', 'https://i.ytimg.com/vi/Z4byPRW2uWw/hqdefault.jpg', 'youtube', 'general', 168, 0, '2026-05-09 04:10:52'),
(131, 'INKURU Y&#39;UMUKECURU:  NISE DIREGITERI  KIRADUTEYE 🤣🤣🤣 / ASHIMIYE H.E KAGAME WAHAYE ABAGORE IJAMBO.', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=M9xSN98_ZG0', 'M9xSN98_ZG0', 'https://i.ytimg.com/vi/M9xSN98_ZG0/hqdefault.jpg', 'youtube', 'general', 105, 0, '2026-05-09 04:10:52'),
(132, 'Muhanga:  Umubyeyi abonye inzu ye ibyishimo biramurenga/ Arashimira Ubuyobozi; COMAR n&#39;abaturanyi be', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=uUNT0b6pPsg', 'uUNT0b6pPsg', 'https://i.ytimg.com/vi/uUNT0b6pPsg/hqdefault.jpg', 'youtube', 'general', 451, 0, '2026-05-09 04:10:52'),
(133, 'MUHANGA: NYATURA YICIWE MU GITERO CY&#39;ABARENGA 20 YAGABYE KURI KOMPANYI ICUKURA AMABUYE Y&#39;AGACIRO', 'PINMEDIA RWANDA LTD.', 'https://www.youtube.com/watch?v=RB1To84PmV0', 'RB1To84PmV0', 'https://i.ytimg.com/vi/RB1To84PmV0/hqdefault.jpg', 'youtube', 'general', 2884, 0, '2026-05-09 04:10:52'),
(134, 'IKIBEHO BISHIMIYE BIKIRA MARIA// IKIRERE KIRAHINDUTSE KURI ASOMUSIYO//UMWANA ARIRIMBIYE ABARENGA 70K', 'PINMEDIA RWANDA LTD Ku wa 18 Kanama 2025, i Kibeho.', 'https://www.youtube.com/watch?v=vm9LifsugaM', 'vm9LifsugaM', 'https://i.ytimg.com/vi/vm9LifsugaM/hqdefault.jpg', 'youtube', 'general', 642, 0, '2026-05-09 04:10:52'),
(135, 'DORE INDANI NZIZA // KOMPANYI ZICUKURA  AMABUYE Y&#39;AGACIRO MU RWANDA ZIRAKATAJE MU  GUTUNGANYA MINE', 'Iyi ndani ni iya Kompanyi yitwa \"INTERAFRICAN MINING CORPORATION(IMC) icukura amabuye y\'agaciro mu murenge wa ...', 'https://www.youtube.com/watch?v=syCiyBPRS0Y', 'syCiyBPRS0Y', 'https://i.ytimg.com/vi/syCiyBPRS0Y/hqdefault.jpg', 'youtube', 'general', 337, 0, '2026-05-09 04:10:53'),
(136, 'MUHANGA-KABACUZI: BAKIRIYE RIB NA RMB MU MBYINO N&#39;IBYISHIMO BYINSHI', 'Le 05/08/2025, Mu bukangurambaga RIB na RMB bakoreye mu karere ka Muhanga , mu murenge wa Kabacuzi bugamije ...', 'https://www.youtube.com/watch?v=-6wgpbyc7UE', '-6wgpbyc7UE', 'https://i.ytimg.com/vi/-6wgpbyc7UE/hqdefault.jpg', 'youtube', 'general', 433, 0, '2026-05-09 04:10:53'),
(137, 'MENYA ICYO WAKORA UBONYE AMABUYE Y&#39;AGACIRO MU ISAMBU YAWE- RMB IRAGISOBANUYE  /MUHANGA 04-08-2025', 'Mu bukangurambaga bugamije kurwanya ibyaha bihungabanya ibidukikije n\'ibindi byaha by\'inzaduka buri gukorwa n\' Urwego ...', 'https://www.youtube.com/watch?v=Zbow6JZzZF0', 'Zbow6JZzZF0', 'https://i.ytimg.com/vi/Zbow6JZzZF0/hqdefault.jpg', 'youtube', 'general', 88, 0, '2026-05-09 04:10:53'),
(138, 'UMUPFUMU ABESHYE KO URUHEREKO RWE RUFASHE UMUJURA NONE BIMUKOZEHO / KAMONYI; NYAMIYAGA KIDAHWE', 'Umugabo yahobeye insina igihe kinini abaturage barahurura bakeka ko yafashwe n\'uruhereko nyuma basanga ni imitwe ...', 'https://www.youtube.com/watch?v=aM7IbZ_HRLA', 'aM7IbZ_HRLA', 'https://i.ytimg.com/vi/aM7IbZ_HRLA/hqdefault.jpg', 'youtube', 'general', 233, 0, '2026-05-09 04:10:53'),
(139, 'IMIYOBORERE YA H.E PAUL KAGAME IMVANO Y&#39;IBYISHIMO BY&#39;ABABA MU BYARO BYA RUHANGO/IREBERE ABANA NA SE', 'Abatuye mu kagari ka Ntenyo ko mu murenge wa Byimana mu karere ka Ruhango, Taliki ya 8 Nyakanga 2025 ubwo basurwaga ...', 'https://www.youtube.com/watch?v=oORg-tavvsA', 'oORg-tavvsA', 'https://i.ytimg.com/vi/oORg-tavvsA/hqdefault.jpg', 'youtube', 'general', 55, 0, '2026-05-09 04:10:54'),
(140, 'UWAZURA KAYIBANDA &amp; HABYARIMANA BASABA IMANA KUBASUBIZA MU MVA/HON.MUKAMA NA MUDUGUDU BACIYE IBIHUHA', 'Umuvunyi wungirije ushinzwe kurwanya ruswa Hon .MUKAMA Abbas hamwe na Mudugudu wo mu murenge wa Byimana mu ...', 'https://www.youtube.com/watch?v=KzyKBbznwbU', 'KzyKBbznwbU', 'https://i.ytimg.com/vi/KzyKBbznwbU/hqdefault.jpg', 'youtube', 'general', 424, 0, '2026-05-09 04:10:54'),
(141, 'RUHANGO: REBA ABAYOBOZI MU NGABO, RIB N&#39;AKARERE BAMBIKA  IMIDARI ABASIZE ABANDI MU MAGARE NO KWIRUKA', 'PIN RWANDA Le 04/07/2025 mu birori byo kwizihiza umunsi wo kwibohora , abaturage b\'akarere ka Ruhango bari bishimye ...', 'https://www.youtube.com/watch?v=ZCfLELSeeGU', 'ZCfLELSeeGU', 'https://i.ytimg.com/vi/ZCfLELSeeGU/hqdefault.jpg', 'youtube', 'general', 844, 0, '2026-05-09 04:10:54'),
(142, 'BREAKING NEWS: IKIBUGA CY&#39;INDEGE CYA RUHANGO KIZUBAKWA I RWOGA/ MEYA ATANZE AMAKURU', 'PIN RWANDA. Leta y\' u Rwanda irateganya kubaka Ikibuga cy\'indege nini mu karere ka Ruhango, mu murenge wa Ruhango, mu ...', 'https://www.youtube.com/watch?v=T5C5XAvNMzI', 'T5C5XAvNMzI', 'https://i.ytimg.com/vi/T5C5XAvNMzI/hqdefault.jpg', 'youtube', 'general', 1629, 0, '2026-05-09 04:10:54'),
(143, 'IKIGANIRO N&#39;ABASIRIKARI B&#39;UBURUNDI;UGANDA;TANZANIA NA KENYA BARI INYANZA MURI EAC CIMIC WEEK', '5th EAC CIMIC WEEK/NYANZA-RWANDA, 29 June 2025- 03 July 2025.', 'https://www.youtube.com/watch?v=KMT0t32C_O8', 'KMT0t32C_O8', 'https://i.ytimg.com/vi/KMT0t32C_O8/hqdefault.jpg', 'youtube', 'general', 668, 0, '2026-05-09 04:10:55'),
(144, 'RWANDA-NYANZA: ABASIRIKARE B&#39;UBURUNDI;TANZANIA;UGANDA, KENYA NA RDF, BARI KUVURA ABATURAGE KU BUNTU', 'Biciye muri EAC CIMIC Week(EAC Civil Miltary Cooperation week) inzobere z\'aganga ziturutse mu ngabo z\'ibihugu bitandukanye ...', 'https://www.youtube.com/watch?v=p2Y6hhthnAA', 'p2Y6hhthnAA', 'https://i.ytimg.com/vi/p2Y6hhthnAA/hqdefault.jpg', 'youtube', 'general', 360, 0, '2026-05-09 04:10:55'),
(145, 'INZU YO MU RWANDA YASHYIZWE MURI 24 NZIZA KURUSHA IZINDI KU ISI', 'PIN RWANDA INZU YO MU RWANDA YASHYIZWE MURI 24 NZIZA KURUSHA IZINDI KU ISI.', 'https://www.youtube.com/watch?v=Ts0FKLn9dog', 'Ts0FKLn9dog', 'https://i.ytimg.com/vi/Ts0FKLn9dog/hqdefault.jpg', 'youtube', 'general', 100, 0, '2026-05-09 04:10:55'),
(146, 'DIOR OG, UMUKARANI WIYEMEJE  KWITWARA NK&#39;ABA SITARI  AVUYE GUSURA ABABYEYI I  MUHANGA NYABINONI 🤣🤣🤣🤣', 'RELAX.', 'https://www.youtube.com/watch?v=CUSBgRaWZz8', 'CUSBgRaWZz8', 'https://i.ytimg.com/vi/CUSBgRaWZz8/hqdefault.jpg', 'youtube', 'general', 146, 0, '2026-05-09 04:10:55'),
(147, 'NGORORERO: CYOME YOSE BAMAZE KUYISENYA BAHUNGA IBIZA', 'Cyome ni santer iri mu murenge wa Gatumba mu karere ka Ngororero, akarere katangaje ko ubuyobozi bwanzuye ko abaturage ...', 'https://www.youtube.com/watch?v=bvupHT7qIeE', 'bvupHT7qIeE', 'https://i.ytimg.com/vi/bvupHT7qIeE/hqdefault.jpg', 'youtube', 'general', 697, 0, '2026-05-09 04:10:55'),
(148, 'MUHANGA: UMUGORE UHUMEKERA MU GUTWI ARI GUSHINJA GITIFU IYICARUBOZO.', 'PIN RWANDA. MUHANGA: UMUGORE AHUMEKERA MU GUTWI ARI GUSHINJA GITIFU IYICARUBOZO. Dore iByatumye RIB ...', 'https://www.youtube.com/watch?v=b2hBYGGw-wc', 'b2hBYGGw-wc', 'https://i.ytimg.com/vi/b2hBYGGw-wc/hqdefault.jpg', 'youtube', 'general', 384, 0, '2026-05-09 04:10:56'),
(149, 'YAMUNYARAGAHO, INKURU Y&#39;IHOHETERA UMUKINYI WA RUHANGO ASHINJWA GUKORERA UMUGORE/ @IGIHE_Official', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=jMNIJHUpP_U', 'jMNIJHUpP_U', 'https://i.ytimg.com/vi/jMNIJHUpP_U/hqdefault.jpg', 'youtube', 'general', 120, 0, '2026-05-09 04:10:56'),
(150, '1. KANZUNGU WISHE ABANTU 14 AGIYE KONGERA KUBURANA/2.UMU WAZALENDO YARASHE SE NAWE BAMWICISHA INKONI', 'AMAKURU MU BITANGAZAMAKURU: 1 KANZUNGU WISHE ABANTU 14 AGIYE KONGERA KUBURANA 2.UMU WAZALENDO ...', 'https://www.youtube.com/watch?v=8wBj572SirQ', '8wBj572SirQ', 'https://i.ytimg.com/vi/8wBj572SirQ/hqdefault.jpg', 'youtube', 'general', 94, 0, '2026-05-09 04:10:56'),
(151, 'NYANZA: UMUYOBOZI W&#39;ISHURI YARATOROTSE- NYIRI SAINTE TRINITE NYANZA TSS ASOBANURA UBUHEMU ASHINJWA.', 'Uwari umuyobozi wa SAINTE TRINITE NYANZA TSS arashinja nyiri iri shuri ubuhemu no kwiba ababyeyi n\'ibindi, nyiri iri shyuri ...', 'https://www.youtube.com/watch?v=BgIgLx0TC68', 'BgIgLx0TC68', 'https://i.ytimg.com/vi/BgIgLx0TC68/hqdefault.jpg', 'youtube', 'general', 1299, 0, '2026-05-09 04:10:57'),
(152, 'AMAKURU/ NYAGATARE: UMUGABO YISHE UMUGORE N&#39;ABANA BE 2 NAWE ARIYAHURA/COVID 19 YAGARUTSE MU RWANDA', '1. NYAGATARE: UMUGABO YISHE UMUGORE N\'ABANA 2 NAWE ARIYAHURA 2. COVID-19 YAGARUTSE MU RWANDA 3.', 'https://www.youtube.com/watch?v=H6fCrjSYerY', 'H6fCrjSYerY', 'https://i.ytimg.com/vi/H6fCrjSYerY/hqdefault.jpg', 'youtube', 'general', 705, 0, '2026-05-09 04:10:57'),
(153, 'MUHANGA: UMWANA W&#39;IMYAKA 9 BARAKEKA KO YIYAHUYE AGAPFA/BASANZE AMANITSE KU MUGOZI BANIKAHO IMYENDA', 'Umwana w\'imyaka 9 y\'amavuko, ababyeyi bamurera batuye mu mujyi wa Muhanga, mu murenge wa Nyamabuye mu kagari ka ...', 'https://www.youtube.com/watch?v=YdWQpEpFDXI', 'YdWQpEpFDXI', 'https://i.ytimg.com/vi/YdWQpEpFDXI/hqdefault.jpg', 'youtube', 'general', 249, 0, '2026-05-09 04:10:57'),
(154, 'KAMONYI: UMUGABO YAGIYE GUSAMBANA APFIRAYO/NI AGAHINDA, UMUGORE WE YAJE GUTABARA/RUKOMA-MUREHE', 'UMUGABO UKOMOKA MU , MU KARERE KA KAMONYI, ABATURAGE BAMUSANZE YAPFIRIYE MU KIRARO CY\'INGURUBE ...', 'https://www.youtube.com/watch?v=XpNsh6vVdl4', 'XpNsh6vVdl4', 'https://i.ytimg.com/vi/XpNsh6vVdl4/hqdefault.jpg', 'youtube', 'general', 863, 0, '2026-05-09 04:10:57'),
(155, 'KUNYWA IMITI IGABANYA UBUSHAKE BWO GUTERA AKABARIRO, BISHOBORA KUGIRWA IGIHANO MU BWONGEREZA', 'PIN RWANDA KUNYWA IMITI IGABANYA UBUSHAKE BWO GUTERA AKABARIRO, BISHOBORA KUGIRWA IGIHANO MU ...', 'https://www.youtube.com/watch?v=XFhk5sJJp0Y', 'XFhk5sJJp0Y', 'https://i.ytimg.com/vi/XFhk5sJJp0Y/hqdefault.jpg', 'youtube', 'general', 82, 0, '2026-05-09 04:10:57'),
(156, 'INKURU ZIDASANZWE ZARANZE ICYUMWERU:   PEREZIDA PAUL KAGAME YASUYE IKIROMBE CY&#39;AMABUYE Y&#39;AGACIRO', 'INKURU ZIDASANZWE ZARANZE ICYUMWERU. 1.Perezida KAGAME yasuye ikirombe cy\'amabuye y\'agaciro. 2. KNC yavuze ko ...', 'https://www.youtube.com/watch?v=kxPxsTize0g', 'kxPxsTize0g', 'https://i.ytimg.com/vi/kxPxsTize0g/hqdefault.jpg', 'youtube', 'general', 142, 0, '2026-05-09 04:10:58'),
(157, 'INZIRA ITEYE ISERERI IVA NYAMAGABE MURI MBAZI IJYA I KADUHA/UMUHANDA WARACITSE.', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=-xr8r0LQhj4', '-xr8r0LQhj4', 'https://i.ytimg.com/vi/-xr8r0LQhj4/hqdefault.jpg', 'youtube', 'general', 522, 0, '2026-05-09 04:10:58'),
(158, 'INZIRA ITEYE UBWOBA  I NYAMAGABE', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=WPhLb5bqgHc', 'WPhLb5bqgHc', 'https://i.ytimg.com/vi/WPhLb5bqgHc/hqdefault.jpg', 'youtube', 'general', 330, 0, '2026-05-09 04:10:58'),
(159, 'REBA INDANI Y&#39;UMUHEBYI WA NGORORERO N&#39;UWA MUHANGA UTUBWIRE ITEYE UBWOBA KURUSHA INDI UTAKWINJIRAMO', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=B6LDNvN3ozo', 'B6LDNvN3ozo', 'https://i.ytimg.com/vi/B6LDNvN3ozo/hqdefault.jpg', 'youtube', 'general', 168, 0, '2026-05-09 04:10:58'),
(160, 'BREAKING NEWS: BA BAKIRE 7 BOSE  BAKORA MU MABUYE Y&#39;AGACIRO, URUKIKO RUFASHE UMWANZURO UBAFUNGA', 'Urukiko rw\'ibibanze rwa Kicukiro rufashe umwanzuro ufunga iminsi 30 y\'agateganyo abakozi 3 ba RMB, KANYANGIRA John; ...', 'https://www.youtube.com/watch?v=prEgfqhTY2A', 'prEgfqhTY2A', 'https://i.ytimg.com/vi/prEgfqhTY2A/hqdefault.jpg', 'youtube', 'general', 457, 0, '2026-05-09 04:10:59'),
(161, 'IMITUNGO IRIMO ETAJE 2 YA MILIYONI 800FRW+, UMUKOZI WA LETA JOHN YAYIKUYE HE? ABAKIRE 7 PART1,2,3', 'URUBANZA RWOSE RW\'ABAKIRE 7 BAKORA MU MABUYE Y\'AGACIRO PART1;2&3. IMITUNGO IRIMO ETAJE 2 YA MILIYONI ...', 'https://www.youtube.com/watch?v=oZKjpoINhIU', 'oZKjpoINhIU', 'https://i.ytimg.com/vi/oZKjpoINhIU/hqdefault.jpg', 'youtube', 'general', 640, 0, '2026-05-09 04:10:59'),
(162, 'KIGALI: HAMURITSWE IMBUNDA ZIRIMO IBIFARU/ RAYON SPORT IHAWE IBIHANO', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=vV-MzdLNxvg', 'vV-MzdLNxvg', 'https://i.ytimg.com/vi/vV-MzdLNxvg/hqdefault.jpg', 'youtube', 'general', 508, 0, '2026-05-09 04:10:59'),
(163, 'RGB IBUJIJE KILIZIYA GATORIKA GUKORERA AMASENGESHO KWA  YEZU NYIRIMPUHWE MU RUHANGO BY&#39;AGATEGANYO', '', 'https://www.youtube.com/watch?v=QftwKBvIiHc', 'QftwKBvIiHc', 'https://i.ytimg.com/vi/QftwKBvIiHc/hqdefault.jpg', 'youtube', 'general', 4309, 0, '2026-05-09 04:10:59');
INSERT INTO `videos` (`id`, `title`, `description`, `video_url`, `youtube_video_id`, `thumbnail`, `type`, `category`, `views`, `is_live`, `created_at`) VALUES
(164, 'PART3: MU RUBANZA RW’ABAKIRE 7/ UMWAVOKA AVUZE KO  JONAS YAFUNZWE MU BURYO BUNYURANYE N’AMATEGEKO', '', 'https://www.youtube.com/watch?v=FbQ-eKfvLBw', 'FbQ-eKfvLBw', 'https://i.ytimg.com/vi/FbQ-eKfvLBw/hqdefault.jpg', 'youtube', 'general', 701, 0, '2026-05-09 04:10:59'),
(165, 'PART2: MU RUBANZA RW&#39;ABAKIRE 7 BAFUNGIYE I KIGALI/ UKO BIREGUYE / KAMANZI UYOBIRA RMB AVUZWEHO', 'Iki gice cya kabiri gikubiyemo uko abakozi ba RMB bisobanuye ku byaha bashinjwa birimo Gusaba no kwakira indonke ...', 'https://www.youtube.com/watch?v=3IyXhT6jdH8', '3IyXhT6jdH8', 'https://i.ytimg.com/vi/3IyXhT6jdH8/hqdefault.jpg', 'youtube', 'general', 668, 0, '2026-05-09 04:11:00'),
(166, 'AMAKURU: UMUSIRIKARE URINDA PEREZIDA YISHE ABASIRIKARE 3 /RIB YIHANANGIRIJE REGIS NA SAM KARENZI', '1.RIB YIHANANGIRIJE ABANYAMAKURU Sam KARENZI na MURAMIRA Regis 2. UMUSIRIKARE YARASHE BAGENZI BE ...', 'https://www.youtube.com/watch?v=mTU7icOv8SY', 'mTU7icOv8SY', 'https://i.ytimg.com/vi/mTU7icOv8SY/hqdefault.jpg', 'youtube', 'general', 437, 0, '2026-05-09 04:11:00'),
(167, 'URUBANZA RW&#39;ABAKIRE 7 BAFUNGIYE I KIGALI BAKORA MU MABUYE Y&#39;AGACIRO/ BATUNZE AMAMILIYALI/  PART1', 'URUBANZA RW\'ABAKIRE 7 BAKORA MU MABUYE Y\'AGACIRO BARIMO N\'ABAKOZI BA RMB: KANYANGIRA John; ...', 'https://www.youtube.com/watch?v=AJghl9GWnc8', 'AJghl9GWnc8', 'https://i.ytimg.com/vi/AJghl9GWnc8/hqdefault.jpg', 'youtube', 'general', 2295, 0, '2026-05-09 04:11:00'),
(168, 'BIRATANGAJE', 'Kora subscribe kuri PIN RWANDA, utange igitekerezo, ukore Like na share niba wishimiye kuduteza imbere.', 'https://www.youtube.com/watch?v=H_7GAWfXzSU', 'H_7GAWfXzSU', 'https://i.ytimg.com/vi/H_7GAWfXzSU/hqdefault.jpg', 'youtube', 'general', 151, 0, '2026-05-09 04:11:00'),
(169, 'BIRATANGAJE, UMVA UKO IMANA IZAMUHA UMUGABO /ARANATURIRIMBIYE', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=k-NENnl0rHk', 'k-NENnl0rHk', 'https://i.ytimg.com/vi/k-NENnl0rHk/hqdefault.jpg', 'youtube', 'general', 277, 0, '2026-05-09 04:11:00'),
(170, 'WA MUSAZA USABA MILIYONI 700FRW KU KIBAZA KWA #YEZU NYIRIMPUWE BASHAKA ARAHADUTEMBEREJE/MU RUHANGO', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=EmZxR_QZhII', 'EmZxR_QZhII', 'https://i.ytimg.com/vi/EmZxR_QZhII/hqdefault.jpg', 'youtube', 'general', 622, 0, '2026-05-09 04:11:01'),
(171, 'KAMONYI:  BARAMUSATSE BIRANGIRA AFUNZWEE', 'UMUTURAGE WO MU KARERE KA KAMONYI MU MURENGE WA KAYUMBU BARAMUSATSE BITANGIRA BAMUJYANYE KU ...', 'https://www.youtube.com/watch?v=n_iXNQjs4Xk', 'n_iXNQjs4Xk', 'https://i.ytimg.com/vi/n_iXNQjs4Xk/hqdefault.jpg', 'youtube', 'general', 26, 0, '2026-05-09 04:11:01'),
(172, 'ABATEMYE ABANTU 8 I NYANZA, POLISI YATANGIYE GUFATA ABAKEKWA', '', 'https://www.youtube.com/watch?v=U_2DAYoC-Cg', 'U_2DAYoC-Cg', 'https://i.ytimg.com/vi/U_2DAYoC-Cg/hqdefault.jpg', 'youtube', 'general', 185, 0, '2026-05-09 04:11:01'),
(173, 'RUHANGO: ABARUNDI BISHE UMUSAZA GASANGWA  BAMURYA UMUTIMA, BICA N&#39;ABANDI BATUTSI MU 1994 / UBUHAMYA', 'UWAMBAJIMANA Jeanne, ubu buhamya yatangiye i Kinazi mu Ruhango Le 20/04/2025 mu kwibuka ku nshuro ya 31 Jenoside ...', 'https://www.youtube.com/watch?v=Up0K2MTYE98', 'Up0K2MTYE98', 'https://i.ytimg.com/vi/Up0K2MTYE98/hqdefault.jpg', 'youtube', 'general', 160, 0, '2026-05-09 04:11:01'),
(174, 'ICYUMBA CY&#39;UMUKOBWA, INDANI NZIZA: IBISHIMISHA ABAKOBWA N&#39;ABAGORE 100 BAKORA MURI BIG MINING/RUHANGO', 'Kompanyi icukura amabuye y\'agaciro mu karere ka Ruhango yitwa BIG MINING COMPANY LTD ni imwe muri kompanyi ...', 'https://www.youtube.com/watch?v=konBWB8V1D8', 'konBWB8V1D8', 'https://i.ytimg.com/vi/konBWB8V1D8/hqdefault.jpg', 'youtube', 'general', 401, 0, '2026-05-09 04:11:01'),
(175, 'KU MIPAKA YA RDC N&#39;U RWANDA, RUVANYEHO INGAMBA Z’UBWIRINZI BYAGENDA BITE? Hon. DUSINGIZEMUNGU', 'Iki ni igice gito cy\'ikiganiro Hon.DUSINGIZEMUNGU Jean Pierre yatangiye mu Ruhango le 20/04/2025 mu bikorwa byo kwibuka ...', 'https://www.youtube.com/watch?v=7WsW4B2B1OI', '7WsW4B2B1OI', 'https://i.ytimg.com/vi/7WsW4B2B1OI/hqdefault.jpg', 'youtube', 'general', 105, 0, '2026-05-09 04:11:02'),
(176, '🤔😩BARAMUZIRITSE UWO BASHINJA KWIBA / MUHANGA / RONGI/ RUHANGO/ MUYEBE', '', 'https://www.youtube.com/watch?v=G1qKoZI2eIw', 'G1qKoZI2eIw', 'https://i.ytimg.com/vi/G1qKoZI2eIw/hqdefault.jpg', 'youtube', 'general', 77, 0, '2026-05-09 04:11:02'),
(177, 'INDIRIMBO YA MUSINGA “MWAKIRE INDABO”ARAYIRIRIMBYE -AMAYAGA  #kwibuka31', 'kwibuka31 / Ruhango-Amayaga, Le 20/4/2025.', 'https://www.youtube.com/watch?v=qgzEg6gXFBg', 'qgzEg6gXFBg', 'https://i.ytimg.com/vi/qgzEg6gXFBg/hqdefault.jpg', 'youtube', 'general', 529, 0, '2026-05-09 04:11:02'),
(178, 'BYARI BIMUKOZEHO UMUGORE UFITE URUKUNDO/ YABESHYE ARENGERE UMURYANGO WE', 'Uyu mugore wo mu karere ka Muhanga, mu murenge wa Nyamabuye mu kagari ka Remera yabeshye abantu ko yabyaye mu ...', 'https://www.youtube.com/watch?v=d9vgHQ2-rBw', 'd9vgHQ2-rBw', 'https://i.ytimg.com/vi/d9vgHQ2-rBw/hqdefault.jpg', 'youtube', 'general', 1444, 0, '2026-05-09 04:11:02'),
(179, 'WA MUKOBWA WASAMBANYE N&#39;UMUGABO WA MUKURU WE,🤔BOSE TWAGANIRIYE/ PART1', 'Iyi nkuru ifata umuzi mu karere ka Muhanga, mu murenge wa Nyamabuye, mu kagari ka Remera, PIN Rwanda twatangiye ...', 'https://www.youtube.com/watch?v=WqWSCWcdLbQ', 'WqWSCWcdLbQ', 'https://i.ytimg.com/vi/WqWSCWcdLbQ/hqdefault.jpg', 'youtube', 'general', 5882, 0, '2026-05-09 04:11:03'),
(180, 'ABASIRIKARE B’ABABILIGI BASIGIYE ABATUTSI ABICANYI I NDERA /UBUHAMYA', 'kwibuka31 , Ubuhamya bwatanzwe na USABYE Grace, umwe mu bari bahungiye muri Caraes-Ndera asobanura ubugome ...', 'https://www.youtube.com/watch?v=M2FEh5GaHzE', 'M2FEh5GaHzE', 'https://i.ytimg.com/vi/M2FEh5GaHzE/hqdefault.jpg', 'youtube', 'general', 568, 0, '2026-05-09 04:11:03'),
(181, 'Ruhango: Meya asobanuriye abaturage uburyo leta ya Congo yanga Abatutsi n&#39;Abanyamulenge #kwibuka31', 'kwibuka31: Ubutumwa bwa Meya wa Ruhango HABARUREMA Valens Le 07/04/2025 asobanurira abaturage bo mu karere ka ...', 'https://www.youtube.com/watch?v=Y-_0GUfo_wg', 'Y-_0GUfo_wg', 'https://i.ytimg.com/vi/Y-_0GUfo_wg/hqdefault.jpg', 'youtube', 'general', 190, 0, '2026-05-09 04:11:03'),
(182, 'IMFURA YIRINDA UMUTIMA NDA/ PEREZIDA WA IBUKA MU RUHANGO #kwibuka31', 'Kwibuka31# Ubutumwa bwa Perezida w\'umuryango Ibibuka mu karere ka Ruhango Me.NYANDWI Bernard.', 'https://www.youtube.com/watch?v=6fF39FnkzBU', '6fF39FnkzBU', 'https://i.ytimg.com/vi/6fF39FnkzBU/hqdefault.jpg', 'youtube', 'general', 266, 0, '2026-05-09 04:11:03'),
(183, 'UBUGOME BW&#39;INTERAHAMWE/UBUHAMYA-UWAROKOTSE JENOSIDE YAKOREWE ABATUTSI', 'MUKAYIRANGA Jeannette wo mu karere ka Ruhango, mu murenge wa Kabagari warokotse jenoside yakorewe Abatutsi , ubu ...', 'https://www.youtube.com/watch?v=sEww7fdiY2s', 'sEww7fdiY2s', 'https://i.ytimg.com/vi/sEww7fdiY2s/hqdefault.jpg', 'youtube', 'general', 254, 0, '2026-05-09 04:11:03'),
(184, 'WA MUGENI WIMYE UMUGABO AKAHUKANA / BOSE TWAHUYE/ UBUKWE BWABO', '0791415823# Iyo nimero ni iya Leonard MPITABAZENGA bahimba Kevin. Uramutse ufite akazi k\'amaboko wamuha nk\'uko ...', 'https://www.youtube.com/watch?v=4ZqA1r2tNPQ', '4ZqA1r2tNPQ', 'https://i.ytimg.com/vi/4ZqA1r2tNPQ/hqdefault.jpg', 'youtube', 'general', 65794, 0, '2026-05-09 04:11:04'),
(185, 'KURWANA BIBI😩, IMIRWANO I MUHANGA -RUVUMERA LE 31 03 2025 /BARAPFA IKI?', '', 'https://www.youtube.com/watch?v=1OY3sOHakNs', '1OY3sOHakNs', 'https://i.ytimg.com/vi/1OY3sOHakNs/hqdefault.jpg', 'youtube', 'general', 360, 0, '2026-05-09 04:11:04'),
(186, 'IMIRWANO YABYAYE URUPFU I NYAMIRAMBO YA MUHANGA/ABASORE BAPFUYE 300FRW', 'Umusore w\'imyaka 19 y\'amavuko wo mu kagari ka Nyamirambo , mu murenge wa Rongi, mu karere ka Muhanga yapfuye ...', 'https://www.youtube.com/watch?v=RL5tet-DYBI', 'RL5tet-DYBI', 'https://i.ytimg.com/vi/RL5tet-DYBI/hqdefault.jpg', 'youtube', 'general', 113, 0, '2026-05-09 04:11:04'),
(187, 'ABAGORE N&#39;ABAKOBWA BATINYA KO ABAGABO BABAVURA ZIMWE NDWARA/UBUHAMYA', '', 'https://www.youtube.com/watch?v=Xvlv_xk-zZY', 'Xvlv_xk-zZY', 'https://i.ytimg.com/vi/Xvlv_xk-zZY/hqdefault.jpg', 'youtube', 'general', 278, 0, '2026-05-09 04:11:04'),
(188, 'KORA SUBSCRIBE KURI PIN RWANDA.', 'Tubahaye ikaze kuri PIN RWANDA.', 'https://www.youtube.com/watch?v=wX3AolRxKVk', 'wX3AolRxKVk', 'https://i.ytimg.com/vi/wX3AolRxKVk/hqdefault.jpg', 'youtube', 'general', 185, 0, '2026-05-09 04:11:04'),
(189, 'RUSIZI: MEYA UTOWE NI INTWARI Y’IGIHUGU /UBUHAMYA YATANZE I NYANGE', 'SINDAYIHEBA Phanuel umwe mu banyeshuri b\'i Nyange 47 bari mu ntwari z\'igihugu zo mu cyiciro cy\'Imena , Mu matora yabaye ...', 'https://www.youtube.com/watch?v=CqeOONLWTwU', 'CqeOONLWTwU', 'https://i.ytimg.com/vi/CqeOONLWTwU/hqdefault.jpg', 'youtube', 'general', 489, 0, '2026-05-09 04:11:05'),
(190, 'UMUKOBWA AROKOTSE IGISIMU KICA UMUGABO ARIGISE /KABACUZI -MUHANGA', 'ITANGISHAKA wo mu karere ka Muhanga mu murenge wa kabacuzi ahazwi nko mu bahozi yarigise aho yacukuraga amabuye ...', 'https://www.youtube.com/watch?v=61vb-NE5XRU', '61vb-NE5XRU', 'https://i.ytimg.com/vi/61vb-NE5XRU/hqdefault.jpg', 'youtube', 'general', 7072, 0, '2026-05-09 04:11:05'),
(191, '&quot;MUREBE UMUSAZA WAKUYEHO&quot; ABAMUBONA /AFITE IMPANO', 'Umusaza BAGABOBARABONA Ramadhan wo mu karere ka Ngororero mu murenge wa Gatumba afite impano yo kuririmba ...', 'https://www.youtube.com/watch?v=5ivgMk_CRM8', '5ivgMk_CRM8', 'https://i.ytimg.com/vi/5ivgMk_CRM8/hqdefault.jpg', 'youtube', 'general', 431, 0, '2026-05-09 04:11:05'),
(192, 'ABANYESHURI LE 18 03 2025 BIZIHIZA UBUTWARI BW&#39;ABANYESHURI B&#39;INYANGE', '', 'https://www.youtube.com/watch?v=Apre5J94emw', 'Apre5J94emw', 'https://i.ytimg.com/vi/Apre5J94emw/hqdefault.jpg', 'youtube', 'general', 1306, 0, '2026-05-09 04:11:05'),
(193, 'UBUTWARI NI IKI? / François NGARAMBE I NYANGE le 18 03 2025', '', 'https://www.youtube.com/watch?v=B8RU1Qk-pZY', 'B8RU1Qk-pZY', 'https://i.ytimg.com/vi/B8RU1Qk-pZY/hqdefault.jpg', 'youtube', 'general', 143, 0, '2026-05-09 04:11:05'),
(194, 'KOMONYI: UMUSHOFERI YISHWE / HARAKEKWA ABARIMO UMUNYONZI LE 16 03 2025', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=Wdl5XwAxR5E', 'Wdl5XwAxR5E', 'https://i.ytimg.com/vi/Wdl5XwAxR5E/hqdefault.jpg', 'youtube', 'general', 514, 0, '2026-05-09 04:11:06'),
(195, 'Perezida Kagame na Tshisekedi bahuriye muri Qatar', 'PIN RWANDA.', 'https://www.youtube.com/watch?v=shBRdnkiQwM', 'shBRdnkiQwM', 'https://i.ytimg.com/vi/shBRdnkiQwM/hqdefault.jpg', 'youtube', 'general', 79, 0, '2026-05-09 04:11:06'),
(196, 'ABACENGEZI BISHE ABANYESHURI B&#39;INYANGE   LE 18 03 1997/ UMUKINO', '', 'https://www.youtube.com/watch?v=3MvSw9KXoMc', '3MvSw9KXoMc', 'https://i.ytimg.com/vi/3MvSw9KXoMc/hqdefault.jpg', 'youtube', 'general', 338322, 0, '2026-05-09 04:11:06'),
(197, 'DORE IBITUMYE U RWANDA RWIRUKANA ABADIPOLOMATE 48 B&#39;U BUBILIGI.', '', 'https://www.youtube.com/watch?v=wbNOrOIjmVU', 'wbNOrOIjmVU', 'https://i.ytimg.com/vi/wbNOrOIjmVU/hqdefault.jpg', 'youtube', 'general', 41, 0, '2026-05-09 04:11:06'),
(198, 'INKOMOKO YA ZAHABU MU RWANDA N&#39;ANDI MABUYE Y&#39;AGACIRO/ RMB', '', 'https://www.youtube.com/watch?v=BMJyxgzIfLg', 'BMJyxgzIfLg', 'https://i.ytimg.com/vi/BMJyxgzIfLg/hqdefault.jpg', 'youtube', 'general', 74, 0, '2026-05-09 04:11:06'),
(199, 'KAMONYI: HARI ABACUKUZI BATABAZA BASHINJA IMC KUBARENGANYA', 'IMC, kompanyi icukura amabuye y\'agaciro ikorera muri Kamonyi na Muhanga, abacukuzi bayo bamwe barayishinja kubakorera ...', 'https://www.youtube.com/watch?v=NaAbOPUftF8', 'NaAbOPUftF8', 'https://i.ytimg.com/vi/NaAbOPUftF8/hqdefault.jpg', 'youtube', 'general', 195, 0, '2026-05-09 04:11:07'),
(200, 'NGORORERO: BATEGETSWE GUSENYA CYOME YOSE /AKARERE KARI KUBARINDA IBIZA', '', 'https://www.youtube.com/watch?v=RpxxSapqOWU', 'RpxxSapqOWU', 'https://i.ytimg.com/vi/RpxxSapqOWU/hqdefault.jpg', 'youtube', 'general', 22467, 0, '2026-05-09 04:11:07'),
(201, 'KAMONYIU:  INKURU Y’UWISHWE N&#39;IKIROMBE CYA DEMICO', 'Inkuru y\'urupfu rwa NSENGIYAREMYE Emmanuel wakoraga mu buryo bwa Nyakabyizi muri kompanyi icukura amabuye ...', 'https://www.youtube.com/watch?v=A_eOx6liuKc', 'A_eOx6liuKc', 'https://i.ytimg.com/vi/A_eOx6liuKc/hqdefault.jpg', 'youtube', 'general', 25, 0, '2026-05-09 04:11:08'),
(202, 'NGO YIHAGARIKAGA  AMARASO/ USHINJA  ABAKOZI BA I.M.C KUMUKUBITA.', 'Umusore wo muri Kamonyi mu murenge wa Kayumbu avuga ko yakubiswe n\'abakozi ba Kompanyi icukura amabuye y\'agaciro ...', 'https://www.youtube.com/watch?v=FU0eQZkA1Ns', 'FU0eQZkA1Ns', 'https://i.ytimg.com/vi/FU0eQZkA1Ns/hqdefault.jpg', 'youtube', 'general', 158, 0, '2026-05-09 04:11:08'),
(203, 'MUHANGA: BISHE UMUKECURU BAMUKASE IJOSI, ABAGIZI BA NABI', '', 'https://www.youtube.com/watch?v=XXVehhvydAk', 'XXVehhvydAk', 'https://i.ytimg.com/vi/XXVehhvydAk/hqdefault.jpg', 'youtube', 'general', 1594, 0, '2026-05-09 04:11:08'),
(204, 'NTABWO UMUNTU ABA INTWARI KUKO YABAYE UMUSIRIKARE - Hon.RUBAGUMYA', 'Bumwe mu butumwa Hon. Depite RUBAGUMYA FURAHA Emma yagejeje ku bitabiriye ibiroro byo kwizihiza umunsi w\'Intwari ...', 'https://www.youtube.com/watch?v=X5R780d24o0', 'X5R780d24o0', 'https://i.ytimg.com/vi/X5R780d24o0/hqdefault.jpg', 'youtube', 'general', 68, 0, '2026-05-09 04:11:08'),
(205, 'BIG MINING, IGIHAMYA CY’UKO U RWANDA RUKUNGAHAYE KU MABUYE Y’AGACIRO', 'Ruhango Le 01/02/2025 mu birori byo kwizihiza umunsi w\' Intwari z\'igihugu, BIG MINING COMPANY LTD ikorera mu murenge ...', 'https://www.youtube.com/watch?v=sGou0hGQK1g', 'sGou0hGQK1g', 'https://i.ytimg.com/vi/sGou0hGQK1g/hqdefault.jpg', 'youtube', 'general', 209, 0, '2026-05-09 04:11:08'),
(206, 'Ibibondo byaa ECD Center Byimana  ku munsi w’intwari z&#39;igihugu', '', 'https://www.youtube.com/watch?v=1DqkEPZUAQE', '1DqkEPZUAQE', 'https://i.ytimg.com/vi/1DqkEPZUAQE/hqdefault.jpg', 'youtube', 'general', 27, 0, '2026-05-09 04:11:09'),
(207, 'URUBYIRUKO RWUMVE ICYO ABAKURU TURUBWIRA - MEYA WA RUHANGO', '', 'https://www.youtube.com/watch?v=Mtp-fB_LNg8', 'Mtp-fB_LNg8', 'https://i.ytimg.com/vi/Mtp-fB_LNg8/hqdefault.jpg', 'youtube', 'general', 85, 0, '2026-05-09 04:11:09'),
(208, 'Video : Intambara ,  M23 i Goma mu byishimo n&#39;abaturage', '', 'https://www.youtube.com/watch?v=d1D8x-x-xhU', 'd1D8x-x-xhU', 'https://i.ytimg.com/vi/d1D8x-x-xhU/hqdefault.jpg', 'youtube', 'general', 31, 0, '2026-05-09 04:11:09'),
(209, 'RUHANGO: BISHE UMUKECURU BAMUKASE IJOSI', 'Abaturage bo mu murenge wa Ntongwe mu karere ka Ruhango babajwe n\'urupfu rw\'umukecuru w\'imyaka 68 y\'amavuko witwa ...', 'https://www.youtube.com/watch?v=T-nnDFyLK1I', 'T-nnDFyLK1I', 'https://i.ytimg.com/vi/T-nnDFyLK1I/hqdefault.jpg', 'youtube', 'general', 716, 0, '2026-05-09 04:11:09'),
(210, 'KAMONYI/KAYUMBU:  BARASABA AGASOKO ABACURURIZA INYUMA Y&#39;IBIRO BYA IMC', '', 'https://www.youtube.com/watch?v=CuCYLSNKDbw', 'CuCYLSNKDbw', 'https://i.ytimg.com/vi/CuCYLSNKDbw/hqdefault.jpg', 'youtube', 'general', 332, 0, '2026-05-09 04:11:09'),
(211, 'UMUKIRE AFUNZWE ABAZWA IBIRIMO AHO YAKUYE INZU 200 MURI N&#39;IMODOKA 25', '', 'https://www.youtube.com/watch?v=2H3l1EewQJc', '2H3l1EewQJc', 'https://i.ytimg.com/vi/2H3l1EewQJc/hqdefault.jpg', 'youtube', 'general', 1440, 0, '2026-05-09 04:11:10'),
(212, 'AKAGANIRO GATEBYA N&#39;UMUGORE USABIRA AMAZI ABATUYE I MUHANGA MU BAHOZI', 'Kanda kuri subscribe ube. Niba hari amakuru ushaka kuduha , watwandikira kuri email yacu: pintvrwanda@gmail.com.', 'https://www.youtube.com/watch?v=9Li9XdUwDW8', '9Li9XdUwDW8', 'https://i.ytimg.com/vi/9Li9XdUwDW8/hqdefault.jpg', 'youtube', 'general', 82, 0, '2026-05-09 04:11:10'),
(213, 'NTAGIRA  IGITSINA, NYINA ARASABA UBUFASHA', 'Ushaka kuduha amakuru, igitekerezo cyangwa indi nyunganizi watwandikira kuri pintvrwanda@gmail.com.', 'https://www.youtube.com/watch?v=PwM7IAiIk9Y', 'PwM7IAiIk9Y', 'https://i.ytimg.com/vi/PwM7IAiIk9Y/hqdefault.jpg', 'youtube', 'general', 91, 0, '2026-05-09 04:11:10'),
(214, 'RWANDA/KARONGI:  LIGHTNING STRIKE KILLS THREE CHILDREN', 'Ku mugoroba wa le 05/01/2025, mu mvura, inkuba yakubise abantu 12 biganjemo abana bo mu karere ka Karongi, mu murenge ...', 'https://www.youtube.com/watch?v=4pPNrEaZ0uo', '4pPNrEaZ0uo', 'https://i.ytimg.com/vi/4pPNrEaZ0uo/hqdefault.jpg', 'youtube', 'general', 69, 0, '2026-05-09 04:11:10'),
(215, 'UMUPOLISI IO YASINZE AREKURA IMFUNGWA NGO ZIZIHIZE UBUNANI', 'Umupolisi wo muri zambia yasinze arekura infungwa 13 ngo zijye kwizihiza ubunani.', 'https://www.youtube.com/watch?v=QpOdRrcqEGg', 'QpOdRrcqEGg', 'https://i.ytimg.com/vi/QpOdRrcqEGg/hqdefault.jpg', 'youtube', 'general', 101, 0, '2026-05-09 04:11:11'),
(216, 'KIGALI: ABAGORORWA BAKUBISE UMUNYAMAKURU JEAN PAUL BAFUNGANYE', 'RCS yemeje ko umunyamakuru ufunze yakubiswe, isobanura uko byagenze.', 'https://www.youtube.com/watch?v=rfNDv9sYTHQ', 'rfNDv9sYTHQ', 'https://i.ytimg.com/vi/rfNDv9sYTHQ/hqdefault.jpg', 'youtube', 'general', 55, 0, '2026-05-09 04:11:11'),
(217, 'RUHANGO: AMAKURU KU BISHE LENATHA WAROKOTSE JENOSIDE YAKOREWE ABATUSTI', 'Ikiganiro n\'abaturage; Senateri ; Depite na Meya, Le 20/12/2024. Inteko Ishinga amategeko iri gushaka amakuru. Ni iki kihishe ...', 'https://www.youtube.com/watch?v=TbYazw5El3c', 'TbYazw5El3c', 'https://i.ytimg.com/vi/TbYazw5El3c/hqdefault.jpg', 'youtube', 'general', 128, 0, '2026-05-09 04:11:11'),
(218, 'Rwanda/Burundi:  Hari abakobwa batinya abaganga b&#39;abagabo/ UBUHAMYA', '', 'https://www.youtube.com/watch?v=laxkhUDnrWQ', 'laxkhUDnrWQ', 'https://i.ytimg.com/vi/laxkhUDnrWQ/hqdefault.jpg', 'youtube', 'general', 64, 0, '2026-05-09 04:11:11'),
(219, 'URUBANZA RW&#39;ABAKOZI BA EQUIT N&#39;IREMBO BASHINJWA KWIBA BANKI AMAMILIYONI//UMUKOZI WA MTN NAWE !!😭', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=eNmaQ87jPjw', 'eNmaQ87jPjw', 'https://i.ytimg.com/vi/eNmaQ87jPjw/hqdefault.jpg', 'youtube', 'general', 78, 0, '2026-05-09 12:00:01'),
(220, '😭IMPANUKA IKOMEYE Y&#39;IKAMYO NA TAX YISHE ABANTU IMUHANGA//UBUTUMWA BWA POLISI', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=YbItGefkCbo', 'YbItGefkCbo', 'https://i.ytimg.com/vi/YbItGefkCbo/hqdefault.jpg', 'youtube', 'general', 3250, 0, '2026-05-12 04:00:01'),
(221, 'IMPANUKA IBABAJE😭 ABAGABO BAJYANYE UMWANA KWIBA AMABUYE IKIROMBE KIRAMWICA //', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=kJ74ODtmhNk', 'kJ74ODtmhNk', 'https://i.ytimg.com/vi/kJ74ODtmhNk/hqdefault.jpg', 'youtube', 'general', 29, 0, '2026-05-12 14:50:27'),
(222, '🤔ABAKOZI 2 BA EQUITY BANK BAFUNZWE BASHINJWA KUYIBA AMADORALI MENSHI// ABAKORANA N&#39;IREMBO BARAREKUWE', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=cQY_QnOpa4g', 'cQY_QnOpa4g', 'https://i.ytimg.com/vi/cQY_QnOpa4g/hqdefault.jpg', 'youtube', 'general', 86, 0, '2026-05-13 10:00:01'),
(223, 'MBEGA AGAHINDA😭 UWAKORAGA MURI SACCO  ARI MU BISHWE N&#39;IBIROMBE UNDI BAMUTEMERAMO NYUMA ARAPFA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=NVhMtuC7_qA', 'NVhMtuC7_qA', 'https://i.ytimg.com/vi/NVhMtuC7_qA/hqdefault.jpg', 'youtube', 'general', 534, 0, '2026-05-13 10:00:02'),
(224, 'ABA BANA BAPFIRA MU BIROMBE BABAZWA NDE?', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=rZli-MzSoL4', 'rZli-MzSoL4', 'https://i.ytimg.com/vi/rZli-MzSoL4/hqdefault.jpg', 'youtube', 'general', 10, 0, '2026-05-16 14:00:16'),
(225, '😭UMUNYAMAKURU UVUGA KO YASAMBANYIJWE ARI GUTABAZA H.E KAGAME// RIB YAFUNZE UMUGANGA', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=Zg5_U4nLIvg', 'Zg5_U4nLIvg', 'https://i.ytimg.com/vi/Zg5_U4nLIvg/hqdefault.jpg', 'youtube', 'general', 164, 0, '2026-05-16 14:00:17'),
(226, 'U RWANDA RUFUNZE IMIPAKA IRUHUZA NA CONGO I RUBAVU', 'PIN RWANDA-Where Nothing is Hidden.', 'https://www.youtube.com/watch?v=2ONwzvZC8o4', '2ONwzvZC8o4', 'https://i.ytimg.com/vi/2ONwzvZC8o4/hqdefault.jpg', 'youtube', 'general', 193, 0, '2026-05-17 16:00:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `video_id` (`video_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donation_goals`
--
ALTER TABLE `donation_goals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`user_id`,`post_id`,`video_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `password_reset_codes`
--
ALTER TABLE `password_reset_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_code` (`code`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sponsorships`
--
ALTER TABLE `sponsorships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_token` (`token`(255));

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donation_goals`
--
ALTER TABLE `donation_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `password_reset_codes`
--
ALTER TABLE `password_reset_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sponsorships`
--
ALTER TABLE `sponsorships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
