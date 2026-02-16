


export const WELCOME_EMAIL_TEMP = `

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="view-port" content="width=device-width, initial-scale = 1.0"> 
   <title>Welcome to Wallet!</title> 
  </head>
  <body style = "font-family: Poppins, sans-serif; margin: 0, auto; max-width: 600px; padding: 20px; color: #383838;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #a51616; margin: auto; font-size: 25px;">Wallet</h1>
    </div>
    <div style="background-color: #ecd3d3; padding: 20px; border-radius: 0 5px 5px 0; box-shadow:  0 2px 5px rgba(0,0,0,0.1);">
      <h3>Hi, {name}</h3>
      <p>A huge welcome to <strong>Wallet</strong> family!. Get ready to transform how you manage your money.</p>

      <p>With <strong style="color: #a51616;">Wallet</strong>, you can:</p>

      <ul>
        <li><strong>Log expenses in seconds</strong> from your phone</li>
        <li><strong>See clear visual reports</strong> of your spending</li>
        <li><strong>See monthly budgets</strong> and stick to your financial goals</li>
        
      </ul>

      <h3>Ready to dive in? <br /> Here's how to get the most out of Wallet:</h3>

      <ul style="list-style: outside;">
        <li><strong>1. Add your first transcation:</strong> Tap on the '+' button</li>
        <li><strong>2. Create a budget:</strong> Go to 'Budget' section to set your fist spending</li>
        <li><strong>3. Explore reports:</strong> Check the 'Insight' tab to see a breakdown of your finances</li>
       
      </ul>

      <p>We built <strong>Wallet</strong> to make financial clarity accessible to all. We're excited to be on this journey with you.</p>

      <p>All the best</p>
      <h3>The Wallet Team</h3>
    
        

      
      <div style="color: #a51616; margin-top: 2rem; text-align: center; font-size: 15px;">
        <p><a href="#">Unsubscribe</a></p>
        <p>© {year} Wallet, Inc All right reserved.</p>
      </div>
      
    </div>
  </body>
</html>
`

export const EMAIL_CHANGE_TEMP =`

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="view-port" content="width=device-width, initial-scale = 1.0"> 
   <title>Email Change Verification</title> 
  </head>
  <body style = "font-family: Poppins, sans-serif; margin: 0, auto; max-width: 600px; padding: 20px; color: #383838;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #a51616; margin: auto; font-size: 25px;">Wallet</h1>
    </div>
    <div style="background-color: #ecd3d3; padding: 20px; border-radius: 0 5px 5px 0; box-shadow:  0 2px 5px rgba(0,0,0,0.1);">
      <h3>Hi, {name}</h3>
      <p>We received a request to change the email address associated with your  <strong>Wallet</strong> account.</p>

      <p>Old email <strong style="color: #a51616;">{email}</strong></p>
      <p>New email <strong style="color: #a51616;">{newEmail}</strong></p>


      <p style="text-align: center;">Your verification code is <br /><strong style="color: #4b4a4a; font-size: larger;">{code}</strong></p>

      <h4>Important Notice:</h4>

      <ul>
        <li>If you didn't request foe the email change, please ignore this message and contact our support team immediately</li>
        <li>Your email address will not be changed until you verify the new email address</li>
        <li>For security purposes, the verification code will expire in 10 minutes</li>
       
      </ul>

      <h4>Need help?</h4>

      <p>Contact our support team at <b>support@wallet.com</b>, or call our help center +23 586 3475 88393</p>

      

      <h3>Security Tips:</h3>

      <ul>
        <li>Never share your verification code with anyone</li>
        <li>Our team will never ask for your password or code</li>
        
       
      </ul>

      <h3>Thanks,<br />The Wallet Team</h3>


      <p><i>This is an automated message.Please do not reply directly to this email</i></p>

      
    
        

      
      <div style="color: #a51616; margin-top: 2rem; text-align: center; font-size: 15px;">
        <p><a href="#">Unsubscribe</a></p>
        <p>© {year} Wallet, Inc All right reserved.</p>
      </div>
      
    </div>
  </body>
</html>

`

