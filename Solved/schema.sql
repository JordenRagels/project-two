DROP DATABASE IF EXISTS log;
CREATE DATABASE log;
use log;
create table posts
(
	id int NOT NULL AUTO_INCREMENT,
    clockIn text not null,
    createdAt datetime not null,
	title varchar(255) NOT NULL,
    updatdAt datetime not null,
	PRIMARY KEY (id)
);
