const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// moved db to root index.js for my own clarity and sanity
// Connect to database (used to be inside db folder)
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL password
    password: 'xkcd$$00',
    database: 'employee_db',
  },
  console.log(
    '|~-~-~-~-~-~-~-~-~-~-| WELCOME TO THE COMPANY DATABASE |~-~-~-~-~-~-~-~--~-~|'
  )
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
      message: "What would you like to do?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Edit an employee role',
        'Exit',
      ],
      // switch case to call the corresponding fx per the user's selection
    })
    .then((answer) => {
      switch (answer.main_menu) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
          break;

        case 'Add a department':
          addDepartments();
          break;

        case 'Add a role':
          addRoles();
          break;

        case 'Add an employee':
          addEmployees();
          break;

        case 'Edit an employee role':
          editEmpRoles();
          break;

        default:
          // console.log('|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|');
          console.log('|~-~-~-Now exiting, goodbye!-~-~-~|');
          // console.log('|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|');
          db.end();
      }
    });
}

// Fx to view department(s)
function viewDepartments() {
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW VIEWING ALL DEPARTMENTS-~-~-~|");
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  db.query("SELECT * FROM department", function (err, res) {
    if (err) {
      console.log(err);
    }
    console.table(res);
    // brings up main_menu again
    init();
  });
}

// Fx to view role(s)
function viewRoles() {
  console.log("|~-~-~-NOW VIEWING ALL ROLES-~-~-~|");
  db.query("SELECT * FROM role", function (err, res) {
    if (err) {
      console.log(err);
    }
    console.table(res);
    // brings up main_menu again
    init();
  });
}

// Fx to view employee(s)
function viewEmployees() {
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW VIEWING ALL EMPLOYEES-~-~-~|");
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) {
      console.log(err);
    }
    console.table(res);
    // brings up main_menu again
    init();
  });
}

// Fx to add department(s)
function addDepartments() {
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW ADDING A DEPARTMENT-~-~-~|");
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  inquirer
    .prompt({
      type: "input",
      name: "add_departments",
      message: "Please name the new department:",
    })
    .then(function (answer) {
      db.query(
        "INSERT INTO department (department_name) VALUES (?)",
        [answer.add_departments],
        function (err, res) {
          // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          console.log("|~-~-~-YES,  NEW DEPARTMENT ADDED!-~-~-~|");
          // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          init();
        }
      );
    });
}

// Fx to add role(s)
function addRoles() {
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW ADDING A ROLE-~-~-~|");
  // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  inquirer
    .prompt([
      {
        type: "input",
        name: "addrole_name",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "addrole_salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "addrole_dept",
        message: "Which department you want to add to?",
        // need to figure out how to add new depts to choices -_-
        choices: ["Surgery", "Nursing", "Research", "Legal", "Administration"],
      },
    ])
    .then(function (answer) {
      db.query(
        // use backticks to insert SQL language!
        `INSERT INTO role (title, salary, department_id) VALUES ('${answer.addrole_name}', '${answer.addrole_salary}', '${answer.addroledept}');`,
        function (err, res) {
          console.table(res);
          // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          console.log("|~-~-~- YES, NEW ROLE ADDED!-~-~-~|");
          // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          init();
        }
      );
    });
}

