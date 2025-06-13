import React from 'react';
import '../../../pages/shared/Footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-column">
          <div className="footer-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="footer-logo-icon"
            >
              <path d="M20 5L35 15V30L20 40L5 30V15L20 5Z" fill="none" stroke="white" strokeWidth="2" />
              <rect x="15" y="15" width="10" height="15" fill="white" />
              <rect x="18" y="12" width="4" height="3" fill="white" />
            </svg>
            <span className="footer-logo-text">TECHSTORE</span>
          </div>
          <div className="footer-contact">
            <p className="footer-support">Customer Support:</p>
            <p className="footer-phone">(629) 555-0129</p>
            <p className="footer-address">4517 Washington Ave</p>
            <p className="footer-address">Manchester, Kentucky 39495</p>
            <p className="footer-email">info@sitbo.com</p>
          </div>
        </div>

        {/* Top Category */}
        <div className="footer-column">
          <h3 className="footer-title">TOP CATEGORY</h3>
          <ul className="footer-links">
            <li><a href="#">Computer & Laptop</a></li>
            <li><a href="#">Smartphone</a></li>
            <li><a href="#">Headphone</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Camera & Photo</a></li>
            <li><a href="#">TV/Home</a></li>
            <li><a href="#" className="footer-browse">Browse All Product <span>→</span></a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li><a href="#">Shop Product</a></li>
            <li><a href="#">Shopping Cart</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Compare</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Customer Help</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Download App */}
        <div className="footer-column">
          <h3 className="footer-title">DOWNLOAD APP</h3>
          <div className="footer-apps">
            <a href="#"><img src="/placeholder.svg?height=40&width=120" alt="Google Play" /></a>
            <a href="#"><img src="/placeholder.svg?height=40&width=120" alt="App Store" /></a>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="footer-column">
          <h3 className="footer-title">POPULAR TAG</h3>
          <div className="footer-tags">
            {["iPhone", "TV", "Asus Laptop", "MacBook", "SSD", "Graphics Card", "Power Bank", "Smart TV", "Speaker", "Tablet", "Microwave", "Samsung"].map((tag, index) => (
              <a href="#" key={index} className="footer-tag">{tag}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        TechStore - eCommerce Template © 2025. Design by ITDragons Team
      </div>
    </footer>
  );
};

export default Footer;
