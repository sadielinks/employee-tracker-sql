const inquirer = require('inquirer');
const mysql = require('mysql2');
// const conTable = require('console.table');

// moved connection to root index.js for my own clarity and sanity 
// Connect to database (used to be inside db folder)
const db = mysql.createConnection({
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: 'xkcd$$00',
    database: "employee_db",
  });
  
  db.connect(function (err) {
    if (err) throw err;
    init();
  });

// inquirer Q's
function init() {
    inquirer
    .prompt({
        type: 'list',
        name: 'main_menu',
        message: '~Welcome! What would you like to do?~',
        choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a role',
                'Add an employee',
                'Edit a role',
                'Edit an employee',
                'Exit',
        ]
    // switch case to call the corresponding fx per the user's selection
    }).then(res => {
        switch (res.choice){
            case 'View all departments':
                viewDepartments ();
                break;

            case 'View all roles':
                viewRoles ();
                break;

            case 'View all employees':
                viewEmployees ();
                break;

            case 'Add a role':
                addRoles ();
                break;

            case 'Add an employee':
                addEmployees ();
                break;
            
            case 'Edit a role':
                editRoles ();
                break;

            case 'Edit an employee':
                editEmployees ();
                break;

            default:
                console.log('~Now exiting, goodbye!~')
                db.end ();
        }
    })
};
// init();

// Fx to view department(s)
function viewDepartments() {
    console.log('Now viewing all departments:');
    connection.query(`SELECT * FROM department`, function (err, data) {
      console.table(data);
    });
    connection.end();
  }





// // Fx to view role(s)
// function viewRoles() {
//     console.log('Now viewing all roles:');
//     // ****** figure SELECT statements
//     Connection.query('SELECT ;', function (err, data) {
//       console.table(data);
//     });
//     Connection.end();
//   };

// // Fx to view employee(s)
// function viewEmployees() {
//     console.log('Now viewing all employees:');
//     // ****** figure SELECT statements
//     Connection.query('SELECT ;', function (err, data) {
//       console.table(data);
//     });
//     Connection.end();
//   };

// // Fx to add role(s)
// function addRoles() {
//     inquirer
//     .prompt ([
//         {
//             type: 'input',
//             name: 'role_dept',
//             message: 'Which department you want to add to?',
//             choices: ['Surgery', 'Nursing', 'Research', 'Legal', 'Administration'],
//         },
//         {
//             type: 'input',
//             name: 'role_name',
//             message: 'What is the name of the new role?',
//         },
//         {
//             type: 'input',
//             name: 'role_salary',
//             message: 'What is the salary for this role?',
//         },
//     ])

//     .then(function (answer) {
//     Connection.query (
//         'INSERT INTO role ',
//         function (err, data) {
//             console.table(data);
//             console.log('Added new role!');
//         }
//     );
//     Connection.end();
//     });}

// // Fx to add employee(s)
//   function addEmployees() {
//     inquirer
//     .prompt ([
//         {
//             type: 'input',
//             name: 'employee_dept',
//             message: 'Which department will this employee be in?',
//             choices: ['Surgery', 'Nursing', 'Research', 'Legal', 'Administration']
//         },
//         {
//             type: 'input',
//             name: 'employee_id',
//             message: 'What will be their ID?',
//         },
//         {
//             type: 'input',
//             name: 'employee_first_name',
//             message: 'What is their first name?',
//         },
//         {
//             type: 'input',
//             name: 'employee_last_name',
//             message: 'What is their last name?',
//         },
//         {
//             type: 'input',
//             name: 'employee_salary',
//             message: 'What will be their salary?',
//         },
//         {
//             // ****** figure out how to build choices of current managers...?
//             type: 'input',
//             name: 'employee_manager',
//             message: 'Who will be their manager?',
//         },
//     ])

//     .then(function (answer) {
//     Connection.query (
//         'INSERT INTO employee ',
//         function (err, data) {
//             console.table(data);
//             console.log('Added new employee!');        
//         }
//     );
//     Connection.end();
//     });}

// // Fx to edit role(s)
// function editRoles() {
//     inquirer
//     .prompt ([
//     {
//         type: 'input',
//         name: 'edit_roles',
//         message: '',
//     },
//     {

//     },
//     {

//     },
//     {

//     },
//     ])

//     Connection.query('SELECT ;', function (err, data) {
//       console.table(data);
//       console.log('Edited employee role!');
//     });
//     Connection.end();
//   };

// // Fx to edit employee(s)
// function editEmployees() {
//     inquirer
//     .prompt ([
//     {
//         type: 'input',
//         name: '',
//     },
//     {

//     },
//     {

//     },
//     {

//     },
//     ])

//     Connection.query('SELECT ;', function (err, data) {
//       console.table(data);
//       console.log('Edited employee info!');
//     });
//     Connection.end();
//   };