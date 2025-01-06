
const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var jwt= require('jsonwebtoken');
const multer  = require('multer');
const path = require('path');
const storage = multer. diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
const server=express();
server.use(bodyParser.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));//to understand the body sent by the client
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/signup');//http like mongodb 127.. ip address 27017 local host kind
  console.log('db connected');
}
const Users= mongoose.model('Users', {
  username:String,
  password:String
});
const Products= mongoose.model('Products', {
  pname:String,
  pdesc:String,
  price:String,
  category:String,
  subCategory:String,
  pimage:String, 
  swap:Boolean      
});
server.post('/signup',(req,res)=>{
  const username= req.body.username;
  const password= req.body.password;
  const user=new Users({username:username,
  password: password
});
console.log(req.body);
user.save().then(()=> {
res.status(200).send({message:'saved'})
})
.catch(()=>{
  res.send({message:'server err'})
})
})

server.post('/login',(req,res)=>{
  const username= req.body.username;
  const password= req.body.password;
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
server.post('/add-product',upload.single('pimage'),( req,res)=>{
  console.log(req.body);
  console.log(req.file.path);
  const pname= req.body.pname;
  const pdesc= req.body.pdesc;
  const price= req.body.price;
  const category= req.body.category;
  const subCategory= req.body.subCategory;    
  const pimage= req.file.path;
  const swap=req.body.swap;
  const product=new Products({pname,
  pdesc, price, category, subCategory, pimage, swap
 });
  product.save().then(()=> {
   res.status(200).send({message:'saved'})
   })
   .catch(()=>{
    res.send({message:'server err'})
   })
  
})
server.get('/get-product',(req,res)=>{
  Products.find()
    .then((result)=>{
      console.log(result,"user data")
      res.status(200).send({message:'product found',products:result})
    })
    .catch((err)=>{
      res.send({message:'server err'})
    })
  })

server.listen(8080,()=>{
    console.log('server started')
})