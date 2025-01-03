import Header from "./Header";
import{ Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";



function Login(){
    const navigate= useNavigate()
    const[username,setusername]=useState(' ');//initial value of variable types
        const[password,setpassword]=useState(' ');//initial value of variable types
        const handleApi =()=>{
            console.log({username:username, password:password})
            const url='http://localhost:8000/login';
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
            })
        }
    return (
        <div>
            <Header />
            WELCOME to login
            <br></br>
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
            <button onClick={handleApi}> LOGIN</button>
            <Link to="/signup"> SIGNUP </Link>
        </div>
    )
}
export default Login;//this when only one file to be imported if multiples then something else