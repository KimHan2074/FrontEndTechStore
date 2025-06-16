import { useState } from "react"
import { Search, ShoppingCart, Heart, User, ChevronDown, Phone } from "lucide-react"
import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className = "header-content">
        <div className="header">
            {/* Top Banner */}
            <div className="top-banner">
                <div className="banner-content">

                    <div className="black-friday">
                        <span className="black">BLACK</span> Friday
                    </div>

                    <div className="up-to-discount">
                        <span className="up-to">Up to</span>
                        <span className="discount">59%</span>
                        <span className="off">OFF</span>
                    </div>
                
                    <button className="shop-now-btn">SHOP NOW</button>
                </div>
            </div>

            {/* Welcome Bar */}
            <div className="welcome-bar">
                <div className="welcome-text">Welcome to TechStore.</div>
                <div className="social-icons">
                <span>Follow us:</span>
                {/* <Link className="social-icon" to="/about"><img src="/foo.jpg" alt="foo" style={{ width:'500px', height:'500px'}} /></Link>
                <Link className="social-icon" to="/about"><img src="/foo.jpg" alt="foo" style={{ width:'500px', height:'500px'}} /></Link>
                <Link className="social-icon" to="/about"><img src="/foo.jpg" alt="foo" style={{ width:'500px', height:'500px'}} /></Link>
                <Link className="social-icon" to="/about"><img src="/foo.jpg" alt="foo" style={{ width:'500px', height:'500px'}} /></Link>
                <Link className="social-icon" to="/about"><img src="/foo.jpg" alt="foo" style={{ width:'500px', height:'500px'}} /></Link> */}

                <div className="social-icon">fb</div>
                <div className="social-icon">ig</div>
                <div className="social-icon">tt</div>
                <div className="social-icon">mess</div>
                <div className="social-icon">ig</div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="main-nav">
                <div className="logo">
                {/* <Link href="/"> */}
                    <div className="logo-container">
                    <div className="logo-icon">
                        <span className="logo-text">T</span>
                    </div>
                    <span className="logo-name">TECHSTORE</span>
                    </div>
                {/* </Link> */}
                </div>

                <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button">
                    <Search size={18} />
                </button>
                </div>

                <div className="nav-icons">
                    {/* <Link className="nav-icon" to="/cart"> 
                        <ShoppingCart size={20} />
                        <span className="icon-badge">0</span>
                    </Link> */}

                    {/* <Link className="nav-icon" to="/wishlist"> 
                        <Heart size={20} />
                        <span className="icon-badge">0</span>
                    </Link>

                    <Link className="nav-icon" to="/profile"> 
                        <User size={20} />
                    </Link> */}

                    <div className="nav-icon">Cart</div>
                    <div className="nav-icon">Wishlist</div>
                    <div className="nav-icon">Profile</div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bottom-nav">
                <div className="categories">
                <span className="category-text">All Category</span>
                <ChevronDown size={16} />
                </div>

                <nav className="nav-links">
                    {/* <Link className="nav-link" to="/homepage"> <span className="nav-link-icon">🏠</span>
                        Homepage
                    </Link>

                    <Link className="nav-link" to="/products"> <span className="nav-link-icon">📋</span>
                        Product List
                    </Link>
                
                    <Link className="nav-link" to="/blog"> <span className="nav-link-icon">📝</span>
                        Blog
                    </Link> */}
                    <ul>
                        <li className="nav-link">Homepage</li>
                        <li className="nav-link">Product List</li>
                        <li className="nav-link">Blog</li>
                    </ul>
                </nav>

                <div className="phone-number">
                <Phone size={16} />
                <span>+1 202-555-0104</span>
                </div>
            </div>
        </div>
        </div>
  )
}

