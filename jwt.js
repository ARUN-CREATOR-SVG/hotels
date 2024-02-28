const jwt=require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
    // Extract the jwt token from the request header
    //.split(' '): This splits the Authorization header string into an array of substrings, using a space (' ') as the delimiter. This is done to separate the word "Bearer" from the actual token.


    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:"Token not found"})

    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'})
    try{
        //verify the JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        // Attach user information to the request object
        req.user=decoded
        next();

    }
    catch(err){
        console.log("error");
        res.status(401).json({error:"Incoorect message"});
    }
}

//function to generate jwt token
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,/*{expiresIn:100}*/)
}
module.exports={jwtAuthMiddleware,generateToken};