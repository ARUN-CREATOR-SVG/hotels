// const { connection } = require("mongoose");
var mysql=require('mysql');
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Arun@2003",
    database:"test"
});
connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
  
    console.log('Connected to MySQL database as id ' + connection.threadId);
  });
  

  connection.query('SELECT * FROM employee', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

module.exports=connection;