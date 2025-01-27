
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./Images/logo.png";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner

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
      const res = await axios.post("http://localhost:8000/signup", { username, password });
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
      setMessage("Please enter the verification code sent to your email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/verify-email", { username, verificationCode });
      setMessage(res.data.message);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setMessage("Invalid verification code. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="App">
        <div className="image-section">
          <img src={logo} alt="Uni-Kart Logo" height="150px" />
        </div>
        <h1>{isVerifying ? "Verify Your Email" : "Sign Up to Uni-Kart"}</h1>
        <div className="form-container">
          {message && <p className="message">{message}</p>}
          {isVerifying ? (
            <>
              <label>Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={handleVerification}>Verify Email</button>
            </>
          ) : (
            <>
              <label>Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignup} disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
            </>
          )}
        </div>
        {!isVerifying && (
          <p>
            Already have an account? <Link to="/login">LOGIN</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;