// //express router is a way to modularize and organise your route handling code in an Express.js app
//it is like traffic cop for your web server
const express=require("express");
const router=express.Router();
const person=require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

router.post('/signup', async (req,res)=>{
    try{
    //body parser process the data and store it in req.body
    const data=req.body;
  // create a new person document using the mongoose model
  const newPerson=new person(data);
  // save the  new person to the database
  res.send('we have got your data hahahaha')
  const response=await newPerson.save();
  console.log("data saved");
  const payload={
    id:response.id,
    username:response.username
  }
 

  const token=generateToken(payload);
  console.log("Token is: ",token);
  res.status(200).json({response:response,token:token});
  }
  catch(err){
  console.log("Error",err);
  res.status(500).json({error:"Internal server error"});
  }
  })
  
  //Login Routes for login

  router.post('/login', async (req,res)=>{
    try{
      // Extract username and password from request body

      const {username,password}=req.body;

      // Find user by username
      const user=await person.findOne({username:username});

      // if user does'nt exist or password doesn't match
      if(!user||!(await user.comparePassword(password))){
        return res.status(401).json({error:"Invalid username or password"});
      }

      //generate token
      const payload={
        id:user.id,
        username:user.username
      }

      const token=generateToken(payload);

      // return token as response
      res.json({token});
    }
    catch(err){
      console.log("Error",err);
      res.status(500).json({error:"Internal server error"})
    }
  })



  router.get('/profile', jwtAuthMiddleware,async(req,res)=>{
    try{
      // after a user logs in successfully, their user information may be stored in req.user for subsequent requests.
      const userData=req.user;
      console.log("user data: ",userData);

      const userId=userData.id;
      const user=await person.findById(userId);
      res.status(200).json({user});
    }
    catch(err){
      console.log("Error",err);
      res.status(500).json({error:"Internal server error"});
    }
  })



  router.get('/',async (req,res)=>{
    try{
        const data=await person.find();
        console.log("data fetched");
        res.status(200).json(data);
  
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"});
    }
  })
  //paramAterized endpoint
  router.get('/worktype/:worktype', async (req,res)=>{
    try{
      const worktype=req.params.worktype;
      if(worktype=="chef"||worktype=="manager"||worktype=="waiter"){
        const response=await person.find({work:worktype});
        console.log("data fetched");
        res.status(200).json(response);
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"});
    }
  })

    router.get('/name/:name',async (req,res)=>{
      try{
        const personbyName=req.params.name;
        const response=await person.findOne({name:personbyName})
        console.log(req.params.name);
        if(response)console.log("person found");
        else {
          console.log("Person not found");
        }
        res.status(200).json(response);
      }
      catch(err){
        console.log(err);
      res.status(500).json({error:"Internal server error"});
      }

    })
  // // update the data by using unique id(object id assigned by mongodb)
  router.put('/:id', async(req,res)=>{
    try{
        const personid=req.params.id;//extract id from url parameter
        const updatedPersonData=req.body;

        const response= await person.findByIdAndUpdate(personid,updatedPersonData,{
            new:true, // //return the updated document
            runValidators:true //run mongoose validation we set like required:true in schema we created
        })

        if(!response){
            return res.status(404).json({error:"Personn not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
      }
  })

  ////deleting the data
  router.delete('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"Personn not found"});
        }
        console.log("data DELETED");
        res.status(200).json({MESSAGE:"person deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
      }
  })


  module.exports=router;