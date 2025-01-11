import React, { useState } from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [menu,setMenu]=useState("home");
    return (
        <div className='navbar'>
            <div className='header'>
                <h1 className='logo'>Uni-Kart</h1>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'></Link>Home{menu==="home"?<hr/>:<></>}</li>
                <span className="separator"></span>
                <li onClick={()=>{setMenu("catalog")}}>Catalog{menu==="catalog"?<hr/>:<></>}</li>
                <span className="separator"></span>
            </ul>
            <button className="add-button">+ Add items</button>
        </div>
    )
}
