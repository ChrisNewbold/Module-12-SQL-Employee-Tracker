-- departments data
INSERT INTO departments (name)
VALUES ('IT'),
  ('Marketing'),
  ('Sales'),
  ('Administration'),
  ('Accounts');
-- roles data  
INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 180000, 1),
  ('Brand Manager', 80000, 2),
  ('National Sales', 90000, 3),
  ('Administration Manager', 55000, 4),
  ('Accountant', 120000, 5);
-- employees data
INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES ('James', 'Dawson', 1, 'chris'),
  ('Rian ', 'Herrick', 2, 'kelly'),
  ('Chanel', 'Jones', 3, 'melissa'),
  ('Jess', 'McLocklan', 4, 'mark'),
  ('Leanne', 'Quinlan', 5, 'chris');