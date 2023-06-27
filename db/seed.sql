use employees_db;

DELETE FROM department;

INSERT INTO department (name)
VALUES 
('Marketing'),
('Accounting'),
('Finance'),
('Engineering');

INSERT INTO role
(title, salary, department_id)
VALUES
('Marketing Director', 120000, 1),
('Product Manager', 100000, 1),
('Accounting Manager', 140000, 2),
('Accountant', 110000, 2),
('Chief Financial Officer', 200000, 3),
('Financial Advisor', 120000, 3),
('Software Engineer', 130000, 4),
('Full Stack Developer', 120000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Marjorie', 'Perez', 1, NULL),
('Joel', 'Perez', 2, 1),
('Citlalli', 'Corona', 3, NULL),
('Salvador', 'Perez', 4, 3),
('Denise', 'Gonzalez', 5, NULL),
('Luis', 'Lopez', 6, 5),
('Kobe', 'Ortiz', 7, NULL),
('Vladislav', 'Zuev', 8, 7);

