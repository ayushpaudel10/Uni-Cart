//require("dotenv").config();
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
 // Preset images mapping (IDs and their paths)
const presetImageUrls = {
  1: '/images/avatar1.jpg',
  2: '/images/avatar2.jpg',
  3: '/images/avatar3.jpg'
};

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
  name:  { type: String, required: true },
  number:  { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String, // Store the code sent to the user
  profilePicId: String, // New field for profile picture path
  profilePicPath:String,
  favourites:[{type:mongoose.Schema.Types.ObjectId,ref:'Products'}]//product id is saved 
});//table created in mongoose
const Products= mongoose.model('Products', {
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  subCategory: String,
  pimage: String, //path of the image is stored so string
  swap: Boolean,
  userId: String,
  buyer: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isSold: { type: Boolean, default: false }
});//table created in mongoose
// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or use your email provider
  auth: {
    user: 'unikart447@gmail.com', // Replace with your email
    pass: 'lkyi lzuh apap finr', // Replace with your email password or app password
  },
  logger: true, // Enable logging
  debug: true   // Show debug output
});
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
}));
app.use(express.json());


app.get('/search',(req,res)=>{
  let search = req.query.search;
  //console.log(query);//the text we type in search box
  Products.find({
  $or:[           //check for multiple criterias with dollar or in mongodb
 {pname:{$regex:search, $options: 'i'}},
 {pdesc:{$regex:search, $options: 'i'}},
 {price:{$regex:search, $options: 'i'}}
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
     const subCategory = req.body.subCategory;
     const userId= req.body.userId;
     const swap = req.body.swap;
     const buyer="";
     const product=new Products({pname,
      pname,
      pdesc,
      price,
      category,
      subCategory,
      pimage,
      swap,
      userId,
      buyer,
    });
    product.save().then(()=> {
      res.status(200).send({message:'saved'})
      })
      .catch(()=>{
        res.send({message:'server err'})
      })
     
})
app.get('/get-products',(req,res)=>{
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
  // Users.findOne({_id:req.body.userId}).populate('favourites')
  //   .then((result)=>{
  //     //console.log(result,"user data")
  //     res.status(200).send({message:'product found',products:result.favourites})

  //   })
  // .catch((err)=>{
  //   res.send({message:'server err'})
  // })
  const { userId } = req.body;

  Users.findOne({ _id: userId }).populate('favourites')
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'Favourites found', products: user.favourites });
    })
    .catch(() => {
      res.status(500).send({ message: 'Server error' });
    });
})
// Route to Handle Profile Picture Upload
// app.post("/upload-profile-pic", upload.single("profilePic"), async (req, res) => {
//   const profilePicchange = req.file.path ; // Save the file path
//   try {
//       if (!req.file) {
//           return res.status(400).json({ success: false, message: "No file uploaded" });
//       }

//       const userId = req.body.userId;
//       //const profilePicPath = `uploads/${req.file.filename}`;

