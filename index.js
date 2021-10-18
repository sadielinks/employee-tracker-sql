const inquirer = require('inquirer');
const db = require('./db')
require('console.table')
// already connected but otherwise this would be req.
// const mysql = require('mysql2')

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
                name: 'add_employee',
                message: 'Add an employee',
            },
            {
                name: 'update_role',
                message: 'Update a role',
            },
            {
                name: 'exit',
                message: 'Exit'
            },
        ]
    }
    ]) .then(res => {
        switch (res.choice){
            case 'view_departments':
                viewDepartments ();
                break;

            case 'view_employees':
                viewEmployees ();
                break
        }
    })
}

init();

// .then will have switch case
// function to view employee + their data