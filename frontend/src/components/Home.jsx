import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css'
import Display from "./Display";
import  HomeBanner from "./Homebanner";
import Aboutus from './Aboutus';
import Footer from './Footer';

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
        <HomeBanner/>
        <div className="headingaboveproducts">&lt;&nbsp;&nbsp;Fresh Finds&nbsp;&nbsp;&gt;</div>
        <Display search={null}/>
        <section class="skills" id="skills">
        <div class="max">
        <img src="https://freedesignfile.com/upload/2017/05/Embrace-folder-young-business-woman-Stock-Photo1.jpg"/>
                <div class="box">
                    <div class="content"><h3>WHAT IS UNI KART?</h3>
                    <div class="text"><p><p>Welcome to Uni-Kart Your Campus Marketplace for Second-Hand Goods!</p>

<p>Looking for an affordable way to buy and sell items within your university community? Uni-Kart is the perfect platform for students to connect, trade, and find great deals on second-hand goods. Whether you’re looking for textbooks, furniture, or stationary, our platform makes it easy, safe, and convenient to buy and sell within your campus.</p>

<p>Why spend more when you can find quality pre-owned items from fellow students? Join today and start exploring a sustainable way to shop while saving money and reducing waste.</p>

<p>Buy. Sell. Connect. Your trusted second-hand marketplace, exclusively for students!</p>

</p>
                    </div></div>
                </div>
               </div>
</section><Aboutus/>
<Footer/>
    </>
    
}
export default Home;