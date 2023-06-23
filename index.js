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
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View employees by department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                },
                {
                    name: 'View employees by manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                },
                {
                    name: 'View total utilized budget by department',
                    value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT'
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
                {
                    name: 'Update employee manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Remove department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'Remove role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'Remove employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                },
            ],
        },
    ])
        .then(res => {
            let choice = res.choice;
            switch (choice) {
                case 'VIEW_DEPARTMENTS':
                    viewDepartments();
                    break;
                case 'VIEW_ROLES':
                    viewRoles();
                    break;
                case 'VIEW_EMPLOYEES':
                    viewEmployees();
                    break;
                case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                    viewEmployeesByDepartment();
                    break;
                case 'VIEW_EMPLOYEES_BY_MANAGER':
                    viewEmployeesByManager();
                    break;
                case 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT':
                    viewUtilizedBudgetByDepartment();
                    break;
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                case 'ADD_ROLE':
                    addRole();
                    break;
                case 'ADD_EMPLOYEE':
                    addEmployee();
                    break;
                case 'UPDATE_EMPLOYEE_ROLE':
                    updateEmployeeRole();
                    break;
                case 'UPDATE_EMPLOYEE_MANAGER':
                    updateEmployeeManager();
                    break;
                case 'REMOVE_DEPARTMENT':
                    RemoveDepartment();
                    break;
                case 'REMOVE_ROLE':
                    RemoveRole();
                    break;
                case 'REMOVE_EMPLOYEE':
                    RemoveEmployee();
                    break;
                default:
                    quit();
            }
        }
        )
    }

    function viewDepartments() {
        db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => loadMainPrompts());
    }

    function viewRoles() {
        db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => loadMainPrompts());
    }

    function viewEmployees() {
        db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => loadMainPrompts());
    }

    function viewEmployeesByDepartment() {
        db.findAllDepaertments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            prompt([
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'For which department would you like to see employees for?',
                    choices: departmentChoices
                }
            ])
            .then(res => db.findAllEmployeesByDepartment(res.departmentId))
            .then(([rows]) => {
                let employees = rows;
                console.log('\n');
                console.table(employees);
            })
            .then(() => loadMainPrompts())
        })
    }

    function viewEmployeesByManager() {
        db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            prompt([
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Which employee do youw ant to see direct reports for?',
                    choices: managerChoices
                }
            ])
            .then(res => db.findAllEmployeesByManager(res.managerId))
            .then(([rows]) => {
                let employees = rows;
                console.log('\n');
                if (employees.length === 0) {
                    console.log('The selected employee has no direct reports');
                } else {
                    console.table(employees);
                }
            })
            .then(() => loadMainPrompts())
        });
    }

    function viewUtilizedBudgetByDepartment() {
        db.viewDepartmentBudgets()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => loadMainPrompts());
    }

    function addDepartment() {
        prompt([
            {
                name: 'name',
                message: 'What is the name of the department?'
            }
        ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database`))
            .then(() => loadMainPrompts())
        })
    }

    function addRole() {
        db.findAllDepartments() 
        .then(([rows]) => {
            let departmnets = rows;
            const departmentChoices = departments.map(({id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: 'title',
                    message: 'What is the name of the role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    messsage: 'Which department does the role belong to?',
                    choices: departmentChoices
                }
            ])
            .then(role => {
                db.createRole(role)
                .then(() => console.log(`Added ${role.title} to the database`))
                .then(() => loadMainPrompts())
            })
        })
    }

    function addEmployee() {
        prompt([
            {
                name: 'first_name',
                message: 'What is the employees first name?'
            },
            {
                name: 'last_name',
                message: 'What is the employees last name?'
            }
        ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                let roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                prompt({
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the employees role?',
                    choices: roleChoices
                })
                .then(res => {
                    let roleId = res.roleId;

                    db.findAllEmployees()
                    .then(([rows]) => {
                        let employees = rows;
                        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            vallue: id
                        }));

                        managerChoices.unshift({ name: 'None', value: null });

                        prompt({
                            type: 'list',
                            name: 'managerid',
                            message: 'Who is the employees manager?',
                            choices: managerChoices                        
                        })
                        .then
                    })
                })
            })
        })
    }