const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
// Define the person schma
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});
personSchema.pre('save',async function(next){
     // Perform some operation before saving the document
     const person=this;//tthis refers to the document being saved. 
     if(!person.isModified('password'))   return next();
     try{
            // hash password generation
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(person.password,salt);
            person.password=hashedPassword;
             // Call next() to proceed with saving the document in db
             next();
        }
        catch(err){
            return next(err);
        }
})

// create person model
personSchema.methods.comparePassword=async  function(candidatePassword){
    try{
        // use bycrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        // compare method extracts the salt from hashed password and use it with entered password and then compare resulting hash and stored hash
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
const Person=mongoose.model('Person',personSchema);
module.exports=Person;

