CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(75) DEFAULT NULL,
    password varchar(255) DEFAULT NULL,
    role_as varchar(10) NOT NULL DEFAULT 'user',
    PRIMARY KEY (`id`),
    UNIQUE KEY email ('email')
);
