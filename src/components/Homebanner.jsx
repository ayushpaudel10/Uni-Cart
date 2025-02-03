import React from "react";
import Slider from "react-slick";
import './Homebanner.css'
import { useNavigate } from "react-router-dom";
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
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/fdcd7bd7-41cc-4318-b929-6ab65e3f11e3_NP-1976-688.jpg_2200x2200q80.jpg" data-value="Furniture"className="w-100"onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/>
                </div>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/9ff52f9b574ef5f34975e231516f3cbe.jpg_2200x2200q80.jpg"className="w-100" data-value="Stationary" onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/>
                </div>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/50b532d0-18b6-4d25-a6a4-9d97fb0b0e89_NP-1976-688.jpg_2200x2200q80.jpg"className="w-100" data-value="Textbooks and Notes" onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/>
                </div>
            </Slider>

        </div>
    )
}
export default HomeBanner;