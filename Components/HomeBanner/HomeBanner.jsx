import React from "react";
import Slider from "react-slick";
import './HomeBanner.css'

export const HomeBanner = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true
      };
    return (
        <div className='homeBanner'>
            <Slider {...settings}>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/fdcd7bd7-41cc-4318-b929-6ab65e3f11e3_NP-1976-688.jpg_2200x2200q80.jpg"className="w-100"/>
                </div>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/9ff52f9b574ef5f34975e231516f3cbe.jpg_2200x2200q80.jpg"className="w-100"/>
                </div>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/50b532d0-18b6-4d25-a6a4-9d97fb0b0e89_NP-1976-688.jpg_2200x2200q80.jpg"className="w-100"/>
                </div>
            </Slider>

        </div>
    )
}
