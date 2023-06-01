const mongoose=require('mongoose')
// import mongoose from 'mongoose';
const connectDB=(url)=>{
    mongoose
      .connect(url)
      .then(() => console.log("connected to db"))
      .catch((err) => console.log(err));
}
module.exports={connectDB}
