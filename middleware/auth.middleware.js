import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'


export const protectRoute = async(req, res, next) =>{
  
  try {
    
    const accessToken = req.cookies.token
     if(!accessToken){
       return res.status(401).json({ message: "Unauthorized" })
     }
     
     const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET)
     const user = await User.findById(decoded.userId).select("-password")

     if(user.tokenVersion !== decoded.tokenVersion) {
      
      return res.status(401).json({ message: "Unauthorized" })
     }
     
     
     req.user = user
     next()
     
  } catch (error) {
    console.error("Error in protect route contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
  
}