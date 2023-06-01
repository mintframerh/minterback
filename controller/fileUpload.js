const cloudinary = require('cloudinary').v2;


// Configure Cloudinary
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
});
// Configure multer storage engine for Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'uploads',
//       allowed_formats: ['jpg', 'png', 'jpeg'],
//       max_file_size: 1000000, // 1MB
//     },
//   });
  
const uploadImg=async  (req, res) => {
        if (req.file) {
          await res.json({
            imageUrl: req.file.path,
          });
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
      }


// Create multer instance
module.exports={uploadImg}



const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

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
    fileSize: 1000000 // 1MB
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

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Mongoose schema for the image
const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Create a Mongoose model for the image
const Image = mongoose.model('Image', ImageSchema);

// Create an Express app
const app = express();

// Handle POST requests to /upload
app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err });
    } else {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const image = new Image({
          name: req.file.filename,
          url: result.secure_url
        });
        await image.save();
        res.status(200).json({ message: 'Image uploaded successfully' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    }

  });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
