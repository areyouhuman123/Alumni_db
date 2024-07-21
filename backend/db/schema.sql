CREATE DATABASE alumni_db;

USE alumni_db;

CREATE TABLE alumni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    graduationYear INT NOT NULL
);
