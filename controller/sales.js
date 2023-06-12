const Sale=require('../model/sales.js')
const User=require('../model/userSchema.js')
const nodemailer = require('nodemailer')

const getUserSales=async(req,res)=>{
  try {
    const {userId}=req.params 
    const cursor =await Sale.find({ userId: { $eq: userId }});
    if(cursor){
      res.send(cursor)
    }
    else{
      res.send([]);
    } 
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
  

}


const createNewSale=async(req, res) => {
      const {name,userId,price,description,image,ownerName}=req.body
        try { 
          const sale = await Sale.create({name,price,description,image,userId,ownerName}) 

          const usermail=await User.findOne({_id:userId})
          const email=usermail.email
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
            subject: 'Item Sold on Mintyland',
            html: `<div>
                    
                    <p> Congratulation ${ownerName}, you have sold one of your Art on mintyland</p>
                    <h5>Art Details</h5>
                    <p>Art Name:${name}</p>
                    <p>Price:${price}</p>
                  </div>
                  
                  <!DOCTYPE html>
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
      padding: 2rem;
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
    <h1>Funds withdrawn from MintyLand!</h1>
    <h3>NFT Sold On MintyLand</h3>
    <p>Dear ${ownerName},</p>
    <p>Congratulation ${ownerName}, you have make some sales on mintyland</p>
    <p>Sales details</p>
    <ul>
      <li>Art Sold ${name}</li>
      <li>price: ${price}</li>
    </ul>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
    <p>Best regards,</p>
    <p>The MintyLand Team</p>
  </div>
</body>
</html> `,
          };
      
          await transporter.sendMail(mailOptions);
          res.status(200).send(sale);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
    // };

const updateUserBalance=async(req,res)=>{
    
    try {
        const {userId}=req.params
        const {price}=req.body
        const findBalance=await User.findOne({_id:userId})
         const balance=findBalance.balance + price
         const updateBalance = await User.findByIdAndUpdate(userId, {balance}, { new: true });
         res.send(updateBalance)
    } catch (error) {
        res.send(error)
    }
}
const updateBalanceAfterWithdraw=async(req,res)=>{
  try {
    const {userId}=req.params
    const {withdrawPrice}=req.body
    const findBalance=await User.findOne({_id:userId})
     const balance=findBalance.balance - withdrawPrice
     const updateBalance = await User.findByIdAndUpdate(userId, {balance}, { new: true });
     res.send(updateBalance)
} catch (error) {
    res.send(error)
}
}
module.exports={createNewSale,updateUserBalance,updateBalanceAfterWithdraw,getUserSales}
