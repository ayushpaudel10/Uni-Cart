// //console.log("hello Js");
const express=require('express');
const cors=require('cors');
const path=require('path');
const bodyParser=require('body-parser');
var jwt = require('jsonwebtoken');
const multer  = require('multer')
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
 username:String,
 password:String
});//table created in mongoose
const Products= mongoose.model('Products', {
 pname:String,
 pdesc:String,
 price:String,
 category:String,
 pimage:String, //path of the uploads is stored thus string type
});//table created in mongoose


// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String  //validation that the input or data is of string kind
//   });

//   const User = mongoose.model('User', userSchema);


// const server=express();
// server.use(bodyParser.json());//to understand the body sent by the client
// server.use(cors());
// //server.get('/demo', (req, res)=>{
// server.post('/demo',async (req, res)=>{
//     // console.log(req.body);
//     // res.json(req.body);//sends object
//     // //res.send("hello");//sends text or string
//     let user=new User();
//     user.username=req.body.username;
//     user.password=req.body.password;
//     const doc=await user.save();
//     console.log(doc);
//     res.json(doc);
// })
// server.get('/demo', async (req, res)=>{
//     const docs=await User.find({})
//     res.json(docs);
// })
// server.listen(8080,()=>{
//     console.log('server started')
// })
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
 Products.find()
   .then((result)=>{
     console.log(result,"user data")
     res.status(200).send({message:'product found',products:result})

   })
 .catch((err)=>{
   res.send({message:'server err'})
 })
})
app.post('/signup',(req,res)=>{
 const username= req.body.username;
 const password= req.body.password;
const user=new Users({username:username,
 password: password
});
console.log(req.body);
// const user=new Users({username:'sad',
//   password: '123'
// });
user.save().then(()=> {
res.status(200).send({message:'saved'})
})
.catch(()=>{
 res.send({message:'server err'})
})
})
app.post('/login',(req,res)=>{
 const username= req.body.username;
 const password= req.body.password;
// const user=new Users({username:username,
//   password: password
// });
// console.log(req.body);
// the user model that we made we are using that to find the username
Users.findOne({username:username})
.then((result)=> {
 console.log(result,"user data")
 if (!result){
   res.status(200).send({message:'user not found'})
 }
 else{
   if(result.password==password){
     const token=jwt.sign({
       data: result
     }, 'MYKEY', { expiresIn: '1h' });
     res.status(200).send({message:'find success', token:token})
   }
     if(result.password!=password){
       res.status(200).send({message:'password is incorrect'})
   }
 }

})
.catch(()=>{
 res.send({message:'server err'})
})
})
app.listen(port,()=>{
 console.log(`Example app listening on port ${port}`)
})