import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CategoryItemHome = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRes = await axios.get("https://backendlaraveltechstore-production.up.railway.app/api/user/product/categories");
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

 const handleProductClick = (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.warning("Please login to view product details!");
        return;
    }

    navigate(`/user/product-detail/${productId}`);
};


  const visibleCategories = categories.slice(currentIndex, currentIndex + 6);

  return (
    <div className="categories-container">
      {visibleCategories.map((category, index) => (
  <div
    key={`${category.id}-${index}`}
    className="category-item"
    onClick={() => handleProductClick(category)}
  >
    <div className="category-icon">
      <img
        src={category.image_url}
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
