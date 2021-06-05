CREATE TABLE `User` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`E-mail` VARCHAR(255) NOT NULL UNIQUE,
	`Password` VARCHAR(255) NOT NULL,
	`Telephone` VARCHAR(255),
	`First Name` VARCHAR(255) NOT NULL,
	`Last Name` VARCHAR(255) NOT NULL,
	`Street` VARCHAR(255),
	`City` VARCHAR(255),
	`Province` VARCHAR(255),
	`Postal Code` VARCHAR(255),
	`Country` VARCHAR(255),
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
	`date_ordered` VARCHAR(255) NOT NULL,
	`Status` INT NOT NULL,
	PRIMARY KEY (`order_id`)
);

CREATE TABLE `Merch` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`title_pr` VARCHAR(255) NOT NULL,
	`type_pr` VARCHAR(255) NOT NULL,
	`description_pr` VARCHAR(255) NOT NULL,
	`price_pr` FLOAT NOT NULL,
	`img_pr` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`product_id`)
);

CREATE TABLE `Contains` (
	`ord_id` INT NOT NULL,
	`merch_id` INT NOT NULL,
	`amount` INT NOT NULL,
	PRIMARY KEY (`ord_id`,`merch_id`)
);

CREATE TABLE `Admin` (
	`adm_user_id` INT NOT NULL,
	PRIMARY KEY (`adm_user_id`)
);

CREATE TABLE `Artist` (
	`artist_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`profile_img` VARCHAR(255) NOT NULL,
	`spotify_url` VARCHAR(255) NOT NULL,
	`apple_url` VARCHAR(255) NOT NULL,
	`ytb_url` VARCHAR(255) NOT NULL,
	`bio_url` VARCHAR(255) NOT NULL,
	`birthday` VARCHAR(255) NOT NULL,
	`country_of_origin` VARCHAR(255) NOT NULL,
	`hobby` VARCHAR(255) NOT NULL,
	`genre` VARCHAR(255) NOT NULL,
	`guilty_pleasure` VARCHAR(255) NOT NULL,
	`inspiration` VARCHAR(255) NOT NULL,
	`sounds` VARCHAR(255) NOT NULL,
	`motto` VARCHAR(255) NOT NULL,
	`fav_singer` VARCHAR(255) NOT NULL,
	`date_registered` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`artist_id`)
);

CREATE TABLE `Article` (
	`article_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`title_art` VARCHAR(255) NOT NULL,
	`date_art` VARCHAR(255) NOT NULL,
	`img_art_url` VARCHAR(255) NOT NULL,
	`text_url` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`article_id`)
);

CREATE TABLE `Event` (
	`event_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`title_ev` VARCHAR(255) NOT NULL,
	`venue` VARCHAR(255) NOT NULL,
	`place` VARCHAR(255) NOT NULL,
	`date_ev` VARCHAR(255) NOT NULL,
	`description_ev` VARCHAR(255) NOT NULL,
	`ticket_url` VARCHAR(255) NOT NULL,
	`img_ev_url` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`event_id`)
);

CREATE TABLE `References` (
	`ref_art_id` INT NOT NULL,
	`ref_article_id` INT NOT NULL,
	PRIMARY KEY (`ref_art_id`,`ref_article_id`)
);

CREATE TABLE `Performs` (
	`perf_art_id` INT NOT NULL,
	`perf_ev_id` INT NOT NULL,
	PRIMARY KEY (`perf_art_id`,`perf_ev_id`)
);

ALTER TABLE `Places` ADD CONSTRAINT `Places_fk0` FOREIGN KEY (`ord_id`) REFERENCES `Order`(`order_id`);

ALTER TABLE `Places` ADD CONSTRAINT `Places_fk1` FOREIGN KEY (`us_id`) REFERENCES `User`(`user_id`);

ALTER TABLE `Contains` ADD CONSTRAINT `Contains_fk0` FOREIGN KEY (`ord_id`) REFERENCES `Order`(`order_id`);

ALTER TABLE `Contains` ADD CONSTRAINT `Contains_fk1` FOREIGN KEY (`merch_id`) REFERENCES `Merch`(`product_id`);

ALTER TABLE `Admin` ADD CONSTRAINT `Admin_fk0` FOREIGN KEY (`adm_user_id`) REFERENCES `User`(`user_id`);

ALTER TABLE `References` ADD CONSTRAINT `References_fk0` FOREIGN KEY (`ref_art_id`) REFERENCES `Artist`(`artist_id`);

ALTER TABLE `References` ADD CONSTRAINT `References_fk1` FOREIGN KEY (`ref_article_id`) REFERENCES `Article`(`article_id`);

ALTER TABLE `Performs` ADD CONSTRAINT `Performs_fk0` FOREIGN KEY (`perf_art_id`) REFERENCES `Artist`(`artist_id`);

ALTER TABLE `Performs` ADD CONSTRAINT `Performs_fk1` FOREIGN KEY (`perf_ev_id`) REFERENCES `Event`(`event_id`);