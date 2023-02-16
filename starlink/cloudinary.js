const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

console.log(process.env.CLOUDINARY_CLOUD_NAME);

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

module.exports = cloudinary;




/* const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dodtkqbnf",
  api_key: "626697489657179",
  api_secret: "mTQ5ZUTnDn4ikx76hHw2msnkxMA"
});


// Upload

const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

res.then((data) => {
  console.log(data);
  console.log(data.secure_url);
}).catch((err) => {
  console.log(err);
});


// Generate 
const url = cloudinary.url("olympic_flag", {
  width: 100,
  height: 150,
  Crop: 'fill'
});



// The output url
console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag */