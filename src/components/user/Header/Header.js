import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../pages/user/Header/Header.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import {
  ShoppingCart, Heart, User, ChevronDown, Phone,
  Twitter, Facebook, Youtube, Instagram, MessageCircleHeart,
  CreditCard, House, AlignJustify, Archive
} from "lucide-react";

function Header() {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
      <header className="store-header">

        {/* Promo banner */}
        <div className="promo-banner">
          <div className="container banner-content">
            <div className="black-friday-label">
              <span className="black-label">Black</span>
              <span className="friday-label">Friday</span>
            </div>
            <div className="promo-text">Up to <span className="discount-percentage">59%</span> OFF</div>
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

            <SearchBar
              onResults={(results, query) => {
                setSearchResults(results);
                setSearchQuery(query);
              }}
            />

            {/* Icons */}
            <div className="nav-icons">
              <a href={isLoggedIn ? "/cart" : "#"} onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  window.location.href = "/signin";
                }
              }} className="icon-link">
                <ShoppingCart size={20} /><span className="badge">2</span>
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
        </div>

        {/* Category nav */}
        <div className="category-nav">
          <div className="container category-content">
            <div className="category-dropdown">
              <NavLink to="#" className="dropdown-btn">
                All Category <ChevronDown size={16} />
              </NavLink>
              <ul className="category-menu">
               {categories.slice(0, 10).map((cat)  => (
                  <li key={cat.id}><a href={`/category/${cat.id}`}>{cat.name}</a></li>
                ))}
              </ul>
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
                  <NavLink to={isLoggedIn ? "/user/product/list" : "#"} onClick={(e) => {
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
      </header>

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
    </>
  );
}

export default Header;
