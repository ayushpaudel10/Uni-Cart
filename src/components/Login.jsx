import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './Login.module.css';
import logo from './Images/LOGO-removebg.png'
import axios from "axios";
function Login(){
  const navigate= useNavigate();
  const[username,setusername]=useState(' ');//initial value of variable types
  const[password,setpassword]=useState(' ');
  const handleApi =()=>{
    console.log({username:username, password:password})
    const url='http://localhost:8080/login';
    const data={ username, password}

    axios.post(url,data)
    .then((res)=>{
       console.log(res.data) ;
       if(res.data.message)
       {
        if(res.data.token){
            localStorage.setItem('token',res.data.token)
            navigate('/'); //sending to home page
        }
        alert(res.data.message)
       }
    })
    .catch((err)=>{
        console.log(err)
        alert('SERVER ERR')
    })}
    return<>
        <div className="App">
          <div className="image-section">
          <img src={logo} alt="Uni-Cart Logo" height="150px"/>
          </div>
         
         <h1>Welcome To Uni-Kart</h1>
          <span>Username</span>
          <input type="text" value={username}
            onChange={(e)=>
                {setusername(e.target.value)
            }} /> 
          <span>Password</span>
          <input type="text" value={password}
            onChange={(e)=>
                {setpassword(e.target.value)
            }} /> 
          <button onClick={handleApi}> LOGIN</button>
         
        </div>
        <p>Click <Link to="/signup">here</Link> to signup</p>
        </>
    
}
export default Login;