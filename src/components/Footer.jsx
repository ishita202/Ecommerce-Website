import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Customer Care Section */}
        <div className="footer-section">
          <h4>Customer Care</h4>
          <p>Help Center</p>
          <p>How to Buy</p>
          <p>Track Your Order</p>
          <p>Returns & Refunds</p>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Our Story</p>
          <p>Careers</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Youtube</p>
        </div>

        {/* App Download */}
        <div className="footer-section">
          <h4>Download App</h4>
          <div className="app-icons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 YourBrand. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
