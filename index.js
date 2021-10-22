const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// moved db to root index.js for my own clarity and sanity 
// Connect to database (used to be inside db folder)
const db = mysql.createConnection({
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: 'xkcd$$00',
    database: "employee_db",
  },
    console.log('|~-~-~-~-~-~-~-~-~-~-| WELCOME TO THE COMPANY DATABASE |~-~-~-~-~-~-~-~--~-~|')
  );
  
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
        message: 'What would you like to do?',
        choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Edit a role',
                'Edit an employee',
                'Exit',
        ]
    // switch case to call the corresponding fx per the user's selection
    }).then((answer) => {
        switch (answer.main_menu){
            case 'View all departments':
                viewDepartments ();
                break;

            case 'View all roles':
                viewRoles ();
                break;

            case 'View all employees':
                viewEmployees ();
                break;

            case 'Add a department':
                addDepartments ();
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
                console.log('|~-~-~-Now exiting, goodbye!-~-~-~|')
                db.end ();
        }
    })
};


// Fx to view department(s)
function viewDepartments () {
    console.log('|~-~-~-NOW VIEWING ALL DEPARTMENTS-~-~-~|');
    db.query('SELECT * FROM department', function (err, res) {
      if (err) {
          console.log(err);
      }
      console.table(res);
      // brings up main_menu again
      init();
    });
  };

// Fx to view role(s)
function viewRoles() {
    console.log('|~-~-~-NOW VIEWING ALL ROLES-~-~-~|');
    db.query('SELECT * FROM role', function (err, res) {
        if (err) {
            console.log(err);
        }
        console.table(res);
        // brings up main_menu again
        init();
      });
    };

// Fx to view employee(s)
function viewEmployees() {
    console.log('|~-~-~-NOW VIEWING ALL EMPLOYEES-~-~-~|');
    db.query('SELECT * FROM employee', function (err, res) {
        if (err) {
            console.log(err);
        }
        console.table(res);
        // brings up main_menu again
        init();
      });
    };

// Fx to add department(s)
function addDepartments() {
    console.log('|~-~-~-NOW ADDING A DEPARTMENT-~-~-~|');
    inquirer
    .prompt({
        type: 'input',
        name: 'add_departments',
        message: 'Please name the new department:'
    }).then(function (answer) {
        var query = "INSERT INTO department (department_name) VALUES (?)";
        db.query('INSERT INTO department (department_name) VALUES (?)', [answer.add_departments], function (err, res) {
            console.log('|~-~-~- NEW DEPARTMENT ADDED!-~-~-~|');
            init();
        });
    });
};


//     inquirer
//       .prompt({
//         type: 'input',
//         name: 'addDepartments',
//         message: 'Please provide the new department name:',
//       })
//       .then(function (answer) {
//         connection.query(
//           'INSERT INTO department (name) VALUES ("${answer.newDepartment}");',
//           function (err, res) {
 
            // console.log('|~-~-~- NEW DEPARTMENT ADDED-~-~-~|');
//           }
//         );
//         connection.end();
//       });
//   }

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
//     db.query (
//         'INSERT INTO role ',
//         function (err, res) {
//             console.table(res);
//             console.log('Added new role!');
//         }
//     );
//     db.end();
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
//     db.query (
//         'INSERT INTO employee ',
//         function (err, res) {
//             console.table(res);
//             console.log('Added new employee!');        
//         }
//     );
//     db.end();
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

//     db.query('SELECT ;', function (err, res) {
//       console.table(res);
//       console.log('Edited employee role!');
//     });
//     db.end();
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

//     db.query('SELECT ;', function (err, res) {
//       console.table(res);
//       console.log('Edited employee info!');
//     });
//     db.end();
//   };