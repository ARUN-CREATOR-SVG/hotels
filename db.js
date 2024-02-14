// //this db.js file is responsible for connection between your noedjs application and your mmongodb database using Mongoose Library

const mongoose=require('mongoose');
require('dotenv').config();
// // Define the MongoDb connection url
// const mongoURL="mongodb://localhost:27017/hotels"      ////for local system
// const mongoURL="mongodb+srv://arunsin2212:as22insta@cluster0.3nb5qyk.mongodb.net/"
const mongoURL=process.env.MONGODB_URL

// set up MongoDB connection
mongoose.connect(mongoURL
// {
// useNewUrlParser:true,
//     useUnifiedTopology:true
//  no use it has been removed }
)

// //Get the default connection
// // Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;//this obj is we will use to handle events and interect with databases


// //Event Listener
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('disconnected',()=>{
    console.log(' MongoDB Connection error ');
})

// //Export the database connection
module.exports=db;