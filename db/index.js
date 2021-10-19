// this will direct traffic
const { connect } = require("./connection");
const connection = require("./connection");

// queries - dept, salaries, each data search
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  view_departments() {
    return this.connection.query('SELECT * FROM department')
  }
}

class Employee {
  constructor() {
    this.department;
    this.department_id;
    this.title;
    this.first_name;
    this.last_name;
    this.salary;
    this.role_id;
    this.manager_id;
  }
}

module.exports = new DB(connection);
// OUTSIDE const INSIDE class
// You might want to use a separate file that contains 
// functions for performing specific SQL queries you'll need to use. 
// A constructor function or class could be helpful for organizing these. 
// You might also want to include a `seeds.sql` file to pre-populate your database, 
// making the development of individual features much easier.
