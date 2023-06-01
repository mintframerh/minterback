const Product=require('../model/productSchema.js')
const User=require('../model/userSchema.js')
const cloudinary = require('cloudinary').v2;
const path = require('path');
const multer = require('multer')


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


// Configure Cloudinary


// Configure Multer
const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000 // 1MB
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }

}

const createNewProduct=(req, res) => {
    upload(req, res, async (err) => {
      const {name,countInStock,no_of_review,category,price,description,rating}=req.body
      
      if (err) {
        console.log(err);
        res.status(400).json({ message: err });
      } else {
        try {
          
          const result = await cloudinary.uploader.upload(req.file.path);
          const image = result.secure_url       
          const product = await Product.create({name,no_of_review,countInStock,category,price,description,rating,image}) 
          res.status(200).send(product);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
    });
  }

  const createNewAsset=(req, res) => {
    upload(req, res, async (err) => {
      const {name,price,description,userId,ownerName}=req.body
      
      if (err) {
        console.log(err);
        res.status(400).json({ message: err });
      } else {
        try {
          
          const result = await cloudinary.uploader.upload(req.file.path);
          const image = result.secure_url       
          const product = await Product.create({name,price,description,image,userId,ownerName})
          res.status(200).send(product);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
    });
  }

  const AddAsset=(req, res) => {
    upload(req, res, async (err) => {
      const {userId,name,price,description}=req.body
      
      if (err) {
        console.log(err);
        res.status(400).json({ message: err });
      } else {
        try {
          
          const result = await cloudinary.uploader.upload(req.file.path);
          const image = result.secure_url       
          const asset=[{userId,name,description,price,image}]
          const user= await User.findByIdAndUpdate({_id:userId}, {
            $push: {
              'assets.asset': {
                $each: asset
              }
            }
          });
          
         res.status(200).send(user.assets.asset)
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
    });
  }



//   const AddAsset=async(req,res)=>{
//     const {userId,name,description,price}=req.body
//     console.log(req.body)
//     const asset={userId,name,description,price}
//     console.log(asset)
//     try {
//         const user= await User.findByIdAndUpdate({_id:userId}, {
//             $push: {
//               'assets.asset': {
//                 $each: asset
//               }
//             }
//           });
          
//          res.status(200).send(user.assets.asset)
//     } catch (error) {
//         console.log(error)
//     }
// }

const deleteProduct= async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Product.findByIdAndDelete(id);
      if (!data) {
        return res.status(404).send('Data not found' );
      }
      res.status(200).send( 'Data deleted successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  }

const updateProduct= async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }  
  }
  const getAllProduct=async(req,res)=>{
    try {
      const allProduct=await Product.find()
      if(allProduct){
        res.status(200).send(allProduct)
      }
      else{
        res.status(404).send('Products Not Found')
      }
    } catch (error) {
      res.status(500).send('internal server error')      
    }
  }



  const deleteUser= async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).send('User not found' );
      }
      res.status(200).send( 'User deleted successfully');
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }


  const getAllUser=async(req,res)=>{
    try {
      const allUser=await User.find()
      if(allUser){
        res.status(200).send(allUser)
      }
      else{
        res.status(404).send('Products Not Found')
      }
    } catch (error) {
      res.status(500).send('internal server error')      
    }
  }
// // Delete a data item by ID
// app.delete('/api/data/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const data = await Data.findByIdAndDelete(id);
//     if (!data) {
//       return res.status(404).json({ message: 'Data not found' });
//     }
//     res.status(200).json({ message: 'Data deleted successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Update a data item by ID using PATCH
// app.patch('/api/data/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const data = await Data.findByIdAndUpdate(id, req.body, { new: true });
//     if (!data) {
//       return res.status(404).json({ message: 'Data not found' });
//     }
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
module.exports={createNewProduct,deleteProduct,updateProduct,getAllProduct,deleteUser,getAllUser,createNewAsset,AddAsset}
