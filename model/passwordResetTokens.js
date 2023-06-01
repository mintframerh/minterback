const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const passwordResetTokensSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"name required"],
        trim:true
    },
    token:{
        type: String,
        required: true,
        trim:true
    },
    expiresAt:{
        type:Date,
        required:[true,"number of reviews required"],
        trim:true
    },
    
},
{
    timestamps:true
}
)

const passwordResetTokens= module.exports=mongoose.model('resetPassword',passwordResetTokensSchema)
module.exports= passwordResetTokens