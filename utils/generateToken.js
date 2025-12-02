import jwt from 'jsonwebtoken'


const generateTokenAndSetCookie = (res, userId, tokenVersion) =>{
  const assessToken = jwt.sign({ userId, tokenVersion }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d"
  })
  
  res.cookie("token", assessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  
  return assessToken
}

export default generateTokenAndSetCookie