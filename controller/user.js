const User=require('../model/userSchema.js')
const {data} =require('../data.js')
const expressAsyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs')
const generateToken = require('./utils.js')
const nodemailer = require('nodemailer')
const postInfo =expressAsyncHandler(
  async(req, res) => {
    try {
        const { email,password } = req.body;
        const user=await User.findOne({email:email})
        if(user){
          if(bcrypt.compareSync(password,user.password)){
            res.send({
              _id:user._id, 
              name:user.name,
              email:user.email,
              isAdmin:user.isAdmin,
              token:generateToken(user)
            })
            return
          }
        }
       res.status(401).send({message:'invalid email or password'})
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
) 
const postSignInfo=expressAsyncHandler(
  async(req, res) => {
    const isAdmin=false
    try {
        const {username,email,password } = req.body;
        const checkExist=await User.findOne({email:email})
        if(checkExist){
          res.status(409).json({message:'email already exist'})
        }
        else{
          const newPassword=bcrypt.hashSync(password)
            const user=await User.create({name:username,isAdmin,email,password:newPassword})
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
                subject: 'Welcome To Mintyland',
                html: `<!DOCTYPE html>
                <html>
                <head>
                  <title>Welcome to Our Website</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #cccccc;
                      color: #ffffff;
                    }
                
                    .container {
                      width: 500px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #06060d;
                      border: 1px solid #cccccc;
                      border-radius: 4px;
                    }
                
                    h1 {
                      color: rgb(219,0,129);;
                    }
                
                    p {
                      margin-bottom: 20px;
                    }
                
                    .button {
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: rgb(219,0,129);
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 4px;
                    }
                
                    .button:hover {
                      background-color: #0052a3;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>Welcome to MintyLand!</h1>
                    <p>Dear ${username}</p>
                    <p>We are thrilled to have you as a new member of our community. Thank you for joining us!</p>
                    <p>Here are a few things you can expect from our website:</p>
                    <ul>
                      <li>Access to exclusive content</li>
                      <li>Regular updates on new features and promotions</li>
                      <li>Engaging discussions with like-minded individuals</li>
                    </ul>
                    <p>Feel free to explore and get started right away. Click the button below to log in:</p>
                    <a class="button" href="http://minttland.netlify.app/login">Log In</a>
                    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
                    <p>Best regards,</p>
                    <p>You can start making Sales now!!!</p>
                    <p>The MintyLand Team</p>
                  </div>
                </body>
                </html>`,
              };
              await transporter.sendMail(mailOptions);  
              res.send(user)
        }
        
          
         
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
) 

const getSingleUserInfo=async(req,res)=>{
  try {
    const id=req.params.id
    const user=await User.findOne({_id:id})
    if(user){
      res.send(user)
    }
    else{
      res.send("cannot see")
    }
  } catch (error) {
    res.send('internal server error')
  }
}
const patchUserdetails=async(req,res)=>{
  try {
    const {id}=req.params
    const {name,balance,email}=req.body
    const updateuser=await User.findByIdAndUpdate(id,
      { name, email, balance },
      { new: true })
    if(updateuser){
      res.send(updateuser)
    }
  } catch (error) {
    res.send('internal server error')
  }
}
module.exports={postInfo,postSignInfo,getSingleUserInfo,patchUserdetails}
