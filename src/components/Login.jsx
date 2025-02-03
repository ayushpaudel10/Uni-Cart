// import Header from "./Header";
// import{ Link, useNavigate } from 'react-router-dom';
// import { useState } from "react";
// import axios from "axios";
// import './Login.css'
// import logo from './Images/logo.png'
// import { useEffect } from "react";


// function Login(){
//     const navigate= useNavigate()
//     const[username,setusername]=useState('');//initial value of variable types
//     const[password,setpassword]=useState('');//initial value of variable types
//     const [loading, setLoading] = useState(false); // State for loading spinner
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             navigate('/'); // Redirect to home if already logged in
//         }
//     }, [navigate]);  
//     const handleApi =()=>{
//         if (!username || !password) {
//             alert('Please fill out all fields');
//             return;
//         }
//         //console.log({username:username, password:password})
//         const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
//         console.log(username);
//         if (!emailRegex.test(username)) {
//             alert("wrong format");}
//         else{
//             const url='http://localhost:8000/login';
//             const data={ username, password}
//             setLoading(true);
//             axios.post(url,data)
//             .then((res)=>{
//               // console.log(res.data) ;
//                if(res.data.message)
//                {
//                 if(res.data.token){
//                     localStorage.setItem('token',res.data.token)
//                     localStorage.setItem('userId',res.data.userId)//along with token the userId of the logged in user is also sent
//                     navigate('/'); //sending to home page
//                 }
//                 setLoading(false);
//                 alert(res.data.message)
//                }
//             })
//             .catch((err)=>{
//                 console.log(err)
//                 setLoading(false);
//                 alert('SERVER ERR')
//             })}
//         }
//     return (
//         <div>
//            <div> 
//            <Header />
//            <div className="App">
//       <div className="image-section">
//         <img src={logo} alt="Uni-Cart Logo" height="150px"/>
//       </div>
//       <h1>Welcome To Uni-Kart</h1>
//             <div className="form-container">
//                 <label>Username</label>
//                 <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Enter your email" />
                
//                 <label>Password</label>
//                 <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password"/>
                
//                 <button onClick={handleApi} disabled={loading}> {loading ? "Logining..." : "Login"}</button>
//             </div>
//     </div>
//             <p>
//             Don't Have Account? Click<Link to="/signup"> SIGNUP </Link>
//             </p>
//             {/* <Link to="/signup"> SIGNUP </Link> */}
//            </div>
//         </div>
//     )
// }
// export default Login;//this when only one file to be imported if multiples then something else
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './Login.css';
import logo from './Images/final_logo_processed.png'
import login from './Images/loginimage.png'
import axios from "axios";
import usePasswordToggle from '../hook/usePasswordToggle';
import check from './Images/check.png'

function Login(){
  const navigate= useNavigate();
  const[username,setusername]=useState('');//initial value of variable types
  const[password,setpassword]=useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
   
  const openpopup=()=>{
    document.querySelector('.overlay').classList.add('showoverlay');  
    document.querySelector('.loginpopup').classList.add('open-loginpopup')   
}
  const closepopup=()=>{
    document.querySelector('.overlay').classList.remove('showoverlay');  
    document.querySelector('.loginpopup').classList.remove('open-loginpopup') 
    navigate('/'); //sending to home page
} 
const openfail=()=>{
    document.querySelector('.overlay').classList.add('showoverlay');  
    document.querySelector('.loginfail').classList.add('open-loginfail')   
}
  const closefail=()=>{
    document.querySelector('.overlay').classList.remove('showoverlay');  
    document.querySelector('.loginfail').classList.remove('open-loginfail')
}


  const handleApi =async()=>{
    const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
    console.log(username);
    if (!emailRegex.test(username)) {
        //alert("wrong format");
        openfail();
    }
    else{
    const url='http://localhost:8000/login';
    const data={ username, password}
    axios.post(url,data)
    .then((res)=>{
       console.log(res.data) ;
       if(res.data.message)
       {
        if(res.data.token){
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userId',res.data.userId)
            openpopup();

        }
        console.log(res.data.message);
        // alert(res.data.message);
       
       }
    })
    .catch((err)=>{
      console.log(err)
        alert('SERVER ERR')
    })}}
    return<>
        <div className="App">
        <div className='overlay'></div>
                <div className="image-section">
                    <img src={logo} alt="Uni-Cart Logo" />
                </div>

                <div className='form'>
                    <div className='image'>
                    <img src={login} alt="login Logo" /></div>
                    <div className='form1'>
                    <h1 className='heading1'> Welcome To Uni-Kart!<br/><h8 className='subheading'>Your ideal marketplace for all second-hand treasures!</h8></h1>
                    <div>
                        {/* <span>Email</span> */}
                        <input type="text" placeholder='e-mail address'value={username}
                            onChange={(e) => {
                                setusername(e.target.value)
                            }} />
                    </div>
                    <div>
                        <div className='password-container'>
                        <input className='input-field' type={PasswordInputType} placeholder='password' value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }} />
                            <span className='password-toggle-icon'>{ToggleIcon}</span></div>

                    
                    <button className='login-button' onClick={async(e) => { handleApi();}}>
                   Login</button>
                   

                   <div className='loginpopup' id='popup'>
                    <img src={check} width='100px' height='100px'/>
                    <h2>Happy Shopping!</h2>
                    <p>Redirecting to Home page...</p>
                    <button type='button' onClick={closepopup}>OK</button>
                   </div>

                   <div className='loginfail' id='fail'>
                    <h2>Login failed!</h2>
                    <p>Please check your information.</p>
                    <button type='button' onClick={closefail}>OK</button>
                   </div>

                   
             </div>
       
                    </div>
                    
                </div>
            </div>
            <div>
            <p className='paragraph'>
                        New here? Create an account  <Link to="/signup">here</Link>!
                    </p>
            </div>
        </>
    
}
export default Login;