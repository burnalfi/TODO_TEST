-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2022 at 06:13 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo4`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_groups`
--

CREATE TABLE `activity_groups` (
  `id` int(8) NOT NULL,
  `title` varchar(16) NOT NULL,
  `email` varchar(32) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activity_groups`
--

INSERT INTO `activity_groups` (`id`, `title`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'coba 11', 'yoga+1@skyshi.io', '2022-08-11 08:37:25', '2022-08-11 13:52:34', NULL),
(2, 'coba 2', 'yoga+1@skyshi.io', '2022-08-11 09:52:11', '2022-08-11 09:52:11', '2022-08-11 10:14:15'),
(3, 'coba 3', 'yoga+1@skyshi.io', '2022-08-11 09:52:17', '2022-08-11 09:52:17', '2022-08-11 10:14:15'),
(4, 'coba 4', 'yoga+1@skyshi.io', '2022-08-11 09:52:22', '2022-08-11 09:52:22', '2022-08-11 10:14:15'),
(5, 'coba 6', 'yoga+1@skyshi.io', '2022-08-11 10:38:52', '2022-08-11 10:38:52', '2022-08-11 10:40:35'),
(6, 'coba 5', 'yoga+1@skyshi.io', '2022-08-11 10:38:58', '2022-08-11 10:38:58', '2022-08-11 13:48:52'),
(7, 'coba 8', 'yoga+1@skyshi.io', '2022-08-11 10:39:44', '2022-08-11 10:39:44', '2022-08-11 13:49:08'),
(8, 'coba 8', 'yoga+1@skyshi.io', '2022-08-11 13:47:56', '2022-08-11 13:47:56', '2022-08-11 13:49:08'),
(9, 'coba 9', 'yoga+1@skyshi.io', '2022-08-11 13:50:21', '2022-08-11 13:50:21', '2022-08-11 13:50:57');

-- --------------------------------------------------------

--
-- Table structure for table `todo_items`
--

CREATE TABLE `todo_items` (
  `id` int(8) NOT NULL,
  `title` varchar(16) NOT NULL,
  `priority` enum('very-low','low','medium','high','very-high') DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `activity_group_id` int(8) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todo_items`
--

INSERT INTO `todo_items` (`id`, `title`, `priority`, `is_active`, `activity_group_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'item 1', 'low', 1, 1, '2022-08-11 11:02:53', '2022-08-11 12:03:57', NULL),
(2, 'item 5.4', NULL, 0, 1, '2022-08-11 12:16:50', '2022-08-11 12:16:50', '2022-08-11 12:18:30'),
(3, 'item 5.4', NULL, 0, 1, '2022-08-11 12:16:56', '2022-08-11 12:16:56', '2022-08-11 12:18:30'),
(4, 'item 5.4', NULL, 0, 1, '2022-08-11 12:16:57', '2022-08-11 12:16:57', '2022-08-11 12:23:16'),
(5, 'item 5.4', NULL, 0, 1, '2022-08-11 12:24:56', '2022-08-11 12:24:56', '2022-08-11 12:25:11'),
(6, 'item 5.4', NULL, 0, 1, '2022-08-11 12:24:57', '2022-08-11 12:24:57', '2022-08-11 12:25:35'),
(7, 'item 5.4', NULL, 0, 1, '2022-08-11 12:24:57', '2022-08-11 12:24:57', '2022-08-11 12:25:35'),
(8, 'item 2', NULL, 0, 1, '2022-08-11 13:55:09', '2022-08-11 13:55:09', '2022-08-11 14:02:30'),
(9, 'item 3', NULL, 0, 1, '2022-08-11 13:55:12', '2022-08-11 13:55:12', '2022-08-11 14:06:42'),
(10, 'item 3', 'very-high', 0, 1, '2022-08-11 13:59:37', '2022-08-11 13:59:37', '2022-08-11 14:06:42'),
(11, 'item 11', 'low', 1, 1, '2022-08-11 14:00:02', '2022-08-11 14:00:02', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_groups`
--
ALTER TABLE `activity_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todo_items`
--
ALTER TABLE `todo_items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_groups`
--
ALTER TABLE `activity_groups`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `todo_items`
--
ALTER TABLE `todo_items`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
