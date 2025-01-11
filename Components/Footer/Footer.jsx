import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h4>About Us</h4>
                    <p>
                        We are leading Uni-Kart, offering you to add your item for swap and trade. Shop with confidence!
                    </p>
                </div>

                <div className="footer-section quick-links">
                    <h4>Discover</h4>
                    <ul>
                        <li><a href="/catalog">Catalog</a></li>
                        <li><a href="/search">Search</a></li>
                    </ul>
                </div>

                <div className="footer-section help center">
                    <h4>Help Center</h4>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/signup">SignUp</a></li>
                        <li><a href="/signin">SignIn</a></li>
                    </ul>
                </div>

                <div className="footer-section newsletter">
                    <h4>Subscribe</h4>
                    <form>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Uni-Kart | All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
