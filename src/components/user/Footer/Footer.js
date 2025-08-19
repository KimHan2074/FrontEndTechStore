import React from 'react';
import '../../../pages/user/Footer/Footer.css';
import { Play, Apple } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-column">
                    <div className="footer-logo">
                        <Link to="/">
                            <img
                                src="/assets/images/logo.png"
                                style={{ width: '200px', height: 'auto' }}
                                alt="Footer Logo"
                            />
                        </Link>
                    </div>
                </div>

                <div className="footer-column">
                    <div className="footer-contact">
                        <p className="footer-phone">+84-335-504-4593</p>
                        <p className="footer-address">4517 Washington Ave</p>
                        <p className="footer-address">Manchester, Kentucky 39495</p>
                        <p className="footer-email">info@sitbo.com</p>
                    </div>
                </div>

                {/* Cột TOP CATEGORY */}
                <div className="footer-column">
                    <h3 className="footer-title">TOP CATEGORY</h3>
                    <ul className="footer-links footer-links-multi">
                        <li><a href="/user/product?categoryId=2">Computer & Laptop</a></li>
                        <li><a href="/user/product?categoryId=1">Smartphone</a></li>
                        <li><a href="/user/product?categoryId=3">Headphone</a></li>
                        <li><a href="/user/product?categoryId=5">Accessories</a></li>
                        <li><a href="/user/product?categoryId=6">Camera & Photo</a></li>
                        <li><a href="/user/product?categoryId=10">TV/Home</a></li>
                        <li>
                            <a href="/user/Product" className="footer-browse">
                                Browse All Product <span>→</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Cột DOWNLOAD APP */}
                <div className="footer-column download-app">
                    <h3 className="footer-title">DOWNLOAD APP</h3>
                    <div className="footer-apps">
                        <a href="https://play.google.com/store/games?device=windows">
                            <span>
                                <Play color="#ffff" strokeWidth={3} absoluteStrokeWidth />
                                Google Play
                            </span>
                        </a>
                        <a href="https://www.apple.com/vn/app-store/">
                            <span>
                                <Apple color="#ffff" strokeWidth={3} absoluteStrokeWidth />
                                App Store
                            </span>
                        </a>
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
