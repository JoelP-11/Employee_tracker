const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');

init();

function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },

            ],
        },
    ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all employees by department':
                    addDepartment();
                    break;
                case 'View all employees by manager':
                    addDepartment();
                    break;
                case 'View total utilized budget by department':
                    addDepartment();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Update an employee manager':
                    updateEmployeeManager();
                    break;
                case 'Remove department':
                    RemoveDepartment();
                    break;
                case 'Remove role':
                    RemoveRole();
                    break;
                case 'Remove employee':
                    RemoveEmployee();
                    break;
                case 'Exit':
                    connection.end();
                    console.log('Goodbye!');
                    return;
            }
            startApp();
        })
        .catch((error) => {
            console.log('An error ocurred:', error);
        });
}