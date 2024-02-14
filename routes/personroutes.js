// //express router is a way to modularize and organise your route handling code in an Express.js app
//it is like traffic cop for your web server
const express=require("express");
const router=express.Router();
const person=require('./../models/person');

router.post('/', async (req,res)=>{
    try{
    //body parser process the data and store it in req.body
    const data=req.body;
  // create a new person document using the mongoose model
  const newPerson=new person(data);
  // save the  new person to the database
  const response=await newPerson.save();
  console.log("data saved");
  res.status(200).json(response);
  }
  catch(err){
  console.log("Error");
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
  // //paramAterized endpoint
  router.get('/:worktype', async (req,res)=>{
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