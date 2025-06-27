import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../../pages/user/Header/Header.css";
import axios from "axios";
import {
  Search, ShoppingCart, Heart, User, ChevronDown, Phone,
  Twitter, Facebook, Youtube, Instagram, MessageCircleHeart,
  CreditCard, House, AlignJustify, Archive
} from "lucide-react";

function Header({ onSearch }) {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("token"); // ✅ kiểm tra login

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/top-images");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="store-header">
      <div className="promo-banner">
        <div className="container banner-content">
          <div className="black-friday-label">
            <span className="black-label">Black</span>
            <span className="friday-label">Friday</span>
          </div>
          <div className="promo-text">
            Up to <span className="discount-percentage">59%</span> OFF
          </div>
          <button className="shop-now-btn">SHOP NOW</button>
        </div>
      </div>

      <div className="welcome-bar">
        <div className="container welcome-content">
          <div className="welcome-text">Welcome to TechStore.</div>
          <div className="social-links">
            <span>Follow us:</span>
            <a href="#" className="social-link"><Twitter size={18} /></a>
            <a href="#" className="social-link"><Facebook size={18} /></a>
            <a href="#" className="social-link"><MessageCircleHeart size={18} /></a>
            <a href="#" className="social-link"><CreditCard size={18} /></a>
            <a href="#" className="social-link"><Youtube size={18} /></a>
            <a href="#" className="social-link"><Instagram size={18} /></a>
          </div>
        </div>
      </div>

      <div className="main-nav">
        <div className="container nav-content">
          <div className="logo">
            <img
              src="/assets/images/logo.png"
              style={{ width: '100px', height: '50px' }}
              className="logo-img" alt="Logo" />
          </div>

          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="nav-icons">
            <a href="/user/shopping_cart" className="icon-link">
              <ShoppingCart size={20} />
            </a>
            <a href="/user/wishlist" className="icon-link">
              <Heart size={20} />
            </a>
            <a href="/user/profile" className="icon-link">
              <User size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="category-nav">
        <div className="container category-content">
          <div
            className="category-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="dropdown-btn">
              All Category <ChevronDown />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu horizontal-menu">
                {categories.map((category) => (
                  <div key={category.id} className="dropdown-item">
                    <img
                      src={category.image_url || "https://via.placeholder.com/50"}
                      alt={category.name}
                      className="category-image"
                    />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <nav className="main-menu">
            <ul className="menu-items">
              <li className="menu-item">
                <NavLink
                  to="/user/homepage"
                  className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                >
                  <House size={18} /> Homepage
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/user/product"
                  className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                >
                  <AlignJustify size={18} /> Product List
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/user/blog"
                  className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                >
                  <Archive size={18} /> Blog
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="contact-phone">
            <Phone size={18} />
            <span className="phone-number">+1-202-555-0104</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
