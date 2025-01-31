import Header from "./Header";
import{ Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './Login.css'
import logo from './Images/LOGO-removebg.png'
import { useEffect } from "react";


function Login(){
    const navigate= useNavigate()
    const[username,setusername]=useState('');//initial value of variable types
    const[password,setpassword]=useState('');//initial value of variable types
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [navigate]);  
    const handleApi =()=>{
        if (!username || !password) {
            alert('Please fill out all fields');
            return;
        }
        //console.log({username:username, password:password})
            const url='http://localhost:8000/login';
            const data={ username, password}
    
            axios.post(url,data)
            .then((res)=>{
              // console.log(res.data) ;
               if(res.data.message)
               {
                if(res.data.token){
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('userId',res.data.userId)//along with token the userId of the logged in user is also sent
                    navigate('/'); //sending to home page
                }
                alert(res.data.message)
               }
            })
            .catch((err)=>{
                console.log(err)
                alert('SERVER ERR')
            })
        }
    return (
        <div>
           <div> 
           <Header />
           <div className="App">
      <div className="image-section">
        <img src={logo} alt="Uni-Cart Logo" height="150px"/>
      </div>
      <h1>Welcome To Uni-Kart</h1>
            <div className="form-container">
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
                
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                
                <button onClick={handleApi}>LOGIN</button>
            </div>
    </div>
            {/* <br></br>
            USERNAME
            <input type="text" value={username}
            onChange={(e)=>
                {setusername(e.target.value)
            }} /> 
            <br></br>
            PASSWORD
            <input type="text" value={password}
            onChange={(e)=>
                {setpassword(e.target.value)
            }} /> 
            <br></br>
            <button onClick={handleApi}> LOGIN</button> */}
            <p>
            Don't Have Account? Click<Link to="/signup"> SIGNUP </Link>
            </p>
            {/* <Link to="/signup"> SIGNUP </Link> */}
           </div>
        </div>
    )
}
export default Login;//this when only one file to be imported if multiples then something else