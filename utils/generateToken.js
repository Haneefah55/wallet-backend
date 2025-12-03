import jwt from 'jsonwebtoken'


export const generateTokenAndSetCookie = (res, userId, tokenVersion) =>{
  const token = jwt.sign({ userId, tokenVersion }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d"
  })
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  
  return token
}

export const generateToken= (userId, tokenVersion) =>{
  const token = jwt.sign({ userId, tokenVersion }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d"
  })

  return token
}

