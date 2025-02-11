import React from "react";
import "./Aboutus.css";
import Furniture from './Images/arrow.png';
import Books from './Images/avatar.png';
import Table from './Images/cart.png';

const Aboutus = () => {
  return (
    <div className="container">
      <div className="text-section">
        <h1 className="heading">
          Let's Swap <br /> Trade<br/> And Save
        </h1>
        <p className="description">
        Tired of clutter? Looking for something new?<br/> Uni-Kart is your go-to marketplace for smart swapping and seamless trading! Whether it’s books, gadgets, or furniture, exchange what you don’t need for something you love.
        </p>
        <div className="button">
          <button className="get-started">Get Started</button>
        </div>
      </div>
      <div className="image-section">
        <div className="image-cards">
          <img src={Furniture} alt="Furniture" className="image image1" />
          <img src={Books} alt="Books" className="image image2" />
          <img src={Table} alt="Table" className="image image3" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;