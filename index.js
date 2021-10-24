const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// moved db to root index.js for my own clarity and sanity
// Connect to database (used to be inside db folder)
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "xkcd$$00",
    database: "employee_db",
  },
  console.log(
    "|~-~-~-~-~-~-~-~-~-~-| ----------------------------------- |~-~-~-~-~-~-~-~--~-~|"
  ),
  console.log(
    "|~-~-~-~-~-~-~-~-~-~-| * WELCOME TO THE COMPANY DATABASE * |~-~-~-~-~-~-~-~--~-~|"
  ),
  console.log(
    "|~-~-~-~-~-~-~-~-~-~-| ----------------------------------- |~-~-~-~-~-~-~-~--~-~|"
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
      type: "list",
      name: "main_menu",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add a department",
        "View all roles",
        "Add a role",
        "View all employees",
        "Add an employee",
        "Edit an employee role",
        "Exit",
      ],
      // switch case to call the corresponding fx per the user's selection
    })
    .then((answer) => {
      switch (answer.main_menu) {
        case "View all departments":
          viewDepartments();
          break;

        case "Add a department":
          addDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "Add a role":
          addRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add an employee":
          addEmployees();
          break;

        case "Edit an employee role":
          editEmpRoles();
          break;

        default:
          console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          console.log("|~-~-~-Now exiting, goodbye!-~-~-~|");
          console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          db.end();
      }
    });
}

// Fx to view department(s)
function viewDepartments() {
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW VIEWING ALL DEPARTMENTS-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  db.query("SELECT * FROM department", function (err, rows) {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    // brings up main_menu again
    init(
      console.log(
        "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
      )
    );
  });
}

// Fx to add department(s)
function addDepartments() {
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW ADDING A DEPARTMENT-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  inquirer
    .prompt([
      {
        type: "input",
        name: "add_departments",
        message: "Please name the new department:",
      },
      // {
      //   type: "input",
      //   name: "add_departments_id",
      //   message: "Please provide the ID for the new department:",
      // }
    ])
    .then(function (res) {
      db.query(
        `INSERT INTO department (department_name) VALUES (?)`,
        [res.add_departments],
        function (err, res) {
          console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          console.log("|~-~-~-YES,  NEW DEPARTMENT ADDED!-~-~-~|");
          console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
          init(
            console.log(
              "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
            )
          );
        }
      );
    });
}

// Fx to view role(s)
function viewRoles() {
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW VIEWING ALL ROLES-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  db.query("SELECT * FROM role", function (err, res) {
    if (err) {
      console.log(err);
    }
    console.table(res);
    // brings up main_menu again
    init(
      console.log(
        "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
      )
    );
  });
}

// Fx to add role(s)
function addRoles() {
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW ADDING  AN EMPLOYEE-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What corresponding department ID this role will be in?",
      },
    ])
    .then((data) => {
      const query = "INSERT INTO role SET ?";
      // create an object from the user inputs
      const userInput = {
        title: data.title,
        salary: data.salary,
        department_id: data.department_id,
      };
      //calling the db file and passing in the query and object of user input to the MySQL database
      db.query(query, userInput, (err, res) => {
        //error handling
        if (err) throw err;
        //console success message
        console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
        console.log("|~-~-~- YES, NEW ROLE ADDED!-~-~-~|");
        console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
        //returning the program to the file containing the inquirer prompts
        init(
          console.log(
            "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
          )
        );
      });
    });
}

// Fx to view employee(s)
function viewEmployees() {
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW VIEWING ALL EMPLOYEES-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  db.query(
    "SELECT employee.id, first_name, last_name, title, department_name, department_id, manager_id FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id ORDER BY employee.id ASC",
    function (err, res) {
      if (err) {
        console.log(err);
      }
      console.table(res);
      // brings up main_menu again
      init(
        console.log(
          "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
        )
      );
    }
  );
}

// Fx to add employee(s)
function addEmployees() {
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW ADDING  AN EMPLOYEE-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  inquirer
    //function to collect user input
    .prompt([
      {
        type: "input",
        name: "empFirst",
        message: "What is their first name?",
      },
      {
        type: "input",
        name: "empLast",
        message: "What is their last name?",
      },
      {
        type: "input",
        name: "empRole",
        message: "What will be their Employee Role ID?",
      },
      {
        type: "input",
        name: "empMGMT",
        message: "Please enter their manager's ID number:",
      },
    ])
    .then((data) => {
      const query = "INSERT INTO employee SET ?";
      // create an object from the user inputs
      const userInput = {
        first_name: data.empFirst,
        last_name: data.empLast,
        role_id: data.empRole,
        manager_id: data.empMGMT,
      };
      //calling the db file and passing in the query and object of user input to the MySQL database
      db.query(query, userInput, (err, res) => {
        //error handling
        if (err) throw err;
        //console success message
        console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
        console.log("|~-~-~- YES, NEW EMPLOYEE ADDED!-~-~-~|");
        console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
        //returning the program to the file containing the inquirer prompts
        init(
          console.log(
            "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
          )
        );
      });
    });
}

// Fx to edit employee role(s)
function editEmpRoles() {
  // SQL to pick from db employees
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
  console.log("|~-~-~-NOW EDITING A CURRENT EMPLOYEE ROLE-~-~-~|");
  console.log("|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|");
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
                  type: "list",
                  name: "edit_emp_role",
                  message: "Please select the new role",
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
                // UPDATE the employee_db
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
                      console.log(
                        "|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|"
                      );
                      console.log(
                        "|~-~-~-YES,  EMPLOYEE ROLE SUCCESSFULLY UPDATED!-~-~-~|"
                      );
                      console.log(
                        "|~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~|"
                      );
                      init(
                        console.log(
                          "|~-~-~-~-~-~-~-~-~-~-| WELCOME BACK TO THE COMPANY DATABASE MENU |~-~-~-~-~-~-~-~--~-~|"
                        )
                      );
                    }
                  }
                );
              });
          });
        });
    }
  );
}
