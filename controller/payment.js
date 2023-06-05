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
    const {userAddress,amountWitdraw,paymentMethod,WithdrawalId,amountInEth}=req.body
    const withdraw= await Withdraw.create({userAddress,amountWitdraw,paymentMethod,WithdrawalId,amountInEth})
    
    
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
      html: `<div>
              <h3>Withdraw Funds On MintyLand</h3>
              <p> Congratulation ${name}, you have make a withdrawal on mintyland</p>
              <h5>Withdrawal Details</h5>
              <p>Amount withdraw:${amountWitdraw}</p>
              <p>Payment Method:${paymentMethod}</p>
              <p>Amount in Ethereum:${amountInEth}</p>
              <p>Ethereum Address:${userAddress}</p>
            </div>`,
    };
    await transporter.sendMail(mailOptions);
    res.send(withdraw)
  } catch (error) {
    console.log(err);
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


