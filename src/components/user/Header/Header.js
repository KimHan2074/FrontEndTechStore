import { NavLink } from "react-router-dom"
import "../../../pages/user/Header/Header.css"
import { useCart } from "../../../context/CartContext"
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

import {
  ShoppingCart, Heart, User, ChevronDown, Phone,
  Twitter, Facebook, Youtube, Instagram, MessageCircleHeart,
  CreditCard, House, AlignJustify, Archive
} from "lucide-react";

function Header({ onSearch }) {
  const [itemCount, setItemCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/product/categories");

        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.warn("Categories is not an array:", response.data.data);
          setCategories([]);
        }

        console.log("Fetched categories:", response.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);
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

      {/* Welcome bar */}
      <div className="welcome-bar">
        <div className="container welcome-content">
          <div className="welcome-text">Welcome to TechStore.</div>
          <div className="social-links-icon">
            <span>Follow us:</span>
            <a href="#"><Twitter size={18} color="#FFF" /></a>
            <a href="#"><Facebook size={18} color="#FFF" /></a>
            <a href="#"><MessageCircleHeart size={18} color="#FFF" /></a>
            <a href="#"><CreditCard size={18} color="#FFF" /></a>
            <a href="#"><Youtube size={18} color="#FFF" /></a>
            <a href="#"><Instagram size={18} color="#FFF" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="main-nav">
        <div className="container nav-content">
          <div className="logo">
            <img src="/assets/images/logo.png" alt="Logo" style={{ width: "100px", height: "50px" }} />
          </div>
          <div className="search-container">
            <SearchBar
              onResults={(results, query) => {
                setSearchResults(results);
                setSearchQuery(query);
              }}
            />
          </div>

          <div className="nav-icons">
            <a href={isLoggedIn ? "/user/shopping_cart" : "#"} onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = "/signin";
              }
            }} className="icon-link">
              <ShoppingCart size={20} />
              {token && itemCount > 0 && (
                <span className="badge">{itemCount}</span>
              )}
            </a>
            <a href={isLoggedIn ? "/wishlist" : "#"} onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = "/signin";
              }
            }} className="icon-link">
              <Heart size={20} /><span className="badge">3</span>
            </a>

            <li className="user-dropdown">
              <a href={isLoggedIn ? "/user/profile" : "/signin"} className="icon-link">
                <User size={20} />
              </a>
              {isLoggedIn && (
                <ul className="dropdown-menu">
                  <li><a href="/logout">Logout</a></li>
                </ul>
              )}
            </li>
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

                <nav className="main-menus">
                  <ul className="menu-items">
                    <li className="menu-item-header">
                      <NavLink to={isLoggedIn ? "/user/homepage" : "#"} onClick={(e) => {
                        if (!isLoggedIn) {
                          e.preventDefault();
                          window.location.href = "/signin";
                        }
                      }} className={({ isActive }) => isActive ? "menu-link-header active" : "menu-link-header"}>
                        <House size={18} /> Homepage
                      </NavLink>
                    </li>
                    <li className="menu-item-header">
                      <NavLink to={isLoggedIn ? "/user/Product" : "#"} onClick={(e) => {
                        if (!isLoggedIn) {
                          e.preventDefault();
                          window.location.href = "/signin";
                        }
                      }} className={({ isActive }) => isActive ? "menu-link-header active" : "menu-link-header"}>
                        <AlignJustify size={18} /> Product List
                      </NavLink>
                    </li>
                    <li className="menu-item-header">
                      <NavLink to={isLoggedIn ? "/user/blog" : "#"} onClick={(e) => {
                        if (!isLoggedIn) {
                          e.preventDefault();
                          window.location.href = "/signin";
                        }
                      }} className={({ isActive }) => isActive ? "menu-link-header active" : "menu-link-header"}>
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
            {searchResults.length > 0 && (
              <div className="search-results-container">
                <h3 style={{ marginLeft: "1rem" }}>Search results for: "{searchQuery}"</h3>
                <div className="results-grid">
                  {searchResults.map((item) => (
                    <div key={item.id} className="result-card">
                      <img src={item.image} alt={item.name} />
                      <h4>{item.name}</h4>
                      <p>{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
    </header>
  );
}

export default Header;
