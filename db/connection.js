// Import and require mysql2
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');

// Connect to database
const Connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password here
    password: 'xkcd$$00',
    database: 'employee_db'
  },
  console.log(`Connected to the movies_db database.`)
);

Connection.connect(function (err){
  if (err) throw(err);
})

module.exports = Connection;