import React, { Component } from 'react';
import "../../../pages/user/HomePage/HomePage.css";
export default class CategoryItemHome extends Component {
  categories = [
    { id: 1, name: "Computer & Laptop", icon: "💻", color: "#8B5CF6" },
    { id: 2, name: "SmartPhone", icon: "📱", color: "#1F2937" },
    { id: 3, name: "HeadPhones", icon: "🎧", color: "#1F2937" },
    { id: 4, name: "Accessories", icon: "👜", color: "#DC2626" },
    { id: 5, name: "Camera & Photo", icon: "📷", color: "#1F2937" },
    { id: 6, name: "TV & Videos", icon: "📺", color: "#1F2937" },
  ];

  
  render() {
    return (
      <div className="categories-container">
        <div className="categories-wrapper">
          {this.categories.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => this.handleCategoryClick(category)}
            >
              <div className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}