"use client"

import { useState, useEffect } from "react"
import "../../../pages/user/HomePage/HomePage.css";
import { ShoppingCart, Heart, Eye,ArrowRight } from "lucide-react";

const BestDealSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 21,
    minutes: 57,
    seconds: 23,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const featuredProduct = {
    title: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
    originalPrice: "$649.00",
    salePrice: "$449.12",
    rating: 4.5,
    description: "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
    discount: "32% OFF",
    isHot: true,
    image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
  }

  const products = [
    {
      id: 1,
      title: "Bose Sport Earbuds Wireless Earphones Bluetooth In-Ear...",
      price: "$70",
      originalPrice: "$100",
      image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
      badge: "SOLD OUT",
    },
    {
      id: 2, title: "Bose Sport Earbuds Wireless Earphones Bluetooth In-Ear...", price: "$70", originalPrice: "$100", image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    },
    {
      id: 3, title: "Bose Sport Earbuds Wireless Earphones Bluetooth In-Ear...", price: "$70", originalPrice: "$100", image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    },
    {
      id: 4, title: "Bose Sport Earbuds Wireless Earphones Bluetooth In-Ear...", price: "$70", originalPrice: "$100", image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    },
    {
      id: 5, title: "Bose Sport Earbuds Wireless Earphones Bluetooth In-Ear...", price: "$70", originalPrice: "$100", image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    },
    {
      id: 6, title: "Bose Sport Earbuds Wireless Earphones Bluetooth In-Ear...", price: "$70", originalPrice: "$100", image: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    },
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star-best-deal filled-best-deal">★</span>
      )
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star-best-deal half-best-deal">★</span>
      )
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star-best-deal empty-best-deal">★</span>
      )
    }
    return stars
  }

  return (
    <div className="best-deals-container-best-deal">
      <div className="header-section-best-deal">
        <div className="deals-info-best-deal">
          <h1 className="deals-title-best-deal">Best Deals</h1>
          <span className="deals-subtitle-best-deal">Deals ends in</span>
          <div className="countdown-timer-best-deal">
            <span className="time-unit-best-deal">{timeLeft.days}d</span>
            <span className="separator-best-deal">:</span>
            <span className="time-unit-best-deal">{timeLeft.hours}h</span>
            <span className="separator-best-deal">:</span>
            <span className="time-unit-best-deal">{timeLeft.minutes}m</span>
            <span className="separator-best-deal">:</span>
            <span className="time-unit-best-deal">{timeLeft.seconds}s</span>
          </div>
        </div>
        <a href="#" className="browse-all-link-best-deal">Browse All Product <span><ArrowRight size={15}/></span></a>
      </div>

      <div className="content-wrapper-best-deal">
        <div className="featured-product-section-best-deal">
          <div className="featured-product-card-best-deal">
            <div className="product-badges-best-deal">
              <span className="discount-badge-best-deal">{featuredProduct.discount}</span>
              {featuredProduct.isHot && <span className="hot-badge-best-deal">HOT</span>}
            </div>

            <div className="product-image-container-best-deal">
              <img src={featuredProduct.image || "/placeholder.svg"} alt={featuredProduct.title} className="product-image-best-deal" />
            </div>

            <div className="product-info-best-deal">
              <div className="rating-container-best-deal">
                <div className="stars-best-deal">{renderStars(featuredProduct.rating)}</div>
              </div>
              <h3 className="product-title-best-deal">{featuredProduct.title}</h3>
              <div className="price-container-best-deal">
                                <span className="sale-price-best-deal">{featuredProduct.salePrice}</span>
                <span className="original-price-best-deal">{featuredProduct.originalPrice}</span>
              </div>
              <p className="product-description-best-deal">{featuredProduct.description}</p>

              <div className="action-buttons-best-deal">
                <button className="wishlist-btn-best-deal"><span className="heart-icon-best-deal"><Heart /></span></button>
                <button className="add-to-cart-btn-best-deal"><span className="cart-icon-best-deal"><ShoppingCart color="#ffffff" /></span>ADD TO CARD</button>
                <button className="view-btn-best-deal"><span className="eye-icon-best-deal"><Eye  /></span></button>
              </div>
            </div>
          </div>
        </div>

        <div className="product-grid-section-best-deal">
          <div className="products-grid-best-deal">
            {products.map((product) => (
              <div key={product.id} className="product-card-best-deal">
                {product.badge && <div className="product-badge-best-deal">{product.badge}</div>}
                <div className="product-image-small-best-deal">
                  <img src={product.image || "/placeholder.svg"} alt={product.title} />
                </div>
                <div className="product-details-best-deal">
                  <h4 className="product-title-small-best-deal">{product.title}</h4>
                  <div className="price-small-best-deal">
                    <span className="current-price-best-deal">{product.price}</span>
                    <span className="original-price-small-best-deal">{product.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestDealSection;
