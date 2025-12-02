import {  WELCOME_EMAIL_TEMP } from "./emailTemplate.js"
import { transporter, sender } from "./emailConfig.js"

/** 
export const sendVerificationEmail= async (email, verificationToken) =>{

  
  const verificationEmail = {
  from: sender,
  to: email,
  subject: "Verify your email",
  html: VERIFICATION_EMAIL_TEMP.replace("{verificationCode}", verificationToken),
  
  };

  transporter.sendMail(verificationEmail, function(error, info){
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log('Email sent: ',  info.response);
    }
  });
    
    

}

**/

export const sendWelcomeEmail = async (email, name) =>{

  //to get current year
  const date = new Date()
  const currentYear = date.getFullYear()
  
  const welcomeEmail = {
  from: sender,
  to: email,
  subject: "Welcome to Wallet! Lets Master Your Money",
  html: WELCOME_EMAIL_TEMP.replaceAll("{name}", name).replaceAll("{year}", currentYear),
  };

  transporter.sendMail(welcomeEmail, function(error, info){
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log('Email sent: ',  info.response);
    }
  });
  
}

/** 
export const sendPasswordResetEmail = async (email, resetUrl) =>{
  
  
  const passwordReset = {
  from: sender,
  to: email,
  subject: "Password reset",
  html: PASSWORD_RESET_REQUEST_TEMP.replace("{resetUrl}", resetUrl),
  };

  transporter.sendMail(passwordReset, function(error, info){
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log('Email sent: ',  info.response);
    }
  });
  
}



export const sendResetSuccessEmail = async (email) =>{
  
  
  const resetSuccess = {
  from: sender,
  to: email,
  subject: "Password Reset Successful ",
  html: RESET_SUCCESS_TEMP,
  };

  transporter.sendMail(resetSuccess, function(error, info){
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log('Email sent: ',  info.response);
    }
  });
  
  
} 

*/