INSERT INTO department (name)
VALUE ('Surgery'), ('Nursing'), ('Research'), ('Legal'), ('Administration');

INSERT INTO role (title, department_id, salary)
VALUE ('Surgeon', '200,000' 1), ('Nurse', '65,000', 2),  ('Clinical Researcher', '72,000', 3),  ('Lawyer', '100,000', 4),  ('Administrator', '60,000', 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Sal', 'Khan', 200,000, 1, 1), ('Meg', 'Voy', 65,000, 1, 1), ('Sadie', 'Sial', 72,000, 3, 3), ('Mel', 'Smith', 100,000, 4), ('Josh', 'Barr', 60,000, 5);