// Fx to add employee(s)
  function addEmployees() {
    // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
    console.log("|~-~-~-NOW ADDING  AN EMPLOYEE-~-~-~|");
    // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
    inquirer
    .prompt ([
        {
            type: 'input',
            name: 'employee_dept',
            message: 'Which department will this employee be in?',
            choices: ['Surgery', 'Nursing', 'Research', 'Legal', 'Administration']
        },
        {
            type: 'input',
            name: 'employee_id',
            message: 'What will be their ID?',
        },
        {
            type: 'input',
            name: 'employee_first_name',
            message: 'What is their first name?',
        },
        {
            type: 'input',
            name: 'employee_last_name',
            message: 'What is their last name?',
        },
        {
            type: 'input',
            name: 'employee_salary',
            message: 'What will be their salary?',
        },
        {
            // ****** figure out how to build choices of current managers...?
            type: 'input',
            name: 'employee_manager',
            message: 'Who will be their manager?',
        },
    ])
    .then(function (answer) {
    db.query (
        'INSERT INTO employee ',
        function (err, res) {
            console.table(res);
            // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
            console.log("|~-~-~- YES, NEW EMPLOYEE ADDED!-~-~-~|");
            // console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          }
    );
    db.end();
    });}

// Fx to edit employee role(s)
function editEmpRoles() {
  // SQL to pick from db employees
  console.log("|~-~-~-NOW EDITING A CURRENT EMPLOYEE ROLE-~-~-~|");
  db.query(
    `SELECT employee.id AS employeeId, concat(employee.first_name, " ", employee.last_name) AS employeeFullName FROM employee`,
    (err, res) => {
      if (err) throw err;

      // will need to display names from employee_db for inquirer
      let curEmployees = [];
      let curEmployeesNames = [];
      for (let i = 0; i < res.length; i++) {
        curEmployees.push({
          //
          employeeId: res[i].employeeId,
          fullName: res[i].employeeFullName,
        });
        curEmployeesNames.push(res[i].employeeFullName);
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "edit_this_person",
            message: "Which employee are you editing?",
            // enter loop variable
            choices: curEmployeesNames,
          },
        ])
        .then((answer) => {
          // connection to make the edit to the db
          const chosenEmployee = answer.edit_this_person;
          let chosenEmployeeId;
          // loop to check name against the user entry
          for (let i = 0; i < curEmployees.length; i++) {
            if (curEmployees[i].fullName === chosenEmployee) {
              chosenEmployeeId = curEmployees[i].employeeId;
              break;
            }
          }
          // SQL to pick from db curRoles
          db.query(`SELECT role.title, role.id FROM role;`, (err, res) => {
            if (err) throw err;
            // loop to
            const curRoles = [];
            const curRolesNames = [];
            for (let i = 0; i < res.length; i++) {
              curRoles.push({
                roleId: res[i].id,
                title: res[i].title,
              });
              curRolesNames.push(res[i].title);
            }
            inquirer
              .prompt([
                // displays selections:
                {
                  type: 'list',
                  name: 'edit_emp_role',
                  message: 'Please select the new role',
                  choices: curRolesNames,
                },
              ])
              .then(function (answer) {
                // since every employee has an id...
                const chosenRole = answer.edit_emp_role;
                let chosenRoleId;
                for (let i = 0; i < curRoles.length; i++) {
                  if (curRoles[i].title === chosenRole) {
                    chosenRoleId = curRoles[i].roleId;
                  }
                }
                // com. with the db to update the user input
                db.query(
                  `UPDATE employee SET ? WHERE ?`,
                  [
                    {
                      role_id: chosenRoleId,
                    },
                    {
                      id: chosenEmployeeId,
                    },
                  ],
                  function (err, res) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("|~-~-~-YES,  EMPLOYEE ROLE SUCCESSFULLY UPDATED!-~-~-~|");
                      console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
                      init();
                    }
                  }
                );
              });
          });
        });
    }
  );
}

//     inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'edit_first_name',
//             message: "What is the employee's first name?",
//             // will build loops to check
//             choices: employeeFirstName
//         },
//         {
//             type: 'list',
//             name: 'edit_last_name',
//             message: "What is the employee's last name?",
//             choices: employeeLastName
//         },
//         {
//             type: 'list',
//             name: 'edit_role',
//             message: "What is the employee's updated role?",
//             choices: roleName
//         },
//         {
//             type: 'list',
//             name: 'edit_manager_name',
//             message: "What is the name of the employee's manager?",
//             choices: [...managerName, 'is the manager']
//         }
//     ]).then(function (answer) {
//         // making variables for each loop component
//         var selectedFirstName;
//         var selectedLastName;
//         var indexFirst;
//         var indexLast;

//         // checks frist_name
//         for (var i = 0; i < employeeInfo.length; i++) {
//             if (answer.firstName === employeeFirstName[i]) {
//                 selectedFirstName = employeeFirstName[i];
//                 indexFirst = i;
//             }
//         };

//         // checks last_name
//         for (var i = 0; i < employeeInfo.length; i++) {
//             if (answer.lastName === employeeLastName[i]) {
//                 selectedLastName = employeeLastName[i];
//                 indexLast = i;
//             }
//         };

//         // checks role_id
//         for (var i = 0; i < roleInfo.length; i++) {
//             if (answer.roleUpdate === roleInfo[i].title) {
//                 roleID = roleInfo[i].id;
//             }
//         };

//         // checks manager_id by using the previous loops of the first/last_name
//         for (var i = 0; i < managerInfo.length; i++) {
//             if (answer.managerNameUpdate === managerInfo[i].first_name + " " + managerInfo[i].last_name) {
//                 managerID = managerInfo[i].id;
//             } else if (answer.managerNameUpdate === 'is the manager') {
//                 managerID = null;
//             }
//         };

//         if (indexFirst != indexLast) {
//             console.log('The name you entered does not match database records. Please try again.');
//             updateRole();
//         } else if (answer.managerNameUpdate === answer.firstName + " " + answer.lastName) {
//             console.log('Employees are not permitted to be their own managers. Please try again.');
//             updateRole();
//         };

//         // var query = "UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ?";
//         connection.query(`UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ?`, [roleID, managerID, answer.firstName], function (err, res) {
//             if (err) throw err;
// console.log('|~-~-~-YES,  EMPLOYEE ROLE SUCCESSFULLY UPDATED!-~-~-~|');
// console.log('|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|');
//         init();
//         }
//         );
//     })
// };

// module.exports = {
// updateRole
// };
