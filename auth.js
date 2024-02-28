const Person=require('./models/person');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;////handling username and password based authentication.It extracts username and password from the request body

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    ////done is a callback function t
    // //authentication logic here
    try{
        // console.log('Recieved Confidential: ',USERNAME,password);
        const user=await Person.findOne({username:USERNAME});
        if(!user){
          // // done take three parameters error,user,message/info
          return done(null,false,{message:'Incorrect username'});
        }
        const isPassword=await user.comparePassword(password);
        if(isPassword){
          return done(null,user);
        }
        else{
          return done(null,false,{message:'Incorrect-password.'});
        }
    }
    catch(err){
        return done(err);
    }
  }))
  
module.exports=passport;