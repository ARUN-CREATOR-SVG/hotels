// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user.username);

// var note=require('./notes.js');


// fs.appendFile('greeting.txt','Hi'+user.username+'\n',()=>console.log('file is added'));
// console.log(12);
// var add=function(a,b){
//     return a+b;
// }

// console.log(note.age);

// JSON TO OBJECT CONVERSION
// const nakliobj='{"name":"Arun","Age":20,"Hobbies":["cricket","football","tv"]}';
// const asli=JSON.parse(nakliobj);
// console.log(nakliobj.Hobbies);
// console.log(asli.Hobbies);;

// ----------------------------------------------------------------CREATING SERVER------------------------------------------------
////****(req.body typically contains the parsed JSON or URL-encoded data sent by the client in a POST request.)
const express = require('express');
const app = express();
const db=require('./db');
const path = require('path');
require('dotenv').config();
// // server knows it has an env file and 


// Serve static files from the public directory
const bodyParser=require('body-parser');//converts recieved  data to  json 
app.use(bodyParser.json());
// //This line configures Express.js to serve static files from the 'public' directory, which typically includes HTML, CSS, client-side JavaScript, images, and other assets. It uses __dirname to get the current directory path and path.join() to construct the full path to the 'public' directory
app.use(express.static(path.join(__dirname, './public')));
// //This line sets up middleware to parse URL-encoded data from the body of HTTP requests. URL-encoded data is typically sent from HTML forms using the application/x-www-form-urlencoded content type. Express provides middleware (express.urlencoded()) to parse this data and make it available in req.body of the request handlers. The {extended: false} option specifies that the query string parsing should use the querystring library (built into Node.js) instead of the qs library (a more feature-rich alternative). Setting extended to false means that the URL-encoded data will be parsed using the querystring library's basic parsing mode, which results in simpler objects being produced.
app.use(express.urlencoded({extended:false}));

// //--------------------------------------------------------------------------------

// // ===============================MYSQL CONNECTION=========================================
// var mysql=require('mysql');
// var connection=require('./mysqlcon');
// //-------------------------------------------------------------------------------
//  app.get('/employee', function(req, res) {
//   // Assuming you have a table named 'employees'
//   connection.query('SELECT * FROM employee', function(error, results, fields) {
// // //This fields parameter contains metadata about the columns in the result set & result store sql query execution result
//     if (error) {
//       console.log("Error querying database:", error);
//       res.status(500).send("Error querying database");
//     } else {
//       console.log("Employees fetched successfully:", results);
//       results.forEach(function(employee) {
//         // Assuming 'dob' is the field in the employee object containing the date of birth
//         if (employee.dob) {
//           // Format the date of birth as a locale string (e.g., 'mm/dd/yyyy')
//           employee.dob = new Date(employee.dob).toLocaleDateString();
//         }
//       });
//       res.send(results); // Sending the fetched employee data as response
//     }
//   });
// });
// ------------------------------------------------------------------------------
//  //===============================================================================

// //=============================Endpoints=======================================

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/chicken', function (req, res) {
    res.send('Sure sir i would like to serve you chicekn')
  })

  app.get('/idli',(req,res)=>{
  var menu={
    name:'Rava idli',
    is_Sambhar:true,
    size:"Regular",
    is_chutney:false,
    }
  res.send(menu);
  })


 app.post('/items',(req,res)=>{
  res.send('data is shared through post');
 })
// //=============================================================================================


  //  // import the router files
  const personRoutes=require('./routes/personroutes');
  app.use('/person',personRoutes);


  const PORT=process.env.PORT||4000;

  app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);

  });
