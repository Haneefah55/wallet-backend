
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  pendingEmail: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  googleId: String,
  facebookId: String,
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  image: String,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,


}, { timestamps: true })


userSchema.pre("save", async function (next) {
  if(!this.isModified("password"))
    return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
    
  } catch (error) {
    console.error(error);
  }
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
  
}

const User = mongoose.model("User", userSchema)

export default User
  