import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'
import { sendWelcomeEmail } from '../emailService/email.js'
import { generateToken, generateTokenAndSetCookie } from "../utils/generateToken.js"
//import crypto from 'crypto'
import axios from 'axios'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

//const link = process.env.NODE_ENV === "development" ? process.env.EXPO_LINK : process.env.APP_LINK

export const signup = async(req, res) =>{
  
  const { name, email, password } = req.body
  
  try {
    
    if(!name || !email || !password){

    return res.status(400).json({ success: false, message: "All fields are required" })
    }

    if(password.length < 6){
      return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" })
    }

    const userExist = await User.findOne({email})
    if(userExist){
      return res.status(400).json({ success: false, message: "User already exist" })
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
    
    const user = new User({
      name,
      email,
      password,
      verificationToken,
    })


    await user.save()

    //jwt authenticate user
    //generateTokenAndSetCookie(res, user._id, user.tokenVersion)
    
    await sendWelcomeEmail(user.email, user.name)
    
    
    console.log("User created successfully")
    
    res.status(201).json({ 
        success: true,
        message: "User created successfully",
       
    })
    
  } catch (error) {
    console.error("Error in signup contoller", error.message);
    res.json({ 
      success: false,
      message: error.message
    })
  }
  
  
}


export const login = async(req, res) =>{
  
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ email })
  
    if(user && (await user.comparePassword(password))) {
      
      
      generateTokenAndSetCookie(res, user._id, user.tokenVersion)
      

    
    
      user.lastLogin = new Date()
    
      await user.save()
        
      console.log("User login successfully")
    
      res.status(200).json({ ...user._doc, password: undefined })

    } else {
      throw new Error("Incorrect email or password")
    }
  } catch (error) {
    console.error("Error in login contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const googleAuth = async (req, res) => {
  
  const { name, email, googleId } = req.body

  //let user = null
  
  const user = await User.findOne({email})

  
  try {

    if(!user){
      user  = await User.create({
        name,
        email,
        googleId

      })

      await user.save()
    
    } else if(!user.googleId){

      user.googleId === googleId

      
    }

    generateTokenAndSetCookie(res, user._id, user.tokenVersion)

    
    
    user.lastLogin = new Date()
    await user.save()
    console.log("User login successfully")
    res.status(200).json({ ...user._doc, password: undefined })

  } catch (error) {
    console.error("Error in googleAuth controller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
    
  }
}


export const facebookAuth = async (req, res) => {
  
  const { name, email, facebookId } = req.body

  //let user = null
  
  const user = await User.findOne({email})

  
  try {

    if(!user){
      user  = await User.create({
        name,
        email,
        facebookId

      })

      await user.save()
    
    } else if(!user.googleId){

      user.facebookId === facebookId

      
    }

    generateTokenAndSetCookie(res, user._id, user.tokenVersion)

    
    
    user.lastLogin = new Date()
    await user.save()
    console.log("User login successfully")
    res.status(200).json({ ...user._doc, password: undefined })

  } catch (error) {
    console.error("Error in facebookAuth controller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
    
  }
}

export const getUser = async(req, res) =>{
  

  
  try {
    const user = await User.findById(req.user._id).select("-password")

    if(!user){
      res.status(404).json({ success: false, message: "User not found"})
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Error in get user contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}

export const logoutUser = async (req, res) =>{

  try {

    const user = req.user

    await User.findByIdAndUpdate(user._id, {
      $inc: { tokenVersion: 1 }
    })
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",

    })

    console.log("toknver", user.tokenVersion)
    console.log("User logout successfully")
    
    res.status(200).json({success: true, message: "User logout successfully"})
  } catch (error) {
    console.error("Error in logout contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
  
}


export const authGoogle = async (req, res) => {
  
  const authUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent('profile email')}`

  res.redirect(authUri)
}


export const callback = async (req, res) => {

  const { code } = req.query
  
  try {

    const googleRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    })
    console.log("callback successful")
    //console.log("googleRes.data", googleRes.data)

    const { id_token, access_token } = googleRes.data

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    //console.log("payload", payload)

    const { email, name, sub: googleId } = payload

    // check if user is already created

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
        

      })

      await sendWelcomeEmail(user.email, user.name)

      
    } 

   

      
    user.isVerified = true
    user.lastLogin =  new Date()
  
    await user.save()

    const token = generateToken(user._id, user.tokenVersion)
      
    console.log("User login successfully")

    //console.log(user)

    const userString = encodeURIComponent(JSON.stringify(user))
    const redirect_uri = `exp://10.33.63.215:8081/--/(auth)/callback?token=${token}` 
    
    res.redirect(redirect_uri)
   
    
    
  } catch (error) {

    console.log(error)
  
    const redirect_uri =  `exp://10.33.63.215:8081/--/(auth)/login`
    res.redirect(redirect_uri)
     
  }
}


export const verifyToken = async (req, res) => {

  const token = req.body

  if(!token){
    return res.status(400).json({ error: "no token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    const user = await User.findById(decoded.userId).select("-password")

    if(user.tokenVersion !== decoded.tokenVersion) {
      
      return res.status(401).json({ message: "Unauthorized" })
    }

    res.cookie("token", assessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    
    res.json(user)

  } catch (error) {
    console.error("Error in verify token contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
  
}