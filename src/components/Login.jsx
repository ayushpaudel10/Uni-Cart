import { Link } from 'react-router-dom'
import { useState } from 'react';
function Login(){
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
          const response= await fetch('http://localhost:8080/login',{
           method:'POST',
           body:JSON.stringify(form),
           headers:{
            'Content-Type':'application/json'
           }
          })
         // console.log(form);
        const data=await response.json();//response is async i.e we will need to process it and await the result for this and text can be used instead json
            alert(data.message);

        console.log(data);
        }
    return(<>
        <div className="App">
         <form onSubmit={handleSubmit}>
          <span>username</span>
          <input type="text" name="username" onChange={handleForm}></input>
          <span>password</span>
          <input type="text" name="password" onChange={handleForm}></input>
          <input type="submit"></input>
         </form>
        </div>
        <p>Click <Link to="/signup">here</Link> to signup</p>
        </>
    )
}
export default Login;