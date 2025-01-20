import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './Login.module.css';
import logo from './Images/logo.png'
import axios from "axios";
function Login(){
  const navigate= useNavigate();
  const[username,setusername]=useState('');//initial value of variable types
  const[password,setpassword]=useState('');
  const handleApi =async()=>{
    const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
    console.log(username);
    if (!emailRegex.test(username)) {
        alert("wrong format");}
    else{
    const url='http://localhost:8080/login';
    const data={ username, password}
    axios.post(url,data)
    .then((res)=>{
       console.log(res.data) ;
       if(res.data.message)
       {
        if(res.data.token){
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userId',res.data.userId)
            navigate('/'); //sending to home page
        }
        console.log(res.data.message);
        alert(res.data.message);
        
       }
    })
    .catch((err)=>{
      console.log(err)
        alert('SERVER ERR')
    })}}
    
    return<>
        <div className="App">
                <div className="image-section">
                    <img src={logo} alt="Uni-Cart Logo" />
                </div>
                <div className='form'>
                    <h1 className='heading1'> Welcome To Uni-Kart</h1>
                    <div>
                        <span>Email</span>
                        <input type="text" value={username}
                            onChange={(e) => {
                                setusername(e.target.value)
                            }} />
                    </div>
                    <div>
                        <span>Password</span>
                        <input type="password" value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }} />
                        <button className='login-signup-button' onClick={async(e) => { handleApi();
        }}> Login</button>
                    </div>
                    <p className='paragraph'>
                        Don't Have Account? Click <Link to="/signup">here</Link>
                    </p>
                </div>
            </div>
        </>
    
}
export default Login;