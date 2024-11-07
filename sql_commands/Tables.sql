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
  PRIMARY KEY (`categories_id`));