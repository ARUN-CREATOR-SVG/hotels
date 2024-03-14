// ----------------------------------------------------------------CREATING SERVER------------------------------------------------
////****(req.body typically contains the parsed JSON or URL-encoded data sent by the client in a POST request.)
const express = require('express');
const app = express();
const db=require('./db');
const path = require('path');
require('dotenv').config();
const Person=require('./models/person');
const passport=require('./auth');

// Serve static files from the public directory
const bodyParser=require('body-parser');//converts recieved  data to  json 
app.use(bodyParser.json());
// //This line configures Express.js to serve static files from the 'public' directory, which typically includes HTML, CSS, client-side JavaScript, images, and other assets. It uses __dirname to get the current directory path and path.join() to construct the full path to the 'public' directory
app.use(express.static(path.join(__dirname, './public')));
// //This line sets up middleware to parse URL-encoded data from the body of HTTP requests. URL-encoded data is typically sent from HTML forms using the application/x-www-form-urlencoded content type. Express provides middleware (express.urlencoded()) to parse this data and make it available in req.body of the request handlers. The {extended: false} option specifies that the query string parsing should use the querystring library (built into Node.js) instead of the qs library (a more feature-rich alternative). Setting extended to false means that the URL-encoded data will be parsed using the querystring library's basic parsing mode, which results in simpler objects being produced.
app.use(express.urlencoded({extended:false}));

// //==================================Middleware Functions=========================

// //Midlleware- It is a software that sits between the clients and the server. Passport.js acts as a middleware, intercepting requests and adding authentication-related functionality to them.
// //Strategy:Passport.js uses the concept of strategies for handling different authentication methods.
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to url :${req.originalUrl}`);
  next();
}

app.use(logRequest);  // // will be used in all endpoints 
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})
// //===============================================================================
  app.get('/',function (req, res) {
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


  //  // ===============import the router files==========
  const personRoutes=require('./routes/personroutes');
  const menuItemRoutes = require('./routes/menuItemRoutes');
  app.use('/person',personRoutes);
  app.use('/menu', menuItemRoutes);
// //===================================================

  const PORT=process.env.PORT||4000;

  app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});