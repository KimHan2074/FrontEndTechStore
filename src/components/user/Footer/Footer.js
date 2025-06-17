import React from 'react';
import './Footer.css';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo and Customer Support */}
        <div className="footer-section">
          <h3 className="footer-logo">TechStore</h3>
          <p>Customer Supports:</p>
          <p>(629) 555-0129</p>
          <p>4517 Washington Ave.</p>
          <p>Manchester, Kentucky 39495</p>
          <p>info@techstore.com</p>
        </div>

        {/* Top Category */}
        <div className="footer-section">
          <h4>TOP CATEGORY</h4>
          <ul>
            <li>Computer & Laptop</li>
            <li>SmartPhone</li>
            <li>Headphone</li>
            <li>
              —— Accessories
            </li>
            <li>Camera & Photo</li>
            <li>TV & Homes</li>
          </ul>
          <a href="/" className="browse-link">Browse All Product →</a>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <ul>
            <li>Shop Product</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
            <li>Compare</li>
            <li>Track Order</li>
            <li>Customer Help</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Download App */}
        <div className="footer-section">
          <h4>DOWNLOAD APP</h4>
          <button className="download-btn">
            <FaGooglePlay /> Google Play
          </button>
          <button className="download-btn">
            <FaApple /> App Store
          </button>
        </div>

        {/* Popular Tag */}
        <div className="footer-section">
          <h4>POPULAR TAG</h4>
          <div className="tags">
            <span className="tag">Game</span>
            <span className="tag">iPhone</span>
            <span className="tag">TV</span>
            <span className="tag">Asus Laptops</span>
            <span className="tag">Macbook</span>
            <span className="tag">SSD</span>
            <span className="tag">Graphics Card</span>
            <span className="tag">Power Bank</span>
            <span className="tag">Smart TV</span>
            <span className="tag">Speaker</span>
            <span className="tag">Tablet</span>
            <span className="tag">Microwave</span>
            <span className="tag">Samsung</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        TechStore - eCommerce Template © 2025. Design by ITDragons Team
      </div>
    </footer>
  );
};

export default Footer;
