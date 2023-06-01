
const express=require('express')
const {router}=require('./route/product')
const {recentlySoldRouter}=require('./route/recentltySold.js')
const {Estaterouter}=require('./route/landandEstate.js')
const {userRouter}=require('./route/user.js')
const {assetRouter}=require('./route/asset.js')
const {adminrouter}=require('./route/admin.js')
const {paymentRouter}=require('./route/payment.js')
const {saleRouter}=require('./route/sales.js')
const {forgotPasswordRouter}=require('./route/forgotPassword.js')
const {data}=require('./data')
const {connectDB}=require('./db/connect.js')

require('dotenv').config()
const app=express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const MongoDbUrl= process.env.MONGOURL
const port =process.env.PORT || 5000 
//middleware
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use('/api/trending',router)
app.use('/api/product',router)
app.use('/api/landandestate',Estaterouter)
app.use('/api/user',userRouter)
app.use('/api/recentlysold',recentlySoldRouter)
app.use('/api/admin/',adminrouter)
app.use('/api',paymentRouter)
app.use('/api/asset',assetRouter)
app.use('/api',saleRouter)
app.use('/api/',forgotPasswordRouter)
app.get('/api/landandasset/:id',(req,res)=>{
    const landandasset=data.LandAndEstateData.find((x)=> Number(x._id) === Number(req.params.id))
   
    if (landandasset){
        return res.send(landandasset)
    }
    else{
        res.status(404).send({message:'Page not found'})
    }
   
})



app.use("/api/post", router);
//db config

const cloudinary = require('cloudinary').v2;


// // Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//Listener
const start=async()=>{
    try {
        await connectDB(MongoDbUrl)
        app.listen(port, () => console.log(`listening at port ${port}`));    
    } catch (error) {
        console.log(error)
    }
}
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
start()
