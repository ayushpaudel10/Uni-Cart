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
import MyOrders from "./MyOrders";
function Profile() {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [newPassword, setnewpassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [oldpassword, setoldpassword] = useState("");
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');
    const changepassword = (e) => {
        e.preventDefault();
        if (confirm === newPassword) {
            const url = 'http://localhost:8080/change-password';
            const data = { newPassword, oldpassword, id };

            axios.post(url, data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message) {
                        alert(res.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert('SERVER ERR')
                })
        }
        else {
            alert('Passwords do not match');
        }
    }

    const showModal = () => {
        document.querySelector('.overlay').classList.add('showoverlay');
        document.querySelector('.updatepassword').classList.add('showupdatepassword')
    }

    const closeModal = () => {
        document.querySelector('.overlay').classList.remove('showoverlay');
        document.querySelector('.updatepassword').classList.remove('showupdatepassword')
    }

    useEffect(() => {
        const url = 'http://localhost:8080/get-user'
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setusername(res.data.username);
                    setemail(res.data.email);
                }
            })
            .catch((err) => {
                console.log(err)
                //alert('SERVER ERR')
            })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return <>
        <Header />
        <div className="aavatar"><img src={avatar} alt="Avatar Logo" height="100px" width="100px" /></div>
        <div className="details">{username}<br /></div><div className="details2"> {email} <br /> ****   <br />
            <button className="password" onClick={() => showModal()}>Update Password</button>
            <div className="overlay"></div>
            <div className="updatepassword">
                <h2>Change your password</h2>
                <span onClick={() => closeModal()}>&times;</span>
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
                                setConfirm(e.target.value)
                            }} />
                    </div>
                    <button onClick={(e) => { changepassword(e) }}>Submit</button>
                </form>
            </div>
        </div>
        <div className="myproduct">
            {/* <div className="listings">
                My Listings
                <Link to="/my-products">See my products</Link>
                <Myproducts profile={true} />
            </div> */}

            <div className="listings">
                <h3>My Listings</h3>
                <Myproducts profile={true} limit={3} />
                <Link to="/my-products" className="see-more">See all my products</Link>
            </div>



            {/* <div className="wishlist">
                My Wishlist
                <Link to="/wishlist">WishList</Link>
                <WishList wishlist={true} />
            </div> */}

            <div className="wishlist">
                <h3>My Wishlist</h3>
                <WishList wishlist={true} limit={3} />
                <Link to="/wishlist" className="see-more">See all wishlist</Link>
            </div>

            {/* <div className="orders">
                My Orders
                <Link to="/my-orders">My Orders</Link>
                <MyOrders profile={true} />
            </div> */}

            <div className="orders">
                <h3>My Orders</h3>
                <MyOrders profile={true} limit={3} />
                <Link to="/my-orders" className="see-more">See all my orders</Link>
            </div>

        </div>
        <button onClick={handleLogout}>Logout</button>
    </>
}
export default Profile;