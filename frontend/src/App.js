//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';


function App() {
  const[form, setForm]=useState({});
  const[users, setUsers]=useState([]);
  const handleForm=(e)=>{
    //console.log(e.target.value, e.target.name);
    setForm({
      ...form,
    [e.target.name]:e.target.value
    })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const response= await fetch('http://localhost:8080/demo',{
     // method:'GET'
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
  const getUsers= async ()=>{
    const response= await fetch('http://localhost:8080/demo',{
     method:'GET'
    })
   const data=await response.json();//response is async i.e we will need to process it and await the result for this and text can be used instead json
   //console.log(data);
   setUsers(data);
  }
  useEffect(()=>{
    getUsers();
  },[])
  return (
    <div className="App">
      <Header />
      <Home />
       
     <form onSubmit={handleSubmit}>
      <span>username</span>
      <input type="text" name="username" onChange={handleForm}></input>
      <span>password</span>
      <input type="text" name="password" onChange={handleForm}></input>
      <input type="submit"></input>
     </form>
     <div>
      <ul>
        {users.map(user=><li key={user._id}>{user.username}, {user.password}</li>)}
      </ul>
     </div>
    </div>
  );
}

export default App;