const mysql = require("mysql2")
const cTable = require('console.table');
const inquirer = require("inquirer")
const db = require("./db/connection")
// view all departments
const viewAllDep = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        startPrompt();
    });
}
// view all roles
const viewAllRoles = () => {
    db.query('SELECT * FROM roles JOIN departments on departments.id = roles.department_id', function (err, results) {
        const roles = results.map(result => {
            return {
                id: result.id,
                title: result.title,
                salary: result.salary,
                department: result.name
            }
        })
        console.table(roles);
        startPrompt();
    });
}
// view all employees
const viewAllEmployees = () => {
    db.query('SELECT * FROM employees JOIN roles on roles.id = employees.role_id', function (err, results) {
        const employees = results.map(result => {
            return {
                id: result.id,
                first_name: result.first_name,
                last_name: result.last_name,
                role: result.title,
                departments: result.department_id,
                salary: result.salary,
                manager: result.manager
            }
        })
        console.table(employees);
        startPrompt();
    });
}
// add a department 
const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'what is the department name'
    })
        .then((result) => {
            console.table(result)
            db.query('INSERT INTO departments (name) VALUES (?)', [result.name], function (err, results) {
                startPrompt();
            })
        })
}
// add a role
const addRole = () => {

    db.query('SELECT * FROM departments', function (err, results) {

        const departments = results.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        console.table(role)
        inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'what is the name?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what is the salary?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'what is the department?',
            choices: departments
        }
        ]).then(result => {
            console.table(result)
            db.query('INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)', [result.name, result.salary, result.department_id], function (err, results) {
                startPrompt();
            })
        })
    });

}
// add an employee
const addEmployee = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'what is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'what is the employees last name?'

        },
        {
            type: 'list',
            name: 'role_id',
            message: 'what is the employees role?',
            choices: roles

        },
        {
            type: 'input',
            name: 'manager',
            message: 'what is the employees manager name?',
        }
        ]).then(result => {
            console.table(result)
            db.query('INSERT INTO employees (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)', [result.first_name, result.last_name, result.role_id, result.manager], function (err, results) {
                console.log(err)
                startPrompt();
            })
        })
    });
}// update an employee role
const updateEmployeeRole = () => {
    db.query('SELECT * FROM employees', function (err, results) {
        const employees = results.map(({ id, first_name, last_name }) => ({
            name: first_name + ' ' + last_name,
            value: id
        }))
        inquirer.prompt([{
            type: 'list',
            name: 'employee_id',
            message: 'who is the employees you want to change?',
            choices: employees
        }
        ]).then(employee => {
            db.query('SELECT * FROM roles', function (err, results) {
                const roles = results.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
                inquirer.prompt([{
                    type: 'list',
                    name: 'role_id',
                    message: 'what is the employees new role?',
                    choices: roles
                }
                ]).then(result => {
                    console.table(result)
                    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [result.role_id, employee.employee_id], function (err, results) {
                        console.log(err)
                        startPrompt();
                    })
                })
            });
        })
    });
}; // department prompts 
startPrompt();
function startPrompt() {
    return inquirer.prompt([{
        type: "list",
        name: "selector",
        message: "what would you like to do",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    }]).then((answers) => {
        console.log(answers.selector)

        switch (answers.selector) {
            case 'view all departments':
                viewAllDep()
                break;
            case 'view all roles':
                viewAllRoles()
                break;
            case 'view all employees':
                viewAllEmployees()
                break;
            case 'add a department':
                addDepartment()
                break;
            case 'add a role':
                addRole()
                break;
            case 'add an employee':
                addEmployee()
                break;
            case 'update an employee role':
                updateEmployeeRole()
                break;
        }
    })
}



