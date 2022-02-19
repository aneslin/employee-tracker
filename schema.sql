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


CREATE TABLE employees(
id int auto_increment primary key NOT NULL,
first_name varchar(32) NOT NULL,
last_name varchar(32) NOT NULL,
role_id int,
manager_id int,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employees(id)
)