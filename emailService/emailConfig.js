import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()


export const sender = '"Wallet" <process.env.USER_EMAIL>'

export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use 'gmail' or any other service, or specify custom SMTP settings
  auth: {
    user: process.env.USER_EMAIL, // Your email
    pass: process.env.USER_PASSWORD, // Your email password or app password
  },
});