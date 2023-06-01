const mongoose=require('mongoose')



const AssetSchema = new mongoose.Schema({
    category:{type:String},
    countInStock:{type:Number},
    createdAt:{type:String},
    description:{type:String},
    image:{type:String},
    name:{type:String},
    price:{type:Number},
    no_of_review:{type:Number},
    quantity:{type:Number},
    rating:{type:Number},
    updatedAt:{type:String},
    userId:{type:String},
    __v:{Number},
     _id:{type:String}
  });
  
  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    balance:{
      type:Number,
      default:0
    },
    assets: {
      asset: [{
        type: AssetSchema,
        default: {
            category:'',
            countInStock:0,
            createdAt:'',
            description:'',
            price:0,
            image:'',
            name:'',
            no_of_review:0,
            quantity:0,
            rating:0,
            updatedAt:'',
            userId:'',
            __v:'',
            _id:''
        }
      }]
    }
  }, {
    timestamps: true
  });
  
//   const UserModel = mongoose.model('User', UserSchema);
  
// // import mongoose from 'mongoose'
// const userSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:[true,'username required'],
//         trim:true,
//         unique:true 
//     },
//     password:{
//         type:String,
//         required:[true,"password required"],
//         trim:true
//     },
//     name:{type:String,required:[true,'name required']},
//     isAdmin:{type:Boolean,default:false,required:true},  
//     assets:{
//         asset:[
//             {   category:{type:String},
//                 countInStock:{type:Number},
//                 createdAt:{type:String},
//                 description:{type:String},
//                 image:{type:String},
//                 name:{type:String},
//                 no_of_review:{type:Number},
//                 quantity:{type:Number},
//                 rating:{type:Number},
//                 updatedAt:{type:String},
//                 __v:{Number},
//                 _id:{type:String}
//             }
//         ],
//         transactionPrice:{type:String},
//         transactionHash:{type:String},
//         transactionFrom:{type:String},
//         transactionTo:{type:String},
//         etherPrice:{type:Number}
//     }
// },
// {
//     timestamps:true
// }

// )

const User =module.exports=mongoose.model('User',UserSchema)
module.exports=User