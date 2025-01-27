// //console.log("hello Js");
 const express=require('express');
 const cors=require('cors');
 const path=require('path');
 const bcrypt = require('bcrypt');
 const bodyParser=require('body-parser');
 var jwt = require('jsonwebtoken');
 const multer  = require('multer')
 const nodemailer = require('nodemailer');
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
 const app=express()
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//this is must if we want the image to be seen in the frontend
 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 const port=8000

// // getting-started.js
//needed for all login and stuff so written outside
const mongoose = require('mongoose');
//connection to mongodb
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test1');//http like mongodb 127.. ip address 27017 local host kind
  console.log('db connected');
}
//mongoose.connect('mongodb://127.0.0.1:27017/test1');
const Users= mongoose.model('Users', {
  username: { type: String, required: true, unique: true }, // Email
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String, // Store the code sent to the user
  favourites:[{type:mongoose.Schema.Types.ObjectId,ref:'Products'}]//product id is saved 
});//table created in mongoose
const Products= mongoose.model('Products', {
  pname:String,
  pdesc:String,
  price:String,
  category:String,
  pimage:String, //path of the uploads is stored thus string type
});//table created in mongoose
// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or use your email provider
  auth: {
    user: 'sadraut1@gmail.com', // Replace with your email
    pass: 'tdia syoe lsss bchl', // Replace with your email password or app password
  },
  logger: true, // Enable logging
  debug: true   // Show debug output
});


app.get('/search',(req,res)=>{
  let search = req.query.search;
  //console.log(query);//the text we type in search box
  Products.find({
  $or:[           //check for multiple criterias with dollar or in mongodb
 {pname:{$regex:search}},
 {pdesc:{$regex:search}},
 {price:{$regex:search}}
 ],
  })
  .then((results)=>{
    //console.log(result,"user data")
    res.status(200).send({message:'success',products:results})

  })
.catch((err)=>{
  res.send({message:'server err'})
})
})
app.post('/add-product', upload.single('pimage'),( req,res)=>{
     console.log(req.body);
     console.log(req.file.path);
     const pname= req.body.pname;
     const pdesc= req.body.pdesc;
     const price= req.body.price;
     const category= req.body.category;
     const pimage= req.file.path;

     const product=new Products({pname,
      pdesc, price, category, pimage
    });
    product.save().then(()=> {
      res.status(200).send({message:'saved'})
      })
      .catch(()=>{
        res.send({message:'server err'})
      })
     
})
app.get('/get-product',(req,res)=>{
  const categoryName=req.query.categoryName;
  console.log(categoryName);
  Products.find()
    .then((result)=>{
      console.log(result,"user data")
      res.status(200).send({message:'product found',products:result})

    })
  .catch((err)=>{
    res.send({message:'server err'})
  })
})
app.post('/liked-products',(req,res)=>{
  Users.findOne({_id:req.body.userId}).populate('favourites')
    .then((result)=>{
      //console.log(result,"user data")
      res.status(200).send({message:'product found',products:result.favourites})

    })
  .catch((err)=>{
    res.send({message:'server err'})
  })
})
app.get('/get-product/:pId',(req,res)=>{
  console.log(req.params)
  Products.findOne({_id:req.params.pId})
    .then((result)=>{
      //console.log(result,"user data")
      res.status(200).send({message:'success',product:result})

    })
  .catch((_err)=>{
    res.send({message:'server err'})
  })
})
// app.post('/liked-products',(req,res)=>{
//   Users.findOne({_id:req.body.userId}).populate('favourites')
//     .then((result)=>{
//       //console.log(result,"user data")
//       res.status(200).send({message:'product found',products:result.favourites})

//     })
//   .catch((err)=>{
//     res.send({message:'server err'})
//   })
// })
app.post('/like-product',(req,res)=>{
  let productId=req.body.productId;
  let userId=req.body.userId;
  console.log(req.body);
  // return;
  Users.updateOne({_id: userId}, {$addToSet:{favourites:productId}})
  //we have used addToSet so no duplication i.e once stored then not stored again
  .then(()=> {
    res.status(200).send({message:'favourites are saved'})
    })
    .catch(()=>{
      res.send({message:'server err'})
    })
})
app.post('/signup', async (req, res) => {
  const username= req.body.username;
  const password= req.body.password;
  //const Code=req.body.verificationCode;

  try {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(210).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code

    const newUser = new Users({
      username,
      password:hashedPassword,
      isVerified: false,
      verificationCode,
      
    });

    await newUser.save();

    // Send verification email
    const mailOptions = {
      from: 'sadraut1@gmail.com',
      to:username,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error sending verification email' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: 'Verification code sent to email.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
// Add a route to verify the email
app.post('/verify-email', async (req, res) => {
  const { username, verificationCode } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      user.verificationCode = null; // Clear the code after successful verification
      await user.save();
      res.status(200).send({ message: 'Email verified successfully' });
    } else {
      res.status(400).send({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

// app.post('/login',(req,res)=>{
//   const username= req.body.username;
//   const password= req.body.password;
// // const user=new Users({username:username,
// //   password: password
// // });
// // console.log(req.body);
// // the user model that we made we are using that to find the username
// Users.findOne({username:username})
// .then((result)=> {
//   console.log(result,"user data")
//   if (!result){
//     res.status(200).send({message:'user not found'})
//   }
//   else{
//     if(result.password==password){
//       const token=jwt.sign({
//         data: result
//       }, 'MYKEY', { expiresIn: '1h' });
//       res.status(200).send({message:'find success', token:token,userId:result._id})
//     }
//       if(result.password!=password){
//         res.status(200).send({message:'password is incorrect'})
//     }
//   }

// })
// .catch(()=>{
//   res.send({message:'server err'})
// })
// })
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).send({ message: 'Please verify your email before logging in.' });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, 'MYKEY', { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})