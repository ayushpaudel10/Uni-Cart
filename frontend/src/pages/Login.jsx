import { Link } from 'react-router-dom'
import { useState } from 'react';
import './Login.module.css';
import logo from './Images/LOGO-removebg.png'

function Login() {
  const [form, setForm] = useState({});
  const handleForm = (e) => {
    //console.log(e.target.value, e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // console.log(form);
    const data = await response.json();//response is async i.e we will need to process it and await the result for this and text can be used instead json
    alert(data.message);

    console.log(data);
  }
  return (<>
    <div className="App">
      <div className="image-section">
        <img src={logo} alt="Uni-Cart Logo" height="150px"/>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Welcome To Uni-Kart</h1>
        <span>Username</span>
        <input type="text" name="username" placeholder='Email or Username' onChange={handleForm}></input>
        <span>Password</span>
        <input type="password" name="password" placeholder='Password' onChange={handleForm}></input>
        <Link to="/"><input type="submit" value="Login"></input></Link>
      </form>
    </div>
    <p>
      Don't Have Account? Click <Link to="/signup">here</Link>
    </p>
  </>
  )
}
export default Login;