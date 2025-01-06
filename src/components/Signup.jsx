import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
function Signup(){
    
  const[username,setusername]=useState(' ');//initial value of variable types
  const[password,setpassword]=useState(' ');//initial value of variable types
  const handleApi =()=>{
      console.log({username:username, password:password})
      const url='http://localhost:8080/signup';
      const data={ username, password}
      axios.post(url,data)
      .then((res)=>{
         console.log(res.data) ;
         if(res.data.message)
         {
          alert(res.data.message)
         }
      })
      .catch((err)=>{
          console.log(err)
          alert('SERVER ERR')
      })
  }
    return (
      <div className="App">
        <span>username</span>
        <input type="text" value={username} onChange={(e)=>
                {setusername(e.target.value)
            }} /> 
        <span>password</span>
            <input type="text" value={password} 
            onChange={(e)=>
                {setpassword(e.target.value)
            }}
            /> 
        <button onClick ={
                handleApi
            }> Signup</button>
        <p>Click <Link to="/login">here</Link> to login</p>
       
      </div>
    );
  }
export default Signup;