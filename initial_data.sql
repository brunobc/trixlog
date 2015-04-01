CREATE DATABASE trix;

CREATE TABLE trix.`LOCATION` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `latitude` long NOT NULL,
  `longitude` long NOT NULL,
  `created` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE trix.`TAG` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL UNIQUE,
  `created` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE trix.`LOCATIONSTAG` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `location_id` int(11) unsigned NOT NULL,
  `tag_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `trix`.`LOCATION` (`id`, `name`, `latitude`, `longitude`) VALUES ('1', 'trixlog', -3.7345497644909162, -38.46940107643604);

INSERT INTO `trix`.`TAG` (`id`, `name`) VALUES ('1', 'Empresa');
INSERT INTO `trix`.`TAG` (`id`, `name`) VALUES ('2', 'Vicente Pizon');

INSERT INTO `trix`.`LOCATIONSTAG` (`id`, `location_id`, `tag_id`) VALUES ('1', '1', '1');
INSERT INTO `trix`.`LOCATIONSTAG` (`id`, `location_id`, `tag_id`) VALUES ('2', '1', '2');