import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../pages/user/HomePage/HomePage.css";
import {ArrowRight} from "lucide-react";
const FeaturedProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'laptop', name: 'Laptop' },
    { id: 'smartphone', name: 'Smart Phone' },
    { id: 'headphone', name: 'Headphone' },
    { id: 'tv', name: 'TV' },
  ];

  const products = [
    {
      id: 1,
      name: 'USD 15 True Wireless Earbuds Bluetooth Headphone',
      price: '$74',
      originalPrice: '$99',
      rating: 5,
      image: 'https://inkythuatso.com/uploads/thumbnails/800/2023/02/hinh-anh-cho-con-de-thuong-chay-tung-tang-1-24-11-43-28.jpg',
      category: 'headphone',
      onSale: true,
    },
    {
      id: 2,
      name: 'USD 15 True Wireless Control Bluetooth Headphone',
      price: '$74',
      originalPrice: '$99',
      rating: 3,
      image: 'https://inkythuatso.com/uploads/thumbnails/800/2023/02/hinh-anh-cho-con-de-thuong-chay-tung-tang-1-24-11-43-28.jpg',
      category: 'tv',
      onSale: false,
    },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBrowseAll = () => {
    navigate('/blog');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star-featured ${index < rating ? 'filled-featured' : ''}`}>
        ★
      </span>
    ));
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="product-showcase-featured">
      <div className="showcase-container-featured">
        <div className="featured-section-featured">
          <div className="main-content-featured">
            <div className="category-tabs-featured">
              <h2 className="featured-title-featured">Featured Products</h2>
              <div className="category-buttons-featured">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-tab-featured ${selectedCategory === category.id ? 'active-featured' : ''}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
                <button
                  className="category-tab-featured browse-all-btn-featured" 
                  onClick={handleBrowseAll}
                >
                  Browse All Product
                <span> <ArrowRight className="arrow-icon-featured" size={16}/></span>
                </button>
              </div>
            </div>
          </div>

          <div className="products-grid-featured">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card-featured">
                {product.onSale && <div className="sale-badge-featured">SALE</div>}
                <div className="product-image-featured">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-featured">
                  <div className="product-rating-featured">
                    {renderStars(product.rating)}
                  </div>
                  <h3 className="product-name-featured">{product.name}</h3>
                  <div className="product-price-featured">
                    <span className="current-price-featured">{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price-featured">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductSection;
