import React from "react";
import Slider from "react-slick";
import './Homebanner.css'
import { useNavigate } from "react-router-dom";
import furniture from './Images/furnitures-icon.png';
import furniture2 from './Images/furniture-icons2.png';

function HomeBanner () {
    const navigate=useNavigate();
    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true
      };
    const handlecategory=(category)=>{
        navigate('/catalogue/'+category);
    }
    return (
        <div className='homeBanner'>
            
            <Slider {...settings}>
                <div className="itemfurniture">
                <div className="furniture-box"></div>
                <div className="words">
                    <div className="Quality">Quality</div>
                    <div className="Qfurniture">Furnitures</div>
                    <div className="Second">Second hand prices!</div>
                </div>
                <div className="secondwords">
                    Give pre-loved furnitures a new home. Style your space sustainably and affordably!
                </div>
                    {/* <img src={furniture2} className="furnitures-icon2"></img> */}
                    <img src={furniture} className="furnitures-icon"></img>
                    {/* <img src={furniture} data-value="Furniture"className="w-100"onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/> */}
                </div>
                <div className="item">
                    {/* <img src="https://img.lazcdn.com/us/domino/9ff52f9b574ef5f34975e231516f3cbe.jpg_2200x2200q80.jpg"className="w-10" data-value="Stationary" onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/> */}
                </div>
                <div className="itemtextbook">
                    {/* <img src="https://img.lazcdn.com/us/domino/50b532d0-18b6-4d25-a6a4-9d97fb0b0e89_NP-1976-688.jpg_2200x2200q80.jpg"className="w-100"  data-value="Textbooks and Notes" onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/> */}
                </div>
            </Slider>

        </div>
    )
}
export default HomeBanner;