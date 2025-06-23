import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../pages/user/Product/Product.css";

const ProductSidebar = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const latestRes = await axios.get("http://localhost:8000/api/blogs/status");
        setProducts(latestRes.data);

        const allProductsRes = await axios.get("http://localhost:8000/api/blogs");
        const allImages = allProductsRes.data.filter(product => product.image_url);
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        setGalleryImages(shuffled.slice(0, 6));
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryRes = await axios.get("http://localhost:8000/api/blogs/categories");
        setCategories(categoryRes.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="mobile-interface">
      <div className="section">
        <h2 className="section-title">CATEGORIES</h2>
        <ul className="category-list">
          <li className="category-item">
            <label className="category-label">
              <input
                type="radio"
                name="category"
                className="radio-category-list"
                checked={selectedCategoryId === null}
                onChange={() => setSelectedCategoryId(null)}
              />
              <span>All</span>
            </label>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              <label className="category-label">
                <input
                  type="radio"
                  name="category"
                  className="radio-category-list"
                  checked={selectedCategoryId === category.id}
                  onChange={() => setSelectedCategoryId(category.id)}
                />
                <span>{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">LATEST PRODUCTS</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image_url} alt={product.name} className="product-image" />
              <div className="product-content">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">GALLERY</h2>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.image_url} alt="Gallery" className="gallery-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
