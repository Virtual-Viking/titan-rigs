/*_______________CREATE TABLE FOR USERS__________________*/
CREATE TABLE `titan_rigs`.`users` (
  `id` INT NOT NULL,
  `firsrt_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `role` ENUM('admin', 'editor', 'customer') NULL,
  PRIMARY KEY (`id`));
  
/*_______________CREATE TABLE FOR ADDRESSES_______________*/
  CREATE TABLE `titan_rigs`.`addresses` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`address_id`),
  INDEX `id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `titan_rigs`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
/*_______________CREATE TABLE FOR CATEGORIES__________________*/
    CREATE TABLE `titan_rigs`.`categories` (
  `categories_id` INT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `hsn code` ENUM('8473', '8523', '8471', '8504', '8528', '9401', '3506', '8518', '4016', '8517', '8544') NOT NULL AFTER `name`;
  PRIMARY KEY (`categories_id`));

/*_______________CREATE TABLE FOR PROCESSORS__________________*/
CREATE TABLE `titan_rigs`.`processors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vendor` ENUM('amd', 'intel') NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `chipset` VARCHAR(45) NOT NULL,
  `socket` VARCHAR(45) NOT NULL,
  `maxtdp` INT NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR MOTHERBOARD__________________*/
CREATE TABLE `titan_rigs`.`motherboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `chipset` VARCHAR(45) NOT NULL,
  `socket` VARCHAR(45) NOT NULL,
  `formfactor` VARCHAR(45) NOT NULL,
  `ddrtype` VARCHAR(45) NOT NULL,
  `ramslot` INT NOT NULL,
  `pciegen` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `ssdinterface` SET('sata', 'nvme', 'm.2') NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR RAM__________________*/
CREATE TABLE `titan_rigs`.`ram` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `ddrtype` VARCHAR(45) NOT NULL,
  `capacity` VARCHAR(45) NOT NULL,
  `sticks` INT NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR SSD__________________*/
CREATE TABLE `titan_rigs`.`ssd` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `pciegen` VARCHAR(45) NOT NULL,
  `interface` ENUM('sata', 'nvme', 'm.2') NOT NULL,
  `capacity` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR GPU__________________*/
CREATE TABLE `titan_rigs`.`gpu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `vendor` ENUM('AMD', 'nvidia') NOT NULL,
  `Brand` VARCHAR(100) NOT NULL,
  `series` VARCHAR(45) NOT NULL,
  `memory` INT NOT NULL,
  `maxtdp` INT NOT NULL,
  `connector` ENUM('pcie', 'gen3') NOT NULL,
  `gpulen` INT NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR AIO__________________*/
CREATE TABLE `titan_rigs`.`aio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `len` VARCHAR(45) NOT NULL,
  `socket` SET('AM2', 'AM2+', 'AM3', 'AM3+', 'AM4', 'AM5', 'TR4', 'sTRX4', 'sWRX8', 'SP3', 'SP5', 'G34', 'F', 'Socket 754', 'Socket 939', 'Socket 940', 'Socket A (462)', 'LGA 775', 'LGA 1156', 'LGA 1366', 'LGA 1155', 'LGA 2011', 'LGA 1150', 'LGA 2011-3', 'LGA 1151', 'LGA 1200', 'LGA 1700') NOT NULL,
  `color` VARCHAR(45) NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR PSU__________________*/
CREATE TABLE `titan_rigs`.`psu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `watt` VARCHAR(45) NOT NULL,
  `rating` ENUM('white', 'bronze', 'silver', 'gold', 'platinum') NOT NULL,
  `connector` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));

/*_______________CREATE TABLE FOR CABINETS__________________*/
  CREATE TABLE `titan_rigs`.`cabinet` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `formfactor` VARCHAR(45) NOT NULL,
  `cabinetcol` VARCHAR(45) NOT NULL,
  `gpulen` VARCHAR(45) NULL,
  `radiatorlen` VARCHAR(45) NULL,
  `color` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `release` DATE NOT NULL,
  `offers` ENUM('NO', 'FO', 'SO', 'CO') NOT NULL,
  PRIMARY KEY (`id`));