import {  WELCOME_EMAIL_TEMP, EMAIL_CHANGE_TEMP, VERIFY_ACCOUNT_TEMP, ACCT_VERIFIED_TEMP } from "./emailTemplate.js"
import { sendEmail } from "./emailConfig.js"

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


export const sendEmailChangedConfirmation = async(email, name, newEmail, date) =>{

  const now = new Date()
  const currentYear = now.getFullYear()
  
  const subject = "Email Change Confirmation"
  const html = EMAIL_CHANGE_TEMP.replaceAll("{name}", name).replaceAll("{year}", currentYear).replaceAll("{date}", date ).replaceAll("{newEmail}", newEmail).replaceAll("{email}", email).replaceAll("{date}", date ).replaceAll("{newEmail}", newEmail).replaceAll("{year}", currentYear)
  

  await sendEmail(email, subject, html)
  

 

}

export const sendVerificationEmail = async(email, name, code) =>{
  const date = new Date()
  const currentYear = date.getFullYear()

  const subject= "Verify your account"
  const html= VERIFY_ACCOUNT_TEMP.replaceAll("{name}", name).replaceAll("{year}", currentYear).replaceAll("{code}", code)

  await sendEmail(email, subject, html)
}


export const sendEmailChangeVerification = async(email, name, code, newEmail) =>{

  const date = new Date()
  const currentYear = date.getFullYear()


  const subject= "Verify your new email address"
  const html= EMAIL_CHANGE_TEMP.replaceAll("{name}", name).replaceAll("{year}", currentYear).replaceAll("{code}", code ).replaceAll("{newEmail}", newEmail).replaceAll("{email}", email)
  



  await sendEmail(email, subject, html)
  
}

export const sendAccountVerifiedEmail = async(name, email) =>{

  const now = new Date()
  const currentYear = now.getFullYear()
  
  const subject = "Account Verified"
  const html = ACCT_VERIFIED_TEMP.replaceAll("{name}", name).replaceAll("{year}", currentYear)
  

  await sendEmail(email, subject, html)
  

}

export const sendWelcomeEmail = async (email, name) =>{

  //to get current year
  const date = new Date()
  const currentYear = date.getFullYear()
  
  const subject = "Welcome to Wallet! Lets Master Your Money"
  const html= WELCOME_EMAIL_TEMP.replaceAll("{name}", name).replaceAll("{year}", currentYear)

  await sendEmail(email, subject, html)

  
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