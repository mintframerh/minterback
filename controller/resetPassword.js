const nodemailer = require('nodemailer');
const crypto = require('crypto');
const moment = require('moment');
const bcrypt=require('bcryptjs')
const User=require('../model/userSchema.js')
const passwordResetTokens=require('../model/passwordResetTokens')


// Replace this with your own database connection string

const EXPIRATION_MINUTES = 30;

const ForgotPasswordPost= async  (req, res) => {
    const { email } = req.body;
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    
    // Generate a unique token and save it to the database
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = moment().add(EXPIRATION_MINUTES, 'minutes').toDate();
    console.log(token,expiresAt)
    await passwordResetTokens.create({
      email,
      token,
      expiresAt,
    });

    // Send an email to the user with a link that includes the token
    const transporter = nodemailer.createTransport({
      // Replace with your own email provider
      service: 'gmail',
      auth: {
        user: process.env.GMAILUSERR,
         pass: process.env.GMAILPASS,
      },
      tls: {
        rejectUnauthorized: false
    }
    });
    
    const mailOptions = {
    from:"Mintyland",
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="http://localhost:3000/api/resetpassword/${token}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Email sent' });
  };

  // Reset password route
 const UpdatePassword= async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Check if the token exists in the database and is not expired
    const tokenData = await passwordResetTokens.findOne({ token });

    if (!tokenData || moment().isAfter(moment(tokenData.expiresAt))) {
      return res.status(404).json({ message: 'Token not found or expired' });
    }
    const newPassword=bcrypt.hashSync(password)
    // Update the user's password in the database
    await User.findOneAndUpdate(
      { email: tokenData.email },
      { $set: { password:newPassword } }
    );

    // Delete the token from the database
    await passwordResetTokens.findOneAndDelete({ token });

    res.json({ message: 'Password reset successfully' });
  };

 
module.exports={ForgotPasswordPost,UpdatePassword}