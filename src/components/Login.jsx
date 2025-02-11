
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
  const [error, setError] = useState(''); // State to store error messages
   
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
    setError(''); // Reset error message before new login attempt
    const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
    console.log(username);
    if (!username || !password) {
        setError("All fields are required.");
        return;
      }
    if (!emailRegex.test(username)) {
        //alert("wrong format");
        setError("Invalid email format. Please use your university email.");
        openfail();
    }
   
   
    try {
        const url = 'http://localhost:8000/login';
        const data = { username, password };
        const res = await axios.post(url, data);
  
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          openpopup();
        } else {
          setError(res.data.message || "Login failed. Please check your credentials.");
          openfail();
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
    };
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
                                setError(''); // Clear error on user input
                            }} />
                    </div>
                    <div>
                        <div className='password-container'>
                        <input className='input-field' type={PasswordInputType} placeholder='password' value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                                setError(''); // Clear error on user input
                            }} />
                            <span className='password-toggle-icon'>{ToggleIcon}</span></div>

                   
                    <button className='login-button'  disabled={!username || !password || error}  onClick={async(e) => { handleApi();}}>
                   Login</button>
                   

                   <div className='loginpopup' id='popup'>
                    <img src={check} width='100px' height='100px'/>
                    <h2>Happy Shopping!</h2>
                    <p>Redirecting to Home page...</p>
                    <button type='button' onClick={closepopup}>OK</button>
                   </div>

                   <div className='loginfail' id='fail'>
                    <h2>Login failed!</h2>
                    <p>{error || "Please check your information."}.</p>
                    <button type='button' onClick={closefail}>OK</button>
                   </div>

                   
             </div>
       
                    </div>
                    
                </div>
            </div>
            <div>
                 {/* Display error message */}
                 {error && <p className="error-message">{error}</p>}
            <p className='paragraph'>
                        New here? Create an account  <Link to="/signup">here</Link>!
                    </p>
            </div>
        </>
    
}
export default Login;
