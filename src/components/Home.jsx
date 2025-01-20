import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css'
import Display from "./Display";
function Home(){
    const navigate= useNavigate();
    const[products, setproducts] =useState([]);
    //useEffect (() => {
        //if(!localStorage.getItem('token')){
            //navigate('/login')
        //}
    //}, [])
    return<>
        <Header/>
        <div>Products:</div>
        <Display search ={null}/>
    </>
    
}
export default Home;