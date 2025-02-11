import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./Signup.css"
import logo from "./Images/final_logo_processed.png"
import usePasswordToggle from '../hook/usePasswordToggle';
import { useNavigate } from 'react-router-dom';
//import check from './Images/check.png'

function Signup() {
  const [username, setusername] = useState('');//initial value of variable types
  const [password, setpassword] = useState('');//initial value of variable types
  const [namee, setnamee] = useState('');
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [number, setnumber] = useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();

  //   const signuppopup=()=>{
  //     document.querySelector('.signup-popup').classList.add('opensignuppopup')   
  // }
  //   const closesignuppopup=()=>{ 
  //     document.querySelector('.signup-popup').classList.remove('opensignuppopup') 
  //     navigate('/login'); //sending to login page
  // } 

  const handleSignup = async () => {
    setMessage("");
    if (!username || !password) {
      setMessage("Please fill out all fields.");
      return;
    }
    const emailRegex = /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
    if (!emailRegex.test(username)) {
      setMessage("Email must be in the format name@domain.ku.edu.np.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/signup", { username, password, namee, number });
      setLoading(false);
      setMessage(res.data.message);
      if (res.status === 200) {
        setIsVerifying(true);
      }
    } catch (err) {
      setLoading(false);
      setMessage("Error signing up. Please try again.");
    }
  };
  const handleVerification = async () => {
    if (!verificationCode) {
      setMessage("Please check the verification code send to your email.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/verify-email", { username, verificationCode });
      //setMessage(res.data.message);
      if (res.status === 200) {
        //signuppopup();
        navigate("/login");
      }
    } catch (err) {
      setMessage("Invalid verification code. Please try again.");
    }
  };
  return <>

    <div className="image-section">
      <img src={logo} alt="Uni-Cart Logo" />
    </div>


    <h1 className='heading1'>Start your journey with Uni-Kart today!<br /></h1><div className='all'>
      <h2 className='subheading1'>{isVerifying ? "Verify Your Email" : "Please fill out your credentials."}</h2><div class="line2"></div>
      {message && <p className="message">{message}</p>}
      {isVerifying ? (
        <>
          <label>Verification Code</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className='signupbutton' onClick={handleVerification}>Verify Email</button>

          {/* <div className='signup-popup' id='popup1'>
                                     <img src={check} width='100px' height='100px'/>
                                     <h2>Happy Shopping!</h2>
                                     <p>Redirecting to Login...</p>
                                     <button type='button2' onClick={closesignuppopup}>OK</button>
                                    </div> */}
        </>
      ) : (<><div>
        <label className='signuplabel'>Username</label>
        <input className='signupinput' placeholder='Enter your username' type="text" value={namee}
          onChange={(e) => {
            setnamee(e.target.value)
          }} />
      </div>

        <label className='signuplabel'>Phone Number</label>
        <input className='signupinputphone' placeholder='Enter your phone number' type="text" value={number}
          onChange={(e) => {
            setnumber(e.target.value)
          }} />
        <div>
          <label className='signuplabel'>Email</label>
          <input className='signupinput' placeholder='Enter your email address' type="text" value={username}
            onChange={(e) => {
              setusername(e.target.value)
            }} />
        </div>
        <div>
          <div className='password-container'>
            <label className='signuplabel'>Password</label>
            <input className='signupinput' type={PasswordInputType} placeholder='Enter a password' value={password}
              onChange={(e) => {
                setpassword(e.target.value)
              }} /><span className='password-toggle-icon1'>{ToggleIcon}</span>
          </div>
        </div>
        <button className='signupbutton' onClick={handleSignup} disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
        {!isVerifying && (
          <p className='signupparagraph'>
            Already Have An Account? Login <Link to="/login">here</Link>.
          </p>)}

      </>
      )}</div>
  </>


}
export default Signup;