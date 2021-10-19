const mysql = require('mysql2')
const inquirer = require('inquirer');
const db = require('./db');
const consoleTable = require('console.table');

// func init - set up prompt ask the inq Q's
function init() {
    inquirer
    .prompt([
    {
        type: 'list',
        name: 'main_menu',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'view_departments',
                message: 'View all department names',
            },
            {
                name: 'view_roles',
                message: 'View all roles',
            },
            {
                name: 'view_employees',
                message: 'View all employees',
            },
            {
                name: 'add_department',
                message: 'Add a department',
            },
            {
                name: 'add_roles',
                message: 'Add a role',
            },
            {
                name: 'edit_role',
                message: 'Edit a role',
            },
            {
                name: 'add_employee',
                message: 'Add an employee',
            },
            {
                name: 'edit_employee',
                message: 'Edit an employee',
            },
            {
                name: 'exit',
                message: 'Exit'
            },
        ]
    }
    // switch case to call the corresponding fx per the user's selection
    ]) .then(res => {
        switch (res.choice){
            case 'view_departments':
                viewDepartments ();
                break;

            case 'view_roles':
                viewRoles ();
                break;

            case 'view_employees':
                viewEmployees ();
                break;

            case 'add_department':
                addDepartments ();
                break;

            case 'add_roles':
                addRoles ();
                break;

            case 'edit_role':
                editRoles ();
                break;

            case 'add_employee':
                addEmployee ();
                break;

            case 'edit_employee':
                editEmployee ();
                break;

            case 'exit':
                exit ();
                break;
        }
    })
}

init();

// Fx to view department(s)



// Fx to add department(s)



// Fx to view employee(s)



// Fx to edit employee(s)



// Fx to add employee(s)



// Fx to view role(s)



// Fx to edit role(s)



// Fx to add role(s)



// Fx to exit