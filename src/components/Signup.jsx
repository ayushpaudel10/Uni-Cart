import { Link } from 'react-router-dom'
import { useState } from 'react';

function Signup(){
    
    const[form, setForm]=useState({});
    const handleForm=(e)=>{
      //console.log(e.target.value, e.target.name);
      setForm({
        ...form,
      [e.target.name]:e.target.value
      })
    }
    const handleSubmit= async (e)=>{
      e.preventDefault();
      const response= await fetch('http://localhost:8080/signup',{
       method:'POST',
       body:JSON.stringify(form),
       headers:{
        'Content-Type':'application/json'
       }
      })
     // console.log(form);
    const data=await response.json();//response is async i.e we will need to process it and await the result for this and text can be used instead json
    console.log(data);
    }
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
        <span>username</span>
        <input type="text" name="username" onChange={handleForm}></input>
        <span>password</span>
        <input type="text" name="password" onChange={handleForm}></input>
        <input type="submit"></input>
        <p>Click <Link to="/login">here</Link> to login</p>
       </form>
      </div>
    );
  }
export default Signup;