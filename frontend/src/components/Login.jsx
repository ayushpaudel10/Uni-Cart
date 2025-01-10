import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./Login-Signup.css"
import logo from "./Logo/logo.png"


function Login() {
    const navigate = useNavigate()
    const [username, setusername] = useState('');//initial value of variable types
    const [password, setpassword] = useState('');//initial value of variable types
    const handleApi = () => {
        console.log({ username: username, password: password })
        const url = 'http://localhost:8000/login';
        const data = { username, password }

        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        navigate('/'); //sending to home page
                    }
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
                alert('SERVER ERR')
            })
    }
    return (
        <>
            <div className="App">
                <div className="image-section">
                    <img src={logo} alt="Uni-Cart Logo" />
                </div>
                <div className='form'>
                    <h1> Welcome To Uni-Kart</h1>
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
                        <button className='login-signup-button' onClick={handleApi}> Login</button>
                    </div>
                    <p>
                        Don't Have Account? Click <Link to="/signup">here</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Login;//this when only one file to be imported if multiples then something else