export const EMAIL_CHANGE_CONFRM = `




<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="view-port" content="width=device-width, initial-scale = 1.0"> 
   <title>Email Update Confirmation</title> 
  </head>
  <body style = "font-family: Poppins, sans-serif; margin: 0, auto; max-width: 600px; padding: 20px; color: #383838;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #a51616; margin: auto; font-size: 25px;">Wallet</h1>
    </div>
    <div style="background-color: #ecd3d3; padding: 20px; border-radius: 0 5px 5px 0; box-shadow:  0 2px 5px rgba(0,0,0,0.1);">
      <h3>Hi, {name}</h3>
      <p>We are writing to confirm that the email address for your <strong>Wallet</strong> account has been successfullu updated.</p>

      <p>Old email <strong style="color: #a51616;">{email}</strong></p>
      <p>New email <strong style="color: #a51616;">{newEmail}</strong></p>
      <p>Date changed <strong style="color: #a51616;">{date}</strong></p>


      

      <h4>What this means:</h4>

      <ul>
        <li>You will use your new email to log in to your account</li>
        <li>All future account notififcations will be sent to your new email address</li>
        <li>Your account settings and data remain unchanged</li>
       
      </ul>

      <h4>Need help?</h4>

      <p>Contact our support team at <b>support@wallet.com</b>, or call our help center +23 586 3475 88393</p>

      

      <h3>Thanks,<br />The Wallet Team</h3>


      <p><i>This is an automated message.Please do not reply directly to this email</i></p>

      
    
        

      
      <div style="color: #a51616; margin-top: 2rem; text-align: center; font-size: 15px;">
        <p><a href="#">Unsubscribe</a></p>
        <p>© {year} Wallet, Inc All right reserved.</p>
      </div>
      
    </div>
  </body>
</html>
`

export const VERIFY_ACCOUNT_TEMP = `
  
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="view-port" content="width=device-width, initial-scale = 1.0"> 
   <title>Verify Your Account</title> 
  </head>
  <body style = "font-family: Poppins, sans-serif; margin: 0, auto; max-width: 600px; padding: 20px; color: #383838;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #a51616; margin: auto; font-size: 25px;">Wallet</h1>
    </div>
    <div style="background-color: #ecd3d3; padding: 20px; border-radius: 0 5px 5px 0; box-shadow:  0 2px 5px rgba(0,0,0,0.1);">
      <h3>Hi, {name}</h3>
      <p>Welcome to <strong>Wallet</strong>, to complete your account setup and start tracking your expenses and budget seamlessly, Please verify your email address usin the 6digit code below:</p>

      
      <p style="text-align: center;"><strong style="color: #a51616; font-size: xx-large;">{code}</strong></p>


      <p><i>This verification code will expire in 10 minutes</i></p>

      <h4>Important Notice:</h4>

      <ul>
        <li>Never shared your code with anyone</li>
        <li>Our team will never ask for your password or code</li>
        <li>If you didn't request for this code, please ignore this message and contact our support team immediately</li>
        <li>Your email address will not be changed until you verify the new email address</li>
        <li>For security purposes, the verification code will expire in 10 minutes</li>
       
      </ul>
      

      

      <h4>Need help?</h4>

      <p>Contact our support team at <b>support@wallet.com</b>, or call our help center +23 586 3475 88393</p>

      

      <h3>Thanks,<br />The Wallet Team</h3>


      <p><i>This is an automated message.Please do not reply directly to this email</i></p>

      
    
        

      
      <div style="color: #a51616; margin-top: 2rem; text-align: center; font-size: 15px;">
        <p><a href="#">Unsubscribe</a></p>
        <p>© {year} Wallet, Inc All right reserved.</p>
      </div>
      
    </div>
  </body>
</html>

`
export const ACCT_VERIFIED_TEMP = `


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="view-port" content="width=device-width, initial-scale = 1.0"> 
   <title>Account Verified
  </head>
  <body style = "font-family: Poppins, sans-serif; margin: 0, auto; max-width: 600px; padding: 20px; color: #383838;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #a51616; margin: auto; font-size: 25px;">Wallet</h1>
    </div>
    <div style="background-color: #ecd3d3; padding: 20px; border-radius: 0 5px 5px 0; box-shadow:  0 2px 5px rgba(0,0,0,0.1);">
      <h3>Hi, {name}</h3>
      <p>We are writing to confirm that  your <strong>Wallet</strong> account has been verified successfully.</p>



      

      <h4>What this means:</h4>

      <ul>
        <li>You will use your new email to log in to your account</li>
        <li>All future account notififcations will be sent to your new email address</li>
        <li>Your account settings and data remain unchanged</li>
       
      </ul>

      <h4>Need help?</h4>

      <p>Contact our support team at <b>support@wallet.com</b>, or call our help center +23 586 3475 88393</p>

      

      <h3>Thanks,<br />The Wallet Team</h3>


      <p><i>This is an automated message.Please do not reply directly to this email</i></p>

      
    
        

      
      <div style="color: #a51616; margin-top: 2rem; text-align: center; font-size: 15px;">
        <p><a href="#">Unsubscribe</a></p>
        <p>© {year} Wallet, Inc All right reserved.</p>
      </div>
      
    </div>
  </body>
</html>


`