
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
  view_roles() {
    return this.connection.query('SELECT * FROM role')
  }
  view_employees() {
    return this.connection.query('SELECT * FROM employee')
  }
  add_roles() {
    return this.connection.query('SELECT ')
  }
  add_employees() {
    return this.connection.query('SELECT ')
  }
  edit_roles() {
    return this.connection.query('SELECT ')
  }
  edit_employees() {
    return this.connection.query('SELECT ')
  }
  exit() {
    return this.connection.query('')
  } 
};


module.exports = new DB(connection);
// OUTSIDE const INSIDE class
// You might want to use a separate file that contains 
// functions for performing specific SQL queries you'll need to use. 
// A constructor function or class could be helpful for organizing these. 
// You might also want to include a `seeds.sql` file to pre-populate your database, 
// making the development of individual features much easier.
