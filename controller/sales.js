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
                    <h3>NFT Sold On MintyLand</h3>
                    <p> Congratulation ${ownerName}, you have sold one of your Art on mintyland</p>
                    <h5>Art Details</h5>
                    <p>Art Name:${name}</p>
                    <p>Price:${price}</p>
                  </div>`,
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
