const connection = require('./connection');

class db {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query("SELECT * FROM employee");
    }

    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query("SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeId);
    }

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    removeEmployee(employeeId) {
        return this.connection.promise().query("DELETE FROM employee WHERE id = ?", employeeId);
    }
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
    }

    findAllRoles() {
        return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
    }

    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

    findAllDepartments() {
        return this.connection.promise().query("SELECT department.id, department.name FROM department;");
    }
    viewDepartmentBudgets() {
        return this.connection.promise().query("SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;");
    }

    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    removeDepartment(departmentId) {
        return this.connection.promise().query("DELETE FROM department WHERE id = ?", departmentId);
    }

    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;", departmentId);
    }

    findAllEmployeesBymanager(managerId) {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;", managerId);
    }
}
module.exports = new db(connection);