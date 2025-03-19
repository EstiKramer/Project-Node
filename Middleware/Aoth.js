import jwt from "jsonwebtoken"
const AouthMiddleware = (req,res,next)  => {
    try{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({message:"No token provided"})
    req.user=  jwt.verify(token, process.env.JWT_SECRET)
    next()
    } catch(err){
        res.status(401).json({message: "Invalid token"})
    }
   
}
 
export default AouthMiddleware;