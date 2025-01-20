// import { Link } from 'react-router-dom'
// import { useState } from 'react';
// import axios from 'axios';
// import logo from './Images/logo.png'
// import './Login.module.css';
// function Signup(){
    
//   const[username,setusername]=useState('');//initial value of variable types
//   const[password,setpassword]=useState('');//initial value of variable types
//   const handleApi =()=>{
//       console.log({username:username, password:password})
//       const url='http://localhost:8080/signup';
//       const data={ username, password}
//       axios.post(url,data)
//       .then((res)=>{
//          console.log(res.data) ;
//          if(res.data.message)
//          {
//           alert(res.data.message)
//          }
//       })
//       .catch((err)=>{
//           console.log(err)
//           alert('SERVER ERR')
//       })
//   }
//     return <>
//       {/* // <div className="App">
//       //   <span>username</span>
//       //   <input type="text" value={username} onChange={(e)=>
//       //           {setusername(e.target.value)
//       //       }} /> 
//       //   <span>password</span>
//       //       <input type="text" value={password} 
//       //       onChange={(e)=>
//       //           {setpassword(e.target.value)
//       //       }}
//       //       /> 
//       //   <button onClick ={
//       //           handleApi
//       //       }> Signup</button>
//       //   <p>Click <Link to="/login">here</Link> to login</p>
       
//       // </div> */}
//       <div className="App">
//                 <div className="image-section">
//                     <img src={logo} alt="Uni-Cart Logo" />
//                 </div>
//                 <div className='form' width="400px">
//                     <h1 className='heading1'> Welcome To Uni-Kart</h1>
//                     <div>
//                         <span>Email</span>
//                         <input type="text" value={username}
//                             onChange={(e) => {
//                                 setusername(e.target.value)
//                             }} />
//                     </div>
//                     <div>
//                         <span>Password</span>
//                         <input type="password" value={password}
//                             onChange={(e) => {
//                                 setpassword(e.target.value)
//                             }} />
//                         <button className='login-signup-button' onClick={handleApi}> Signup</button>
//                     </div>
//                     <p className='paragraph'>
//                         Already Have An Account? Login <Link to="/login">here</Link>
//                     </p>
//                 </div>
//             </div>
//     </>
//   }
// export default Signup;
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./Login.module.css"
import logo from "./Images/logo.png"
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [username, setusername] = useState('');//initial value of variable types
    const [password, setpassword] = useState('');//initial value of variable types
    const navigate = useNavigate();
    const handleApi = async() => {
        const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
        if (!emailRegex.test(username)) {
            alert("wrong format");}
        else{
        console.log({ username: username, password: password })
        const url = 'http://localhost:8080/signup';
        const data = { username, password }
        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/login');
                }
            })
            .catch((err) => {
                console.log(err)
                alert('SERVER ERR')
            })}
    }

    return (
        <>
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
                        <button className='login-signup-button' onClick={async(e) => {handleApi()}}> Signup</button>
                    </div>
                    <p className='paragraph'>
                        Already Have An Account? Login <Link to="/login">here</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Signup;