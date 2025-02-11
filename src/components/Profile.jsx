import Header from "./Header";
import { useNavigate } from "react-router-dom";
import avatar from "./Images/avatar.png";
import './Profile.css';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import WishList from "./WishList";
import Myproducts from "./Myproducts";
import { Link } from "react-router-dom";
import avatar1 from "./Images/avatar1.jpg"
import avatar2 from "./Images/avatar2.jpg"
import avatar3 from "./Images/avatar3.jpg"

function Profile(){
const [username,setusername]=useState("");
const [email,setemail]=useState("");
const [profilePic, setProfilePic] = useState(avatar);
const [newPassword, setnewpassword]=useState("");
    const [confirm, setConfirm]=useState("");
    const [oldpassword, setoldpassword]=useState("");
    const navigate=useNavigate();
    const id= localStorage.getItem('userId');
    const changepassword= async (e)=>{
        e.preventDefault();
        // if (confirm===newPassword){
        // const url='http://localhost:8000/change-password';
        // const data={newPassword,oldpassword, id};

        // axios.post(url,data)
        // .then((res)=>{
        //    console.log(res.data.message) ;
        //    if(res.data.message)
        //    {
        //     alert(res.data.message)
        //    }
        // })
        // .catch((err)=>{
        //     console.log(err)
        //     alert('SERVER ERR')
        // })}
        // else{
        //     alert('Passwords do not match');
        // }}
        if (confirm !== newPassword) {
            alert('Passwords do not match');
            return;
        }
    
        try {
            const url = 'http://localhost:8000/change-password';
            const data = { newPassword, oldpassword, id };
    
            console.log("Sending request:", data); // Debugging step
    
            const res = await axios.post(url, data);
            
            console.log("Response:", res.data); // Debugging step
    
            if (res.data.message) {
                alert(res.data.message);
            }
        } catch (err) {
            console.error("Error:", err);
            alert('SERVER ERR');
        }
    };

const showModal=()=>{
    document.querySelector('.overlay').classList.add('showoverlay');  
    document.querySelector('.updatepassword').classList.add('showupdatepassword')     
}

const closeModal=()=>{
    document.querySelector('.overlay').classList.remove('showoverlay');  
    document.querySelector('.updatepassword').classList.remove('showupdatepassword')     
}

useEffect(() => {
    const url = 'http://localhost:8000/get-user';
    let data = { userId: localStorage.getItem('userId') };

    axios.post(url, data)
        .then((res) => {
            console.log("User Data:", res.data);
            if (res.data) {
                setusername(res.data.username);
                setemail(res.data.email);

                // Check if profilePicId exists and set preset image
                if (res.data.profilePicId) {
                    switch (res.data.profilePicId) {
                        case "1":
                            setProfilePic(avatar1);
                            break;
                        case "2":
                            setProfilePic(avatar2);
                            break;
                        case "3":
                            setProfilePic(avatar3);
                            break;
                        default:
                            setProfilePic(avatar); // Default avatar if ID is invalid
                            break;
                    }
                } 
                // If no profilePicId, check for uploaded profilePicPath src={'http://localhost:8000/' + item.pimage}
                else if (res.data.profilePicPath) {
                    setProfilePic(`http://localhost:8000/${res.data.profilePicPath}`);
                } 
                else {
                    setProfilePic(avatar); // Default avatar if no image is found
                }
            }
        })
        .catch((err) => {
            console.error("Error fetching user data:", err);
        });
}, []);


    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return<>
    <Header/>
    <div className="aavatar"><img src={profilePic} alt="Profile Pic" height="100px" width="100px" onError={(e) => { e.target.src = avatar; }} /></div>
    <div className="details">{username}<br/></div><div className="details2"> {email} <br/> ****   <br/>
        <button className="password" onClick={()=>showModal() }>Update Password</button>
            <div className="overlay"></div>
                 <div className="updatepassword">
                    <h2>Change your password</h2>
                    <span onClick={()=>closeModal() }>&times;</span>
                    <form action="">
                        <div>
                            <label for="">Current Password</label>
                            <input type="text" value={oldpassword}
                            onChange={(e) => {
                                setoldpassword(e.target.value)
                            }} />
                        </div>
                        <div>
                            <label for="">New Password</label>
                            <input type="text" value={newPassword}
                            onChange={(e) => {
                                setnewpassword(e.target.value)
                            }} />
                        </div>
                        <div>
                            <label for="">Confirm New Password</label>
                            <input type="text" value={confirm}
                            onChange={(e) => {
                                setConfirm(e.target.value)}}/>
                        </div>
                        <button onClick={(e) => {changepassword(e)}}>Submit</button>
                    </form>
                    </div> 
                    </div>
    <div className="myproduct">
        <div className="listings">MY Listings</div>
        <Link to="/my-products">See my products</Link>
        <Myproducts profile={true} />
        <div className="wishlist">My Wishlist</div>
        <Link to="/wishlist">WishList</Link>
        <WishList wishlist={true}/>
    </div>
    <button onClick={handleLogout}>Logout</button>
    </>
}
export default Profile;
