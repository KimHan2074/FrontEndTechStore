import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CategoryItemHome = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRes = await axios.get("http://localhost:8000/api/user/product/categories");
        setCategories(categoryRes.data.data);
        console.log("Clicked category:", categoryRes);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 6;
        return nextIndex >= categories.length ? 0 : nextIndex;
      });
    }, 120000);

    return () => clearInterval(interval);
  }, [categories]);

  const handleCategoryClick = (category) => {
    console.log("Clicked category:", category);
    navigate("/user/Product");
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + 6);

  return (
    <div className="categories-container">
      {visibleCategories.map((category, index) => (
  <div
    key={`${category.id}-${index}`}
    className="category-item"
    onClick={() => handleCategoryClick(category)}
  >
    <div className="category-icon">
      <img
        src={category.image}
        alt={category.name}
        className="category-image"
      />
    </div>
    <span className="category-name">{category.name}</span>
  </div>
))}

    </div>
  );
};

export default CategoryItemHome;
