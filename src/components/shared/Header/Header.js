import { useState } from "react"
import "../../../pages/shared/Header/Header.css"

function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="store-header">
      {/* Black Friday Banner */}
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

      {/* Welcome Bar */}
      <div className="welcome-bar">
        <div className="container welcome-content">
          <div className="welcome-text">Welcome to TechStore.</div>
          <div className="social-links">
            <span>Follow us:</span>
            <a href="#" className="social-link">
              <i className="social-icon">🐦</i>
            </a>
            <a href="#" className="social-link">
              <i className="social-icon">📘</i>
            </a>
            <a href="#" className="social-link">
              <i className="social-icon">📌</i>
            </a>
            <a href="#" className="social-link">
              <i className="social-icon">👽</i>
            </a>
            <a href="#" className="social-link">
              <i className="social-icon">📺</i>
            </a>
            <a href="#" className="social-link">
              <i className="social-icon">📷</i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <div className="container nav-content">
          <div className="logo">
            <a href="/">
              <div className="logo-image">🏪</div>
              <span className="logo-text">TECHSTORE</span>
            </a>
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
                🔍
              </button>
            </form>
          </div>

          <div className="nav-icons">
            <a href="/cart" className="icon-link">
              <i className="nav-icon">🛒</i>
              <span className="badge">2</span>
            </a>
            <a href="/wishlist" className="icon-link">
              <i className="nav-icon">❤️</i>
              <span className="badge">3</span>
            </a>
            <a href="/account" className="icon-link">
              <i className="nav-icon">👤</i>
            </a>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        <div className="container category-content">
          <div className="category-dropdown">
            <button className="dropdown-btn">All Category</button>
            <div className="dropdown-arrow">▼</div>
          </div>

          <nav className="main-menu">
            <ul className="menu-items">
              <li className="menu-item">
                <a href="/" className="menu-link">
                  <span className="home-icon">🏠</span> Homepage
                </a>
              </li>
              <li className="menu-item">
                <a href="/products" className="menu-link">
                  <span className="list-icon">≡</span> Product List
                </a>
              </li>
              <li className="menu-item">
                <a href="/blog" className="menu-link">
                  <span className="blog-icon">📝</span> Blog
                </a>
              </li>
            </ul>
          </nav>

          <div className="contact-phone">
            <span className="phone-icon">📞</span>
            <span className="phone-number">+1-202-555-0104</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
