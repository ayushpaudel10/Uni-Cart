import Header from "./Header";
import{ Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import logo from './Images/LOGO-removebg.png'

function Signup(){
    const navigate = useNavigate();
    const[username,setusername]=useState('');//initial value of variable types
    const[password,setpassword]=useState('');//initial value of variable types
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);
    const handleApi =()=>{
        if (!username || !password) {
            alert('Please fill out all fields');
            return;
        }
        //console.log({username:username, password:password})
        const url='http://localhost:8000/signup';
        const data={ username, password}

        axios.post(url,data)
        .then((res)=>{
           console.log(res.data) ;
           if(res.data.message)
           {
            alert(res.data.message)
            navigate('/login');
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
            {/* WELCOME to signup
            <br></br>
            USERNAME
            <input type="text" value={username} onChange={(e)=>
                {setusername(e.target.value)
            }} /> 
            <br></br>
            PASSWORD
            <input type="password" value={password} 
            onChange={(e)=>
                {setpassword(e.target.value)
            }}
            /> 
            <br></br>
            <button onClick ={
                handleApi
            }> Signup</button> */}
             <div className="App">
            <div className="image-section">
                <img src={logo} alt="Uni-Kart Logo" height="150px" />
            </div>
            <h1>Sign Up to Uni-Kart</h1>
            <div className="form-container">
                <label>Username</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setusername(e.target.value)} 
                />
                
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)} 
                />
                
                <button onClick={handleApi}>SIGN UP</button>
            </div>
            {/* <Link to="/login"> LOGIN </Link> */}
            <p>
                Already have an account? <Link to="/login">LOGIN</Link>
            </p>
            </div>
        </div>
    )
}
export default Signup;//this when only one file to be imported if multiples then something else