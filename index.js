const mysql = require('mysql2')
const inquirer = require('inquirer');
const db = require('./db');
const consoleTable = require('console.table');
const Connection = require('./db/connection');

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
                name: 'add_roles',
                message: 'Add a role',
            },
            {
                name: 'add_employee',
                message: 'Add an employee',
            },
            {
                name: 'edit_role',
                message: 'Edit a role',
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

            case 'add_roles':
                addRoles ();
                break;

            case 'add_employees':
                addEmployees ();
                break;
            
            case 'edit_roles':
                editRoles ();
                break;

            case 'edit_employees':
                editEmployees ();
                break;

            case 'exit':
                exit ();
                break;
        }
    })
};

init();

// Fx to view department(s)
function viewDepartments() {
    console.log('Now viewing all departments:');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to view role(s)
function viewRoles() {
    console.log('Now viewing all roles:');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to view employee(s)
function viewEmployees() {
    console.log('Now viewing all employees:');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to add role(s)
function addRoles() {
    console.log('Now adding a new role:');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to add employee(s)
function addEmployees() {
    console.log('Now adding a new employee');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to edit role(s)
function editRoles() {
    console.log('Please edit from the following:');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to edit employee(s)
function editEmployees() {
    console.log('Please edit from the following:');
    Connection.query('SELECT ;', function (err, data) {
      console.table(data);
    });
    Connection.end();
  };

// Fx to exit
function exit() {
    console.log('Now exiting, goodbye!');
    Connection.end();
  };