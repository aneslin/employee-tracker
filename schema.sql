CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name varchar(128) NOT NULL);

CREATE TABLE roles(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
role_name varchar(64) NOT NULL,
role_salary DECIMAL(12,2),
role_department int,
FOREIGN KEY (role_department) REFERENCES department(id)
);