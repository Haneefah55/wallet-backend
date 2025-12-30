import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()


export const sender = '"Wallet" <process.env.USER_EMAIL>'


export const sendEmail = async(email, subject, html) =>{

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // You can use 'gmail' or any other service, or specify custom SMTP settings
    auth: {
      user: process.env.USER_EMAIL, // Your email
      pass: process.env.USER_PASSWORD, // Your email password or app password
    },
    tls: {
      rejectUnauthorized: false,
    }

  });

  await transporter.sendMail({
    from: sender,
    to: email,
    subject,
    html,
    

  },

    function(error, info){
      if (error) {
        console.log("Error sending email", error);
      } else {
        console.log('Email sent: ',  info.response);
      }
    }

  )


  transporter.close()

}
 