import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Myproducts from "./Myproducts"
import WishList from "./WishList";
function Profile(){
    const [newPassword, setnewpassword]=useState("");
    const [confirm, setConfirm]=useState("");
    const [oldpassword, setoldpassword]=useState("");
    const navigate=useNavigate();
    const id= localStorage.getItem('userId');
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    const changepassword=()=>{
        if (confirm===newPassword){
        const url='http://localhost:8080/change-password';
        const data={newPassword,oldpassword, id};
    
        axios.post(url,data)
        .then((res)=>{
           console.log(res.data) ;
           if(res.data.message)
           {
            alert(res.data.message)
           }
        })
        .catch((err)=>{
            console.log(err)
            alert('SERVER ERR')
        })}
        else{
            alert('Passwords do not match');
        }
    }
    return<>
    <Header/>
    <p>My profile</p>
    <p>Change password</p>
    <label>Enter your old password </label><input type="text" value={oldpassword}
                            onChange={(e) => {
                                setoldpassword(e.target.value)
                            }} /><br/>
    <label>Enter your new password </label><input type="text" value={newPassword}
                            onChange={(e) => {
                                setnewpassword(e.target.value)
                            }} /><br/>
    <label>Enter your confirm password </label><input type="text" value={confirm}
                            onChange={(e) => {
                                setConfirm(e.target.value)}}/><br/>
    <button onClick={changepassword}>Submit</button>
    <Link to="/my-products">See my products</Link>
    <Myproducts profile={true} />
    <Link to="/wishlist">WishList</Link>
    <WishList wishlist={true}/>
    <p>Add to cart list</p>
    <button onClick={handleLogout}>Logout</button>
    </>
}
export default Profile;