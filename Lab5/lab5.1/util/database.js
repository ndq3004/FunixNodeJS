const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsfunix',
    password: '30041998'
});

module.exports = pool.promise();


/**
 * if you get any errors like 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'
 * run following command
 * ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
 * flush privileges;
 */

/**
 * CREATE TABLE `nodejsfunix`.`new_table` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` DOUBLE NOT NULL,
  `description` VARCHAR(255) NULL,
  `imageUrl` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

 */