//         // Find the user and update their profile picture
//         const updatedUser = await Users.findByIdAndUpdate(
//             userId,
//             { profilePic: profilePicchange },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.json({ success: true, profilePic: profilePicPath });
//     } catch (error) {
//         console.error("Error updating profile picture:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// });

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
app.post('/like-product', async (req,res)=>{
  const { userId, productId } = req.body;
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
      }
  
      // Toggle like/unlike logic
      const productIndex = user.favourites.indexOf(productId);
  
      if (productIndex > -1) {
        // Product already liked, so unlike it
        user.favourites.splice(productIndex, 1);
        await user.save();
        return res.status(200).send({ success: true, message: 'Product unliked', favourites: user.favourites });
      } else {
        // Product not liked, so like it
        user.favourites.push(productId);
        await user.save();
        return res.status(200).send({success: true,  message: 'Product liked', favourites: user.favourites });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
})
app.post('/signup', upload.single('profilePic'), async (req, res) => {
  // const username= req.body.username;
  // const password= req.body.password;
  // const name=req.body.namee;
  // const number=req.body.number;
  //const Code=req.body.verificationCode;
 // const profilePic = req.file.path ; // Save the file path
 //const profilePic = req.file ? req.file.path : null;
   // Handle preset image OR uploaded file
   const { username, password, namee, number, profilePicId } = req.body;
  try {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(210).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
    let profilePicPath = null;
        let finalProfilePicId = null;

        if (profilePicId && presetImageUrls[profilePicId]) {
            finalProfilePicId = profilePicId; // Store the preset image ID
        } else if (req.file) {
            // profilePicPath = req.file.path; // Store the uploaded file path
            profilePicPath = req.file.path.replace(/\\/g, '/');//change 1
        }
    const newUser = new Users({
      username,
      password:hashedPassword,
      isVerified: false,
      verificationCode,
      name: namee,
      number: number,
      profilePicId: finalProfilePicId,  // Stores preset image ID
      profilePicPath: profilePicPath    // Stores uploaded file path
    });

    await newUser.save();

    // Send verification email
    const mailOptions = {
      from: 'unikart447@gmail.com',
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
app.post('/get-user', async (req, res) => {
  // Users.findOne({_id:req.body.userId})
  // .then((result) => {
  //   res.send({username: result.name, email: result.username});
  // })
  // .catch((err) => {
  //   res.status(500).send({ message: 'Server error' });
  // });
  // try {
  //   const { userId } = req.body;
  //   const user = await Users.findById(userId);
    
  //   if (!user) {
  //     return res.status(404).send({ message: "User not found" });
  //   }

  //   res.status(200).send({
  //     username: user.name,
  //     email: user.username,
  //     profilePic: user.profilePic // Make sure this is stored in the database
  //   });

  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Server error" });
  // }
  try {
    const { userId } = req.body;
    const user = await Users.findById(userId);
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    console.log("User Data:", user); // Debugging: Log user data

    res.status(200).send({
      username: user.name,
      email: user.username,
      profilePicId: user.profilePicId || null, // ID if preset image was chosen
      profilePicPath: user.profilePic || null  // Path if user uploaded an image
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Server error" });
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordValid); // Debugging

    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, 'MYKEY', { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token, userId:user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
app.post('/change-password', async (req, res) => {
  // try {
  //   const { id, oldpassword, newPassword } = req.body;
  //   const user = await Users.findOne({ _id: id });

  //   if (!user) {
  //     return res.send({ message: 'User not found' });
  //   }
  //   const isMatch = await bcrypt.compare(oldpassword, user.password);

  //   if (!isMatch) {
  //     return res.send({ message: 'Current password is incorrect' });
  //   }
  //   const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  //     await Users.updateOne(
  //     { _id: id },
  //     { $set: { password: hashedPassword } }
  //   );
  //   res.send({ message: 'Password changed successfully' });
  // } catch (err) {
  //   res.send({ message: 'Server error' });
  // }
  try {
    console.log("Received data:", req.body); // Debugging step
    const { id, oldpassword, newPassword } = req.body;

    if (!id || !oldpassword || !newPassword) {
      return res.send({ message: 'All fields are required' });
    }

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.send({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //await Users.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    console.log("New Hashed Password:", hashedPassword); // Debugging

    const updateResult = await Users.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    console.log("Update Result:", updateResult); // Debugging
    if (updateResult.modifiedCount === 0) {
      return res.send({ message: 'Password update failed' });
    }

    res.send({ message: 'Password changed successfully' });
  } catch (err) {
    console.error("Error in change-password:", err);
    res.send({ message: 'Server error' });
  }
});
app.post('/my-items', (req, res) => {
  Products.find({ userId: req.body.userId })
    .then((result) => {
      res.send({ message: 'Products found', myproducts: result });
    })
    .catch((err) => {
      res.send({ message: 'Server error' });
    });
});
app.get('/apply',async(req,res)=>{
  // const maincategory = req.query.mainCategory; 
  // const subCategory = req.query.subCategory;
  const maincategory = [].concat(req.query.mainCategory || []);
  const subCategory = [].concat(req.query.subCategory || []);
  const swap=req.query.swap;
  console.log(maincategory);
  console.log(subCategory);
  console.log(swap);
  // if(swap && !maincategory && !subCategory){
  if (swap==='true') {
    if(maincategory.length === 0 && subCategory.length === 0){
      await Products.find({ swap: swap } )
    .then((results)=>{
    console.log(1);
    res.status(200).send({message:'success',products:results})})
  .catch((err)=>{
    res.send({message:'server err'})
})}
    else if(maincategory || subCategory){
      await Products.find({
        $and: [
          { swap: swap },  // Ensure 'swap' condition is always applied
          {
            $or: [
              { category: { $in: maincategory } },
              { subCategory: { $in: subCategory } }
            ]
          }
        ]
      })
        .then((results)=>{
          console.log(2);
          res.status(200).send({message:'success',products:results})
      
        })
      .catch((err)=>{
        res.send({message:'server err'})
      })
    }
    }
else if(swap==="false"){
    await Products.find({
    $or: [
      { category: { $in: maincategory } },
      { subCategory: { $in: subCategory } }
    ]
  })
  .then((results)=>{
    console.log(3);
    res.status(200).send({message:'success',products:results})

  })
.catch((err)=>{
  res.send({message:'server err'})
})
}
}
)
app.post('/delete-product',(req,res)=>{
  const pid = req.body.pid;
  const userId=req.body.userId;
  Products.findOne({_id: pid})
  .then((result)=>{
    if(result.userId===userId){
      Products.deleteOne({_id:pid})
      .then((deleteresult)=>{
        if(deleteresult.acknowledged){
          res.send({message: "Deleted succesfully"});
        }
      })
      .catch((err)=>{
        res.send({message:'server err'})
      })
    }
  })

})
app.post('/edit-product', upload.single('pimage'), (req, res) => {
  const pid=req.body.pid;
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  let pimage='';
  if (req.file&& req.file.path){
  pimage = req.file.path;
  }
  const swap = req.body.swap;
  const userId=req.body.userId;
  let editObj={};
  if (pname){
    editObj.pname=pname;
  }
  if (pname){
    editObj.pdesc =pdesc;
  }
  if (price){
    editObj.price =price;
  }
  if (category){
    editObj.category =category;
  }
  if (subCategory){
    editObj.subCategory =subCategory;
  }
  if(pimage){
    editObj.pimage=pimage;
  }
  if (swap){
    editObj.swap=swap;
  }

 Products.updateOne({_id: pid},editObj)

  .then((result) => {
   res.send({ message: 'Update saved', product: result});
  })
  .catch(() => {
    res.send({ message: 'Server error' });
  });
});
app.get('/add-to-cart',(req,res)=>{
  const userId=req.query.userId;
  const pid=req.query.pid;
  Products.findOne({_id: pid})
  .then((result)=>{
      Products.updateOne(
        { _id: pid },
        { $set: {buyer: userId}}
      )
      .then((deleteresult)=>{
        if(deleteresult){
          res.send({message: "Added to cart"});
        }
      })
      .catch((err)=>{
        res.send({message:'server err'})
      })
    
  })
})
app.get('/cart',(req,res)=>{
  const userId=req.query.userId;
  console.log(userId);
  Products.find({buyer: userId})
  .then((result)=>{
          res.send({message: "display", product: result});
      })
      .catch((err)=>{
        res.send({message:'server err'})
      })
    
  })
app.get('/remove-from-cart',(req,res)=>{
    const pid=req.query.pid;
Products.findOne({_id: pid})
.then((result)=>{
    Products.updateOne(
      { _id: pid },
      { $set: {buyer: ''}}
    )
    .then((deleteresult)=>{
      if(deleteresult){
        res.send({message: "Deleted from cart"});
      }
    })
    .catch((err)=>{
      res.send({message:'server err'})
    })
  
})
})
app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})
