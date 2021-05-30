CREATE TABLE `User` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`E-mail` VARCHAR(255) NOT NULL UNIQUE,
	`Password` VARCHAR(255) NOT NULL,
	`Telephone` VARCHAR(255) NOT NULL,
	`First Name` VARCHAR(255) NOT NULL,
	`Last Name` VARCHAR(255) NOT NULL,
	`Street` VARCHAR(255) NOT NULL,
	`City` VARCHAR(255) NOT NULL,
	`Province` VARCHAR(255) NOT NULL,
	`Postal Code` VARCHAR(255) NOT NULL,
	`Country` VARCHAR(255) NOT NULL,
	`Apt` VARCHAR(255),
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `Places` (
	`ord_id` INT NOT NULL,
	`us_id` INT NOT NULL,
	PRIMARY KEY (`ord_id`,`us_id`)
);

CREATE TABLE `Order` (
	`order_id` INT NOT NULL AUTO_INCREMENT,
	`date_ordered` DATE NOT NULL,
	PRIMARY KEY (`order_id`)
);

CREATE TABLE `Merch` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`Type_pr` INT NOT NULL,
	PRIMARY KEY (`product_id`)
);

CREATE TABLE `Contains` (
	`ord_id` INT NOT NULL,
	`merch_id` INT NOT NULL,
	PRIMARY KEY (`ord_id`,`merch_id`)
);

CREATE TABLE `Admin` (
	`admin_id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`admin_id`)
);

CREATE TABLE `Artist` (
	`artist_id` INT NOT NULL AUTO_INCREMENT,
	`date_registered` DATE NOT NULL,
	`profile_url` VARCHAR(255) NOT NULL,
	`spotify_url` VARCHAR(255) NOT NULL,
	`bio_url` VARCHAR(255) NOT NULL,
	`profession` VARCHAR(255) NOT NULL,
	`birthday` DATE NOT NULL,
	`from` VARCHAR(255) NOT NULL,
	`hobby` VARCHAR(255) NOT NULL,
	`genre` VARCHAR(255) NOT NULL,
	`guilty_pleasure` VARCHAR(255) NOT NULL,
	`inspiration` VARCHAR(255) NOT NULL,
	`sounds` VARCHAR(255) NOT NULL,
	`motto` VARCHAR(255) NOT NULL,
	`singer` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`artist_id`)
);

CREATE TABLE `Article` (
	`article_id` INT NOT NULL UNIQUE,
	`artists_id` INT NOT NULL,
	`Title` VARCHAR(255) NOT NULL,
	`date_published` DATE NOT NULL,
	`images_url` VARCHAR(255) NOT NULL,
	`header_url` VARCHAR(255) NOT NULL,
	`bio_url` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`article_id`,`artists_id`)
);

CREATE TABLE `Event` (
	`event_id` INT NOT NULL UNIQUE,
	`art_id` INT NOT NULL,
	`Place` VARCHAR(255) NOT NULL,
	`Date` DATE NOT NULL,
	`Availability` DATE NOT NULL,
	`ticket_url` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`event_id`,`art_id`)
);

ALTER TABLE `Places` ADD CONSTRAINT `Places_fk0` FOREIGN KEY (`ord_id`) REFERENCES `Order`(`order_id`);

ALTER TABLE `Places` ADD CONSTRAINT `Places_fk1` FOREIGN KEY (`us_id`) REFERENCES `User`(`user_id`);

ALTER TABLE `Contains` ADD CONSTRAINT `Contains_fk0` FOREIGN KEY (`ord_id`) REFERENCES `Order`(`order_id`);

ALTER TABLE `Contains` ADD CONSTRAINT `Contains_fk1` FOREIGN KEY (`merch_id`) REFERENCES `Merch`(`product_id`);

ALTER TABLE `Admin` ADD CONSTRAINT `Admin_fk0` FOREIGN KEY (`admin_id`) REFERENCES `User`(`user_id`);

ALTER TABLE `Article` ADD CONSTRAINT `Article_fk0` FOREIGN KEY (`artists_id`) REFERENCES `Artist`(`artist_id`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk0` FOREIGN KEY (`art_id`) REFERENCES `Artist`(`artist_id`);