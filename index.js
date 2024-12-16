//console.log("hello Js");
const express=require('express');
const cors=require('cors');
// getting-started.js
const mongoose = require('mongoose');
//connection to mongodb
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');//http like mongodb 127.. ip address 27017 local host kind
  console.log('db connected');
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String  //validation that the input or data is of string kind
  });

  const User = mongoose.model('User', userSchema);

const bodyParser=require('body-parser');
const server=express();
server.use(bodyParser.json());//to understand the body sent by the client
server.use(cors());
//server.get('/demo', (req, res)=>{
server.post('/demo',async (req, res)=>{
    // console.log(req.body);
    // res.json(req.body);//sends object
    // //res.send("hello");//sends text or string
    let user=new User();
    user.username=req.body.username;
    user.password=req.body.password;
    const doc=await user.save();
    console.log(doc);
    res.json(doc);
})
server.get('/demo', async (req, res)=>{
    const docs=await User.find({})
    res.json(docs);
})
server.listen(8080,()=>{
    console.log('server started')
})