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
                name: 'View all department names',
                value: 'view_departments',
            },
            {
                name: 'View all roles names',
                value: 'view_roles',
            },
            {
                name: 'View all employee names',
                value: 'view_employees',
            },
            {
                name: 'Add a department',
                value: 'add_deptartment',
            },
            {
                name: 'Add a role ',
                value: 'add_',
            },
            {
                name: 'View all employee names',
                value: 'view_employees',
            },
            {
                name: 'View all employee names',
                value: 'view_employees',
            },
            {
                name: 'View all employee names',
                value: 'view_employees',
            },
            {
                name: 'View all employee names',
                value: 'view_employees',
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