import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./Login-Signup.css"
import logo from "./Logo/logo.png"
function Signup() {
    const [username, setusername] = useState('');//initial value of variable types
    const [password, setpassword] = useState('');//initial value of variable types
    const handleApi = () => {
        console.log({ username: username, password: password })
        const url = 'http://localhost:8000/signup';
        const data = { username, password }

        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
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
                        <button className='login-signup-button' onClick={handleApi}> Signup</button>
                    </div>
                    <p>
                        Already Have An Account? Login <Link to="/login">here</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Signup;//this when only one file to be imported if multiples then something else
