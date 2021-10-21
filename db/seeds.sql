USE employee_db;

INSERT INTO department (department_name)
VALUES ("Surgery"),
("Nursing"),
("Research"),
("Legal"),
("Administration");

INSERT INTO role (title, salary, department_id)
VALUES ("Surgeon", 200000, 1),
("Nurse", 65000, 2),
("Clinical Researcher", 72000, 3),
("Lawyer", 100000, 4),
("Administrator", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sal", "Khan", 1, 1),
("Meg", "Voy", 2, 2),
("Sadie", "Sial", 3, null),
("Mel", "Smith", 4, 4),
("Josh", "Barr", 5, 5);