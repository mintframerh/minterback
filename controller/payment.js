const User=require('../model/userSchema')
const Product=require('../model/productSchema')
const Withdraw=require('../model/withdraw')
const nodemailer = require('nodemailer');
const getPayment=async(req,res)=>{
    const {userId,transactionResponse,asset,totalPrice,etherPrice}=req.body
    try {
        const user= await User.findByIdAndUpdate({_id:userId}, {
            $push: {
              'assets.asset': {
                $each: asset
              }
            }
          });
          
         res.status(200).send(user.assets.asset)
    } catch (error) {
        console.log(error)
    }
}
const deleteProductOnPayment= async(req, res) => {
  const productId = req.params.id;
  try {
    const deleteProduct=await Product.deleteOne({_id:productId})
    if(deleteProduct){
       res.send('deleted');
      }
  } catch (error) {
    res.send(error)
  }
};


const makeWithdrawal=async(req,res)=>{
  try {
    const {userAddress,amountWitdraw,paymentMethod,WithdrawalId,amountInEth,withdrawDescription}=req.body
    const withdraw= await Withdraw.create({userAddress,amountWitdraw,paymentMethod,WithdrawalId,amountInEth,withdrawDescription})
    const usermail=await User.findOne({_id:WithdrawalId}) 
    const email=usermail.email
    const name=usermail.name
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
      subject: 'Make Withdrawal on Mintyland',
      html: `
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
    <h3>Dear ${name},</h3>
    <p>Congratulation ${name}, you have make some withdrawal on mintyland</p>
    <p>Withdrawal detail</p>
    <ul>
      <li>Amount withdrawn in Dollars ${amountWitdraw}</li>
      <li>Payment method:Ethereum BlockChain</li>
      <li>Amount In Ethereum:${amountInEth}</li>
      <li>Ethereum Address:${userAddress}</li>
    </ul>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
    <p>Best regards,</p>
    <p>The MintyLand Team</p>
  </div>
</body>
</html>`,
    };
    await transporter.sendMail(mailOptions);
    res.send(withdraw)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getSingleWithdraw=async(req,res)=>{
  try {
    const {id}=req.params
    const cursor =await Withdraw.find({ WithdrawalId: { $eq: id }});
    if(cursor){
      res.send(cursor)
    }
    else{
      res.send([]);
    }
// }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllWithdraw=async(req,res)=>{
  try {
    const allWithdraw=await Withdraw.find()
    if(allWithdraw){
      res.status(200).send(allWithdraw)
    }
    else{
      res.status(404).send('Sale Not Found')
    }
  } catch (error) {
    res.status(500).send('internal server error')      
  }
}

module.exports={getPayment,deleteProductOnPayment,makeWithdrawal,getSingleWithdraw,getAllWithdraw}


